import express from 'express';
import {
  getAllEducation,
  getEducationById,
  getEducationOptions,
  createEducation,
  updateEducation,
  deleteEducation
} from '../controllers/educationController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.get('/', getAllEducation);
router.get('/options/metadata', getEducationOptions); // Education options endpoint
router.get('/:id', getEducationById);

// Protected routes (admin only)
router.post('/', protect, createEducation);
router.put('/:id', protect, updateEducation);
router.delete('/:id', protect, deleteEducation);

export default router;
