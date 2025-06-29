import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import Transaction from '../src/models/Transaction.models';

dotenv.config({ path: path.resolve('backend/.env') });


const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected');
  } catch (error: any) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const importData = async (): Promise<void> => {
  try {
    const filePath = path.resolve('backend/SampleData.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    await Transaction.insertMany(jsonData);
    console.log('Data imported successfully!');
    process.exit(0);
  } catch (err: any) {
    console.error('Error importing data:', err.message);
    process.exit(1);
  }
};

(async () => {
  await connectDB();
  await importData();
})();
