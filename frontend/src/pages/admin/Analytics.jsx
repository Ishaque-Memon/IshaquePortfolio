import React, { useState, useEffect } from "react";
import { fetchAnalyticsSummary } from '../../api/portfolioApi';
import { useTheme } from "../../contexts/ThemeContext";
import { useProjects, useSkills, useCertificates, usePersonalInfo, useContactMessages } from "../../hooks/usePortfolio";
import { motion } from "framer-motion";
import {
  FiTrendingUp, FiUsers, FiMail, FiAward, FiCode, FiFolder,
  FiActivity, FiCalendar, FiEye, FiMessageSquare
} from "react-icons/fi";
import { Card, CardContent } from "@/components/ui/card";
import { ProjectStatusChart, SkillCategoryPie } from "../../Components/ui/charts";
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
    inProgressProjects: 0,
    totalVisits: 0,
    uniqueVisitors: 0
  });

  useEffect(() => {
    // Fetch visit analytics
    const fetchAnalytics = async () => {
      try {
        const data = await fetchAnalyticsSummary();
        setStats(s => ({
          ...s,
          totalVisits: data.totalVisits || 0,
          uniqueVisitors: data.uniqueVisitors || 0
        }));
      } catch {}
    };
    setStats(s => ({
      ...s,
      totalProjects: projects.length,
      featuredProjects: projects.filter(p => p.featured).length,
      totalSkills: skills.length,
      totalCertificates: certificates.length,
      totalMessages: messages.length,
      unreadMessages: messages.filter(m => !m.isRead).length,
      completedProjects: projects.filter(p => p.status === 'completed').length,
      inProgressProjects: projects.filter(p => p.status === 'in-progress').length
    }));
    fetchAnalytics();
  }, [projects, skills, certificates, messages]);



  const mainStats = [
    {
      title: "Visits",
      value: stats.totalVisits,
      change: `${stats.uniqueVisitors} unique`,
      icon: FiEye,
      color: "from-cyan-500 to-blue-500",
      bgColor: isDarkMode ? "bg-cyan-500/10" : "bg-cyan-50"
    },
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
      {/* Analytics Title */}
      <div className="mb-4">
        <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Analytics</h2>
        <p className="text-neutral-500 mt-1">In-depth portfolio performance, trends, and breakdowns</p>
      </div>

      {/* Project Status & Skill Categories Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Status Chart */}
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Project Status Breakdown</h3>
              <FiFolder className="text-neutral-400" size={20} />
            </div>
            <ProjectStatusChart data={projectStats.map(stat => ({ name: stat.label, value: stat.value }))} />
          </CardContent>
        </Card>

        {/* Skill Categories Pie Chart */}
        <Card className={isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Top Skill Categories</h3>
              <FiCode className="text-neutral-400" size={20} />
            </div>
            <SkillCategoryPie data={skillCategoryData.map(item => ({ name: item.category, value: item.count }))} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
