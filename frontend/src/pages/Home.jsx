import React, { useState, useEffect } from 'react';
import { logVisit } from '../api/portfolioApi';
import { useTheme } from '../contexts/ThemeContext.jsx';
import Navbar from '../components/common/Navbar';
import AnimatedLogo from '../components/common/AnimatedLogo';
import HomeSection from '../components/sections/HomeSection';
import AboutSection from '../components/sections/AboutSection';
import SkillsSection from '../components/sections/SkillsSection';
import CounterSection from '../components/sections/CounterSection';
import EducationSection from '../components/sections/EducationSection';
import CertificatesSection from '../components/sections/CertificatesSection';
import ProjectsSection from '../components/sections/ProjectsSection';
import ContactSection from '../components/sections/ContactSection';
import Footer from '../components/common/Footer';
import ScrollBot from '../components/common/ScrollBot';
import MacOSDock from '../components/common/MacOSDock';
import { Toaster } from '@/components/ui/sonner';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();

// Handle loading animation and body scroll
  useEffect(() => {
    document.body.style.overflow = isLoading ? 'hidden' : 'auto';
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <AnimatedLogo onFinish={() => setIsLoading(false)} />
      ) : (
        <div className={`min-h-screen transition-colors duration-300 smooth-scroll carousel-smooth ${
          isDarkMode 
            ? 'bg-neutral-950 text-neutral-100' 
            : 'bg-neutral-50 text-neutral-900'
        }`}>
          <Navbar />
          <div className="carousel-item">
            <HomeSection />
          </div>
          <div className="carousel-item">
            <AboutSection />
          </div>
          <div className="carousel-item">
            <SkillsSection />
          </div>
          <div className="carousel-item">
            <CounterSection />
          </div>
          <div className="carousel-item">
            <EducationSection />
          </div>
          <div className="carousel-item">
            <CertificatesSection />
          </div>
          <div className="carousel-item">
            <ProjectsSection />
          </div>
          <div className="carousel-item">
            <ContactSection />
          </div>
          <div className="carousel-item">
            <Footer />
          </div>
          <ScrollBot />
          <MacOSDock />
          <Toaster />
        </div>
      )}
    </>
  );
};

export default Home;
