import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiAward, 
  FiCalendar, 
  FiExternalLink, 
  FiEye, 
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiCheckCircle
} from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import certificate images
import Certificate0 from "../assets/Certificates/Certificate0.png?url";
import Certificate1 from "../assets/Certificates/Certificate1.png?url";
import Certificate2 from "../assets/Certificates/Certificate2.png?url";
import Certificate3 from "../assets/Certificates/Certificate3.png?url";
import Certificate4 from "../assets/Certificates/Certificate4.png?url";
import Certificate5 from "../assets/Certificates/Certificate5.png?url";
import Certificate6 from "../assets/Certificates/Certificate6.png?url";

gsap.registerPlugin(ScrollTrigger);

const ModernCertificates = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const certificatesRef = useRef(null);
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const certificateCards = certificatesRef.current?.children;
    
    if (certificateCards) {
      gsap.fromTo(
        certificateCards,
        { y: 80, opacity: 0, rotateY: 15 },
        {
          y: 0,
          opacity: 1,
          rotateY: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: certificatesRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const certificates = [
    {
      id: 1,
      title: "Fundamentals of Management",
      issuer: "Coursera",
      date: "2023",
      description: "Comprehensive course covering management principles, leadership skills, and organizational behavior.",
      skills: ["Management", "Leadership", "Organization", "Strategy", "Team Building"],
      image: Certificate0,
      credentialId: "COURSERA-001",
      verifyUrl: "https://coursera.org/verify",
      category: "Management",
      level: "Intermediate"
    },
    {
      id: 2,
      title: "Build a Guessing Game Application using C++",
      issuer: "Coursera",
      date: "2023",
      description: "Hands-on project-based course for building interactive applications using C++ programming language.",
      skills: ["C++", "Game Development", "Programming Logic", "Object-Oriented Programming", "Problem Solving"],
      image: Certificate1,
      credentialId: "COURSERA-002",
      verifyUrl: "https://coursera.org/verify",
      category: "Programming",
      level: "Intermediate"
    },
    {
      id: 3,
      title: "Command Line in Linux",
      issuer: "Coursera",
      date: "2023",
      description: "Essential Linux command line skills including file management, system administration, and shell scripting.",
      skills: ["Linux", "Command Line", "Shell Scripting", "System Administration", "File Management"],
      image: Certificate2,
      credentialId: "COURSERA-003",
      verifyUrl: "https://coursera.org/verify",
      category: "System Administration",
      level: "Intermediate"
    },
    {
      id: 4,
      title: "Build a Free Website with WordPress",
      issuer: "Coursera",
      date: "2022",
      description: "Complete guide to creating professional websites using WordPress CMS platform.",
      skills: ["WordPress", "Web Development", "CMS", "Website Design", "Content Management"],
      image: Certificate3,
      credentialId: "COURSERA-004",
      verifyUrl: "https://coursera.org/verify",
      category: "Web Development",
      level: "Beginner"
    },
    {
      id: 5,
      title: "Create a Text Logo Professionally using Adobe Illustrator",
      issuer: "Coursera",
      date: "2022",
      description: "Professional logo design techniques using Adobe Illustrator for creating brand identities.",
      skills: ["Adobe Illustrator", "Logo Design", "Graphic Design", "Branding", "Typography"],
      image: Certificate4,
      credentialId: "COURSERA-005",
      verifyUrl: "https://coursera.org/verify",
      category: "Design",
      level: "Intermediate"
    },
    {
      id: 6,
      title: "Introduction of Cybersecurity Tools & Cyberattacks",
      issuer: "Coursera",
      date: "2022",
      description: "Fundamentals of cybersecurity including common attack vectors and security tools.",
      skills: ["Cybersecurity", "Security Tools", "Threat Analysis", "Network Security", "Risk Assessment"],
      image: Certificate5,
      credentialId: "COURSERA-006",
      verifyUrl: "https://coursera.org/verify",
      category: "Security",
      level: "Beginner"
    },
    {
      id: 7,
      title: "Learn the Python Programming Language",
      issuer: "Udemy",
      date: "2021",
      description: "Comprehensive Python programming course covering fundamentals to advanced concepts.",
      skills: ["Python", "Programming Fundamentals", "Data Structures", "Object-Oriented Programming", "Problem Solving"],
      image: Certificate6,
      credentialId: "UDEMY-001",
      verifyUrl: "https://udemy.com/verify",
      category: "Programming",
      level: "Intermediate"
    }
  ];

  const categories = ["All", ...new Set(certificates.map(cert => cert.category))];
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCertificates = selectedCategory === "All" 
    ? certificates 
    : certificates.filter(cert => cert.category === selectedCategory);

  const openModal = (certificate) => {
    setSelectedCertificate(certificate);
    setCurrentImageIndex(0);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('ui-overlay-open');
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ui:overlay-change', { detail: { open: true } }));
    }
  };

  const closeModal = () => {
    setSelectedCertificate(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'unset';
      document.body.classList.remove('ui-overlay-open');
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('ui:overlay-change', { detail: { open: false } }));
    }
  };

  // Ensure body class/overflow are reset if component unmounts
  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = 'unset';
        document.body.classList.remove('ui-overlay-open');
      }
    };
  }, []);

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
    hidden: { y: 60, opacity: 0 },
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
      id="certificates"
      ref={sectionRef}
      className={`py-12 sm:py-16 md:py-20 lg:py-32 ${
        isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'
      } transition-colors duration-300 relative overflow-hidden`}
      >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${
            isDarkMode ? 'text-white' : 'text-neutral-900'
          }`}>
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Continuous learning and professional development through industry-recognized
            certifications and training programs
          </p>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mt-6 sm:mt-8"></div>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 text-sm sm:text-base ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-lg'
                  : isDarkMode
                    ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                    : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        <motion.div
          ref={certificatesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {filteredCertificates.map((certificate) => (
            <motion.div
              key={certificate.id}
              className={`group cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600' 
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
              variants={itemVariants}
              whileHover={{ y: -8, rotateY: 5 }}
              onClick={() => openModal(certificate)}
            >
              {/* Certificate Image */}
              <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden">
                <img
                  src={certificate.image}
                  alt={certificate.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      className="p-3 sm:p-4 bg-white/20 backdrop-blur-sm rounded-full text-white"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FiEye className="w-5 sm:w-6 h-5 sm:h-6" />
                    </motion.div>
                  </div>
                </div>

                {/* Level Badge */}
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                    certificate.level === 'Advanced' 
                      ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                      : certificate.level === 'Professional'
                      ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    {certificate.level}
                  </span>
                </div>
              </div>

              {/* Certificate Content */}
              <div className="p-4 sm:p-6">
                {/* Category */}
                <div className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium mb-2 sm:mb-3 ${
                  isDarkMode 
                    ? 'bg-neutral-700 text-neutral-300' 
                    : 'bg-neutral-100 text-neutral-700'
                }`}>
                  {certificate.category}
                </div>

                {/* Title & Issuer */}
                <h3 className={`text-lg sm:text-xl font-bold mb-2 leading-tight ${
                  isDarkMode ? 'text-white' : 'text-neutral-900'
                }`}>
                  {certificate.title}
                </h3>
                <div className="flex items-center space-x-2 mb-2 sm:mb-3">
                  <FiCheckCircle className={`w-3 sm:w-4 h-3 sm:h-4 ${
                    isDarkMode ? 'text-green-400' : 'text-green-600'
                  }`} />
                  <p className={`font-semibold text-sm sm:text-base ${
                    isDarkMode ? 'text-primary-400' : 'text-primary-600'
                  }`}>
                    {certificate.issuer}
                  </p>
                </div>

                {/* Date */}
                <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                  <FiCalendar className={`w-3 sm:w-4 h-3 sm:h-4 ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                  }`} />
                  <span className={`text-xs sm:text-sm ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    Completed {certificate.date}
                  </span>
                </div>

                {/* Description */}
                <p className={`mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed ${
                  isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                }`}>
                  {certificate.description.slice(0, 100)}...
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {certificate.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        isDarkMode 
                          ? 'bg-neutral-700 text-neutral-300' 
                          : 'bg-neutral-100 text-neutral-700'
                      }`}
                    >
                      {skill}
                    </span>
                  ))}
                  {certificate.skills.length > 3 && (
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      +{certificate.skills.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-16 sm:mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[
              { label: "Certifications Earned", value: "7+", icon: FiAward },
              { label: "Learning Hours", value: "500+", icon: FiCalendar },
              { label: "Skills Acquired", value: "25+", icon: FiCheckCircle }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className={`text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl border ${
                    isDarkMode 
                      ? 'bg-neutral-800 border-neutral-700' 
                      : 'bg-white border-neutral-200'
                  }`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-center mb-3 sm:mb-4">
                    <div className="p-2 sm:p-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-lg sm:rounded-xl">
                      <IconComponent className={`w-5 sm:w-6 h-5 sm:h-6 ${
                        isDarkMode ? 'text-primary-400' : 'text-primary-600'
                      }`} />
                    </div>
                  </div>
                  <h3 className={`text-2xl sm:text-3xl font-bold mb-1 sm:mb-2 ${
                    isDarkMode ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {stat.value}
                  </h3>
                  <p className={`text-sm sm:text-base ${
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

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className={`max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl overflow-hidden ${
                isDarkMode ? 'bg-neutral-800' : 'bg-white'
              }`}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`p-4 sm:p-6 border-b ${
                isDarkMode ? 'border-neutral-700' : 'border-neutral-200'
              }`}>
                <div className="flex items-center justify-between">
                  <h3 className={`text-lg sm:text-xl md:text-2xl font-bold pr-4 ${
                    isDarkMode ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {selectedCertificate.title}
                  </h3>
                  <button
                    onClick={closeModal}
                    className={`p-2 rounded-full transition-colors flex-shrink-0 ${
                      isDarkMode 
                        ? 'hover:bg-neutral-700 text-neutral-400' 
                        : 'hover:bg-neutral-100 text-neutral-600'
                    }`}
                  >
                    <FiX className="w-5 sm:w-6 h-5 sm:h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-4 sm:p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
                  {/* Certificate Image */}
                  <div>
                    <img
                      src={selectedCertificate.image}
                      alt={selectedCertificate.title}
                      className="w-full rounded-xl sm:rounded-2xl"
                    />
                  </div>

                  {/* Certificate Details */}
                  <div>
                    <div className="flex flex-col sm:flex-row items-start space-y-2 sm:space-y-0 sm:space-x-2 mb-4">
                      <div className="flex items-center space-x-2">
                        <FiCheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-green-500" />
                        <span className={`font-semibold text-sm sm:text-base ${
                          isDarkMode ? 'text-primary-400' : 'text-primary-600'
                        }`}>
                          {selectedCertificate.issuer}
                        </span>
                      </div>
                      <span className={`px-2 sm:px-3 py-1 rounded-full text-xs font-semibold ${
                        selectedCertificate.level === 'Advanced' 
                          ? 'bg-red-500/20 text-red-400'
                          : selectedCertificate.level === 'Professional'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {selectedCertificate.level}
                      </span>
                    </div>

                    <p className={`mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base ${
                      isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      {selectedCertificate.description}
                    </p>

                    <div className="mb-4 sm:mb-6">
                      <h4 className={`text-sm font-semibold mb-2 sm:mb-3 ${
                        isDarkMode ? 'text-white' : 'text-neutral-900'
                      }`}>
                        Skills Covered:
                      </h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {selectedCertificate.skills.map((skill) => (
                          <span
                            key={skill}
                            className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium ${
                              isDarkMode 
                                ? 'bg-neutral-700 text-neutral-300' 
                                : 'bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl border mb-4 sm:mb-6 ${
                      isDarkMode 
                        ? 'bg-neutral-700 border-neutral-600' 
                        : 'bg-neutral-50 border-neutral-200'
                    }`}>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
                        <div>
                          <p className={`text-xs sm:text-sm ${
                            isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                          }`}>
                            Credential ID
                          </p>
                          <p className={`font-mono text-xs sm:text-sm ${
                            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                          }`}>
                            {selectedCertificate.credentialId}
                          </p>
                        </div>
                        <div className="text-left sm:text-right">
                          <p className={`text-xs sm:text-sm ${
                            isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                          }`}>
                            Completed
                          </p>
                          <p className={`font-semibold text-sm sm:text-base ${
                            isDarkMode ? 'text-white' : 'text-neutral-900'
                          }`}>
                            {selectedCertificate.date}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                      <motion.a
                        href={selectedCertificate.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex-1 flex items-center justify-center space-x-2 py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base ${
                          isDarkMode 
                            ? 'bg-neutral-700 text-white hover:bg-neutral-600' 
                            : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiExternalLink className="w-3 sm:w-4 h-3 sm:h-4" />
                        <span>Verify</span>
                      </motion.a>
                      <motion.button
                        onClick={() => {
                          // Create a download link for the certificate image
                          const link = document.createElement('a');
                          link.href = selectedCertificate.image;
                          link.download = `${selectedCertificate.title.replace(/\s+/g, '_')}_Certificate.png`;
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                        className="flex-1 flex items-center justify-center space-x-2 py-2.5 sm:py-3 px-4 sm:px-6 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiDownload className="w-3 sm:w-4 h-3 sm:h-4" />
                        <span>Download</span>
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ModernCertificates;
