import Transaction from "../../models/Transaction.models.js";
import { generateCSV } from "../../services/csvService.js";
import exceljs from "exceljs";

// Export to CSV
export const exportTransactionsToCSV = async (req, res) => {
  try {
    const { search = "", sortField = "date", sortOrder = "desc", status } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { user_id: { $regex: search, $options: "i" } },
      ];
    }

    const sortOptions = {};
    sortOptions[sortField] = sortOrder === "asc" ? 1 : -1;

    const transactions = await Transaction.find(filter).sort(sortOptions).lean();

    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found to export" });
    }

    const csv = generateCSV(transactions, ["user_id", "name", "date", "amount", "status"]);

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=transactions.csv");
    res.status(200).send(csv);
  } catch (error) {
    console.error("CSV Export Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Export to Excel
export const exportFinancialReport = async (req, res) => {
  try {
    const workbook = new exceljs.Workbook();

    const summarySheet = workbook.addWorksheet("Financial Summary");
    const monthlySheet = workbook.addWorksheet("Monthly Trends");
    const transactionsSheet = workbook.addWorksheet("Transactions");

    const paidTransactions = await Transaction.find({ status: "Paid" });

    const balance = paidTransactions.reduce((acc, tx) => acc + tx.amount, 0);
    const revenue = paidTransactions.filter(tx => tx.category === "Revenue").reduce((acc, tx) => acc + tx.amount, 0);
    const expense = paidTransactions.filter(tx => tx.category === "Expense").reduce((acc, tx) => acc + tx.amount, 0);

    summarySheet.columns = [
      { header: "Metric", key: "metric", width: 25 },
      { header: "Amount", key: "amount", width: 20 },
    ];
    summarySheet.addRow({ metric: "Current Balance", amount: balance });
    summarySheet.addRow({ metric: "Total Revenue", amount: revenue });
    summarySheet.addRow({ metric: "Total Expenses", amount: Math.abs(expense) });
    summarySheet.addRow({ metric: "Net Profit", amount: revenue - Math.abs(expense) });

    summarySheet.getRow(1).font = { bold: true };
    summarySheet.getRow(1).eachCell(cell => {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD9EAD3" } };
    });

    const monthlyData = await Transaction.aggregate([
      { $match: { status: "Paid" } },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          revenue: {
            $sum: {
              $cond: [{ $eq: ["$category", "Revenue"] }, "$amount", 0]
            }
          },
          expenses: {
            $sum: {
              $cond: [{ $eq: ["$category", "Expense"] }, "$amount", 0]
            }
          }
        }
      },
      {
        $project: {
          _id: 0,
          month: {
            $dateToString: {
              format: "%Y-%m",
              date: {
                $dateFromParts: {
                  year: "$_id.year",
                  month: "$_id.month"
                }
              }
            }
          },
          revenue: 1,
          expenses: { $abs: "$expenses" }
        }
      },
      { $sort: { month: 1 } }
    ]);

    monthlySheet.columns = [
      { header: "Month", key: "month", width: 15 },
      { header: "Revenue", key: "revenue", width: 15 },
      { header: "Expenses", key: "expenses", width: 15 },
      { header: "Profit", key: "profit", width: 15 }
    ];

    monthlyData.forEach(data => {
      monthlySheet.addRow({
        month: data.month,
        revenue: data.revenue,
        expenses: data.expenses,
        profit: data.revenue - data.expenses
      });
    });

    monthlySheet.getRow(1).font = { bold: true };
    monthlySheet.getRow(1).eachCell(cell => {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD9EAD3" } };
    });

    const { search, sortField, sortOrder, status } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { user_id: { $regex: search, $options: "i" } },
      ];
    }

    const sortOptions = {};
    sortOptions[sortField || "date"] = sortOrder === "asc" ? 1 : -1;

    const transactions = await Transaction.find(filter).sort(sortOptions).lean();

    transactionsSheet.columns = [
      { header: "Date", key: "date", width: 15 },
      { header: "User ID", key: "user_id", width: 20 },
      { header: "Name", key: "name", width: 25 },
      { header: "Description", key: "description", width: 30 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Category", key: "category", width: 15 },
      { header: "Status", key: "status", width: 15 }
    ];

    transactions.forEach(tx => {
      transactionsSheet.addRow({
        date: new Date(tx.date).toLocaleDateString(),
        user_id: tx.user_id,
        name: tx.name,
        description: tx.description || "",
        amount: tx.amount,
        category: tx.category,
        status: tx.status
      });
    });

    transactionsSheet.getRow(1).font = { bold: true };
    transactionsSheet.getRow(1).eachCell(cell => {
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFD9EAD3" } };
    });

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=financial_report.xlsx");

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error("Error generating financial report:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
