import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import { getAuth } from "firebase-admin/auth";
import { randomBytes, createHash } from "crypto";
import { sendMail } from "../nodeMailer/mailer.js";

dotenv.config();
function makeVerificationToken() {
  return randomBytes(32).toString("hex"); // e.g. "f3a1…9c5b"
}

function hashToken(token) {
  return createHash("sha256").update(token).digest("hex");
}
const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  console.log(req.body);
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "all fields are required"));
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      // if verified: false and token time < current time delete user
      if (existingUser.isVerified == false) {
        const rawToken = makeVerificationToken();
        const tokenHash = hashToken(rawToken);
        const expiresInMinutes = 15;
        const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
        const updatedUser = await User.findOneAndUpdate(
          { email: existingUser.email },
          {
            $set: {
              verificationToken: tokenHash,
              verificationTokenExpires: expiresAt,
            },
          },
          {
            new: true, // return the *updated* doc
            runValidators: true, // apply schema validators
            timestamps: true, // updates updatedAt if schema has timestamps
          }
        );
        // Send verification email with raw token
        const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;
        const info = await sendMail({
          to: existingUser.email,
          subject: "Ublog account verification",
          text: `Please verify your account by clicking the following link: ${verificationUrl}`,
        });
        if (!info.accepted) {
          await User.deleteOne({ email });
          return next(errorHandler(400, "unable to send verification code "));
        } else {
          res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Verification mail sent to your email, please verify",
          });
        }
      }
      // else do as below
      return next(errorHandler(400, "Username or Email already exist"));
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const rawToken = makeVerificationToken();
    const tokenHash = hashToken(rawToken);
    const expiresInMinutes = 15;
    const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}`;
    const info = await sendMail({
      to: email,
      subject: "Ublog account verification",
      text: `Please verify your account by clicking the following link: ${verificationUrl}`,
    });
    if (!info.accepted) {
      return next(errorHandler(400, "unable to send verification code"));
    }
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken: tokenHash,
      verificationTokenExpires: expiresAt,
    });

    await newUser.save();
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message:
        "succefully saved user, Verification mail sent to your email, please verify",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || password === "" || password === "") {
    return next(errorHandler(400, "all fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "email don't exists in our database"));
    }

    //if user not verified tell to verify
    if (validUser.isVerified == false) {
      return next(
        errorHandler(404, "email don't exists in our database or not verified")
      );
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(404, "password is wrong"));
    }

    const token = jwt.sign(
      {
        id: validUser._id,
      },
      process.env.JWT_SECRET
    );

    const { password: pass, ...rest } = validUser._doc;
    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .json(rest);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

// const google = async (req, res, next) =>{
//   const {email, name , googlePhotoUrl, googleId} = req.body;

//   try{
//     const decoded = await getAuth().verifyIdToken(idToken);
//     const user = await User.findOne({email});

//     if(user){

//     }
//   }
// }

export { signin, signup };
