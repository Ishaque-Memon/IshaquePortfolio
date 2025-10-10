import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { personalInfo, stats } from "@/data/portfolioData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FiCode, FiAward, FiCpu, FiCheckCircle,
  FiMapPin, FiMail, FiPhone
} from "react-icons/fi";

// Icon mapping
const iconMap = {
  FiCode, FiAward, FiCpu, FiCheckCircle
};

const AboutSection = () => {
  const { isDarkMode } = useTheme();

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
      id="about"
      className={`min-h-screen py-20 ${
        isDarkMode ? 'bg-neutral-950' : 'bg-neutral-50'
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
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">About Me</span>
          </h2>
          <p className={`text-lg ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Get to know more about me
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-1"
          >
            <Card className={`${
              isDarkMode 
                ? 'bg-neutral-900 border-neutral-800' 
                : 'bg-white border-neutral-200'
            }`}>
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center space-y-4">
                  <Avatar className="w-32 h-32 ring-4 ring-primary-500/20">
                    <AvatarImage 
                      src={personalInfo.profileImageAlt || personalInfo.profileImage} 
                      alt={personalInfo.name}
                    />
                    <AvatarFallback className="text-3xl">
                      {personalInfo.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {personalInfo.name}
                    </h3>
                    <p className="text-primary-500 font-medium mt-1">
                      {personalInfo.title}
                    </p>
                  </div>

                  <div className={`space-y-2 text-sm ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {personalInfo.location && (
                      <div className="flex items-center gap-2 justify-center">
                        <FiMapPin className="w-4 h-4" />
                        <span>{personalInfo.location}</span>
                      </div>
                    )}
                    {personalInfo.email && (
                      <div className="flex items-center gap-2 justify-center">
                        <FiMail className="w-4 h-4" />
                        <span>{personalInfo.email}</span>
                      </div>
                    )}
                    {personalInfo.phone && (
                      <div className="flex items-center gap-2 justify-center">
                        <FiPhone className="w-4 h-4" />
                        <span>{personalInfo.phone}</span>
                      </div>
                    )}
                  </div>

                  <Badge variant="outline" className="mt-4">
                    {personalInfo.tagline || "Building Digital Experiences"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Info Tabs */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Tabs defaultValue="bio" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="bio">Biography</TabsTrigger>
                <TabsTrigger value="skills">Quick Skills</TabsTrigger>
              </TabsList>

              <TabsContent value="bio">
                <Card className={isDarkMode 
                  ? 'bg-neutral-900 border-neutral-800' 
                  : 'bg-white border-neutral-200'
                }>
                  <CardHeader>
                    <CardTitle>My Story</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                      {personalInfo.bio}
                    </p>
                    <p className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}>
                      I specialize in building modern web applications using cutting-edge technologies. 
                      My passion lies in creating efficient, scalable, and user-friendly solutions that 
                      make a real impact.
                    </p>
                    <p className={isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}>
                      When I'm not coding, you can find me exploring new technologies, contributing to 
                      open-source projects, or sharing knowledge with the developer community.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="skills">
                <Card className={isDarkMode 
                  ? 'bg-neutral-900 border-neutral-800' 
                  : 'bg-white border-neutral-200'
                }>
                  <CardHeader>
                    <CardTitle>Core Competencies</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {['React.js', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 
                        'SQL Server', 'Express.js', 'Tailwind CSS', 'Git', 'REST APIs',
                        'JWT Auth', 'Azure', 'Responsive Design', 'Problem Solving'
                      ].map((skill, idx) => (
                        <Badge key={idx} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>

        {/* Stats Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {stats.map((stat, idx) => {
            const Icon = iconMap[stat.icon] || FiCode;
            
            return (
              <motion.div key={idx} variants={itemVariants}>
                <Card className={`text-center ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' 
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                } transition-all duration-300 hover:shadow-lg`}>
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center space-y-2">
                      <div className="p-3 rounded-full bg-gradient-to-br from-primary-500 to-accent-500">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="text-3xl font-bold gradient-text">
                        {stat.value}
                      </div>
                      <div className={`text-sm ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        {stat.label}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
