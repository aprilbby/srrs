const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',        // Replace with your database host, e.g., 'localhost'
    user: 'your_username',    // Replace with your MySQL username
    password: 'aprilbby',// Replace with your MySQL password
    database: 'store_rental_db' // Replace with your database name
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database.');
});

module.exports = db;
