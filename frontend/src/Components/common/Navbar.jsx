import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiUser, FiSun, FiMoon, FiLogIn } from "react-icons/fi";
import { Link as RouterLink } from "react-router-dom";
import { useTheme } from "../../contexts/ThemeContext.jsx";
import { useAuthContext } from "../../contexts/AuthContext.jsx";
import { checkAdminIP } from "../../api/authApi";
import gsap from "gsap";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user } = useAuthContext();
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  // Check if admin IP is allowed
  useEffect(() => {
  checkAdminIP()
    .then(() => setShowAdminLogin(true))
    .catch(() => setShowAdminLogin(false));
    }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
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
      backgroundColor: isDarkMode ? "rgba(var(--background-rgb), 0.85)" : "rgba(var(--background-rgb), 0.85)",
      backdropFilter: "blur(20px)",
      WebkitBackdropFilter: "blur(20px)",
    }
  };

  return (
    <motion.header
      className="modern-header fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent"
      variants={headerVariants}
      initial="transparent"
      animate={isScrolled ? "scrolled" : "transparent"}
      style={{
        borderBottomColor: isScrolled
          ? (isDarkMode ? "rgba(var(--foreground-rgb), 0.1)" : "rgba(var(--foreground-rgb), 0.1)")
          : "transparent"
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-around lg:justify-between md:justify-between sm:justify-between h-14 sm:h-16 md:h-18 lg:h-20">

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
          <RouterLink
            to="/"
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
                      ? "0px 0px 20px rgba(var(--foreground-rgb),0.5)"
                      : "0px 0px 20px rgba(var(--foreground-rgb),0.3)",
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
                      ? "0px 0px 15px rgba(var(--foreground-rgb),0.4)"
                      : "0px 0px 15px rgba(var(--foreground-rgb),0.3)",
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
            </div>
          </RouterLink>

          {/* Login/Admin Button - Right side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            {user ? (
              <RouterLink to="/admin">
                <motion.button
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-primary-500 hover:bg-primary-600 text-white'
                  } shadow-lg backdrop-blur-sm flex items-center gap-2`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiUser className="w-4 h-4" />
                  <span className="hidden sm:inline">Admin</span>
                </motion.button>
              </RouterLink>
            ) : (
              <RouterLink to="/login">
                <motion.button
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    isDarkMode
                      ? 'bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700'
                      : 'bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200'
                  } shadow-lg backdrop-blur-sm flex items-center gap-2`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiLogIn className="w-4 h-4" />

                  {showAdminLogin && !localStorage.getItem("authToken") && (
                  <span className="hidden sm:inline">Login</span>
                    )}
                </motion.button>
              </RouterLink>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
