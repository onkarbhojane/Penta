import Transaction from "../../models/Transaction.models.js";

export const getRecentTransactions = async (req, res) => {
  try {
    const txs = await Transaction.find().sort({ date: -1 }).limit(5);
    res.status(200).json({ message: "Recent fetched", data: txs });
  } catch (err) {
    console.error("Recent error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPaginatedTransactions = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      sortField = "date",
      sortOrder = "desc",
      status,
      category,
    } = req.query;

    const query = {};
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
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({
      data: txs,
      currentPage: Number(page),
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    });
  } catch (err) {
    console.error("Pagination error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
