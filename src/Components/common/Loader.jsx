import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const Loader = ({ 
  size = "default", 
  text = "Loading...", 
  variant = "dots",
  className = "" 
}) => {
  const { isDarkMode } = useTheme();

  const sizeConfig = {
    small: { 
      container: "w-6 h-6 sm:w-8 sm:h-8", 
      dot: "w-1.5 h-1.5 sm:w-2 sm:h-2", 
      text: "text-xs sm:text-sm" 
    },
    default: { 
      container: "w-10 h-10 sm:w-12 sm:h-12", 
      dot: "w-2.5 h-2.5 sm:w-3 sm:h-3", 
      text: "text-sm sm:text-base" 
    },
    large: { 
      container: "w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16", 
      dot: "w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4", 
      text: "text-base sm:text-lg md:text-xl" 
    }
  };

  const config = sizeConfig[size];

  // Dots Loader
  if (variant === "dots") {
    return (
      <div className={`flex flex-col items-center justify-center space-y-3 sm:space-y-4 ${className}`}>
        <div className="flex space-x-1.5 sm:space-x-2">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              className={`${config.dot} rounded-full ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-primary-400 to-accent-400' 
                  : 'bg-gradient-to-r from-primary-500 to-blue-500'
              }`}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        {text && (
          <motion.p
            className={`${config.text} font-medium ${
              isDarkMode ? 'text-neutral-300' : 'text-gray-600'
            }`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Spinner Loader
  if (variant === "spinner") {
    return (
      <div className={`flex flex-col items-center justify-center space-y-3 sm:space-y-4 ${className}`}>
        <div className={`${config.container} relative`}>
          <motion.div
            className={`absolute inset-0 rounded-full border-2 sm:border-3 md:border-4 border-transparent ${
              isDarkMode
                ? 'border-t-primary-400 border-r-accent-400'
                : 'border-t-primary-500 border-r-blue-500'
            }`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className={`absolute inset-1 sm:inset-1.5 md:inset-2 rounded-full border border-transparent sm:border-2 ${
              isDarkMode
                ? 'border-b-accent-400 border-l-primary-400'
                : 'border-b-blue-500 border-l-primary-500'
            }`}
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        {text && (
          <motion.p
            className={`${config.text} font-medium ${
              isDarkMode ? 'text-neutral-300' : 'text-gray-600'
            }`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Pulse Loader
  if (variant === "pulse") {
    return (
      <div className={`flex flex-col items-center justify-center space-y-3 sm:space-y-4 ${className}`}>
        <div className={`${config.container} relative flex items-center justify-center`}>
          <motion.div
            className={`absolute inset-0 rounded-full ${
              isDarkMode
                ? 'bg-gradient-to-r from-primary-500/30 to-accent-500/30'
                : 'bg-gradient-to-r from-primary-400/30 to-blue-400/30'
            }`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0.3, 0.7],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div
            className={`w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 rounded-full ${
              isDarkMode
                ? 'bg-gradient-to-r from-primary-400 to-accent-400'
                : 'bg-gradient-to-r from-primary-500 to-blue-500'
            }`}
            animate={{
              scale: [1, 0.8, 1],
            }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        {text && (
          <motion.p
            className={`${config.text} font-medium ${
              isDarkMode ? 'text-neutral-300' : 'text-gray-600'
            }`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Wave Loader
  if (variant === "wave") {
    return (
      <div className={`flex flex-col items-center justify-center space-y-3 sm:space-y-4 ${className}`}>
        <div className="flex space-x-0.5 sm:space-x-1">
          {[0, 1, 2, 3, 4].map((index) => (
            <motion.div
              key={index}
              className={`w-0.5 sm:w-1 bg-gradient-to-t ${
                isDarkMode
                  ? 'from-primary-400 to-accent-400'
                  : 'from-primary-500 to-blue-500'
              }`}
              animate={{
                height: ["15px", "30px", "15px"],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.1,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
        {text && (
          <motion.p
            className={`${config.text} font-medium ${
              isDarkMode ? 'text-neutral-300' : 'text-gray-600'
            }`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Orbit Loader
  if (variant === "orbit") {
    return (
      <div className={`flex flex-col items-center justify-center space-y-3 sm:space-y-4 ${className}`}>
        <div className={`${config.container} relative`}>
          <motion.div
            className="absolute inset-0"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          >
            <div
              className={`absolute top-0 left-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transform -translate-x-1/2 ${
                isDarkMode
                  ? 'bg-primary-400'
                  : 'bg-primary-500'
              }`}
            />
          </motion.div>
          <motion.div
            className="absolute inset-1.5 sm:inset-2"
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <div
              className={`absolute top-0 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transform -translate-x-1/2 ${
                isDarkMode
                  ? 'bg-accent-400'
                  : 'bg-blue-500'
              }`}
            />
          </motion.div>
          <div
            className={`absolute top-1/2 left-1/2 w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transform -translate-x-1/2 -translate-y-1/2 ${
              isDarkMode
                ? 'bg-gradient-to-r from-primary-400 to-accent-400'
                : 'bg-gradient-to-r from-primary-500 to-blue-500'
            }`}
          />
        </div>
        {text && (
          <motion.p
            className={`${config.text} font-medium ${
              isDarkMode ? 'text-neutral-300' : 'text-gray-600'
            }`}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  // Default fallback
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className={`${config.container} animate-spin rounded-full border-4 border-gray-300 ${
        isDarkMode ? 'border-t-primary-400' : 'border-t-primary-500'
      }`} />
    </div>
  );
};

export default Loader;
