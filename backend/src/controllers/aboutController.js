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
      title, name, bio, email, phone,
      location, socialLinks, statistics
    } = req.body;

    let about = await About.findOne({ isActive: true });
    const updateData = {
      title,
      name,
      bio,
      email,
      phone,
      location: location ? JSON.parse(location) : undefined,
      socialLinks: socialLinks ? JSON.parse(socialLinks) : undefined,
      statistics: statistics ? JSON.parse(statistics) : undefined,
      isActive: true,
    };

    // Handle file uploads (profile + resume)
    if (req.files?.profileImage?.[0]) {
      const imgResult = await uploadToCloudinary(req.files.profileImage[0].buffer, "portfolio/profile");
      if (about?.profileImage?.publicId) {
        await deleteFromCloudinary(about.profileImage.publicId);
      }
      updateData.profileImage = { url: imgResult.url, publicId: imgResult.publicId };
    }

    if (req.files?.resumeFile?.[0]) {
      const fileResult = await uploadToCloudinary(req.files.resumeFile[0].buffer, "portfolio/resume");
      if (about?.resumeFile?.publicId) {
        await deleteFromCloudinary(about.resumeFile.publicId);
      }
      updateData.resumeFile = { url: fileResult.url, publicId: fileResult.publicId };
    }

    if (about) {
      Object.assign(about, updateData);
      await about.save();
      return sendSuccess(res, "About information updated successfully", about);
    } else {
      const newAbout = await About.create(updateData);
      return sendSuccess(res, "About information created successfully", newAbout, 201);
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
