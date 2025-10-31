import express from 'express';
import { upload, uploadToCloudinary } from '../utils/uploadHelper.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

const router = express.Router();

/**
 * @route   POST /api/upload
 * @desc    Upload a file to Cloudinary
 * @access  Private (Admin)
 */
router.post('/', upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) {
      return sendError(res, 'No file uploaded', 400);
    }

    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, 'education-logos');

    // Return the secure URL
    return sendSuccess(res, 'File uploaded successfully', { url: result.url });
  } catch (error) {
  // ...removed console.error('Upload error:', error);
    return sendError(res, 'File upload failed', 500);
  }
});

export default router;
