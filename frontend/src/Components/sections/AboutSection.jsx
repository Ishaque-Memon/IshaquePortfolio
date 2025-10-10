// ModernAbout.jsx
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FiCode,
  FiLayout,
  FiDatabase,
  FiSmartphone,
  FiServer,
  FiGitBranch,
} from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MyPicture from "../assets/MyPicture/Ishaq4.jpeg?url";
import ResumeImage from "../assets/Resume/M.Ishaque.pdf?url";

gsap.registerPlugin(ScrollTrigger);

const ModernAbout = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

    // Parallax / reveal for image
    const imgAnim = gsap.fromTo(
      image,
      { y: 80, opacity: 0, scale: 0.98 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      }
    );

    // Stagger reveal for content children
    const children = Array.from(content.children || []);
    const contentAnim = gsap.fromTo(
      children,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.12,
        ease: "power2.out",
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      }
    );

    return () => {
      // cleanup animations & scroll triggers on unmount
      try {
        if (imgAnim) imgAnim.kill();
        if (contentAnim) contentAnim.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      } catch (e) {
        // ignore cleanup errors
      }
    };
  }, []);

  const skills = [
    {
      icon: FiCode,
      title: "Frontend Development",
      desc: "React.js, HTML5, CSS3, Tailwind CSS",
    },
    {
      icon: FiServer,
      title: "Backend Development",
      desc: "Node.js, Express.js, RESTful APIs",
    },
    {
      icon: FiDatabase,
      title: "Database Management",
      desc: "MS SQL Server, MySQL",
    },
    {
      icon: FiLayout,
      title: "UI/UX & Animations",
      desc: "GSAP, Framer Motion, Responsive Design",
    },
    {
      icon: FiSmartphone,
      title: "Security & Auth",
      desc: "JWT, Protected Routes, Authorization Middleware",
    },
    {
      icon: FiGitBranch,
      title: "DevOps & Tools",
      desc: "Microsoft Azure, Git, GitHub",
    },
  ];

  const stats = [
    { number: "1+", label: "Years Experience" },
    { number: "3", label: "Major Projects" },
    { number: "MERN", label: "Stack Expertise" },
    { number: "Azure", label: "Cloud Platform" },
  ];

  return (
  <section
        id="about"
        ref={sectionRef}
        className={`py-12 sm:py-16 md:py-20 lg:py-32 transition-colors duration-300 ${
          isDarkMode ? "bg-neutral-900" : "bg-white"
    }`}
    style={{ contentVisibility: 'auto', containIntrinsicSize: '1px 900px' }}
      >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${
              isDarkMode ? "text-white" : "text-neutral-900"
            }`}
          >
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center mb-12 sm:mb-16 md:mb-20">
          {/* Image Column */}
          <motion.div
            ref={imageRef}
            className="relative order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Background decoration */}
              <div className="absolute -inset-2 sm:-inset-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-2xl sm:rounded-3xl transform rotate-2 sm:rotate-3 opacity-20" />

              {/* Image */}
              <div
                className={`relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl sm:shadow-2xl ${
                  isDarkMode ? "bg-neutral-800" : "bg-neutral-100"
                }`}
              >
                <img
                  src={MyPicture}
                  alt="Muhammad Ishaque"
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  loading="lazy"
                  decoding="async"
                />

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
              </div>

              {/* Floating card - responsive positioning */}
              <motion.div
                className={`absolute -bottom-4 sm:-bottom-6 md:-bottom-8 -right-4 sm:-right-6 md:-right-8 p-3 sm:p-4 md:p-6 rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl z-10 ${
                  isDarkMode
                    ? "bg-neutral-800 border border-neutral-700"
                    : "bg-white border border-neutral-200"
                }`}
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <div className="text-center w-24 sm:w-28 md:w-36">
                  <div className="w-8 sm:w-10 md:w-12 h-8 sm:h-10 md:h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg sm:rounded-xl flex items-center justify-center mx-auto mb-2 sm:mb-3">
                    <FiCode className="w-4 sm:w-5 md:w-6 h-4 sm:h-5 md:h-6 text-white" />
                  </div>
                  <p
                    className={`font-semibold text-xs sm:text-sm ${
                      isDarkMode ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    Full Stack
                  </p>
                  <p
                    className={`text-xs ${
                      isDarkMode ? "text-neutral-400" : "text-neutral-600"
                    }`}
                  >
                    Developer
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content Column */}
          <div ref={contentRef} className="space-y-6 sm:space-y-8 order-2">
            {/* Introduction */}
            <div>
              <h3
                className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 leading-tight ${
                  isDarkMode ? "text-white" : "text-neutral-900"
                }`}
              >
                MERN Stack Developer with Full-Stack Expertise
              </h3>
              <p
                className={`text-base sm:text-lg leading-relaxed ${
                  isDarkMode ? "text-neutral-300" : "text-neutral-700"
                }`}
              >
                Software Engineer specializing in the MERN stack, with experience building secure,
                full-stack applications. Developed a Student-Centric LMS (OBE V2.0) featuring JWT
                authentication, protected routes, using React.js, Node.js, Express.js, and MS SQL
                Server. Proficient in RESTful API design, authorization middleware, and Azure
                deployment. Committed to delivering impactful solutions and continuously expanding
                my technical expertise in collaborative environments.
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-3 sm:space-y-4">
              {[
                "🚀 Full-stack development with React.js, Node.js, Express.js, MS SQL Server",
                "🔒 JWT authentication, protected routes, and authorization middleware",
                "☁️ Microsoft Azure deployment and cloud services integration",
                "🎓 Student-Centric LMS (OBE V2.0) development and architecture",
              ].map((point, index) => (
                <motion.div
                  key={index}
                  className={`flex items-center space-x-3 p-3 sm:p-4 rounded-lg sm:rounded-xl ${
                    isDarkMode
                      ? "bg-neutral-800 border border-neutral-700"
                      : "bg-neutral-50 border border-neutral-200"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                >
                  <span className="text-sm sm:text-base leading-relaxed">{point}</span>
                </motion.div>
              ))}
            </div>

            {/* Download CV Button */}
            <motion.a
              href={ResumeImage}
              download="Muhammad_Ishaque_Resume.pdf"
              className="inline-flex items-center space-x-2 sm:space-x-3 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group text-sm sm:text-base"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Download Resume</span>
              <motion.div
                className="w-4 sm:w-5 h-4 sm:h-5"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
              >
                📄
              </motion.div>
            </motion.a>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <motion.h3
            className={`text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8 sm:mb-10 md:mb-12 ${
              isDarkMode ? "text-white" : "text-neutral-900"
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What I Do Best
          </motion.h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {skills.map((skill, index) => {
              const Icon = skill.icon;
              return (
                <motion.div
                  key={skill.title}
                  className={`p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 hover:shadow-lg group ${
                    isDarkMode
                      ? "bg-neutral-800 border-neutral-700 hover:border-primary-500"
                      : "bg-white border-neutral-200 hover:border-primary-500"
                  }`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <div className="w-10 sm:w-11 md:w-12 h-10 sm:h-11 md:h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 transform transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-5 sm:w-5.5 md:w-6 h-5 sm:h-5.5 md:h-6 text-white" />
                  </div>
                  <h4
                    className={`text-lg sm:text-xl font-semibold mb-2 ${
                      isDarkMode ? "text-white" : "text-neutral-900"
                    }`}
                  >
                    {skill.title}
                  </h4>
                  <p className={`text-sm sm:text-base ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>
                    {skill.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          className={`rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 ${
            isDarkMode
              ? "bg-gradient-to-r from-neutral-800 to-neutral-900"
              : "bg-gradient-to-r from-neutral-100 to-neutral-200"
          }`}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.06 }}
                viewport={{ once: true }}
              >
                <div
                  className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 ${
                    isDarkMode ? "text-white" : "text-neutral-900"
                  }`}
                >
                  {stat.number}
                </div>
                <div
                  className={`text-xs sm:text-sm md:text-base font-medium ${
                    isDarkMode ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernAbout;
