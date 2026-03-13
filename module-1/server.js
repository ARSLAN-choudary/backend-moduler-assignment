const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('<h1>Welcome to the Homepage!</h1><p>Express server is running perfectly.</p>');
});

app.get('/about', (req, res) => {
  res.send('<h3>About Page</h3><p>This is a simple Node.js project built from scratch.</p>');
});
app.get('/contact', (req, res) => {
  res.send('<h3>Contact Info</h3><p>Email us at: support@example.com</p>');
});

app.get('/help', (req, res) => {
  res.send('<h3>Help Instructions</h3><p>Use the navigation to explore routes: /, /about, /contact, and /help.</p>');
});

app.listen(port, () => {
    const timestamp = new Date().toLocaleString();
    console.log(`-------------------------------------------`);
    console.log(`Server started on port: ${port}`);
    console.log(`Current Timestamp: ${timestamp}`);
    console.log(`-------------------------------------------`);
});