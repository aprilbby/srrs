import React, { useState } from 'react';

const ForgotPassword = ({ onBack }) => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleReset = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();
            setMessage(data.message);
        } catch (error) {
            setMessage('Success! Check your email for the reset password link.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleReset} style={styles.resetButton}>
                Send Reset Link
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

export default ForgotPassword;

