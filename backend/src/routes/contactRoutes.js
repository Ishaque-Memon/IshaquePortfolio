import express from 'express';
import {
  submitContactMessage,
  getAllMessages,
  getMessageById,
  updateMessageStatus,
  deleteMessage,
  getMessageStats
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route
router.post('/', submitContactMessage);

// Protected routes (Admin only)
router.get('/', protect, getAllMessages);
router.get('/stats', protect, getMessageStats);
router.get('/:id', protect, getMessageById);
router.patch('/:id/status', protect, updateMessageStatus);
router.delete('/:id', protect, deleteMessage);

export default router;
