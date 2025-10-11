import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useProjects, useSkills, useCertificates, useContactMessages, usePersonalInfo } from "../../hooks/usePortfolio";
import { motion } from "framer-motion";
import { 
  FiBriefcase, FiCode, FiAward, FiMessageSquare,
  FiTrendingUp, FiEye, FiUsers, FiActivity, FiStar, FiClock
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  
  // Get real-time data
  const { projects, loading: projectsLoading } = useProjects();
  const { skills, loading: skillsLoading } = useSkills();
  const { certificates, loading: certificatesLoading } = useCertificates();
  const { messages, loading: messagesLoading } = useContactMessages();
  const { personalInfo } = usePersonalInfo();

  // Calculate stats
  const unreadMessages = messages.filter(m => !m.isRead).length;
  const featuredProjects = projects.filter(p => p.featured).length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;

  const stats = [
    { 
      title: "Total Projects", 
      value: projects.length.toString(), 
      change: `${featuredProjects} featured`, 
      icon: FiBriefcase,
      color: "from-blue-500 to-cyan-500",
      trend: "up",
      loading: projectsLoading
    },
    { 
      title: "Skills", 
      value: skills.length.toString(), 
      change: `${skills.filter(s => s.level === 'Expert' || s.level === 'Advanced').length} advanced+`, 
      icon: FiCode,
      color: "from-purple-500 to-pink-500",
      trend: "up",
      loading: skillsLoading
    },
    { 
      title: "Certificates", 
      value: certificates.length.toString(), 
      change: `${certificates.filter(c => new Date(c.issueDate).getFullYear() === new Date().getFullYear()).length} this year`, 
      icon: FiAward,
      color: "from-yellow-500 to-orange-500",
      trend: "stable",
      loading: certificatesLoading
    },
    { 
      title: "Messages", 
      value: messages.length.toString(), 
      change: `${unreadMessages} unread`, 
      icon: FiMessageSquare,
      color: "from-pink-500 to-rose-500",
      trend: unreadMessages > 0 ? "up" : "stable",
      loading: messagesLoading,
      highlight: unreadMessages > 0
    }
  ];

  // Recent activity - combine all recent items
  const recentActivity = [
    ...projects.slice(0, 2).map(p => ({
      action: "Project added",
      item: p.title,
      time: new Date(p.createdAt).toLocaleDateString(),
      type: "project"
    })),
    ...certificates.slice(0, 2).map(c => ({
      action: "Certificate uploaded",
      item: c.title,
      time: new Date(c.createdAt || c.issueDate).toLocaleDateString(),
      type: "certificate"
    })),
    ...skills.slice(0, 2).map(s => ({
      action: "Skill updated",
      item: s.name,
      time: new Date(s.updatedAt || s.createdAt).toLocaleDateString(),
      type: "skill"
    })),
    ...messages.slice(0, 2).map(m => ({
      action: "Message received",
      item: m.subject || `From ${m.name}`,
      time: new Date(m.createdAt).toLocaleDateString(),
      type: "message"
    }))
  ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 6);

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
              } ${stat.highlight ? 'ring-2 ring-red-500' : ''} hover:shadow-xl transition-all`}>
                <CardContent className="p-6">
                  {stat.loading ? (
                    <div className="animate-pulse">
                      <div className="h-4 bg-neutral-300 dark:bg-neutral-700 rounded w-20 mb-2"></div>
                      <div className="h-8 bg-neutral-300 dark:bg-neutral-700 rounded w-16 mb-2"></div>
                      <div className="h-3 bg-neutral-300 dark:bg-neutral-700 rounded w-24"></div>
                    </div>
                  ) : (
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-neutral-500 mb-1">{stat.title}</p>
                        <h3 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                          {stat.value}
                        </h3>
                        <p className={`text-sm ${stat.highlight ? 'text-red-500 font-medium' : 'text-neutral-500'}`}>
                          {stat.change}
                        </p>
                      </div>
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
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
                  onClick={() => navigate(action.path)}
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
            {recentActivity.length === 0 ? (
              <p className="text-center text-neutral-500 py-8">No recent activity</p>
            ) : (
              recentActivity.map((activity, idx) => (
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
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Portfolio Overview & Completion */}
      <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
        <CardHeader>
          <CardTitle className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
            Portfolio Overview
          </CardTitle>
          <CardDescription>Your portfolio at a glance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <FiStar className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <h4 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{featuredProjects}</h4>
              <p className="text-sm text-neutral-500">Featured Projects</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10">
              <FiTrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <h4 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{completedProjects}</h4>
              <p className="text-sm text-neutral-500">Completed</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <FiCode className="w-8 h-8 mx-auto mb-2 text-purple-500" />
              <h4 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{skills.filter(s => s.level === 'Expert' || s.level === 'Advanced').length}</h4>
              <p className="text-sm text-neutral-500">Expert Skills</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10">
              <FiClock className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <h4 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{certificates.filter(c => new Date(c.issueDate).getFullYear() === new Date().getFullYear()).length}</h4>
              <p className="text-sm text-neutral-500">Certs This Year</p>
            </div>
          </div>
          {/* Portfolio Completion */}
          <div className="mt-6 pt-6 border-t border-neutral-200 dark:border-neutral-800">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>Portfolio Completion</span>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{Math.round(((projects.length > 0 ? 25 : 0) + (skills.length >= 5 ? 25 : 0) + (certificates.length > 0 ? 25 : 0) + (personalInfo ? 25 : 0)))}%</span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-3">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ width: `${Math.round(((projects.length > 0 ? 25 : 0) + (skills.length >= 5 ? 25 : 0) + (certificates.length > 0 ? 25 : 0) + (personalInfo ? 25 : 0)))}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${projects.length > 0 ? 'bg-green-500' : 'bg-neutral-400'}`} />
                <span className="text-xs text-neutral-500">Projects</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${skills.length >= 5 ? 'bg-green-500' : 'bg-neutral-400'}`} />
                <span className="text-xs text-neutral-500">Skills (5+)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${certificates.length > 0 ? 'bg-green-500' : 'bg-neutral-400'}`} />
                <span className="text-xs text-neutral-500">Certificates</span>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${personalInfo ? 'bg-green-500' : 'bg-neutral-400'}`} />
                <span className="text-xs text-neutral-500">Personal Info</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
