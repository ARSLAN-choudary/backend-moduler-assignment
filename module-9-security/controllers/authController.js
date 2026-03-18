// controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config');

exports.register = async (req, res) => {
    const { username, email, password, role } = req.body;
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const user = User.create({ username, email, password: hashedPassword, role: role || 'user' });
    
    // Password remove karke bhejenge security ke liye
    const { password: _, ...userWithoutPass } = user;
    res.status(201).json(userWithoutPass);
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = User.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid email or password" });
    }

    // Issue JWT
    const token = jwt.sign(
        { id: user.id, role: user.role }, 
        config.jwtSecret, 
        { expiresIn: '7d' }
    );

    res.json({ token });
};

exports.getMe = (req, res) => {
    const user = User.findById(req.user.id);
    const { password: _, ...profile } = user;
    res.json(profile);
};