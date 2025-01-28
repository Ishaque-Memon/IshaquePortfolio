import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-scroll";

const Header = ({ isLoading }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollDirection, setScrollDirection] = useState("up"); // Track scroll direction

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setScrolled(true); // Show background when scrolled more than 50px
      } else {
        setScrolled(false); // Remove background when scrolled back up
      }

      // Detect scroll direction
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down"); // Scrolling down
      } else {
        setScrollDirection("up"); // Scrolling up
      }
      lastScrollY = currentScrollY > 0 ? currentScrollY : 0; // Prevent negative scroll values
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {!isLoading && (
        <header
          className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
            scrolled ? "bg-black bg-opacity-30 backdrop-blur-lg shadow-lg" : "bg-transparent"
          } ${scrollDirection === "down" ? "translate-y-[-100%]" : "translate-y-0"}`} // Hide navbar on scroll down, show on scroll up
        >
          <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between py-8 relative">
            <a href="/">
              <div className="navbar-logo relative flex items-center justify-center text-xl md:text-2xl font-extrabold text-white">
                <div
                  className="outer-circle absolute w-12 h-12 md:w-16 md:h-16 border-2 border-solid rounded-full"
                ></div>
                <div
                  className="inner-circle absolute w-10 h-10 md:w-12 md:h-12 border-2 border-solid rounded-full"
                ></div>
                <div className="relative z-10 flex items-center space-x-1 text-[1.5rem]">
                  <span
                    className="text-yellow-400"
                    style={{
                      textShadow: "0 0 4px rgb(245, 202, 91), 0 0 8px rgb(245, 202, 91)",
                    }}
                  >
                    M
                  </span>
                  <span
                    style={{
                      textShadow: "0px 0px 6px rgba(255, 255, 255, 0.8)",
                    }}
                  >
                    I
                  </span>
                </div>
              </div>
            </a>
            <ul className="hidden md:flex space-x-4 text-base font-medium text-white ml-auto">
              {["Home", "Skills", "Projects", "Contact"].map((item, index) => (
                <li key={index} className="group relative cursor-pointer">
                  <Link
                    to={item.toLowerCase()}
                    smooth={true}
                    duration={500}
                    offset={-70}
                    className="group-hover:text-yellow-400"
                  >
                    {item}
                  </Link>
                  <div className="absolute left-0 bottom-0 h-0.5 w-0 bg-yellow-400 rounded-full transition-all duration-500 group-hover:w-full"></div>
                </li>
              ))}
            </ul>
            <button
              className="md:hidden text-lg text-yellow-400"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <FaBars />
            </button>
          </div>
          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-black bg-opacity-90 text-white flex flex-col items-center space-y-4 py-4">
              {["Home", "Skills", "Projects", "Contact"].map((item, index) => (
                <Link
                  key={index}
                  to={item.toLowerCase()}
                  smooth={true}
                  duration={500}
                  offset={-70}
                  className="hover:text-yellow-400"
                  onClick={() => setMenuOpen(false)} // Close menu on item click
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </header>
      )}
    </>
  );
};

export default Header;
