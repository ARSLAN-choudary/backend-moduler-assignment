const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');

// Apne banaye huve middlewares import karen
const requestLogger = require('./middleware/logger');
const { validateContentType } = require('./middleware/validator');
const apiKeyAuth = require('./middleware/auth');
const errorHandler = require('./middleware/errorHandler');

const app = express();

// 1. Third-party Middlewares (Global)
app.use(helmet());           // Security: Response headers ko secure banata hai
app.use(cors());             // Cross-Origin: Dusri domains ko request allow karta hai
app.use(morgan('dev'));      // Logger: Console mein colorful logs dikhata hai
app.use(express.json());     // Body Parser: JSON data ko read karne ke liye

// 2. Custom Global Middlewares
app.use(requestLogger);      // Har request ka time aur status log karega
app.use(validateContentType); // POST/PUT ke liye JSON check karega

// 3. Routes
app.get('/public', (req, res) => {
  res.send('Ye sab ke liye open hai!');
});

// Protected Route: Is par apiKeyAuth sirf yahan apply hoga
app.get('/api/protected/data', apiKeyAuth, (req, res) => {
  res.json({ message: 'Welcome Arslan! Ye secret data hai.' });
});

// Error Testing Route
app.get('/error-test', (req, res, next) => {
  next(new Error('Test error: Middleware check!')); // Error trigger karna
});

// 4. Error Handler (Hamesha end mein hona chahiye)
app.use(errorHandler);

app.listen(3000, () => console.log('Server running on port 3000'));