import React, { useState } from 'react';
import Camera from './Camera';

const TenantHome = ({ user, onLogout }) => {
    const [capturedData, setCapturedData] = useState(null);

    const handleImageCaptured = (data) => {
        setCapturedData(data);
        console.log("Captured Data:", data);
        // You can later send `data.image` and `data.location` to the backend
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome, {user ? user.name : "Tenant"}!</h1>
            <button onClick={onLogout} style={styles.button}>Logout</button>
            <Camera onImageCaptured={handleImageCaptured} />
            {capturedData && (
                <div style={styles.dataContainer}>
                    <h3>Captured Data:</h3>
                    <img src={capturedData.image} alt="Captured" style={styles.imagePreview} />
                    <p>Latitude: {capturedData.location.latitude}</p>
                    <p>Longitude: {capturedData.location.longitude}</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "#f8e1e7",
        borderRadius: "15px",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    heading: {
        fontSize: "1.8rem",
        color: "#d6719e",
        marginBottom: "1.5rem",
    },
    button: {
        marginBottom: "1rem",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#d6719e",
        color: "#ffffff",
        border: "none",
        borderRadius: "10px",
        fontSize: "1rem",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    dataContainer: {
        marginTop: "1rem",
        textAlign: "center",
    },
    imagePreview: {
        marginTop: "0.5rem",
        width: "100%",
        maxWidth: "300px",
        borderRadius: "10px",
    },
};

export default TenantHome;
