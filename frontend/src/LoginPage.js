import React from 'react';

function LoginPage() {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Store Rental System</h1>
            <div style={styles.form}>
                <h2 style={styles.subtitle}>Login</h2>
                <input
                    type="text"
                    placeholder="Username"
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    style={styles.input}
                />
                <button style={styles.loginButton}>Login</button>
            </div>
            <div style={styles.options}>
                <p style={styles.questionText}>Are you a:</p>
                <div style={styles.buttonsContainer}>
                    <button style={styles.optionButton}>Tenant</button>
                    <button style={styles.optionButton}>Admin</button>
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
        backgroundColor: '#e0f7fa',
        fontFamily: 'Arial, sans-serif',
        padding: '1rem'
    },
    title: {
        fontSize: '2.5rem',
        marginBottom: '2rem',
        color: '#00796b',
        fontWeight: 'bold'
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '320px',
        padding: '2rem',
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
        marginBottom: '1.5rem',
        animation: 'fadeIn 0.5s ease'
    },
    subtitle: {
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
        color: '#37474f'
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        marginBottom: '1rem',
        fontSize: '1rem',
        borderRadius: '8px',
        border: '1px solid #b0bec5',
        outline: 'none',
        transition: 'border-color 0.3s ease',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    },
    loginButton: {
        width: '100%',
        padding: '0.75rem',
        fontSize: '1rem',
        color: '#ffffff',
        backgroundColor: '#00796b',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
        marginTop: '0.5rem',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
    },
    options: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    questionText: {
        fontSize: '1rem',
        marginBottom: '0.5rem',
        color: '#37474f'
    },
    buttonsContainer: {
        display: 'flex',
        gap: '1rem',
    },
    optionButton: {
        padding: '0.5rem 1rem',
        fontSize: '1rem',
        color: '#00796b',
        backgroundColor: '#ffffff',
        border: '2px solid #00796b',
        borderRadius: '8px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
};

export default LoginPage;
