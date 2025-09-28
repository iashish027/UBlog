import express from "express";
import authenticateToken from "../middleware/authMiddleware.js";
const router = express.Router();

import {
  uploadImage,
  uploadMiddleware,
} from "../controllers/imageUpload.controller.js";

router.post("/upload",authenticateToken,uploadMiddleware, uploadImage);
// router.post("/google", googleAuth);
export default router;
