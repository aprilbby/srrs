import React from 'react';

function TenantLogin({ onBack, onSignup }) {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Tenant Login</h2>
            <input
                type="email"
                placeholder="Enter your email"
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Enter your password"
                style={styles.input}
            />
            <button style={styles.loginButton}>Login</button>
            <p style={styles.signupText}>
                Don't have an account? <span onClick={onSignup} style={styles.signupLink}>Signup</span>
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
    },
    title: {
        fontSize: '1.8rem',
        marginBottom: '1.5rem',
        color: '#d6719e',
    },
    input: {
        width: '80%',
        padding: '0.75rem',
        marginBottom: '1rem',
        fontSize: '1rem',
        borderRadius: '8px',
        border: '1px solid #b0bec5',
        outline: 'none',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    loginButton: {
        width: '80%',
        padding: '0.75rem',
        fontSize: '1rem',
        color: '#ffffff',
        backgroundColor: '#d6719e',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '0.5rem',
        transition: 'background-color 0.3s ease',
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
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '1.5rem',
    },
};

export default TenantLogin;
