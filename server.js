const express = require("express");
const app = express();
const port = 3000;

// db
const mysqldb = require('./db').connection;

app.get("/data", (req, res) => {
    mysqldb.query("SELECT * FROM students", (error, results) => {
        if (error) throw error;
        res.json(results);
    });
});

app.get("/", (req, res) => {
    res.send("Hello World! It's a test server");
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
