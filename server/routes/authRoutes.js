const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/dbConfig');

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);

        // Insert new user into the database
        const sqlInsert = 'INSERT INTO tenants (name, email, password) VALUES (?, ?, ?)';
        db.query(sqlInsert, [name, email, hashedPassword], (err, results) => {
            if (err) {
                console.error("Database error during signup:", err);
                return res.status(500).json({ message: 'Signup failed', error: err.message });
            }
            res.status(201).json({ message: 'User created successfully' });
        });
    } catch (err) {
        console.error("Hashing error:", err);
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query the database for the user
    const sqlSelect = 'SELECT * FROM tenants WHERE email = ?';
    db.query(sqlSelect, [email], async (err, results) => {
        if (err) {
            console.error("Database error during login:", err);
            return res.status(500).json({ message: 'An error occurred during login' });
        }
        if (results.length === 0) {
            console.log("User not found");
            return res.status(400).json({ message: 'User not found' });
        }

        const user = results[0];
        console.log("User found:", user);

        // Check if the password is correct
        try {
            const match = await bcrypt.compare(password, user.password);
            console.log("Password comparison result:", match);

            if (!match) {
                return res.status(401).json({ message: 'Incorrect password' });
            }

            res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
        } catch (compareError) {
            console.error("Error comparing passwords:", compareError);
            res.status(500).json({ message: 'Login failed' });
        }
    });
});

module.exports = router;
