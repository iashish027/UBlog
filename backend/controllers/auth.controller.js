import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcryptjs from "bcryptjs";

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
    return next(errorHandler(400, "all fields are required"));
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return next(errorHandler(400, "Username or Email already existss"));
    }

    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: "succefully saved user",
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

    const validPassword = bcryptjs.compareSync(password, validUser.password);

    if (!validPassword) {
      return next(errorHandler(404), "password is wrong");
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

export { signin, signup };
