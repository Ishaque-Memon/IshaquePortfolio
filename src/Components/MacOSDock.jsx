import React, { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  FiHome, 
  FiUser, 
  FiCode, 
  FiBriefcase, 
  FiAward, 
  FiMessageCircle,
  FiFileText,
  FiBook,
  FiSun,
  FiMoon
} from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext.jsx";

const MacOSDock = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false); // Start hidden, show after loader
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMainLoaderComplete, setIsMainLoaderComplete] = useState(false);
  const mouseY = useMotionValue(Infinity);

  // Device detection
  useEffect(() => {
    const checkDevice = () => {
      const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 768;
      setIsMobile(isTouchDevice || isSmallScreen);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Listen for main loader completion
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMainLoaderComplete(true);
      setIsVisible(true);
    }, 2000); // Show dock after 2 seconds (adjust based on your main loader timing)

    return () => clearTimeout(timer);
  }, []);

  // Auto-hide functionality
  useEffect(() => {
    let hideTimer;

    if (!isHovered && isMainLoaderComplete) {
      hideTimer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Hide after 3 seconds of no interaction
    } else if (isHovered) {
      setIsVisible(true);
    }

    return () => {
      if (hideTimer) clearTimeout(hideTimer);
    };
  }, [isHovered, isMainLoaderComplete]);

  // Scroll-based hiding
  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimer;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide dock when scrolling
      if (Math.abs(currentScrollY - lastScrollY) > 10) {
        setIsVisible(false);
        setIsHovered(false);
      }

      // Clear existing timer
      if (scrollTimer) clearTimeout(scrollTimer);

      // Show dock again after scroll stops (if loader is complete)
      scrollTimer = setTimeout(() => {
        if (isMainLoaderComplete) {
          setIsVisible(true);
        }
      }, 1500);

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimer) clearTimeout(scrollTimer);
    };
  }, [isMainLoaderComplete]);

  // Handle indicator interaction (touch for mobile, hover for desktop)
  const handleIndicatorInteraction = () => {
    if (isMobile) {
      // On mobile, toggle visibility on touch
      setIsVisible(!isVisible);
      if (!isVisible) {
        setIsHovered(true);
        // Auto-hide after 5 seconds on mobile
        setTimeout(() => {
          setIsHovered(false);
        }, 5000);
      }
    } else {
      // On desktop, show on hover
      setIsHovered(true);
    }
  };

  const dockItems = [
    { 
      id: "home", 
      icon: FiHome, 
      label: "Home", 
      color: "from-blue-500 to-blue-600",
      sectionId: "home"
    },
    { 
      id: "about", 
      icon: FiUser, 
      label: "About", 
      color: "from-green-500 to-green-600",
      sectionId: "about"
    },
    { 
      id: "skills", 
      icon: FiCode, 
      label: "Skills", 
      color: "from-purple-500 to-purple-600",
      sectionId: "skills"
    },
    { 
      id: "projects", 
      icon: FiBriefcase, 
      label: "Projects", 
      color: "from-orange-500 to-orange-600",
      sectionId: "projects"
    },
    { 
      id: "education", 
      icon: FiBook, 
      label: "Education", 
      color: "from-red-500 to-red-600",
      sectionId: "education"
    },
    { 
      id: "certificates", 
      icon: FiAward, 
      label: "Certificates", 
      color: "from-yellow-500 to-yellow-600",
      sectionId: "certificates"
    },
    { 
      id: "fyp", 
      icon: FiFileText, 
      label: "Final Year Project", 
      color: "from-pink-500 to-pink-600",
      sectionId: "fyp"
    },
    { 
      id: "contact", 
      icon: FiMessageCircle, 
      label: "Contact", 
      color: "from-teal-500 to-teal-600",
      sectionId: "contact"
    },
    { 
      id: "theme-toggle", 
      icon: isDarkMode ? FiSun : FiMoon, 
      label: isDarkMode ? "Light Mode" : "Dark Mode", 
      color: "from-amber-500 to-yellow-600",
      isThemeToggle: true
    }
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDockItemClick = (item) => {
    if (item.isThemeToggle) {
      toggleTheme();
    } else {
      scrollToSection(item.sectionId);
    }
  };

  return (
    <>
      {/* Show indicator when dock is hidden */}
      <motion.div
        className={`fixed right-4 top-1/2 transform -translate-y-1/2 z-40 w-1 h-12 ${
          isDarkMode ? 'bg-white/40' : 'bg-black/40'
        } rounded-full cursor-pointer select-none`}
        onClick={isMobile ? handleIndicatorInteraction : undefined}
        onMouseEnter={!isMobile ? handleIndicatorInteraction : undefined}
        onMouseLeave={!isMobile ? (() => setIsHovered(false)) : undefined}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: !isVisible && isMainLoaderComplete ? 1 : 0,
          scale: !isVisible && isMainLoaderComplete ? 1 : 0
        }}
        transition={{ 
          duration: 0.3,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.2, opacity: 0.8 }}
        whileTap={isMobile ? { scale: 0.9 } : {}}
      />

      {/* Main Dock Container */}
      <motion.div
        className={`fixed right-8 top-[15rem] transform -translate-y-1/2 z-50 ${
          isDarkMode 
            ? 'bg-black/20 backdrop-blur-md border border-white/10' 
            : 'bg-white/20 backdrop-blur-md border border-black/10'
        } rounded-2xl px-3 py-4 shadow-2xl`}
        onMouseEnter={!isMobile ? (() => setIsHovered(true)) : undefined}
        onMouseLeave={!isMobile ? (() => {
          setIsHovered(false);
          mouseY.set(Infinity);
        }) : undefined}
        onMouseMove={!isMobile ? ((e) => mouseY.set(e.nativeEvent.clientY)) : undefined}
        onTouchStart={isMobile ? (() => setIsHovered(true)) : undefined}
        initial={{ opacity: 0, scale: 0.8, x: 100 }}
        animate={{ 
          opacity: isVisible && isMainLoaderComplete ? 1 : 0,
          scale: isVisible && isMainLoaderComplete ? 1 : 0.8,
          x: isVisible && isMainLoaderComplete ? 0 : 100
        }}
        transition={{ 
          duration: 0.5,
          ease: "easeOut",
          delay: isMainLoaderComplete ? 0.2 : 0
        }}
      >
        <div className="flex flex-col items-center space-y-2">
          {dockItems.map((item, index) => (
            <DockItem
              key={item.id}
              item={item}
              index={index}
              mouseY={mouseY}
              onClick={() => handleDockItemClick(item)}
              hoveredIndex={hoveredIndex}
              setHoveredIndex={setHoveredIndex}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
};

const DockItem = ({ 
  item, 
  index, 
  mouseY, 
  hoveredIndex, 
  setHoveredIndex, 
  onClick, 
  isDarkMode 
}) => {
  const ref = useRef(null);
  const distance = useTransform(mouseY, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { y: 0, height: 0 };
    return val - bounds.y - bounds.height / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [50, 80, 50]);
  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  const IconComponent = item.icon;

  return (
    <motion.div
      ref={ref}
      className="relative flex flex-row items-center"
      onMouseEnter={() => setHoveredIndex(index)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {/* Tooltip */}
      <motion.div
        className={`absolute -left-20 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap pointer-events-none ${
          isDarkMode 
            ? 'bg-gray-900 text-white border border-gray-700' 
            : 'bg-white text-gray-900 border border-gray-200'
        } shadow-lg`}
        initial={{ opacity: 0, x: 10, scale: 0.8 }}
        animate={{ 
          opacity: hoveredIndex === index ? 1 : 0,
          x: hoveredIndex === index ? 0 : 10,
          scale: hoveredIndex === index ? 1 : 0.8
        }}
        transition={{ duration: 0.2 }}
      >
        {item.label}
        {/* Arrow */}
        <div className={`absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent ${
          isDarkMode ? 'border-l-gray-900' : 'border-l-white'
        }`} />
      </motion.div>

      {/* Dock Icon */}
      <motion.button
        onClick={onClick}
        className={`relative rounded-2xl cursor-pointer overflow-hidden shadow-lg ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700' 
            : 'bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300'
        }`}
        style={{ width, height: width }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Icon background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-90`} />
        
        {/* Icon */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center text-white"
          animate={{
            scale: hoveredIndex === index ? 1.1 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <IconComponent size={width.get() * 0.4} />
        </motion.div>

        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
          transition={{ duration: 0.2 }}
        />

        {/* Click ripple effect */}
        <motion.div
          className="absolute inset-0 bg-white/30 rounded-2xl"
          initial={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 1, opacity: [0, 1, 0] }}
          transition={{ duration: 0.3 }}
        />
      </motion.button>

      {/* Active indicator dot */}
      <motion.div
        className={`ml-2 w-1 h-1 rounded-full ${
          isDarkMode ? 'bg-white/60' : 'bg-black/60'
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: hoveredIndex === index ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
};

export default MacOSDock;
