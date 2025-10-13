import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getAllSkills } from "@/api/portfolioApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiPython,
  SiHtml5, SiCss3, SiMongodb, SiTailwindcss,
  SiMysql, SiFirebase, SiGit, SiGithub, SiExpress, SiFigma,
  SiPostman
} from "react-icons/si";
import { FiServer, FiCpu, FiDatabase, FiCode } from "react-icons/fi";

// Icon mapping - using safe icons that definitely exist
const iconMap = {
  SiReact, SiJavascript, SiTypescript, SiTailwindcss, SiHtml5, SiCss3,
  SiNodedotjs, SiExpress, SiPython, FiServer,
  SiMongodb, SiMysql, SiFirebase, FiDatabase,
  SiGit, SiGithub, SiPostman, SiFigma, FiCode
};

const SkillsSection = () => {
  const { isDarkMode } = useTheme();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();
        setSkills(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load skills.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  // Helper function to transform API skills to component format
  const transformApiSkills = (apiData) => {
    // Group skills by category
    const categories = {};
    
    apiData.forEach(skill => {
      if (!categories[skill.category]) {
        categories[skill.category] = {
          name: skill.category,
          icon: getCategoryIcon(skill.category),
          color: getCategoryColor(skill.category),
          skills: []
        };
      }
      categories[skill.category].skills.push({
        name: skill.name,
        level: skill.proficiency || 50,
        icon: skill.icon || 'FiCode'
      });
    });

    return { categories: Object.values(categories) };
  };

  // Helper functions for icons and colors
  const getCategoryIcon = (category) => {
    const iconMap = {
      'Frontend Development': 'SiReact',
      'Backend Development': 'SiNodedotjs',
      'Database': 'SiMongodb',
      'Tools & Others': 'SiGit'
    };
    return iconMap[category] || 'FiCode';
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      'Frontend Development': 'from-blue-500 to-cyan-500',
      'Backend Development': 'from-green-500 to-emerald-500',
      'Database': 'from-purple-500 to-pink-500',
      'Tools & Others': 'from-orange-500 to-red-500'
    };
    return colorMap[category] || 'from-gray-500 to-gray-600';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section 
      id="skills" 
      className={`min-h-screen py-20 relative ${
        isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">Technical Skills</span>
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'} max-w-2xl mx-auto`}>
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            <p className={`mt-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
              Loading skills...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
            <p className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}>
              Using static data as fallback
            </p>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {transformApiSkills(skills).categories.map((category, idx) => {
            const CategoryIcon = iconMap[category.icon] || FiCpu;
            
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Card className={`h-full ${
                  isDarkMode 
                    ? 'bg-neutral-900/50 border-neutral-800 hover:border-neutral-700' 
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                } transition-all duration-300 hover:shadow-xl`}>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                      <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
                        <CategoryIcon className="w-6 h-6 text-white" />
                      </div>
                      <span className={isDarkMode ? 'text-white' : 'text-neutral-900'}>
                        {category.name}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {category.skills.map((skill, skillIdx) => {
                      const SkillIcon = iconMap[skill.icon] || FiCpu;
                      
                      return (
                        <div key={skillIdx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <SkillIcon className={`w-4 h-4 ${
                                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                              }`} />
                              <span className={`text-sm font-medium ${
                                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                              }`}>
                                {skill.name}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {skill.level}%
                            </Badge>
                          </div>
                          <Progress 
                            value={skill.level} 
                            className="h-2"
                          />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
        )}

        {/* Additional Info */}
        {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className={`inline-block ${
            isDarkMode 
              ? 'bg-neutral-900/50 border-neutral-800' 
              : 'bg-white border-neutral-200'
          }`}>
            <CardContent className="py-4 px-6">
              <p className={`text-sm ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                🚀 Always learning and exploring new technologies
              </p>
            </CardContent>
          </Card>
        </motion.div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
