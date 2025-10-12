
import React from "react";
import { useTheme } from "../../contexts/ThemeContext";

const Header = ({ title, rightContent, notificationContent }) => {
  const { isDarkMode } = useTheme();
  return (
    <header className={`sticky top-0 z-30 h-16 border-b backdrop-blur-sm flex items-center px-4 lg:px-8 transition-all duration-300 ${isDarkMode ? 'bg-neutral-900/80 border-neutral-800 text-white' : 'bg-white/80 border-neutral-200 text-neutral-900'}`}>
      <h1 className="text-xl font-bold flex-1 truncate">{title}</h1>
      {notificationContent && <div className="mr-2">{notificationContent}</div>}
      {rightContent && <div>{rightContent}</div>}
    </header>
  );
};

export default Header;
