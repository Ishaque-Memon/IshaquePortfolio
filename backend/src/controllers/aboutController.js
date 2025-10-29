// controllers/aboutController.js
import About from '../models/About.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import { emitSocketEvent } from '../utils/socketEmitter.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadHelper.js';

// helper: safe JSON parse
const safeParse = (val) => {
  if (val === undefined || val === null) return undefined;
  if (typeof val !== 'string') return val;
  try {
    return JSON.parse(val);
  } catch (err) {
    console.warn('safeParse failed for value:', String(val).slice(0, 200));
    return undefined;
  }
};

// GET active about
export const getAbout = async (req, res, next) => {
  try {
    const about = await About.findOne({ isActive: true });
    if (!about) return sendError(res, 'About information not found', 404);
    return sendSuccess(res, 'About information retrieved successfully', about);
  } catch (error) {
    next(error);
  }
};

// CREATE or UPDATE about
export const createOrUpdateAbout = async (req, res, next) => {
  try {
    // DEBUG: log incoming request keys (temporary)
    console.log('--- createOrUpdateAbout received ---');
    console.log('req.body keys:', Object.keys(req.body || {}));
    console.log('req.files keys:', req.files ? Object.keys(req.files) : '(no files)');
    if (req.files) {
      Object.entries(req.files).forEach(([k, arr]) => {
        console.log(`file field "${k}" count:`, arr.length, 'originalname:', arr[0]?.originalname);
      });
    }

    // Extract raw fields
    const {
      title, name, bio, email, phone,
      location, socialLinks, statistics, expertiseAreas
    } = req.body;

    const parsedLocation = safeParse(location);
    const parsedSocialLinks = safeParse(socialLinks);
    const parsedStatistics = safeParse(statistics);
    let parsedExpertise = safeParse(expertiseAreas);

    // Ensure expertise is array
    if (parsedExpertise === undefined) {
      parsedExpertise = [];
    } else if (!Array.isArray(parsedExpertise)) {
      parsedExpertise = [];
    }

    let about = await About.findOne({ isActive: true });

    const updateData = {
      title,
      name,
      bio,
      email,
      phone,
      location: parsedLocation,
      socialLinks: parsedSocialLinks,
      statistics: parsedStatistics,
      expertiseAreas: parsedExpertise,
      isActive: true,
    };

    // Handle file uploads: profileImage, resumeFile, aboutImage
    if (req.files?.profileImage?.[0]) {
      try {
        const imgResult = await uploadToCloudinary(req.files.profileImage[0].buffer, "portfolio/profile");
        if (about?.profileImage?.publicId) {
          try { await deleteFromCloudinary(about.profileImage.publicId); } catch (e) { console.warn('Failed deleting old profileImage:', e.message); }
        }
        updateData.profileImage = { url: imgResult.url, publicId: imgResult.publicId };
      } catch (err) {
        console.error('Profile image upload failed:', err);
        return sendError(res, `File upload error: profileImage upload failed`, 500);
      }
    }

    if (req.files?.resumeFile?.[0]) {
      try {
        const fileResult = await uploadToCloudinary(req.files.resumeFile[0].buffer, "portfolio/resume");
        if (about?.resumeFile?.publicId) {
          try { await deleteFromCloudinary(about.resumeFile.publicId); } catch (e) { console.warn('Failed deleting old resumeFile:', e.message); }
        }
        updateData.resumeFile = { url: fileResult.url, publicId: fileResult.publicId };
      } catch (err) {
        console.error('Resume file upload failed:', err);
        return sendError(res, `File upload error: resumeFile upload failed`, 500);
      }
    }

    if (req.files?.aboutImage?.[0]) {
      try {
        const aboutImgRes = await uploadToCloudinary(req.files.aboutImage[0].buffer, "portfolio/about");
        if (about?.aboutImage?.publicId) {
          try { await deleteFromCloudinary(about.aboutImage.publicId); } catch (e) { console.warn('Failed deleting old aboutImage:', e.message); }
        }
        updateData.aboutImage = { url: aboutImgRes.url, publicId: aboutImgRes.publicId };
      } catch (err) {
        console.error('About image upload failed:', err);
        return sendError(res, `File upload error: aboutImage upload failed`, 500);
      }
    }

    // If about exists, merge statistics so we don't wipe other stats
    let responseAbout;
    if (about) {
      if (updateData.statistics) {
        about.statistics = { ...(about.statistics || {}), ...updateData.statistics };
        delete updateData.statistics;
      }
      // Merge expertiseAreas: if incoming array empty and not intended to clear, you might want to conditionally keep old value.
      if (Array.isArray(updateData.expertiseAreas) && updateData.expertiseAreas.length === 0 && about.expertiseAreas && about.expertiseAreas.length > 0) {
        // If the client sent an empty array intentionally, this will clear it.
        // If you want to keep previous ones when empty is sent accidentally, remove this block.
      }
      Object.assign(about, updateData);
      responseAbout = await about.save();
      sendSuccess(res, "About information updated successfully", responseAbout);
    } else {
      // For creation ensure statistics defaults to an object
      if (!updateData.statistics) updateData.statistics = {};
      responseAbout = await About.create(updateData);
      sendSuccess(res, "About information created successfully", responseAbout, 201);
    }

    // emit global socket event
    emitSocketEvent("aboutUpdated", responseAbout);
  } catch (error) {
    console.error('createOrUpdateAbout error:', error);
    next(error);
  }
};

// PATCH statistics only (merge allowed keys)
export const updateStatistics = async (req, res, next) => {
  try {
    const about = await About.findOne({ isActive: true });
    if (!about) return sendError(res, 'About information not found', 404);

    // Merge incoming req.body with existing statistics
    about.statistics = { ...(about.statistics || {}), ...req.body };
    await about.save();

    sendSuccess(res, 'Statistics updated successfully', about);
    emitSocketEvent("aboutStatisticsUpdated", about);
  } catch (error) {
    next(error);
  }
};

// DELETE handler unchanged
export const deleteAbout = async (req, res, next) => {
  try {
    const about = await About.findById(req.params.id);
    if (!about) return sendError(res, 'About information not found', 404);

    if (about.profileImage?.publicId) await deleteFromCloudinary(about.profileImage.publicId);
    if (about.aboutImage?.publicId) await deleteFromCloudinary(about.aboutImage.publicId);
    if (about.resumeFile?.publicId) await deleteFromCloudinary(about.resumeFile.publicId);

    await about.deleteOne();
    sendSuccess(res, 'About information deleted successfully');
    emitSocketEvent("aboutDeleted", { id: req.params.id });
  } catch (error) {
    next(error);
  }
};
