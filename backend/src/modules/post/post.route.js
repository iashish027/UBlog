import express from "express";
import {
  createPost,
  getPosts,
  getMyPosts,
  deletePost,
  blogImage,
  blogCoverImage
} from "./post.controller.js";
import authenticateToken from "../../middleware/authMiddleware.js";
import { upload } from "../../services/media/images/multer.config.js"
const router = express.Router();

router.post("/create", authenticateToken, createPost);
router.get("/getposts", getPosts);
router.get("/getposts/dashboard", authenticateToken, getMyPosts);
router.delete("/deletepost", authenticateToken, deletePost);
router.post("/imageUpload",upload.single("image"),blogImage);
router.post("/coverImageUpload",upload.single("image"),blogCoverImage);

export default router;
