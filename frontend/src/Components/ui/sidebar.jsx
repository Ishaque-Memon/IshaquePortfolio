import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/layoutSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useProjects, useSkills, useCertificates, useContactMessages } from "../../hooks/usePortfolio";
// No need for framer-motion or AnimatePresence for sidebar open/close
import { 
  FiHome, FiUser, FiCode, FiBriefcase, FiAward, 
  FiBookOpen, FiMessageSquare, FiBarChart, FiLogOut,
  FiMenu, FiX, FiChevronLeft, FiChevronRight, FiSun, FiMoon
} from "react-icons/fi";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.layout.sidebarOpen);
  const dispatch = useDispatch();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  // Get real-time data
  const { projects } = useProjects();
  const { skills } = useSkills();
  const { certificates } = useCertificates();
  const { messages } = useContactMessages();
  // Calculate unread messages
  const unreadMessages = messages && Array.isArray(messages) ? messages.filter(m => !m.isRead).length : 0;
  const menuItems = [
    { name: "Dashboard", icon: FiHome, path: "/admin/dashboard", color: "text-blue-500" },
    { name: "Personal Info", icon: FiUser, path: "/admin/personal-info", color: "text-purple-500" },
    { name: "Skills", icon: FiCode, path: "/admin/skills", color: "text-green-500", badge: skills && skills.length > 0 ? skills.length.toString() : null },
    { name: "Projects", icon: FiBriefcase, path: "/admin/projects", color: "text-orange-500", badge: projects && projects.length > 0 ? projects.length.toString() : null },
    { name: "Certificates", icon: FiAward, path: "/admin/certificates", color: "text-yellow-500", badge: certificates && certificates.length > 0 ? certificates.length.toString() : null },
    { name: "Education", icon: FiBookOpen, path: "/admin/education", color: "text-indigo-500" },
    { name: "Messages", icon: FiMessageSquare, path: "/admin/messages", color: "text-pink-500", badge: messages && messages.length > 0 ? messages.length.toString() : null, badgeColor: unreadMessages > 0 ? "bg-red-500" : "bg-neutral-700" },
    { name: "Analytics", icon: FiBarChart, path: "/admin/analytics", color: "text-cyan-500" }
  ];
  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024 && sidebarOpen) {
      dispatch(toggleSidebar());
    }
  };
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const isActive = (path) => location.pathname === path;
  return (
    <aside
  className={`h-full flex flex-col shadow-xl rounded-r-2xl transition-all duration-300 ${isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'} border-r w-[80px] lg:w-[${sidebarOpen ? '280px' : '80px'}]`}
      style={{ minWidth: 80 }}
    >
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-neutral-800 px-2">
          <div className={sidebarOpen ? 'hidden lg:flex items-center gap-3' : 'flex items-center justify-center w-full'}>
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center shadow-md">
              <span className="text-white font-extrabold text-2xl tracking-wider">A</span>
            </div>
            {sidebarOpen && (
              <div className="hidden lg:block ml-2">
                <h2 className={`font-extrabold text-xl leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Admin</h2>
                <p className="text-xs text-neutral-400 font-medium">Panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-2">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`group w-full flex items-center gap-3 px-3 py-3 rounded-xl font-semibold transition-all duration-200
                    ${active
                      ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                      : isDarkMode
                        ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                        : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'}
                    ${sidebarOpen ? '' : 'justify-center'}`}
                  style={{ minHeight: 48 }}
                >
                  <span className={`flex items-center justify-center ${active ? 'text-white' : item.color} group-hover:scale-110 transition-transform`}>
                    <Icon size={22} />
                  </span>
                  {/* Only show text and badge if expanded on desktop */}
                  {sidebarOpen && (
                    <>
                      <span className="flex-1 text-left text-base font-medium hidden lg:inline">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold ${(item.badgeColor || 'bg-neutral-700') + ' text-white'} shadow-sm hidden lg:inline`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Bottom Actions */}
        <div className="border-t border-neutral-800 px-4 py-5 space-y-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all duration-200
              ${isDarkMode
                ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'}
              ${sidebarOpen ? '' : 'justify-center'}`}
          >
            <span className="flex items-center justify-center">
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            </span>
            {sidebarOpen && <span className="text-base hidden lg:inline">Toggle Theme</span>}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all duration-200
              ${isDarkMode
                ? 'text-red-400 hover:bg-red-500/10'
                : 'text-red-600 hover:bg-red-50'}
              ${sidebarOpen ? '' : 'justify-center'}`}
          >
            <span className="flex items-center justify-center">
              <FiLogOut size={20} />
            </span>
            {sidebarOpen && <span className="text-base hidden lg:inline">Logout</span>}
          </button>

          {/* Collapse Toggle (Desktop Only) */}
          <button
            onClick={() => dispatch(toggleSidebar())}
            className={`hidden lg:flex w-full items-center justify-center gap-3 px-3 py-2 rounded-xl font-semibold transition-all duration-200
              ${isDarkMode
                ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}
            type="button"
          >
            {!sidebarOpen ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
          </button>
        </div>
      </div>
    </aside>
	);
}

export default Sidebar;
