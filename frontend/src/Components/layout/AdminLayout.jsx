
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/layoutSlice";
import { useTheme } from "../../contexts/ThemeContext";

const AdminLayout = ({ header, sidebar, children }) => {
  const sidebarOpen = useSelector((state) => state.layout.sidebarOpen);
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();

  return (
    <div className={isDarkMode ? "relative min-h-screen bg-neutral-950 text-white" : "relative min-h-screen bg-neutral-100 text-neutral-900"}>
      {/* Sidebar (always visible, collapsed on mobile, togglable on desktop) */}
      <div
        className={`fixed top-0 left-0 h-full z-30 ${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} border-r transition-all duration-300 ${sidebarOpen ? 'lg:w-[280px]' : 'lg:w-[80px]'} w-[80px]`}
        style={{ minWidth: 80 }}
      >
        {sidebar}
      </div>
      {/* Main Content */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ${isDarkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-100 text-neutral-900'} 
          ${sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[80px]'} ml-[80px]`}
      >
        {/* Header */}
        <div className={`sticky top-0 z-30 h-16 border-b backdrop-blur-sm flex items-center px-4 lg:px-8 transition-all duration-300 ${isDarkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white/80 border-neutral-200'}`}>
          {header}
        </div>
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
