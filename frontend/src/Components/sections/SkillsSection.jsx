// src/Components/SkillsSection.jsx
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getAllSkills } from "@/api/portfolioApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Progress } from "@/Components/ui/progress";
import { SkillIcons, FiCode } from "@/assets/Icons/Icons";
import Loader from "@/Components/common/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Enhanced SkillsSection with ModernSkills design
 * - Fetches skills from API
 * - Groups them by category
 * - Matches ModernSkills visual design exactly
 * - Uses shadcn/ui Card, Badge, and Progress Components
 */
const SkillsSection = () => {
  const { isDarkMode } = useTheme();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const skillsRef = useRef(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();
        const skillsArray = Array.isArray(data) ? data : (data?.data || []);
        setSkills(skillsArray);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Failed to load skills.");
        setSkills([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  useEffect(() => {
    const skillCards = skillsRef.current?.children;
    
    if (skillCards && skillCards.length > 0) {
      gsap.fromTo(
        skillCards,
        { y: 80, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: skillsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, [skills]);

  const getIconComponent = (iconName) => {
    if (!iconName) return SkillIcons.FiCode || FiCode || (() => null);
    if (typeof iconName === "function" || React.isValidElement(iconName)) {
      return iconName;
    }
    return SkillIcons[iconName] || SkillIcons.FiCode || FiCode || (() => null);
  };

  const getCategoryGradient = (category) => {
    const gradientMap = {
      frontend: "from-blue-500 to-cyan-500",
      backend: "from-green-500 to-emerald-500",
      database: "from-purple-500 to-pink-500",
      tools: "from-orange-500 to-red-500",
      cloud: "from-sky-500 to-blue-500",
      framework: "from-indigo-500 to-purple-500",
      other: "from-gray-500 to-gray-600",
    };
    return gradientMap[(category || "").toLowerCase()] || "from-gray-500 to-gray-600";
  };

  const getCategoryIconName = (category) => {
    const map = {
      frontend: "FiCode",
      backend: "FiServer",
      database: "FiDatabase",
      tools: "FiLayout",
      cloud: "FiCloud",
      framework: "FiLayers",
      other: "FiGlobe",
    };
    return map[(category || "").toLowerCase()] || "FiCode";
  };

  const transformApiSkills = (apiData) => {
    const categories = {};
    apiData.forEach((skill) => {
      const rawCategory = skill.category || "other";
      const key = String(rawCategory).toLowerCase();

      if (!categories[key]) {
        categories[key] = {
          key,
          title: rawCategory,
          iconName: getCategoryIconName(rawCategory),
          gradient: getCategoryGradient(rawCategory),
          skills: [],
        };
      }

      categories[key].skills.push({
        _id: skill._id,
        name: skill.name,
        level: skill.proficiency ?? skill.level ?? 50,
        iconName: skill.icon || "FiCode",
      });
    });

    return Object.values(categories);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const skillCategories = transformApiSkills(skills);

  if (loading) {
    return (
      <section
        id="skills"
        className={`py-20 lg:py-32 ${isDarkMode ? 'bg-neutral-950' : 'bg-neutral-100'} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Loader variant="spinner" text="Loading Skills..." />
          </div>
        </div>
      </section>
    );
  }

  if (error && skills.length === 0) {
    return (
      <section
        id="skills"
        className={`py-20 lg:py-32 ${isDarkMode ? 'bg-neutral-950' : 'bg-neutral-100'} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`py-20 lg:py-32 ${
        isDarkMode ? 'bg-neutral-950' : 'bg-neutral-100'
      } transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-neutral-900'
          }`}>
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            A comprehensive overview of my technical expertise and proficiency levels
            across various technologies and tools
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mt-8"></div>
        </motion.div>

        {/* Skills Grid */}
        {skillCategories.length > 0 ? (
          <motion.div
            ref={skillsRef}
            className="grid md:grid-cols-2 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skillCategories.map((category, categoryIndex) => {
              const CategoryIcon = getIconComponent(category.iconName);

              return (
                <motion.div
                  key={category.key}
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <Card className={`h-full p-8 rounded-3xl border transition-all duration-500 hover:shadow-2xl group ${
                    isDarkMode 
                      ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' 
                      : 'bg-white border-neutral-200 hover:border-neutral-300'
                  }`}>
                    {/* Category Header */}
                    <CardHeader className="p-0 mb-8">
                      <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <CategoryIcon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className={`text-xl ${
                        isDarkMode ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {category.title}
                      </CardTitle>
                    </CardHeader>

                    {/* Skills List */}
                    <CardContent className="p-0 space-y-6">
                      {category.skills.map((skill, skillIndex) => {
                        const SkillIcon = getIconComponent(skill.iconName);

                        return (
                          <div key={skill._id || skill.name}>
                            {/* Skill Header */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-3">
                                <SkillIcon className={`w-5 h-5 ${
                                  isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                                }`} />
                                <span className={`font-medium ${
                                  isDarkMode ? 'text-neutral-200' : 'text-neutral-800'
                                }`}>
                                  {skill.name}
                                </span>
                              </div>
                              <Badge variant="secondary" className={`text-sm font-semibold ${
                                isDarkMode ? 'bg-neutral-800 text-neutral-400' : 'bg-neutral-100 text-neutral-600'
                              }`}>
                                {skill.level}%
                              </Badge>
                            </div>

                            {/* Progress Bar with Custom Gradient */}
                            <div className="relative">
                              <div className={`w-full h-2 rounded-full overflow-hidden ${
                                isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                              }`}>
                                <motion.div
                                  className={`h-full bg-gradient-to-r ${category.gradient} rounded-full`}
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  transition={{ 
                                    duration: 1.5, 
                                    delay: categoryIndex * 0.1 + skillIndex * 0.05,
                                    ease: "easeOut"
                                  }}
                                  viewport={{ once: true }}
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div className={`text-center py-12 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
            <FiCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No skills data available yet</p>
            <p className="text-sm mt-2">Add skills from the admin panel to display them here</p>
          </div>
        )}

        {/* Additional Skills Section */}
        {skillCategories.length > 0 && (
          <motion.div
            className="mt-20 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className={`text-2xl font-bold mb-8 ${
              isDarkMode ? 'text-white' : 'text-neutral-900'
            }`}>
              Always Learning & Growing
            </h3>
            
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Machine Learning", "AI Development", "Blockchain", "Web3", 
                "Microservices", "DevOps", "Cybersecurity", "UI/UX Design"
              ].map((skill, index) => (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  <Badge 
                    variant="outline"
                    className={`px-6 py-3 rounded-full border-2 font-medium transition-all duration-300 hover:scale-105 text-base ${
                      isDarkMode 
                        ? 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:border-primary-500 hover:text-primary-400' 
                        : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:border-primary-500 hover:text-primary-600'
                    }`}
                  >
                    {skill}
                  </Badge>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;