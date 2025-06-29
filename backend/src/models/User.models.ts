import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  email: string;
  username?: string;
  password?: string;
  otp?: string;
  otpExpiresAt?: Date;
  isEmailVerified: boolean;
}

const userSchema: Schema<IUser> = new Schema({
  email: { type: String, required: true, unique: true },
  username: { type: String },
  password: { type: String },
  otp: { type: String },
  otpExpiresAt: { type: Date },
  isEmailVerified: { type: Boolean, default: false },
});

const User = mongoose.model<IUser>("User", userSchema);
export default User;
