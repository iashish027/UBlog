import { signupService, signinService, verifyEmailService } from "./auth.service.js";

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;

  const result = await signupService(username, email, password);
  return res.status(200).json({
    success: result.success,
    statusCode: 200,
    message: result.message,
  });
};

const signin = async (req, res, next) => {
  const { email, password } = req.body;

  const result = await signinService(email, password);
  res
    .status(200)
    .cookie("access_token", result.token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      path: "/",
    })
    .json({ username: result.username, email: result.email });
};

const signOut = (req, res, next) => {
  res.clearCookie("access_token", {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    path: "/",
  });
  return res.status(200).json({ message: "Signed out successfully" });
};

const profile = (req, res, next) => {
    res
      .status(200)
      .json({ username: req.user?.username, email: req.user?.email });
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
