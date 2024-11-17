import React from 'react';

const AdminDashboard = ({ onLogout }) => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
            
            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Verified Submissions</h2>
                <p>Placeholder for verified tenant submissions.</p>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Potential Issues</h2>
                <p>Placeholder for tenant submissions flagged as potential issues.</p>
            </div>

            <div style={styles.section}>
                <h2 style={styles.sectionTitle}>Pending Submissions</h2>
                <p>Placeholder for tenants who haven't submitted selfies or locations.</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '1rem',
        backgroundColor: '#f8e1e7',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '90%',
        maxWidth: '800px',
        margin: '2rem auto',
    },
    title: {
        fontSize: '2rem',
        color: '#d6719e',
        marginBottom: '2rem',
        fontWeight: 'bold',
    },
    logoutButton: {
        marginBottom: '2rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#d6719e',
        color: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        cursor: 'pointer',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    section: {
        width: '100%',
        padding: '1rem',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '1rem',
    },
    sectionTitle: {
        fontSize: '1.5rem',
        color: '#333',
        marginBottom: '0.5rem',
    },
};

export default AdminDashboard;
