// src/components/SkillsSection.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getAllSkills } from "@/api/portfolioApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { SkillIcons, FiCode } from "@/assets/Icons/Icons";

/**
 * SkillsSection
 * - Fetches skills from API
 * - Groups them by category
 * - Renders category cards dynamically
 * - Uses SkillIcons mapping to render icons by name (no hardcoded map)
 */
const SkillsSection = () => {
  const { isDarkMode } = useTheme();
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();
        // handle direct array or { data: [...] } response
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

  /**
   * Safely resolve an icon component by its name string.
   * SkillIcons is an object imported from your Icons.jsx that holds components.
   * Returns a React component (or a fallback component).
   */
  const getIconComponent = (iconName) => {
    if (!iconName) return SkillIcons.FiCode || FiCode || (() => null);
    // if caller passed a component already, return it (defensive)
    if (typeof iconName === "function" || React.isValidElement(iconName)) {
      return iconName;
    }
    return SkillIcons[iconName] || SkillIcons.FiCode || FiCode || (() => null);
  };

  /**
   * Category helpers — returns gradient classes for visuals.
   * Feel free to centralize these with your other color helpers if preferred.
   */
  const getCategoryColor = (category) => {
    const colorMap = {
      frontend: "from-blue-500 to-cyan-500",
      backend: "from-green-500 to-emerald-500",
      database: "from-purple-500 to-pink-500",
      tools: "from-orange-500 to-red-500",
      cloud: "from-sky-500 to-blue-500",
      framework: "from-indigo-500 to-purple-500",
      other: "from-gray-500 to-gray-600",
    };
    return colorMap[(category || "").toLowerCase()] || "from-gray-500 to-gray-600";
  };

  /**
   * Transform API skills into grouped categories.
   * - Groups by lowercased category key to avoid duplicates due to case differences.
   * - Keeps original category label as provided by API for display.
   */
  const transformApiSkills = (apiData) => {
    const categories = {};
    apiData.forEach((skill) => {
      const rawCategory = skill.category || "other";
      const key = String(rawCategory).toLowerCase();

      if (!categories[key]) {
        categories[key] = {
          key,
          name: rawCategory,
          iconName: getCategoryIconName(rawCategory),
          color: getCategoryColor(rawCategory),
          skills: [],
        };
      }

      categories[key].skills.push({
        _id: skill._id,
        name: skill.name,
        level: skill.level,
        proficiency: skill.proficiency ?? 50,
        iconName: skill.icon || "FiCode",
      });
    });

    // Return as array, preserving insertion order by API grouping
    return Object.values(categories);
  };

  /**
   * Fallback category -> icon name mapping (string names only).
   * We only return a string here; getIconComponent will convert it to a component.
   */
  const getCategoryIconName = (category) => {
    const map = {
      frontend: "FiCode",
      backend: "FiDatabase",
      database: "FiDatabase",
      tools: "FiTool",
      cloud: "FiCloud",
      framework: "FiLayers",
      other: "FiGlobe",
    };
    return map[(category || "").toLowerCase()] || "FiCode";
  };

  // motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  const categories = transformApiSkills(skills);

  return (
    <section
      id="skills"
      className={`min-h-screen py-20 relative ${isDarkMode ? "bg-neutral-950" : "bg-neutral-50"}`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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
          <p className={`text-lg ${isDarkMode ? "text-neutral-400" : "text-neutral-600"} max-w-2xl mx-auto`}>
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            <p className={`mt-4 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>Loading skills...</p>
          </div>
        )}

        {/* Error */}
        {error && !loading && skills.length === 0 && (
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
          </div>
        )}

        {/* Skills Grid */}
        {!loading && categories.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {categories.map((category, idx) => {
              // resolve the category icon component
              const CategoryIcon = getIconComponent(category.iconName);

              return (
                <motion.div key={category.key || idx} variants={itemVariants}>
                  <Card
                    className={`h-full ${
                      isDarkMode ? "bg-neutral-900/50 border-neutral-800 hover:border-neutral-700" : "bg-white border-neutral-200 hover:border-neutral-300"
                    } transition-all duration-300 hover:shadow-xl`}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className={`p-3 rounded-lg bg-gradient-to-br ${category.color}`}>
                          {CategoryIcon ? <CategoryIcon className="w-6 h-6 text-white" /> : <FiCode className="w-6 h-6 text-white" />}
                        </div>
                        <span className={isDarkMode ? "text-white" : "text-neutral-900"}>{category.name}</span>
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                      {category.skills.map((skill) => {
                        const SkillIcon = getIconComponent(skill.iconName || skill.iconName || skill.iconName) || getIconComponent(skill.iconName || skill.icon);
                        // skill may store icon under iconName or icon; adapt defensively:
                        const iconName = skill.iconName || skill.icon || "FiCode";
                        const SkillIconComp = getIconComponent(iconName);

                        return (
                          <div key={skill._id || `${category.key}-${skill.name}`} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                {SkillIconComp ? (
                                  <SkillIconComp className={`${isDarkMode ? "text-neutral-400" : "text-neutral-600"} w-4 h-4`} />
                                ) : (
                                  <FiCode className={`${isDarkMode ? "text-neutral-400" : "text-neutral-600"} w-4 h-4`} />
                                )}

                                <span className={`text-sm font-medium ${isDarkMode ? "text-neutral-300" : "text-neutral-700"}`}>{skill.name}</span>
                              </div>

                              <Badge variant="secondary" className="text-xs">
                                {skill.level}
                              </Badge>
                            </div>

                            <Progress value={skill.proficiency} className="h-2" />
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

        {/* No data */}
        {!loading && categories.length === 0 && !error && (
          <div className={`text-center py-12 ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
            <FiCode className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No skills data available yet</p>
            <p className="text-sm mt-2">Add skills from the admin panel to display them here</p>
          </div>
        )}

        {/* Footer note */}
        {!loading && categories.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4, duration: 0.6 }} className="mt-12 text-center">
            <Card className={`inline-block ${isDarkMode ? "bg-neutral-900/50 border-neutral-800" : "bg-white border-neutral-200"}`}>
              <CardContent className="py-4 px-6">
                <p className={`text-sm ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>🚀 Always learning and exploring new technologies</p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SkillsSection;
