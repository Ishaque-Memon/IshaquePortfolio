import express from 'express';
import {
  getAllSkills,
  getSkillsGrouped,
  getSkillById,
  createSkill,
  updateSkill,
  deleteSkill
} from '../controllers/skillController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllSkills);
router.get('/grouped', getSkillsGrouped);
router.get('/:id', getSkillById);

// Protected routes (Admin only)
router.post('/', protect, createSkill);
router.put('/:id', protect, updateSkill);
router.delete('/:id', protect, deleteSkill);

export default router;
