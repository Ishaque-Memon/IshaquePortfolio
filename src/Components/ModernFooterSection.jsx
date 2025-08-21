import React from "react";
import { motion } from "framer-motion";
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiGithub,
  FiLinkedin,
  FiInstagram,
  FiTwitter,
  FiHome,
  FiUser,
  FiCode,
  FiBriefcase,
  FiAward,
  FiMessageCircle,
  FiHeart,
} from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext.jsx";

const ModernFooterSection = () => {
  const { isDarkMode } = useTheme();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const footerLinks = {
    navigation: [
      { label: "Home", sectionId: "home", icon: FiHome },
      { label: "About", sectionId: "about", icon: FiUser },
      { label: "Skills", sectionId: "skills", icon: FiCode },
      { label: "Projects", sectionId: "projects", icon: FiBriefcase },
      { label: "Education", sectionId: "education", icon: FiAward },
      { label: "Contact", sectionId: "contact", icon: FiMessageCircle }
    ],
    social: [
      {
        icon: FiGithub,
        label: "GitHub",
        href: "https://github.com/Ishaque-Memon",
        color: "hover:text-gray-400"
      },
      {
        icon: FiLinkedin,
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/muhammad-ishaque-574492249/",
        color: "hover:text-blue-400"
      }
    ],
    contact: [
      {
        icon: FiMail,
        label: "Email",
        value: "m.ishaq031530@gmail.com",
        href: "mailto:m.ishaq031530@gmail.com"
      },
      {
        icon: FiPhone,
        label: "Phone",
        value: "+92 315 3057848",
        href: "tel:+923153057848"
      },
      {
        icon: FiMapPin,
        label: "Location",
        value: "Qasimabad, Hyderabad",
        href: "https://maps.google.com/"
      }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
    <footer
      className={`relative overflow-hidden ${
        isDarkMode ? 'bg-neutral-900' : 'bg-gray-50'
      }`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10">
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12">
            
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="md:col-span-2 lg:col-span-2">
              <div className="mb-6 sm:mb-8">
                <h3 className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  Muhammad <span className="gradient-text">Ishaque</span>
                </h3>
                <p className={`text-base sm:text-lg leading-relaxed max-w-md ${
                  isDarkMode ? 'text-neutral-300' : 'text-gray-600'
                }`}>
                  Software Engineering student specializing in full-stack development. 
                  Building innovative web solutions and learning cutting-edge technologies.
                </p>
              </div>

              {/* Social Links */}
              <div className="mb-6 sm:mb-8">
                <h4 className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Follow Me</h4>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {footerLinks.social.map((social, index) => {
                    const IconComponent = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2.5 sm:p-3 rounded-xl transition-all duration-300 ${
                          isDarkMode 
                            ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700' 
                            : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                        } ${social.color}`}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className={`text-base sm:text-lg font-semibold mb-4 sm:mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Quick Links</h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.navigation.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={index}>
                      <motion.button
                        onClick={() => scrollToSection(link.sectionId)}
                        className={`flex items-center space-x-2 sm:space-x-3 transition-colors duration-300 group text-sm sm:text-base ${
                          isDarkMode 
                            ? 'text-neutral-300 hover:text-primary-400' 
                            : 'text-gray-600 hover:text-primary-600'
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        <IconComponent className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${
                          isDarkMode ? 'group-hover:text-primary-400' : 'group-hover:text-primary-600'
                        }`} />
                        <span>{link.label}</span>
                      </motion.button>
                    </li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div variants={itemVariants}>
              <h4 className={`text-base sm:text-lg font-semibold mb-4 sm:mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Get in Touch</h4>
              <div className="space-y-3 sm:space-y-4">
                {footerLinks.contact.map((contact, index) => {
                  const IconComponent = contact.icon;
                  return (
                    <motion.a
                      key={index}
                      href={contact.href}
                      target={contact.label === "Location" ? "_blank" : undefined}
                      rel={contact.label === "Location" ? "noopener noreferrer" : undefined}
                      className={`flex items-center space-x-2 sm:space-x-3 transition-colors duration-300 group ${
                        isDarkMode 
                          ? 'text-neutral-300 hover:text-primary-400' 
                          : 'text-gray-600 hover:text-primary-600'
                      }`}
                      whileHover={{ x: 5 }}
                    >
                      <div className={`p-1.5 sm:p-2 rounded-lg group-hover:bg-gradient-to-r group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-all duration-300 ${
                        isDarkMode ? 'bg-neutral-800' : 'bg-gray-200'
                      }`}>
                        <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <p className={`text-xs sm:text-sm ${
                          isDarkMode ? 'text-neutral-400' : 'text-gray-500'
                        }`}>{contact.label}</p>
                        <p className="font-medium text-sm sm:text-base">{contact.value}</p>
                      </div>
                    </motion.a>
                  );
                })}
              </div>

              {/* Availability Status */}
              <div className={`mt-6 sm:mt-8 p-3 sm:p-4 rounded-xl ${
                isDarkMode 
                  ? 'bg-green-900/20 border border-green-500/30' 
                  : 'bg-green-100 border border-green-300'
              }`}>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`font-semibold text-xs sm:text-sm ${
                    isDarkMode ? 'text-green-400' : 'text-green-700'
                  }`}>Available for new projects</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className={`border-t ${
          isDarkMode ? 'border-neutral-800' : 'border-gray-300'
        }`}></div>

        {/* Bottom Bar */}
        <motion.div
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            
            {/* Copyright */}
            <div className={`flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-2 text-center sm:text-left ${
              isDarkMode ? 'text-neutral-400' : 'text-gray-600'
            }`}>
              <span className="text-sm">&copy; {new Date().getFullYear()}</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-xs sm:text-sm">© 2025 Secure Expense Tracker. All rights reserved.</span>
              <span className="hidden sm:inline">•</span>
              <span className="text-xs sm:text-sm">Developed by</span>
              <span className={`font-semibold text-sm ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Muhammad Ishaque</span>
            </div>

            {/* Tech Stack */}
            {/* <div className="flex items-center space-x-4 text-neutral-400 text-sm">
              <span>Built with:</span>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs">React</span>
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs">Tailwind</span>
                <span className="px-2 py-1 bg-neutral-800 rounded text-xs">Framer Motion</span>
              </div>
            </div> */}
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default ModernFooterSection;
