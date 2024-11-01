import React, { useState } from 'react';
import axios from 'axios';

function TenantLogin({ onBack, onSignup, onLoginSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });
            setMessage(response.data.message);
            onLoginSuccess(response.data.user); // Redirect to TenantHome on success
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Login failed');
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
            <button style={styles.loginButton} onClick={handleLogin}>Login</button>
            <p style={styles.message}>{message}</p>
            <p style={styles.signupText}>
                Don't have an account? <span onClick={onSignup} style={styles.signupLink}>SIGNUP</span>
            </p>
            <button style={styles.backButton} onClick={onBack}>Back</button>
        </div>
    );
}

const styles = {
    container: {
        textAlign: 'center',
        marginTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f8e1e7',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '400px',
        margin: 'auto',
    },
    title: {
        fontSize: '1.8rem',
        marginBottom: '1.5rem',
        color: '#d6719e',
        fontWeight: 'bold',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        marginBottom: '1rem',
        fontSize: '1rem',
        borderRadius: '10px',
        border: '1px solid #e0b0c7',
        outline: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        transition: 'border-color 0.3s ease',
    },
    loginButton: {
        width: '100%',
        padding: '0.75rem',
        fontSize: '1rem',
        color: '#ffffff',
        backgroundColor: '#d6719e',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '0.5rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    message: {
        fontSize: '0.9rem',
        color: '#d6719e',
        marginTop: '1rem',
    },
    signupText: {
        fontSize: '0.9rem',
        color: '#555',
        marginTop: '1rem',
    },
    signupLink: {
        color: '#d6719e',
        cursor: 'pointer',
        textDecoration: 'underline',
    },
    backButton: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        color: '#ffffff',
        backgroundColor: '#d6719e',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        marginTop: '1.5rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

export default TenantLogin;
