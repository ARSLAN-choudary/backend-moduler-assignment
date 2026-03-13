const express = require('express');
const path = require('path');
const inspectorRoutes = require('./routes/inspector');

const app = express();
const PORT = 3000;


app.use(express.json());

app.use(express.static('public'));

// 3. Registering our Module 3 Routes
app.use('/api/inspector', inspectorRoutes);

// 4. Basic Root Route
app.get('/', (req, res) => {
    res.send('<h1>Welcome to Module 3: Request & Response</h1><p>Use Postman to test /api/inspector routes.</p>');
});

// 5. Global Error Handler 
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(PORT, () => {
    console.log(` Server is running on: http://localhost:${PORT}`);
    console.log(` Module 3 Routes: /api/inspector/...`);
});