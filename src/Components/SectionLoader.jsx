import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ModernLoader from "./ModernLoader.jsx";
import { useTheme } from "../contexts/ThemeContext.jsx";

const SectionLoader = ({ 
  children, 
  loadingTime = 1500, 
  loaderVariant = "dots",
  loadingText = "Loading...",
  sectionName = "content"
}) => {
  const { isDarkMode } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [loadingTime]);

  const overlayVariants = {
    initial: { opacity: 1 },
    exit: { 
      opacity: 0,
      transition: { 
        duration: 0.8,
        ease: "easeInOut"
      }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: "easeOut",
        delay: 0.2
      }
    }
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className={`absolute inset-0 z-50 flex items-center justify-center ${
              isDarkMode 
                ? 'bg-gradient-to-br from-neutral-900/95 via-neutral-900/90 to-black/95' 
                : 'bg-gradient-to-br from-white/95 via-gray-50/90 to-gray-100/95'
            } backdrop-blur-sm`}
            variants={overlayVariants}
            initial="initial"
            exit="exit"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div 
                className={`w-full h-full ${
                  isDarkMode 
                    ? 'bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)]' 
                    : 'bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.1)_1px,transparent_0)]'
                }`}
                style={{ backgroundSize: '30px 30px' }}
              />
            </div>

            {/* Floating Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-32 h-32 rounded-full ${
                    isDarkMode
                      ? 'bg-gradient-to-br from-primary-500/10 to-accent-500/10'
                      : 'bg-gradient-to-br from-primary-400/10 to-blue-400/10'
                  } blur-xl`}
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${10 + i * 25}%`,
                  }}
                  animate={{
                    x: [0, 30, 0],
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 4 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                  }}
                />
              ))}
            </div>

            {/* Loader Content */}
            <div className="relative z-10 text-center">
              <ModernLoader 
                variant={loaderVariant}
                size="large"
                text={loadingText}
              />
              
              {/* Section identifier */}
              <motion.div
                className={`mt-6 px-4 py-2 rounded-full border ${
                  isDarkMode
                    ? 'border-primary-400/30 bg-primary-500/10 text-primary-400'
                    : 'border-primary-500/30 bg-primary-400/10 text-primary-600'
                }`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <span className="text-sm font-medium">
                  Loading {sectionName}
                </span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        variants={contentVariants}
        initial="initial"
        animate={!isLoading ? "animate" : "initial"}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default SectionLoader;
