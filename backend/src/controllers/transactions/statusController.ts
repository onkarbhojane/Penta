import { Request, Response } from "express";
import Transaction from "../../models/Transaction.models";

export const getTransactionStatus = async (req: Request, res: Response): Promise<void> => {
  try {
    const paid = await Transaction.countDocuments({ status: "Paid" });
    const pending = await Transaction.countDocuments({ status: "Pending" });

    res.status(200).json({
      message: "Status fetched",
      data: { paid, pending },
    });
  } catch (err) {
    console.error("Status fetch error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getStatusCategoryAmounts = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await Transaction.aggregate([
      {
        $match: {
          status: { $in: ["Paid", "Pending"] },
          category: { $in: ["Revenue", "Expense"] },
        },
      },
      {
        $group: {
          _id: { status: "$status", category: "$category" },
          total: { $sum: "$amount" },
        },
      },
    ]);

    const structured: Record<string, Record<string, number>> = {
      Paid: { Revenue: 0, Expense: 0 },
      Pending: { Revenue: 0, Expense: 0 },
    };

    result.forEach(({ _id, total }) => {
      const { status, category } = _id;
      structured[status][category] = total;
    });

    res.status(200).json({
      message: "Status-Category totals",
      data: structured,
    });
  } catch (err) {
    console.error("Status-Category error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
