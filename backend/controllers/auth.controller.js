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
    return next(errorHandler(400, "all fields are required"));
  }

  try {
    const newUser = new User({
      username,
      email,
      password,
    });
    await newUser.save();
  } catch (err) {
    next(err);
  }
};
