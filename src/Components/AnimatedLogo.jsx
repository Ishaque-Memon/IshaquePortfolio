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
      const timeline = gsap.timeline();  // repeat: -1 makes the animation loop infinitely
  
// Initial Animation for "M"
timeline
  .to(mRef.current, {
    y: -20,
    scale: 1.2,
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
      y: 20,
      scale: 1.2,
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
          scale: 20,
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
        className={`flex flex-col items-center justify-center h-screen transition-colors duration-300 ${
          isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
        }`}
      >
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Loader */}
        <div className="relative flex space-x-4 text-8xl font-extrabold">
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
          className={`relative text-2xl mt-12 tracking-wide text-center font-bold ${
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
  
  