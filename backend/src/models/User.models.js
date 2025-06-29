import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  password: { type: String },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  isEmailVerified: { type: Boolean, default: false },
});

export default mongoose.model("User", userSchema);
