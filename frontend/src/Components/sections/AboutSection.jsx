import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { usePersonalInfo } from "@/hooks/usePortfolio";
import { getAllSkills } from "@/api/portfolioApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  FiCode, FiAward, FiCpu, FiCheckCircle,
  FiMapPin, FiMail, FiPhone
} from "react-icons/fi";
import Loader from "@/Components/common/Loader";

// Icon mapping
const iconMap = {
  FiCode, FiAward, FiCpu, FiCheckCircle
};

const AboutSection = () => {
  const { isDarkMode } = useTheme();
  const { personalInfo: apiPersonalInfo, loading, error } = usePersonalInfo();
  
  const [infoToDisplay, setInfoToDisplay] = useState(null);
  const [statsToDisplay, setStatsToDisplay] = useState([]);
  const [skills, setSkills] = useState([]);
  const [skillsLoading, setSkillsLoading] = useState(true);

  // Fetch personal info
  useEffect(() => {
    if (apiPersonalInfo) {
      const data = apiPersonalInfo?.data || apiPersonalInfo;
      console.log('AboutSection data:', data);
      
      setInfoToDisplay(data);
      
      // Convert statistics object to array for display
      if (data?.statistics) {
        const statsArray = [
          { label: 'Years of Experience', value: data.statistics.yearsOfExperience || 0, icon: 'FiCode' },
          { label: 'Projects Completed', value: data.statistics.projectsCompleted || 0, icon: 'FiAward' },
          { label: 'Happy Clients', value: data.statistics.happyClients || 0, icon: 'FiCpu' },
          { label: 'Certificates Earned', value: data.statistics.certificatesEarned || 0, icon: 'FiCheckCircle' }
        ];
        setStatsToDisplay(statsArray);
      }
    }
  }, [apiPersonalInfo]);

  // Fetch skills for Quick Skills tab
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const data = await getAllSkills();
        const skillsArray = Array.isArray(data) ? data : (data?.data || []);
        console.log('Fetched skills for About tab:', skillsArray);
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader variant="spinner" text="Loading personal info..." />
      </div>
    );
  }

  if (error || !infoToDisplay) {
    return (
      <div className={`text-center py-12 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
        {error || "Failed to load information"}
      </div>
    );
  }

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

  // Get profile image URL
  const profileImageUrl = infoToDisplay?.profileImage?.url || infoToDisplay?.profileImage;
  const locationText = infoToDisplay?.location?.city && infoToDisplay?.location?.country 
    ? `${infoToDisplay.location.city}, ${infoToDisplay.location.country}`
    : infoToDisplay?.location;

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
                      src={profileImageUrl}
                      alt={infoToDisplay?.name}
                    />
                    <AvatarFallback className="text-3xl">
                      {infoToDisplay?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h3 className={`text-2xl font-bold ${
                      isDarkMode ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {infoToDisplay?.name}
                    </h3>
                    <p className="text-primary-500 font-medium mt-1">
                      {infoToDisplay?.title}
                    </p>
                  </div>

                  <div className={`space-y-2 text-sm ${
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {locationText && (
                      <div className="flex items-center gap-2 justify-center">
                        <FiMapPin className="w-4 h-4" />
                        <span>{locationText}</span>
                      </div>
                    )}
                    {infoToDisplay?.email && (
                      <div className="flex items-center gap-2 justify-center">
                        <FiMail className="w-4 h-4" />
                        <span>{infoToDisplay.email}</span>
                      </div>
                    )}
                    {infoToDisplay?.phone && (
                      <div className="flex items-center gap-2 justify-center">
                        <FiPhone className="w-4 h-4" />
                        <span>{infoToDisplay.phone}</span>
                      </div>
                    )}
                  </div>

                  <Badge variant="outline" className="mt-4">
                    {infoToDisplay?.title || "Building Digital Experiences"}
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
              <TabsList className="grid w-full grid-cols-2 bg-transparent p-0 h-auto gap-2 mb-6">
                <TabsTrigger 
                  value="bio"
                  className={`data-[state=active]:bg-primary-500 data-[state=active]:text-white px-6 py-2 rounded-lg font-semibold transition-all ${
                    isDarkMode 
                      ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' 
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  Biography
                </TabsTrigger>
                <TabsTrigger 
                  value="skills"
                  className={`data-[state=active]:bg-primary-500 data-[state=active]:text-white px-6 py-2 rounded-lg font-semibold transition-all ${
                    isDarkMode 
                      ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700' 
                      : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                  }`}
                >
                  Quick Skills
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bio">
                <Card className={isDarkMode 
                  ? 'bg-neutral-900 border-neutral-800' 
                  : 'bg-white border-neutral-200'
                }>
                  <CardHeader>
                    <CardTitle>About Me</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                      {infoToDisplay?.bio}
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
                    {/* Loading state for skills */}
                    {skillsLoading && (
                      <div className="flex items-center justify-center py-4">
                        <Loader variant="spinner" size="small" text="Loading skills..." />
                      </div>
                    )}

                    {/* Show skills if available */}
                    {!skillsLoading && skills.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill, idx) => (
                          <Badge key={idx} variant="secondary">
                            {skill.name}
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* No skills message */}
                    {!skillsLoading && skills.length === 0 && (
                      <div className={`text-center py-4 ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
                        <p className="text-sm">No skills added yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>


      </div>
    </section>
  );
};

export default AboutSection;