import React, { useEffect } from "react";
import gsap from "gsap";
import MyPicture from "../assets/MyPicture/Ishaq.JPG";

function Home() {
  useEffect(() => {
    // Profile Picture Animation (Scale + Rotate)
    gsap.fromTo(
      ".hero-image",
      { scale: 0.8, rotate: 15, opacity: 0 },
      {
        scale: 1,
        rotate: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.5,
      }
    );

    // Title Animation (Fade & Slide)
    gsap.fromTo(
      ".hero-title",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out" }
    );

    // Subtitle Animation
    gsap.fromTo(
      ".hero-subtitle",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power2.out", delay: 0.3 }
    );

    // Background Motion Graphics with Smooth Continuous Animation
    gsap.to(".motion-bg-1", {
      x: 50,
      y: -50,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0
    });

    gsap.to(".motion-bg-2", {
      x: -50,
      y: 50,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0
    });

    gsap.to(".motion-bg-3", {
      x: 30,
      y: 30,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0
    });

    gsap.to(".motion-bg-4", {
      rotation: 45,
      scale: 1.5,
      opacity: 0.2,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0
    });

    gsap.to(".motion-bg-5", {
      rotation: -45,
      scale: 1.3,
      opacity: 0.3,
      duration: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      delay: 0
    });

    // Smooth Color Transitions with More Variations
    gsap.to(".motion-bg-1", {
      background:
        "linear-gradient(to top, #ff7eb3, #ff758c, #ff6a75, #ff5c5d, #ff4c45)",
      duration: 6,
      repeat: -1,
      yoyo: true,
      ease: "linear",
    });

    gsap.to(".motion-bg-2", {
      background:
        "linear-gradient(to top, #ff9a9e, #fad0c4, #fad0c4, #fbc2eb, #a6c1ee)",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "linear",
    });

    gsap.to(".motion-bg-3", {
      background:
        "linear-gradient(to bottom, #84fab0, #8fd3f4, #8fd3f4, #84fab0, #8fd3f4)",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "linear",
    });

    gsap.to(".motion-bg-4", {
      background:
        "linear-gradient(to bottom, #6a11cb, #2575fc, #6a11cb)",
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "linear",
    });

    gsap.to(".motion-bg-5", {
      background:
        "linear-gradient(to top, #ff6a00, #ee0979, #ff6a00)",
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: "linear",
    });
  }, []);

  return (
    <section id="home" className="h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white flex items-center justify-center relative overflow-hidden">
      {/* Background Motion Graphics */}
      <div className="absolute inset-0">
        <div className="motion-bg-1 absolute w-72 h-72 rounded-full blur-3xl opacity-40 top-20 left-16"></div>
        <div className="motion-bg-2 absolute w-96 h-96 rounded-full blur-3xl opacity-30 top-40 right-24"></div>
        <div className="motion-bg-3 absolute w-80 h-80 rounded-full blur-2xl opacity-20 bottom-20 left-40"></div>
        {/* Additional Background Motion Elements */}
        <div className="motion-bg-4 absolute w-96 h-96 rounded-full blur-xl opacity-25 top-10 left-40"></div>
        <div className="motion-bg-5 absolute w-72 h-72 rounded-full blur-xl opacity-35 bottom-10 right-16"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6">
        {/* Profile Image with Glow */}
        <div className="hero-image mx-auto mb-6 w-48 h-48 rounded-full overflow-hidden border-4 border-yellow-500 shadow-2xl shadow-yellow-600">
          <img
            src={MyPicture}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h1 className="hero-title text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600">
          Muhammad Ishaque
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle mt-4 text-xl md:text-2xl text-gray-300">
          Turning ideas into impactful solutions
        </p>

        {/* Call to Action */}
        <div className="mt-6">
{/* Connect Button */}
          <button
          onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })}
          className="mt-8 z-10 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform duration-300"
         >
          Let’s Connect
        </button>

        </div>
      </div>
    </section>
  );
}

export default Home;
