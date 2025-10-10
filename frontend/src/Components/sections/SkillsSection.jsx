import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  FiCode, FiDatabase, FiServer, FiSmartphone, FiLayout, FiGitBranch,
  FiChrome, FiMonitor, FiCpu, FiCloud, FiShield, FiTrendingUp
} from "react-icons/fi";
import {
  SiJavascript, SiTypescript, SiReact, SiNodedotjs, SiPython,
  SiHtml5, SiCss3, SiMongodb, SiPostgresql, 
  SiMysql, SiFirebase, SiGit, SiDocker, SiGithub, SiFigma
} from "react-icons/si";
import { useTheme } from "../contexts/ThemeContext.jsx";
// Removed GSAP ScrollTrigger to avoid overlapping with Framer Motion

const ModernSkills = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const skillsRef = useRef(null);

  // Framer Motion handles grid/card reveals; keep a single animation system

  const skillCategories = [
    {
      title: "Frontend Development",
      icon: FiCode,
      gradient: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React.js", icon: SiReact, level: 95 },
        { name: "JavaScript", icon: SiJavascript, level: 90 },
        { name: "HTML5", icon: SiHtml5, level: 95 },
        { name: "CSS3", icon: SiCss3, level: 90 },
        { name: "Tailwind CSS", icon: SiCss3, level: 88 }
      ]
    },
    {
      title: "Backend Development",
      icon: FiServer,
      gradient: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", icon: SiNodedotjs, level: 90 },
        { name: "Express.js", icon: FiServer, level: 88 },
        { name: "REST APIs", icon: FiCloud, level: 92 },
        { name: "JWT Auth", icon: FiShield, level: 85 },
        { name: "Middleware", icon: FiServer, level: 80 }
      ]
    },
    {
      title: "Database & Cloud",
      icon: FiDatabase,
      gradient: "from-purple-500 to-pink-500",
      skills: [
        { name: "MS SQL Server", icon: SiMysql, level: 90 },
        { name: "MySQL", icon: SiMysql, level: 85 },
        { name: "Azure", icon: FiCloud, level: 82 },
        { name: "Database Design", icon: FiDatabase, level: 88 },
        { name: "Stored Procedures", icon: FiDatabase, level: 80 }
      ]
    },
    {
      title: "Tools & DevOps",
      icon: FiLayout,
      gradient: "from-orange-500 to-red-500",
      skills: [
        { name: "Git", icon: SiGit, level: 92 },
        { name: "GitHub", icon: SiGithub, level: 90 },
        { name: "VS Code", icon: FiCode, level: 95 },
        { name: "Postman", icon: FiMonitor, level: 88 },
        { name: "SSMS", icon: FiDatabase, level: 85 }
      ]
    }
  ];

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
        <motion.div
          ref={skillsRef}
          className="grid md:grid-cols-2 xl:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className={`p-8 rounded-3xl border transition-all duration-500 hover:shadow-2xl group ${
                isDarkMode 
                  ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' 
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              {/* Category Header */}
              <div className="mb-8">
                <div className={`w-16 h-16 bg-gradient-to-r ${category.gradient} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <category.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-neutral-900'
                }`}>
                  {category.title}
                </h3>
              </div>

              {/* Skills List */}
              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    {/* Skill Header */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <skill.icon className={`w-5 h-5 ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                        }`} />
                        <span className={`font-medium ${
                          isDarkMode ? 'text-neutral-200' : 'text-neutral-800'
                        }`}>
                          {skill.name}
                        </span>
                      </div>
                      <span className={`text-sm font-semibold ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {skill.level}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className={`w-full h-2 rounded-full ${
                      isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                    }`}>
                      <motion.div
                        className={`h-2 bg-gradient-to-r ${category.gradient} rounded-full`}
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
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Section */}
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
              <motion.span
                key={skill}
                className={`px-6 py-3 rounded-full border-2 font-medium transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-neutral-800 border-neutral-700 text-neutral-200 hover:border-primary-500 hover:text-primary-400' 
                    : 'bg-neutral-100 border-neutral-300 text-neutral-700 hover:border-primary-500 hover:text-primary-600'
                }`}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.1 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernSkills;
