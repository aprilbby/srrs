import React, { useEffect, useState } from 'react';

const AdminDashboard = ({ onLogout }) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = () => {
        fetch('http://localhost:5000/api/submissions')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch submissions');
                }
                return response.json();
            })
            .then((data) => {
                setSubmissions(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching submissions:', error);
                setLoading(false);
            });
    };

    const handleVerify = (id) => {
        fetch(`http://localhost:5000/api/submissions/${id}/verify`, {
            method: 'PATCH',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to verify submission');
                }
                return response.json();
            })
            .then(() => {
                fetchSubmissions(); // Refresh the list after updating
            })
            .catch((error) => {
                console.error('Error verifying submission:', error);
            });
    };

    const handleFlag = (id) => {
        fetch(`http://localhost:5000/api/submissions/${id}/flag`, {
            method: 'PATCH',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to flag submission');
                }
                return response.json();
            })
            .then(() => {
                fetchSubmissions(); // Refresh the list after updating
            })
            .catch((error) => {
                console.error('Error flagging submission:', error);
            });
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <button onClick={onLogout} style={styles.logoutButton}>Logout</button>

            {loading ? (
                <p>Loading submissions...</p>
            ) : submissions.length === 0 ? (
                <p>No submissions found.</p>
            ) : (
                <div style={styles.submissionsContainer}>
                    {submissions.map((submission) => (
                        <div key={submission.id} style={styles.submissionCard}>
                            <img
                                src={submission.image}
                                alt="Submission"
                                style={styles.image}
                            />
                            <p><strong>Latitude:</strong> {submission.latitude}</p>
                            <p><strong>Longitude:</strong> {submission.longitude}</p>
                            <p><strong>Time:</strong> {submission.timestamp}</p>
                            <p><strong>Status:</strong> {submission.status}</p>
                            <button
                                onClick={() => handleVerify(submission.id)}
                                style={styles.verifyButton}
                            >
                                Verify
                            </button>
                            <button
                                onClick={() => handleFlag(submission.id)}
                                style={styles.flagButton}
                            >
                                Flag as Needs Attention
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: {
        padding: '2rem',
        backgroundColor: '#f8e1e7',
        borderRadius: '15px',
        maxWidth: '800px',
        margin: '2rem auto',
        textAlign: 'center',
    },
    title: {
        fontSize: '2rem',
        color: '#d6719e',
        marginBottom: '1rem',
    },
    logoutButton: {
        marginBottom: '1rem',
        padding: '0.75rem 1.5rem',
        backgroundColor: '#d6719e',
        color: '#ffffff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    submissionsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1rem',
    },
    submissionCard: {
        padding: '1rem',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
    },
    image: {
        width: '100%',
        borderRadius: '10px',
        marginBottom: '1rem',
    },
    verifyButton: {
        marginRight: '0.5rem',
        padding: '0.5rem 1rem',
        backgroundColor: '#4CAF50',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    flagButton: {
        padding: '0.5rem 1rem',
        backgroundColor: '#FF5722',
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default AdminDashboard;

