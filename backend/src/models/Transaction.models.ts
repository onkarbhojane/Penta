import mongoose, { Document, Schema, model } from 'mongoose';

export interface ITransaction extends Document {
  date: Date;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  user_profile: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    date: { type: Date, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    status: { type: String, required: true },
    user_id: { type: String, required: true },
    user_profile: { type: String, required: true },
  },
  { timestamps: true }
);

const Transaction = model<ITransaction>('Transaction', transactionSchema);
export default Transaction;
