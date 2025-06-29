import { Request, Response } from "express";
import Transaction from "../../models/Transaction.models";

export const getRecentTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const txs = await Transaction.find().sort({ date: -1 }).limit(5);
    res.status(200).json({ message: "Recent fetched", data: txs });
  } catch (err) {
    console.error("Recent error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPaginatedTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      page = "1",
      limit = "10",
      search = "",
      sortField = "date",
      sortOrder = "desc",
      status,
      category,
    } = req.query as {
      page?: string;
      limit?: string;
      search?: string;
      sortField?: string;
      sortOrder?: "asc" | "desc";
      status?: string;
      category?: string;
    };

    const numericPage = parseInt(page);
    const numericLimit = parseInt(limit);

    const query: Record<string, any> = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { user_id: { $regex: search, $options: "i" } },
      ];
    }
    if (status) query.status = status;
    if (category) query.category = category;

    const totalCount = await Transaction.countDocuments(query);
    const txs = await Transaction.find(query)
      .sort({ [sortField]: sortOrder === "asc" ? 1 : -1 })
      .skip((numericPage - 1) * numericLimit)
      .limit(numericLimit);

    res.status(200).json({
      data: txs,
      currentPage: numericPage,
      totalPages: Math.ceil(totalCount / numericLimit),
      totalCount,
    });
  } catch (err) {
    console.error("Pagination error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
