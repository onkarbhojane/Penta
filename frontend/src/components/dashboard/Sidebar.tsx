import React from "react";
import logo from "../../assets/logo.png";
export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  activeNav: string;
  navItems: NavItem[];
  sidebarRef: React.RefObject<HTMLDivElement>;
  onNavClick: (label: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeNav,
  navItems,
  sidebarRef,
  onNavClick,
}) => (
  <aside
    ref={sidebarRef}
    className="w-64 h-full bg-[#1A1C22] border-r border-[#2A2D35] flex flex-col justify-between p-6 overflow-y-auto"
  >
    <div>
      <div className="flex items-center space-x-3 text-xl font-bold mb-10">
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
      </div>
      <nav className="space-y-2">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center space-x-3 w-full p-3 rounded-lg text-left transition-all ${
              activeNav === item.label
                ? "bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border-l-4 border-indigo-500"
                : "hover:bg-[#23252E]"
            }`}
            onClick={() => onNavClick(item.label)}
          >
            <div
              className={`text-lg ${
                activeNav === item.label ? "text-indigo-400" : "text-gray-400"
              }`}
            >
              {item.icon}
            </div>
            <span
              className={`text-sm font-medium ${
                activeNav === item.label ? "text-white" : "text-gray-300"
              }`}
            >
              {item.label}
            </span>
          </button>
        ))}
      </nav>
    </div>
    <div className="text-xs text-gray-500 pt-4 border-t border-[#2A2D35]">
      © 2025 Penta
    </div>
  </aside>
);

export default Sidebar;
