import express from 'express';
import {
  getAllCertificates,
  getCertificateById,
  createCertificate,
  updateCertificate,
  deleteCertificate
} from '../controllers/certificateController.js';
import { protect } from '../middleware/authMiddleware.js';
import { upload } from '../utils/uploadHelper.js';

const router = express.Router();

// Public routes
router.get('/', getAllCertificates);
router.get('/:id', getCertificateById);

// Protected routes (Admin only)
router.post('/', protect, upload.single('image'), createCertificate);
router.put('/:id', protect, upload.single('image'), updateCertificate);
router.delete('/:id', protect, deleteCertificate);

export default router;
