import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    !username ||
    !email ||
    !password ||
    username === "" ||
    email === "" ||
    password === ""
  ) {
    console.log("yes");
    return next(errorHandler(400, "all fields are required"));
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    console.log("new request");
    if (existingUser) {
      return next(errorHandler(400, "Username or Email already existss"));
    }
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
    return res.status(200).json({
      success: false,
      statusCode: 200,
      message: "succefully saved user",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
};
