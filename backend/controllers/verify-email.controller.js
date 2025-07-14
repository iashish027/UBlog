import User from "../models/User.model.js";
import { errorHandler } from "../utils/error.js";
import { createHash } from "crypto";

export const verifyEmail = async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return next(errorHandler(400, "Verification token is required."));
  }

  try {
    const tokenHash = createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      verificationToken: tokenHash,
      verificationTokenExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(errorHandler(400, "Invalid or expired verification token."));
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpires = undefined;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully." });
  } catch (err) {
    next(errorHandler(500, "Server error."));
  }
};
