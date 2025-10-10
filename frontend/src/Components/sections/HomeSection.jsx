import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { useTheme } from "@/contexts/ThemeContext";
import { personalInfo } from "@/data/portfolioData";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FiGithub, FiLinkedin, FiMail, FiDownload } from "react-icons/fi";

const HomeSection = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="home"
      className={`min-h-screen flex items-center justify-center relative overflow-hidden ${
        isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
      }`}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/20 to-accent-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/20 to-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
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
              <Badge variant="outline" className="px-4 py-2 text-sm">
                ✨ {personalInfo.availability || "Available for opportunities"}
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
                  {personalInfo.name}
                </span>
              </h1>
              <h2 className={`text-2xl md:text-3xl font-semibold mb-6 ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                {personalInfo.title}
              </h2>
              <p className={`text-lg md:text-xl mb-8 max-w-2xl ${
                isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
              }`}>
                {personalInfo.bio}
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <Link to="projects" smooth={true} duration={500}>
                <Button size="lg" className="gap-2">
                  View My Work
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="gap-2" asChild>
                <a href={personalInfo.resumePdf} download>
                  <FiDownload /> Download Resume
                </a>
              </Button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex gap-4"
            >
              {personalInfo.socialLinks?.github && (
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                  >
                    <FiGithub className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {personalInfo.socialLinks?.linkedin && (
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin className="w-5 h-5" />
                  </a>
                </Button>
              )}
              {personalInfo.socialLinks?.email && (
                <Button variant="ghost" size="icon" asChild>
                  <a
                    href={personalInfo.socialLinks.email}
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
            className="flex justify-center lg:justify-end"
          >
            <Card className={`overflow-hidden ${
              isDarkMode 
                ? 'bg-neutral-900/50 border-neutral-800' 
                : 'bg-white border-neutral-200'
            }`}>
              <CardContent className="p-0">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <img
                    src={personalInfo.profileImage}
                    alt={personalInfo.name}
                    className="w-full h-auto max-w-md rounded-lg"
                    onError={(e) => {
                      e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(personalInfo.name)}&size=400&background=6366f1&color=fff`;
                    }}
                  />
                </div>
              </CardContent>
            </Card>
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
                isDarkMode ? 'border-neutral-600' : 'border-neutral-400'
              } flex justify-center p-2`}>
                <div className={`w-1 h-2 rounded-full ${
                  isDarkMode ? 'bg-neutral-400' : 'bg-neutral-600'
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
