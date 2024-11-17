import React, { useState } from 'react';
import Camera from './Camera';

const TenantHome = ({ user, onLogout }) => {
    const [submissionData, setSubmissionData] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState('');

    const handleSubmission = (data) => {
        setSubmissionData(data);
        setIsModalOpen(true);

        fetch('http://localhost:5000/api/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to submit data');
                }
                return response.json();
            })
            .then((result) => {
                setSubmissionStatus('Submission successful!');
                console.log('Submission result:', result);
            })
            .catch((error) => {
                setSubmissionStatus('Submission failed. Please try again.');
                console.error('Error submitting data:', error);
            });
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSubmissionData(null);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>Welcome, {user ? user.name : "Tenant"}!</h1>
            <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
            <Camera onSubmission={handleSubmission} />

            {isModalOpen && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <h2>Submission Details</h2>
                        {submissionStatus && <p>{submissionStatus}</p>}
                        {submissionData && (
                            <>
                                <img src={submissionData.image} alt="Captured" style={styles.imagePreview} />
                                <p>Latitude: {submissionData.location.latitude}</p>
                                <p>Longitude: {submissionData.location.longitude}</p>
                                <p>Time: {submissionData.timestamp}</p>
                            </>
                        )}
                        <button onClick={closeModal} style={styles.closeButton}>Close</button>
                    </div>
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
    modal: {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: "2rem",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    },
    imagePreview: {
        width: "100%",
        maxWidth: "300px",
        borderRadius: "10px",
        marginBottom: "1rem",
    },
    closeButton: {
        marginTop: "1rem",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#d6719e",
        color: "#ffffff",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
    },
};

export default TenantHome;


