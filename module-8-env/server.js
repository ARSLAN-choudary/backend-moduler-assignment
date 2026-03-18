// server.js
const express = require('express');
const config = require('./config'); // './config/index.js' ko automatically load karega

const app = express();

app.get('/', (req, res) => {
    res.send(`Server running in ${config.env} mode`);
});

// Port config se le rahe hain
app.listen(config.port, () => {
    console.log(`🚀 Server on http://localhost:${config.port}`);
});