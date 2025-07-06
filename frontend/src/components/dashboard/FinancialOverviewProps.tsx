import React from "react";
import { Line } from "react-chartjs-2";
import { FiChevronDown } from "react-icons/fi";
import type { ChartOptions } from "chart.js";

interface FinancialOverviewProps {
  timeframe: string;
  setTimeframe: (value: string) => void;
  selectedDate: string;
  setSelectedDate: (value: string) => void;
  chartData: any;
}

const FinancialOverview: React.FC<FinancialOverviewProps> = ({
  timeframe,
  setTimeframe,
  selectedDate,
  setSelectedDate,
  chartData,
}) => {
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#111827",
        titleColor: "#10b981",
        bodyColor: "#f9fafb",
        borderColor: "#374151",
        borderWidth: 1,
        padding: 12,
        displayColors: false,
        callbacks: { label: (context) => `$${context.parsed.y.toFixed(2)}` },
      },
    },
    scales: {
      x: {
        display: timeframe !== "Daily",
        ticks: {
          color: "#9ca3af",
          autoSkip: true,
          maxRotation: 45,
          minRotation: 25,
          maxTicksLimit: 10,
        },
        grid: { color: "#2f2f2f" },
      },
      y: {
        ticks: {
          color: "#9ca3af",
          callback: (value) => "₹" + value,
        },
        grid: { color: "#2f2f2f" },
      },
    },
  };

  return (
    <div className="bg-[#23252E] rounded-2xl p-6 mb-8 shadow-lg md:w-2/3">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <h2 className="text-lg font-semibold text-white">
          Financial Overview
        </h2>

        <div className="flex flex-wrap gap-3 w-full sm:w-auto">
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-green-400 rounded-full"></span>
              <span className="text-sm text-gray-300">Income</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
              <span className="text-sm text-gray-300">Expenses</span>
            </div>
          </div>

          {timeframe === "Daily" && (
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
              max={new Date().toISOString().split("T")[0]}
            />
          )}

          <div className="relative min-w-[120px]">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="appearance-none bg-[#1A1C22] text-gray-300 text-sm px-4 py-2 pr-8 rounded-lg border border-[#2A2D35] focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
            >
              <option value="Monthly">Monthly</option>
              <option value="Weekly">Weekly</option>
              <option value="Daily">Daily</option>
            </select>
            <FiChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="h-80">
        <Line data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default FinancialOverview;