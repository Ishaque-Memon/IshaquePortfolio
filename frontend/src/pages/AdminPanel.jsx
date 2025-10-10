import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
import { 
  FiHome, FiUser, FiCode, FiBriefcase, FiAward, 
  FiMail, FiSettings, FiLogOut, FiEdit, FiPlus,
  FiBarChart, FiFileText
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const AdminPanel = () => {
  const { user, logout } = useAuthContext();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const menuItems = [
    { 
      title: "Home Section", 
      icon: FiHome, 
      description: "Manage hero section content",
      color: "from-blue-500 to-cyan-500",
      count: 1
    },
    { 
      title: "About Section", 
      icon: FiUser, 
      description: "Update bio and personal info",
      color: "from-green-500 to-emerald-500",
      count: 1
    },
    { 
      title: "Skills", 
      icon: FiCode, 
      description: "Add/Edit technical skills",
      color: "from-purple-500 to-pink-500",
      count: 15
    },
    { 
      title: "Projects", 
      icon: FiBriefcase, 
      description: "Manage project portfolio",
      color: "from-orange-500 to-red-500",
      count: 8
    },
    { 
      title: "Certificates", 
      icon: FiAward, 
      description: "Upload certifications",
      color: "from-yellow-500 to-orange-500",
      count: 7
    },
    { 
      title: "Contact Info", 
      icon: FiMail, 
      description: "Update contact details",
      color: "from-blue-600 to-indigo-500",
      count: 1
    },
    { 
      title: "Messages", 
      icon: FiFileText, 
      description: "View contact form submissions",
      color: "from-pink-500 to-rose-500",
      count: 12,
      badge: "New"
    },
    { 
      title: "Analytics", 
      icon: FiBarChart, 
      description: "View site statistics",
      color: "from-teal-500 to-green-500",
      count: 0
    }
  ];

  const stats = [
    { label: "Total Projects", value: "8", change: "+2 this month", color: "text-blue-500" },
    { label: "Skills Listed", value: "15", change: "+3 new", color: "text-green-500" },
    { label: "Certificates", value: "7", change: "Verified", color: "text-purple-500" },
    { label: "Messages", value: "12", change: "3 unread", color: "text-orange-500" }
  ];

  if (!user) return null;

  return (
    <div className={`min-h-screen ${
      isDarkMode ? 'bg-neutral-950 text-white' : 'bg-neutral-50 text-neutral-900'
    }`}>
      {/* Header */}
      <header className={`sticky top-0 z-50 border-b ${
        isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
      } backdrop-blur-lg bg-opacity-90`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold gradient-text">Admin Panel</h1>
              <Badge variant="outline">Logged in as {user.email}</Badge>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={() => navigate("/")}>
                <FiHome className="w-4 h-4 mr-2" />
                View Portfolio
              </Button>
              <Button variant="destructive" onClick={handleLogout}>
                <FiLogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold mb-2">
            Welcome back! 👋
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Manage your portfolio content from here
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, idx) => (
            <Card key={idx} className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'}>
              <CardContent className="p-6">
                <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                  {stat.value}
                </div>
                <div className={`text-sm font-medium mb-1 ${
                  isDarkMode ? 'text-neutral-200' : 'text-neutral-900'
                }`}>
                  {stat.label}
                </div>
                <div className={`text-xs ${
                  isDarkMode ? 'text-neutral-500' : 'text-neutral-500'
                }`}>
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          ))}
        </motion.div>

        {/* Content Management Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-6">Content Management</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {menuItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className={`cursor-pointer h-full ${
                    isDarkMode 
                      ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' 
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                  } transition-all duration-300`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${item.color}/20`}>
                          <Icon className={`w-6 h-6 bg-gradient-to-r ${item.color} bg-clip-text text-transparent`} />
                        </div>
                        {item.badge && (
                          <Badge variant="default" className="text-xs">
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>
                          {item.count} items
                        </span>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <FiEdit className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="default">
                            <FiPlus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'}>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Frequently used operations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline">
                  <FiPlus className="w-4 h-4 mr-2" />
                  Add New Project
                </Button>
                <Button variant="outline">
                  <FiAward className="w-4 h-4 mr-2" />
                  Upload Certificate
                </Button>
                <Button variant="outline">
                  <FiCode className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
                <Button variant="outline">
                  <FiSettings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <Card className={`border-2 ${
            isDarkMode 
              ? 'bg-primary-900/20 border-primary-800' 
              : 'bg-primary-50 border-primary-200'
          }`}>
            <CardContent className="p-6 text-center">
              <p className={`text-lg font-semibold ${
                isDarkMode ? 'text-primary-400' : 'text-primary-600'
              }`}>
                🚀 Full CRUD functionality coming soon!
              </p>
              <p className={`text-sm mt-2 ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                We're working on adding complete content management features for all sections.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;
