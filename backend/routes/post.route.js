import express from "express";
import { createPost, getPosts, getMyPosts } from "../controllers/post.controller.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateToken, createPost);
router.get("/getposts", getPosts);
router.get("/getposts/dashboard", authenticateToken, getMyPosts);
// router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
// router.put("/updatepost/:postId/:userId", verifyToken, updatepost);

export default router;
