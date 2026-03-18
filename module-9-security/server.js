// server.js
const express = require('express'); 
const config = require('./config'); 
const authRoutes = require('./routes/auth');

const app = express(); 

app.use(express.json()); 


app.use('/api/auth', authRoutes);

const PORT = config.port || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});