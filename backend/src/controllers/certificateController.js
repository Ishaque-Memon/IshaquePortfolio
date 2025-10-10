import Certificate from '../models/Certificate.js';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/responseHandler.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadHelper.js';

// @desc    Get all certificates
// @route   GET /api/certificates
// @access  Public
export const getAllCertificates = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const certificates = await Certificate.find()
      .sort({ issueDate: -1, order: 1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Certificate.countDocuments();

    return sendPaginatedResponse(res, certificates, parseInt(page), parseInt(limit), total);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single certificate by ID
// @route   GET /api/certificates/:id
// @access  Public
export const getCertificateById = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return sendError(res, 'Certificate not found', 404);
    }

    return sendSuccess(res, 'Certificate retrieved successfully', certificate);
  } catch (error) {
    next(error);
  }
};

// @desc    Create new certificate
// @route   POST /api/certificates
// @access  Private (Admin)
export const createCertificate = async (req, res, next) => {
  try {
    const { title, issuer, issueDate, expiryDate, credentialId, credentialUrl, skills, description, order } = req.body;

    if (!req.file) {
      return sendError(res, 'Certificate image is required', 400);
    }

    // Upload image to Cloudinary
    const imageResult = await uploadToCloudinary(req.file.buffer, 'portfolio/certificates');

    const certificate = await Certificate.create({
      title,
      issuer,
      issueDate,
      expiryDate,
      credentialId,
      credentialUrl,
      skills: skills ? JSON.parse(skills) : [],
      description,
      order: parseInt(order) || 0,
      image: {
        url: imageResult.url,
        publicId: imageResult.publicId
      }
    });

    return sendSuccess(res, 'Certificate created successfully', certificate, 201);
  } catch (error) {
    next(error);
  }
};

// @desc    Update certificate
// @route   PUT /api/certificates/:id
// @access  Private (Admin)
export const updateCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return sendError(res, 'Certificate not found', 404);
    }

    const { title, issuer, issueDate, expiryDate, credentialId, credentialUrl, skills, description, order } = req.body;

    // Update fields
    if (title) certificate.title = title;
    if (issuer) certificate.issuer = issuer;
    if (issueDate) certificate.issueDate = issueDate;
    if (expiryDate !== undefined) certificate.expiryDate = expiryDate;
    if (credentialId !== undefined) certificate.credentialId = credentialId;
    if (credentialUrl !== undefined) certificate.credentialUrl = credentialUrl;
    if (skills) certificate.skills = JSON.parse(skills);
    if (description !== undefined) certificate.description = description;
    if (order !== undefined) certificate.order = parseInt(order);

    // Update image if new one is uploaded
    if (req.file) {
      if (certificate.image.publicId) {
        await deleteFromCloudinary(certificate.image.publicId);
      }

      const imageResult = await uploadToCloudinary(req.file.buffer, 'portfolio/certificates');
      certificate.image = {
        url: imageResult.url,
        publicId: imageResult.publicId
      };
    }

    await certificate.save();

    return sendSuccess(res, 'Certificate updated successfully', certificate);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete certificate
// @route   DELETE /api/certificates/:id
// @access  Private (Admin)
export const deleteCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);

    if (!certificate) {
      return sendError(res, 'Certificate not found', 404);
    }

    if (certificate.image.publicId) {
      await deleteFromCloudinary(certificate.image.publicId);
    }

    await certificate.deleteOne();

    return sendSuccess(res, 'Certificate deleted successfully');
  } catch (error) {
    next(error);
  }
};
