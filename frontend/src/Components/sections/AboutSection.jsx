// src/components/AboutSection.jsx
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { usePersonalInfo } from "@/hooks/usePortfolio";
import { getAllSkills } from "@/api/portfolioApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  FiCode, FiAward, FiCpu, FiCheckCircle,
  FiMapPin, FiMail, FiPhone, FiDownload,
  FiLayout, FiDatabase, FiServer, FiGitBranch, FiSmartphone
} from "react-icons/fi";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Loader from "@/Components/common/Loader";

gsap.registerPlugin(ScrollTrigger);

const iconMap = {
  FiCode, FiAward, FiCpu, FiCheckCircle,
  FiLayout, FiDatabase, FiServer, FiGitBranch, FiSmartphone
};

const AboutSection = () => {
  const { isDarkMode } = useTheme();
  const { personalInfo: apiPersonalInfo, loading, error } = usePersonalInfo();
  
  const [infoToDisplay, setInfoToDisplay] = useState(null);
  const [statsToDisplay, setStatsToDisplay] = useState([]);
  const [expertiseAreas, setExpertiseAreas] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);
  
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  // GSAP Animations (same)
  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const content = contentRef.current;

    if (!section || !image || !content) return;

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
      try {
        if (imgAnim) imgAnim.kill();
        if (contentAnim) contentAnim.kill();
        ScrollTrigger.getAll().forEach((t) => t.kill());
      } catch (e) {}
    };
  }, [infoToDisplay]);

  // Fetch personal info
  useEffect(() => {
    if (apiPersonalInfo) {
      const data = apiPersonalInfo?.data || apiPersonalInfo;
      setInfoToDisplay(data);

      // expertiseAreas is expected to be an array of { icon, title, description }
      if (Array.isArray(data.expertiseAreas)) {
        setExpertiseAreas(data.expertiseAreas);
      } else {
        setExpertiseAreas([]);
      }

      // Only show Major Projects (projectsCompleted) here — years & stackExpertise belong to ModernAbout.jsx
      if (data?.statistics) {
            const years = data?.statistics?.yearsOfExperience ?? 0;
            const projects = data?.statistics?.projectsCompleted ?? data?.statistics?.majorProjects ?? 0;
            const devTitle = data?.title || "Developer";

        setStatsToDisplay([
          {
            label: 'Major Projects',
            value: projects,
            icon: 'FiAward'
          },
          { label: "Expertise", value: devTitle, icon: "FiLayout" },
          { label: "Years Experience", value: years || 0, icon: "FiCode" },
        ]);
      } else {
        setStatsToDisplay([]);
      }
    }
  }, [apiPersonalInfo]);

  // Fetch skills (same)
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();
        const skillsArray = Array.isArray(data) ? data : (data?.data || []);
        setSkills(skillsArray);
      } catch (err) {
        console.error('Error fetching skills:', err);
        setSkills([]);
      } finally {
        setSkillsLoading(false);
      }
    };
    fetchSkills();
  }, []);

  if (loading) return (<div className="flex items-center justify-center h-screen"><Loader variant="spinner" text="Loading Profile..." /></div>);
  if (error || !infoToDisplay) return (<div className={`text-center py-12 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>{error || "Failed to load information"}</div>);

  const aboutImageUrl = infoToDisplay?.aboutImage?.url || infoToDisplay?.aboutImage;
  const profileImageUrl = infoToDisplay?.profileImage?.url || infoToDisplay?.profileImage;
  const locationText = infoToDisplay?.location?.city && infoToDisplay?.location?.country ? `${infoToDisplay.location.city}, ${infoToDisplay.location.country}` : infoToDisplay?.location;

  // Group skills by category
  const skillsByCategory = skills.reduce((acc, skill) => {
    const category = skill.category || 'Other';
    if (!acc[category]) acc[category] = [];
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <section id="about" ref={sectionRef} className={`py-20 lg:py-32 transition-colors duration-300 ${isDarkMode ? "bg-neutral-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-neutral-900"}`}>About <span className="gradient-text">Me</span></h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Image */}
          <motion.div ref={imageRef} className="relative" initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary-500 to-accent-500 rounded-3xl transform rotate-3 opacity-20" />
              <div className={`relative rounded-3xl overflow-hidden shadow-2xl ${isDarkMode ? "bg-neutral-800" : "bg-neutral-100"}`}>
                {aboutImageUrl ? (
                  <>
                    <img src={aboutImageUrl} alt={infoToDisplay?.name} className="w-full h-80 sm:h-96 object-cover" loading="lazy"/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
                  </>
                ) : (
                  <div className="w-full h-80 sm:h-96 flex items-center justify-center">
                    <Avatar className="w-48 h-48">
                      <AvatarImage src={profileImageUrl} />
                      <AvatarFallback className="text-6xl">{infoToDisplay?.name?.split(' ').map(n => n[0]).join('') || 'U'}</AvatarFallback>
                    </Avatar>
                  </div>
                )}
              </div>

              <motion.div className={`absolute -bottom-8 -right-8 p-6 rounded-2xl shadow-2xl z-10 ${isDarkMode ? "bg-neutral-800 border border-neutral-700" : "bg-white border border-neutral-200"}`} whileHover={{ scale: 1.04 }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
                <div className="text-center w-36">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <FiCode className="w-6 h-6 text-white" />
                  </div>
                  <p className={`font-semibold text-sm ${isDarkMode ? "text-white" : "text-neutral-900"}`}>{infoToDisplay?.title?.split(' ').slice(0,2).join(' ') || 'Full Stack'}</p>
                  <p className={`text-xs ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>Developer</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            <div>
              <h3 className={`text-3xl font-bold mb-6 ${isDarkMode ? "text-white" : "text-neutral-900"}`}>{infoToDisplay?.name}</h3>
              <p className={`text-lg leading-relaxed mb-4 ${isDarkMode ? "text-neutral-300" : "text-neutral-700"}`}>{infoToDisplay?.bio}</p>
            </div>

            <div className="space-y-4">
              {[ locationText && { icon: FiMapPin, text: locationText }, infoToDisplay?.email && { icon: FiMail, text: infoToDisplay.email }, infoToDisplay?.phone && { icon: FiPhone, text: infoToDisplay.phone } ].filter(Boolean).map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div key={index} className={`flex items-center space-x-3 p-4 rounded-xl ${isDarkMode ? "bg-neutral-800 border border-neutral-700" : "bg-neutral-50 border border-neutral-200"}`} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }}>
                    <Icon className={`w-5 h-5 ${isDarkMode ? 'text-primary-400' : 'text-primary-600'}`} />
                    <span className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>{item.text}</span>
                  </motion.div>
                );
              })}
            </div>

            {infoToDisplay?.resumeFile?.url && (
              <motion.a href={infoToDisplay.resumeFile.url} download={`${infoToDisplay.name}_Resume.pdf`} className="inline-flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <span>Download Resume</span>
                <FiDownload className="w-5 h-5" />
              </motion.a>
            )}
          </div>
        </div>

        {/* Expertise Areas */}
        {expertiseAreas.length > 0 && (
          <div className="mb-20">
            <motion.h3 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? "text-white" : "text-neutral-900"}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>What I Do Best</motion.h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {expertiseAreas.map((expertise, index) => {
                const IconComponent = iconMap[expertise.icon] || FiCode;
                return (
                  <motion.div key={index} className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg group ${isDarkMode ? "bg-neutral-800 border-neutral-700 hover:border-primary-500" : "bg-white border-neutral-200 hover:border-primary-500"}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} whileHover={{ y: -8 }}>
                    <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h4 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-neutral-900"}`}>{expertise.title}</h4>
                    <p className={`${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>{expertise.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Skills Grid fallback (unchanged) */}
        {!skillsLoading && skills.length > 0 && expertiseAreas.length === 0 && (
          <>
            {/* ... same skills rendering as before ... */}
            <div className="mb-20">
              <motion.h3 className={`text-3xl font-bold text-center mb-12 ${isDarkMode ? "text-white" : "text-neutral-900"}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>Technical Skills</motion.h3>
              {/* categories / badges rendering omitted for brevity (you keep your original block) */}
              {Object.keys(skillsByCategory).length > 0 ? (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {Object.entries(skillsByCategory).map(([category, categorySkills], index) => {
                    const IconComponent = iconMap[categorySkills[0]?.icon] || FiCode;
                    return (
                      <motion.div key={category} className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg group ${isDarkMode ? "bg-neutral-800 border-neutral-700 hover:border-primary-500" : "bg-white border-neutral-200 hover:border-primary-500"}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} whileHover={{ y: -8 }}>
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110"><IconComponent className="w-6 h-6 text-white" /></div>
                        <h4 className={`text-xl font-semibold mb-3 ${isDarkMode ? "text-white" : "text-neutral-900"}`}>{category}</h4>
                        <div className="flex flex-wrap gap-2">{categorySkills.map((skill, idx) => (<Badge key={idx} variant="secondary" className={isDarkMode ? 'bg-neutral-700 text-neutral-300' : 'bg-neutral-100 text-neutral-700'}>{skill.name}</Badge>))}</div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {skills.slice(0,6).map((skill, index) => {
                    const IconComponent = iconMap[skill.icon] || FiCode;
                    return (
                      <motion.div key={index} className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-lg group ${isDarkMode ? "bg-neutral-800 border-neutral-700 hover:border-primary-500" : "bg-white border-neutral-200 hover:border-primary-500"}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }} whileHover={{ y: -8 }}>
                        <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4 transform transition-transform duration-300 group-hover:scale-110"><IconComponent className="w-6 h-6 text-white" /></div>
                        <h4 className={`text-xl font-semibold mb-2 ${isDarkMode ? "text-white" : "text-neutral-900"}`}>{skill.name}</h4>
                        {skill.description && (<p className={`text-sm ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>{skill.description}</p>)}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </>
        )}

        {/* Stats (only Major Projects displayed from statsToDisplay) */}
        {statsToDisplay.length > 0 && (
          <motion.div className={`rounded-3xl p-8 lg:p-12 ${isDarkMode ? "bg-gradient-to-r from-neutral-800 to-neutral-900" : "bg-gradient-to-r from-neutral-100 to-neutral-200"}`} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
              {statsToDisplay.map((stat, index) => (
                <motion.div key={stat.label} className="text-center" initial={{ opacity: 0, scale: 0.6 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.06 }} viewport={{ once: true }}>
                  <div className={`text-lg lg:text-2xl font-bold mb-2 ${isDarkMode ? "text-white" : "text-neutral-900"}`}>{stat.value}</div>
                  <div className={`text-sm lg:text-base font-medium ${isDarkMode ? "text-neutral-400" : "text-neutral-600"}`}>{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AboutSection;
