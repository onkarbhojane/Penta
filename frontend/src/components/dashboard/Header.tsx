import React, { useState } from "react";
import { FiBell, FiChevronDown } from "react-icons/fi";
import type { User } from "../../types/authTypes";
const apiUrl = import.meta.env.API_URL;
interface HeaderProps {
  activeNav: string;
  user: User|null;
  onSignOut: () => void;
}

const Header: React.FC<HeaderProps> = ({ activeNav, user, onSignOut }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <div className="sticky top-0 z-10 bg-[#1A1C22] h-20 w-full flex items-center justify-between px-8 border-b border-[#2A2D35]">
      <h1 className="text-xl font-bold text-white">{activeNav}</h1>
      <div className="flex items-center space-x-6">
        <button className="relative p-2 rounded-full bg-[#23252E] hover:bg-[#2A2D35] transition-colors">
          <FiBell className="text-gray-300 text-xl" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="relative">
          <button
            className="flex items-center space-x-2 group"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src="https://png.pngtree.com/png-vector/20231019/ourmid/pngtree-user-profile-avatar-png-image_10211467.png"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium text-white">{user?.name||"User Name"}</p>
            </div>
            <FiChevronDown
              className={`text-gray-400 transition-transform ${
                showProfileMenu ? "rotate-180" : ""
              }`}
            />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-[#23252E] rounded-xl shadow-lg border border-[#2A2D35] overflow-hidden z-20">
              <div className="p-4 border-b border-[#2A2D35]">
                <p className="text-sm font-medium text-white">{user?.name||"User Name"}</p>
                <p className="text-xs text-gray-400">{user?.email||"User Email"}</p>
              </div>
              <div className="py-1 border-t border-[#2A2D35]">
                <button
                  onClick={onSignOut}
                  className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-[#2A2D35] transition-colors"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;