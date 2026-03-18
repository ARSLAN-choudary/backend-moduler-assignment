// middleware/auth.js
const jwt = require('jsonwebtoken');
const config = require('../config');

// 1. Token Verification
exports.protect = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) return res.status(401).json({ message: "Access Denied: No Token Provided" });

    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = decoded; // Token se user info (id, role) extract karke req mein daal di
        next();
    } catch (err) {
        res.status(403).json({ message: "Invalid or Expired Token" });
    }
};

// 2. Role Authorization (Middleware Factory)
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: You don't have permission" });
        }
        next();
    };
};