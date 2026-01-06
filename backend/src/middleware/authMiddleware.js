import jwt from "jsonwebtoken";
import { env } from "../config/env.js"
// Middleware to protect routes
export default (req, res, next) => {

  const token = req.cookies.access_token; // 'jwtToken' is the name of your cookie

  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  // 2. Verify the JWT
  jwt.verify(token, env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = user;
    next();
  });
  
};
