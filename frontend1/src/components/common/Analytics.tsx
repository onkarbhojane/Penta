import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  type ChartOptions,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

interface SummaryData {
  balance: number;
  expense: number;
  revenue: number;
}

interface TransactionStatus {
  paid: number;
  pending: number;
}

interface MonthlySummary {
  month: string;
  income: number;
  expense: number;
}

interface StatusCategoryData {
  Paid: number[];
  Pending: number[];
}

const AnalyticsSection: React.FC = () => {
  const [exportLoading, setExportLoading] = useState(false);
  const [period, setPeriod] = useState<"monthly" | "quarterly">("monthly");
  const [summaryData, setSummaryData] = useState<SummaryData>({
    balance: 0,
    expense: 0,
    revenue: 0,
  });

  const [labels, setLabels] = useState<string[]>([]);
  const [income, setIncome] = useState<number[]>([]);
  const [expense, setExpense] = useState<number[]>([]);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    {
      paid: 0,
      pending: 0,
    }
  );

  const [data, setData] = useState<StatusCategoryData>({
    Paid: [],
    Pending: [],
  });

  const COLORS = {
    revenue: "#10b981",
    expenses: "#f59e0b",
    paid: "#10b981",
    pending: "#f59e0b",
    background: "#1A1C22",
    text: "#e5e7eb",
    muted: "#9ca3af",
    grid: "#2f2f2f",
  };

  const getBalanceRevenueExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<{ data: SummaryData }>(
        "http://localhost:5000/api/transactions/summary",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSummaryData(response.data?.data);
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };

  const getTransactionStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<{ data: TransactionStatus }>(
        "http://localhost:5000/api/transactions/status",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactionStatus(response.data?.data);
    } catch (error) {
      console.error("Error fetching transaction status:", error);
    }
  };

  const getMonthlyRevenueAndExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<{ data: MonthlySummary[] }>(
        "http://localhost:5000/api/transactions/trends/monthly",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const responseData = response.data?.data;
      if (Array.isArray(responseData)) {
        const labels = responseData.map((item) => item.month);
        const incomeData = responseData.map((item) => item.income);
        const expenseData = responseData.map((item) => item.expense);
        setLabels(labels);
        setIncome(incomeData);
        setExpense(expenseData);
      }
    } catch (error) {
      console.error("Error fetching monthly summary:", error);
    }
  };

  const getStatusCategoryAmounts = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get<{ data: StatusCategoryData }>(
        "http://localhost:5000/api/transactions/status-category",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setData(response.data?.data);
    } catch (error) {
      console.error("Error fetching status category amounts:", error);
    }
  };

  useEffect(() => {
    getBalanceRevenueExpense();
    getTransactionStatus();
    getMonthlyRevenueAndExpenses();
    getStatusCategoryAmounts();
  }, []);

  const handleExportReport = async () => {
    try {
      setExportLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/transactions/export/excel",
        {
          params: { period },
          responseType: "blob",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `financial_report_${new Date().toISOString().slice(0, 10)}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export failed:", error);
      alert("Failed to export report. Please try again.");
    } finally {
      setExportLoading(false);
    }
  };

  const pieOptions: ChartOptions<"pie"> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: COLORS.text,
          font: { size: 11 },
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.raw as number;
            const total = context.dataset.data.reduce(
              (sum: number, val: number) => sum + val,
              0
            );
            const percentage =
              total > 0 ? Math.round((value / total) * 100) : 0;
            return `${label}: ₹${value.toLocaleString()} (${percentage}%)`;
          },
        },
      },
    },
  };

  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  const barOptions: ChartOptions<"bar"> = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: COLORS.muted,
          font: { size: 11 },
        },
      },
    },
    scales: {
      x: {
        ticks: { color: COLORS.muted },
        grid: { color: COLORS.grid },
        stacked: false,
      },
      y: {
        ticks: {
          color: COLORS.muted,
          callback: (value) =>
            typeof value === "number"
              ? `₹${value.toLocaleString("en-IN")}`
              : value,
        },
        grid: { color: COLORS.grid },
      },
    },
    responsive: true,
  };

  const barStackedOptions: ChartOptions<"bar"> = {
    ...barOptions,
    scales: {
      x: { ...barOptions.scales?.x, stacked: true },
      y: { ...barOptions.scales?.y, stacked: true },
    },
  };

  const pieRevenueExpenseData = {
    labels: ["Revenue", "Expenses"],
    datasets: [
      {
        data: [summaryData.revenue, summaryData.expense],
        backgroundColor: [COLORS.revenue, COLORS.expenses],
        borderColor: ["#0a0a0a"],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const pieStatusData = {
    labels: ["Paid", "Pending"],
    datasets: [
      {
        data: [transactionStatus.paid, transactionStatus.pending],
        backgroundColor: [COLORS.paid, COLORS.pending],
        borderColor: ["#0a0a0a"],
        borderWidth: 2,
        hoverOffset: 10,
      },
    ],
  };

  const barMonthlyData = {
    labels,
    datasets: [
      {
        label: "Revenue",
        data: income,
        backgroundColor: COLORS.revenue,
        borderRadius: 4,
      },
      {
        label: "Expenses",
        data: expense,
        backgroundColor: COLORS.expenses,
        borderRadius: 4,
      },
    ],
  };

  const barCategoryStatusData = {
    labels: ["Revenue", "Expenses"],
    datasets: [
      {
        label: "Paid",
        data: data.Paid,
        backgroundColor: COLORS.paid,
      },
      {
        label: "Pending",
        data: data.Pending,
        backgroundColor: COLORS.pending,
      },
    ],
  };

  return (
    <div className="bg-[#23252E] rounded-2xl p-6 shadow-lg mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white">Financial Analytics</h2>
        <div className="flex gap-2">
          <button
            onClick={handleExportReport}
            disabled={exportLoading}
            className="px-3 py-1.5 text-xs bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center disabled:opacity-50"
          >
            {exportLoading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Exporting...
              </>
            ) : (
              "Export Report"
            )}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-[#1A1C22] p-5 rounded-xl flex flex-col">
          <h3 className="text-white text-base font-medium mb-4">
            Revenue vs Expenses
          </h3>
          <div className="flex-1">
            <Pie data={pieRevenueExpenseData} options={pieOptions} />
          </div>
          <div className="mt-4 pt-4 border-t border-[#2A2D35] grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2"></div>
              <div>
                <p className="text-gray-400 text-xs">Total Revenue</p>
                <p className="text-white font-medium">
                  {formatCurrency(summaryData.revenue)}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#f59e0b] mr-2"></div>
              <div>
                <p className="text-gray-400 text-xs">Total Expenses</p>
                <p className="text-white font-medium">
                  {formatCurrency(summaryData.expense)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#1A1C22] p-5 rounded-xl flex flex-col">
          <h3 className="text-white text-base font-medium mb-4">
            Transaction Status
          </h3>
          <div className="flex-1">
            <Pie data={pieStatusData} options={pieOptions} />
          </div>
          <div className="mt-4 pt-4 border-t border-[#2A2D35] grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#10b981] mr-2"></div>
              <div>
                <p className="text-gray-400 text-xs">Paid</p>
                <p className="text-white font-medium">
                  {transactionStatus.paid}
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#f59e0b] mr-2"></div>
              <div>
                <p className="text-gray-400 text-xs">Pending</p>
                <p className="text-white font-medium">
                  {transactionStatus.pending}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-[#1A1C22] p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-white text-base font-medium">
              {period === "monthly" ? "Monthly Trends" : "Quarterly Trends"}
            </h3>
            <div className="flex gap-1">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#10b981] mr-2"></div>
                <span className="text-xs text-gray-400">Revenue</span>
              </div>
              <div className="flex items-center ml-3">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b] mr-2"></div>
                <span className="text-xs text-gray-400">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <Bar data={barMonthlyData} options={barOptions} />
          </div>
        </div>

        <div className="bg-[#1A1C22] p-5 rounded-xl">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-white text-base font-medium">
              Category Status
            </h3>
            <div className="flex gap-1">
              <div className="flex items-center">
                <div className="w-2 h-2 rounded-full bg-[#10b981] mr-2"></div>
                <span className="text-xs text-gray-400">Paid</span>
              </div>
              <div className="flex items-center ml-3">
                <div className="w-2 h-2 rounded-full bg-[#f59e0b] mr-2"></div>
                <span className="text-xs text-gray-400">Pending</span>
              </div>
            </div>
          </div>
          <div className="h-64">
            <Bar data={barCategoryStatusData} options={barStackedOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;
