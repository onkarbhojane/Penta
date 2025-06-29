import mongoose from 'mongoose';
import fs from 'fs';
import dotenv from 'dotenv';
import path from 'path';
import Transaction from '../src/models/Transaction.models.js';

dotenv.config({ path: path.resolve('backend/.env') });


const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}`);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    const filePath = path.resolve('backend/SampleData.json');
    const jsonData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

    await Transaction.insertMany(jsonData);
    console.log('Data imported successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error importing data:', err.message);
    process.exit(1);
  }
};

await connectDB();
await importData();
