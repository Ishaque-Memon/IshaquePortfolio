import React, { useState, useEffect } from 'react';
import Certificate0 from "../assets/Certificates/Certificate0.png"
import Certificate1 from "../assets/Certificates/Certificate1.png";
import Certificate2 from "../assets/Certificates/Certificate2.png";
import Certificate3 from "../assets/Certificates/Certificate3.png";
import Certificate4 from "../assets/Certificates/Certificate4.png";
import Certificate5 from "../assets/Certificates/Certificate5.png";
import Certificate6 from "../assets/Certificates/Certificate6.png";


const certificates = [
  {
    title: 'Fundamentals of Management',
    issuer: 'Coursera',
    image: Certificate0,
  },
  {
    title: 'Build a Guessing Game Application using C++',
    issuer: 'Coursera',
    image: Certificate1,
  },
  {
    title: 'Command Line in Linux',
    issuer: 'Coursera',
    image: Certificate2,
  },
  {
    title: 'Build a Free Website with WordPress',
    issuer: 'Coursera',
    image: Certificate3,
  },
  {
    title: 'Create a Text Logo Professionally using Adobe illustrator',
    issuer: 'Coursera',
    image: Certificate4,
  },
  {
    title: 'Introduction of Cybersecurity Tools & Cyberattacks',
    issuer: 'Coursera',
    image: Certificate5,
  },
  {
    title: 'Learn the Python Programming Language',
    issuer: 'Udemy',
    image: Certificate6,
  },
  // Add more certificates here for testing pagination
];

const ITEMS_PER_PAGE = 3; // Number of certificates to display per page

const Certificates = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const handleClick = (cert) => {
    // Toggle the selected certificate to scale the image on click
    setSelectedCert(selectedCert === cert ? null : cert);
  };

  const handleCloseModal = () => {
    setSelectedCert(null);
  };

  const totalPages = Math.ceil(certificates.length / ITEMS_PER_PAGE);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const displayedCertificates = certificates.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  useEffect(() => {
    // Disable body scroll when modal is open
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto'; // Cleanup when the component unmounts
    };
  }, [selectedCert]);

  const handleOverlayClick = (e) => {
    // Prevent the overlay click event from propagating to the document
    e.stopPropagation();
  };

  return (
    <section id="achievements" className="py-16 text-white" style={{
        background: "linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67))"
    }}>
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Achievements 
           <span className='text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600'> & </span>
            Certifications</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedCertificates.map((cert, index) => (
            <div
              key={index}
              className="certificate-card relative overflow-hidden rounded-lg shadow-lg"
              onClick={() => handleClick(cert)} // Handle click to scale
            >
              <img
                src={cert.image}
                alt={cert.title}
                className="certificate-image w-full h-48 object-cover rounded-lg"
              />
              
              {/* Modal Overlay with Scaled Image */}
              {selectedCert === cert && (
                <div className="certificate-overlay inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-100 pointer-events-auto transition-all duration-300 "
                onClick={handleOverlayClick}
                >
                  <div className="relative flex flex-col items-center">
                    {/* Scaled Image with Improved Smoothness */}
                    <img
                      src={cert.image}
                      alt={cert.title}
                      className="certificate-modal-image w-1/2 h-auto transform scale-105 transition-transform duration-300"
                    />
                    
                    {/* Details Below the Picture */}
                    <div className="text-center mt-4 text-white">
                      <h3 className="text-xl font-semibold">{cert.title}</h3>
                      <p className="text-sm">{cert.issuer}</p>
                    </div>
                    
                    {/* Close Button */}
                    <button
                      onClick={handleCloseModal}
                      className="absolute top-0 right-10 text-white text-5xl font-bold mx-[80px]"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        {/* <div className="flex justify-center mt-8">
          <button
            onClick={handlePrevPage}
            className="px-4 py-2 bg-gray-800 text-white rounded-md mx-2"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="px-4 py-2 text-white">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-gray-800 text-white rounded-md mx-2"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div> */}
         <div className="relative flex justify-center items-center mt-12 z-10 space-x-6">
  {/* Previous Button */}
  <button
    onClick={() => handlePrevPage((prev) => Math.max(prev - 1, 1))}
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
    onClick={() => handleNextPage((prev) => Math.min(prev + 1, totalPages))}
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

export default Certificates;
