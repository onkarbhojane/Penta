import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateOTP } from "../utils/otpGenerator";
import User, { IUser } from "../models/User.models";
import { sendMail } from "../services/mailService";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, username }: { email?: string; username?: string } = req.body;
    if (!email) {
      res.status(400).send("Email is required");
      return;
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    let user: IUser | null = await User.findOne({ email });

    if (user) {
      if (user.isEmailVerified) {
        res.status(409).json({ message: "User already exists with this email." });
        return;
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

    await sendMail(email, "Your OTP Code", `Your OTP for registration is ${otp}. It will expire in 10 minutes.`);

    res.status(200).send("OTP sent successfully via email.");
  } catch (error) {
    console.error("Error in registerUser:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp }: { email?: string; otp?: string } = req.body;
    if (!email || !otp) {
      res.status(400).send("Email and OTP are required");
      return;
    }

    const user: IUser | null = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      res.status(400).send("Invalid OTP or email");
      return;
    }
    if (user.otpExpiresAt && user.otpExpiresAt < new Date()) {
      res.status(400).send("OTP expired");
      return;
    }

    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    res.status(200).send("OTP verified successfully");
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const resendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email }: { email?: string } = req.body;
    if (!email) {
      res.status(400).send("Email is required");
      return;
    }

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    if (user.isEmailVerified) {
      res.status(400).send("Email is already verified");
      return;
    }

    const otp = generateOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpiresAt = expiresAt;
    await user.save();

    await sendMail(email, "Resend OTP Code", `Your new OTP is ${otp}. It will expire in 10 minutes.`);

    res.status(200).send("OTP resent successfully");
  } catch (error) {
    console.error("Error in resendOTP:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const setPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: { email?: string; password?: string } = req.body;
    if (!email || !password) {
      res.status(400).send("Email and password are required");
      return;
    }

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    if (!user.isEmailVerified) {
      res.status(403).send("Email not verified");
      return;
    }

    user.password = await bcrypt.hash(password, 10);
    await user.save();

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    res.status(200).json({ message: "Password set successfully", token });
  } catch (error) {
    console.error("Error in setPassword:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password }: { email?: string; password?: string } = req.body;
    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const isMatch = await bcrypt.compare(password || "", user.password || "");
    if (!isMatch) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET as string, {
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

export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email }: { email?: string } = req.body;
    if (!email) {
      res.status(400).send("Email is required");
      return;
    }

    const user: IUser | null = await User.findOne({ email });
    if (!user || !user.isEmailVerified) {
      res.status(404).send("User not found or email not verified");
      return;
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

export const verifyResetOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, otp }: { email?: string; otp?: string } = req.body;
    if (!email || !otp) {
      res.status(400).send("Email and OTP are required");
      return;
    }

    const user: IUser | null = await User.findOne({ email });
    if (!user || user.otp !== otp || (user.otpExpiresAt && user.otpExpiresAt < new Date())) {
      res.status(400).send("Invalid or expired OTP");
      return;
    }

    user.otp = undefined;
    user.otpExpiresAt = undefined;
    await user.save();

    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET as string, { expiresIn: "10m" });
    res.status(200).json({ message: "OTP verified", resetToken });
  } catch (error) {
    console.error("Error in verifyResetOTP:", error);
    res.status(500).send("Internal Server Error");
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, newPassword, resetToken }: { email?: string; newPassword?: string; resetToken?: string } = req.body;
    const decoded = jwt.verify(resetToken || "", process.env.JWT_SECRET as string) as { email: string };
    if (decoded.email !== email) {
      res.status(403).send("Invalid token");
      return;
    }

    const user: IUser | null = await User.findOne({ email });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }

    const hashed = await bcrypt.hash(newPassword || "", 10);
    user.password = hashed;
    await user.save();

    res.status(200).send("Password reset successfully");
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(400).send("Invalid or expired token");
  }
};
