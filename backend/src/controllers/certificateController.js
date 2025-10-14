import Certificate from '../models/Certificate.js';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/responseHandler.js';
import { uploadToCloudinary, deleteFromCloudinary } from '../utils/uploadHelper.js';
import { emitSocketEvent } from '../utils/socketEmitter.js';
import { buildCloudinaryUrl } from '../utils/cloudinaryUrl.js';

const normalizeCertificateImage = (cert) => {
  if (!cert) return cert;
  const c = cert.toObject ? cert.toObject() : { ...cert };
  
  if (c.image && c.image.publicId) {
    const isAbsoluteUrl = /^https?:\/\//i.test(c.image.url);
    if (!isAbsoluteUrl) {
      c.image.url = buildCloudinaryUrl(c.image.publicId);
    }
  }
  
  return c;
};

// GET all certificates
export const getAllCertificates = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const certificates = await Certificate.find()
      .sort({ issueDate: -1, order: 1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Certificate.countDocuments();
    const normalized = certificates.map((c) => normalizeCertificateImage(c));

    return sendPaginatedResponse(res, normalized, parseInt(page), parseInt(limit), total);
  } catch (error) {
    next(error);
  }
};

// GET single certificate
export const getCertificateById = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return sendError(res, 'Certificate not found', 404);
    return sendSuccess(res, 'Certificate retrieved successfully', normalizeCertificateImage(certificate));
  } catch (error) {
    next(error);
  }
};

// CREATE certificate
export const createCertificate = async (req, res, next) => {
  try {
    const { title, issuer, issueDate, expiryDate, credentialId, credentialUrl, skills, description, order } = req.body;
    if (!req.file) return sendError(res, 'Certificate image is required', 400);

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

    // 🔴 Emit socket event globally
    emitSocketEvent('certificate_created', normalizeCertificateImage(certificate));

    return sendSuccess(res, 'Certificate created successfully', normalizeCertificateImage(certificate), 201);
  } catch (error) {
    next(error);
  }
};

// UPDATE certificate
export const updateCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return sendError(res, 'Certificate not found', 404);

    const { title, issuer, issueDate, expiryDate, credentialId, credentialUrl, skills, description, order } = req.body;
    if (title) certificate.title = title;
    if (issuer) certificate.issuer = issuer;
    if (issueDate) certificate.issueDate = issueDate;
    if (expiryDate !== undefined) certificate.expiryDate = expiryDate;
    if (credentialId !== undefined) certificate.credentialId = credentialId;
    if (credentialUrl !== undefined) certificate.credentialUrl = credentialUrl;
    if (skills) certificate.skills = JSON.parse(skills);
    if (description !== undefined) certificate.description = description;
    if (order !== undefined) certificate.order = parseInt(order);

    if (req.file) {
      if (certificate.image.publicId) await deleteFromCloudinary(certificate.image.publicId);
      const imageResult = await uploadToCloudinary(req.file.buffer, 'portfolio/certificates');
      certificate.image = { url: imageResult.url, publicId: imageResult.publicId };
    }

    await certificate.save();

    // 🟢 Emit socket event globally
    emitSocketEvent('certificate_updated', normalizeCertificateImage(certificate));

    return sendSuccess(res, 'Certificate updated successfully', normalizeCertificateImage(certificate));
  } catch (error) {
    next(error);
  }
};

// DELETE certificate
export const deleteCertificate = async (req, res, next) => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    if (!certificate) return sendError(res, 'Certificate not found', 404);

    if (certificate.image.publicId) await deleteFromCloudinary(certificate.image.publicId);
    await certificate.deleteOne();

    // 🟡 Emit socket event globally
    emitSocketEvent('certificate_deleted', { id: req.params.id });

    return sendSuccess(res, 'Certificate deleted successfully');
  } catch (error) {
    next(error);
  }
};
