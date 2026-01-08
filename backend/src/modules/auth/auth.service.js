import User from "../user/User.model.js";
import { errorHandler } from "../../utils/error.js";
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { makeVerificationToken, hashToken } from "../../utils/token.js";
import { sendVerificationMail } from "../../services/mail/mail.service.js";
import { env } from "../../config/index.js";

const signupService = async (username, email, password) => {
  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    throw errorHandler(400, "All fields are required");
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existingUser) {
    if (existingUser.isVerified == false) {
      const rawToken = makeVerificationToken();
      const tokenHash = hashToken(rawToken);
      const expiresInMinutes = 15;
      const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);
      await User.findOneAndUpdate(
        { email: existingUser.email },
        {
          $set: {
            verificationToken: tokenHash,
            verificationTokenExpires: expiresAt,
          },
        },
        {
          new: true,
          runValidators: true,
          timestamps: true,
        }
      );

      try {
        await sendVerificationMail(email, username, rawToken);
        return { success: true, message: "Verification mail sent to your email, please verify" };
      } catch (err) {
        throw errorHandler(400, err || "Unable to send verification code");
      }
    }
    throw errorHandler(400, "Username or Email already exist");
  }

  const hashedPassword = await bcryptjs.hash(password, 10);
  const rawToken = makeVerificationToken();
  const tokenHash = hashToken(rawToken);
  const expiresInMinutes = 15;
  const expiresAt = new Date(Date.now() + expiresInMinutes * 60 * 1000);

  try {
    await sendVerificationMail(email, username, rawToken);
  } catch (err) {
    throw errorHandler(400, err || "Unable to send verification code");
  }

  const newUser = new User({
    username,
    email,
    password: hashedPassword,
    verificationToken: tokenHash,
    verificationTokenExpires: expiresAt,
  });

  await newUser.save();

  return { success: true, message: "Verification mail sent to your email, please verify" };
};

const signinService = async (email, password) => {
  if (!email || !password || password === "" || email === "") {
    throw errorHandler(400, "All fields are required");
  }

  const validUser = await User.findOne({ email });

  if (!validUser) {
    throw errorHandler(404, "Email not found");
  }

  if (validUser.isVerified == false) {
    throw errorHandler(404, "Email not found");
  }

  const validPassword = bcryptjs.compareSync(password, validUser.password);

  if (!validPassword) {
    throw errorHandler(404, "password is wrong");
  }

  const token = jwt.sign(
    {
      userId: validUser._doc.userId,
      username: validUser._doc.username,
      email: validUser._doc.email,
    },
    env.JWT_SECRET,
    { expiresIn: "15m" }
  );

  const user = {
    username: validUser._doc.username,
    email: validUser._doc.email,
    token,
  };

  return user;
};

const verifyEmailService = async (username, token) => {
  if (!username || !token) {
    throw errorHandler(400, "Username and verification token are required.");
  }

  const tokenHash = hashToken(token);

  const user = await User.findOne({
    username,
    verificationToken: tokenHash,
    verificationTokenExpires: { $gt: Date.now() },
  });

  if (!user) {
    throw errorHandler(400, "Invalid or expired verification token.");
  }

  user.isVerified = true;
  user.verificationToken = undefined;
  user.verificationTokenExpires = undefined;
  await user.save();

  return { message: "Email verified successfully." };
};

export { signupService, signinService, verifyEmailService };