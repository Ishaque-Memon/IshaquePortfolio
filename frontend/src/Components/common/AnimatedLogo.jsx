import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTheme } from "../../contexts/ThemeContext.jsx";

const AnimatedLogo = ({ onFinish }) => {
    const { isDarkMode } = useTheme();
    const mRef = useRef(null);
    const iRef = useRef(null);
    const textRef = useRef(null);
    const containerRef = useRef(null);
    const bg1Ref = useRef(null);
    const bg2Ref = useRef(null);
  
    useLayoutEffect(() => {
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
      const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

      // Scope GSAP to this component and set sane defaults
      const ctx = gsap.context(() => {
        const timeline = gsap.timeline({
          defaults: { ease: "power2.out" }
        });

        // performance hints
        gsap.set([mRef.current, iRef.current, textRef.current], { willChange: "transform, opacity", force3D: true });
        gsap.set([bg1Ref.current, bg2Ref.current], { opacity: 0, willChange: "opacity" });
  
// Initial Animation for "M"
timeline
  .to(mRef.current, {
    y: -20 * responsiveScale,
    scale: (reduceMotion ? 1.05 : 1.2) * responsiveScale,
    rotation: reduceMotion ? 0 : 360,
    duration: reduceMotion ? 0.6 : 0.9,
    ease: "power1.inOut",
    transformOrigin: "50% 50%",
    force3D: true,
  })
  .to(mRef.current, { y: 0, scale: 1, duration: 0.6, ease: "bounce.out", force3D: true });

// Initial Animation for "I"
timeline
  .to(
    iRef.current,
    {
      y: 20 * responsiveScale,
      scale: (reduceMotion ? 1.05 : 1.2) * responsiveScale,
      rotation: reduceMotion ? 0 : -360,
      duration: reduceMotion ? 0.6 : 0.9,
      ease: "power1.inOut",
      transformOrigin: "50% 50%",
      force3D: true,
    },
    "<" // "<" makes this animation start at the same time as the previous one
  )
  .to(iRef.current, { y: 0, scale: 1, duration: 0.6, ease: "bounce.out", force3D: true });

      // Typing Effect for Quote (optimized: pre-create spans and stagger opacity/transform)
      const quoteText = "Be patient, good things take time...";
      const target = textRef.current;
      // clear and create spans once
      target.innerHTML = "";
      const frag = document.createDocumentFragment();
      const spans = [];
      for (const ch of quoteText) {
        const span = document.createElement("span");
        span.textContent = ch === " " ? "\u00A0" : ch; // preserve spaces
        span.style.display = "inline-block";
        spans.push(span);
        frag.appendChild(span);
      }
      target.appendChild(frag);
      gsap.set(spans, { opacity: 0, yPercent: 30 });
      timeline.to(spans, {
        opacity: 1,
        yPercent: 0,
        duration: reduceMotion ? 0.02 : 0.04,
        stagger: reduceMotion ? 0.01 : 0.02,
        ease: "power1.out",
        force3D: true,
      }, "+=0.05");

      // Subtle pulse using GPU transforms (avoid animating textShadow)
      timeline.to(
        textRef.current,
        {
          scale: 1.02,
          duration: 0.4,
          yoyo: true,
          repeat: 1,
          transformOrigin: "50% 50%",
          force3D: true,
        },
        "+=0.1"
      );

      // Fade in blurred background after main text (blur is paint-heavy)
      timeline.to([bg1Ref.current, bg2Ref.current], { opacity: 1, duration: 0.6 }, "<");

      // Scale "I" and Trigger Splash Effect (lower max scale to reduce paint cost)
      timeline
        .to(iRef.current, {
          scale: (reduceMotion ? 8 : 12) * responsiveScale,
          opacity: 0,
          duration: reduceMotion ? 0.8 : 1.2,
          ease: "power3.inOut",
          force3D: true,
          onComplete: () => {
            if (onFinish) onFinish(); // Trigger callback when animation ends
          },
        });

      // Fade Out Entire Loader
      timeline.to(
        containerRef.current,
        { opacity: 0, duration: reduceMotion ? 0.6 : 0.8, ease: "power2.out" },
        "-=0.8"
      );
      }, containerRef);

      return () => {
        ctx.revert();
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
        <div className="absolute inset-0 pointer-events-none">
          <div
            ref={bg1Ref}
            className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl will-change-auto"
          ></div>
          <div
            ref={bg2Ref}
            className="absolute bottom-1/4 right-1/4 w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-xl sm:blur-2xl md:blur-3xl will-change-auto"
          ></div>
        </div>

        {/* Loader */}
        <div className="relative flex space-x-2 sm:space-x-3 md:space-x-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold">
          {/* "M" Letter */}
          <div
            ref={mRef}
            className="relative gradient-text transform-gpu"
            style={{
              textShadow: isDarkMode 
                ? "0px 0px 20px rgba(var(--foreground-rgb), 0.5)"
                : "0px 0px 20px rgba(var(--foreground-rgb), 0.3)",
              willChange: "transform, opacity",
            }}
          >
            M
          </div>
  
          {/* "I" Letter */}
          <div
            ref={iRef}
            className={`relative ${isDarkMode ? 'text-white' : 'text-neutral-900'} transform-gpu`}
            style={{
              textShadow: isDarkMode 
                ? "0px 0px 15px rgba(var(--foreground-rgb), 0.4)"
                : "0px 0px 15px rgba(var(--foreground-rgb), 0.3)",
              willChange: "transform, opacity",
            }}
          >
            I
          </div>
        </div>
  
        {/* Quote with Typing Effect */}
        <div
          ref={textRef}
          className={`relative text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl mt-8 sm:mt-10 md:mt-12 tracking-wide text-center font-bold px-4 max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl transform-gpu ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}
          style={{
            textShadow: isDarkMode 
              ? "0 2px 10px rgba(var(--foreground-rgb), 0.3)"
              : "0 2px 10px rgba(var(--foreground-rgb), 0.5)",
            fontFamily: "Inter, sans-serif",
            willChange: "transform, opacity",
          }}
        ></div>
      </div>
    );
  };
  
  export default AnimatedLogo;
