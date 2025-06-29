import { Request, Response } from "express";
import Transaction from "../../models/Transaction.models";

export const getBalanceRevenueExpense = async (req: Request, res: Response): Promise<void> => {
  try {
    const summary: { balance: number; expense: number; revenue: number } = {
      balance: 0,
      expense: 0,
      revenue: 0,
    };

    const paid = await Transaction.find({ status: "Paid" });
    summary.balance = paid.reduce((sum, tx) => sum + tx.amount, 0);

    const expenses = await Transaction.find({ category: "Expense" });
    summary.expense = expenses.reduce((sum, tx) => sum + tx.amount, 0);

    const revenues = await Transaction.find({ category: "Revenue" });
    summary.revenue = revenues.reduce((sum, tx) => sum + tx.amount, 0);

    res.status(200).json({ message: "Summary fetched", data: summary });
  } catch (err) {
    console.error("Summary Error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
