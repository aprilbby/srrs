import React from 'react';

function LoginPage({ onSelectUserType }) {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Store Rental System</h1>
            <div style={styles.options}>
                <p style={styles.questionText}>Login as:</p>
                <div style={styles.buttonsContainer}>
                    <button style={styles.optionButton} onClick={() => onSelectUserType('tenant')}>
                        Tenant
                    </button>
                    <button style={styles.optionButton} onClick={() => onSelectUserType('admin')}>
                        Admin
                    </button>
                </div>
            </div>
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
        padding: '1rem',
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: '#d6719e',
        fontWeight: 'bold',
    },
    options: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    questionText: {
        fontSize: '1.2rem',
        marginBottom: '0.5rem',
        color: '#b56576',
    },
    buttonsContainer: {
        display: 'flex',
        gap: '1rem',
    },
    optionButton: {
        padding: '0.75rem 1.5rem',
        fontSize: '1rem',
        color: '#ffffff',
        backgroundColor: '#d6719e',
        border: 'none',
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
};

export default LoginPage;
