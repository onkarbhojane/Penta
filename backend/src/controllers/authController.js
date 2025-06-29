import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otpGenerator.js";
import User from "../models/User.models.js";
import { sendMail } from "../services/mailService.js";

export const registerUser = async (req, res) => {
  try {
    const { email, username } = req.body;
    if (!email) return res.status(400).send("Email is required");

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    let user = await User.findOne({ email });

    if (user) {
      if (user.isEmailVerified) {
        return res.status(409).json({ message: "User already exists with this email." });
      } else {
        user.otp = otp;
        user.otpExpiresAt = expiresAt;
        if (username) user.username = username;
        await user.save();
      }
    } else {
      user = new User({ email, username, otp, otpExpiresAt: expiresAt });
      await user.save();
    }

    await sendMail(
      email,
      "Your OTP Code",
      `Your OTP for registration is ${otp}. It will expire in 10 minutes.`
    );

    res.status(200).send("OTP sent successfully via email.");
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).send("Email and OTP are required");

    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) return res.status(400).send("Invalid OTP or email");
    if (user.otpExpiresAt < new Date()) return res.status(400).send("OTP expired");

    user.isEmailVerified = true;
    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    res.status(200).send("OTP verified successfully");
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).send("Email is required");

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    if (user.isEmailVerified) {
      return res.status(400).send("Email is already verified");
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    await sendMail(
      email,
      "Resend OTP Code",
      `Your new OTP is ${otp}. It will expire in 10 minutes.`
    );

    res.status(200).send("OTP resent successfully");
  } catch (error) {
    console.error("Error in resendOTP:", error);
    res.status(500).send("Internal Server Error");
  }
};
export const setPassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).send("Email and password are required");

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");
    if (!user.isEmailVerified) return res.status(403).send("Email not verified");

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Password set successfully", token });
  } catch (error) {
    console.error("Error in setPassword:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      user: { email: user.email, name: user.username },
    });
  } catch (error) {
    console.error("Error in loginUser:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).send("Email is required");

  try {
    const user = await User.findOne({ email });
    if (!user || !user.isEmailVerified) {
      return res.status(404).send("User not found or email not verified");
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    await sendMail(email, "Password Reset OTP", `Your OTP for password reset is ${otp}.`);

    res.status(200).json({ message: "OTP sent for password reset" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const verifyResetOTP = async (req, res) => {
  const { email, otp } = req.body;
  if (!email || !otp) return res.status(400).send("Email and OTP are required");

  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp || user.otpExpiresAt < new Date()) {
      return res.status(400).send("Invalid or expired OTP");
    }

    user.otp = null;
    user.otpExpiresAt = null;
    await user.save();

    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "10m" });
    res.status(200).json({ message: "OTP verified", resetToken });
  } catch (error) {
    console.error("Error in verifyResetOTP:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const resetPassword = async (req, res) => {
  const { email, newPassword, resetToken } = req.body;
  try {
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET);
    if (decoded.email !== email) return res.status(403).send("Invalid token");

    const user = await User.findOne({ email });
    if (!user) return res.status(404).send("User not found");

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    await user.save();

    res.status(200).send("Password reset successfully");
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(400).send("Invalid or expired token");
  }
};
