import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
  level: {
    type: String,
    required: [true, 'Education level is required'],
    enum: ['ssc', 'hsc', 'olevel', 'alevel', 'diploma', 'associate', 'bachelor', 'master', 'mphil', 'phd', 'certification', 'other']
  },
  // For SSC/HSC/O-Level/A-Level: This is the group/field (Pre-Engineering, Pre-Medical, etc.)
  // For Bachelor/Master/etc: This is the degree name (Bachelor of Science, Master of Engineering, etc.)
  degree: {
    type: String,
    required: [true, 'Degree/qualification is required'],
    trim: true
  },
  // For higher education: specialization (Computer Science, Software Engineering, etc.)
  specialization: {
    type: String,
    trim: true
  },
  
  // === Education Board (for SSC/HSC/O-Level/A-Level) ===
  board: {
    type: String,
    trim: true
  },
  
  // === University (for Bachelor/Master/PhD etc.) ===
  university: {
    type: String,
    trim: true
  },
  
  // === School Name (for SSC/O-Level) ===
  school: {
    type: String,
    trim: true
  },
  
  // === College Name (for HSC/A-Level) ===
  college: {
    type: String,
    trim: true
  },
  
  // === Institute Name (for Diploma/Certification) ===
  institute: {
    type: String,
    trim: true
  },
  
  // Custom institution name (when "Other" is selected for any level)
  customInstitution: {
    type: String,
    trim: true
  },
  
  location: {
    type: String,
    trim: true
  },
  startDate: {
    type: String,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: String
  },
  isPresent: {
    type: Boolean,
    default: false
  },
  grade: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Education', educationSchema);
