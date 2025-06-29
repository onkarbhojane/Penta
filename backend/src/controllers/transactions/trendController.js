import Transaction from "../../models/Transaction.models.js";

export const getDailyRevenueAndExpenses = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: "Paid" });
    const data = {};

    transactions.forEach(tx => {
      const date = new Date(tx.date);
      const label = date.toLocaleDateString("en-GB");

      if (!data[label]) data[label] = { day: label, income: 0, expense: 0 };
      tx.category === "Revenue" ? data[label].income += tx.amount : data[label].expense += tx.amount;
    });

    const sorted = Object.values(data).sort((a, b) => new Date(a.day) - new Date(b.day));
    res.status(200).json({ message: "Daily trend fetched", data: sorted });
  } catch (err) {
    console.error("Daily trend error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getWeeklyRevenueAndExpenses = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: "Paid" });
    const data = {};

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

export const getMonthlyRevenueAndExpenses = async (req, res) => {
  try {
    const transactions = await Transaction.find({ status: "Paid" });
    const data = {};

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
