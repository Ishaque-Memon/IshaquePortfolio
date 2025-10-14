import Visit from '../models/Visit.js';
import { emitSocketEvent } from '../utils/socketEmitter.js';

// Middleware to log a visit (excluding admin)
export const logVisit = async (req, res, next) => {
  try {
    if (req.user && req.user.role === 'admin') return next();

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    const userAgent = req.headers['user-agent'] || '';

    const newVisit = await Visit.create({ ip, userAgent });

    // ✅ Emit real-time event to update analytics dashboard
    emitSocketEvent('newVisit', {
      ip,
      userAgent,
      createdAt: newVisit.createdAt
    });

  } catch (err) {
    // Don’t block request if logging fails
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
