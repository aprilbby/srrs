import React, { useRef, useState, useEffect } from 'react';

const Camera = ({ onImageCaptured }) => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [error, setError] = useState(null);
    const [location, setLocation] = useState({ latitude: null, longitude: null });

    useEffect(() => {
        // Request access to the camera
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

        // Get the user's location
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

        // Clean up the stream when the component unmounts
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

            // Set canvas size to match the video feed
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;

            // Draw the current video frame onto the canvas
            const context = canvas.getContext("2d");
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Get the image data URL
            const imageDataUrl = canvas.toDataURL("image/png");

            // Pass the captured image and location to the parent component
            if (onImageCaptured) {
                onImageCaptured({
                    image: imageDataUrl,
                    location,
                });
            }
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Capture Image from Camera</h2>
            {error && <p style={styles.error}>{error}</p>}
            <video ref={videoRef} autoPlay style={styles.video} />
            <button onClick={handleCapture} style={styles.button}>
                Capture
            </button>
            <canvas ref={canvasRef} style={{ display: "none" }} />
            {location.latitude && location.longitude && (
                <p style={styles.location}>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                </p>
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
        fontSize: "1.5rem",
        color: "#d6719e",
        marginBottom: "1rem",
    },
    video: {
        width: "100%",
        maxWidth: "500px",
        borderRadius: "10px",
    },
    button: {
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
    error: {
        color: "#d6719e",
        fontSize: "0.9rem",
        marginBottom: "1rem",
    },
    location: {
        marginTop: "1rem",
        color: "#555",
    },
};

export default Camera;

