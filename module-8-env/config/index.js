// config/index.js
require('dotenv').config(); // Dotenv sirf yahan call hoga

const config = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    jwtSecret: process.env.JWT_SECRET,
    apiKey: process.env.API_KEY,
    allowedOrigin: process.env.ALLOWED_ORIGIN
};

// Validation: Check if required secrets exist
const required = ['JWT_SECRET', 'API_KEY'];
required.forEach(key => {
    if (!process.env[key]) {
        console.error(`❌ ERROR: Missing required env variable: ${key}`);
        process.exit(1); // App ko start nahi hone dega
    }
});

module.exports = config;