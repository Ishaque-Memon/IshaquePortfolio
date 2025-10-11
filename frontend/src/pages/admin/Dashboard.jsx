import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext";
import { useProjects, useSkills, useCertificates, useContactMessages, usePersonalInfo } from "../../hooks/usePortfolio";
import { useEffect, useState } from "react";
import { fetchAnalyticsSummary } from "../../api/portfolioApi";
import { motion } from "framer-motion";
import { 
  FiBriefcase, FiCode, FiAward, FiMessageSquare,
  FiTrendingUp, FiEye, FiUsers, FiActivity, FiStar, FiClock
} from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const Dashboard = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  // Get real-time data
  const { projects, loading: projectsLoading } = useProjects();
  const { skills, loading: skillsLoading } = useSkills();
  const { certificates, loading: certificatesLoading } = useCertificates();
  const { messages, loading: messagesLoading } = useContactMessages();
  const { personalInfo } = usePersonalInfo();

  // Visits state
  const [visits, setVisits] = useState({ totalVisits: 0, uniqueVisitors: 0 });

  useEffect(() => {
    const fetchVisits = async () => {
      try {
        const data = await fetchAnalyticsSummary();
        setVisits({
          totalVisits: data.totalVisits || 0,
          uniqueVisitors: data.uniqueVisitors || 0
        });
      } catch {}
    };
    fetchVisits();
  }, []);

  // Calculate stats (overview only)
  const unreadMessages = messages.filter(m => !m.isRead).length;
  const featuredProjects = projects.filter(p => p.featured).length;
  const completedProjects = projects.filter(p => p.status === 'completed').length;
  const expertSkills = skills.filter(s => s.level === 'Expert' || s.level === 'Advanced').length;
  const certsThisYear = certificates.filter(c => new Date(c.issueDate).getFullYear() === new Date().getFullYear()).length;
  const stats = [
    { title: "Visits", value: visits.totalVisits.toString(), change: `${visits.uniqueVisitors} unique`, icon: FiEye, color: "from-cyan-500 to-blue-500", loading: false },
    { title: "Total Projects", value: projects.length.toString(), change: `${featuredProjects} featured`, icon: FiBriefcase, color: "from-blue-500 to-cyan-500", loading: projectsLoading },
    { title: "Skills", value: skills.length.toString(), change: `${expertSkills} advanced+`, icon: FiCode, color: "from-purple-500 to-pink-500", loading: skillsLoading },
    { title: "Certificates", value: certificates.length.toString(), change: `${certsThisYear} this year`, icon: FiAward, color: "from-yellow-500 to-orange-500", loading: certificatesLoading },
    { title: "Messages", value: messages.length.toString(), change: `${unreadMessages} unread`, icon: FiMessageSquare, color: "from-pink-500 to-rose-500", loading: messagesLoading, highlight: unreadMessages > 0 }
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
              <Card className={`$
                {isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}
                ${stat.highlight ? 'ring-2 ring-red-500' : ''} hover:shadow-xl transition-all`}
              >
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
                        <h3 className={`text-2xl font-bold ${stat.highlight ? 'text-red-500' : isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{stat.value}</h3>
                        <p className={`text-sm ${stat.highlight ? 'text-red-500 font-medium' : 'text-neutral-500'}`}>{stat.change}</p>
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
    </div>
  );
};

export default Dashboard;
