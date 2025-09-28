import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";
import { makeVerificationToken, hashToken } from "../utils/token.js";
import { sendVerificationMail } from "../services/mail.service.js";

dotenv.config();

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    return next(errorHandler(400, "All fields are required"));
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
        try{
          sendVerificationMail(email,rawToken);

          return res.status(200).json({
            success: true,
            statusCode: 200,
            message: "Verification mail sent to your email, please verify",
          });
        }
        catch(err){
          return next(errorHandler(400,"Unable to send verification code"));
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
    try{
      sendVerificationMail(email,rawToken);
    }
    catch(err){
      return res.send(errorHandler(400,"Unable to send verification code"));
    }

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      verificationToken: tokenHash,
      verificationTokenExpires: expiresAt,
    });

    const user = await newUser.save();

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message:
        "Verification mail sent to your email, please verify",
    });
  } catch (err) {
    next(errorHandler(500,"Internal Server error"));
  }
};


const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || password === "" || password === "") {
    return next(errorHandler(400, "All fields are required"));
  }

  try {
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return next(errorHandler(404, "Email not found"));
    }

    //if user not verified tell to verify
    if (validUser.isVerified == false) {
      return next(
        errorHandler(404, "Email not found")
      );
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(404, "password is wrong"));
    }

    const token = jwt.sign(
      {
        userId: validUser._doc.userId,
        username: validUser._doc.username,
        email: validUser._doc.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );
    const { username: usernameExtracted, email: emailExtracted } = validUser._doc;

    const user = {
      "username" : usernameExtracted,
      "email" : emailExtracted
    }

    res
      .status(200)
      .cookie("access_token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/api",
      })
      .json(user);
  } catch (err) {
    next(err);
  }
};


const signOut = (req, res, next) => {
    try{
      res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
      });
      return res.status(200).json({ message: "Signed out successfully" });
    }
    catch(err){
      next(errorHandler(500,"Internal Server Error"));
    }
};

const profile = (req, res, next) => {

};

export { signin, signup, signOut };
