const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/authRoutes');
const tenantRoutes = require('./routes/tenantRoutes');

const PORT = 5000;

// Enable CORS for requests from your frontend at localhost:3000
app.use(cors({
    origin: 'http://localhost:3000'  // Specify the frontend's origin
}));

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api', tenantRoutes);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
