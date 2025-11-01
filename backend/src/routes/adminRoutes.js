import express from 'express';
import {
  loginAdmin,
  getAdminProfile,
  updateAdminProfile,
  changePassword,
  createAdmin,
  getAllAdmins,
  deleteAdmin
} from '../controllers/adminController.js';
import { protect, requireAdmin } from '../middleware/authMiddleware.js';
import ipAllowMiddleware from '../middleware/ipAllowMiddleware.js';


const router = express.Router();

// Public routes - IP restricted
router.post('/login', ipAllowMiddleware, loginAdmin);
router.get('/access-check', ipAllowMiddleware, (req, res) => {
  return res.json({ allowed: true });
});

// Protected routes - JWT authentication required
router.use(protect, requireAdmin);

// Profile management
router.get('/profile', getAdminProfile);
router.put('/profile', updateAdminProfile);
router.put('/change-password', changePassword);

// Admin management (Admin only)
router.post('/create', createAdmin);
router.get('/all', getAllAdmins);
router.delete('/:id', deleteAdmin);

export default router;
