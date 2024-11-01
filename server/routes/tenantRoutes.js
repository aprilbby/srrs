const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig'); // Import the database connection

// Route to get all tenants
router.get('/tenants', (req, res) => {
    const sqlQuery = 'SELECT * FROM tenants'; // Adjust table name if necessary
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error fetching tenants:", err);
            res.status(500).send("An error occurred while retrieving tenants");
        } else {
            res.json(results); // Send the retrieved data as JSON
        }
    });
});

module.exports = router;
