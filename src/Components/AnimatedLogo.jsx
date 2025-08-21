import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../contexts/ThemeContext.jsx";

const AnimatedLogo = ({ onFinish }) => {
    const { isDarkMode } = useTheme();
    const mRef = useRef(null);
    const iRef = useRef(null);
    const textRef = useRef(null);
    const containerRef = useRef(null);
  
    useEffect(() => {
      // Calculate responsive scale based on screen size
      const getResponsiveScale = () => {
        const width = window.innerWidth;
        if (width < 640) return 0.6; // sm breakpoint
        if (width < 768) return 0.7; // md breakpoint
        if (width < 1024) return 0.8; // lg breakpoint
        if (width < 1280) return 0.9; // xl breakpoint
        return 1; // default for larger screens
      };

      const responsiveScale = getResponsiveScale();
      const timeline = gsap.timeline();  // repeat: -1 makes the animation loop infinitely
  
// Initial Animation for "M"
timeline
  .to(mRef.current, {
    y: -20 * responsiveScale,
    scale: 1.2 * responsiveScale,
    rotation: 360,
    duration: 1,
    ease: "power1.inOut",
  })
  .to(mRef.current, { y: 0, scale: 1, duration: 1, ease: "bounce.out" });

// Initial Animation for "I"
timeline
  .to(
    iRef.current,
    {
      y: 20 * responsiveScale,
      scale: 1.2 * responsiveScale,
      rotation: -360,
      duration: 1,
      ease: "power1.inOut",
    },
    "<" // "<" makes this animation start at the same time as the previous one
  )
  .to(iRef.current, { y: 0, scale: 1, duration: 1, ease: "bounce.out" });
      // Typing Effect for Quote
    //   const quoteText = "Talk is Cheap, Show me Code";
      const quoteText = "Be patient, good things take time...";
      const chars = quoteText.split("");
      let text = "";
  
      chars.forEach((char, index) => {
        timeline.to({}, { duration: 0.05 });
        timeline.add(() => {
          text += char;
          textRef.current.textContent = text;
        });
      });
  
      // Light Pulse Effect on Quote
      timeline.to(
        textRef.current,
        {
          textShadow: isDarkMode 
            ? "0px 0px 20px rgba(255, 255, 255, 0.8)"
            : "0px 0px 20px rgba(0, 0, 0, 0.5)",
          duration: 0.8,
          yoyo: true,
          repeat: 3,
          ease: "power2.inOut",
        },
        "+=0.2" // Add slight delay after typing finishes
      );
  
      // Scale "I" and Trigger Splash Effect
      timeline
        .to(iRef.current, {
          scale: 20 * responsiveScale,
          opacity: 0,
          duration: 1.5,
          ease: "power3.inOut",
          onComplete: () => {
            if (onFinish) onFinish(); // Trigger callback when animation ends
          },
        });
  
      // Fade Out Entire Loader
      timeline.to(
        containerRef.current,
        { opacity: 0, duration: 1, ease: "power2.out" },
        "-=1"
      );
  
      return () => {
        timeline.kill();
      };
    }, [onFinish, isDarkMode]);
  
    return (
      <div
        ref={containerRef}
        className={`flex flex-col items-center justify-center h-screen px-4 sm:px-6 lg:px-8 transition-colors duration-300 ${
          isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
        }`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Loader */}
        <div className="relative flex space-x-2 sm:space-x-3 md:space-x-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold">
          {/* "M" Letter */}
          <div
            ref={mRef}
            className="relative gradient-text"
            style={{
              textShadow: isDarkMode 
                ? "0px 0px 20px rgba(255, 255, 255, 0.5)"
                : "0px 0px 20px rgba(0, 0, 0, 0.3)",
            }}
          >
            M
          </div>
  
          {/* "I" Letter */}
          <div
            ref={iRef}
            className={`relative ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}
            style={{
              textShadow: isDarkMode 
                ? "0px 0px 15px rgba(255, 255, 255, 0.4)"
                : "0px 0px 15px rgba(0, 0, 0, 0.3)",
            }}
          >
            I
          </div>
        </div>
  
        {/* Quote with Typing Effect */}
        <div
          ref={textRef}
          className={`relative text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-8 sm:mt-10 md:mt-12 tracking-wide text-center font-bold px-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}
          style={{
            textShadow: isDarkMode 
              ? "0 2px 10px rgba(0, 0, 0, 0.3)"
              : "0 2px 10px rgba(255, 255, 255, 0.5)",
            fontFamily: "Inter, sans-serif",
          }}
        ></div>
      </div>
    );
  };
  
  export default AnimatedLogo;
  
  