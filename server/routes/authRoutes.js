const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const db = require('../config/dbConfig');

// Nodemailer setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'your-email@gmail.com', // Replace with your email
        pass: 'your-app-password', // Replace with app-specific password
    },
});

// Signup route
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

// Forgot password route
router.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    const token = crypto.randomBytes(20).toString('hex');
    const tokenExpiry = Date.now() + 3600000; // 1 hour

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
            text: `You requested a password reset. Click the link below to reset your password:\n\n${resetLink}\n\nThis link is valid for 1 hour.`,
        };

        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Failed to send reset email.' });
            }
            res.status(200).json({ message: 'Reset link sent successfully.' });
        });
    });
});

// Reset password route
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
        return res.status(400).json({ message: 'Password is required.' });
    }

    const sqlSelect = 'SELECT * FROM tenants WHERE reset_token = ? AND reset_token_expiry > ?';
    db.query(sqlSelect, [token, Date.now()], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to reset password.' });
        }

        if (results.length === 0) {
            return res.status(400).json({ message: 'Invalid or expired token.' });
        }

        const user = results[0];
        const hashedPassword = await bcrypt.hash(password, 10);

        const sqlUpdate = 'UPDATE tenants SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?';
        db.query(sqlUpdate, [hashedPassword, user.id], (updateErr) => {
            if (updateErr) {
                return res.status(500).json({ message: 'Failed to reset password.' });
            }
            res.status(200).json({ message: 'Password reset successfully.' });
        });
    });
});

module.exports = router;


