// src/components/dashboard/RecentTransactions.tsx
import React from "react";
import type { Transaction } from "../../types/dashboardTypes";

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => (
  <div className="bg-[#23252E] rounded-2xl p-6 mb-8 shadow-lg md:w-1/3">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-white">
        Recent Transactions
      </h2>
      <button className="text-green-400 text-sm font-medium hover:underline">
        See all
      </button>
    </div>

    <div className="space-y-4">
      {transactions.map((tx) => (
        <div
          key={tx._id}
          className="flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <img
              src={tx.user_profile || "https://via.placeholder.com/40"}
              alt={tx.user_name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="text-xs text-gray-400">
                {tx.date.split('T')[0]}
              </p>
              <p className="text-sm font-medium text-white">
                {tx.user_name}
              </p>
            </div>
          </div>
          <div className="py-4 px-4">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                tx.status === "Paid"
                  ? "bg-emerald-500/20 text-emerald-400"
                  : "bg-amber-500/20 text-amber-400"
              }`}
            >
              {tx.status}
            </span>
          </div>
          <p
            className={`text-sm font-semibold ${
              tx.status === "Paid" ? "text-green-400" : "text-yellow-500"
            }`}
          >
            {tx.amount > 0 ? "+" : ""}
            {tx.amount}
          </p>
        </div>
      ))}
    </div>
  </div>
);

export default RecentTransactions;