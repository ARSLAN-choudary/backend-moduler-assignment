const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');

// 1. GET /inspect - Request ki details dekhne ke liye
router.get('/inspect', (req, res) => {
    res.json({
        method: req.method,
        url: req.originalUrl,
        headers: req.headers,
        ip: req.ip,
        timestamp: new Date().toISOString()
    });
});

// 2. POST /echo - Jo bheja wahi wapas milega (Validation ke saath)
router.post('/echo', (req, res) => {
    // Check agar body empty hai \
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ 
            error: "Bad Request", 
            message: "Request body cannot be empty" 
        });
    }
    res.json({
        message: "Data received successfully",
        echo: req.body
    });
});

// 3. GET /users/:id - Param validation aur Status Codes
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;

    if (isNaN(Number(userId))) {
        return res.status(400).json({ error: "Invalid ID format. Must be a number." });
    }

    if (Number(userId) > 100) {
        return res.status(404).json({ error: "User not found (ID > 100)" });
    }

    // Success response
    res.status(200).json({
        id: userId,
        name: "Mock User",
        email: `user${userId}@example.com`
    });
});

// 4. GET /redirect-me - 301 Permanent Redirect
router.get('/redirect-me', (req, res) => {
    res.redirect(301, '/api/inspector/inspect'); 
});

// 5. GET /download-sample - File Serve karna
router.get('/download-sample', (req, res) => {
    const filePath = path.join(__dirname, '../sample.txt');
    
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, "Hello Arslan! This is a sample file for Module 3.");
    }

    // res.sendFile ke liye absolute path lazmi hai
    res.sendFile(filePath);
});

module.exports = router;