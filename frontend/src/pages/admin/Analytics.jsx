import React, { useState, useEffect } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { useProjects, useSkills, useCertificates, usePersonalInfo, useContactMessages } from "../../hooks/usePortfolio";
import { motion } from "framer-motion";
import {
  FiTrendingUp, FiUsers, FiMail, FiAward, FiCode, FiFolder,
  FiActivity, FiCalendar, FiEye, FiMessageSquare
} from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Analytics = () => {
  const { isDarkMode } = useTheme();
  const { projects } = useProjects();
  const { skills } = useSkills();
  const { certificates } = useCertificates();
  const { personalInfo } = usePersonalInfo();
  const { messages } = useContactMessages();

  const [stats, setStats] = useState({
    totalProjects: 0,
    featuredProjects: 0,
    totalSkills: 0,
    totalCertificates: 0,
    totalMessages: 0,
    unreadMessages: 0,
    completedProjects: 0,
    inProgressProjects: 0
  });

  useEffect(() => {
    setStats({
      totalProjects: projects.length,
      featuredProjects: projects.filter(p => p.featured).length,
      totalSkills: skills.length,
      totalCertificates: certificates.length,
      totalMessages: messages.length,
      unreadMessages: messages.filter(m => !m.isRead).length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
      inProgressProjects: projects.filter(p => p.status === 'in-progress').length
    });
  }, [projects, skills, certificates, messages]);

  const recentActivity = [
    ...messages.slice(0, 3).map(m => ({
      type: 'message',
      title: `New message from ${m.name}`,
      time: new Date(m.createdAt).toLocaleDateString(),
      icon: FiMail,
      color: 'from-blue-500 to-cyan-500'
    })),
    ...projects.slice(0, 2).map(p => ({
      type: 'project',
      title: `Project: ${p.title}`,
      time: new Date(p.createdAt).toLocaleDateString(),
      icon: FiFolder,
      color: 'from-purple-500 to-pink-500'
    })),
    ...certificates.slice(0, 2).map(c => ({
      type: 'certificate',
      title: `Certificate: ${c.title}`,
      time: new Date(c.createdAt || c.issueDate).toLocaleDateString(),
      icon: FiAward,
      color: 'from-green-500 to-emerald-500'
    }))
  ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 8);

  const mainStats = [
    {
      title: "Total Projects",
      value: stats.totalProjects,
      change: "+12%",
      icon: FiFolder,
      color: "from-blue-500 to-cyan-500",
      bgColor: isDarkMode ? "bg-blue-500/10" : "bg-blue-50"
    },
    {
      title: "Skills",
      value: stats.totalSkills,
      change: "+5%",
      icon: FiCode,
      color: "from-purple-500 to-pink-500",
      bgColor: isDarkMode ? "bg-purple-500/10" : "bg-purple-50"
    },
    {
      title: "Certificates",
      value: stats.totalCertificates,
      change: "+8%",
      icon: FiAward,
      color: "from-green-500 to-emerald-500",
      bgColor: isDarkMode ? "bg-green-500/10" : "bg-green-50"
    },
    {
      title: "Messages",
      value: stats.totalMessages,
      change: `${stats.unreadMessages} new`,
      icon: FiMail,
      color: "from-orange-500 to-red-500",
      bgColor: isDarkMode ? "bg-orange-500/10" : "bg-orange-50"
    }
  ];

  const projectStats = [
    {
      label: "Completed",
      value: stats.completedProjects,
      percentage: stats.totalProjects ? Math.round((stats.completedProjects / stats.totalProjects) * 100) : 0,
      color: "bg-green-500"
    },
    {
      label: "In Progress",
      value: stats.inProgressProjects,
      percentage: stats.totalProjects ? Math.round((stats.inProgressProjects / stats.totalProjects) * 100) : 0,
      color: "bg-blue-500"
    },
    {
      label: "Featured",
      value: stats.featuredProjects,
      percentage: stats.totalProjects ? Math.round((stats.featuredProjects / stats.totalProjects) * 100) : 0,
      color: "bg-yellow-500"
    }
  ];

  const topSkillCategories = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const skillCategoryData = Object.entries(topSkillCategories)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            Analytics Dashboard
          </h2>
          <p className="text-neutral-500 mt-1">Overview of your portfolio performance</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="gap-1">
            <FiActivity size={14} />
            Live Data
          </Badge>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mainStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`${
              isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
            } hover:shadow-lg transition-all`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm text-neutral-500 mb-1">{stat.title}</p>
                    <h3 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                      {stat.value}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-500 font-medium flex items-center gap-1">
                        <FiTrendingUp size={12} />
                        {stat.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color}`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Project Status & Skill Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status */}
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                Project Status
              </h3>
              <FiFolder className="text-neutral-400" size={20} />
            </div>
            <div className="space-y-4">
              {projectStats.map((stat, index) => (
                <div key={stat.label}>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                      {stat.label}
                    </span>
                    <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                      {stat.value} ({stat.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full ${stat.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.percentage}%` }}
                      transition={{ delay: index * 0.2, duration: 0.8 }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Skill Categories */}
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                Top Skill Categories
              </h3>
              <FiCode className="text-neutral-400" size={20} />
            </div>
            <div className="space-y-4">
              {skillCategoryData.map((item, index) => {
                const percentage = Math.round((item.count / stats.totalSkills) * 100);
                const colors = [
                  'bg-blue-500',
                  'bg-purple-500',
                  'bg-green-500',
                  'bg-orange-500',
                  'bg-pink-500'
                ];
                return (
                  <div key={item.category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                        {item.category}
                      </span>
                      <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                        {item.count} ({percentage}%)
                      </span>
                    </div>
                    <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${colors[index % colors.length]}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${percentage}%` }}
                        transition={{ delay: index * 0.2, duration: 0.8 }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              Recent Activity
            </h3>
            <FiActivity className="text-neutral-400" size={20} />
          </div>
          <div className="space-y-4">
            {recentActivity.length === 0 ? (
              <p className="text-neutral-500 text-center py-8">No recent activity</p>
            ) : (
              recentActivity.map((activity, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-lg ${
                    isDarkMode ? 'bg-neutral-800/50' : 'bg-neutral-50'
                  }`}
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${activity.color}`}>
                    <activity.icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                      {activity.title}
                    </p>
                    <p className="text-xs text-neutral-500 flex items-center gap-1 mt-1">
                      <FiCalendar size={12} />
                      {activity.time}
                    </p>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Health Score */}
      <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              Portfolio Health Score
            </h3>
            <FiTrendingUp className="text-green-500" size={20} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-500/10 to-cyan-500/10">
              <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {stats.totalProjects > 0 ? '✓' : '−'}
              </div>
              <p className="text-xs text-neutral-500">Projects</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-500/10 to-pink-500/10">
              <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {stats.totalSkills >= 5 ? '✓' : '−'}
              </div>
              <p className="text-xs text-neutral-500">Skills (5+)</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-500/10 to-emerald-500/10">
              <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {stats.totalCertificates > 0 ? '✓' : '−'}
              </div>
              <p className="text-xs text-neutral-500">Certificates</p>
            </div>
            <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-500/10 to-red-500/10">
              <div className={`text-3xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {personalInfo ? '✓' : '−'}
              </div>
              <p className="text-xs text-neutral-500">Personal Info</p>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${isDarkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                Overall Completion
              </span>
              <span className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                {Math.round(
                  ((stats.totalProjects > 0 ? 25 : 0) +
                  (stats.totalSkills >= 5 ? 25 : 0) +
                  (stats.totalCertificates > 0 ? 25 : 0) +
                  (personalInfo ? 25 : 0))
                )}%
              </span>
            </div>
            <div className="w-full bg-neutral-200 dark:bg-neutral-800 rounded-full h-3">
              <motion.div
                className="h-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500"
                initial={{ width: 0 }}
                animate={{ 
                  width: `${Math.round(
                    ((stats.totalProjects > 0 ? 25 : 0) +
                    (stats.totalSkills >= 5 ? 25 : 0) +
                    (stats.totalCertificates > 0 ? 25 : 0) +
                    (personalInfo ? 25 : 0))
                  )}%` 
                }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;
