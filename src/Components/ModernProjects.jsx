import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiGithub, FiStar, FiPlay, FiPause, FiVolume2, FiVolumeX, FiMaximize2, FiX, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useTheme } from "../contexts/ThemeContext.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LMS_VIDEO from "../assets/PROJECT-TUT_VIDEOS/FYP_LMS_PROJECT/LMS_VIDEO.mov?url"; // Demo video
import HOD from "../assets/ImageGallery/4.png?url";
import Developer1 from "../assets/ImageGallery/5.jpeg?url";
import Developer2 from "../assets/ImageGallery/6.jpeg?url";
import SpyMode from "../assets/ImageGallery/7.png?url";

gsap.registerPlugin(ScrollTrigger);

const ModernProjects = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const projectsRef = useRef(null);

  // Refs & state for multiple videos
  const videoRefs = useRef({}); // will hold DOM <video> elements by project id
  const popupVideoRef = useRef(null);

  const [playingId, setPlayingId] = useState(null); // which main video is playing
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [activePopupId, setActivePopupId] = useState(null);

  const [currentTimeMap, setCurrentTimeMap] = useState({});
  const [durationMap, setDurationMap] = useState({});
  const [mutedMap, setMutedMap] = useState({});
  const [showControlsMap, setShowControlsMap] = useState({});
  const [aspectMap, setAspectMap] = useState({}); // padding-top percentage for aspect ratio

  // Carousel state
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const carouselRef = useRef(null);

  const projects = [
    {
      id: 1,
      title: "STUDENT CENTRIC LMS V2.0",
      description: "A comprehensive Learning Management System designed with student-centric approach for enhanced educational experience.",
      longDescription: "Final year project focused on creating an intuitive LMS platform that prioritizes student needs. Features include course management, assignment submission, grade tracking, and interactive learning tools.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT"],
      category: "Full Stack",
      status: "Live",
      featured: true,
      images: [LMS_VIDEO],
      videoUrl: LMS_VIDEO,
      liveUrl: "https://obe.quest.edu.pk",
      githubUrl: "https://github.com/Ishaque-Memon/student-centric-lms",
      features: [
        "Student-Centric Design",
        "Course Management",
        "Assignment Tracking",
        "Grade Management",
        "Interactive Learning Tools"
      ]
    },
    {
      id: 2,
      title: "Secure Expense Tracker",
      description: "Full-stack personal finance management application with secure authentication and comprehensive expense tracking features.",
      longDescription: "A complete expense tracking solution built with modern web technologies. Features user authentication, categorized expenses, budget planning, and detailed financial reports.",
      technologies: ["React", "Node.js", "MongoDB", "Express", "JWT", "Chart.js"],
      category: "Full Stack",
      status: "Live",
      featured: true,
      images: [HOD, Developer1],
      // demo: enable video support here by adding a URL. For demo we use same LMS_VIDEO
      videoUrl: LMS_VIDEO,
      liveUrl: "https://secure-expense-tracker.vercel.app",
      githubUrl: "https://github.com/Ishaque-Memon/secure-expense-tracker",
      features: [
        "Secure Authentication",
        "Expense Categorization",
        "Budget Planning",
        "Financial Reports",
        "Data Visualization"
      ]
    },
    {
      id: 3,
      title: "Real-Time Chat Application",
      description: "Real-time messaging application built with Python and Socket.IO for instant communication.",
      longDescription: "Full-stack chat application with real-time messaging capabilities. Built using Python backend with Socket.IO for real-time communication and modern frontend for seamless user experience.",
      technologies: ["Python", "Socket.IO", "Flask", "JavaScript", "HTML/CSS"],
      category: "Real-Time",
      status: "Development",
      featured: false,
      images: [Developer2, SpyMode],
      videoUrl: LMS_VIDEO,
      liveUrl: "#",
      githubUrl: "https://github.com/Ishaque-Memon/realtime-chat-application",
      features: [
        "Real-Time Messaging",
        "Socket.IO Integration",
        "Python Backend",
        "User Authentication",
        "Group Chat Support"
      ]
    }
  ];

  useEffect(() => {
    const projectCards = projectsRef.current?.children;
    if (projectCards) {
      gsap.fromTo(
        projectCards,
        { y: 100, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: projectsRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  // Helpers to safely read DOM video element
  const getVideoEl = (id) => videoRefs.current?.[id] || null;

  const togglePlayPause = (id) => {
    const el = getVideoEl(id);
    if (!el) return;

    // if another video is playing, pause it first
    if (playingId && playingId !== id) {
      const prev = getVideoEl(playingId);
      prev?.pause();
    }

    if (!el.paused) {
      el.pause();
      setPlayingId(null);
    } else {
      el.play();
      setPlayingId(id);
    }
  };

  const handleTimeUpdate = (id) => {
    const el = getVideoEl(id);
    if (!el) return;
    setCurrentTimeMap((p) => ({ ...p, [id]: el.currentTime }));
  };

  const handleLoadedMetadata = (id, e) => {
    const el = e.target;
    const dur = el.duration || 0;
    setDurationMap((p) => ({ ...p, [id]: dur }));

    // calculate aspect ratio padding-top percentage
    const vw = el.videoWidth || el.naturalWidth || el.clientWidth || 16;
    const vh = el.videoHeight || el.naturalHeight || el.clientHeight || 9;
    const padding = (vh / vw) * 100;
    setAspectMap((p) => ({ ...p, [id]: padding }));
  };

  const handleSeek = (id, e) => {
    const el = getVideoEl(id);
    if (!el) return;
    const clickX = e.nativeEvent.offsetX;
    const width = e.currentTarget.offsetWidth;
    const newTime = (clickX / width) * (durationMap[id] || el.duration || 0);
    el.currentTime = newTime;
    setCurrentTimeMap((p) => ({ ...p, [id]: newTime }));
  };

  const toggleMute = (id) => {
    const el = getVideoEl(id);
    if (!el) return;
    el.muted = !el.muted;
    setMutedMap((p) => ({ ...p, [id]: el.muted }));
  };

  const openPopup = (id) => {
    const el = getVideoEl(id);
    if (!el) return;
    // pause main video
    el.pause();
    setActivePopupId(id);
    setIsPopupOpen(true);

    // small timeout to ensure popupVideoRef is mounted
    setTimeout(() => {
      if (popupVideoRef.current) {
        popupVideoRef.current.src = el.currentSrc || el.querySelector('source')?.src || el.src;
        popupVideoRef.current.currentTime = el.currentTime || 0;
        popupVideoRef.current.muted = el.muted || false;
        if (playingId === id && !popupVideoRef.current.paused) {
          popupVideoRef.current.play();
        }
      }
    }, 80);
  };

  const closePopup = () => {
    if (popupVideoRef.current && activePopupId) {
      const main = getVideoEl(activePopupId);
      popupVideoRef.current.pause();
      if (main) {
        main.currentTime = popupVideoRef.current.currentTime || 0;
        main.muted = popupVideoRef.current.muted;
        if (playingId === activePopupId) {
          setTimeout(() => main.play(), 80);
        }
      }
    }
    setIsPopupOpen(false);
    setActivePopupId(null);
  };

  // Broadcast overlay state so global UI (e.g., MacOSDock) can hide while popup is open
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isPopupOpen) {
        document.body.classList.add('ui-overlay-open');
      } else {
        document.body.classList.remove('ui-overlay-open');
      }
    }
    if (typeof window !== 'undefined' && typeof window.dispatchEvent === 'function') {
      window.dispatchEvent(new CustomEvent('ui:overlay-change', { detail: { open: isPopupOpen } }));
    }
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('ui-overlay-open');
      }
    };
  }, [isPopupOpen]);

  const formatTime = (time = 0) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Carousel navigation functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % projects.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide]);

  // Pause auto-play on hover
  const handleCarouselHover = (isHovering) => {
    setIsAutoPlaying(!isHovering);
  };

  return (
    <section
      id="projects"
        ref={sectionRef}
        className={`py-12 sm:py-16 md:py-20 lg:py-32 ${isDarkMode ? 'bg-neutral-900' : 'bg-white'} transition-colors duration-300`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12 sm:mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <h2 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
              Showcasing some of my best work in web development, from full-stack applications to innovative solutions that solve real-world problems
            </p>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mt-6 sm:mt-8"></div>
          </motion.div>

          <div ref={projectsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Large card spanning full width (project 1) */}
            <motion.div className={`col-span-1 sm:col-span-2 lg:col-span-4 group relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl ${isDarkMode ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600' : 'bg-white border-neutral-200 hover:border-neutral-300'}`} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }} whileHover={{ y: -10 }}>
              <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl bg-black" onMouseEnter={() => setShowControlsMap((p) => ({ ...p, [1]: true }))} onMouseLeave={() => setShowControlsMap((p) => ({ ...p, [1]: false }))}>
                {projects[0].videoUrl ? (
                  <div className="relative">
                    {/* dynamic aspect ratio wrapper */}
                    <div className="w-full relative" style={{ paddingTop: `${aspectMap[1] ?? 56.25}%` }}>
                      <video
                        ref={(el) => (videoRefs.current[1] = el)}
                        className="absolute inset-0 w-full h-full object-contain"
                        loop
                        playsInline
                        preload="auto"
                        onTimeUpdate={() => handleTimeUpdate(1)}
                        onLoadedMetadata={(e) => handleLoadedMetadata(1, e)}
                        onPlay={() => setPlayingId(1)}
                        onPause={() => setPlayingId((p) => (p === 1 ? null : p))}
                      >
                        <source src={projects[0].videoUrl} type="video/quicktime" />
                        <source src={projects[0].videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>

                    {/* Controls */}
                    <motion.div className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4 ${showControlsMap[1] ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`} initial={{ y: 50 }} animate={{ y: showControlsMap[1] ? 0 : 50 }} transition={{ duration: 0.3 }}>
                      <div className="w-full h-1.5 sm:h-2 bg-white/20 rounded-full mb-2 sm:mb-3 cursor-pointer" onClick={(e) => handleSeek(1, e)}>
                        <div className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full relative" style={{ width: `${((currentTimeMap[1] || 0) / (durationMap[1] || 1)) * 100}%` }}>
                          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 sm:w-3 h-2 sm:h-3 bg-white rounded-full shadow-lg"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                          <motion.button onClick={() => togglePlayPause(1)} className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            {playingId === 1 ? <FiPause className="w-4 sm:w-5 h-4 sm:h-5" /> : <FiPlay className="w-4 sm:w-5 h-4 sm:h-5 ml-0.5" />}
                          </motion.button>

                          <motion.button onClick={() => toggleMute(1)} className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            {mutedMap[1] ? <FiVolumeX className="w-3 sm:w-4 h-3 sm:h-4" /> : <FiVolume2 className="w-3 sm:w-4 h-3 sm:h-4" />}
                          </motion.button>

                          <motion.button onClick={() => openPopup(1)} className="p-1.5 sm:p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <FiMaximize2 className="w-3 sm:w-4 h-3 sm:h-4" />
                          </motion.button>

                          <span className="text-white text-xs sm:text-sm font-medium">{formatTime(currentTimeMap[1])} / {formatTime(durationMap[1])}</span>
                        </div>

                        <div className="flex space-x-2 sm:space-x-3">
                          <motion.a href={projects[0].liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 sm:space-x-2 px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors text-xs sm:text-sm" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <FiEye className="w-3 h-3" />
                            <span className="hidden sm:inline">Live</span>
                          </motion.a>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <img src={projects[0].images[0]} alt={projects[0].title} className="w-full h-48 sm:h-64 lg:h-96 object-cover transition-transform duration-700 group-hover:scale-110" />
                )}

                <div className="absolute top-3 sm:top-4 right-3 sm:right-4">
                  <span className="px-2 sm:px-3 py-1 bg-green-500/20 backdrop-blur-sm rounded-full text-green-400 text-xs sm:text-sm font-medium">{projects[0].status}</span>
                </div>
              </div>

              <div className="p-4 sm:p-6 md:p-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-4 space-y-2 sm:space-y-0">
                  <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${isDarkMode ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-500/20 text-primary-600'}`}>{projects[0].category}</span>
                  <div className="flex items-center space-x-1 text-yellow-400">
                    <FiStar className="w-3 sm:w-4 h-3 sm:h-4 fill-current" />
                    <span className="text-xs sm:text-sm font-medium">Featured</span>
                  </div>
                </div>

                <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{projects[0].title}</h3>

                <p className={`mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>{projects[0].longDescription}</p>

                <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-4 sm:mb-6">
                  {projects[0].technologies.map((tech) => (
                    <span key={tech} className={`px-2 sm:px-3 py-1 rounded-lg text-xs sm:text-sm font-medium ${isDarkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>{tech}</span>
                  ))}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2">
                  {projects[0].features.map((feature) => (
                    <div key={feature} className={`flex items-center space-x-2 text-xs sm:text-sm ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
                      <div className="w-1 sm:w-1.5 h-1 sm:h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Project 2 - supports video with dynamic aspect */}
            <motion.div className={`col-span-1 sm:col-span-1 lg:col-span-2 group relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl ${isDarkMode ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600' : 'bg-white border-neutral-200 hover:border-neutral-300'}`} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} whileHover={{ y: -10 }}>
              <div className="relative" onMouseEnter={() => setShowControlsMap((p) => ({ ...p, [2]: true }))} onMouseLeave={() => setShowControlsMap((p) => ({ ...p, [2]: false }))}>
                {projects[1].videoUrl ? (
                  <div style={{ paddingTop: `${aspectMap[2] ?? 56.25}%` }} className="w-full relative">
                    <video
                      ref={(el) => (videoRefs.current[2] = el)}
                      className="absolute inset-0 w-full h-full object-cover"
                      loop
                      playsInline
                      preload="auto"
                      onTimeUpdate={() => handleTimeUpdate(2)}
                      onLoadedMetadata={(e) => handleLoadedMetadata(2, e)}
                      onPlay={() => setPlayingId(2)}
                      onPause={() => setPlayingId((p) => (p === 2 ? null : p))}
                    >
                      <source src={projects[1].videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    {/* Overlay controls */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent ${showControlsMap[2] ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}> 
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <motion.button onClick={() => togglePlayPause(2)} className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors" whileHover={{ scale: 1.05 }}>{playingId === 2 ? <FiPause className="w-3 sm:w-4 h-3 sm:h-4" /> : <FiPlay className="w-3 sm:w-4 h-3 sm:h-4" />}</motion.button>
                          <motion.button onClick={() => toggleMute(2)} className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors" whileHover={{ scale: 1.05 }}>{mutedMap[2] ? <FiVolumeX className="w-3 sm:w-4 h-3 sm:h-4" /> : <FiVolume2 className="w-3 sm:w-4 h-3 sm:h-4" />}</motion.button>
                          <motion.button onClick={() => openPopup(2)} className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors" whileHover={{ scale: 1.05 }}><FiMaximize2 className="w-3 sm:w-4 h-3 sm:h-4" /></motion.button>
                        </div>

                        <div className="flex space-x-1 sm:space-x-2">
                          <motion.a href={projects[1].liveUrl} target="_blank" rel="noopener noreferrer" className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors text-xs sm:text-sm" whileHover={{ scale: 1.05 }}>
                            <FiEye className="w-3 h-3" />
                          </motion.a>
                          <motion.a href={projects[1].githubUrl} target="_blank" rel="noopener noreferrer" className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors text-xs sm:text-sm" whileHover={{ scale: 1.05 }}>
                            <FiGithub className="w-3 h-3" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img src={projects[1].images[0]} alt={projects[1].title} className="w-full h-40 sm:h-48 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
                )}
              </div>

              <div className="p-4 sm:p-6">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${isDarkMode ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-500/20 text-primary-600'}`}>{projects[1].category}</span>
                <h3 className={`text-lg sm:text-xl font-bold mt-2 sm:mt-3 mb-2 sm:mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{projects[1].title}</h3>
                <p className={`text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>{projects[1].description}</p>

                <div className="flex flex-wrap gap-1">
                  {projects[1].technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>{tech}</span>
                  ))}
                  {projects[1].technologies.length > 4 && <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>+{projects[1].technologies.length - 4}</span>}
                </div>
              </div>
            </motion.div>

            {/* Project 3 - supports video with dynamic aspect */}
            <motion.div className={`col-span-1 sm:col-span-1 lg:col-span-2 group relative rounded-2xl sm:rounded-3xl overflow-hidden border transition-all duration-500 hover:shadow-2xl ${isDarkMode ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600' : 'bg-white border-neutral-200 hover:border-neutral-300'}`} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }} whileHover={{ y: -10 }}>
              <div className="relative" onMouseEnter={() => setShowControlsMap((p) => ({ ...p, [3]: true }))} onMouseLeave={() => setShowControlsMap((p) => ({ ...p, [3]: false }))}>
                {projects[2].videoUrl ? (
                  <div style={{ paddingTop: `${aspectMap[3] ?? 56.25}%` }} className="w-full relative">
                    <video
                      ref={(el) => (videoRefs.current[3] = el)}
                      className="absolute inset-0 w-full h-full object-cover"
                      loop
                      playsInline
                      preload="auto"
                      onTimeUpdate={() => handleTimeUpdate(3)}
                      onLoadedMetadata={(e) => handleLoadedMetadata(3, e)}
                      onPlay={() => setPlayingId(3)}
                      onPause={() => setPlayingId((p) => (p === 3 ? null : p))}
                    >
                      <source src={projects[2].videoUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>

                    <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent ${showControlsMap[3] ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}> 
                      <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between">
                        <div className="flex items-center space-x-1 sm:space-x-2">
                          <motion.button onClick={() => togglePlayPause(3)} className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors" whileHover={{ scale: 1.05 }}>{playingId === 3 ? <FiPause className="w-3 sm:w-4 h-3 sm:h-4" /> : <FiPlay className="w-3 sm:w-4 h-3 sm:h-4" />}</motion.button>
                          <motion.button onClick={() => toggleMute(3)} className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors" whileHover={{ scale: 1.05 }}>{mutedMap[3] ? <FiVolumeX className="w-3 sm:w-4 h-3 sm:h-4" /> : <FiVolume2 className="w-3 sm:w-4 h-3 sm:h-4" />}</motion.button>
                          <motion.button onClick={() => openPopup(3)} className="px-2 sm:px-3 py-1.5 sm:py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors" whileHover={{ scale: 1.05 }}><FiMaximize2 className="w-3 sm:w-4 h-3 sm:h-4" /></motion.button>
                        </div>

                        <div className="flex space-x-1 sm:space-x-2">
                          <motion.a href={projects[2].liveUrl} target="_blank" rel="noopener noreferrer" className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors text-xs sm:text-sm" whileHover={{ scale: 1.05 }}>
                            <FiEye className="w-3 h-3" />
                          </motion.a>
                          <motion.a href={projects[2].githubUrl} target="_blank" rel="noopener noreferrer" className="px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-lg text-white hover:bg-white/30 transition-colors text-xs sm:text-sm" whileHover={{ scale: 1.05 }}>
                            <FiGithub className="w-3 h-3" />
                          </motion.a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <img src={projects[2].images[0]} alt={projects[2].title} className="w-full h-40 sm:h-48 lg:h-64 object-cover transition-transform duration-700 group-hover:scale-110" />
                )}
              </div>

              <div className="p-4 sm:p-6">
                <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${isDarkMode ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-500/20 text-primary-600'}`}>{projects[2].category}</span>
                <h3 className={`text-lg sm:text-xl font-bold mt-2 sm:mt-3 mb-2 sm:mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>{projects[2].title}</h3>
                <p className={`text-xs sm:text-sm mb-3 sm:mb-4 leading-relaxed ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>{projects[2].description}</p>

                <div className="flex flex-wrap gap-1">
                  {projects[2].technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>{tech}</span>
                  ))}
                  {projects[2].technologies.length > 4 && <span className={`px-2 py-1 rounded text-xs ${isDarkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}`}>+{projects[2].technologies.length - 4}</span>}
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div className="text-center mt-16 sm:mt-20" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }} viewport={{ once: true }}>
            <h3 className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>Have a Project in Mind?</h3>
            <p className={`text-base sm:text-lg mb-6 sm:mb-8 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>I'm always open to discussing new opportunities and exciting projects</p>
            <motion.button onClick={() => document.getElementById("contact").scrollIntoView({ behavior: "smooth" })} className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-xl sm:rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 text-sm sm:text-base" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>Let's Talk</motion.button>
          </motion.div>
        </div>

        {/* Popup modal for any active video */}
        <AnimatePresence>
          {isPopupOpen && activePopupId && (
            <motion.div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <motion.div className="absolute inset-0 bg-black/80 backdrop-blur-md" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={closePopup} />

              <motion.div className={`relative w-full max-w-6xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? 'bg-neutral-900/90 border-neutral-700' : 'bg-white/90 border-neutral-200'} border backdrop-blur-xl`} initial={{ scale: 0.8, opacity: 0, y: 100 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 100 }} transition={{ duration: 0.4, ease: "easeOut" }}>
                <motion.button onClick={closePopup} className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 p-1.5 sm:p-2 bg-black/20 backdrop-blur-sm rounded-full text-white hover:bg-black/40 transition-colors" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <FiX className="w-5 sm:w-6 h-5 sm:h-6" />
                </motion.button>

                <div className="relative bg-black">
                  <video ref={popupVideoRef} className="w-full max-h-[70vh] sm:max-h-[80vh] object-contain" controls />

                  <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 text-white text-sm text-right pr-4 sm:pr-6">
                    <h3 className="text-white font-bold text-base sm:text-lg">{projects.find(p => p.id === activePopupId)?.title}</h3>
                    <p className="text-white/70 text-xs sm:text-sm">{projects.find(p => p.id === activePopupId)?.category}</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
  );
};

export default ModernProjects;
