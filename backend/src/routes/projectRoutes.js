import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
} from '../controllers/projectController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../utils/uploadHelper.js';

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes (Admin only)
router.post('/', protect, upload.array('images', 5), createProject); // Max 5 images
router.put('/:id', protect, upload.array('images', 5), updateProject);
router.delete('/:id', protect, deleteProject);

export default router;
