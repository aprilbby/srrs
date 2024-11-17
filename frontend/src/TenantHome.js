import React, { useState } from 'react';
import Camera from './Camera';

const TenantHome = ({ user, onLogout }) => {
    const [submissionStatus, setSubmissionStatus] = useState('');
    const [submittedData, setSubmittedData] = useState(null);

    const handleSubmission = (data) => {
        setSubmittedData(data);
        setSubmissionStatus('Submission successful!');

        // Send data to the backend
        fetch('http://localhost:5000/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log('Submission result:', result);
            })
            .catch((error) => {
                console.error('Error submitting data:', error);
                setSubmissionStatus('Submission failed. Please try again.');
            });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome, {user ? user.name : "Tenant"}!</h1>
            <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
            <Camera onSubmission={handleSubmission} />
            {submissionStatus && <p style={styles.status}>{submissionStatus}</p>}
            {submittedData && (
                <div style={styles.submissionDetails}>
                    <h3>Submission Details</h3>
                    <img src={submittedData.image} alt="Submission" style={styles.imagePreview} />
                    <p>Latitude: {submittedData.location.latitude}</p>
                    <p>Longitude: {submittedData.location.longitude}</p>
                    <p>Time: {submittedData.timestamp}</p>
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: "1rem",
        backgroundColor: "#f8e1e7",
        borderRadius: "15px",
        textAlign: "center",
    },
    heading: {
        fontSize: "1.8rem",
        color: "#d6719e",
        marginBottom: "1rem",
    },
    logoutButton: {
        marginBottom: "1rem",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#d6719e",
        color: "#ffffff",
        border: "none",
        borderRadius: "10px",
    },
    status: {
        marginTop: "1rem",
        color: "#333",
    },
    submissionDetails: {
        marginTop: "2rem",
    },
    imagePreview: {
        width: "100%",
        maxWidth: "300px",
        borderRadius: "10px",
        marginBottom: "1rem",
    },
};

export default TenantHome;

