import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiEye, FiCode, FiStar, FiArrowRight } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionLoader from "./SectionLoader.jsx";
import WelcomePage from "../assets/ImageGallery/0.png?url";
import LoginPage from "../assets/ImageGallery/1.png?url";
import FacultyPortal from "../assets/ImageGallery/2.png?url";
import SuperAdmin from "../assets/ImageGallery/3.png?url";
import HOD from "../assets/ImageGallery/4.png?url";
import Developer1 from "../assets/ImageGallery/5.jpeg?url";
import Developer2 from "../assets/ImageGallery/6.jpeg?url";
import SpyMode from "../assets/ImageGallery/7.png?url";

gsap.registerPlugin(ScrollTrigger);

const ModernProjects = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const projectsRef = useRef(null);

  useEffect(() => {
    const projectCards = projectsRef.current?.children;
    
    if (projectCards) {
      gsap.fromTo(
        projectCards,
        { y: 100, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const projects = [
    {
      id: 1,
      title: "STUDENT CENTRIC LMS V2.0",
      description: "A comprehensive Learning Management System designed with student-centric approach for enhanced educational experience.",
      longDescription: "Final year project focused on creating an intuitive LMS platform that prioritizes student needs. Features include course management, assignment submission, grade tracking, and interactive learning tools.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      category: "Full Stack",
      status: "Live",
      featured: true,
      images: [WelcomePage, LoginPage, FacultyPortal, SuperAdmin],
      videoUrl: null, // Add your video file path here later
      liveUrl: "https://obe.quest.edu.pk",
      githubUrl: "https://github.com/Ishaque-Memon/student-centric-lms",
      features: [
        "Student-Centric Design",
        "Course Management",
        "Assignment Tracking",
        "Grade Management",
        "Interactive Learning Tools"
      ]
    },
    {
      id: 2,
      title: "Secure Expense Tracker",
      description: "Full-stack personal finance management application with secure authentication and comprehensive expense tracking features.",
      longDescription: "A complete expense tracking solution built with modern web technologies. Features user authentication, categorized expenses, budget planning, and detailed financial reports.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Chart.js"],
      category: "Full Stack",
      status: "Live",
      featured: true,
      images: [HOD, Developer1],
      videoUrl: null, // Add your video file path here later
      liveUrl: "https://secure-expense-tracker.vercel.app",
      githubUrl: "https://github.com/Ishaque-Memon/secure-expense-tracker",
      features: [
        "Secure Authentication",
        "Expense Categorization",
        "Budget Planning",
        "Financial Reports",
        "Data Visualization"
      ]
    },
    {
      id: 3,
      title: "Real-Time Chat Application",
      description: "Real-time messaging application built with Python and Socket.IO for instant communication.",
      longDescription: "Full-stack chat application with real-time messaging capabilities. Built using Python backend with Socket.IO for real-time communication and modern frontend for seamless user experience.",
      technologies: ["Python", "Socket.IO", "Flask", "JavaScript", "HTML/CSS"],
      category: "Real-Time",
      status: "Development",
      featured: false,
      images: [Developer2, SpyMode],
      videoUrl: null, // Add your video file path here later
      liveUrl: "#",
      githubUrl: "https://github.com/Ishaque-Memon/realtime-chat-application",
      features: [
        "Real-Time Messaging",
        "Socket.IO Integration",
        "Python Backend",
        "User Authentication",
        "Group Chat Support"
      ]
    }
  ];

  return (
    <SectionLoader 
      loadingTime={2200}
      loaderVariant="spinner"
      loadingText="Loading Projects..."
      sectionName="Projects"
    >
      <section
        id="projects"
        ref={sectionRef}
        className={`py-20 lg:py-32 ${
          isDarkMode ? 'bg-neutral-900' : 'bg-white'
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
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Showcasing some of my best work in web development, from full-stack applications
            to innovative solutions that solve real-world problems
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mt-8"></div>
        </motion.div>

        {/* Projects Grid - Custom Layout */}
        <div ref={projectsRef} className="grid grid-cols-4 gap-6">
          {/* First Row - LMS Project (spans 1-4) */}
          <motion.div
            className={`col-span-4 group relative rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl ${
              isDarkMode 
                ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600' 
                : 'bg-white border-neutral-200 hover:border-neutral-300'
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            {/* Project Video/Image */}
            <div className="relative h-64 lg:h-96 overflow-hidden">
              {projects[0].videoUrl ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={projects[0].videoUrl} type="video/mp4" />
                  {/* Fallback to image if video fails */}
                  <img
                    src={projects[0].images[0]}
                    alt={projects[0].title}
                    className="w-full h-full object-cover"
                  />
                </video>
              ) : (
                <img
                  src={projects[0].images[0]}
                  alt={projects[0].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex space-x-3">
                    <motion.a
                      href={projects[0].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiEye className="w-4 h-4" />
                      <span>View Live</span>
                    </motion.a>
                    {/* <motion.a
                      href={projects[0].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiGithub className="w-4 h-4" />
                      <span>Code</span>
                    </motion.a> */}
                  </div>
                  <span className="px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-green-400 text-sm font-medium">
                    {projects[0].status}
                  </span>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-8">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  isDarkMode 
                    ? 'bg-primary-500/20 text-primary-400' 
                    : 'bg-primary-500/20 text-primary-600'
                }`}>
                  {projects[0].category}
                </span>
                <div className="flex items-center space-x-1 text-yellow-400">
                  <FiStar className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium">Featured</span>
                </div>
              </div>

              <h3 className={`text-2xl lg:text-3xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                {projects[0].title}
              </h3>
              
              <p className={`mb-6 leading-relaxed ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                {projects[0].longDescription}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 mb-6">
                {projects[0].technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`px-3 py-1 rounded-lg text-sm font-medium ${
                      isDarkMode 
                        ? 'bg-neutral-700 text-neutral-300' 
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Features */}
              <div className="grid md:grid-cols-2 gap-2">
                {projects[0].features.map((feature) => (
                  <div key={feature} className={`flex items-center space-x-2 text-sm ${
                    isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Second Row - Project 2 (spans 1-2) */}
          <motion.div
            className={`col-span-2 group relative rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl ${
              isDarkMode 
                ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600' 
                : 'bg-white border-neutral-200 hover:border-neutral-300'
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            {/* Project Video/Image */}
            <div className="relative h-48 lg:h-64 overflow-hidden">
              {projects[1].videoUrl ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={projects[1].videoUrl} type="video/mp4" />
                  <img
                    src={projects[1].images[0]}
                    alt={projects[1].title}
                    className="w-full h-full object-cover"
                  />
                </video>
              ) : (
                <img
                  src={projects[1].images[0]}
                  alt={projects[1].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <motion.a
                      href={projects[1].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FiEye className="w-3 h-3" />
                      <span>Live</span>
                    </motion.a>
                    <motion.a
                      href={projects[1].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FiGithub className="w-3 h-3" />
                      <span>Code</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDarkMode 
                  ? 'bg-primary-500/20 text-primary-400' 
                  : 'bg-primary-500/20 text-primary-600'
              }`}>
                {projects[1].category}
              </span>
              
              <h3 className={`text-xl font-bold mt-3 mb-3 ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                {projects[1].title}
              </h3>
              
              <p className={`text-sm mb-4 leading-relaxed ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                {projects[1].description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1">
                {projects[1].technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-1 rounded text-xs ${
                      isDarkMode 
                        ? 'bg-neutral-700 text-neutral-300' 
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
                {projects[1].technologies.length > 4 && (
                  <span className={`px-2 py-1 rounded text-xs ${
                    isDarkMode 
                      ? 'bg-neutral-700 text-neutral-300' 
                      : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    +{projects[1].technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          </motion.div>

          {/* Second Row - Project 3 (spans 3-4) */}
          <motion.div
            className={`col-span-2 group relative rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl ${
              isDarkMode 
                ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600' 
                : 'bg-white border-neutral-200 hover:border-neutral-300'
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            {/* Project Video/Image */}
            <div className="relative h-48 lg:h-64 overflow-hidden">
              {projects[2].videoUrl ? (
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={projects[2].videoUrl} type="video/mp4" />
                  <img
                    src={projects[2].images[0]}
                    alt={projects[2].title}
                    className="w-full h-full object-cover"
                  />
                </video>
              ) : (
                <img
                  src={projects[2].images[0]}
                  alt={projects[2].title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex space-x-2">
                    <motion.a
                      href={projects[2].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FiEye className="w-3 h-3" />
                      <span>Live</span>
                    </motion.a>
                    <motion.a
                      href={projects[2].githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-1 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors text-sm"
                      whileHover={{ scale: 1.05 }}
                    >
                      <FiGithub className="w-3 h-3" />
                      <span>Code</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                isDarkMode 
                  ? 'bg-primary-500/20 text-primary-400' 
                  : 'bg-primary-500/20 text-primary-600'
              }`}>
                {projects[2].category}
              </span>
              
              <h3 className={`text-xl font-bold mt-3 mb-3 ${
                isDarkMode ? 'text-white' : 'text-neutral-900'
              }`}>
                {projects[2].title}
              </h3>
              
              <p className={`text-sm mb-4 leading-relaxed ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                {projects[2].description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-1">
                {projects[2].technologies.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className={`px-2 py-1 rounded text-xs ${
                      isDarkMode 
                        ? 'bg-neutral-700 text-neutral-300' 
                        : 'bg-neutral-100 text-neutral-700'
                    }`}
                  >
                    {tech}
                  </span>
                ))}
                {projects[2].technologies.length > 4 && (
                  <span className={`px-2 py-1 rounded text-xs ${
                    isDarkMode 
                      ? 'bg-neutral-700 text-neutral-300' 
                      : 'bg-neutral-100 text-neutral-700'
                  }`}>
                    +{projects[2].technologies.length - 4}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <h3 className={`text-2xl lg:text-3xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-neutral-900'
          }`}>
            Have a Project in Mind?
          </h3>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            I'm always open to discussing new opportunities and exciting projects
          </p>
          <motion.button
            onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Let's Talk
          </motion.button>
        </motion.div>
      </div>
    </section>
    </SectionLoader>
  );
};

export default ModernProjects;
