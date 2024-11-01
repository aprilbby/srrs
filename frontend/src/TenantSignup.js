import React from 'react';

function TenantSignup({ onBack }) {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Tenant Signup</h2>
            <input
                type="text"
                placeholder="Full Name"
                style={styles.input}
            />
            <input
                type="email"
                placeholder="Email Address"
                style={styles.input}
            />
            <input
                type="password"
                placeholder="Password"
                style={styles.input}
            />
            <button style={styles.signupButton}>Sign Up</button>
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
    signupButton: {
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

export default TenantSignup;
