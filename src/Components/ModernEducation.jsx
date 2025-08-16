import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiCalendar, FiMapPin, FiAward, FiBookOpen, FiTrendingUp, FiStar } from "react-icons/fi";
import { HiAcademicCap } from "react-icons/hi";
import { useTheme } from "../contexts/ThemeContext.jsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ModernEducation = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    
    if (timelineItems) {
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
            toggleActions: "play none none reverse"
          }
        }
      );
    }
  }, []);

  const educationData = [
    {
      id: 1,
      degree: "Bachelor of Software Engineering",
      institution: "Quaid-e-Awam University of Engineering, Science & Technology",
      location: "Nawabshah, Pakistan",
      duration: "2020 - 2025",
      status: "Graduated",
      cgpa: "3.18",
      description: "Completed Software Engineering degree with specialization in web development and database systems. Developed strong foundation in programming, software architecture, and modern development frameworks.",
      highlights: [
        "Final Year Project: STUDENT CENTRIC LMS V2.0 (OBE System) - 3-member team",
        "Role: Assistant Group Leader in FYP team",
        "CGPA: 3.18/4.0",
        "Specialized in Full Stack Development",
        "Completed major projects in React.js and Node.js"
      ],
      courses: [
        "Software Engineering",
        "Data Structures & Algorithms",
        "Database Systems",
        "Web Development",
        "Mobile App Development",
        "Software Architecture"
      ],
      icon: HiAcademicCap
    },
    {
      id: 2,
      degree: "Intermediate in Pre-Engineering",
      institution: "Govt. Degree College",
      location: "Thatta, Pakistan", 
      duration: "2018 - 2020",
      status: "Completed",
      grade: "A",
      description: "Completed pre-engineering studies with focus on Mathematics, Physics, and Chemistry. Built analytical foundation for engineering studies.",
      highlights: [
        "Strong performance in Mathematics",
        "Good understanding of Physics concepts", 
        "Completed with A Grade",
        "Prepared for engineering entrance"
      ],
      courses: [
        "Advanced Mathematics",
        "Physics",
        "Chemistry", 
        "English",
        "Urdu",
        "Computer Science"
      ],
      icon: FiBookOpen
    },
    {
      id: 3,
      degree: "Matriculation",
      institution: "Mehleej Higher Secondary School",
      location: "Hyderabad, Pakistan",
      duration: "2016 - 2018",
      status: "Completed",
      grade: "A",
      description: "Completed matriculation with good grades in science subjects. Developed foundation in core subjects and interest in technology.",
      highlights: [
        "Good performance in Science subjects",
        "Strong foundation in Mathematics",
        "Completed with A Grade", 
        "Developed interest in Computer Science"
      ],
      courses: [
        "Mathematics",
        "Physics",
        "Chemistry",
        "Biology",
        "English",
        "Computer Science"
      ],
      icon: FiTrendingUp
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="education"
      ref={sectionRef}
      className={`py-20 lg:py-32 ${
        isDarkMode ? 'bg-neutral-900' : 'bg-neutral-50'
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
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-neutral-900'
          }`}>
            Educational <span className="gradient-text">Journey</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            My academic path has been focused on building a strong foundation in computer science
            and continuously expanding my knowledge in emerging technologies
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mt-8"></div>
        </motion.div>

        {/* Education Timeline */}
        <motion.div
          ref={timelineRef}
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Timeline Line */}
          <div className={`absolute left-8 lg:left-1/2 top-0 w-0.5 h-full transform lg:-translate-x-px ${
            isDarkMode ? 'bg-neutral-700' : 'bg-neutral-300'
          }`}></div>

          {educationData.map((education, index) => {
            const IconComponent = education.icon;
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={education.id}
                className={`timeline-item relative flex items-center mb-16 ${
                  isEven ? 'lg:flex-row-reverse' : ''
                }`}
                variants={itemVariants}
              >
                {/* Timeline Icon */}
                <div className={`absolute left-6 lg:left-1/2 w-6 h-6 transform lg:-translate-x-3 z-10 flex items-center justify-center rounded-full border-4 ${
                  isDarkMode 
                    ? 'bg-neutral-900 border-neutral-700' 
                    : 'bg-white border-neutral-300'
                }`}>
                  <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"></div>
                </div>

                {/* Education Card */}
                <div className={`ml-16 lg:ml-0 w-full lg:w-5/12 ${
                  isEven ? 'lg:pr-12' : 'lg:pl-12'
                }`}>
                  <motion.div
                    className={`p-8 rounded-3xl border transition-all duration-500 hover:shadow-xl ${
                      isDarkMode 
                        ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600' 
                        : 'bg-white border-neutral-200 hover:border-neutral-300'
                    }`}
                    whileHover={{ y: -5 }}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl">
                          <IconComponent className={`w-6 h-6 ${
                            isDarkMode ? 'text-primary-400' : 'text-primary-600'
                          }`} />
                        </div>
                        <div>
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                            education.status === 'Graduated' 
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}>
                            {education.status}
                          </span>
                        </div>
                      </div>
                      <div className={`text-right ${
                        isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                      }`}>
                        <div className="flex items-center space-x-1 text-sm mb-1">
                          <FiCalendar className="w-4 h-4" />
                          <span>{education.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm">
                          <FiMapPin className="w-4 h-4" />
                          <span>{education.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Degree Info */}
                    <h3 className={`text-xl lg:text-2xl font-bold mb-2 ${
                      isDarkMode ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {education.degree}
                    </h3>
                    <h4 className={`text-lg font-semibold mb-4 ${
                      isDarkMode ? 'text-primary-400' : 'text-primary-600'
                    }`}>
                      {education.institution}
                    </h4>

                    {/* CGPA/Grade */}
                    <div className="flex items-center space-x-2 mb-4">
                      <FiStar className={`w-5 h-5 ${
                        isDarkMode ? 'text-yellow-400' : 'text-yellow-500'
                      }`} />
                      <span className={`font-semibold ${
                        isDarkMode ? 'text-white' : 'text-neutral-900'
                      }`}>
                        {education.cgpa ? `CGPA: ${education.cgpa}` : `Grade: ${education.grade}`}
                      </span>
                    </div>

                    {/* Description */}
                    <p className={`mb-6 leading-relaxed ${
                      isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      {education.description}
                    </p>

                    {/* Highlights */}
                    <div className="mb-6">
                      <h5 className={`text-sm font-semibold mb-3 ${
                        isDarkMode ? 'text-white' : 'text-neutral-900'
                      }`}>
                        Key Achievements:
                      </h5>
                      <ul className="space-y-2">
                        {education.highlights.map((highlight) => (
                          <li key={highlight} className={`flex items-center space-x-2 text-sm ${
                            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                          }`}>
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Courses */}
                    <div>
                      <h5 className={`text-sm font-semibold mb-3 ${
                        isDarkMode ? 'text-white' : 'text-neutral-900'
                      }`}>
                        Key Subjects:
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        {education.courses.map((course) => (
                          <span
                            key={course}
                            className={`px-3 py-1 rounded-lg text-xs font-medium ${
                              isDarkMode 
                                ? 'bg-neutral-700 text-neutral-300' 
                                : 'bg-neutral-100 text-neutral-700'
                            }`}
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: "Years of Education", value: "9", icon: FiCalendar },
              { label: "Academic Status", value: "Graduate", icon: HiAcademicCap },
              { label: "Team Projects", value: "1", icon: FiBookOpen }
            ].map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={index}
                  className={`text-center p-6 rounded-2xl border ${
                    isDarkMode 
                      ? 'bg-neutral-800 border-neutral-700' 
                      : 'bg-white border-neutral-200'
                  }`}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-r from-primary-500/20 to-accent-500/20 rounded-xl">
                      <IconComponent className={`w-6 h-6 ${
                        isDarkMode ? 'text-primary-400' : 'text-primary-600'
                      }`} />
                    </div>
                  </div>
                  <h3 className={`text-3xl font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-neutral-900'
                  }`}>
                    {stat.value}
                  </h3>
                  <p className={`${
                    isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    {stat.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernEducation;
