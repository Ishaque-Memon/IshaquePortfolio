import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MyPicture from "../assets/MyPicture/Ishaq3.jpeg";
import ResumeImage from "../assets/Resume/Ishaque.png";
import ResumePdf from "../assets/Resume/Ishaque.pdf";
gsap.registerPlugin(ScrollTrigger);

function About() {

  const [isModalOpen, setModalOpen] = useState(false); 
  const mRef = useRef(null);
  const iRef = useRef(null);
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);  // Track loading state
  const MILoading = loading

     useEffect(() => {
      if (loading && mRef.current && iRef.current) {
        const timeline = gsap.timeline({ repeat: -1, repeatDelay: 1 });
    
        timeline
          .to(mRef.current, {
            y: -20,
            scale: 1.2,
            rotation: 360,
            duration: 1,
            ease: "power1.inOut",
          })
          .to(mRef.current, { y: 0, scale: 1, duration: 0.5, ease: "bounce.out" })
          .to(
            iRef.current,
            {
              y: 20,
              scale: 1.2,
              rotation: -360,
              duration: 1,
              ease: "power1.inOut",
            },
            "<"
          )
          .to(iRef.current, { y: 0, scale: 1, duration: 0.5, ease: "bounce.out" });
    
        // Cleanup to avoid multiple instances of the timeline
        return () => timeline.kill();
      }
    }, [loading]); // Re-run the effect whenever loading changes


  useEffect(()=> {
   
      if(MILoading){
  
      document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      
  
      return () => {
        document.body.style.overflow = "auto";
      };
    }, [MILoading]
    )


  // Disable scrolling when modal is open
  useEffect(() => {

    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto"; // Ensure reset on unmount
    };
  }, [isModalOpen]);

  useEffect(() => {
    // GSAP animations for About section
    gsap.fromTo(
      ".about-image",
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-image",
          start: "top 80%",
        },
      }
    );

    gsap.fromTo(
      ".about-content",
      { opacity: 0, x: 100 },
      {
        opacity: 1,
        x: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".about-content",
          start: "top 80%",
        },
      }
    );
  }, []);

 

  return (
    <section className={`about-section min-h-screen flex items-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100 relative overflow-hidden`}>
      {/* Background Blur Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 via-yellow-900 to-purple-900 blur-3xl opacity-60 z-0"></div>

                  {/* Logo centered and dynamic loading indicator */}
                
                  {loading && MILoading  && (

            <div className="MI_Container">
            <div className={`MI-logo absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-10`}>
              <div className="outer-circle absolute w-12 h-12 md:w-16 md:h-16 border-2 border-solid rounded-full"></div>
              <div className="inner-circle absolute w-10 h-10 md:w-12 md:h-12 border-2 border-solid rounded-full"></div>
              <div 
              ref={containerRef}
              className="relative z-10 flex items-center space-x-1 text-[1.5rem]">
                <span
                  ref={mRef}
                  className="text-yellow-400"
                  style={{
                    textShadow: "0 0 4px rgb(245, 202, 91), 0 0 8px rgb(245, 202, 91)",
                  }}
                >
                  M
                </span>
                <span
                ref={iRef}
                  style={{
                    textShadow: "0px 0px 6px rgba(255, 255, 255, 0.8)",
                  }}
                >
                  I
                </span>
              </div>
            </div>
            </div>
                  )}
        <div className={` ${
      loading ? "blur-background" : ""
    }`}>

        
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center gap-12 z-10 relative">
        {/* Left: Image */}
        <div className="about-image flex-shrink-0 relative w-80 h-80 md:w-[400px] md:h-[400px] rounded-full overflow-hidden shadow-lg">
          {/* Image Frame Design */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 blur-xl opacity-50"></div>
          <img
            src={MyPicture}
            alt="About Me"
            className="relative w-full h-full object-cover rounded-full border-4 border-yellow-500 shadow-2xl transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right: Content */}
        <div className="about-content space-y-6 max-w-xl">
          <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600">
            Who Am I?
          </h2>
          <p className="text-lg text-neutral-100 leading-relaxed">
            I'm a dedicated Software Engineer driven by a passion for creating
            exceptional digital experiences. With a focus on modern tools and
            technologies, I bring ideas to life with creativity and precision.
          </p>
          <p className="text-lg text-gray-300 leading-relaxed">
            My expertise in <strong>React</strong>, <strong>Tailwind CSS</strong>, and{" "}
            <strong>GSAP</strong> enables me to build dynamic and visually
            stunning web applications. From seamless animations to responsive
            designs, I strive to craft projects that leave a lasting
            impression.
          </p>
          <div className="flex flex-row gap-4">
  {/* View Resume Button */}
  <button
    onClick={() => {
      setLoading(true); // Set loading state to true
      setTimeout(() => {
        setModalOpen(true); // Open modal after delay
        setLoading(false); // Reset loading state
      }, 1500); // Adjust delay as needed
    }}
    className={`px-6 py-3 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90 transition duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
    disabled={loading} // Disable button while loading
  >
    View Resume
    {/* {loading ? "View Resume" : "View Resume"} */}
  </button>

  {/* Download Resume Button */}
  <button
    onClick={() => {
      setLoading(true); // Set loading state to true
      setTimeout(() => {
        setLoading(false); // Reset loading state
        // Trigger file download
        const link = document.createElement("a");
        link.href = ResumePdf;
        link.download = "IshaqMemon_Resume.pdf";
        link.click();
      }, 2000); // Adjust delay as needed
    }}
    className={`px-6 py-3 bg-yellow-700 text-white font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition duration-300 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
    disabled={loading} // Disable button while loading
  >
    Download Resume
  </button>
</div>

        </div>
      </div>

      {/* Modal for Viewing Resume */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          {/* Modal Container */}
          <div className="bg-gray-900 rounded-lg overflow-hidden w-[90vw] h-[80vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 bg-gray-700 text-white">
              <h2 className="text-xl font-bold">Resume</h2>
              <button
                onClick={() => setModalOpen(false)}
                className="text-white hover:text-gray-400"
              >
                ✕
              </button>
            </div>
            {/* Modal Body */}
            <div className="flex-1 overflow-hidden">
              {/* Image of the Resume */}
              <img
                src={ResumeImage}
                alt="Resume"
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}

export default About;
