import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { fypData } from "@/data/portfolioData";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  FiCode, 
  FiGithub, 
  FiExternalLink, 
  FiPlay,
  FiCheckCircle,
  FiUsers,
  FiCalendar,
  FiAward
} from "react-icons/fi";

const FYPSectionNew = () => {
  const { isDarkMode } = useTheme();
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      id="fyp"
      className={`min-h-screen py-20 ${
        isDarkMode ? 'bg-neutral-900' : 'bg-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <FiAward className="w-8 h-8 text-primary-500" />
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Final Year Project</span>
            </h2>
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Capstone project showcasing technical expertise
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Main Project Card */}
          <motion.div variants={itemVariants}>
            <Card className={`${
              isDarkMode 
                ? 'bg-neutral-800 border-neutral-700' 
                : 'bg-white border-neutral-200'
            }`}>
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div>
                    <CardTitle className={`text-3xl mb-2 ${
                      isDarkMode ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {fypData.title}
                    </CardTitle>
                    <CardDescription className="text-lg">
                      {fypData.subtitle}
                    </CardDescription>
                  </div>
                  
                  <Badge variant="outline" className="self-start text-base px-4 py-2">
                    <FiCalendar className="w-4 h-4 mr-2" />
                    {fypData.year}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Project Image/Video Thumbnail */}
                {fypData.thumbnail && (
                  <div className="relative rounded-lg overflow-hidden group cursor-pointer"
                    onClick={() => setIsVideoOpen(true)}
                  >
                    <img
                      src={fypData.thumbnail}
                      alt={fypData.title}
                      className="w-full h-auto rounded-lg"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="text-white flex items-center gap-2">
                        <FiPlay className="w-12 h-12" />
                        <span className="text-lg font-semibold">Watch Demo</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <h3 className={`text-xl font-semibold mb-3 ${
                    isDarkMode ? 'text-white' : 'text-neutral-900'
                  }`}>
                    Project Overview
                  </h3>
                  <p className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                    {fypData.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fypData.supervisor && (
                    <div className={`p-4 rounded-lg ${
                      isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'
                    }`}>
                      <div className={`text-sm font-medium mb-1 ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        Supervisor
                      </div>
                      <div className={`flex items-center gap-2 ${
                        isDarkMode ? 'text-white' : 'text-neutral-900'
                      }`}>
                        <FiUsers className="w-4 h-4" />
                        <span>{fypData.supervisor}</span>
                      </div>
                    </div>
                  )}

                  {fypData.teamSize && (
                    <div className={`p-4 rounded-lg ${
                      isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'
                    }`}>
                      <div className={`text-sm font-medium mb-1 ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        Team Size
                      </div>
                      <div className={`flex items-center gap-2 ${
                        isDarkMode ? 'text-white' : 'text-neutral-900'
                      }`}>
                        <FiUsers className="w-4 h-4" />
                        <span>{fypData.teamSize} Members</span>
                      </div>
                    </div>
                  )}

                  {fypData.grade && (
                    <div className={`p-4 rounded-lg ${
                      isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'
                    }`}>
                      <div className={`text-sm font-medium mb-1 ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        Grade
                      </div>
                      <div className={`flex items-center gap-2 ${
                        isDarkMode ? 'text-white' : 'text-neutral-900'
                      }`}>
                        <FiAward className="w-4 h-4" />
                        <span>{fypData.grade}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Technologies */}
                {fypData.technologies && fypData.technologies.length > 0 && (
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-neutral-900'
                    }`}>
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {fypData.technologies.map((tech, idx) => (
                        <Badge key={idx} variant="secondary" className="text-sm">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features Accordion */}
                {fypData.features && fypData.features.length > 0 && (
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-neutral-900'
                    }`}>
                      Key Features
                    </h3>
                    <Accordion type="single" collapsible className="w-full">
                      {fypData.features.map((feature, idx) => (
                        <AccordionItem key={idx} value={`feature-${idx}`}>
                          <AccordionTrigger className={
                            isDarkMode ? 'text-neutral-200' : 'text-neutral-800'
                          }>
                            <div className="flex items-center gap-2">
                              <FiCheckCircle className="w-4 h-4 text-green-500" />
                              {feature.title}
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className={
                            isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                          }>
                            {feature.description}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                )}

                {/* Achievements */}
                {fypData.achievements && fypData.achievements.length > 0 && (
                  <div>
                    <h3 className={`text-lg font-semibold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-neutral-900'
                    }`}>
                      Project Achievements
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {fypData.achievements.map((achievement, idx) => (
                        <div
                          key={idx}
                          className={`flex items-start gap-2 p-3 rounded-lg ${
                            isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'
                          }`}
                        >
                          <FiCheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className={`text-sm ${
                            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                          }`}>
                            {achievement}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4">
                  {fypData.githubUrl && (
                    <Button asChild>
                      <a 
                        href={fypData.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FiGithub className="w-4 h-4" />
                        View Source Code
                      </a>
                    </Button>
                  )}

                  {fypData.liveUrl && (
                    <Button asChild variant="outline">
                      <a 
                        href={fypData.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <FiExternalLink className="w-4 h-4" />
                        Live Demo
                      </a>
                    </Button>
                  )}

                  {fypData.videoUrl && (
                    <Button 
                      variant="outline"
                      onClick={() => setIsVideoOpen(true)}
                      className="flex items-center gap-2"
                    >
                      <FiPlay className="w-4 h-4" />
                      Watch Demo
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Video Dialog */}
        <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
          <DialogContent className={`max-w-5xl ${
            isDarkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white'
          }`}>
            <DialogHeader>
              <DialogTitle>{fypData.title} - Demo</DialogTitle>
              <DialogDescription>Project demonstration video</DialogDescription>
            </DialogHeader>
            <div className="aspect-video w-full bg-black rounded-lg overflow-hidden">
              {fypData.videoUrl ? (
                <video
                  src={fypData.videoUrl}
                  controls
                  className="w-full h-full"
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white">
                  <p>Video not available</p>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default FYPSectionNew;
