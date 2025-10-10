import jwt from 'jsonwebtoken';
import { sendError } from '../utils/responseHandler.js';

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
        email: decoded.email
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

// Optional: Admin role check (if you want role-based access)
export const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return sendError(res, 'Not authorized as admin', 403);
  }
};
