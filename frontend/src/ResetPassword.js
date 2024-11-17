import React, { useState } from 'react';

const ResetPassword = ({ onBack }) => {
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = async () => {
        const token = window.location.pathname.split('/').pop();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/reset-password/${token}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Reset password link sent! Check your email.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Reset Password</h2>
            <input
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleReset} style={styles.resetButton}>
                Reset Password
            </button>
            <p style={styles.message}>{message}</p>
            <button onClick={onBack} style={styles.backButton}>
                Back
            </button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#f8e1e7',
        borderRadius: '10px',
        maxWidth: '400px',
        margin: 'auto',
    },
    title: { fontSize: '1.8rem', marginBottom: '1rem', color: '#d6719e' },
    input: { marginBottom: '1rem', padding: '0.75rem', borderRadius: '10px', width: '100%' },
    resetButton: { padding: '0.75rem 1.5rem', backgroundColor: '#d6719e', color: '#ffffff' },
    message: { marginTop: '1rem', color: '#d6719e' },
    backButton: { marginTop: '1rem', padding: '0.5rem 1rem', backgroundColor: '#d6719e', color: '#ffffff' },
};

export default ResetPassword;
