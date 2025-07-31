import express from "express";
const router = express.Router();

import {
  uploadImage,
  uploadMiddleware,
} from "../controllers/imageUpload.controller.js";

router.post("/upload", uploadMiddleware, uploadImage);
// router.post("/google", googleAuth);
export default router;
