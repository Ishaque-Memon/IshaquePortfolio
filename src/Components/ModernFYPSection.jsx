import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { 
  FiCode, 
  FiUsers, 
  FiAward, 
  FiExternalLink, 
  FiGithub,
  FiPlay,
  FiStar,
  FiCalendar,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle,
  FiGrid,
  FiFileText
} from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import presentationPDF from "../assets/Presentation/FYP(1) OBE 21SW49,43,28.pdf";

gsap.registerPlugin(ScrollTrigger);

const ModernFYPSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const fypsRef = useRef(null);

  useEffect(() => {
    const fypCards = fypsRef.current?.children;
    
    if (fypCards) {
      gsap.fromTo(
        fypCards,
        { y: 100, opacity: 0, rotateX: 20 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: fypsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const fypProjects = [
    {
      id: 1,
      title: "STUDENT CENTRIC LMS V2.0",
      subtitle: "Final Year Project - 2025",
      description: "A comprehensive web-based Outcome-Based Education (OBE) system aimed at enhancing academic performance evaluation, continuous quality improvement, and feedback automation within educational institutions.",
      longDescription: "Spearheaded the development of a comprehensive web-based OBE system designed to revolutionize academic performance evaluation. The system features detailed GPA/CGPA reporting, CLO/PLO-based performance analysis, CQI tools for identifying students not meeting learning outcomes, and comprehensive survey & feedback mechanisms. Built with React.js, Node.js, Express.js, and MS SQL Server, deployed on Microsoft Azure with JWT authentication and protected routes.",
      technologies: ["React.js", "Node.js", "Express.js", "MS SQL Server", "JWT Authentication", "Microsoft Azure", "RESTful APIs"],
      category: "Web Development",
      duration: "8 Months",
      teamSize: "3",
      role: "Assistant Group Leader",
      grade: "A+",
      status: "Completed",
      featured: true,
      features: [
        "Outcome-Based Education (OBE) System",
        "GPA & CGPA Performance Reports",
        "CLO/PLO-based Assessment Tracking",
        "Continuous Quality Improvement (CQI) Tools",
        "Student Performance Analytics",
        "Survey & Feedback Mechanisms",
        "JWT Authentication & Protected Routes",
        "Microsoft Azure Deployment",
        "RESTful API Architecture"
      ],
      challenges: [
        "Implementing OBE standards and CLO/PLO mapping",
        "Building comprehensive reporting modules",
        "Designing scalable backend architecture",
        "Integrating CQI tools for educational improvement",
        "Ensuring secure data management with JWT authentication"
      ],
      achievements: [
        "Successfully implemented full-stack OBE system",
        "Delivered comprehensive reporting capabilities",
        "Achieved secure authentication with protected routes",
        "Deployed production-ready system on Microsoft Azure",
        "Enabled data-driven decision making for educators"
      ],
      demoUrl: "https://obe.quest.edu.pk",
      githubUrl: "https://github.com/Ishaque-Memon/student-centric-lms",
      presentationUrl: presentationPDF
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="fyp"
      ref={sectionRef}
      className={`py-20 lg:py-32 ${
        isDarkMode ? 'bg-neutral-900' : 'bg-white'
      } transition-colors duration-300 relative overflow-hidden`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
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
            Final Year <span className="gradient-text">Projects</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Capstone projects that showcase the culmination of my academic journey,
            demonstrating advanced technical skills and innovative problem-solving
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mt-8"></div>
        </motion.div>

        {/* FYP Projects */}
        <motion.div
          ref={fypsRef}
          className="space-y-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {fypProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-cols-2' : ''
              }`}
              variants={itemVariants}
            >
              {/* Project Info */}
              <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                {/* Header */}
                <div className="flex items-center space-x-4 mb-6">
                  {project.featured && (
                    <div className="flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full text-white text-sm font-semibold">
                      <FiStar className="w-4 h-4" />
                      <span>Featured</span>
                    </div>
                  )}
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isDarkMode 
                      ? 'bg-neutral-800 text-neutral-300' 
                      : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    {project.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    project.status === 'Completed'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className={`text-3xl lg:text-4xl font-bold mb-3 ${
                  isDarkMode ? 'text-white' : 'text-neutral-900'
                }`}>
                  {project.title}
                </h3>
                <p className={`text-lg mb-6 ${
                  isDarkMode ? 'text-primary-400' : 'text-primary-600'
                }`}>
                  {project.subtitle}
                </p>

                {/* Description */}
                <p className={`text-lg leading-relaxed mb-8 ${
                  isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                }`}>
                  {project.longDescription}
                </p>

                {/* Project Details */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FiCalendar className={`w-5 h-5 ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`} />
                      <div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>Duration</p>
                        <p className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-neutral-900'
                        }`}>{project.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiUsers className={`w-5 h-5 ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`} />
                      <div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>Team Size</p>
                        <p className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-neutral-900'
                        }`}>{project.teamSize}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <FiTarget className={`w-5 h-5 ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`} />
                      <div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>My Role</p>
                        <p className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-neutral-900'
                        }`}>{project.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <FiAward className={`w-5 h-5 ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`} />
                      <div>
                        <p className={`text-sm ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>Grade</p>
                        <p className={`font-semibold ${
                          isDarkMode ? 'text-white' : 'text-neutral-900'
                        }`}>{project.grade}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-8">
                  <h4 className={`text-lg font-semibold mb-4 ${
                    isDarkMode ? 'text-white' : 'text-neutral-900'
                  }`}>
                    Technologies Used:
                  </h4>
                  <div className="flex flex-wrap gap-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className={`px-4 py-2 rounded-xl text-sm font-medium border ${
                          isDarkMode 
                            ? 'bg-neutral-800 border-neutral-700 text-neutral-300' 
                            : 'bg-neutral-50 border-neutral-200 text-neutral-700'
                        }`}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <motion.a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiPlay className="w-5 h-5" />
                    <span>Live Demo</span>
                  </motion.a>
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700' 
                        : 'bg-white border-neutral-300 text-neutral-900 hover:bg-neutral-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiGithub className="w-5 h-5" />
                    <span>Github</span>
                  </motion.a>
                  <motion.a
                    href={project.presentationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold border transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700' 
                        : 'bg-white border-neutral-300 text-neutral-900 hover:bg-neutral-50'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiFileText className="w-5 h-5" />
                    <span>Presentation</span>
                  </motion.a>
                </div>
              </div>

              {/* Project Features/Achievements */}
              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className={`p-8 rounded-3xl border ${
                  isDarkMode 
                    ? 'bg-neutral-800 border-neutral-700' 
                    : 'bg-neutral-50 border-neutral-200'
                }`}>
                  {/* Key Features */}
                  <div className="mb-8">
                    <h4 className={`text-lg font-semibold mb-4 flex items-center space-x-2 ${
                      isDarkMode ? 'text-white' : 'text-neutral-900'
                    }`}>
                      <FiGrid className="w-5 h-5" />
                      <span>Key Features</span>
                    </h4>
                    <ul className="space-y-3">
                      {project.features.slice(0, 6).map((feature) => (
                        <li key={feature} className={`flex items-center space-x-3 ${
                          isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                        }`}>
                          <FiCheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className={`text-lg font-semibold mb-4 flex items-center space-x-2 ${
                      isDarkMode ? 'text-white' : 'text-neutral-900'
                    }`}>
                      <FiTrendingUp className="w-5 h-5" />
                      <span>Achievements</span>
                    </h4>
                    <ul className="space-y-3">
                      {project.achievements.map((achievement) => (
                        <li key={achievement} className={`flex items-center space-x-3 ${
                          isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                        }`}>
                          <FiAward className="w-4 h-4 text-primary-500 flex-shrink-0" />
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Projects Completed", value: "2", icon: FiCheckCircle },
              { label: "Team Members", value: "3", icon: FiUsers },
              { label: "Technologies Used", value: "15+", icon: FiCode },
              // { label: "Awards Won", value: "3", icon: FiAward }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className={`text-center p-6 rounded-2xl border ${
                    isDarkMode 
                      ? 'bg-neutral-800 border-neutral-700' 
                      : 'bg-white border-neutral-200'
                  }`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl">
                      <IconComponent className={`w-6 h-6 ${
                        isDarkMode ? 'text-primary-400' : 'text-primary-600'
                      }`} />
                    </div>
                  </div>
                  <h3 className={`text-3xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {stat.value}
                  </h3>
                  <p className={`${
                    isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernFYPSection;
