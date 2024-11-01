import React from 'react';

function AdminLogin({ onBack }) {
    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Admin Login Page</h2>
            {/* Add your admin login form here */}
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
        color: '#d6719e'
    },
    backButton: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        color: '#ffffff',
        backgroundColor: '#d6719e',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        marginTop: '1rem',
        transition: 'all 0.3s ease',
    },
};

export default AdminLogin;
