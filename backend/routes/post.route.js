import express from "express";
import { createPost, getposts } from "../controllers/post.controller.js";
import authenticateToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", authenticateToken, createPost);
router.get("/getposts", getposts);
// router.delete("/deletepost/:postId/:userId", verifyToken, deletepost);
// router.put("/updatepost/:postId/:userId", verifyToken, updatepost);

export default router;
