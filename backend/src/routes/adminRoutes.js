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
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/login', loginAdmin);

// Protected routes (Admin)
router.get('/profile', protect, getAdminProfile);
router.put('/profile', protect, updateAdminProfile);
router.put('/change-password', protect, changePassword);

// Super Admin routes (you can add admin role check middleware later)
router.post('/create', protect, createAdmin);
router.get('/all', protect, getAllAdmins);
router.delete('/:id', protect, deleteAdmin);

export default router;
