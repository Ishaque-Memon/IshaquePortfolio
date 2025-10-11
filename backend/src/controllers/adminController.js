import Admin from '../models/Admin.js';
import generateToken from '../utils/generateToken.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';
import ROLES from '../constants/roles.js';

// @desc    Login admin
// @route   POST /api/admin/login
// @access  Public
export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return sendError(res, 'Please provide email and password', 400);
    }

    // Find admin by email and include password
    const admin = await Admin.findOne({ email }).select('+password');

    if (!admin) {
      return sendError(res, 'Invalid credentials', 401);
    }

    // Check if account is locked
    if (admin.isLocked) {
      return sendError(res, 'Account is locked due to too many failed login attempts. Please try again later.', 423);
    }

    // Check if account is active
    if (!admin.isActive) {
      return sendError(res, 'Account is deactivated. Please contact support.', 403);
    }

    // Verify password
    const isPasswordMatch = await admin.matchPassword(password);

    if (!isPasswordMatch) {
      // Increment login attempts
      await admin.incLoginAttempts();
      return sendError(res, 'Invalid credentials', 401);
    }

    // Reset login attempts on successful login
    await admin.resetLoginAttempts();

    // Generate token
    const token = generateToken(admin._id, admin.email, admin.role);

    return sendSuccess(res, 'Login successful', {
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      },
      token,
      expiresIn: '7d'
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Get admin profile
// @route   GET /api/admin/profile
// @access  Private (Admin)
export const getAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return sendError(res, 'Admin not found', 404);
    }

    return sendSuccess(res, 'Profile retrieved successfully', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role,
      lastLogin: admin.lastLogin,
      createdAt: admin.createdAt
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Update admin profile
// @route   PUT /api/admin/profile
// @access  Private (Admin)
export const updateAdminProfile = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.user.id);

    if (!admin) {
      return sendError(res, 'Admin not found', 404);
    }

    const { name, email } = req.body;

    if (name) admin.name = name;
    if (email) admin.email = email;

    await admin.save();

    return sendSuccess(res, 'Profile updated successfully', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });

  } catch (error) {
    next(error);
  }
};

// @desc    Change admin password
// @route   PUT /api/admin/change-password
// @access  Private (Admin)
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return sendError(res, 'Please provide current and new password', 400);
    }

    if (newPassword.length < 6) {
      return sendError(res, 'New password must be at least 6 characters', 400);
    }

    const admin = await Admin.findById(req.user.id).select('+password');

    if (!admin) {
      return sendError(res, 'Admin not found', 404);
    }

    // Verify current password
    const isPasswordMatch = await admin.matchPassword(currentPassword);

    if (!isPasswordMatch) {
      return sendError(res, 'Current password is incorrect', 401);
    }

    // Update password
    admin.password = newPassword;
    await admin.save();

    return sendSuccess(res, 'Password changed successfully');

  } catch (error) {
    next(error);
  }
};

// @desc    Create new admin (Super Admin only)
// @route   POST /api/admin/create
// @access  Private (Super Admin)
export const createAdmin = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return sendError(res, 'Admin with this email already exists', 400);
    }

    const admin = await Admin.create({
      name,
      email,
      password,
      role: role || ROLES.ADMIN
    });

    return sendSuccess(res, 'Admin created successfully', {
      id: admin._id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    }, 201);

  } catch (error) {
    next(error);
  }
};

// @desc    Get all admins (Super Admin only)
// @route   GET /api/admin/all
// @access  Private (Super Admin)
export const getAllAdmins = async (req, res, next) => {
  try {
    const admins = await Admin.find().select('-password');

    return sendSuccess(res, 'Admins retrieved successfully', admins);

  } catch (error) {
    next(error);
  }
};

// @desc    Delete admin (Super Admin only)
// @route   DELETE /api/admin/:id
// @access  Private (Super Admin)
export const deleteAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.params.id);

    if (!admin) {
      return sendError(res, 'Admin not found', 404);
    }

    // Prevent deleting yourself
    if (admin._id.toString() === req.user.id) {
      return sendError(res, 'You cannot delete your own account', 400);
    }

    await admin.deleteOne();

    return sendSuccess(res, 'Admin deleted successfully');

  } catch (error) {
    next(error);
  }
};
