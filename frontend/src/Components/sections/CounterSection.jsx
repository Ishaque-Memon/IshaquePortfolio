// CounterSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "@/contexts/ThemeContext";
import { usePersonalInfo } from "@/hooks/usePortfolio";
import { Card, CardContent } from "@/Components/ui/card";
import { Badge } from "@/Components/ui/badge";
import { Button } from "@/Components/ui/button";
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
import Loader from "@/Components/common/Loader";

// Icon mapping using string keys
const iconMap = {
  FiCode,
  FiUsers,
  FiAward,
  FiCoffee,
  FiGitBranch,
  FiTarget,
  FiTrendingUp,
  FiHeart,
  FaLinkedin
};

// Hook to animate a number from 0 -> end when element intersects
const useCounter = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    let timer;
    let current = 0;

    const startAnimation = () => {
      if (hasStarted) return;
      setHasStarted(true);

      const stepTime = 16; // ~60fps
      const steps = Math.max(1, Math.floor(duration / stepTime));
      const increment = end / steps;

      timer = setInterval(() => {
        current += increment;
        if (current >= end) {
          current = end;
          clearInterval(timer);
        }
        setCount(Math.floor(current));
      }, stepTime);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startAnimation();
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (timer) clearInterval(timer);
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [end, duration]);

  return [count, ref];
};

// Single counter card component (safe to use hooks here)
const CounterCard = ({ counter, isDarkMode }) => {
  const IconComponent = iconMap[counter.icon] || FiCode;
  const [count, ref] = useCounter(counter.value);

  return (
    <motion.div
      key={counter.id}
      ref={ref}
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Card className={`relative h-full border transition-all duration-500 hover:shadow-2xl group ${
        isDarkMode
          ? 'bg-neutral-800 border-neutral-700 hover:border-neutral-600'
          : 'bg-white border-neutral-200 hover:border-neutral-300'
      }`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${counter.bgColor} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

        <CardContent className="relative z-10 p-8">
          <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${counter.color}/20 mb-6 group-hover:scale-110 transition-transform duration-300`}>
            <IconComponent className="w-8 h-8" style={{ color: counter.iconColor || 'currentColor' }} />
          </div>

          <div className="mb-4">
            <h3 className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${counter.color} bg-clip-text text-transparent`}>
              {count}{counter.suffix}
            </h3>
          </div>

          <h4 className={`text-xl font-bold mb-3 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            {counter.label}
          </h4>

          <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-neutral-400' : 'text-neutral-600'}`}>
            {counter.description}
          </p>

          <div className={`mt-6 h-1 rounded-full overflow-hidden ${isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'}`}>
            <motion.div
              className={`h-full bg-gradient-to-r ${counter.color} rounded-full`}
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, delay: 0.5 }}
            />
          </div>
        </CardContent>

        <div className={`absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r ${counter.color} rounded-full opacity-60 animate-ping`}></div>
        <div className={`absolute top-1 right-1 w-2 h-2 bg-gradient-to-r ${counter.color} rounded-full`}></div>
      </Card>
    </motion.div>
  );
};

const CounterSection = () => {
  const { isDarkMode } = useTheme();
  const { personalInfo: apiPersonalInfo, loading } = usePersonalInfo();
  const [counterData, setCounterData] = useState([]);

  useEffect(() => {
    if (!apiPersonalInfo) return;

    // API sometimes returns wrapper { data: ... } — support both shapes
    const data = apiPersonalInfo.data ? apiPersonalInfo.data : apiPersonalInfo;
    const stats = data.statistics || {};

    // Build counters (add any additional stats you want)
    const counters = [
      {
        id: 'experience',
        value: Number(stats.yearsOfExperience) || 0,
        suffix: "+",
        label: "Years of Experience",
        description: "Building software solutions",
        icon: "FiCode",
        color: "from-blue-500 to-cyan-500",
        bgColor: "from-blue-500/10 to-cyan-500/10",
        iconColor: "hsl(var(--primary))"
      },
      {
        id: 'projects',
        value: Number(stats.projectsCompleted) || 0,
        suffix: "+",
        label: "Projects Completed",
        description: "Successful project deliveries",
        icon: "FiAward",
        color: "from-green-500 to-emerald-500",
        bgColor: "from-green-500/10 to-emerald-500/10",
        iconColor: "hsl(var(--icon-green))"
      },
      {
        id: 'clients',
        value: Number(stats.happyClients) || 0,
        suffix: "+",
        label: "Happy Clients",
        description: "Satisfied customers worldwide",
        icon: "FiUsers",
        color: "from-purple-500 to-pink-500",
        bgColor: "from-purple-500/10 to-pink-500/10",
        iconColor: "hsl(var(--icon-purple))"
      },
      {
        id: 'certificates',
        value: Number(stats.certificatesEarned) || 0,
        suffix: "+",
        label: "Certificates Earned",
        description: "Professional certifications",
        icon: "FiTrendingUp",
        color: "from-orange-500 to-red-500",
        bgColor: "from-orange-500/10 to-red-500/10",
        iconColor: "hsl(var(--icon-orange))"
      },
      // include linkedin followers (example): will show because your API had linkedinFollowers: 1500
      {
        id: 'linkedinFollowers',
        value: Number(stats.linkedinFollowers) || 0,
        suffix: "",
        label: "LinkedIn Followers",
        description: "Professional network",
        icon: "FaLinkedin",
        color: "from-blue-600 to-blue-700",
        bgColor: "from-blue-600/10 to-blue-700/10",
        iconColor: "hsl(var(--icon-blue-dark))"
      }
    ];

    setCounterData(counters);
  }, [apiPersonalInfo]);

  if (loading) {
    return (
      <section className={`py-20 lg:py-32 ${isDarkMode ? 'bg-neutral-900' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Loader variant="spinner" text="Loading Statistics..." />
        </div>
      </section>
    );
  }

  // Only render the section if at least one value > 0
  const visibleCounters = counterData.filter(c => Number(c.value) > 0);
  if (!visibleCounters.length) return null;

  return (
    <section
      id="stats"
      className={`py-20 lg:py-32 ${isDarkMode ? 'bg-neutral-900' : 'bg-white'} transition-colors duration-300 relative overflow-hidden`}
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary-500/5 to-accent-500/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-br from-accent-500/5 to-primary-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className={`text-4xl lg:text-5xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            My Journey in <span className="gradient-text">Numbers</span>
          </h2>
          <p className={`text-xl max-w-3xl mx-auto ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
            Authentic milestones from my professional development
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full mt-8"></div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {visibleCounters.map(counter => (
            <CounterCard key={counter.id} counter={counter} isDarkMode={isDarkMode} />
          ))}
        </motion.div>

        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <Badge 
            variant="outline" 
            className={`inline-flex items-center space-x-3 px-8 py-4 text-base ${isDarkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-200'}`}
          >
            <FiHeart className="w-6 h-6 text-red-500 animate-pulse" />
            <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
              Passionate about creating exceptional digital experiences
            </span>
            <FiTarget className="w-6 h-6 text-green-500" />
          </Badge>
        </motion.div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-neutral-900'}`}>
            Ready to Add Your Project to These Numbers?
          </h3>
          <p className={`text-lg mb-8 ${isDarkMode ? 'text-neutral-300' : 'text-neutral-700'}`}>
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
