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

// ===== PUBLIC ROUTES (IP restricted to prevent brute force) =====
router.post('/login', ipAllowMiddleware, loginAdmin);

// Access-check endpoint for frontend UI visibility (Login button)
router.get('/access-check', ipAllowMiddleware, (req, res) => {
  return res.json({ allowed: true });
});

// ===== PROTECTED ROUTES (JWT authentication only) =====
// IP middleware removed from here to prevent login loops when user's IP changes
// JWT token authentication is sufficient and more reliable for authenticated users
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
