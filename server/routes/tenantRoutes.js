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

    // Log the submission details
    console.log('Processing submission:', {
        image: image.slice(0, 20) + '...', // Truncated for brevity
        latitude,
        longitude,
        timestamp,
    });

    const sqlInsert = `
        INSERT INTO submissions (image, latitude, longitude, timestamp, status)
        VALUES (?, ?, ?, ?, 'pending')
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

// Route to fetch all submissions
router.get('/submissions', (req, res) => {
    const sqlSelect = 'SELECT * FROM submissions ORDER BY timestamp DESC';

    db.query(sqlSelect, (err, results) => {
        if (err) {
            console.error('Error fetching submissions:', err);
            return res.status(500).json({ message: 'Failed to fetch submissions.' });
        }

        console.log('Fetched submissions:', results.length);
        res.status(200).json(results);
    });
});

// Route to verify a submission
router.patch('/submissions/:id/verify', (req, res) => {
    const { id } = req.params;

    const sqlUpdate = 'UPDATE submissions SET status = ? WHERE id = ?';
    db.query(sqlUpdate, ['verified', id], (err, results) => {
        if (err) {
            console.error('Error verifying submission:', err);
            return res.status(500).json({ message: 'Failed to verify submission.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Submission not found.' });
        }
        res.status(200).json({ message: 'Submission verified successfully.' });
    });
});

// Route to flag a submission
router.patch('/submissions/:id/flag', (req, res) => {
    const { id } = req.params;

    const sqlUpdate = 'UPDATE submissions SET status = ? WHERE id = ?';
    db.query(sqlUpdate, ['needs attention', id], (err, results) => {
        if (err) {
            console.error('Error flagging submission:', err);
            return res.status(500).json({ message: 'Failed to flag submission.' });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Submission not found.' });
        }
        res.status(200).json({ message: 'Submission flagged successfully.' });
    });
});

module.exports = router;


