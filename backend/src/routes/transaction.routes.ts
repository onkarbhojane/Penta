import express, { Router } from "express";
import {
  getBalanceRevenueExpense,
} from "../controllers/transactions/summaryController";
import {
  getDailyRevenueAndExpenses,
  getWeeklyRevenueAndExpenses,
  getMonthlyRevenueAndExpenses,
} from "../controllers/transactions/trendController";
import {
  getTransactionStatus,
  getStatusCategoryAmounts,
} from "../controllers/transactions/statusController";
import {
  getRecentTransactions,
  getPaginatedTransactions,
} from "../controllers/transactions/transactionController";
import {
  exportTransactionsToCSV,
  exportFinancialReport,
} from "../controllers/transactions/exportController";
import { authenticate } from "../middlewares/authMiddleware";
const router: Router = express.Router();

router.get("/summary",authenticate, getBalanceRevenueExpense);
router.get("/trends/daily", authenticate, getDailyRevenueAndExpenses);
router.get("/trends/weekly", authenticate, getWeeklyRevenueAndExpenses);
router.get("/trends/monthly", authenticate, getMonthlyRevenueAndExpenses);
router.get("/status", authenticate, getTransactionStatus);
router.get("/status-category", authenticate, getStatusCategoryAmounts);
router.get("/recent", authenticate, getRecentTransactions);
router.get("/list", authenticate, getPaginatedTransactions);
router.get("/export/csv", authenticate, exportTransactionsToCSV);
router.get("/export/excel", authenticate, exportFinancialReport);

export default router;
