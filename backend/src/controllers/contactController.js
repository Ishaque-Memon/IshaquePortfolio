import ContactMessage from '../models/ContactMessage.js';
import { sendSuccess, sendError, sendPaginatedResponse } from '../utils/responseHandler.js';
import { emitSocketEvent } from '../utils/socketEmitter.js';

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
export const submitContactMessage = async (req, res, next) => {
  try {
    const { name, email, subject, message, phone } = req.body;

    const contactMessage = await ContactMessage.create({
      name,
      email,
      subject,
      message,
      phone
    });

    // 🔴 Emit socket event for admin panel (new message arrived)
    emitSocketEvent('contact_message_created', contactMessage);

    return sendSuccess(
      res,
      'Your message has been sent successfully! We will get back to you soon.',
      contactMessage,
      201
    );
  } catch (error) {
    next(error);
  }
};

// @desc    Get all contact messages (Admin)
// @route   GET /api/contact
// @access  Private (Admin)
export const getAllMessages = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, isRead } = req.query;

    const filter = {};
    if (status) filter.status = status;
    if (isRead !== undefined) filter.isRead = isRead === 'true';

    const skip = (page - 1) * limit;

    const messages = await ContactMessage.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await ContactMessage.countDocuments(filter);

    return sendPaginatedResponse(res, messages, parseInt(page), parseInt(limit), total);
  } catch (error) {
    next(error);
  }
};

// @desc    Get single message by ID
// @route   GET /api/contact/:id
// @access  Private (Admin)
export const getMessageById = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) return sendError(res, 'Message not found', 404);

    // Mark as read when viewed
    if (!message.isRead) {
      message.isRead = true;
      await message.save();

      // 🟡 Emit event: message marked as read
      emitSocketEvent('contact_message_read', { id: message._id });
    }

    return sendSuccess(res, 'Message retrieved successfully', message);
  } catch (error) {
    next(error);
  }
};

// @desc    Update message status
// @route   PATCH /api/contact/:id/status
// @access  Private (Admin)
export const updateMessageStatus = async (req, res, next) => {
  try {
    const { status, notes } = req.body;
    const message = await ContactMessage.findById(req.params.id);

    if (!message) return sendError(res, 'Message not found', 404);

    if (status) message.status = status;
    if (notes !== undefined) message.notes = notes;
    message.isRead = true;

    await message.save();

    // 🟢 Emit socket event when message status updates
    emitSocketEvent('contact_message_updated', message);

    return sendSuccess(res, 'Message status updated successfully', message);
  } catch (error) {
    next(error);
  }
};

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin)
export const deleteMessage = async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);
    if (!message) return sendError(res, 'Message not found', 404);

    await message.deleteOne();

    // 🔵 Emit socket event when message deleted
    emitSocketEvent('contact_message_deleted', { id: req.params.id });

    return sendSuccess(res, 'Message deleted successfully');
  } catch (error) {
    next(error);
  }
};

// @desc    Get message statistics
// @route   GET /api/contact/stats
// @access  Private (Admin)
export const getMessageStats = async (req, res, next) => {
  try {
    const total = await ContactMessage.countDocuments();
    const unread = await ContactMessage.countDocuments({ isRead: false });
    const newMessages = await ContactMessage.countDocuments({ status: 'new' });
    const replied = await ContactMessage.countDocuments({ status: 'replied' });
    const archived = await ContactMessage.countDocuments({ status: 'archived' });

    const stats = { total, unread, new: newMessages, replied, archived };

    return sendSuccess(res, 'Message statistics retrieved successfully', stats);
  } catch (error) {
    next(error);
  }
};
