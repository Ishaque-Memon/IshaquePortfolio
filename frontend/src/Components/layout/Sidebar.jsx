import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiHome, FiUser, FiCode, FiBriefcase, FiAward, 
  FiBookOpen, FiMessageSquare, FiBarChart, FiLogOut,
  FiMenu, FiX, FiChevronLeft, FiChevronRight, FiSun, FiMoon
} from "react-icons/fi";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuthContext();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { 
      name: "Dashboard", 
      icon: FiHome, 
      path: "/admin/dashboard",
      color: "text-blue-500" 
    },
    { 
      name: "Personal Info", 
      icon: FiUser, 
      path: "/admin/personal-info",
      color: "text-purple-500" 
    },
    { 
      name: "Skills", 
      icon: FiCode, 
      path: "/admin/skills",
      color: "text-green-500",
      badge: "15" 
    },
    { 
      name: "Projects", 
      icon: FiBriefcase, 
      path: "/admin/projects",
      color: "text-orange-500",
      badge: "8" 
    },
    { 
      name: "Certificates", 
      icon: FiAward, 
      path: "/admin/certificates",
      color: "text-yellow-500",
      badge: "7" 
    },
    { 
      name: "Education", 
      icon: FiBookOpen, 
      path: "/admin/education",
      color: "text-indigo-500" 
    },
    { 
      name: "Messages", 
      icon: FiMessageSquare, 
      path: "/admin/messages",
      color: "text-pink-500",
      badge: "12",
      badgeColor: "bg-red-500" 
    },
    { 
      name: "Analytics", 
      icon: FiBarChart, 
      path: "/admin/analytics",
      color: "text-cyan-500" 
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className={`lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg ${
          isDarkMode ? 'bg-neutral-900 text-white' : 'bg-white text-neutral-900'
        } shadow-lg`}
      >
        {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          width: isCollapsed ? "80px" : "280px",
          x: isMobileMenuOpen ? 0 : 0 
        }}
        className={`fixed top-0 left-0 h-screen z-40 ${
          isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
        } border-r transition-all duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-neutral-800">
            {!isCollapsed && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-2"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">A</span>
                </div>
                <div>
                  <h2 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    Admin
                  </h2>
                  <p className="text-xs text-neutral-500">Panel</p>
                </div>
              </motion.div>
            )}
            {isCollapsed && (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xl">A</span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-2">
            <div className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.path);
                
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigation(item.path)}
                    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                      active
                        ? 'bg-primary-500 text-white'
                        : isDarkMode
                        ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                        : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                    } ${isCollapsed ? 'justify-center' : ''}`}
                  >
                    <Icon size={20} className={!active && !isCollapsed ? item.color : ''} />
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-left text-sm font-medium">
                          {item.name}
                        </span>
                        {item.badge && (
                          <Badge 
                            variant="secondary" 
                            className={`${
                              item.badgeColor || 'bg-neutral-700'
                            } text-white text-xs px-2`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Bottom Actions */}
          <div className="border-t border-neutral-800 p-4 space-y-2">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isDarkMode
                  ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              {isDarkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
              {!isCollapsed && <span className="text-sm">Toggle Theme</span>}
            </button>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isDarkMode
                  ? 'text-red-400 hover:bg-red-500/10'
                  : 'text-red-600 hover:bg-red-50'
              } ${isCollapsed ? 'justify-center' : ''}`}
            >
              <FiLogOut size={20} />
              {!isCollapsed && <span className="text-sm">Logout</span>}
            </button>

            {/* Collapse Toggle (Desktop Only) */}
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className={`hidden lg:flex w-full items-center justify-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isDarkMode
                  ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white'
                  : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
              }`}
            >
              {isCollapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
            </button>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
