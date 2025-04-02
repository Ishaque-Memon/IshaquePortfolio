import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const ScrollButton = () => {
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
        boxShadow: "0 0 20px rgba(255, 157, 0, 0.4)",
        repeat: -1,
        yoyo: true,
        duration: 1.5,
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
    gsap.to(buttonRef.current, {
      scale: 1.15,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(buttonRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.inOut",
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
    gsap.to(orbitRef.current, {
      rotate: 360,
      duration: 10,
      repeat: -1,
      ease: "linear",
      transformOrigin: "center center",
    });
  }, []);

  return (
    <>
      <div
        ref={buttonRef}
        onClick={scrollAction}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          position: "fixed",
          bottom: "30px",
          right: "30px",
          width: "65px",
          height: "65px",
          borderRadius: "50%",
          background: "linear-gradient(145deg, #FFB703, #FB8500)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          zIndex: 1000,
          opacity: 0,
          transform: "translateY(30px)",
          transition: "transform 0.3s ease",
        }}
      >
        <div
          ref={orbitRef}
          style={{
            position: "absolute",
            width: "80px",
            height: "80px",
            border: "2px dashed rgba(255,255,255,0.2)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        {isAtBottom ? (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 15L12 7L20 15"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        ) : (
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 9L12 17L20 9"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>
    </>
  );
};

export default ScrollButton;
