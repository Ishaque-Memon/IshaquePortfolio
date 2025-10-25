import Education from '../models/Education.js';
import {
  EDUCATION_LEVELS,
  BOARDS_UNIVERSITIES,
  DEGREE_OPTIONS,
  SPECIALIZATION_OPTIONS,
  EDUCATION_STATUS_OPTIONS,
} from '../constants/educationOptions.js';
import { emitSocketEvent } from '../utils/socketEmitter.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

// @desc    Get education metadata/options
// @route   GET /api/education/options/metadata
// @access  Public
export const getEducationOptions = async (req, res, next) => {
  try {
    return sendSuccess(res, 'Education options fetched successfully', {
      levels: EDUCATION_LEVELS,
      boardsUniversities: BOARDS_UNIVERSITIES,
      degreeOptions: DEGREE_OPTIONS,
      specializationOptions: SPECIALIZATION_OPTIONS,
      educationStatusOptions: EDUCATION_STATUS_OPTIONS
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get all education entries
// @route   GET /api/education
// @access  Public or Private (Admin)
export const getAllEducation = async (req, res, next) => {
  try {
    const education = await Education.find().sort({ startDate: -1 });
    return sendSuccess(res, 'Education data retrieved successfully', education);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single education entry
// @route   GET /api/education/:id
// @access  Public
export const getEducationById = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return sendError(res, 'Education entry not found', 404);

    return sendSuccess(res, 'Education entry retrieved successfully', education);
  } catch (err) {
    next(err);
  }
};

// @desc    Create new education entry
// @route   POST /api/education
// @access  Private (Admin)
export const createEducation = async (req, res, next) => {
  try {
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
      description,
      logoUrl,
      academicDescription,
      educationStatus
    } = req.body;

    // Validate required fields
    if (!level) {
      return sendError(res, 'Education level is required', 400);
    }
    if (!degree) {
      return sendError(res, 'Degree/qualification is required', 400);
    }
    if (!startDate) {
      return sendError(res, 'Start date is required', 400);
    }

    const educationData = {
      level,
      degree,
      startDate,
      isPresent: isPresent || false
    };

    // Optional fields - only add if they have values
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
    if (logoUrl) educationData.logoUrl = logoUrl;
    if (academicDescription) educationData.academicDescription = academicDescription;
    if (educationStatus) educationData.educationStatus = educationStatus;

    const education = await Education.create(educationData);

    // Emit socket event when new education is added
    emitSocketEvent(req, 'education_created', education);

    return sendSuccess(res, 'Education entry created successfully', education, 201);
  } catch (err) {
    console.error('Create education error:', err);
    next(err);
  }
};

// @desc    Update education entry
// @route   PUT /api/education/:id
// @access  Private (Admin)
export const updateEducation = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return sendError(res, 'Education entry not found', 404);

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
      description,
      logoUrl,
      academicDescription,
      educationStatus
    } = req.body;

    // Update required fields
    if (level) education.level = level;
    if (degree) education.degree = degree;
    if (startDate) education.startDate = startDate;
    
    // Handle isPresent and endDate
    if (typeof isPresent !== 'undefined') {
      education.isPresent = isPresent;
      education.endDate = isPresent ? null : endDate;
    }

    // Update optional fields - use undefined to remove, null to keep empty
    // This handles both clearing and updating fields
    education.specialization = specialization !== undefined ? specialization || null : education.specialization;
    education.board = board !== undefined ? board || null : education.board;
    education.university = university !== undefined ? university || null : education.university;
    education.school = school !== undefined ? school || null : education.school;
    education.college = college !== undefined ? college || null : education.college;
    education.institute = institute !== undefined ? institute || null : education.institute;
    education.customInstitution = customInstitution !== undefined ? customInstitution || null : education.customInstitution;
    education.location = location !== undefined ? location || null : education.location;
    education.grade = grade !== undefined ? grade || null : education.grade;
    education.description = description !== undefined ? description || null : education.description;
    education.academicDescription = academicDescription !== undefined ? academicDescription || null : education.academicDescription;
    education.educationStatus = educationStatus !== undefined ? educationStatus || 'Planned' : education.educationStatus;

    // Critical fix for logoUrl - always update if provided
    if (logoUrl !== undefined) {
      education.logoUrl = logoUrl || null;
    }

    const updatedEducation = await education.save();

    // Emit socket event when education is updated
    emitSocketEvent(req, 'education_updated', updatedEducation);

    return sendSuccess(res, 'Education entry updated successfully', updatedEducation);
  } catch (err) {
    console.error('Update education error:', err);
    next(err);
  }
};

// @desc    Delete education entry
// @route   DELETE /api/education/:id
// @access  Private (Admin)
export const deleteEducation = async (req, res, next) => {
  try {
    const education = await Education.findById(req.params.id);
    if (!education) return sendError(res, 'Education entry not found', 404);

    await education.deleteOne();

    // Emit socket event when education is deleted
    emitSocketEvent(req, 'education_deleted', { id: req.params.id });

    return sendSuccess(res, 'Education entry deleted successfully');
  } catch (err) {
    next(err);
  }
};