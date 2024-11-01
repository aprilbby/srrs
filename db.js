const mysql = require("mysql");
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "my_first_db"
});

connection.connect((err) => {
    if (err) {
        console.error("An error occurred: " + err);
        return;
    }

    console.log("MySQL DB connected successfully");
});

module.exports = { connection };
