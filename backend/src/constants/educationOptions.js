/**
 * Education Options Constants
 * Centralized education metadata for Pakistan & Global education systems
 */

export const EDUCATION_STATUS_OPTIONS = [
  { value: "InProgress", label: "In Progress" },
  { value: "Completed", label: "Completed" },
  { value: "Graduated", label: "Graduated" },
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Postgraduate", label: "Postgraduate" },
  { value: "DroppedOut", label: "Dropped Out" },
  { value: "Planned", label: "Planned" }
];

export const EDUCATION_LEVELS = [
  { value: "ssc", label: "SSC (Matriculation)" },
  { value: "hsc", label: "HSC (Intermediate)" },
  { value: "olevel", label: "O Level" },
  { value: "alevel", label: "A Level" },
  { value: "diploma", label: "Diploma" },
  { value: "associate", label: "Associate Degree" },
  { value: "bachelor", label: "Bachelor's Degree" },
  { value: "master", label: "Master's Degree" },
  { value: "mphil", label: "M.Phil" },
  { value: "phd", label: "PhD / Doctorate" },
  { value: "certification", label: "Professional Certification" },
  { value: "other", label: "Other" }
];

export const BOARDS_UNIVERSITIES = [
  // === Pakistan Education Boards ===
  { value: "fbise", label: "Federal Board (FBISE)", type: "board" },
  { value: "bise-lahore", label: "BISE Lahore", type: "board" },
  { value: "bise-karachi", label: "BISE Karachi", type: "board" },
  { value: "bise-rawalpindi", label: "BISE Rawalpindi", type: "board" },
  { value: "bise-multan", label: "BISE Multan", type: "board" },
  { value: "bise-faisalabad", label: "BISE Faisalabad", type: "board" },
  { value: "bise-hyderabad", label: "BISE Hyderabad", type: "board" },
  { value: "bise-peshawar", label: "BISE Peshawar", type: "board" },
  { value: "bise-quetta", label: "BISE Quetta", type: "board" },
  
  // === International Boards ===
  { value: "cambridge", label: "Cambridge International", type: "board" },
  { value: "edexcel", label: "Edexcel", type: "board" },
  
  // === Pakistan Universities ===
  { value: "nust", label: "National University of Sciences & Technology", type: "university" },
  { value: "fast", label: "National University of Computer & Emerging Sciences", type: "university" },
  { value: "comsats", label: "COMSATS University Islamabad", type: "university" },
  { value: "ned", label: "NED University of Engineering & Technology", type: "university" },
  { value: "giki", label: "Ghulam Ishaq Khan Institute", type: "university" },
  { value: "quest", label: "Quaid-e-Awam University of Engineering Sciences & Technology", type: "university" },
  { value: "muet", label: "Mehran University of Engineering and Technology", type: "university" },
  { value: "lums", label: "Lahore University of Management Sciences", type: "university" },
  { value: "pu", label: "University of Punjab", type: "university" },
  { value: "ku", label: "University of Karachi", type: "university" },
  { value: "qau", label: "Quaid-i-Azam University", type: "university" },
  { value: "iiu", label: "International Islamic University", type: "university" },
  { value: "bahria", label: "Bahria University", type: "university" },
  { value: "air", label: "Air University", type: "university" },
  { value: "iqra", label: "Iqra University", type: "university" },
  { value: "szabist", label: "SZABIST", type: "university" },
  { value: "uet-lahore", label: "UET Lahore", type: "university" },
  { value: "uet-taxila", label: "UET Taxila", type: "university" },
  { value: "uet-peshawar", label: "UET Peshawar", type: "university" },
  
  { value: "custom", label: "Other Institution", type: "custom" }
];

export const DEGREE_OPTIONS = {
  ssc: [
    "General Science",
    "Computer Science",
    "Humanities",
    "Other"
  ],
  hsc: [
    "Pre-Engineering",
    "Pre-Medical",
    "Computer Science (ICS)",
    "Commerce",
    "Humanities",
    "General Science",
    "Other"
  ],
  olevel: [
    "O Level General",
    "Science Group",
    "Commerce Group",
    "Arts Group",
    "Other"
  ],
  alevel: [
    "A Level General",
    "Science Group",
    "Pre-Engineering",
    "Pre-Medical",
    "Computer Science",
    "Business Studies",
    "Other"
  ],
  diploma: [
    "Diploma in Engineering",
    "Diploma in IT",
    "Diploma in Business",
    "Diploma in Graphics",
    "Other"
  ],
  associate: [
    "Associate of Science (AS)",
    "Associate of Arts (AA)",
    "Associate of Engineering (AE)",
    "Other"
  ],
  bachelor: [
    "Bachelor of Science (BS/BSc)",
    "Bachelor of Engineering (BE)",
    "Bachelor of Technology (B.Tech)",
    "Bachelor of Computer Science (BSCS)",
    "Bachelor of Software Engineering (BSSE)",
    "Bachelor of Arts (BA)",
    "Bachelor of Business Administration (BBA)",
    "Bachelor of Commerce (B.Com)",
    "Other"
  ],
  master: [
    "Master of Science (MS/MSc)",
    "Master of Engineering (ME)",
    "Master of Computer Science (MSCS)",
    "Master of Business Administration (MBA)",
    "Master of Arts (MA)",
    "Master of Commerce (M.Com)",
    "Other"
  ],
  mphil: [
    "M.Phil in Computer Science",
    "M.Phil in Engineering",
    "M.Phil in Management Sciences",
    "M.Phil in Social Sciences",
    "Other"
  ],
  phd: [
    "PhD in Computer Science",
    "PhD in Engineering",
    "PhD in Management Sciences",
    "PhD in Social Sciences",
    "Other"
  ],
  certification: [
    "Professional Certification",
    "Technical Certification",
    "Other"
  ],
  other: ["Other"]
};

export const SPECIALIZATION_OPTIONS = {
  bachelor: [
    "Computer Science",
    "Software Engineering",
    "Information Technology",
    "Artificial Intelligence",
    "Data Science",
    "Cyber Security",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Civil Engineering",
    "Business Administration",
    "Other"
  ],
  master: [
    "Computer Science",
    "Software Engineering",
    "Information Technology",
    "Artificial Intelligence",
    "Data Science",
    "Machine Learning",
    "Cyber Security",
    "Electrical Engineering",
    "Mechanical Engineering",
    "Business Administration",
    "Project Management",
    "Other"
  ],
  mphil: [
    "Computer Science",
    "Software Engineering",
    "Artificial Intelligence",
    "Data Science",
    "Engineering",
    "Management Sciences",
    "Other"
  ],
  phd: [
    "Computer Science",
    "Software Engineering",
    "Artificial Intelligence",
    "Data Science",
    "Engineering",
    "Management Sciences",
    "Other"
  ]
};

// Helper functions
export const getInstitutionFieldType = (level) => {
  if (level === 'ssc' || level === 'olevel') return 'school';
  if (level === 'hsc' || level === 'alevel') return 'college';
  if (level === 'diploma' || level === 'certification') return 'institute';
  if (['bachelor', 'master', 'mphil', 'phd', 'associate'].includes(level)) return 'university';
  return 'board';
};

export const getFilteredBoards = (level) => {
  if (level === 'ssc' || level === 'hsc') {
    return BOARDS_UNIVERSITIES.filter(b => b.type === 'board' && !['cambridge', 'edexcel'].includes(b.value));
  }
  if (level === 'olevel' || level === 'alevel') {
    return BOARDS_UNIVERSITIES.filter(b => ['cambridge', 'edexcel', 'custom'].includes(b.value));
  }
  if (['bachelor', 'master', 'mphil', 'phd', 'associate'].includes(level)) {
    return BOARDS_UNIVERSITIES.filter(b => b.type === 'university' || b.value === 'custom');
  }
  return BOARDS_UNIVERSITIES;
};

export const shouldShowSpecialization = (level) => {
  return ['bachelor', 'master', 'mphil', 'phd'].includes(level);
};

export const getFieldLabel = (level) => {
  if (level === 'ssc' || level === 'hsc') return 'Group/Field';
  if (level === 'olevel' || level === 'alevel') return 'Subject Group';
  return 'Degree Name';
};

export const getSpecializationLabel = (level) => {
  if (level === 'bachelor' || level === 'master') return 'Major/Specialization';
  if (level === 'mphil' || level === 'phd') return 'Research Area';
  return 'Specialization';
};
