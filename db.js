const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "aprilbby",
    database: "store_rental_db"
});

connection.connect((err) => {
    if (err) {
        console.error("An error occurred: " + err);
        return;
    }

    console.log("MySQL DB connected successfully");
});

module.exports = { connection };
