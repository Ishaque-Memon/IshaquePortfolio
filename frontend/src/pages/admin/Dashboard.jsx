import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { motion } from "framer-motion";
import { 
  FiBriefcase, FiCode, FiAward, FiMessageSquare,
  FiTrendingUp, FiEye, FiUsers, FiActivity
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Dashboard = () => {
  const { isDarkMode } = useTheme();

  const stats = [
    { 
      title: "Total Projects", 
      value: "8", 
      change: "+2 this month", 
      icon: FiBriefcase,
      color: "from-blue-500 to-cyan-500",
      trend: "up"
    },
    { 
      title: "Skills", 
      value: "15", 
      change: "+3 new", 
      icon: FiCode,
      color: "from-purple-500 to-pink-500",
      trend: "up"
    },
    { 
      title: "Certificates", 
      value: "7", 
      change: "All verified", 
      icon: FiAward,
      color: "from-yellow-500 to-orange-500",
      trend: "stable"
    },
    { 
      title: "Messages", 
      value: "12", 
      change: "3 unread", 
      icon: FiMessageSquare,
      color: "from-pink-500 to-rose-500",
      trend: "up"
    }
  ];

  const recentActivity = [
    { action: "New project added", item: "E-Commerce Platform", time: "2 hours ago", type: "project" },
    { action: "Certificate uploaded", item: "AWS Cloud Practitioner", time: "5 hours ago", type: "certificate" },
    { action: "Skill updated", item: "React 18", time: "1 day ago", type: "skill" },
    { action: "Message received", item: "Contact Form", time: "2 days ago", type: "message" }
  ];

  const quickActions = [
    { title: "Add New Project", description: "Create a portfolio project", icon: FiBriefcase, path: "/admin/projects" },
    { title: "Add Skill", description: "Add technical skill", icon: FiCode, path: "/admin/skills" },
    { title: "Upload Certificate", description: "Add certification", icon: FiAward, path: "/admin/certificates" },
    { title: "View Messages", description: "Check contact messages", icon: FiMessageSquare, path: "/admin/messages" }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`p-6 rounded-2xl bg-gradient-to-br from-primary-500 to-accent-500 text-white`}
      >
        <h2 className="text-3xl font-bold mb-2">Welcome to Your Admin Dashboard</h2>
        <p className="text-white/80">Manage your portfolio content, view analytics, and track messages</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className={`${
                isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
              } hover:shadow-xl transition-shadow`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">{stat.title}</p>
                      <h3 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                        {stat.value}
                      </h3>
                      <p className="text-sm text-neutral-500">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardHeader>
            <CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Quick Actions
            </CardTitle>
            <CardDescription>Commonly used actions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <button
                  key={idx}
                  className={`w-full flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    isDarkMode 
                      ? 'hover:bg-neutral-800 text-white' 
                      : 'hover:bg-neutral-50 text-neutral-900'
                  } text-left`}
                >
                  <div className="p-2 rounded-lg bg-primary-500/10">
                    <Icon className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{action.title}</p>
                    <p className="text-sm text-neutral-500">{action.description}</p>
                  </div>
                </button>
              );
            })}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardHeader>
            <CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
              Recent Activity
            </CardTitle>
            <CardDescription>Latest updates and changes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-primary-500/10 mt-1">
                  <FiActivity className="w-4 h-4 text-primary-500" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                    {activity.action}
                  </p>
                  <p className="text-sm text-neutral-500">{activity.item}</p>
                  <p className="text-xs text-neutral-400 mt-1">{activity.time}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {activity.type}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Stats */}
      <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
        <CardHeader>
          <CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
            Portfolio Overview
          </CardTitle>
          <CardDescription>Your portfolio at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <FiEye className="w-8 h-8 mx-auto mb-2 text-primary-500" />
              <h4 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                1,234
              </h4>
              <p className="text-sm text-neutral-500">Total Views</p>
            </div>
            <div className="text-center">
              <FiTrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <h4 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                +23%
              </h4>
              <p className="text-sm text-neutral-500">Growth</p>
            </div>
            <div className="text-center">
              <FiUsers className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h4 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                456
              </h4>
              <p className="text-sm text-neutral-500">Unique Visitors</p>
            </div>
            <div className="text-center">
              <FiActivity className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <h4 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                89%
              </h4>
              <p className="text-sm text-neutral-500">Engagement</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
