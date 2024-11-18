const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../config/dbConfig');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com',
        pass: 'your-app-password',
    },
});

router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: 'Please provide all fields' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const sqlInsert = 'INSERT INTO tenants (name, email, password) VALUES (?, ?, ?)';
        db.query(sqlInsert, [name, email, hashedPassword], (err) => {
            if (err) {
                return res.status(500).json({ message: 'Signup failed', error: err.message });
            }
            res.status(201).json({ message: 'User created successfully' });
        });
    } catch (err) {
        res.status(500).json({ message: 'Signup failed', error: err.message });
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    const sqlSelect = 'SELECT * FROM tenants WHERE email = ?';
    db.query(sqlSelect, [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Login failed.' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const user = results[0];
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password.' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: { id: user.id, name: user.name, email: user.email },
        });
    });
});

router.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const tokenExpiry = Date.now() + 3600000;

    const sqlUpdate = 'UPDATE tenants SET reset_token = ?, reset_token_expiry = ? WHERE email = ?';
    db.query(sqlUpdate, [token, tokenExpiry, email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to process reset request.' });
        }

        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Email not found.' });
        }

        const resetLink = `http://localhost:3000/reset-password/${token}`;
        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Password Reset Request',
            text: `Reset your password using this link: ${resetLink}`,
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to send reset email.' });
            }
            res.status(200).json({ message: 'Reset link sent successfully.' });
        });
    });
});

module.exports = router;


