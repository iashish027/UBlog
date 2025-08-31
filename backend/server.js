import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

// import userRoutes from "./routes/user.route.js";
import postRoutes from "./routes/post.route.js";
import authRoutes from "./routes/auth.route.js";
import verifyEmailRoutes from "./routes/verify-email.route.js";
import imageRoutes from "./routes/imageUpload.route.js";
dotenv.config();
const app = express();

//connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {})
  .catch((err) => console.error("MongoDB connection error : ", err));

//Routes

app.use(express.json());
app.use(cookieParser());
// app.use("/api/user", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/verify-email", verifyEmailRoutes);
app.use("/api/images", imageRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
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
//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {});
