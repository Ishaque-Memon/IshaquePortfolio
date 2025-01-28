import React, { useState, useRef } from "react";
import gsap from "gsap";
import {
  FaCode,
  FaDatabase,
  FaPaintBrush,
  FaTools,
  FaCloud,
  FaPython,
  FaNodeJs,
} from "react-icons/fa";
import { SiReact, SiExpress, SiTailwindcss, SiMongodb, SiBootstrap } from "react-icons/si";

const skills = {
  name: "Core",
  icon: <FaTools />,
  children: [
    {
      name: "Frontend Development",
      icon: <FaPaintBrush />, 
      children: [
        { name: "React.js", level: "Advanced", icon: <SiReact /> },
        { name: "TailwindCSS", level: "Expert", icon: <SiTailwindcss /> },
        { name: "HTML/CSS", level: "Expert", icon: <FaPaintBrush /> },
      ],
    },
    {
      name: "Backend Development",
      icon: <FaCode />, 
      children: [
        { name: "Node.js", level: "Advanced", icon: <FaNodeJs /> },
        { name: "Express.js", level: "Advanced", icon: <SiExpress /> },
      ],
    },
    {
      name: "Database Management",
      icon: <FaDatabase />, 
      children: [
        { name: "MS SQL", level: "Advanced", icon: <FaDatabase /> },
        { name: "MongoDB", level: "Intermediate", icon: <SiMongodb /> },
      ],
    },
    {
      name: "Cloud & DevOps",
      icon: <FaCloud />, 
      children: [
        { name: "AWS", level: "Beginner", icon: <FaCloud /> },
        { name: "Docker", level: "Beginner", icon: <FaTools /> },
      ],
    },
    {
      name: "Programming Languages",
      icon: <FaCode />, 
      children: [
        { name: "Python", level: "Intermediate", icon: <FaPython /> },
        { name: "C++", level: "Intermediate", icon: <FaCode /> },
      ],
    },
    {
      name: "UI Frameworks",
      icon: <FaPaintBrush />, 
      children: [
        { name: "Bootstrap", level: "Advanced", icon: <SiBootstrap /> },
        { name: "TailwindCSS", level: "Expert", icon: <SiTailwindcss /> },
      ],
    },
  ],
};

const Skills = () => {
  const [expanded, setExpanded] = useState({});
  const skillRefs = useRef({});

  const toggleExpand = (path) => {
    const childElement = skillRefs.current[path]; // Get the current node
  
    if (childElement) {
      if (!expanded[path]) {
        // If expanding
        childElement.style.display = "block"; // Ensure it's visible before animation
        gsap.fromTo(
          childElement,
          { height: 0, opacity: 0, overflow: "hidden" },
          { height: "auto", opacity: 1, duration: 0.5, ease: "power2.out" }
        );
      } else {
        // If collapsing
        gsap.to(childElement, {
          height: 0,
          opacity: 0,
          duration: 0.5, // Match duration to opening animation
          ease: "power2.in",
          onComplete: () => {
            childElement.style.display = "none"; // Hide after animation
          },
        });
      }
    }
  
    // Update the expanded state
    setExpanded((prev) => ({ ...prev, [path]: !prev[path] }));
  };
  
  

  const renderTree = (nodes, path = "root") => (
    <div className="tree-node flex flex-col items-center">
      <div
        className={`skill-node flex items-center cursor-pointer p-1 rounded-md shadow-lg transition-transform duration-300 hover:scale-105 mb-2 ${
          expanded[nodes.name] ? "expanded" : ""
        }`}
        onClick={() => toggleExpand(nodes.name)}
      >
        <div className="skill-icon text-2xl text-yellow-400 mr-5">{nodes.icon}</div>
        <div className="skill-name text-lg text-white font-semibold">{nodes.name}</div>
      </div>

      {nodes.children && (
        <div
          className="skill-children flex flex-col items-center gap-2 mt-3"
          ref={(el) => (skillRefs.current[nodes.name] = el)}
          style={{
            display: expanded[nodes.name] ? "block" : "none",
            overflow: "hidden",
          }}
        >
          {nodes.children.map((child, index) => (
            <div key={index} className="skill-branch">
              {renderTree(child, `${path}-${index}`)}
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section id="skills" className="skill-tree-section px-5 py-10 bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      <h2 className="section-title text-3xl font-bold text-center mb-4">
        My{" "}
        <span className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600">
          Skill Tree
        </span>
      </h2>
      <p className="section-subtitle text-sm text-center mb-6">
        Explore my skills organized in a gamified structure. Click nodes to expand and discover more!
      </p>
      <div className="skill-tree flex flex-col items-center gap-6">{renderTree(skills)}</div>
    </section>
  );
};

export default Skills;