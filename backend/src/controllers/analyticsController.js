import Visit from '../models/Visit.js';

// Middleware to log a visit (excluding admin)
export const logVisit = async (req, res, next) => {
  try {
    // If user is authenticated as admin, skip logging
    if (req.user && req.user.role === 'admin') return next();

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.ip;
    const userAgent = req.headers['user-agent'] || '';
    await Visit.create({ ip, userAgent });
  } catch (err) {
    // Do not block request if logging fails
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
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch analytics' });
  }
};
