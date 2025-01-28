import React, { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WelcomePage from "../assets/ImageGallery/0.png";
import LoginPage from "../assets/ImageGallery/1.png";
import FacultyPortal from "../assets/ImageGallery/2.png";
import SuperAdmin from "../assets/ImageGallery/3.png";
import HOD from "../assets/ImageGallery/4.png";
import Developer1 from "../assets/ImageGallery/5.jpeg";
import Developer2 from "../assets/ImageGallery/6.jpeg";
import SpyMode from "../assets/ImageGallery/7.png";

const FYPSection = () => {
  gsap.registerPlugin(ScrollTrigger);

  const images = [
    { id: 7, src: Developer2, caption: "Developers Team 2" },
    { id: 6, src: Developer1, caption: "Developers Team 1" },
    { id: 3, src: SuperAdmin, caption: "Super Admin Portal" },
    { id: 4, src: HOD, caption: "HOD Portal" },
    { id: 5, src: FacultyPortal, caption: "Faculty Portal" },
    { id: 2, src: LoginPage, caption: "Login Page for Student/Faculty" },
    { id: 8, src: SpyMode, caption: "Sleep Mode, to Protect the work Insights" },
    { id: 1, src: WelcomePage, caption: "Welcome Page" },
  ];
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(images.length / itemsPerPage);

  const paginateImages = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return images.slice(startIndex, endIndex);
  };

  useEffect(() => {
    gsap.fromTo(
      ".gallery-item",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".gallery-section",
          start: "top 80%",
        },
      }
    );

    // Floating Gradient Animation
    const animateGradient = () => {
      gsap.to(".dynamic-gradient", {
        backgroundPosition: "200% center",
        duration: 8,
        repeat: -1,
        ease: "linear",
      });

      gsap.to(".floating-shape", {
        y: "random(-20, 20)",
        x: "random(-20, 20)",
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    };

    animateGradient();
  }, [currentPage]);

  return (
    <section className="relative py-20 gallery-section text-white overflow-hidden min-h-screen"
    style={{
      background: "linear-gradient(to right, rgb(66, 39, 90), rgb(115, 75, 109))"
    }}>
     
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 text-center mb-12 drop-shadow-lg">
          FYP Project Gallery
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {paginateImages().map((image) => (
            <div
              key={image.id}
              className="gallery-item relative overflow-hidden rounded-lg shadow-lg group"
            >
              {/* Image */}
              <img
                src={image.src}
                alt={image.caption}
                className="w-full h-60 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Caption */}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <p className="text-lg text-yellow-300 font-semibold">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="relative flex justify-center items-center mt-12 z-10 space-x-6">
  {/* Previous Button */}
  <button
    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
    className="relative px-8 py-3 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-full overflow-hidden group transition-all duration-300 hover:shadow-lg focus:outline-none"
  >
    <span className="absolute inset-0 w-full h-full transform -translate-x-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
      Previous
    </span>
  </button>

  {/* Page Indicator */}
  <span className="text-lg font-semibold text-nuetral-900">
    Page {currentPage} of {totalPages}
  </span>

  {/* Next Button */}
  <button
    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
    className="relative px-8 py-3 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-full overflow-hidden group transition-all duration-300 hover:shadow-lg focus:outline-none"
  >
    <span className="absolute inset-0 w-full h-full transform translate-x-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 group-hover:translate-x-0 transition-transform duration-300 ease-in-out"></span>
    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
      Next
    </span>
  </button>
</div>

      </div>
    </section>
  );
};

export default FYPSection;
