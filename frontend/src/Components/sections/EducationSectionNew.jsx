import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { educationData } from "@/data/portfolioData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FiBookOpen, 
  FiCalendar, 
  FiMapPin, 
  FiAward, 
  FiTrendingUp,
  FiCheckCircle 
} from "react-icons/fi";

const EducationSectionNew = () => {
  const { isDarkMode } = useTheme();

  const timelineVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section
      id="education"
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
          <div className="inline-flex items-center gap-2 mb-4">
            <FiBookOpen className="w-8 h-8 text-primary-500" />
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="gradient-text">Education</span>
            </h2>
          </div>
          <p className={`text-lg ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            Academic background and achievements
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={timelineVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {educationData.map((edu, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="relative"
            >
              {/* Timeline Line */}
              {idx !== educationData.length - 1 && (
                <div 
                  className={`absolute left-6 top-20 w-0.5 h-full ${
                    isDarkMode ? 'bg-neutral-800' : 'bg-neutral-200'
                  }`}
                  style={{ marginLeft: '-1px' }}
                />
              )}

              <div className="flex gap-6">
                {/* Timeline Dot */}
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <FiAward className="w-6 h-6 text-white" />
                  </div>
                </div>

                {/* Education Card */}
                <Card className={`flex-1 ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-800' 
                    : 'bg-white border-neutral-200'
                } hover:shadow-lg transition-all duration-300`}>
                  <CardHeader>
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="space-y-2">
                        <CardTitle className={`text-2xl ${
                          isDarkMode ? 'text-white' : 'text-neutral-900'
                        }`}>
                          {edu.degree}
                        </CardTitle>
                        <p className="text-primary-500 font-semibold text-lg">
                          {edu.institution}
                        </p>
                      </div>

                      {edu.gpa && (
                        <Badge 
                          variant="outline" 
                          className="self-start md:self-center text-lg px-4 py-2"
                        >
                          <FiTrendingUp className="w-4 h-4 mr-2" />
                          GPA: {edu.gpa}
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Info Row */}
                    <div className="flex flex-wrap gap-4">
                      {edu.duration && (
                        <div className={`flex items-center gap-2 ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>
                          <FiCalendar className="w-4 h-4" />
                          <span className="text-sm">{edu.duration}</span>
                        </div>
                      )}

                      {edu.location && (
                        <div className={`flex items-center gap-2 ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>
                          <FiMapPin className="w-4 h-4" />
                          <span className="text-sm">{edu.location}</span>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {edu.description && (
                      <p className={isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}>
                        {edu.description}
                      </p>
                    )}

                    {/* Achievements */}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div>
                        <h4 className={`text-sm font-semibold mb-3 ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>
                          Key Achievements
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {edu.achievements.map((achievement, achIdx) => (
                            <div
                              key={achIdx}
                              className={`flex items-start gap-2 p-3 rounded-lg ${
                                isDarkMode 
                                  ? 'bg-neutral-800' 
                                  : 'bg-neutral-50'
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

                    {/* Coursework */}
                    {edu.coursework && edu.coursework.length > 0 && (
                      <div>
                        <h4 className={`text-sm font-semibold mb-3 ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>
                          Relevant Coursework
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {edu.coursework.map((course, courseIdx) => (
                            <Badge key={courseIdx} variant="secondary">
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Projects */}
                    {edu.projects && edu.projects.length > 0 && (
                      <div>
                        <h4 className={`text-sm font-semibold mb-3 ${
                          isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                        }`}>
                          Academic Projects
                        </h4>
                        <div className="space-y-2">
                          {edu.projects.map((project, projIdx) => (
                            <div
                              key={projIdx}
                              className={`text-sm ${
                                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                              }`}
                            >
                              • {project}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Status */}
                    {edu.status && (
                      <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800">
                        <Badge 
                          variant={edu.status === 'Completed' ? 'default' : 'outline'}
                          className="text-sm"
                        >
                          {edu.status}
                        </Badge>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className={`${
            isDarkMode 
              ? 'bg-gradient-to-r from-primary-900/20 to-accent-900/20 border-primary-800/50' 
              : 'bg-gradient-to-r from-primary-50 to-accent-50 border-primary-200'
          }`}>
            <CardContent className="p-6 text-center">
              <p className={`text-lg ${
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              }`}>
                Continuously learning and expanding my knowledge through online courses, workshops, 
                and hands-on projects to stay current with the latest technologies.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSectionNew;
