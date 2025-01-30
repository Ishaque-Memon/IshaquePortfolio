import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";


const AnimatedLogo = ({ onFinish }) => {
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
  .to(mRef.current, { y: 0, scale: 1, duration: 0.5, ease: "bounce.out" });

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
  .to(iRef.current, { y: 0, scale: 1, duration: 0.5, ease: "bounce.out" });
      // Typing Effect for Quote
    //   const quoteText = "Talk is Cheap, Show me Code";
      const quoteText = "Patience is not simply the ability to wait - it's how we behave while we're waiting";
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
          textShadow: "0px 0px 20px rgba(255, 255, 255, 1)",
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
    }, [onFinish]);
  
    return (
      <div
        ref={containerRef}
        className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-[#152331] to-[#000000]"
        // style={{
        //     background: "linear-gradient(to right, rgb(20, 30, 48), rgb(36, 59, 85))"
        // }}
      >
        {/* Loader */}
        <div className="flex space-x-4 text-6xl font-extrabold text-white">
          {/* "M" Letter */}
          <div
            ref={mRef}
            className="relative text-yellow-400"
            style={{
            textShadow:"0 0 8px #F59E0B, 0 0 16px #F59E0B",
            }}
          >
            M
          </div>
  
          {/* "I" Letter */}
          <div
            ref={iRef}
            className="relative"
            style={{
              textShadow: "0px 0px 15px rgba(255, 255, 255, 0.8)",
            }}
          >
            I
          </div>
        </div>
  
        {/* Quote with Typing Effect */}
        <div
          ref={textRef}
          className="text-yellow-400 text-2xl mt-12 tracking-wide text-center font-extrabold"
          style={{
            textShadow: "0px 0px 15px rgba(255, 255, 255, 0.8)",
            fontFamily: "Italianno-Regular",
          }}
        ></div>
      </div>
    );
  };
  
  export default AnimatedLogo;
  
  