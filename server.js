const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mariadb = require('mariadb');


dotenv.config();


const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 5
});

app.get("/test", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const data = await connection.query(`SELECT * FROM brilliant_minds.ideas`);
        const jsonS = JSON.stringify(data); 
        res.writeHead(200, {'Content-Type': 'text/html'}); 
        res.end(jsonS);
    } catch (err) {
        throw err;
    } finally {
        if(connection) connection.end();
    }
});

app.get("/:id", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        let ideaId = req.params.id;
        const data = await connection.query(`SELECT * FROM brilliant_minds.ideas WHERE id=` + ideaId);
        const jsonS = JSON.stringify(data); 
        res.writeHead(200, {'Content-Type': 'text/html'}); 
        res.end(jsonS);
    } catch (err) {
        throw err;
    } finally {
        if(connection) connection.end();
    }
})

app.listen(3000, () => {
    console.log("Server started on http://127.0.0.1:3000");
});

