import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { counterData } from "@/data/portfolioData";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FiCode, 
  FiUsers, 
  FiAward, 
  FiCoffee, 
  FiGitBranch, 
  FiTarget,
  FiTrendingUp,
  FiHeart
} from "react-icons/fi";
import { FaLinkedin } from "react-icons/fa";

// Icon mapping
const iconMap = {
  FiCode,
  FiUsers,
  FiAward,
  FaCoffee: FiCoffee,
  FaLinkedin,
  FiGitBranch,
  FiTarget,
  FiTrendingUp,
  FiHeart
};

const CounterSection = () => {
  const { isDarkMode } = useTheme();
  const sectionRef = useRef(null);

  // Counter animation hook
  const useCounter = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const countRef = useRef(count);
    const ref = useRef();

    const startAnimation = () => {
      if (hasStarted) return;
      setHasStarted(true);
      
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        countRef.current += increment;
        if (countRef.current >= end) {
          countRef.current = end;
          clearInterval(timer);
        }
        setCount(Math.floor(countRef.current));
      }, 16);
    };

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !hasStarted) {
            startAnimation();
          }
        },
        { threshold: 0.3 }
      );

      if (ref.current) {
        observer.observe(ref.current);
      }

      return () => observer.disconnect();
    }, [hasStarted, end]);

    return [count, ref];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section
      id="stats"
      ref={sectionRef}
      className={`py-20 lg:py-32 ${
        isDarkMode ? 'bg-neutral-900' : 'bg-white'
      } transition-colors duration-300 relative overflow-hidden`}
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/5 to-primary-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
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
            My Journey in <span className="gradient-text">Numbers</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Authentic milestones from my academic journey and professional development
            as a Software Engineering graduate
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mt-8"></div>
        </motion.div>

        {/* Counters Grid */}
        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {counterData.map((counter) => {
            const IconComponent = iconMap[counter.icon] || FiCode;
            const [count, ref] = useCounter(counter.value);
            
            return (
              <motion.div
                key={counter.id}
                ref={ref}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <Card className={`relative h-full border transition-all duration-500 hover:shadow-2xl group ${
                  isDarkMode 
                    ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600' 
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                }`}>
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${counter.bgColor} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
                  
                  {/* Content */}
                  <CardContent className="relative z-10 p-8">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${counter.color}/20 mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`w-8 h-8`} style={{ 
                        color: counter.iconColor || 'currentColor' 
                      }} />
                    </div>

                    {/* Counter Display */}
                    <div className="mb-4">
                      <h3 className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${counter.color} bg-clip-text text-transparent`}>
                        {count}{counter.suffix}
                      </h3>
                    </div>

                    {/* Label */}
                    <h4 className={`text-xl font-bold mb-3 ${
                      isDarkMode ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {counter.label}
                    </h4>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed ${
                      isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                    }`}>
                      {counter.description}
                    </p>

                    {/* Progress Bar */}
                    <div className={`mt-6 h-1 rounded-full overflow-hidden ${
                      isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'
                    }`}>
                      <motion.div
                        className={`h-full bg-gradient-to-r ${counter.color} rounded-full`}
                        initial={{ width: 0 }}
                        whileInView={{ width: '100%' }}
                        transition={{ duration: 2, delay: 0.5 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </CardContent>

                  {/* Floating Elements */}
                  <div className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r ${counter.color} rounded-full opacity-60 animate-ping`}></div>
                  <div className={`absolute top-1 right-1 w-2 h-2 bg-gradient-to-r ${counter.color} rounded-full`}></div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Achievement Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Badge 
            variant="outline" 
            className={`inline-flex items-center space-x-3 px-8 py-4 text-base ${
              isDarkMode 
                ? 'bg-neutral-800 border-neutral-700' 
                : 'bg-neutral-50 border-neutral-200'
            }`}
          >
            <FiHeart className="w-6 h-6 text-red-500 animate-pulse" />
            <span className={`font-semibold ${
              isDarkMode ? 'text-white' : 'text-neutral-900'
            }`}>
              Passionate about creating exceptional digital experiences
            </span>
            <FiTarget className="w-6 h-6 text-green-500" />
          </Badge>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-neutral-900'
          }`}>
            Ready to Add Your Project to These Numbers?
          </h3>
          <p className={`text-lg mb-8 ${
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          }`}>
            Let's collaborate and create something amazing together
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-8 py-6 text-lg bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl"
            >
              Start Your Project
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CounterSection;
