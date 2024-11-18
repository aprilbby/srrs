import React, { useRef, useState, useEffect } from 'react';

const Camera = ({ onSubmission }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [error, setError] = useState(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [location, setLocation] = useState({ latitude: null, longitude: null });
    const [timestamp, setTimestamp] = useState(null);

    useEffect(() => {
        let stream;
        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then((mediaStream) => {
                stream = mediaStream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            })
            .catch((err) => {
                console.error("Error accessing the camera:", err);
                setError("Error accessing the camera: " + err.message);
            });

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                    });
                },
                (err) => {
                    console.error("Error getting location:", err);
                    setError("Error getting location: " + err.message);
                }
            );
        } else {
            setError("Geolocation is not supported by this browser.");
        }

        return () => {
            if (stream) {
                const tracks = stream.getTracks();
                tracks.forEach((track) => track.stop());
            }
        };
    }, []);

    const handleCapture = () => {
        if (canvasRef.current && videoRef.current) {
            const canvas = canvasRef.current;
            const video = videoRef.current;
    
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
    
            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
            const imageDataUrl = canvas.toDataURL("image/png");
            setCapturedImage(imageDataUrl);
    
            const now = new Date();
            const formattedTimestamp = now.toISOString().slice(0, 19).replace('T', ' ');
            setTimestamp(formattedTimestamp);
        }
    };
    
    const handleRetake = () => {
        setCapturedImage(null);
        setTimestamp(null);
    
        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then((mediaStream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = mediaStream;
                }
            })
            .catch((err) => {
                console.error("Error reactivating the camera:", err);
                setError("Error reactivating the camera: " + err.message);
            });
    };

    const handleSubmit = () => {
        if (!capturedImage || !location.latitude || !location.longitude || !timestamp) {
            alert('Please ensure all data is available before submitting.');
            return;
        }
    
        if (onSubmission) {
            onSubmission({
                image: capturedImage,
                location,
                timestamp,
            });
        }
    };
    
    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Capture Image</h2>
            {error && <p style={styles.error}>{error}</p>}
            {!capturedImage ? (
                <>
                    <video ref={videoRef} autoPlay style={styles.video} />
                    <button onClick={handleCapture} style={styles.captureButton}>
                        Capture
                    </button>
                </>
            ) : (
                <div style={styles.previewContainer}>
                    <img src={capturedImage} alt="Captured" style={styles.previewImage} />
                    <p>Latitude: {location.latitude}, Longitude: {location.longitude}</p>
                    <p>Time: {timestamp}</p>
                    <button onClick={handleRetake} style={styles.retakeButton}>Take Again</button>
                    <button onClick={handleSubmit} style={styles.submitButton}>Submit</button>
                </div>
            )}
            <canvas ref={canvasRef} style={{ display: "none" }} />
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
        fontSize: "1.5rem",
        color: "#d6719e",
        marginBottom: "1rem",
    },
    video: {
        width: "100%",
        maxWidth: "500px",
        borderRadius: "10px",
    },
    captureButton: {
        marginTop: "1rem",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#d6719e",
        color: "#ffffff",
        border: "none",
        borderRadius: "10px",
        fontSize: "1rem",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    previewContainer: {
        textAlign: "center",
    },
    previewImage: {
        width: "100%",
        maxWidth: "300px",
        borderRadius: "10px",
        marginBottom: "1rem",
    },
    retakeButton: {
        marginRight: "1rem",
        padding: "0.75rem 1.5rem",
        backgroundColor: "#f8e1e7",
        color: "#d6719e",
        border: "1px solid #d6719e",
        borderRadius: "10px",
        fontSize: "1rem",
        cursor: "pointer",
    },
    submitButton: {
        padding: "0.75rem 1.5rem",
        backgroundColor: "#d6719e",
        color: "#ffffff",
        border: "none",
        borderRadius: "10px",
        fontSize: "1rem",
        cursor: "pointer",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
};

export default Camera;


