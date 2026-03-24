const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Yahan check karein ke DB_URL sahi fetch ho rahi hai
        if (!process.env.DB_URL) {
            throw new Error("DB_URL is not defined in .env file");
        }
        await mongoose.connect(process.env.DB_URL);
        console.log('✅ MongoDB Connected Successfully!');
    } catch (err) {
        console.error('❌ DB Connection Failed:', err.message);
        process.exit(1); 
    }
};

module.exports = connectDB;