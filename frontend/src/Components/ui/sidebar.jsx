import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "../../redux/layoutSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { useProjects, useSkills, useCertificates, useContactMessages } from "../../hooks/usePortfolio";
import { outlineIcon, SidebarIcons } from "../../assets/Icons/Icons";
import { Badge } from "@/components/ui/badge";

const Sidebar = () => {
  const sidebarOpen = useSelector((state) => state.layout.sidebarOpen);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuthContext();

  const { projects } = useProjects();
  const { skills } = useSkills();
  const { certificates } = useCertificates();
  const { messages } = useContactMessages();

  const unreadCount = messages && Array.isArray(messages) 
    ? messages.filter(msg => !msg.isRead).length 
    : 0;

  const navigationItems = [
    { 
      label: "Dashboard", 
      icon: SidebarIcons.FiHome, 
      route: "/admin/dashboard", 
      iconColor: "text-blue-500" 
    },
    { 
      label: "Personal Info", 
      icon: SidebarIcons.FiUser, 
      route: "/admin/personal-info", 
      iconColor: "text-purple-500" 
    },
    { 
      label: "Skills", 
      icon: SidebarIcons.FiCode, 
      route: "/admin/skills", 
      iconColor: "text-green-500",
      count: skills && skills.length > 0 ? skills.length : null
    },
    { 
      label: "Projects", 
      icon: SidebarIcons.FiBriefcase, 
      route: "/admin/projects", 
      iconColor: "text-orange-500",
      count: projects && projects.length > 0 ? projects.length : null
    },
    { 
      label: "Certificates", 
      icon: SidebarIcons.FiAward, 
      route: "/admin/certificates", 
      iconColor: "text-yellow-500",
      count: certificates && certificates.length > 0 ? certificates.length : null
    },
    { 
      label: "Education", 
      icon: SidebarIcons.FiBookOpen, 
      route: "/admin/education", 
      iconColor: "text-indigo-500" 
    },
    { 
      label: "Messages", 
      icon: SidebarIcons.FiMessageSquare, 
      route: "/admin/messages", 
      iconColor: "text-pink-500",
      count: messages && messages.length > 0 ? messages.length : null
    },
    { 
      label: "Analytics", 
      icon: SidebarIcons.FiBarChart, 
      route: "/admin/analytics", 
      iconColor: "text-cyan-500" 
    }
  ];

  const handleNavigate = (route) => {
    navigate(route);
    if (window.innerWidth < 1024 && sidebarOpen) {
      dispatch(toggleSidebar());
    }
  };

  const handleLogoutClick = () => {
    logout();
    navigate("/login");
  };

  const isActiveRoute = (route) => location.pathname === route;

  return (
    <aside
      className="h-full flex flex-col"
    >
      <div className="flex flex-col h-full">
        {/* Header Section */}
        <div className={`flex items-center h-16 px-3 border-b ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'}`}>
          {sidebarOpen ? (
            <>
              <button
                onClick={() => dispatch(toggleSidebar())}
                className={`hidden lg:flex items-center justify-center w-10 h-10 mx-1 rounded-full transition-colors duration-200
                  ${isDarkMode ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}
                type="button"
                aria-label="Collapse sidebar"
              >
                {outlineIcon.LeftSidebar}
              </button>
              <div className="flex items-center gap-3 flex-1">
                <div className="hidden lg:block">
                  <h2 className={`font-extrabold text-lg leading-tight ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    Admin Panel
                  </h2>
                </div>
              </div>
              
            </>
          ) : (
            <div className="w-full flex justify-center">
              <button
                onClick={() => dispatch(toggleSidebar())}
                className={`hidden lg:flex items-center justify-center w-10 h-10 rounded-full transition-colors duration-200
                  ${isDarkMode ? 'text-neutral-400 hover:bg-neutral-800 hover:text-white' : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'}`}
                type="button"
                aria-label="Expand sidebar"
              >
                {outlineIcon.RightSidebar}
              </button>
            </div>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          <ul className="space-y-1">
            {navigationItems.map((item) => {
              const ItemIcon = item.icon;
              const isActive = isActiveRoute(item.route);
              
              return (
                <li key={item.route}>
                  <button
                    onClick={() => handleNavigate(item.route)}
                    className={`group flex items-center w-full gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200
                      ${isActive
                        ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-md'
                        : isDarkMode
                          ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                          : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'}
                      ${sidebarOpen ? '' : 'justify-center'}
                    `}
                    style={{ minHeight: 44 }}
                  >
                    <span className={`flex items-center justify-center ${isActive ? 'text-white' : item.iconColor} group-hover:scale-110 transition-transform`}>
                      <ItemIcon size={22} />
                    </span>
                    
                    {sidebarOpen && (
                      <>
                        {/* label */}
                        <span className="flex-1 text-left text-base font-medium hidden lg:block">
                          {item.label}
                        </span>
                        {item.count && (
                          <span className="ml-2 hidden lg:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-neutral-700 text-white shadow-sm">
                            {item.count}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer Section */}
        <div className={`mt-auto px-2 py-4 border-t ${isDarkMode ? 'border-neutral-800' : 'border-neutral-200'} flex flex-col gap-2`}>
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-200 w-full
              ${isDarkMode
                ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                : 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900'}
              ${sidebarOpen ? '' : 'justify-center'}`}
            aria-label="Toggle theme"
          >
            <span className="flex items-center justify-center">
              {isDarkMode ? <SidebarIcons.FiSun size={20} /> : <SidebarIcons.FiMoon size={20} />}
            </span>
            {sidebarOpen && <span className="text-base hidden lg:inline">Toggle Theme</span>}
          </button>
          
          {/* Logout Button */}
          <button
            onClick={handleLogoutClick}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-all duration-200 w-full
              ${isDarkMode
                ? 'text-red-400 hover:bg-red-500/10'
                : 'text-red-600 hover:bg-red-50'}
              ${sidebarOpen ? '' : 'justify-center'}`}
            aria-label="Logout"
          >
            <span className="flex items-center justify-center">
              <SidebarIcons.FiLogOut size={20} />
            </span>
            {sidebarOpen && <span className="text-base hidden lg:inline">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;