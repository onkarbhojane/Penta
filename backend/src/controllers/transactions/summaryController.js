import Transaction from "../../models/Transaction.models.js";

export const getBalanceRevenueExpense = async (req, res) => {
  try {
    const summary = {};

    const paid = await Transaction.find({ status: "Paid" });
    const balance = paid.reduce((sum, tx) => sum + tx.amount, 0);
    summary.balance = balance;

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
