const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../config/dbConfig'); // Ensure this path matches your setup

// Signup route
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    console.log('Received signup request:', { name, email, password }); // Log incoming data

    // Validate required fields
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword); // Log hashed password

        // Insert new user into the database
        const sqlInsert = 'INSERT INTO tenants (name, email, password) VALUES (?, ?, ?)';
        db.query(sqlInsert, [name, email, hashedPassword], (err, results) => {
            if (err) {
                console.error("Database error during signup:", err); // Log database error if any
                return res.status(500).json({ message: 'Signup failed', error: err.message });
            }

            console.log("Signup successful, database result:", results); // Log successful insertion result
            res.status(201).json({ message: 'User created successfully' });
        });
    } catch (err) {
        console.error("Hashing error:", err); // Log any hashing errors
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
});

// Login route
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log('Received login request:', { email, password }); // Log incoming login data

    // Query the database for the user
    const sqlSelect = 'SELECT * FROM tenants WHERE email = ?';
    db.query(sqlSelect, [email], async (err, results) => {
        if (err) {
            console.error("Database error during login:", err); // Log database error if any
            return res.status(500).json({ message: 'An error occurred during login' });
        }

        if (results.length === 0) {
            console.log("User not found"); // Log if no user is found
            return res.status(400).json({ message: 'User not found' });
        }

        const user = results[0];
        console.log("User found:", user); // Log user data if found

        // Check if the password is correct
        try {
            const match = await bcrypt.compare(password, user.password);
            console.log("Password comparison result:", match); // Log result of password comparison

            if (!match) {
                return res.status(401).json({ message: 'Incorrect password' });
            }

            res.status(200).json({ message: 'Login successful', user: { id: user.id, name: user.name, email: user.email } });
        } catch (compareError) {
            console.error("Error comparing passwords:", compareError); // Log any errors in password comparison
            res.status(500).json({ message: 'Login failed' });
        }
    });
});

module.exports = router;
