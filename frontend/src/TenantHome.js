import React from 'react';

function TenantHome({ user, onLogout, onScanFace, onRegisterFace }) {
    return (
        <div style={styles.container}>
            <h1 style={styles.welcomeText}>Welcome, {user ? user.name : "Tenant"}!</h1>
            <p>You are now logged in.</p>
            
            <button style={styles.actionButton} onClick={onLogout}>Logout</button>
            <button style={styles.actionButton} onClick={onScanFace}>Scan Face</button>
            <button style={styles.actionButton} onClick={onRegisterFace}>Register Face</button>
        </div>
    );
}

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
    },
    welcomeText: {
        fontSize: '2rem',
        color: '#d6719e',
        marginBottom: '1rem',
        fontWeight: 'bold',
    },
    actionButton: {
        width: '100%',
        maxWidth: '200px',
        padding: '0.75rem',
        fontSize: '1rem',
        color: '#ffffff',
        backgroundColor: '#d6719e',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '1rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

export default TenantHome;
