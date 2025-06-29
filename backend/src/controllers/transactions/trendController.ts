import { Request, Response } from "express";
import Transaction from "../../models/Transaction.models";

interface DailyData {
  [key: string]: { day: string; income: number; expense: number };
}

interface WeeklyData {
  [key: string]: { week: string; income: number; expense: number };
}

interface MonthlyData {
  [key: string]: { month: string; income: number; expense: number };
}

export const getDailyRevenueAndExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find({ status: "Paid" });
    const data: DailyData = {};

    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const label = date.toLocaleDateString("en-GB");

      if (!data[label]) data[label] = { day: label, income: 0, expense: 0 };
      tx.category === "Revenue" ? data[label].income += tx.amount : data[label].expense += tx.amount;
    });

    const sorted = Object.values(data).sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime());
    res.status(200).json({ message: "Daily trend fetched", data: sorted });
  } catch (err) {
    console.error("Daily trend error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getWeeklyRevenueAndExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find({ status: "Paid" });
    const data: WeeklyData = {};

    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const week = Math.floor(date.getDate() / 7);
      const label = `Week ${week + 1}, ${date.toLocaleString("default", { month: "short" })}`;

      if (!data[label]) data[label] = { week: label, income: 0, expense: 0 };
      tx.category === "Revenue" ? data[label].income += tx.amount : data[label].expense += tx.amount;
    });

    const sorted = Object.values(data);
    res.status(200).json({ message: "Weekly trend fetched", data: sorted });
  } catch (err) {
    console.error("Weekly trend error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMonthlyRevenueAndExpenses = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactions = await Transaction.find({ status: "Paid" });
    const data: MonthlyData = {};

    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const month = date.toLocaleString("default", { month: "long" });

      if (!data[month]) data[month] = { month, income: 0, expense: 0 };
      tx.category === "Revenue" ? data[month].income += tx.amount : data[month].expense += tx.amount;
    });

    const sorted = Object.values(data);
    res.status(200).json({ message: "Monthly trend fetched", data: sorted });
  } catch (err) {
    console.error("Monthly trend error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
