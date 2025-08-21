import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";
import { Link } from "react-scroll";
import { useTheme } from "../contexts/ThemeContext.jsx";
import gsap from "gsap";
import MyPicture from "../assets/MyPicture/Ishaque.jpg?url";
import ResumePDF from "../assets/Resume/M.Ishaque.pdf?url";
import SectionLoader from "./SectionLoader.jsx";

const ModernHome = () => {
  const { isDarkMode } = useTheme();
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });
    
    // Animate hero section elements
    tl.fromTo(
      textRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
    .fromTo(
      imageRef.current,
      { scale: 0, rotation: -180 },
      { scale: 1, rotation: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" },
      "-=0.8"
    );

        // Floating animation for the image (reduced on small screens)
        const isMdUp = window.matchMedia('(min-width: 768px)').matches;
        gsap.to(imageRef.current, {
          y: isMdUp ? -20 : -10,
          duration: 3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut"
        });

    // Parallax effect on scroll (desktop-only)
    const isDesktop = window.matchMedia('(min-width: 1024px)').matches;
    const handleScroll = () => {
      if (!isDesktop) return;
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.25;
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const socialLinks = [
    { icon: FiGithub, href: "https://github.com/Ishaque-Memon", label: "GitHub" },
    { icon: FiLinkedin, href: "https://www.linkedin.com/in/muhammad-ishaque-574492249/", label: "LinkedIn" },
    { icon: FiMail, href: "mailto:m.ishaq031530@gmail.com", label: "Email" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <SectionLoader 
      loadingTime={2000}
      loaderVariant="orbit"
      loadingText="Initializing Portfolio..."
      sectionName="Home"
    >
      <section
        id="home"
        className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
          isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
        }`}
      >
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
  <div className="absolute top-1/4 -left-40 w-60 h-60 md:w-80 md:h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 md:opacity-20 animate-float"></div>
  <div className="absolute top-1/3 -right-40 w-60 h-60 md:w-80 md:h-80 bg-accent-500 rounded-full mix-blend-multiply filter blur-xl opacity-15 md:opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
  <div className="absolute -bottom-32 left-1/3 w-60 h-60 md:w-80 md:h-80 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl opacity-15 md:opacity-20 animate-float" style={{animationDelay: '4s'}}></div>
        
        {/* Grid Pattern */}
        <div className={`absolute inset-0 bg-grid-pattern opacity-5 ${isDarkMode ? 'text-white' : 'text-black'}`}></div>
      </div>

      <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center transform-gpu origin-top scale-[0.7] md:scale-100 mx-auto">
          
          {/* Content */}
          <motion.div
            ref={textRef}
            className="text-center lg:text-left space-y-8 order-2 lg:order-1"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Greeting */}
            <motion.div variants={itemVariants}>
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-medium ${
                isDarkMode 
                  ? 'bg-neutral-800 text-neutral-300' 
                  : 'bg-neutral-200 text-neutral-700'
              }`}>
                👋 Hello, I'm
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              variants={itemVariants}
            >
              <span className={`block ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
                Muhammad
              </span>
              <span className="block bg-gradient-to-r from-primary-500 to-accent-500 bg-clip-text text-transparent">
                Ishaque
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              className={`text-xl md:text-2xl font-medium ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}
              variants={itemVariants}
            >
              Full Stack Developer & UI/UX Enthusiast
            </motion.p>

            {/* Description */}
            <motion.p
              className={`text-lg leading-relaxed max-w-2xl ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}
              variants={itemVariants}
            >
              I craft exceptional digital experiences through innovative web development, 
              combining cutting-edge technologies with intuitive design to bring ideas to life.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              variants={itemVariants}
            >
              <Link
                to="projects"
                smooth={true}
                duration={800}
                offset={-80}
                className="cursor-pointer"
              >
                <motion.button
                  className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden w-full sm:w-auto"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">View My Work</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>
              </Link>

              <motion.a
                href={ResumePDF}
                download="Ishaque_Memon_Resume.pdf"
                className="group relative px-8 py-4 border-2 border-primary-500 text-primary-500 rounded-2xl font-semibold text-lg hover:bg-primary-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiDownload className="w-5 h-5" />
                <span>Download CV</span>
              </motion.a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex justify-center lg:justify-start space-x-5 md:space-x-6 flex-wrap gap-3"
              variants={itemVariants}
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-3 rounded-xl transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-neutral-800 text-neutral-400 hover:text-white hover:bg-neutral-700' 
                      : 'bg-neutral-200 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-300'
                  }`}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0,
                    transition: { delay: 0.8 + index * 0.1 }
                  }}
                >
                  <social.icon className="w-6 h-6" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Profile Image */}
          <motion.div
            className="flex justify-center lg:justify-end order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full blur-2xl opacity-20 scale-110 animate-pulse"></div>
              
              {/* Outer Ring */}
              <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 p-1 animate-float">
                <div className={`w-full h-full rounded-full ${isDarkMode ? 'bg-neutral-900' : 'bg-white'} p-2`}>
                  <img
                    ref={imageRef}
                    src={MyPicture}
                    alt="Muhammad Ishaque"
                    className="w-full h-full rounded-full object-cover shadow-2xl"
                  />
                </div>
              </div>

              {/* Floating Elements */}
              <motion.div
                className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              >
                ⚡
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-accent-500 to-primary-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
                animate={{ rotate: -360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                🚀
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
    </SectionLoader>
  );
};

export default ModernHome;
