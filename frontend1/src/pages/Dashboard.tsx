// src/pages/Dashboard.tsx
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiDollarSign,
  FiTrendingUp,
  FiCreditCard,
  FiPieChart,
  FiHome,
  FiList,
  FiBarChart2,
  FiUser,
  FiMessageSquare,
  FiSettings,
  FiLogOut,
  FiBell,
} from "react-icons/fi";
import '../utils/chartConfig'
import SummaryCard from "../components/dashboard/SummaryCard";
import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import FinancialOverview from "../components/dashboard/FinancialOverviewProps";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import TransactionSection from "../components/common/TransactionSection";
import AnalyticsSection from "../components/common/Analytics";

import useUserStore from "../store/useUserStore";
import type { Transaction, NavItem } from "../../types/dashboardTypes";

const Dashboard = () => {
  const { user } = useUserStore();
  const [activeNav, setActiveNav] = useState<string>("Dashboard");
  const mainContentRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false); // ✅ ADDED missing scroll flag
  const [timeframe, setTimeframe] = useState("Monthly");
  const [selectedDate, setSelectedDate] = useState("2024-06-01");
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [summaryData, setSummaryData] = useState({
    balance: 0,
    expense: 0,
    revenue: 0,
  });
  const [chartData, setChartData] = useState<any>({
    labels: [],
    datasets: [],
  });

  // Section Refs
  const dashboardRef = useRef<HTMLDivElement>(null);
  const transactionsRef = useRef<HTMLDivElement>(null);
  const analyticsRef = useRef<HTMLDivElement>(null);
  const walletRef = useRef<HTMLDivElement>(null);
  const personalRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const settingRef = useRef<HTMLDivElement>(null);

  // Fetch summary data
  const getBalanceRevenueExpense = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/transactions/summary",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSummaryData(
        response.data?.data || { balance: 0, expense: 0, revenue: 0 }
      );
    } catch (error) {
      console.error("Error fetching summary data:", error);
    }
  };

  const getMonthlyRevenueAndExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/transactions/trends/monthly",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const responseData = response.data?.data;
      if (Array.isArray(responseData)) {
        const labels = responseData.map((item) => item.month);
        const incomeData = responseData.map((item) => item.income);
        const expenseData = responseData.map((item) => item.expense);

        setChartData({
          labels,
          datasets: [
            {
              label: "Income",
              data: incomeData,
              borderColor: "#10b981",
              backgroundColor: "rgba(16, 185, 129, 0.2)",
              tension: 0.4,
              fill: true,
            },
            {
              label: "Expenses",
              data: expenseData,
              borderColor: "#f59e0b",
              backgroundColor: "rgba(245, 158, 11, 0.2)",
              tension: 0.4,
              fill: true,
            },
          ],
        });
      }
    } catch (error) {
      console.error("Error fetching month-wise data:", error);
    }
  };

  const getWeeklyRevenueAndExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/transactions/trends/weekly",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const apiData = response.data.data;
      const shortMonths = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      const sortedData = [...apiData].sort((a, b) => {
        const [aDay, aMonth, aYear] = a.week.split(" - ")[0].split("/").map(Number);
        const [bDay, bMonth, bYear] = b.week.split(" - ")[0].split("/").map(Number);
        return new Date(aYear, aMonth - 1, aDay).getTime() - new Date(bYear, bMonth - 1, bDay).getTime();
      });

      const labels = sortedData.map((entry) => {
        const [start, end] = entry.week.split(" - ");
        const [sDay, sMonth, sYear] = start.split("/").map(Number);
        const [eDay, eMonth, eYear] = end.split("/").map(Number);

        const startDate = new Date(sYear, sMonth - 1, sDay);
        const endDate = new Date(eYear, eMonth - 1, eDay);

        const startLabel = `${shortMonths[startDate.getMonth()]} ${startDate.getDate()}`;
        const endLabel = startDate.getMonth() === endDate.getMonth()
          ? `${endDate.getDate()}`
          : `${shortMonths[endDate.getMonth()]} ${endDate.getDate()}`;

        return `${startLabel} – ${endLabel}`;
      });

      setChartData({
        labels,
        datasets: [
          {
            label: "Income",
            data: sortedData.map((entry) => entry.income),
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "Expenses",
            data: sortedData.map((entry) => entry.expense),
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching weekly data:", error);
    }
  };

  const getDailyRevenueAndExpenses = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/transactions/trends/daily",
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const apiData = response.data.data;
      const today = new Date(selectedDate);
      const twentyDaysAgo = new Date(selectedDate);
      twentyDaysAgo.setDate(today.getDate() - 19);

      const shortMonths = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
      ];

      const filteredData = apiData
        .map((entry) => {
          const [day, month, year] = entry.day.split("/").map(Number);
          return { ...entry, dateObj: new Date(year, month - 1, day) };
        })
        .filter(({ dateObj }) => dateObj >= twentyDaysAgo && dateObj <= today)
        .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime());

      const labels = filteredData.map(
        ({ dateObj }) => `${shortMonths[dateObj.getMonth()]} ${dateObj.getDate()}`
      );

      setChartData({
        labels,
        datasets: [
          {
            label: "Income",
            data: filteredData.map((entry) => entry.income),
            borderColor: "#10b981",
            backgroundColor: "rgba(16, 185, 129, 0.2)",
            tension: 0.4,
            fill: true,
          },
          {
            label: "Expenses",
            data: filteredData.map((entry) => entry.expense),
            borderColor: "#f59e0b",
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            tension: 0.4,
            fill: true,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching daily data:", error);
    }
  };

  const getRecentTransactions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/transactions/recent",
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTransactions(response.data.data || []);
    } catch (error) {
      console.error("Error fetching recent transactions:", error);
    }
  };

  useEffect(() => {
    getBalanceRevenueExpense();
    getRecentTransactions();
    switch (timeframe) {
      case "Monthly":
        getMonthlyRevenueAndExpenses();
        break;
      case "Weekly":
        getWeeklyRevenueAndExpenses();
        break;
      case "Daily":
        getDailyRevenueAndExpenses();
        break;
    }
  }, [timeframe, selectedDate]);

  useEffect(() => {
    if (localStorage.getItem("token") === null) {
      navigate("/login");
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ✅ Sync scroll between sidebar and content
  useEffect(() => {
    const mainContent = mainContentRef.current;
    const sidebar = sidebarRef.current;
    if (!mainContent || !sidebar) return;

    const syncScroll = (from: HTMLElement, to: HTMLElement) => {
      if (isScrollingRef.current) return;
      isScrollingRef.current = true;
      to.scrollTop = from.scrollTop;
      setTimeout(() => (isScrollingRef.current = false), 100);
    };

    const handleMainScroll = () => syncScroll(mainContent, sidebar);
    const handleSidebarScroll = () => syncScroll(sidebar, mainContent);

    mainContent.addEventListener("scroll", handleMainScroll);
    sidebar.addEventListener("scroll", handleSidebarScroll);

    return () => {
      mainContent.removeEventListener("scroll", handleMainScroll);
      sidebar.removeEventListener("scroll", handleSidebarScroll);
    };
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: mainContentRef.current,
      rootMargin: "-80px 0px -50% 0px",
      threshold: 0.1,
    };

    const sectionRefs = [
      { ref: dashboardRef, label: "Dashboard" },
      { ref: transactionsRef, label: "Transactions" },
      { ref: analyticsRef, label: "Analytics" },
      { ref: walletRef, label: "Wallet" },
      { ref: personalRef, label: "Personal" },
      { ref: messageRef, label: "Message" },
      { ref: settingRef, label: "Setting" },
    ];

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const section = sectionRefs.find((s) => s.ref.current === entry.target);
          if (section) setActiveNav(section.label);
        }
      });
    }, observerOptions);

    sectionRefs.forEach((section) => {
      if (section.ref.current) observer.observe(section.ref.current);
    });

    return () => {
      sectionRefs.forEach((section) => {
        if (section.ref.current) observer.unobserve(section.ref.current);
      });
    };
  }, []);

  const formatCurrency = (amount: number): string =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(amount);

  const navItems: NavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: <FiHome /> },
    { id: "transactions", label: "Transactions", icon: <FiList /> },
    { id: "analytics", label: "Analytics", icon: <FiBarChart2 /> },
    { id: "wallet", label: "Wallet", icon: <FiCreditCard /> },
    { id: "personal", label: "Personal", icon: <FiUser /> },
    { id: "message", label: "Message", icon: <FiMessageSquare /> },
    { id: "setting", label: "Setting", icon: <FiSettings /> },
  ];

  const handleNavClick = (label: string) => {
    setActiveNav(label);
    const refMap: Record<string, React.RefObject<HTMLDivElement>> = {
      Dashboard: dashboardRef,
      Transactions: transactionsRef,
      Analytics: analyticsRef,
      Wallet: walletRef,
      Personal: personalRef,
      Message: messageRef,
      Setting: settingRef,
    };
    refMap[label]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="flex h-screen bg-[#1A1C22] text-white overflow-hidden">
      <Sidebar
        activeNav={activeNav}
        navItems={navItems}
        sidebarRef={sidebarRef}
        onNavClick={handleNavClick}
      />

      <main ref={mainContentRef} className="flex-1 overflow-y-auto">
        <Header
          activeNav={activeNav}
          user={user}
          onSignOut={handleSignOut}
        />

        <div className="p-8">
          <div ref={dashboardRef} style={{ scrollMarginTop: "80px" }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <SummaryCard title="Balance" value={formatCurrency(summaryData.balance)} icon={<FiDollarSign />} change="+2.5%" changePositive={true} />
              <SummaryCard title="Revenue" value={formatCurrency(summaryData.revenue)} icon={<FiTrendingUp />} change="+3.2%" changePositive={true} />
              <SummaryCard title="Expenses" value={formatCurrency(summaryData.expense)} icon={<FiCreditCard />} change="-1.8%" changePositive={false} />
              <SummaryCard title="Savings" value={formatCurrency(summaryData.revenue - summaryData.expense)} icon={<FiPieChart />} change="+4.1%" changePositive={true} />
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <FinancialOverview
                timeframe={timeframe}
                setTimeframe={setTimeframe}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                chartData={chartData}
              />
              <RecentTransactions transactions={transactions} />
            </div>
          </div>

          <div ref={transactionsRef} style={{ scrollMarginTop: "80px" }}>
            <TransactionSection />
          </div>

          <div ref={analyticsRef} style={{ scrollMarginTop: "80px" }}>
            <AnalyticsSection />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
