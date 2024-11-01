import React, { useState } from 'react';
import axios from 'axios';

function TenantSignup({ onBack, onSignupSuccess }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSignup = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                name,
                email,
                password
            });
            setMessage(response.data.message);
            onSignupSuccess({ name, email }); // Redirect to TenantHome on success
        } catch (error) {
            setMessage(error.response ? error.response.data.message : 'Signup failed');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Tenant Signup</h2>
            <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
            />
            <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />
            <button style={styles.signupButton} onClick={handleSignup}>Sign Up</button>
            <p style={styles.message}>{message}</p>
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
    signupButton: {
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

export default TenantSignup;
