import express from "express";
import cookieParser from "cookie-parser";
import postRoutes from "./src/modules/post/post.route.js";
import authRoutes from "./src/modules/auth/auth.route.js";
import { getDbStatus } from "./src/config/db.js";
const app = express();

//Fail Fast Middleware
app.use((req, res, next) => {
  if (!getDbStatus()) {
    return res.status(503).json({
      success: false,
      message: "Service temporarily unavailable. Database not connected.",
    });
  }
  next();
});

// app.use((req, res, next) => {
//   res.setHeader(
//     "Cache-Control",
//     "no-store, no-cache, must-revalidate, proxy-revalidate"
//   );
//   res.setHeader("Pragma", "no-cache");
//   res.setHeader("Expires", "0");
//   res.setHeader("Surrogate-Control", "no-store");
//   next();
// });
        
app.use(express.json());
app.use(cookieParser());
        
//Routes
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);

app.use((req, res) => {
  res
  .status(404)
  .json({ success: false, message: "Route not found" });
});

app.use((err, req, res, next) => {

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });

});

export {app};