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
      router.post('/', 
                  protect, 
                  upload.fields([
                  { name: 'profileImage', maxCount: 1 },
                  { name: 'resumeFile', maxCount: 1 },
                  { name: 'aboutImage',   maxCount: 1 } 
                ]), 
                createOrUpdateAbout);
                
      router.patch('/statistics', protect, updateStatistics);

    router.delete('/:id', protect, deleteAbout);

export default router;
