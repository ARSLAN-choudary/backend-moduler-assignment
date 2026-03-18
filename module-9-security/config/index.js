// config/index.js
require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET || 'supersecretkey', // Make sure this exists
    apiKey: process.env.API_KEY,
    env: process.env.NODE_ENV || 'development'
};

// Required variables check
if (!process.env.JWT_SECRET) {
    console.warn("⚠️ WARNING: JWT_SECRET is missing in .env! Using default.");
}

module.exports = config;