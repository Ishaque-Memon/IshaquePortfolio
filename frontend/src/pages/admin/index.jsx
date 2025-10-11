import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import Sidebar from "../../components/layout/Sidebar";
import { FiExternalLink } from "react-icons/fi";

const AdminLayout = () => {
  const { user } = useAuthContext();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Dashboard");

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('dashboard')) setPageTitle('Dashboard');
    else if (path.includes('personal-info')) setPageTitle('Personal Information');
    else if (path.includes('skills')) setPageTitle('Skills Management');
    else if (path.includes('projects')) setPageTitle('Projects Management');
    else if (path.includes('certificates')) setPageTitle('Certificates Management');
    else if (path.includes('education')) setPageTitle('Education Management');
    else if (path.includes('messages')) setPageTitle('Messages');
    else if (path.includes('analytics')) setPageTitle('Analytics');
  }, [location.pathname]);

  if (!user) return null;

  return (
    <div className={`flex min-h-screen ${
      isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
    }`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 lg:ml-[280px] transition-all duration-300">
        {/* Top Header */}
        <header className={`sticky top-0 z-30 h-16 border-b ${
          isDarkMode ? 'bg-neutral-900/80 border-neutral-800' : 'bg-white/80 border-neutral-200'
        } backdrop-blur-sm`}>
          <div className="h-full px-4 lg:px-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="lg:hidden w-16" /> {/* Spacer for mobile menu button */}
              <div>
                <h1 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-neutral-900'
                }`}>
                  {pageTitle}
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isDarkMode
                    ? 'bg-neutral-800 text-white hover:bg-neutral-700'
                    : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                }`}
              >
                <FiExternalLink size={16} />
                <span className="hidden sm:inline">View Portfolio</span>
              </button>
              
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center`}>
                  <span className="text-white font-semibold">
                    {user?.username?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="hidden md:block">
                  <p className={`text-sm font-medium ${
                    isDarkMode ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {user?.username || 'Admin'}
                  </p>
                  <p className="text-xs text-neutral-500">Administrator</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-4 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
