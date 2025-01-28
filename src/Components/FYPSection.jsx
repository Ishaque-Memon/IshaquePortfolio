import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const FYPSection = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power4.inOut" }
    );

    gsap.fromTo(
      titleRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, delay: 0.5, ease: "power4.out" }
    );

    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, delay: 1, ease: "power4.out" }
    );

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 2, delay: 1.5, ease: "power4.out" }
    );
  }, []);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-32 px-12 sm:px-16 lg:px-32 text-white"
      style={{
        background: "linear-gradient(to right, rgb(66, 39, 90), rgb(115, 75, 109))"
      }}
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          ref={titleRef}
          className="text-5xl font-bold mb-16 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 tracking-tight"
        >
          Outcome-Based Education V2.0
        </h2>
        <p
          ref={subtitleRef}
          className="text-xl sm:text-2xl max-w-2xl mx-auto mb-14 text-neutral-100 font-light"
        >
          Revolutionizing education with powerful tools for student outcome tracking, assessment, and real-time insights.
        </p>

        <div
          ref={contentRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 mt-10"
        >
          <div className=" p-12 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
          style={{
            backgroundColor: "#774181"
          }}
          >
            <h3 className="text-3xl font-bold text-softGold mb-6">
              Core Features
            </h3>
            <ul className="space-y-4 text-md text-neutral-100">
              <li>Real-time GPA & CGPA tracking</li>
              <li>Automated CLO & PLO assessments</li>
              <li>Continuous Quality Improvement analytics</li>
              <li>Advanced reporting and student insights</li>
            </ul>
          </div>

          <div className=" p-12 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
          style={{
            backgroundColor: "#774181"
          }}
          >
            <h3 className="text-3xl font-bold text-softGold mb-6">
              Technologies Used
            </h3>
            <ul className="space-y-4 text-md text-neutral-100">
              <li>React for dynamic, responsive UI</li>
              <li>GSAP for smooth animations</li>
              <li>MS SQL for data handling</li>
              <li>TailwindCSS for modern styling</li>
            </ul>
          </div>

          <div className=" p-12 rounded-2xl shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out transform"
          style={{
            backgroundColor: "#774181"
          }}
          >
            <h3 className="text-3xl font-bold text-softGold mb-6">
              Vision Ahead
            </h3>
            <ul className="space-y-4 text-md text-neutral-100">
              <li>Student-centered personalized dashboards</li>
              <li>Predictive analytics for student performance</li>
              <li>AI-driven learning insights</li>
              <li>Enhanced course management features</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FYPSection;
