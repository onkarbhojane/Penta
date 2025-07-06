import React from "react";
import { FiArrowUpRight, FiArrowDownRight } from "react-icons/fi";

interface SummaryCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const SummaryCard: React.FC<SummaryCardProps> = ({
  title,
  value,
  icon
}) => (
  <div className="bg-[#23252E] p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="text-sm text-gray-400 mb-2">{title}</h3>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
      <div className="bg-indigo-600/20 p-3 rounded-xl text-indigo-400">
        {icon}
      </div>
    </div>
  </div>
);

export default SummaryCard;