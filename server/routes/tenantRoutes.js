const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// Route to handle tenant submissions
router.post('/submit', (req, res) => {
    const { image, location, timestamp } = req.body;

    // Validate request data
    if (!image || !location || !timestamp) {
        console.error('Missing required fields:', { image, location, timestamp });
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const { latitude, longitude } = location;

    // Validate location data
    if (!latitude || !longitude) {
        console.error('Invalid location data:', location);
        return res.status(400).json({ message: 'Location data is incomplete.' });
    }

    // Log the submission details
    console.log('Processing submission:', { image: image.slice(0, 20) + '...', latitude, longitude, timestamp });

    const sqlInsert = `
        INSERT INTO submissions (image, latitude, longitude, timestamp)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sqlInsert, [image, latitude, longitude, timestamp], (err, results) => {
        if (err) {
            console.error('Database error saving submission:', err);
            return res.status(500).json({ message: 'Failed to save submission. Please try again.' });
        }

        console.log('Submission saved successfully:', { submissionId: results.insertId });
        res.status(201).json({
            message: 'Submission saved successfully.',
            submissionId: results.insertId,
        });
    });
});

module.exports = router;


