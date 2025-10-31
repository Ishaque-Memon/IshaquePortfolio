import React, { useState, useEffect } from 'react';
import { logVisit } from '../api/portfolioApi';
import { useTheme } from '../contexts/ThemeContext.jsx';
import Navbar from '../Components/common/Navbar';
import AnimatedLogo from '../Components/common/AnimatedLogo';
import HomeSection from '../Components/sections/HomeSection';
import AboutSection from '../Components/sections/AboutSection';
import SkillsSection from '../Components/sections/SkillsSection';
import CounterSection from '../Components/sections/CounterSection';
import EducationSection from '../Components/sections/EducationSection';
import CertificatesSection from '../Components/sections/CertificatesSection';
import ProjectsSection from '../Components/sections/ProjectsSection';
import ContactSection from '../Components/sections/ContactSection';
import Footer from '../Components/common/Footer';
import ScrollBot from '../Components/common/ScrollBot';
import MacOSDock from '../Components/common/MacOSDock';

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
        </div>
      )}
    </>
  );
};

export default Home;
