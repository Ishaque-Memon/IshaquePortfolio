import React, { useState, useEffect } from 'react';
import { ThemeProvider, useTheme } from './contexts/ThemeContext.jsx';
import ModernHome from './Components/ModernHome';
import ModernHeader from './Components/ModernHeader';
import ModernAbout from './Components/ModernAbout';
import ModernSkills from './Components/ModernSkills';
import ModernProjects from './Components/ModernProjects';
import ModernFYPSection from './Components/ModernFYPSection';
import ModernContact from './Components/ModernContact';
import ModernCounterSection from './Components/ModernCounterSection';
import AnimatedLogo from './Components/AnimatedLogo';
import ModernCertificates from './Components/ModernCertificates';
import ModernFooterSection from './Components/ModernFooterSection';
import ModernEducation from './Components/ModernEducation';
import ScrollBot from './Components/ScrollBot';
import MacOSDock from './Components/MacOSDock';
import './App.css';

const AppContent = () => {
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
          <ModernHeader />
          <div className="carousel-item">
            <ModernHome />
          </div>
          <div className="carousel-item">
            <ModernAbout />
          </div>
          <div className="carousel-item">
            <ModernSkills />
          </div>
          <div className="carousel-item">
            <ModernCounterSection />
          </div>
          <div className="carousel-item">
            <ModernEducation />
          </div>
          <div className="carousel-item">
            <ModernCertificates/>
          </div>
          <div className="carousel-item">
            <ModernFYPSection />
          </div>
          <div className="carousel-item">
            <ModernProjects />
          </div>
          <div className="carousel-item">
            <ModernContact />
          </div>
          <div className="carousel-item">
            <ModernFooterSection />
          </div>
          <ScrollBot />
          <MacOSDock />
        </div>
      )}
    </>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
