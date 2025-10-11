import About from '../models/About.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadHelper.js';

// @desc    Get active about info
// @route   GET /api/about
// @access  Public
export const getAbout = async (req, res, next) => {
  try {
    const about = await About.findOne({ isActive: true });

    if (!about) {
      return sendError(res, 'About information not found', 404);
    }

    return sendSuccess(res, 'About information retrieved successfully', about);
  } catch (error) {
    next(error);
  }
};

// @desc    Create or update about info
// @route   POST /api/about
// @access  Private (Admin)
export const createOrUpdateAbout = async (req, res, next) => {
  try {
    const { 
      title, name, bio, email, phone, resumeUrl,
      location, socialLinks, statistics 
    } = req.body;

    // Find existing active about
    let about = await About.findOne({ isActive: true });

    const updateData = {
      title,
      name,
      bio,
      email,
      phone,
      resumeUrl,
      // No need to parse - already objects from JSON body
      location: location || undefined,
      socialLinks: socialLinks || undefined,
      statistics: statistics || undefined,
      isActive: true
    };

    // Handle profile image upload
    if (req.file) {
      const imageResult = await uploadToCloudinary(req.file.buffer, 'portfolio/profile');
      
      // Delete old image if exists
      if (about && about.profileImage.publicId) {
        await deleteFromCloudinary(about.profileImage.publicId);
      }

      updateData.profileImage = {
        url: imageResult.url,
        publicId: imageResult.publicId
      };
    }

    if (about) {
      // Update existing
      Object.assign(about, updateData);
      await about.save();
      return sendSuccess(res, 'About information updated successfully', about);
    } else {
      // Create new (profile image not required for now)
      about = await About.create(updateData);
      return sendSuccess(res, 'About information created successfully', about, 201);
    }
  } catch (error) {
    next(error);
  }
};

// @desc    Update statistics only
// @route   PATCH /api/about/statistics
// @access  Private (Admin)
export const updateStatistics = async (req, res, next) => {
  try {
    const about = await About.findOne({ isActive: true });

    if (!about) {
      return sendError(res, 'About information not found', 404);
    }

    about.statistics = { ...about.statistics, ...req.body };
    await about.save();

    return sendSuccess(res, 'Statistics updated successfully', about);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete about info
// @route   DELETE /api/about/:id
// @access  Private (Admin)
export const deleteAbout = async (req, res, next) => {
  try {
    const about = await About.findById(req.params.id);

    if (!about) {
      return sendError(res, 'About information not found', 404);
    }

    if (about.profileImage.publicId) {
      await deleteFromCloudinary(about.profileImage.publicId);
    }

    await about.deleteOne();

    return sendSuccess(res, 'About information deleted successfully');
  } catch (error) {
    next(error);
  }
};
