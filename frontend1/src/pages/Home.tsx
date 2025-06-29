// src/pages/Home.tsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import useUserStore from "../store/useUserStore";
import logo from "../assets/logo.png";
interface Feature {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

const Home: React.FC = () => {
  const { user } = useUserStore();
  const features: Feature[] = [
    {
      title: "Interactive Dashboard",
      desc: "Visualize income, expenses, and trends with beautiful charts",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-blue-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
      ),
    },
    {
      title: "Smart Transactions",
      desc: "Filter, search, and sort transactions with powerful tools",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-700/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
      ),
    },
    {
      title: "Export Reports",
      desc: "Customize and export CSV reports with one click",
      icon: (
        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-500/20 to-green-700/20 flex items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <nav className="flex justify-between items-center p-6 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <img
            src={logo}
            alt="Penta Logo"
            className="w-7 h-7 rounded-lg object-contain"
          />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Penta
          </span>
        </div>

        {localStorage.getItem("token") !== null ? (
          <Link
            to="/dashboard"
            className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600"
          >
            <img
              src={
                "https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
              }
              alt="User Avatar"
              className="w-full h-full rounded-full"
            />
          </Link>
        ) : (
          <Link
            to="/login"
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 transition-all duration-300"
          >
            Login
          </Link>
        )}
      </nav>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-16 md:mb-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              <span className="block">Financial Analytics</span>
              <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                Made Intelligent
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-lg">
              Transform raw financial data into actionable insights. Track
              transactions, visualize trends, and generate reports in real-time.
            </p>
            <Link
              to={
                localStorage.getItem("token") !== null ? "/dashboard" : "/login"
              }
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-600 text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </motion.div>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-600/20 blur-2xl rounded-2xl" />
            <div className="relative bg-gray-800 rounded-2xl shadow-2xl p-6 border border-gray-700 max-w-md">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold">Dashboard Preview</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
              </div>
              <div className="h-48 mb-6 relative">
                <div className="absolute bottom-0 w-full h-16 bg-gradient-to-t from-gray-900 to-transparent z-10" />
                <div className="h-full flex items-end space-x-1">
                  {[40, 60, 75, 55, 80, 65, 50, 70].map((height, index) => (
                    <div
                      key={`blue-${index}`}
                      className="w-2 bg-gradient-to-t from-blue-500 to-blue-700 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                  {[30, 50, 45, 60, 40, 55, 65, 35].map((height, index) => (
                    <div
                      key={`purple-${index}`}
                      className="w-2 bg-gradient-to-t from-purple-500 to-purple-700 rounded-t"
                      style={{ height: `${height}%` }}
                    />
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Balance</p>
                  <p className="text-lg font-bold">$12,560</p>
                </div>
                <div className="bg-gray-900 p-4 rounded-lg">
                  <p className="text-gray-400 text-sm">Revenue</p>
                  <p className="text-lg font-bold text-green-500">$8,240</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="py-16 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Powerful Financial Insights
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to analyze your financial data effectively
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700"
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>© 2023 FinDash Analytics. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
