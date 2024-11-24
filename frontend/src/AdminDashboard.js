import React, { useEffect, useState } from 'react';

const AdminDashboard = ({ onLogout }) => {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

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
        fetch(`http://localhost:5000/api/submissions/${id}/verify`, { method: 'PATCH' })
            .then(() => fetchSubmissions())
            .catch((error) => console.error('Error verifying submission:', error));
    };

    const handleFlag = (id) => {
        fetch(`http://localhost:5000/api/submissions/${id}/flag`, { method: 'PATCH' })
            .then(() => fetchSubmissions())
            .catch((error) => console.error('Error flagging submission:', error));
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/api/submissions/${id}`, { method: 'DELETE' })
            .then(() => fetchSubmissions())
            .catch((error) => console.error('Error deleting submission:', error));
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        return date.toLocaleString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        });
    };

    const filteredSubmissions = submissions.filter((submission) =>
        filter === 'all' ? true : submission.status === filter
    );

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <button onClick={onLogout} style={styles.logoutButton}>Logout</button>
            <div style={styles.filterContainer}>
                <button
                    style={{
                        ...styles.filterButton,
                        backgroundColor: filter === 'all' ? '#c0628f' : '#d6719e',
                    }}
                    onClick={() => setFilter('all')}
                >
                    All
                </button>
                <button
                    style={{
                        ...styles.filterButton,
                        backgroundColor: filter === 'pending' ? '#c0628f' : '#d6719e',
                    }}
                    onClick={() => setFilter('pending')}
                >
                    Pending
                </button>
                <button
                    style={{
                        ...styles.filterButton,
                        backgroundColor: filter === 'needs attention' ? '#c0628f' : '#d6719e',
                    }}
                    onClick={() => setFilter('needs attention')}
                >
                    Needs Attention
                </button>
                <button
                    style={{
                        ...styles.filterButton,
                        backgroundColor: filter === 'verified' ? '#c0628f' : '#d6719e',
                    }}
                    onClick={() => setFilter('verified')}
                >
                    Verified
                </button>
            </div>
            {loading ? (
                <p>Loading submissions...</p>
            ) : filteredSubmissions.length === 0 ? (
                <p>No submissions found.</p>
            ) : (
                <div style={styles.submissionsContainer}>
                    {filteredSubmissions.map((submission) => (
                        <div key={submission.id} style={styles.submissionCard}>
                            <button
                                onClick={() => handleDelete(submission.id)}
                                style={styles.deleteButton}
                                title="Delete Submission"
                            >
                                &times;
                            </button>
                            <img src={submission.image} alt="Submission" style={styles.image} />
                            <p>
                                <strong>Latitude:</strong> {submission.latitude}
                            </p>
                            <p>
                                <strong>Longitude:</strong> {submission.longitude}
                            </p>
                            <p>
                                <strong>Time:</strong> {formatDate(submission.timestamp)}
                            </p>
                            <p>
                                <strong>Status:</strong> {submission.status}
                            </p>
                            <p>
                                <strong>Submitted by:</strong>{' '}
                                {submission.userName || 'Unknown'}
                            </p>
                            <div style={styles.actionButtons}>
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
        maxWidth: '1200px',
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
        color: '#fff',
        border: 'none',
        borderRadius: '10px',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    filterContainer: { marginBottom: '1rem' },
    filterButton: {
        margin: '0.5rem',
        padding: '0.5rem 1rem',
        borderRadius: '10px',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    submissionsContainer: {
        display: 'grid',
        gap: '1rem',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    },
    submissionCard: {
        position: 'relative',
        padding: '1rem',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        textAlign: 'left',
    },
    image: { width: '100%', borderRadius: '10px', marginBottom: '1rem' },
    actionButtons: { display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem' },
    verifyButton: {
        padding: '0.5rem 1rem',
        backgroundColor: 'green',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    flagButton: {
        padding: '0.5rem 1rem',
        backgroundColor: 'orange',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    deleteButton: {
        position: 'absolute',
        top: '5px',
        right: '5px',
        backgroundColor: 'red',
        color: '#fff',
        border: 'none',
        borderRadius: '50%',
        width: '25px',
        height: '25px',
        fontSize: '16px',
        cursor: 'pointer',
    },
};

export default AdminDashboard;





