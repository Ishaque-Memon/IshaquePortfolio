import express from 'express';
import { logVisit, getVisitAnalytics } from '../controllers/analyticsController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Log a visit (public, but skips admin)
router.post('/visit', logVisit, (req, res) => res.json({ success: true }));

// Get analytics summary (admin only)
router.get('/summary', protect, getVisitAnalytics);

export default router;
