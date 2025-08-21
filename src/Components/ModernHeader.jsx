import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiHome, FiUser, FiCode, FiBriefcase, FiMail, FiSun, FiMoon } from "react-icons/fi";
import { Link } from "react-scroll";
import { useTheme } from "../contexts/ThemeContext.jsx";
import AnimatedLogo from "./AnimatedLogo.jsx";
import gsap from "gsap";

const ModernHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { isDarkMode, toggleTheme } = useTheme();

  const navItems = [
    { name: "Home", to: "home", icon: FiHome },
    { name: "About", to: "about", icon: FiUser },
    { name: "Skills", to: "skills", icon: FiCode },
    { name: "Projects", to: "projects", icon: FiBriefcase },
    { name: "Contact", to: "contact", icon: FiMail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Responsive smooth header animation on mount
    gsap.fromTo(
      ".modern-header",
      { 
        y: -50, 
        opacity: 0,
        scale: 0.95
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        ease: "power3.out", 
        delay: 0.1 
      }
    );

    // Animate logo letters individually
    gsap.fromTo(
      ".modern-header .gradient-text, .modern-header .logo-letter",
      {
        y: 20,
        opacity: 0,
        scale: 0.8
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.6,
        ease: "back.out(1.7)",
        delay: 0.3,
        stagger: 0.1
      }
    );
  }, []);

  const headerVariants = {
    transparent: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(0px)",
      WebkitBackdropFilter: "blur(0px)",
    },
    scrolled: {
      backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.85)" : "rgba(248, 250, 252, 0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    }
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    },
    open: {
      opacity: 1,
      x: "0%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 40
      }
    }
  };

  return (
    <>
      <motion.header
        className="modern-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent"
        variants={headerVariants}
        initial="transparent"
        animate={isScrolled ? "scrolled" : "transparent"}
        style={{
          borderBottomColor: isScrolled 
            ? (isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)")
            : "transparent"
        }}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 md:h-18 lg:h-20">

            {/* Theme Toggle - Left side */}
            <motion.button
              onClick={toggleTheme}
              className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${
                isDarkMode 
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-yellow-400 hover:text-yellow-300' 
                  : 'bg-neutral-100 hover:bg-neutral-200 text-orange-500 hover:text-orange-600'
              } shadow-lg backdrop-blur-sm`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {isDarkMode ? <FiSun className="w-4 h-4 sm:w-5 sm:h-5" /> : <FiMoon className="w-4 h-4 sm:w-5 sm:h-5" />}
            </motion.button>

            {/* Logo - Center */}
            <Link
              to="home"
              smooth={true}
              duration={1000}
              className="cursor-pointer z-10 group"
            >
              <div className="flex flex-col items-center space-x-5">
                {/* Responsive MI Logo */}
                <motion.div 
                  className="flex items-center space-x-2 sm:space-x-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  <span
                    className="gradient-text logo-letter block select-none"
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                      fontWeight: "900",
                      lineHeight: "1",
                      textShadow: isDarkMode
                        ? "0px 0px 20px rgba(255,255,255,0.5)"
                        : "0px 0px 20px rgba(0,0,0,0.3)",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                    }}
                  >
                    M
                  </span>
                  <span
                    className={`logo-letter block select-none transition-colors duration-300 ${
                      isDarkMode ? "text-white group-hover:text-blue-300" : "text-neutral-900 group-hover:text-blue-600"
                    }`}
                    style={{
                      fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                      fontWeight: "900",
                      lineHeight: "1",
                      textShadow: isDarkMode
                        ? "0px 0px 15px rgba(255,255,255,0.4)"
                        : "0px 0px 15px rgba(0,0,0,0.3)",
                      filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))"
                    }}
                  >
                    I
                  </span>
                </motion.div>
                
                {/* Responsive subtitle - hidden on very small screens */}
                <motion.div 
                  className="hidden sm:block text-center mt-1"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.4 }}
                >
                  <p className={`text-xs sm:text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isDarkMode ? 'text-neutral-400 group-hover:text-neutral-300' : 'text-neutral-600 group-hover:text-neutral-700'
                  }`}>
                    Full Stack Developer
                  </p>
                </motion.div>
                {/* Commented out old subtitle */}
                {/* <div className="hidden sm:block">
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    Muhammad Ishaque
                  </h1>
                  <p className={`text-base ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Full Stack Developer
                  </p>
                </div> */}
              </div>
            </Link>

            {/* Right side placeholder for balance */}
            <div className="w-10 sm:w-12 h-10 sm:h-12 flex items-center justify-center">
              <motion.div
                className={`w-2 h-2 rounded-full ${
                  isDarkMode ? 'bg-blue-400' : 'bg-blue-600'
                } opacity-60`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>

            {/* Desktop Navigation - Hidden since we're using dock */}
            {/* 
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  to={item.to}
                  smooth={true}
                  duration={1000}
                  offset={-80}
                  spy={true}
                  onSetActive={() => setActiveSection(item.to)}
                  className="cursor-pointer"
                >
                  <motion.div
                    className={`relative px-4 py-2 rounded-lg flex items-center space-x-2 transition-all duration-300 ${
                      activeSection === item.to
                        ? `${isDarkMode ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-900'} shadow-lg`
                        : `${isDarkMode ? 'text-neutral-300 hover:text-white hover:bg-neutral-800' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'}`
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.05 * index, duration: 0.4 }
                    }}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="font-medium">{item.name}</span>
                    
                    {activeSection === item.to && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                        layoutId="activeTab"
                        initial={false}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </nav>
            */}

            {/* Mobile Menu Button hidden per request */}
            {/* <motion.button .../> */}
          </div>
        </div>
      </motion.header>

  {/* Mobile Menu Overlay hidden per request */}
    </>
  );
};

export default ModernHeader;
