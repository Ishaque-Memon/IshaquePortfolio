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
    // Smooth header animation on mount
    gsap.fromTo(
      ".modern-header",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out", delay: 0.1 }
    );
  }, []);

  const headerVariants = {
    transparent: {
      backgroundColor: "rgba(0, 0, 0, 0)",
      backdropFilter: "blur(0px)",
    },
    scrolled: {
      backgroundColor: isDarkMode ? "rgba(15, 23, 42, 0.8)" : "rgba(248, 250, 252, 0.8)",
      backdropFilter: "blur(20px)",
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
        className="modern-header fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        variants={headerVariants}
        initial="transparent"
        animate={isScrolled ? "scrolled" : "transparent"}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            
            {/* Logo */}
            <Link
              to="home"
              smooth={true}
              duration={1000}
              className="cursor-pointer z-10"
            >
              <div className="flex items-center space-x-5">
                {/* Animated MI Logo - Proper AnimatedLogo Style */}
                <div className="flex items-center space-x-3 text-6xl font-black">
                  <motion.span
                    className="gradient-text block"
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "900",
                      lineHeight: "1",
                      textShadow: isDarkMode
                        ? "0px 0px 20px rgba(255,255,255,0.5)"
                        : "0px 0px 20px rgba(0,0,0,0.3)",
                    }}
                    animate={{
                      y: [-20, 0, -20],
                      scale: [1, 1.2, 1],
                      rotate: [0, 360, 720]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "power1.inOut"
                    }}
                  >
                    M
                  </motion.span>
                  <motion.span
                    className={`block ${isDarkMode ? "text-white" : "text-neutral-900"}`}
                    style={{
                      fontSize: "2.5rem",
                      fontWeight: "900",
                      lineHeight: "1",
                      textShadow: isDarkMode
                        ? "0px 0px 15px rgba(255,255,255,0.4)"
                        : "0px 0px 15px rgba(0,0,0,0.3)",
                    }}
                    animate={{
                      y: [20, 0, 20],
                      scale: [1, 1.2, 1],
                      rotate: [0, -360, -720]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "power1.inOut"
                    }}
                  >
                    I
                  </motion.span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                    Muhammad Ishaque
                  </h1>
                  <p className={`text-base ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                    Full Stack Developer
                  </p>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
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

            {/* Right Side Controls */}
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <motion.button
                onClick={toggleTheme}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-neutral-800 text-yellow-400 hover:bg-neutral-700' 
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: 1,
                  transition: { delay: 0.4, duration: 0.3 }
                }}
              >
                <AnimatePresence mode="wait">
                  {isDarkMode ? (
                    <motion.div
                      key="sun"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiSun className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMoon className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-300 ${
                  isDarkMode 
                    ? 'bg-neutral-800 text-white hover:bg-neutral-700' 
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiX className="w-6 h-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <FiMenu className="w-6 h-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Menu Panel */}
            <motion.div
              className={`absolute top-0 right-0 w-80 h-full ${
                isDarkMode ? 'bg-neutral-900' : 'bg-white'
              } shadow-2xl`}
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="p-6 pt-24">
                <nav className="space-y-4">
                  {navItems.map((item, index) => (
                    <Link
                      key={item.name}
                      to={item.to}
                      smooth={true}
                      duration={800}
                      offset={-80}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="cursor-pointer block"
                    >
                      <motion.div
                        className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 ${
                          activeSection === item.to
                            ? `${isDarkMode ? 'bg-neutral-800 text-white' : 'bg-neutral-100 text-neutral-900'} shadow-lg`
                            : `${isDarkMode ? 'text-neutral-300 hover:text-white hover:bg-neutral-800' : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'}`
                        }`}
                        whileHover={{ x: 10 }}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ 
                          opacity: 1, 
                          x: 0,
                          transition: { delay: 0.1 * index, duration: 0.3 }
                        }}
                      >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium text-lg">{item.name}</span>
                      </motion.div>
                    </Link>
                  ))}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ModernHeader;
