import React from 'react';

function TenantHome({ user }) {
    return (
        <div style={styles.container}>
            <h1>Welcome, {user ? user.name : "Tenant"}!</h1>
            <p>You are now logged in.</p>
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
    },
};

export default TenantHome;
