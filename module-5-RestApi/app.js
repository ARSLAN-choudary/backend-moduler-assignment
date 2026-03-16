const express = require('express');
const bookRoutes = require('./routes/bookRoutes');

const app = express();
app.use(express.json());

// Routes mount
app.use('/api/books', bookRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(3000, () => console.log('Module 5 Server Running!'));