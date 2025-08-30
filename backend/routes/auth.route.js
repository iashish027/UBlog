import express from "express";
import { signup, signin, signOut } from "../controllers/auth.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signOut", signOut);
// router.post("/google", googleAuth);
export default router;
