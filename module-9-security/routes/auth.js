// routes/auth.js
const express = require('express');
const router = express.Router();
const authCtrl = require('../controllers/authController');
const { protect, authorize } = require('../middleware/auth');

router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);
router.get('/me', protect, authCtrl.getMe);

// Test Routes for RBAC (Role Based Access Control)
router.get('/admin-only', protect, authorize('admin'), (req, res) => {
    res.json({ message: "Welcome Admin!" });
});

router.get('/shared', protect, authorize('admin', 'user'), (req, res) => {
    res.json({ message: "Access granted to User and Admin" });
});

module.exports = router;