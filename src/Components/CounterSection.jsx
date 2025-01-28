import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CounterSection() {
  useEffect(() => {
    // GSAP Animation for the counter section
    gsap.fromTo(
      ".counter",
      {
        autoAlpha: 0, // Starts with opacity 0
        y: 50, // Starts 50px down
      },
      {
        autoAlpha: 1,
        y: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: ".counter",
          start: "top 80%",
          end: "bottom top",
          toggleActions: "play none none none", // Triggers the animation on scroll
        },
      }
    );

    // GSAP Animation for the numbers in counter
    const counters = document.querySelectorAll(".count");
    counters.forEach((counter) => {
      const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const count = +counter.innerText;

        // Increment the counter value smoothly
        if (count < target) {
          counter.innerText = Math.ceil(count + target / 100);
          setTimeout(updateCounter, 30); // Adjust speed of counting
        } else {
          counter.innerText = target;
        }
      };

      // Trigger counting when the counter section is in view
      ScrollTrigger.create({
        trigger: counter,
        start: "top 80%",
        onEnter: updateCounter, // Start counting on entering view
      });
    });
  }, []);

  return (
    <section className="counter-section py-20 text-white"
    style={
        {
            background: "linear-gradient(to right, rgb(0, 0, 0), rgb(67, 67, 67))"
        }
    }
    >
      <div className="container mx-auto px-6 text-center ">
        <h2 className="text-4xl font-bold mb-12 ">
          Activity
          <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600"> & </span>
          Growth        
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Counter 1 */}
          <div className="counter">
            <div className="text-6xl font-extrabold count" data-target="10">
              0
            </div>
            <p className="text-xl mt-4">Projects Completed</p>
          </div>

          {/* Counter 2 */}
          <div className="counter">
            <div className="text-6xl font-extrabold count" data-target="5">
              0
            </div>
            <p className="text-xl mt-4">Experience</p>
          </div>

          {/* Counter 3 */}
          <div className="counter">
            <div className="text-6xl font-extrabold count" data-target="1200">
              0 
            </div>
            <p className="text-xl mt-4">LinkedIn Followers</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CounterSection;
