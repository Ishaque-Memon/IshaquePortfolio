import React, { useState, useEffect } from "react";
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
import { useTheme } from "../../contexts/ThemeContext.jsx";
import portfolioApi from "@/api/portfolioApi";

const Footer = () => {
  const { isDarkMode } = useTheme();
  
  // State for personal info from API
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch personal info on component mount
  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        setLoading(true);
        const response = await portfolioApi.getPersonalInfo();
        console.log('Footer - Personal Info Response:', response);
        
        // Handle both response.data and direct response
        const data = response?.data || response;
        setPersonalInfo(data);
      } catch (error) {
        console.error('Error fetching personal info in footer:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

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
    ]
  };

  // Build social links dynamically from API
  const socialLinks = personalInfo?.socialLinks ? [
    {
      icon: FiGithub,
      label: "GitHub",
      href: personalInfo.socialLinks.github,
      color: "hover:text-gray-400",
      show: !!personalInfo.socialLinks.github
    },
    {
      icon: FiLinkedin,
      label: "LinkedIn",
      href: personalInfo.socialLinks.linkedin,
      color: "hover:text-blue-400",
      show: !!personalInfo.socialLinks.linkedin
    },
    {
      icon: FiTwitter,
      label: "Twitter",
      href: personalInfo.socialLinks.twitter,
      color: "hover:text-blue-300",
      show: !!personalInfo.socialLinks.twitter
    },
    {
      icon: FiInstagram,
      label: "Instagram",
      href: personalInfo.socialLinks.instagram,
      color: "hover:text-pink-400",
      show: !!personalInfo.socialLinks.instagram
    }
  ].filter(social => social.show) : [];

  // Build contact info dynamically from API
  const contactInfo = [
    {
      icon: FiMail,
      label: "Email",
      value: personalInfo?.email || "Loading...",
      href: personalInfo?.email ? `mailto:${personalInfo.email}` : "#",
      show: true
    },
    {
      icon: FiPhone,
      label: "Phone",
      value: personalInfo?.phone || "Loading...",
      href: personalInfo?.phone ? `tel:${personalInfo.phone}` : "#",
      show: true
    },
    {
      icon: FiMapPin,
      label: "Location",
      value: personalInfo?.location 
        ? `${personalInfo.location.city || ''}${personalInfo.location.city && personalInfo.location.country ? ', ' : ''}${personalInfo.location.country || ''}`.trim() || "Loading..."
        : "Loading...",
      href: "https://maps.google.com/",
      show: true
    }
  ];

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
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="grid lg:grid-cols-3 gap-12">
            
            {/* Brand Section */}
            <motion.div variants={itemVariants} className="lg:col-span-2">
              <div className="mb-8">
                {loading ? (
                  // Loading skeleton for name
                  <>
                    <div className={`h-9 w-64 rounded mb-4 animate-pulse ${
                      isDarkMode ? 'bg-neutral-800' : 'bg-gray-300'
                    }`}></div>
                    <div className={`h-20 w-full max-w-md rounded animate-pulse ${
                      isDarkMode ? 'bg-neutral-800' : 'bg-gray-300'
                    }`}></div>
                  </>
                ) : (
                  <>
                    <h3 className={`text-3xl font-bold mb-4 ${
                      isDarkMode ? 'gradient-text' : 'text-gray-900'
                    }`}>
                      {personalInfo?.name || 'Muhammad Ishaque'}
                       {/* <span className="gradient-text">{personalInfo?.title?.split(' ').pop() || ''}</span> */}
                    </h3>
                    <p className={`text-lg leading-relaxed max-w-md ${
                      isDarkMode ? 'text-neutral-300' : 'text-gray-600'
                    }`}>
                      {/* {personalInfo?.bio || 'Software Engineering student specializing in full-stack development. Building innovative web solutions and learning cutting-edge technologies.'} */}
                      Software engineer with expertise in full-stack development. Building innovative solutions with cutting-edge technologies and best practices.
                    </p>
                  </>
                )}
              </div>

              {/* Social Links */}
              <div className="mb-8">
                <h4 className={`font-semibold mb-4 ${
                  isDarkMode ? 'text-white' : 'text-gray-900'
                }`}>Follow Me</h4>
                <div className="flex space-x-4">
                  {loading ? (
                    // Loading skeleton for social links
                    Array(2).fill(0).map((_, index) => (
                      <div
                        key={index}
                        className={`w-11 h-11 rounded-xl animate-pulse ${
                          isDarkMode ? 'bg-neutral-800' : 'bg-gray-300'
                        }`}
                      ></div>
                    ))
                  ) : socialLinks.length > 0 ? (
                    socialLinks.map((social, index) => {
                      const IconComponent = social.icon;
                      return (
                        <motion.a
                          key={index}
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`p-3 rounded-xl transition-all duration-300 ${
                            isDarkMode 
                              ? 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700' 
                              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                          } ${social.color}`}
                          whileHover={{ scale: 1.1, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <IconComponent className="w-5 h-5" />
                        </motion.a>
                      );
                    })
                  ) : (
                    <p className={`text-sm ${
                      isDarkMode ? 'text-neutral-400' : 'text-gray-500'
                    }`}>No social links available</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div variants={itemVariants}>
              <h4 className={`font-semibold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Quick Links</h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={index}>
                      <motion.button
                        onClick={() => scrollToSection(link.sectionId)}
                        className={`flex items-center space-x-3 transition-colors duration-300 group ${
                          isDarkMode 
                            ? 'text-neutral-300 hover:text-primary-400' 
                            : 'text-gray-600 hover:text-primary-600'
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        <IconComponent className={`w-4 h-4 ${
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
              <h4 className={`font-semibold mb-6 ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>Get in Touch</h4>
              <div className="space-y-4">
                {loading ? (
                  // Loading skeleton for contact info
                  Array(3).fill(0).map((_, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-10 h-10 rounded-lg animate-pulse ${
                        isDarkMode ? 'bg-neutral-800' : 'bg-gray-300'
                      }`}></div>
                      <div className="flex-1">
                        <div className={`h-3 w-16 rounded mb-2 animate-pulse ${
                          isDarkMode ? 'bg-neutral-800' : 'bg-gray-300'
                        }`}></div>
                        <div className={`h-4 w-32 rounded animate-pulse ${
                          isDarkMode ? 'bg-neutral-800' : 'bg-gray-300'
                        }`}></div>
                      </div>
                    </div>
                  ))
                ) : (
                  contactInfo.map((contact, index) => {
                    const IconComponent = contact.icon;
                    return (
                      <motion.a
                        key={index}
                        href={contact.href}
                        target={contact.label === "Location" ? "_blank" : undefined}
                        rel={contact.label === "Location" ? "noopener noreferrer" : undefined}
                        className={`flex items-center space-x-3 transition-colors duration-300 group ${
                          isDarkMode 
                            ? 'text-neutral-300 hover:text-primary-400' 
                            : 'text-gray-600 hover:text-primary-600'
                        }`}
                        whileHover={{ x: 5 }}
                      >
                        <div className={`p-2 rounded-lg group-hover:bg-gradient-to-r group-hover:from-primary-500/20 group-hover:to-accent-500/20 transition-all duration-300 ${
                          isDarkMode ? 'bg-neutral-800' : 'bg-gray-200'
                        }`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div>
                          <p className={`text-sm ${
                            isDarkMode ? 'text-neutral-400' : 'text-gray-500'
                          }`}>{contact.label}</p>
                          <p className="font-medium">{contact.value}</p>
                        </div>
                      </motion.a>
                    );
                  })
                )}
              </div>

              {/* Availability Status */}
              <div className={`mt-8 p-4 rounded-xl ${
                isDarkMode 
                  ? 'bg-green-900/20 border border-green-500/30' 
                  : 'bg-green-100 border border-green-300'
              }`}>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className={`font-semibold text-sm ${
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
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            
            {/* Copyright */}
            <div className={`flex items-center space-x-2 mb-4 md:mb-0 ${
              isDarkMode ? 'text-neutral-400' : 'text-gray-600'
            }`}>
              <span>&copy; {new Date().getFullYear()}</span>
              <span>Made with</span>
              <FiHeart className="text-red-500 animate-pulse" />
              <span>by</span>
              <span className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {loading ? 'Loading...' : (personalInfo?.name || 'Muhammad Ishaque')}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;