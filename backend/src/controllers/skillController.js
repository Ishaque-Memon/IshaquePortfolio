import Skill from '../models/Skill.js';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/responseHandler.js';
import { emitSocketEvent } from '../utils/socketEmitter.js';

// @desc    Get all skills
// @route   GET /api/skills
// @access  Public
export const getAllSkills = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 50 } = req.query;

    const filter = category ? { category } : {};
    const skip = (page - 1) * limit;

    const skills = await Skill.find(filter)
      .sort({ category: 1, order: 1, name: 1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Skill.countDocuments(filter);

    return sendPaginatedResponse(res, skills, parseInt(page), parseInt(limit), total);
  } catch (error) {
    next(error);
  }
};

// @desc    Get skills grouped by category
// @route   GET /api/skills/grouped
// @access  Public
export const getSkillsGrouped = async (req, res, next) => {
  try {
    const skills = await Skill.find().sort({ category: 1, order: 1, name: 1 });

    // Group skills by category
    const grouped = skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {});

    return sendSuccess(res, 'Skills retrieved successfully', grouped);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single skill by ID
// @route   GET /api/skills/:id
// @access  Public
export const getSkillById = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return sendError(res, 'Skill not found', 404);
    }

    return sendSuccess(res, 'Skill retrieved successfully', skill);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new skill
// @route   POST /api/skills
// @access  Private (Admin)
export const createSkill = async (req, res, next) => {
  try {
    const skill = await Skill.create(req.body);

    // Emit socket event when new skill is added
    emitSocketEvent('skillCreated', skill);

    return sendSuccess(res, 'Skill created successfully', skill, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
// @access  Private (Admin)
export const updateSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!skill) {
      return sendError(res, 'Skill not found', 404);
    }

    // Emit socket event when skill is updated
    emitSocketEvent('skillUpdated', skill);

    return sendSuccess(res, 'Skill updated successfully', skill);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
// @access  Private (Admin)
export const deleteSkill = async (req, res, next) => {
  try {
    const skill = await Skill.findById(req.params.id);

    if (!skill) {
      return sendError(res, 'Skill not found', 404);
    }

    await skill.deleteOne();

    // Emit socket event when skill is deleted
    emitSocketEvent('skillDeleted', { id: req.params.id });

    return sendSuccess(res, 'Skill deleted successfully');
  } catch (error) {
    next(error);
  }
};
