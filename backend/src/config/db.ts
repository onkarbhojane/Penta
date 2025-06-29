import mongoose from "mongoose";

export const connectDB = async (): Promise<void> => {
  try {
    const mongoURI = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error("MONGO_URI is not defined in environment variables.");
    }

    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected");
  } catch (err: any) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};
