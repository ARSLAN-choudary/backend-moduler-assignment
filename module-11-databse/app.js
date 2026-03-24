require('dotenv').config(); // Sab se pehle config load karein
const express = require('express');
const connectDB = require('./config/database');
const bookRoutes = require('./routes/bookRoutes');

const app = express();

// Task 2: Connect to Database before starting server
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/books', bookRoutes);

// Error Handling Middleware 
app.use((err, req, res, next) => {
    res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});