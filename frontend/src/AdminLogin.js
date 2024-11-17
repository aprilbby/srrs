import React, { useState } from 'react';

const AdminLogin = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleLogin = () => {
        if (username === 'admin' && password === 'admin') {
            onLoginSuccess(); 
        } else {
            setErrorMessage('Invalid username or password. Please try again.');
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Admin Login</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={styles.input}
            />
            <button onClick={handleLogin} style={styles.loginButton}>
                Login
            </button>
            {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8e1e7',
        fontFamily: 'Arial, sans-serif',
        padding: '2rem',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '1.8rem',
        color: '#d6719e',
        marginBottom: '1rem',
    },
    input: {
        width: '100%',
        maxWidth: '300px',
        padding: '0.75rem',
        marginBottom: '1rem',
        fontSize: '1rem',
        borderRadius: '10px',
        border: '1px solid #e0b0c7',
        outline: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    loginButton: {
        width: '100%',
        maxWidth: '300px',
        padding: '0.75rem',
        fontSize: '1rem',
        color: '#ffffff',
        backgroundColor: '#d6719e',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    errorMessage: {
        marginTop: '1rem',
        color: '#d6719e',
        fontSize: '0.9rem',
    },
};

export default AdminLogin;

