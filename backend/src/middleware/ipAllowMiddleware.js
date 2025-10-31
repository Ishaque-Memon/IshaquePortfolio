// middleware/ipAllowMiddleware.js
import ipRangeCheck from 'ip-range-check';

/**
 * IP allowlist middleware.
 * - Read list from process.env.ADMIN_ALLOWED_IPS (comma separated)
 * - Supports single IPs and CIDR ranges (e.g. 203.0.113.5,198.51.100.0/24)
 * - If ADMIN_ALLOWED_IPS is empty -> allow all (no restriction)
 */
const ipAllowMiddleware = (req, res, next) => {
  try {
    const allowIPS = process.env.ADMIN_ALLOWED_IPS || '';
    const allowed = allowIPS.split(',')
      .map(s => s.trim())
      .filter(Boolean);

    // If nothing configured, don't block (safe default for dev)
    if (allowed.length === 0) return next();

    // If behind proxy (Render, Vercel), the client IP is in x-forwarded-for
    const xff = req.headers['x-forwarded-for'];
    const clientIp = typeof xff === 'string' ? xff.split(',')[0].trim() : (req.socket?.remoteAddress || req.ip);

    // ipRangeCheck supports single ip, ranges, and cidr
    const ok = ipRangeCheck(clientIp, allowed);

    if (!ok) {
      console.warn(`[IP_ALLOW] blocked request from ${clientIp}`);
      return res.status(403).json({ success: false, message: 'Access denied: IP not allowed' });
    }

    next();
  } catch (err) {
    console.error('ipAllowMiddleware error:', err);
    // Fail-safe: block on error
    return res.status(500).json({ success: false, message: 'Server error validating IP' });
  }
};

export default ipAllowMiddleware;
