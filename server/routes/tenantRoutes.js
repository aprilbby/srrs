const express = require('express');
const router = express.Router();
const db = require('../config/dbConfig');

// Get all tenants
router.get('/tenants', (req, res) => {
    const sqlQuery = 'SELECT id, name, email FROM tenants';
    db.query(sqlQuery, (err, results) => {
        if (err) {
            console.error("Error fetching tenants:", err);
            return res.status(500).json({ message: 'An error occurred while retrieving tenants' });
        }
        res.json(results);
    });
});

// Add a new tenant
router.post('/tenants', (req, res) => {
    const { name, email } = req.body;
    const sqlInsert = 'INSERT INTO tenants (name, email) VALUES (?, ?)';
    db.query(sqlInsert, [name, email], (err, results) => {
        if (err) {
            console.error("Error adding tenant:", err);
            return res.status(500).json({ message: 'An error occurred while adding the tenant' });
        }
        res.status(201).json({ message: 'Tenant added successfully' });
    });
});

module.exports = router;
