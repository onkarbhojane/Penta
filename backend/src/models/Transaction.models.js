import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  date: Date,
  amount: Number,
  category: String,
  status: String,
  user_id: String,
  user_profile: String
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
