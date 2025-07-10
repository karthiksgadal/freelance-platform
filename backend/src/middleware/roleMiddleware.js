// middleware/roleMiddleware.js

const verifyRole = (requiredRole) => {
  return (req, res, next) => {
    // req.user was set in verifyToken middleware
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ error: "Access denied: insufficient role" });
    }

    // If role matches, continue
    next();
  };
};

module.exports = verifyRole;
