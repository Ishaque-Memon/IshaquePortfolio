import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { getAllEducation } from "@/api/portfolioApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FiBookOpen,
  FiCalendar,
  FiMapPin,
  FiAward,
  FiTrendingUp,
  FiCheckCircle,
  FiStar,
  FiLink,
} from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import Loader from "@/Components/common/Loader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Enhanced EducationSection with ModernEducation design
 * - Fetches education data from API
 * - Timeline layout with alternating cards
 * - GSAP scroll animations
 * - Stats section at bottom
 */
const EducationSection = () => {
  const { isDarkMode } = useTheme();
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const formatDateShort = (dateStr) => {
      if (!dateStr) return "";
      const [year, month] = dateStr.split("-");
      if (!month) return year;
      return `${month}/${year}`;
    };

    const computeDuration = (startDate, endDate, isPresent) => {
      if (!startDate && !endDate) return "";
      if (isPresent) {
        return `${formatDateShort(startDate)} - Present`;
      }
      return `${formatDateShort(startDate)} - ${formatDateShort(endDate)}`;
    };

    const normalizeItem = (e) => {
      const institution =
        e.institution ||
        e.school ||
        e.college ||
        e.institute ||
        e.university ||
        e.customInstitution ||
        e.board ||
        "";

      const gpa = e.gpa ?? e.grade ?? e.cgpa ?? "";

      const achievements =
        Array.isArray(e.achievements) && e.achievements.length > 0
          ? e.achievements
          : Array.isArray(e.awards) && e.awards.length > 0
          ? e.awards
          : Array.isArray(e.keyAchievements) && e.keyAchievements.length > 0
          ? e.keyAchievements
          : Array.isArray(e.highlights) && e.highlights.length > 0
          ? e.highlights
          : [];

      const coursework =
        Array.isArray(e.coursework)
          ? e.coursework
          : Array.isArray(e.courses)
          ? e.courses
          : [];

      const projects =
        Array.isArray(e.projects)
          ? e.projects
          : Array.isArray(e.academicProjects)
          ? e.academicProjects
          : [];

      const description = e.description ?? e.about ?? "";
      const academicDescription = e.academicDescription ?? "";
      const status = e.educationStatus ?? (e.isPresent ? "InProgress" : "Completed");
      const logoUrl = e.logoUrl ?? "";

      return {
        _id: e._id || e.id || `${Math.random()}`,
        degree: e.degree || e.degreeName || e.title || "",
        institution,
        gpa,
        duration: e.duration || computeDuration(e.startDate, e.endDate, e.isPresent),
        location: e.location || e.city || "",
        description,
        achievements,
        coursework,
        projects,
        status,
        logoUrl,
        academicDescription,
        icon: e.icon || "HiAcademicCap",
      };
    };

    const fetchEducationData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getAllEducation();

        const payload =
          Array.isArray(response)
            ? response
            : response?.data ?? response?.payload ?? [];

        const educationArray = Array.isArray(payload)
          ? payload.map(normalizeItem)
          : [];
        setEducationData(educationArray);
      } catch (err) {
        console.error("Education fetch error:", err);
        setError("Failed to load education data.");
        setEducationData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEducationData();
  }, []);

  useEffect(() => {
    const timelineItems = timelineRef.current?.querySelectorAll(".timeline-item");

    if (timelineItems && timelineItems.length > 0) {
      gsap.fromTo(
        timelineItems,
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, [educationData]);

  const getIconComponent = (iconName) => {
    const iconMap = {
      HiAcademicCap: HiAcademicCap,
      FiBookOpen: FiBookOpen,
      FiTrendingUp: FiTrendingUp,
      FiAward: FiAward,
    };
    return iconMap[iconName] || HiAcademicCap;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Calculate stats from data
  const stats = educationData.length > 0 ? [
    {
      label: "Education Entries",
      value: educationData.length.toString(),
      icon: FiCalendar,
    },
    {
      label: "Academic Status",
      value: educationData[0]?.status || "N/A",
      icon: HiAcademicCap,
    },
    {
      label: "Total Projects",
      value: educationData.reduce((acc, edu) => acc + (edu.projects?.length || 0), 0).toString(),
      icon: FiBookOpen,
    },
  ] : [];

  if (loading) {
    return (
      <section
        id="education"
        className={`py-20 lg:py-32 ${
          isDarkMode ? "bg-neutral-900" : "bg-neutral-50"
        } transition-colors duration-300`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-64">
            <Loader variant="spinner" text="Loading Education..." />
          </div>
        </div>
      </section>
    );
  }

  if (error && educationData.length === 0) {
    return (
      <section
        id="education"
        className={`py-20 lg:py-32 ${
          isDarkMode ? "bg-neutral-900" : "bg-neutral-50"
        } transition-colors duration-300`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <p className="text-red-500 mb-4">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="education"
      ref={sectionRef}
      className={`py-20 lg:py-32 ${
        isDarkMode ? "bg-neutral-900" : "bg-neutral-50"
      } transition-colors duration-300 relative overflow-hidden`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary-500/10 to-accent-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent-500/10 to-primary-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2
            className={`text-4xl lg:text-5xl font-bold mb-6 ${
              isDarkMode ? "text-white" : "text-neutral-900"
            }`}
          >
            Educational <span className="gradient-text">Journey</span>
          </h2>
          <p
            className={`text-xl max-w-3xl mx-auto ${
              isDarkMode ? "text-neutral-300" : "text-neutral-700"
            }`}
          >
            My academic path has been focused on building a strong foundation in
            computer science and continuously expanding my knowledge in emerging
            technologies
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mt-8"></div>
        </motion.div>

        {/* Education Timeline */}
        {educationData.length > 0 ? (
          <motion.div
            ref={timelineRef}
            className="relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Timeline Line */}
            <div
              className={`absolute left-8 lg:left-1/2 top-0 w-0.5 h-full transform lg:-translate-x-px ${
                isDarkMode ? "bg-neutral-700" : "bg-neutral-300"
              }`}
            ></div>

            {educationData.map((education, index) => {
              const IconComponent = getIconComponent(education.icon);
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={education._id}
                  className={`timeline-item relative flex items-center mb-16 ${
                    isEven ? "lg:flex-row-reverse" : ""
                  }`}
                  variants={itemVariants}
                >
                  {/* Timeline Icon */}
                  <div
                    className={`absolute left-6 lg:left-1/2 w-6 h-6 transform lg:-translate-x-3 z-10 flex items-center justify-center rounded-full border-4 ${
                      isDarkMode
                        ? "bg-neutral-900 border-neutral-700"
                        : "bg-white border-neutral-300"
                    }`}
                  >
                    <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                  </div>

                  {/* Education Card */}
                  <div
                    className={`ml-16 lg:ml-0 w-full lg:w-5/12 ${
                      isEven ? "lg:pr-12" : "lg:pl-12"
                    }`}
                  >
                    <motion.div whileHover={{ y: -5 }}>
                      <Card
                        className={`p-8 rounded-3xl border transition-all duration-500 hover:shadow-xl ${
                          isDarkMode
                            ? "bg-neutral-800 border-neutral-700 hover:border-neutral-600"
                            : "bg-white border-neutral-200 hover:border-neutral-300"
                        }`}
                      >
                        {/* Header */}
                        <CardHeader className="p-0 mb-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-center space-x-3">
                              {education.logoUrl ? (
                                <Avatar className="h-12 w-12 border-2 border-primary-500/50">
                                  <AvatarImage
                                    src={education.logoUrl}
                                    alt={`${education.institution} logo`}
                                    className="object-fit"
                                  />
                                  <AvatarFallback>
                                    <IconComponent className="h-6 w-6 text-primary-500" />
                                  </AvatarFallback>
                                </Avatar>
                              ) : (
                                <div className="p-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl">
                                  <IconComponent
                                    className={`w-6 h-6 ${
                                      isDarkMode
                                        ? "text-primary-400"
                                        : "text-primary-600"
                                    }`}
                                  />
                                </div>
                              )}
                              <div className="flex flex-col">
                                <Badge
                                  variant={
                                    education.status === "Graduated" ||
                                    education.status === "Completed"
                                      ? "default"
                                      : "outline"
                                  }
                                  className={`text-xs font-semibold ${
                                    education.status === "Graduated" ||
                                    education.status === "Completed"
                                      ? "bg-green-500/20 text-green-400 border-green-500/30"
                                      : "bg-blue-500/20 text-blue-400 border-blue-500/30"
                                  }`}
                                >
                                  {education.status}
                                </Badge>
                                {education.logoUrl && (
                                  <a
                                    href={education.logoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`flex items-center space-x-1 text-xs mt-1 ${
                                      isDarkMode
                                        ? "text-neutral-400 hover:text-primary-400"
                                        : "text-neutral-600 hover:text-primary-600"
                                    } transition-colors`}
                                  >
                                  </a>
                                )}
                              </div>
                            </div>
                            <div
                              className={`text-right ${
                                isDarkMode
                                  ? "text-neutral-400"
                                  : "text-neutral-600"
                              }`}
                            >
                              {education.duration && (
                                <div className="flex items-center space-x-1 text-sm mb-1">
                                  <FiCalendar className="w-4 h-4" />
                                  <span>{education.duration}</span>
                                </div>
                              )}
                              {education.location && (
                                <div className="flex items-center space-x-1 text-sm">
                                  <FiMapPin className="w-4 h-4" />
                                  <span>{education.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </CardHeader>

                        <CardContent className="p-0">
                          {/* Degree Info */}
                          <CardTitle
                            className={`text-xl lg:text-2xl mb-2 ${
                              isDarkMode ? "text-white" : "text-neutral-900"
                            }`}
                          >
                            {education.degree}
                          </CardTitle>
                          <h4
                            className={`text-lg font-semibold mb-4 ${
                              isDarkMode
                                ? "text-primary-400"
                                : "text-primary-600"
                            }`}
                          >
                            {education.institution}
                          </h4>

                          {/* GPA/Grade */}
                          {education.gpa && (
                            <div className="flex items-center space-x-2 mb-4">
                              <FiStar
                                className={`w-5 h-5 ${
                                  isDarkMode
                                    ? "text-yellow-400"
                                    : "text-yellow-500"
                                }`}
                              />
                              <span
                                className={`font-semibold ${
                                  isDarkMode ? "text-white" : "text-neutral-900"
                                }`}
                              >
                                {education.gpa.toString().includes(".")
                                  ? `CGPA: ${education.gpa}`
                                  : `Grade: ${education.gpa}`}
                              </span>
                            </div>
                          )}

                          {/* Description */}
                          {education.description && (
                            <p
                              className={`mb-6 leading-relaxed ${
                                isDarkMode
                                  ? "text-neutral-300"
                                  : "text-neutral-700"
                              }`}
                            >
                              {education.description}
                            </p>
                          )}

                          {/* Academic Description */}
                          {education.academicDescription && (
                            <div className="mb-6">
                              <h5
                                className={`text-sm font-semibold mb-3 ${
                                  isDarkMode ? "text-white" : "text-neutral-900"
                                }`}
                              >
                                Academic Details:
                              </h5>
                              <p
                                className={`leading-relaxed ${
                                  isDarkMode
                                    ? "text-neutral-300"
                                    : "text-neutral-700"
                                }`}
                              >
                                {education.academicDescription}
                              </p>
                            </div>
                          )}

                          {/* Achievements/Highlights */}
                          {education.achievements &&
                            education.achievements.length > 0 && (
                              <div className="mb-6">
                                <h5
                                  className={`text-sm font-semibold mb-3 ${
                                    isDarkMode
                                      ? "text-white"
                                      : "text-neutral-900"
                                  }`}
                                >
                                  Key Achievements:
                                </h5>
                                <ul className="space-y-2">
                                  {education.achievements.map(
                                    (highlight, idx) => (
                                      <li
                                        key={idx}
                                        className={`flex items-center space-x-2 text-sm ${
                                          isDarkMode
                                            ? "text-neutral-300"
                                            : "text-neutral-700"
                                        }`}
                                      >
                                        <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                                        <span>{highlight}</span>
                                      </li>
                                    )
                                  )}
                                </ul>
                              </div>
                            )}

                          {/* Coursework */}
                          {education.coursework &&
                            education.coursework.length > 0 && (
                              <div className="mb-6">
                                <h5
                                  className={`text-sm font-semibold mb-3 ${
                                    isDarkMode
                                      ? "text-white"
                                      : "text-neutral-900"
                                  }`}
                                >
                                  Key Subjects:
                                </h5>
                                <div className="flex flex-wrap gap-2">
                                  {education.coursework.map((course, idx) => (
                                    <Badge
                                      key={idx}
                                      variant="secondary"
                                      className={`px-3 py-1 text-xs ${
                                        isDarkMode
                                          ? "bg-neutral-700 text-neutral-300"
                                          : "bg-neutral-100 text-neutral-700"
                                      }`}
                                    >
                                      {course}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                          {/* Projects */}
                          {education.projects &&
                            education.projects.length > 0 && (
                              <div>
                                <h5
                                  className={`text-sm font-semibold mb-3 ${
                                    isDarkMode
                                      ? "text-white"
                                      : "text-neutral-900"
                                  }`}
                                >
                                  Academic Projects:
                                </h5>
                                <ul className="space-y-2">
                                  {education.projects.map((project, idx) => (
                                    <li
                                      key={idx}
                                      className={`flex items-start space-x-2 text-sm ${
                                        isDarkMode
                                          ? "text-neutral-300"
                                          : "text-neutral-700"
                                      }`}
                                    >
                                      <span>•</span>
                                      <span>{project}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                        </CardContent>
                      </Card>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          <div
            className={`text-center py-12 ${
              isDarkMode ? "text-neutral-400" : "text-neutral-600"
            }`}
          >
            <FiBookOpen className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium">No education data available yet</p>
            <p className="text-sm mt-2">
              Add education entries from the admin panel to display them here
            </p>
          </div>
        )}

        {/* Stats Section */}
        {educationData.length > 0 && stats.length > 0 && (
          <motion.div
            className="mt-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      className={`text-center p-6 rounded-2xl border ${
                        isDarkMode
                          ? "bg-neutral-800 border-neutral-700"
                          : "bg-white border-neutral-200"
                      }`}
                    >
                      <CardContent className="p-0">
                        <div className="flex justify-center mb-4">
                          <div className="p-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl">
                            <IconComponent
                              className={`w-6 h-6 ${
                                isDarkMode
                                  ? "text-primary-400"
                                  : "text-primary-600"
                              }`}
                            />
                          </div>
                        </div>
                        <h3
                          className={`text-3xl font-bold mb-2 ${
                            isDarkMode ? "text-white" : "text-neutral-900"
                          }`}
                        >
                          {stat.value}
                        </h3>
                        <p
                          className={`${
                            isDarkMode ? "text-neutral-300" : "text-neutral-700"
                          }`}
                        >
                          {stat.label}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EducationSection;