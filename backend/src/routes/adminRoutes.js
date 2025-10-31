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
// Public routes
router.post('/login', ipAllowMiddleware, loginAdmin);

// // You can also expose an access-check endpoint to drive frontend UI visibility
router.get('/access-check', ipAllowMiddleware, (req, res) => {
  // simple response - frontend can hide/show login link based on this
  return res.json({ allowed: true });
});

// All routes below require request from allowed IPs, a valid token, and admin role
router.use(ipAllowMiddleware, protect, requireAdmin);

router.get('/profile', getAdminProfile);
router.put('/profile', updateAdminProfile);
router.put('/change-password', changePassword);

// Admin management (Admin only)
router.post('/create', createAdmin);
router.get('/all', getAllAdmins);
router.delete('/:id', deleteAdmin);

export default router;
