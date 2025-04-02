import React, { useState, useEffect } from 'react';
import Home from './Components/Home';
import Header from './Components/Header';
import About from './Components/About';
import Skills from './Components/Skills';
import Projects from './Components/Project';
import FYPSection from './Components/FYPSection';
import ContactForm from './Components/Contact';
import CounterSection from './Components/CounterSection';
import AnimatedLogo from './Components/AnimatedLogo';
import Certificates from './Components/Certificates';
import FooterSection from './Components/FooterSection';
import Education from './Components/Education';
import ScrollBot from './Components/ScrollBot';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      // Disable scrolling during logo animation
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling after animation finishes
      document.body.style.overflow = 'auto';
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <AnimatedLogo onFinish={() => setIsLoading(false)} />
      ) : (
        <div className="bg-gray-900 text-white">
          <Header />
          <Home />
          <About />
          <Skills />
          <CounterSection />
          <Education />
          <Certificates/>
          <FYPSection />
          <Projects />
          <ContactForm />
          <FooterSection />
          <ScrollBot />
        </div>
      )}
    </>
  );
}

export default App;
