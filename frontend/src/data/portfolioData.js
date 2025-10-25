/**
 * Portfolio Static Data
 * This file contains all static content that will eventually come from backend
 * Organized by sections for easy migration to API
 */

// Personal Information
export const personalInfo = {
  name: "Muhammad Ishaque",
  title: "Full Stack Developer",
  tagline: "Building Digital Experiences",
  bio: "Passionate Full Stack Developer specializing in React, Node.js, and modern web technologies. Focused on creating efficient, scalable, and user-friendly applications.",
  email: "m.ishaq031530@gmail.com",
  phone: "+92 315 3",
  location: "Karachi, Pakistan",
  profileImage: "/assets/MyPicture/Ishaque.jpg",
  profileImageAlt: "/assets/MyPicture/Ishaq4.jpeg",
  resumePdf: "/assets/Resume/M.Ishaque.pdf",
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    email: "mailto:ishaque@example.com"
  }
};

// About Section Stats
export const stats = [
  { label: "Projects Completed", value: "10+", icon: "FiCode" },
  { label: "Years Experience", value: "2+", icon: "FiAward" },
  { label: "Technologies", value: "15+", icon: "FiCpu" },
  { label: "Certifications", value: "7", icon: "FiCheckCircle" }
];

// Skills Data
export const skillsData = {
  categories: [
    {
      name: "Frontend Development",
      icon: "SiReact",
      color: "from-blue-500 to-cyan-500",
      skills: [
        { name: "React.js", level: 90, icon: "SiReact" },
        { name: "JavaScript", level: 85, icon: "SiJavascript" },
        { name: "TypeScript", level: 75, icon: "SiTypescript" },
        { name: "Tailwind CSS", level: 90, icon: "SiTailwindcss" },
        { name: "HTML5", level: 95, icon: "SiHtml5" },
        { name: "CSS3", level: 90, icon: "SiCss3" }
      ]
    },
    {
      name: "Backend Development",
      icon: "SiNodedotjs",
      color: "from-green-500 to-emerald-500",
      skills: [
        { name: "Node.js", level: 85, icon: "SiNodedotjs" },
        { name: "Express.js", level: 85, icon: "SiExpress" },
        { name: "Python", level: 70, icon: "SiPython" },
        { name: "RESTful APIs", level: 85, icon: "FiServer" }
      ]
    },
    {
      name: "Database",
      icon: "SiMongodb",
      color: "from-purple-500 to-pink-500",
      skills: [
        { name: "MongoDB", level: 80, icon: "SiMongodb" },
        { name: "MS SQL Server", level: 85, icon: "FiDatabase" },
        { name: "MySQL", level: 75, icon: "SiMysql" },
        { name: "Firebase", level: 70, icon: "SiFirebase" }
      ]
    },
    {
      name: "Tools & Others",
      icon: "SiGit",
      color: "from-orange-500 to-red-500",
      skills: [
        { name: "Git", level: 85, icon: "SiGit" },
        { name: "GitHub", level: 85, icon: "SiGithub" },
        { name: "VS Code", level: 90, icon: "FiCode" },
        { name: "Postman", level: 80, icon: "SiPostman" },
        { name: "Figma", level: 70, icon: "SiFigma" }
      ]
    }
  ]
};

// Projects Data
export const projectsData = [
  {
    id: 1,
    title: "Student Centric LMS V2.0",
    category: "Web Development",
    description: "A comprehensive web-based Outcome-Based Education (OBE) system for academic performance evaluation.",
    longDescription: "Spearheaded the development of a comprehensive web-based OBE system designed to revolutionize academic performance evaluation. The system features detailed GPA/CGPA reporting, CLO/PLO-based performance analysis, CQI tools, and comprehensive survey & feedback mechanisms.",
    image: "/assets/projects/lms-thumbnail.jpg",
    videoUrl: "/assets/PROJECT-TUT_VIDEOS/FYP_LMS_PROJECT/LMS_VIDEO.mov",
    technologies: ["React.js", "Node.js", "Express.js", "MS SQL Server", "JWT", "Azure"],
    features: [
      "Detailed GPA/CGPA Reporting",
      "CLO/PLO Performance Analysis",
      "CQI Tools",
      "Survey & Feedback System",
      "Role-based Access Control"
    ],
    githubUrl: "https://github.com/yourusername/lms",
    liveUrl: null,
    duration: "8 months",
    teamSize: "3",
    role: "Assistant Group Leader",
    status: "Completed"
  },
  // Add more projects here
];

// Certificates Data
export const certificatesData = [
  {
    id: 1,
    title: "Certificate 0",
    issuer: "Organization Name",
    date: "2024-01-15",
    type: "Professional",
    image: "/assets/Certificates/Certificate0.png",
    credentialUrl: "#",
    description: "Certificate description here"
  },
  {
    id: 2,
    title: "Certificate 1",
    issuer: "Organization Name",
    date: "2024-02-20",
    type: "Professional",
    image: "/assets/Certificates/Certificate1.png",
    credentialUrl: "#",
    description: "Certificate description here"
  },
  {
    id: 3,
    title: "Certificate 2",
    issuer: "Organization Name",
    date: "2024-03-10",
    type: "Course",
    image: "/assets/Certificates/Certificate2.png",
    credentialUrl: "#",
    description: "Certificate description here"
  },
  {
    id: 4,
    title: "Certificate 3",
    issuer: "Organization Name",
    date: "2024-04-05",
    type: "Professional",
    image: "/assets/Certificates/Certificate3.png",
    credentialUrl: "#",
    description: "Certificate description here"
  },
  {
    id: 5,
    title: "Certificate 4",
    issuer: "Organization Name",
    date: "2024-05-12",
    type: "Course",
    image: "/assets/Certificates/Certificate4.png",
    credentialUrl: "#",
    description: "Certificate description here"
  },
  {
    id: 6,
    title: "Certificate 5",
    issuer: "Organization Name",
    date: "2024-06-18",
    type: "Professional",
    image: "/assets/Certificates/Certificate5.png",
    credentialUrl: "#",
    description: "Certificate description here"
  },
  {
    id: 7,
    title: "Certificate 6",
    issuer: "Organization Name",
    date: "2024-07-22",
    type: "Course",
    image: "/assets/Certificates/Certificate6.png",
    credentialUrl: "#",
    description: "Certificate description here"
  }
];

// Education Data
export const educationData = [
  {
    id: 1,
    degree: "Bachelor of Science in Computer Science",
    institution: "University Name",
    location: "Karachi, Pakistan",
    duration: "2021 - 2025",
    gpa: "3.8/4.0",
    description: "Focused on Software Engineering, Web Development, and Database Systems.",
    achievements: [
      "Dean's List (3 semesters)",
      "Led Final Year Project on LMS System",
      "Member of Computer Science Society"
    ],
    logo: "/assets/education/university-logo.png"
  },
  {
    id: 2,
    degree: "Intermediate in Pre-Engineering",
    institution: "College Name",
    location: "Karachi, Pakistan",
    duration: "2019 - 2021",
    grade: "A Grade",
    description: "Strong foundation in Mathematics, Physics, and Chemistry.",
    achievements: [
      "Secured A+ in Computer Science",
      "Merit Certificate"
    ]
  }
];

// FYP (Final Year Project) Data
export const fypData = {
  title: "STUDENT CENTRIC LMS V2.0",
  subtitle: "Final Year Project - 2025",
  description: "A comprehensive web-based Outcome-Based Education (OBE) system aimed at enhancing academic performance evaluation, continuous quality improvement, and feedback automation within educational institutions.",
  longDescription: "Spearheaded the development of a comprehensive web-based OBE system designed to revolutionize academic performance evaluation. The system features detailed GPA/CGPA reporting, CLO/PLO-based performance analysis, CQI tools for identifying students not meeting learning outcomes, and comprehensive survey & feedback mechanisms. Built with React.js, Node.js, Express.js, and MS SQL Server, deployed on Microsoft Azure with JWT authentication and protected routes.",
  technologies: ["React.js", "Node.js", "Express.js", "MS SQL Server", "JWT Authentication", "Microsoft Azure", "RESTful APIs"],
  category: "Web Development",
  duration: "8 Months",
  teamSize: "3",
  role: "Assistant Group Leader",
  status: "Completed",
  features: [
    {
      title: "Academic Performance Tracking",
      description: "Detailed GPA/CGPA reporting with semester-wise analysis",
      icon: "FiTrendingUp"
    },
    {
      title: "CLO/PLO Analysis",
      description: "Course and Program Learning Outcomes evaluation",
      icon: "FiTarget"
    },
    {
      title: "CQI Tools",
      description: "Continuous Quality Improvement for academic excellence",
      icon: "FiCheckCircle"
    },
    {
      title: "Survey & Feedback",
      description: "Automated feedback collection and analysis system",
      icon: "FiMessageSquare"
    },
    {
      title: "Role-based Access",
      description: "Secure authentication with different user roles",
      icon: "FiShield"
    },
    {
      title: "Cloud Deployment",
      description: "Deployed on Microsoft Azure for scalability",
      icon: "FiCloud"
    }
  ],
  presentationPdf: "/assets/Presentation/FYP(1) OBE 21SW49,43,28.pdf",
  demoVideo: "/assets/PROJECT-TUT_VIDEOS/FYP_LMS_PROJECT/LMS_VIDEO.mov",
  githubUrl: "https://github.com/yourusername/lms-project",
  achievements: [
    "Successfully implemented complete OBE cycle",
    "Reduced manual reporting time by 70%",
    "Improved feedback response rate by 85%"
  ]
};

// Contact Information
export const contactInfo = {
  email: "ishaque@example.com",
  phone: "+92 XXX XXXXXXX",
  location: "Karachi, Pakistan",
  availability: "Available for freelance work",
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername"
  }
};

// Counter Section Data
export const counterData = [
  {
    id: 1,
    value: 10,
    suffix: "+",
    label: "Projects Completed",
    icon: "FiCode",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: 2,
    value: 2,
    suffix: "+",
    label: "Years Experience",
    icon: "FiAward",
    color: "from-purple-500 to-pink-500"
  },
  {
    id: 3,
    value: 15,
    suffix: "+",
    label: "Technologies",
    icon: "FiCpu",
    color: "from-green-500 to-emerald-500"
  },
  {
    id: 4,
    value: 7,
    suffix: "",
    label: "Certifications",
    icon: "FiCheckCircle",
    color: "from-orange-500 to-red-500"
  }
];

// Export everything as default for easy import
export default {
  personalInfo,
  stats,
  skillsData,
  projectsData,
  certificatesData,
  educationData,
  fypData,
  contactInfo,
  counterData
};
