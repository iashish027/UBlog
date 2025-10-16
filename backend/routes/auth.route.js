import express from "express";
import {
  signup,
  signin,
  signOut,
  profile,
} from "../controllers/auth.controller.js";
import authenticateToken from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/profile", authenticateToken, profile);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signOut", signOut);
// router.post("/google", googleAuth);
export default router;
