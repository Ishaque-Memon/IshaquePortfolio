import jwt from 'jsonwebtoken';
import { sendError } from '../utils/responseHandler.js';
import ROLES from '../constants/roles.js';

// Protect routes - verify JWT token
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return sendError(res, 'Not authorized, no token provided', 401);
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Add user info to request
      req.user = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role || ROLES.ADMIN
      };

      next();
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return sendError(res, 'Token expired, please login again', 401);
      }
      return sendError(res, 'Not authorized, token failed', 401);
    }

  } catch (error) {
    console.error('Auth middleware error:', error);
    return sendError(res, 'Server error in authentication', 500);
  }
};

// Admin role check - since there's only one role, just verify authenticated
export const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return sendError(res, 'Authentication required', 401);
  }
  
  if (req.user.role !== ROLES.ADMIN) {
    return sendError(res, 'Admin access required', 403);
  }
  
  next();
};

// Legacy admin check (for backward compatibility)
export const admin = requireAdmin;
