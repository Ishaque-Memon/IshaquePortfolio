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
import { emitSocketEvent } from '../utils/socketEmitter.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

// @desc    Get education metadata/options
// @route   GET /api/education/options
// @access  Public
export const getEducationOptions = async (req, res, next) => {
  try {
    return sendSuccess(res, 'Education options fetched successfully', {
      levels: EDUCATION_LEVELS,
      boardsUniversities: BOARDS_UNIVERSITIES,
      degreeOptions: DEGREE_OPTIONS,
      specializationOptions: SPECIALIZATION_OPTIONS
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
      description
    } = req.body;

    const educationData = {
      level,
      degree,
      startDate,
      isPresent: isPresent || false
    };

    // Optional fields
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

    const education = await Education.create(educationData);

    // 🔴 Emit socket event (new education created)
    emitSocketEvent('education_created', education);

    return sendSuccess(res, 'Education entry created successfully', education, 201);
  } catch (err) {
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
      description
    } = req.body;

    // Update fields
    education.level = level;
    education.degree = degree;
    education.startDate = startDate;
    education.isPresent = isPresent || false;
    education.endDate = isPresent ? null : endDate;

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

    // 🟢 Emit socket event (education updated)
    emitSocketEvent('education_updated', updatedEducation);

    return sendSuccess(res, 'Education entry updated successfully', updatedEducation);
  } catch (err) {
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

    // 🔵 Emit socket event (education deleted)
    emitSocketEvent('education_deleted', { id: req.params.id });

    return sendSuccess(res, 'Education entry deleted successfully');
  } catch (err) {
    next(err);
  }
};
