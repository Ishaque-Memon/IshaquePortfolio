import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext.jsx';
import Navbar from '../components/common/Navbar';
import AnimatedLogo from '../components/common/AnimatedLogo';
import HomeSectionNew from '../components/sections/HomeSectionNew';
import AboutSectionNew from '../components/sections/AboutSectionNew';
import SkillsSectionNew from '../components/sections/SkillsSectionNew';
import CounterSectionNew from '../components/sections/CounterSectionNew';
import EducationSectionNew from '../components/sections/EducationSectionNew';
import CertificatesSectionNew from '../components/sections/CertificatesSectionNew';
import FYPSectionNew from '../components/sections/FYPSectionNew';
import ProjectsSectionNew from '../components/sections/ProjectsSectionNew';
import ContactSectionNew from '../components/sections/ContactSectionNew';
import Footer from '../components/common/Footer';
import ScrollBot from '../components/common/ScrollBot';
import MacOSDock from '../components/common/MacOSDock';
import { Toaster } from '@/components/ui/sonner';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
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
            <HomeSectionNew />
          </div>
          <div className="carousel-item">
            <AboutSectionNew />
          </div>
          <div className="carousel-item">
            <SkillsSectionNew />
          </div>
          <div className="carousel-item">
            <CounterSectionNew />
          </div>
          <div className="carousel-item">
            <EducationSectionNew />
          </div>
          <div className="carousel-item">
            <CertificatesSectionNew />
          </div>
          <div className="carousel-item">
            <FYPSectionNew />
          </div>
          <div className="carousel-item">
            <ProjectsSectionNew />
          </div>
          <div className="carousel-item">
            <ContactSectionNew />
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
