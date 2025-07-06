import React, { useEffect, useState, type Key } from "react";
import {
  FiSearch,
  FiArrowUpRight,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import axios from "axios";
const apiUrl = import.meta.env.API_URL;
interface Transaction {
  _id: Key | null | undefined;
  category: string;
  user_profile: string | undefined;
  profile: string | undefined;
  user_id: string;
  id: number;
  name: string;
  date: string;
  amount: number;
  status: "Completed" | "Pending" | "Paid";
  image: string;
}

const formatCurrency = (amount: number): string => {
  return `$${Math.abs(amount).toFixed(2)}`;
};

const TransactionSection: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const pageSize = 5;

  const fetchTransactions = async (page: number) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:5000/api/transactions/list`,
        {
          params: {
            page,
            limit: pageSize,
            search: searchQuery,
            sortField,
            sortOrder,
            status: statusFilter,
            category: categoryFilter,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTransactions(response.data.data);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching transactions", error);
    }
  };

  const handleExportCSV = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.get(
        `http://localhost:5000/api/transactions/export/csv`,
        {
          params: {
            search: searchQuery,
            sortField,
            sortOrder,
            status: statusFilter,
            category: categoryFilter,
          },
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "transactions.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("CSV export failed", error);
    }
  };

  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage, searchQuery, sortField, sortOrder, statusFilter, categoryFilter]);

  const goToPreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-[#23252E] rounded-2xl p-6 shadow-lg text-white w-full mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
        <h2 className="text-xl font-bold">Transaction History</h2>
        <div className="flex flex-col md:flex-row gap-3 items-center">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search by name or user..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#2A2D34] text-sm placeholder-gray-400 focus:outline-none"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#2A2D34] text-gray-300 text-sm px-3 py-2 rounded-lg"
          >
            <option value="">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#2A2D34] text-gray-300 text-sm px-3 py-2 rounded-lg"
          >
            <option value="">All Categories</option>
            <option value="Expense">Expense</option>
            <option value="Revenue">Revenue</option>
          </select>

          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value)}
            className="bg-[#2A2D34] text-gray-300 text-sm px-3 py-2 rounded-lg"
          >
            <option value="date">Sort by Date</option>
            <option value="amount">Sort by Amount</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="bg-[#2A2D34] text-gray-300 text-sm px-3 py-2 rounded-lg"
          >
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>

          <button
            onClick={() => {
              setSearchQuery("");
              setSortField("date");
              setSortOrder("desc");
              setStatusFilter("");
              setCategoryFilter("");
            }}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg text-sm hover:bg-gray-600 transition-colors"
          >
            Reset Filters
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm hover:bg-indigo-700 transition-colors flex items-center"
          >
            Export
            <FiArrowUpRight className="ml-2" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-[#1A1C22]">
            <tr>
              <th className="py-3 px-4 text-left text-gray-400">Name</th>
              <th className="py-3 px-4 text-left text-gray-400">Date</th>
              <th className="py-3 px-4 text-left text-gray-400">Amount</th>
              <th className="py-3 px-4 text-left text-gray-400">Status</th>
              <th className="py-3 px-4 text-left text-gray-400">Category</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2A2D35]">
            {transactions.map((tx) => (
              <tr key={tx._id} className="hover:bg-[#1A1C22] transition-colors">
                <td className="py-4 px-4">
                  <div className="flex items-center">
                    <img
                      src={tx.user_profile}
                      alt={tx.user_id}
                      className="w-10 h-10 rounded-full object-cover mr-3"
                    />
                    <div>
                      <p className="text-white font-medium">
                        {tx.name || tx.user_id}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4 text-gray-300">
                  {new Date(tx.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td
                  className={`py-4 px-4 font-medium ${
                    tx.status === "Paid" ? "text-emerald-400" : "text-amber-400"
                  }`}
                >
                  {tx.amount > 0 ? "+" : "-"}
                  {formatCurrency(tx.amount)}
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      tx.status === "Paid"
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-amber-500/20 text-amber-400"
                    }`}
                  >
                    {tx.status}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <div>{tx.category}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-6 pt-4 border-t border-[#2A2D35]">
        <p className="text-sm text-gray-400">
          Page {currentPage} of {totalPages}
        </p>
        <div className="flex space-x-2">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`w-10 h-10 flex items-center justify-center bg-[#1A1C22] rounded-lg ${
              currentPage === 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:bg-[#2A2D35]"
            }`}
          >
            <FiChevronLeft />
          </button>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`w-10 h-10 flex items-center justify-center bg-[#1A1C22] rounded-lg ${
              currentPage === totalPages
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-300 hover:bg-[#2A2D35]"
            }`}
          >
            <FiChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionSection;
