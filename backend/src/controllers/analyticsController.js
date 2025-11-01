import Visit from '../models/Visit.js';
import { emitSocketEvent } from '../utils/socketEmitter.js';
import ipRangeCheck from 'ip-range-check';

// Middleware to log a visit (excluding admin)
export const logVisit = async (req, res, next) => {
  try {
    // Skip logging if user is authenticated as admin
    if (req.user && req.user.role === 'admin') return next();

    // Get client IP
    const xff = req.headers['x-forwarded-for'];
    const ip = typeof xff === 'string' ? xff.split(',')[0].trim() : (req.connection.remoteAddress || req.ip);
    
    // Get admin allowed IPs from environment
    const adminAllowedIPs = process.env.ADMIN_ALLOWED_IPS || '';
    const allowedIPs = adminAllowedIPs.split(',')
      .map(s => s.trim())
      .filter(Boolean);

    // Skip logging if the IP matches admin IP
    if (allowedIPs.length > 0 && ipRangeCheck(ip, allowedIPs)) {
      console.log(`[ANALYTICS] Skipping visit log for admin IP: ${ip}`);
      return next();
    }

    const userAgent = req.headers['user-agent'] || '';

    const newVisit = await Visit.create({ ip, userAgent });

    // ✅ Emit real-time event to update analytics dashboard
    emitSocketEvent('newVisit', {
      ip,
      userAgent,
      createdAt: newVisit.createdAt
    });

  } catch (err) {
    // Don't block request if logging fails
    console.error('[ANALYTICS] Error logging visit:', err);
  }
  next();
};

// Get analytics summary
export const getVisitAnalytics = async (req, res) => {
  try {
    const totalVisits = await Visit.countDocuments();
    const uniqueIps = await Visit.distinct('ip');

    res.json({
      totalVisits,
      uniqueVisitors: uniqueIps.length
    });

    // ✅ Optional: emit updated analytics data in real-time
    emitSocketEvent('analyticsUpdated', {
      totalVisits,
      uniqueVisitors: uniqueIps.length
    });

  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
};
