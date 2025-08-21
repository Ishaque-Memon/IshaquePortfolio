import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTheme } from "../contexts/ThemeContext.jsx";

const ScrollButton = () => {
  const { isDarkMode } = useTheme();
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  const buttonRef = useRef(null);
  const orbitRef = useRef(null);
  const pulseTween = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      const atTop = scrollY <= 10;
      const atBottom = scrollY + windowHeight >= documentHeight - 10;

      setIsAtBottom(atBottom);
      setShouldShow(!atTop);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const el = buttonRef.current;

    if (shouldShow) {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        pointerEvents: "auto",
        duration: 0.5,
        ease: "power3.out",
      });

      pulseTween.current = gsap.to(el, {
        boxShadow: isDarkMode 
          ? "0 8px 32px rgba(0, 0, 0, 0.4), 0 0 30px rgba(99, 102, 241, 0.3)" 
          : "0 8px 32px rgba(0, 0, 0, 0.15), 0 0 30px rgba(59, 130, 246, 0.3)",
        repeat: -1,
        yoyo: true,
        duration: 2,
        ease: "sine.inOut",
      });
    } else {
      gsap.to(el, {
        opacity: 0,
        y: 30,
        pointerEvents: "none",
        duration: 0.4,
        ease: "power2.inOut",
      });

      if (pulseTween.current) pulseTween.current.kill();
    }
  }, [shouldShow]);

  const handleMouseEnter = () => {
    // Only apply hover effects on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      gsap.to(buttonRef.current, {
        scale: 1.05,
        y: -2,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    // Only apply hover effects on non-touch devices
    if (window.matchMedia('(hover: hover)').matches) {
      gsap.to(buttonRef.current, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.inOut",
      });
    }
  };

  const handleTouchStart = () => {
    // Touch feedback for mobile devices
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
    });
  };

  const handleTouchEnd = () => {
    // Reset after touch
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  const scrollAction = () => {
    if (isAtBottom) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const orbitAnimation = gsap.to(orbitRef.current, {
      rotate: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
      transformOrigin: "center center",
    });

    return () => {
      orbitAnimation.kill();
    };
  }, []);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={scrollAction}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 w-12 h-12 sm:w-[3.5rem] sm:h-[3.5rem] md:w-16 md:h-16 rounded-xl sm:rounded-2xl flex justify-center items-center cursor-pointer z-50 transition-all duration-300 backdrop-blur-md border group touch-manipulation ${
          isDarkMode 
            ? 'bg-gradient-to-br from-neutral-800/90 via-neutral-900/90 to-black/90 border-neutral-700/50 hover:border-primary-400/50 shadow-lg shadow-black/25' 
            : 'bg-gradient-to-br from-white/90 via-gray-50/90 to-gray-100/90 border-gray-200/50 hover:border-primary-500/50 shadow-lg shadow-gray-900/10'
        }`}
        style={{
          opacity: 0,
          transform: "translateY(30px)",
          boxShadow: isDarkMode
            ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 0 20px rgba(99, 102, 241, 0.1)"
            : "0 8px 32px rgba(0, 0, 0, 0.1), 0 0 20px rgba(59, 130, 246, 0.1)",
        }}
      >
        {/* Animated background glow */}
        <div 
          className={`absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
            isDarkMode
              ? 'bg-gradient-to-br from-primary-500/20 to-accent-500/20'
              : 'bg-gradient-to-br from-primary-400/20 to-blue-500/20'
          }`}
        />
        
        {/* Rotating orbital ring */}
        <div
          ref={orbitRef}
          className={`absolute w-[3.75rem] h-[3.75rem] sm:w-[4.5rem] sm:h-[4.5rem] md:w-20 md:h-20 rounded-full border-2 border-dashed pointer-events-none ${
            isDarkMode
              ? 'border-primary-400/30'
              : 'border-primary-500/30'
          }`}
        />
        
        {/* Inner content with icon */}
        <div className={`relative z-10 p-2 sm:p-2.5 md:p-3 rounded-lg sm:rounded-xl transition-all duration-300 group-hover:scale-110 ${
          isDarkMode
            ? 'bg-gradient-to-br from-primary-500/20 to-purple-500/20'
            : 'bg-gradient-to-br from-primary-400/20 to-blue-500/20'
        }`}>
          {isAtBottom ? (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 transition-colors duration-300 ${
                isDarkMode ? 'text-primary-400' : 'text-primary-600'
              }`}
            >
              <path
                d="M4 15L12 7L20 15"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          ) : (
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`sm:w-[18px] sm:h-[18px] md:w-5 md:h-5 transition-colors duration-300 ${
                isDarkMode ? 'text-primary-400' : 'text-primary-600'
              }`}
            >
              <path
                d="M4 9L12 17L20 9"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </div>
        
        {/* Corner accent dots */}
        <div className={`absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${
          isDarkMode ? 'bg-primary-400/60' : 'bg-primary-500/60'
        }`} />
        <div className={`absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${
          isDarkMode ? 'bg-accent-400/60' : 'bg-blue-500/60'
        }`} />
      </div>
    </>
  );
};

export default ScrollButton;
