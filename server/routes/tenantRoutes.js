const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// Submit a submission
router.post('/submit', (req, res) => {
    const { image, location, timestamp, userId } = req.body;

    if (!image || !location || !timestamp || !userId) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    const { latitude, longitude } = location;

    // Convert timestamp to MySQL DATETIME format
    const formattedTimestamp = new Date(timestamp).toISOString().slice(0, 19).replace('T', ' ');

    const sqlInsert = `
        INSERT INTO submissions (image, latitude, longitude, timestamp, status, user_id)
        VALUES (?, ?, ?, ?, 'pending', ?)
    `;

    db.query(sqlInsert, [image, latitude, longitude, formattedTimestamp, userId], (err) => {
        if (err) {
            console.error('Error saving submission:', err);
            return res.status(500).json({ message: 'Failed to save submission.' });
        }
        res.status(201).json({ message: 'Submission saved successfully.' });
    });
});

// Fetch all submissions
router.get('/submissions', (req, res) => {
    const sqlSelect = `
        SELECT 
            s.id, 
            s.image, 
            s.latitude, 
            s.longitude, 
            DATE_FORMAT(s.timestamp, '%M %d, %Y, %l:%i %p') AS timestamp, 
            s.status, 
            COALESCE(t.name, 'Unknown') AS userName
        FROM submissions s
        LEFT JOIN tenants t ON s.user_id = t.id
        ORDER BY s.timestamp DESC
    `;

    db.query(sqlSelect, (err, results) => {
        if (err) {
            console.error('Error fetching submissions:', err);
            return res.status(500).json({ message: 'Failed to fetch submissions.' });
        }

        res.status(200).json(results);
    });
});

// Update submission status
router.patch('/submissions/:id/:action', (req, res) => {
    const { id, action } = req.params;
    const status = action === 'verify' ? 'verified' : 'needs attention';

    const sqlUpdate = 'UPDATE submissions SET status = ? WHERE id = ?';
    db.query(sqlUpdate, [status, id], (err, results) => {
        if (err) {
            console.error('Error updating submission status:', err);
            return res.status(500).json({ message: 'Failed to update submission status.' });
        }
        res.status(200).json({ message: `Submission marked as ${status}.` });
    });
});

// Delete a submission
router.delete('/submissions/:id', (req, res) => {
    const { id } = req.params;

    const sqlDelete = 'DELETE FROM submissions WHERE id = ?';
    db.query(sqlDelete, [id], (err, results) => {
        if (err) {
            console.error('Error deleting submission:', err);
            return res.status(500).json({ message: 'Failed to delete submission.' });
        }
        res.status(200).json({ message: 'Submission deleted successfully.' });
    });
});

module.exports = router;








