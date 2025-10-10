import express from 'express';
import {
  getAbout,
  createOrUpdateAbout,
  updateStatistics,
  deleteAbout
} from '../controllers/aboutController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../utils/uploadHelper.js';

const router = express.Router();

// Public routes
router.get('/', getAbout);

// Protected routes (Admin only)
router.post('/', protect, upload.single('profileImage'), createOrUpdateAbout);
router.patch('/statistics', protect, updateStatistics);
router.delete('/:id', protect, deleteAbout);

export default router;
