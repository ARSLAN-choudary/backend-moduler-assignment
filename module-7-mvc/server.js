// server.js
const express = require('express');
const app = express();
const bookRoutes = require('./routes/books');

app.use(express.json());

// Mount the routes
app.use('/api/books', bookRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => console.log('Server running on port 3000'));