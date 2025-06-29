import express from "express";
import {
  registerUser,
  verifyOTP,
  setPassword,
  resendOTP,
  loginUser,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/verify", verifyOTP);
router.post("/set-password", setPassword);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/verify-reset-otp", verifyResetOTP);
router.post("/resend-otp", resendOTP);
router.post("/reset-password", resetPassword);

export default router;
