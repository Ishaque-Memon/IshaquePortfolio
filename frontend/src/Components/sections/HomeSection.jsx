import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useTheme } from "@/contexts/ThemeContext";
import { personalInfo } from "@/data/portfolioData";
import { usePersonalInfo } from "@/hooks/usePortfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; // Import Avatar components
import { FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";
import Loader from "@/Components/common/Loader";

const HomeSection = () => {
  const { isDarkMode } = useTheme();
  
  // API Integration
  const { personalInfo: apiPersonalInfo, loading, error } = usePersonalInfo();
  const [infoToDisplay, setInfoToDisplay] = useState(personalInfo);

  // Update info when API data arrives
  useEffect(() => {
    if (apiPersonalInfo) {
      console.log('API Personal Info received:', apiPersonalInfo);
      // The API returns { success, data, message }, so extract data
      const dataToUse = apiPersonalInfo?.data || apiPersonalInfo;
      console.log('Data to display:', dataToUse);
      setInfoToDisplay(dataToUse);
    }
  }, [apiPersonalInfo]);

  // Generate fallback image URL
  const getProfileImage = () => {
    const imageData = infoToDisplay?.profileImage;
    
    console.log('getProfileImage called with imageData:', imageData);
    
    let imageUrl = null;
    
    if (typeof imageData === 'string' && imageData.trim()) {
      imageUrl = imageData;
    } else if (imageData?.url && typeof imageData.url === 'string' && imageData.url.trim()) {
      imageUrl = imageData.url;
    }
    
    console.log('Final imageUrl:', imageUrl);
    
    if (imageUrl) {
      return imageUrl;
    }
    
    // Fallback avatar
    const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(infoToDisplay?.name || 'User')}&size=400&background=6366f1&color=fff`;
    console.log('Using fallback:', fallback);
    return fallback;
  };

  if (loading) {
    return (
      <section
        id="home"
        className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
          isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
        }`}
      >
        <Loader variant="spinner" text="Loading Portfolio..." />
      </section>
    );
  }

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-3xl animate-gentle-glow animate-bubble-float"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-3xl animate-gentle-glow animate-bubble-float delay-500"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-br from-blue-500/15 to-purple-500/15 rounded-full blur-3xl animate-gentle-glow animate-bubble-float delay-1000"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6"
            >
              <Badge variant="outline" className="px-4 py-2 text-sm border-primary-500 text-primary-500 dark:border-accent-500 dark:text-accent-500">
                ✨ {infoToDisplay?.availability || "Available for opportunities"}
              </Badge>
            </motion.div>

            {/* Name & Title */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                Hi, I'm{" "}
                <span className="gradient-text">
                  {infoToDisplay?.name || "Developer"}
                </span>
              </h1>
              <h2 className={`text-2xl md:text-3xl font-semibold mb-6 ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                {infoToDisplay?.title || "Full Stack Developer"}
              </h2>
              {/* <p className={`text-lg md:text-xl mb-8 max-w-2xl ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                {infoToDisplay?.bio || "Building amazing web experiences"}
              </p> */}
            </motion.div>

           {/* CTA Buttons */}
            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link to="projects" smooth={true} duration={500}>
                <Button size="lg" className="gap-2 btn-primary">
                  View My Work
                </Button>
              </Link>
              {infoToDisplay?.resumeFile?.url && (
                <Button 
                  variant="outline"
                  size="lg"
                  className="gap-2 btn-secondary"
                  asChild
                >
                  <a 
                    href={infoToDisplay.resumeFile.url}
                    download="resume"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiDownload /> Download Resume
                  </a>
                </Button>
              )}
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              {infoToDisplay?.socialLinks?.github && (
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={infoToDisplay.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <FiGithub className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {infoToDisplay?.socialLinks?.linkedin && (
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={infoToDisplay.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {infoToDisplay?.socialLinks?.email && (
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={infoToDisplay.socialLinks.email}
                    aria-label="Email"
                  >
                    <FiMail className="w-5 h-5" />
                  </a>
                </Button>
              )}
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-full max-w-md max-h-md rounded-full bg-gradient-to-br from-primary-500/30 to-accent-500/30 blur-2xl animate-spin-slow opacity-70"></div>
            </div>
            <Avatar
              size="3xl"
              glow={true}
              className="relative z-10 shadow-lg transition-all duration-300 hover:shadow-xl h-40 w-40 text-3xl lg:h-[50%] lg:w-[50%] lg:text-5xl"
            >
              <AvatarImage
                src={getProfileImage()}
                alt={infoToDisplay?.name || "Profile"}
              />
              <AvatarFallback className="bg-gradient-to-br from-primary-500 to-accent-500 text-white font-semibold">
                {infoToDisplay?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <Link to="about" smooth={true} duration={500}>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="cursor-pointer"
            >
              <div className={`w-6 h-10 rounded-full border-2 ${
                isDarkMode ? 'border-primary-400' : 'border-primary-600'
              } flex justify-center p-2`}>
                <div className={`w-1 h-2 rounded-full ${
                  isDarkMode ? 'bg-primary-400' : 'bg-primary-600'
                } animate-pulse`}></div>
              </div>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSection;
