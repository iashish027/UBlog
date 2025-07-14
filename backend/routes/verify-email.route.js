import express from "express";
import { verifyEmail } from "../controllers/verify-email.controller.js";

const router = express.Router();

router.post("/", verifyEmail); // Use POST instead of GET

export default router;
