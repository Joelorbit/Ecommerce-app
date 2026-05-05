const jwt = require('jsonwebtoken');

// Use an environment secret when available; fall back to a local placeholder only for development.
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_change_me';

/**
 * Authentication middleware.
 *
 * This middleware expects an Authorization header in the format:
 *   Authorization: Bearer <jwt>
 *
 * It verifies the JWT and attaches the decoded user information to req,
 * allowing downstream routes to know which user is making the request.
 */
function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  // Reject requests without a Bearer token header immediately.
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized — no token provided' });
  }

  // Extract the JWT from the header and verify it.
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    // Store decoded user claims on the request object for later middleware/routes.
    req.userId = decoded.userId;
    req.userEmail = decoded.email;
    req.role = decoded.role;

    next();
  } catch (err) {
    // Token verification failed: invalid signature, malformed token, or expired.
    return res.status(401).json({ error: 'Unauthorized — invalid or expired token' });
  }
}

module.exports = authMiddleware;
