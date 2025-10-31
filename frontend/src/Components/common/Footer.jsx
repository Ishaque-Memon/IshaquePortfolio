import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import portfolioApi from "@/api/portfolioApi";
import { Button } from "@/Components/ui/button";
import { outlineIcon, SidebarIcons } from "@/assets/Icons/Icons";

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
      { label: "Home", sectionId: "home", icon: SidebarIcons.FiHome },
      { label: "About", sectionId: "about", icon: SidebarIcons.FiUser },
      { label: "Skills", sectionId: "skills", icon: SidebarIcons.FiCode },
      { label: "Projects", sectionId: "projects", icon: SidebarIcons.FiBriefcase },
      { label: "Education", sectionId: "education", icon: SidebarIcons.FiAward },
      { label: "Contact", sectionId: "contact", icon: SidebarIcons.FiMessageSquare }
    ]
  };

  // Build social links dynamically from API
  const socialLinks = personalInfo?.socialLinks ? [
    {
      icon: outlineIcon.github,
      label: "GitHub",
      href: personalInfo.socialLinks.github,
      color: "hover:text-gray-400",
      show: !!personalInfo.socialLinks.github
    },
    {
      icon: outlineIcon.linkedin,
      label: "LinkedIn",
      href: personalInfo.socialLinks.linkedin,
      color: "hover:text-blue-400",
      show: !!personalInfo.socialLinks.linkedin
    },
    {
      icon: outlineIcon.mail,
      label: "Twitter",
      href: personalInfo.socialLinks.twitter,
      color: "hover:text-blue-300",
      show: !!personalInfo.socialLinks.twitter
    },
    {
      icon: outlineIcon.envelope,
      label: "Instagram",
      href: personalInfo.socialLinks.instagram,
      color: "hover:text-pink-400",
      show: !!personalInfo.socialLinks.instagram
    },
    {
      icon: outlineIcon.globe,
      label: "Website",
      href: personalInfo.socialLinks.website,
      color: "hover:text-green-400",
      show: !!personalInfo.socialLinks.website
    }
  ].filter(social => social.show) : [];

  // Build contact info dynamically from API
  const contactInfo = [
    {
      icon: outlineIcon.Mail,
      label: "Email",
      value: personalInfo?.email || "Loading...",
      href: personalInfo?.email ? `mailto:${personalInfo.email}` : "#",
      show: true
    },
    {
      icon: outlineIcon.Phone,
      label: "Phone",
      value: personalInfo?.phone || "Loading...",
      href: personalInfo?.phone ? `tel:${personalInfo.phone}` : "#",
      show: true
    },
    {
      icon: outlineIcon.globe,
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
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {personalInfo?.name || 'Muhammad Ishaque'}{' '}
                      {/* <span className="gradient-text">
                        {personalInfo?.title || ''}
                      </span> */}
                    </h3>
                    <p className={`text-lg leading-relaxed max-w-md ${
                      isDarkMode ? 'text-neutral-300' : 'text-gray-600'
                    }`}>
                      {/* {personalInfo?.bio || 'Full-stack developer specializing in modern web technologies. Passionate about creating scalable applications and delivering exceptional user experiences.'} */}
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
                <div className="flex flex-wrap gap-3">
                  {loading ? (
                    // Loading skeleton for social links
                    Array(3).fill(0).map((_, index) => (
                      <div
                        key={index}
                        className={`w-10 h-10 rounded-lg animate-pulse ${
                          isDarkMode ? 'bg-neutral-800' : 'bg-gray-300'
                        }`}
                      ></div>
                    ))
                  ) : socialLinks.length > 0 ? (
                    socialLinks.map((social, index) => (
                        <Button
                          variant="outline"
                          size="icon"
                          asChild
                          hover={false}
                        >
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                          >
                            <span className="text-xl">{social.icon}</span>
                          </a>
                        </Button>
                    ))
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
              <ul className="space-y-2">
                {footerLinks.navigation.map((link, index) => {
                  const IconComponent = link.icon;
                  return (
                    <li key={index}>
                      <Button
                        variant="ghost"
                        onClick={() => scrollToSection(link.sectionId)}
                        className={`w-full justify-start gap-3 transition-all duration-300 ${
                          isDarkMode 
                            ? 'text-neutral-300 hover:text-primary-400 hover:bg-neutral-800' 
                            : 'text-gray-600 hover:text-primary-600 hover:bg-gray-200'
                        }`}
                      >
                        <IconComponent className="w-4 h-4" />
                        <span>{link.label}</span>
                      </Button>
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
              <div className="space-y-3">
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
                  contactInfo.map((contact, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Button
                        variant="ghost"
                        asChild
                        className={`w-full justify-start gap-3 h-auto py-3 transition-all duration-300 ${
                          isDarkMode 
                            ? 'text-neutral-300 hover:text-primary-400 hover:bg-neutral-800' 
                            : 'text-gray-600 hover:text-primary-600 hover:bg-gray-200'
                        }`}
                      >
                        <a
                          href={contact.href}
                          target={contact.label === "Location" ? "_blank" : undefined}
                          rel={contact.label === "Location" ? "noopener noreferrer" : undefined}
                        >
                          <div className={`p-2 rounded-lg flex-shrink-0 ${
                            isDarkMode ? 'bg-neutral-800' : 'bg-gray-200'
                          }`}>
                            <span className="text-lg">{contact.icon}</span>
                          </div>
                          <div className="text-left">
                            <p className={`text-xs ${
                              isDarkMode ? 'text-neutral-400' : 'text-gray-500'
                            }`}>{contact.label}</p>
                            <p className="font-medium text-sm">{contact.value}</p>
                          </div>
                        </a>
                      </Button>
                    </motion.div>
                  ))
                )}
              </div>

              {/* Availability Status */}
              <div className={`mt-6 p-4 rounded-xl ${
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
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Copyright */}
            <div className="flex justify-center w-full">
            <div className={`flex items-center flex-wrap justify-center gap-2 text-sm ${
              isDarkMode ? 'text-neutral-400' : 'text-gray-600'
            }`}>
              <span>&copy; {new Date().getFullYear()}</span>
              <span>Developed by</span>
              <span className={`font-semibold ${
                isDarkMode ? 'text-white' : 'text-gray-900'
              }`}>
                {loading ? 'Loading...' : (personalInfo?.name || 'Muhammad Ishaque')}
              </span>
            </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;