import jwt from "jsonwebtoken";
import { ApiError } from "../utils/error.js";
import { env } from "../config/env.js";

const authMiddleware = (req, res, next) => {
  const token = req.cookies?.access_token;

  if (!token) {
    return next(new ApiError(401, "Authentication required"));
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return next(new ApiError(401,"Invalid or expired token"));
  }
};

export default authMiddleware;
