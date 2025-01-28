import React from 'react';
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 text-white py-12 relative">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Stay Connected!</h2>
        <p className="text-lg mb-8">Follow me on social media for updates!</p>

        {/* Social Media Icons with Neon Glow */}
        <div className="flex justify-center gap-6">
          <a href="https://github.com/Ishaque-Memon" target="_blank" rel="noopener noreferrer" className="text-3xl text-white hover:text-black neon-glow transition-all duration-300">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/muhammad-ishaque-574492249/" target="_blank" rel="noopener noreferrer" className="text-blue-800 text-3xl hover:text-blue-600 neon-glow transition-all duration-300">
            <FaLinkedin />
          </a>
          {/* <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-blue-500 text-3xl hover:text-blue-600 neon-glow transition-all duration-300">
            <FaTwitter />
          </a> */}
          <a href="https://www.instagram.com/ishaq_meymon_02/" target="_blank" rel="noopener noreferrer" className="text-purple-500 text-3xl hover:text-purple-600 neon-glow transition-all duration-300">
            <FaInstagram />
          </a>
        </div>

        <div className="mt-8 footer-text">
          <p className="text-sm">Interested in my projects? Check out my <a href="https://github.com/Ishaque-Memon" target="_blank" rel="noopener noreferrer" className=" text-white hover:text-blue-800">GitHub</a> for more!</p>
        </div>

        <div className="text-sm mt-8 footer-text">
          <p>&copy; {new Date().getFullYear()} Muhammad Ishaque. All Rights Reserved.</p>
        </div>
      </div>


    </footer>
  );
};

export default Footer;
