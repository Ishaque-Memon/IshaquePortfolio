import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import EducationImage from "../assets/MyPicture/Ishaq4.jpeg"; 

const educationData = [
  {
    degree: "Bachelor of Software Engineering",
    institution: "Quaid-e-Awam University of Engineering, Science & Technology",
    year: "2020 - 2025",
  },
  {
    degree: "Intermediate in Pre-Engineering",
    institution: "Govt. Degree College",
    year: "2018 - 2020",
  },
  {
    degree: "Matriculation",
    institution: "Mehleej Higher Secondary School",
    year: "2016 - 2018",
  },
];

const Education = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Timeline Animation
    gsap.fromTo(
      ".timeline-item",
      { opacity: 0, x: -100 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".timeline",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Floating Particle Behavior
    gsap.to(".particle", {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      opacity: "random(0.5, 1)",
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Shooting Star Behavior
    const createShootingEffect = (particle) => {
      gsap.to(particle, {
        x: `+=${Math.random() * 300 - 150}`,
        y: window.innerHeight + 100,
        opacity: 0,
        scale: 0,
        duration: Math.random() * 1.5 + 0.5,
        ease: "power3.out",
        onComplete: () => resetParticle(particle),
      });
    };

    const resetParticle = (particle) => {
      gsap.set(particle, {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random() * 0.5 + 0.5,
        scale: Math.random() * 0.5 + 0.2,
      });

      // Add delay before reverting to floating behavior
      setTimeout(() => {
        gsap.to(particle, {
          y: "random(-20, 20)",
          x: "random(-20, 20)",
          opacity: "random(0.5, 1)",
          duration: 8,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }, 1000);
    };

    const particles = document.querySelectorAll(".particle");
    setInterval(() => {
      const randomIndex = Math.floor(Math.random() * particles.length);
      createShootingEffect(particles[randomIndex]);
    }, 1000); // Every second, make one particle a shooting star

    // Glow Effect for Picture Frame
    gsap.to(".glowing-frame", {
      scale: "random(0.95, 1.05)",
      opacity: "random(0.7, 1)",
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section className="relative py-20 education-section overflow-hidden text-white">
      {/* Custom Background */}
      <style>
        {`
          .education-section {
            background: linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67));
          }
          .particle {
            position: absolute;
            width: 2px;
            height: 2px;
            background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 80%);
            border-radius: 50%;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.8);
          }
          .shooting-star {
            position: absolute;
            background: linear-gradient(45deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
            width: 3px;
            height: 60px;
            border-radius: 2px;
            filter: blur(3px);
            transform: rotate(45deg);
            z-index: 0;
          }
          .star {
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            animation: twinkle 4s infinite alternate ease-in-out;
          }
          @keyframes twinkle {
            0% {
              opacity: 0.3;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>

      {/* Floating Particles */}
      {Array.from({ length: 50 }).map((_, index) => (
        <div
          key={index}
          className="particle"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
        ></div>
      ))}

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center space-y-12 md:space-y-0 md:space-x-12">
        {/* Picture with Glowing Frame */}
        <div className="education-picture relative w-full md:w-1/3 flex justify-center items-center">
          {/* Glowing Frame */}
          <div className="glowing-frame absolute inset-0 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 rounded-xl blur-xl"></div>
          {/* Picture */}
          <div className="relative border-4 border-orange-500 rounded-xl shadow-2xl p-4"
          style={{
            background: "linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67))"
        }}
          >
            <img
              src={EducationImage}
              alt="Education"
              className="w-full h-auto object-cover rounded-md"
            />
          </div>
        </div>

        {/* Education Content */}
        <div className="w-full md:w-2/3">
          <h2 className="text-4xl font-bold  mb-8 text-center md:text-left">
            My 
            <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600"> Education Journey</span>
          </h2>
          <div className="timeline relative border-l-4 border-orange-400 pl-8">
            {educationData.map((edu, index) => (
              <div
                key={index}
                className="timeline-item relative pb-12 last:pb-0"
              >
                {/* Dot */}
                <div className="relative left-[-42px] top-[4.8rem] transform -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 rounded-full  shadow-md"></div>

                {/* Details */}
                <div className="rounded-lg p-6 shadow-lg"
                style={{
                  background: "linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67))",
                }}
                >
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {edu.degree}
                  </h3>
                  <p className="text-lg text-gray-300 mb-1">
                    {edu.institution}
                  </p>
                  <span className="text-sm text-orange-300">{edu.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
