import React, { useState } from 'react';

const TenantLogin = ({ onBack, onSignup, onForgotPassword, onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                onLoginSuccess(data.user);
            } else {
                setMessage(data.message);
            }
        } catch (error) {
            setMessage('Login failed. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Tenant Login</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleLogin} style={styles.loginButton}>Login</button>
            <p style={styles.message}>{message}</p>
            <p style={styles.signupText}>
                Don't have an account? <span onClick={onSignup} style={styles.link}>Sign Up</span>
            </p>
            <p style={styles.forgotPasswordText}>
                <span onClick={onForgotPassword} style={styles.link}>Forgot Password?</span>
            </p>
            <button onClick={onBack} style={styles.backButton}>Back</button>
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        padding: '2rem',
        backgroundColor: '#f8e1e7',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        maxWidth: '400px',
        margin: 'auto',
    },
    title: {
        fontSize: '1.8rem',
        marginBottom: '1rem',
        color: '#d6719e',
    },
    input: {
        marginBottom: '1rem',
        padding: '0.75rem',
        border: '1px solid #d6719e',
        borderRadius: '10px',
        width: '100%',
    },
    loginButton: {
        padding: '0.75rem 1.5rem',
        backgroundColor: '#d6719e',
        color: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
    },
    message: {
        marginTop: '1rem',
        color: '#d6719e',
    },
    signupText: {
        marginTop: '1rem',
    },
    forgotPasswordText: {
        marginTop: '1rem',
        color: '#d6719e',
    },
    link: {
        cursor: 'pointer',
        color: '#d6719e',
        textDecoration: 'underline',
    },
    backButton: {
        marginTop: '1rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#d6719e',
        color: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
    },
};

export default TenantLogin;

