import Education from '../models/Education.js';
import {
  EDUCATION_LEVELS,
  BOARDS_UNIVERSITIES,
  DEGREE_OPTIONS,
  SPECIALIZATION_OPTIONS,
  getInstitutionFieldType,
  getFilteredBoards,
  shouldShowSpecialization,
  getFieldLabel,
  getSpecializationLabel
} from '../constants/educationOptions.js';

// Get education metadata/options
export const getEducationOptions = async (req, res) => {
  try {
    res.json({
      levels: EDUCATION_LEVELS,
      boardsUniversities: BOARDS_UNIVERSITIES,
      degreeOptions: DEGREE_OPTIONS,
      specializationOptions: SPECIALIZATION_OPTIONS,
      helpers: {
        getInstitutionFieldType,
        getFilteredBoards,
        shouldShowSpecialization,
        getFieldLabel,
        getSpecializationLabel
      }
    });
  } catch (err) {
    console.error('Error fetching education options:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all education entries
export const getAllEducation = async (req, res) => {
  try {
    const education = await Education.find().sort({ startDate: -1 });
    res.json(education);
  } catch (err) {
    console.error('Error fetching education:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single education entry
export const getEducationById = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    
    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' });
    }
    
    res.json(education);
  } catch (err) {
    console.error('Error fetching education:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new education entry
export const createEducation = async (req, res) => {
  try {
    console.log('📥 Received Education Data:', req.body);
    
    const {
      level,
      degree,
      specialization,
      board,
      university,
      school,
      college,
      institute,
      customInstitution,
      location,
      startDate,
      endDate,
      isPresent,
      grade,
      description
    } = req.body;

    const educationData = {
      level,
      degree,
      startDate,
      isPresent: isPresent || false
    };

    // Add optional fields only if they have values
    if (specialization) educationData.specialization = specialization;
    if (board) educationData.board = board;
    if (university) educationData.university = university;
    if (school) educationData.school = school;
    if (college) educationData.college = college;
    if (institute) educationData.institute = institute;
    if (customInstitution) educationData.customInstitution = customInstitution;
    if (location) educationData.location = location;
    if (grade) educationData.grade = grade;
    if (description) educationData.description = description;
    if (!isPresent && endDate) educationData.endDate = endDate;

    console.log('💾 Saving to DB:', educationData);

    const education = new Education(educationData);
    const savedEducation = await education.save();
    
    console.log('✅ Saved Successfully:', savedEducation);
    res.status(201).json(savedEducation);
  } catch (err) {
    console.error('Error creating education:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Update education entry
export const updateEducation = async (req, res) => {
  try {
    console.log('📥 Update Request Data:', req.body);
    
    const {
      level,
      degree,
      specialization,
      board,
      university,
      school,
      college,
      institute,
      customInstitution,
      location,
      startDate,
      endDate,
      isPresent,
      grade,
      description
    } = req.body;

    const education = await Education.findById(req.params.id);
    
    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    // Update required fields
    education.level = level;
    education.degree = degree;
    education.startDate = startDate;
    education.isPresent = isPresent || false;
    education.endDate = isPresent ? null : endDate;

    // Update optional fields (set to undefined to remove if empty)
    education.specialization = specialization || undefined;
    education.board = board || undefined;
    education.university = university || undefined;
    education.school = school || undefined;
    education.college = college || undefined;
    education.institute = institute || undefined;
    education.customInstitution = customInstitution || undefined;
    education.location = location || undefined;
    education.grade = grade || undefined;
    education.description = description || undefined;

    const updatedEducation = await education.save();
    console.log('✅ Updated Successfully:', updatedEducation);
    res.json(updatedEducation);
  } catch (err) {
    console.error('Error updating education:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete education entry
export const deleteEducation = async (req, res) => {
  try {
    const education = await Education.findById(req.params.id);
    
    if (!education) {
      return res.status(404).json({ message: 'Education entry not found' });
    }

    await education.deleteOne();
    res.json({ message: 'Education entry deleted successfully' });
  } catch (err) {
    console.error('Error deleting education:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
