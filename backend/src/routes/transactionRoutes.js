import express from "express";
import {
  getBalanceRevenueExpense,
} from "../controllers/transactions/summaryController.js";
import {
  getDailyRevenueAndExpenses,
  getWeeklyRevenueAndExpenses,
  getMonthlyRevenueAndExpenses,
} from "../controllers/transactions/trendController.js";
import {
  getTransactionStatus,
  getStatusCategoryAmounts,
} from "../controllers/transactions/statusController.js";
import {
  getRecentTransactions,
  getPaginatedTransactions,
} from "../controllers/transactions/transactionController.js";
import {
  exportTransactionsToCSV,
  exportFinancialReport,
} from "../controllers/transactions/exportController.js";

const router = express.Router();

router.get("/summary", getBalanceRevenueExpense);
router.get("/trends/daily", getDailyRevenueAndExpenses);
router.get("/trends/weekly", getWeeklyRevenueAndExpenses);
router.get("/trends/monthly", getMonthlyRevenueAndExpenses);
router.get("/status", getTransactionStatus);
router.get("/status-category", getStatusCategoryAmounts);
router.get("/recent", getRecentTransactions);
router.get("/list", getPaginatedTransactions);
router.get("/export/csv", exportTransactionsToCSV);
router.get("/export/excel", exportFinancialReport);

export default router;
