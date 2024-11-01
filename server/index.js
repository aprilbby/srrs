const express = require('express');
const app = express();
const PORT = 5000;
const db = require('./config/dbConfig');
const tenantRoutes = require('./routes/tenantRoutes');


// Middleware to parse JSON data
app.use(express.json());
app.use('/api', tenantRoutes);


// Basic route for testing
app.get('/', (req, res) => {
    res.send('Server is running');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

