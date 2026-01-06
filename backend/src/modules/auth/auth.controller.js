import { errorHandler } from "../../utils/error.js";
import { signupService, signinService, verifyEmailService } from "./auth.service.js";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const result = await signupService(username, email, password);
    return res.status(200).json({
      success: result.success,
      statusCode: 200,
      message: result.message,
    });
  } catch (err) {
    next(err);
  }
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const result = await signinService(email, password);
    res
      .status(200)
      .cookie("access_token", result.token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        path: "/api",
      })
      .json({ username: result.username, email: result.email });
  } catch (err) {
    next(err);
  }
};

const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });
    return res.status(200).json({ message: "Signed out successfully" });
  } catch (err) {
    next(errorHandler(500, "Internal Server Error"));
  }
};

const profile = (req, res, next) => {
  try {
    res
      .status(200)
      .json({ username: req.user?.username, email: req.user?.email });
  } catch {
    res.status(500).json({ message: "Internal Servere Error" });
  }
};

const verifyEmail = async (req, res, next) => {
  const { username, token } = req.body;

  try {
    const result = await verifyEmailService(username, token);
    return res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};


export { signin, signup, signOut, profile, verifyEmail };
