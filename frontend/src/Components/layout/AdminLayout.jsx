import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/layoutSlice";

const AdminLayout = ({ header, sidebar, children }) => {
  const sidebarOpen = useSelector((state) => state.layout.sidebarOpen);
  // For desktop, always render sidebar, just change width (collapsed/expanded)
  // For mobile, sidebarOpen controls overlay and panel
  const dispatch = useDispatch();

  return (
    <div className="relative min-h-screen bg-neutral-100 dark:bg-neutral-950">
      {/* Sidebar (always visible, collapsed on mobile, togglable on desktop) */}
      <div
        className={`fixed top-0 left-0 h-full z-30 bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 transition-all duration-300 ${sidebarOpen ? 'lg:w-[280px]' : 'lg:w-[80px]'} w-[80px]`}
        style={{ minWidth: 80 }}
      >
        {sidebar}
      </div>
      {/* Main Content */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 bg-neutral-100 dark:bg-neutral-950 
          ${sidebarOpen ? 'lg:ml-[280px]' : 'lg:ml-[80px]'} ml-[80px]`}
      >
        {/* Header */}
        <div className="sticky top-0 z-30 h-16 border-b bg-white/80 dark:bg-neutral-900/80 border-neutral-200 dark:border-neutral-800 backdrop-blur-sm flex items-center px-4 lg:px-8 transition-all duration-300">
          {/* Toggle button removed on small screens; only show on desktop if needed */}
          {header}
        </div>
        <main className="flex-1 p-6 md:p-10 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
