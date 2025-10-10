import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Admin = () => {
  const { isDarkMode } = useTheme();

  return (
    <div className={`min-h-screen p-8 ${
      isDarkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'
    }`}>
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          Admin <span className="gradient-text">Dashboard</span>
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Cards */}
          <div className={`p-6 rounded-xl shadow-lg ${
            isDarkMode ? 'bg-neutral-900' : 'bg-white'
          }`}>
            <h3 className="text-xl font-semibold mb-2">Projects</h3>
            <p className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}>
              Manage your projects
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            isDarkMode ? 'bg-neutral-900' : 'bg-white'
          }`}>
            <h3 className="text-xl font-semibold mb-2">Skills</h3>
            <p className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}>
              Manage your skills
            </p>
          </div>

          <div className={`p-6 rounded-xl shadow-lg ${
            isDarkMode ? 'bg-neutral-900' : 'bg-white'
          }`}>
            <h3 className="text-xl font-semibold mb-2">Certificates</h3>
            <p className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}>
              Manage your certificates
            </p>
          </div>
        </div>

        <div className={`mt-8 p-6 rounded-xl shadow-lg ${
          isDarkMode ? 'bg-neutral-900' : 'bg-white'
        }`}>
          <p className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}>
            Admin panel components will be added here. This is a placeholder for the dashboard.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
