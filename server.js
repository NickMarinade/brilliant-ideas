const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mariadb = require('mariadb');


dotenv.config();


const app = express();

app.use(cors());
app.use(bodyParser.json());

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
});

app.post("/add", async (req, res) => {
    let connection;
    try {
        connection = await pool.getConnection();
        const {title, description} = req.body;
        if (!title || !description) {
            throw new Error("title and description are required");
        }
        await connection.query(
            `INSERT INTO brilliant_minds.ideas (title, description) VALUES (?, ?)`,
            [title, description]
        );
        res.status(200).send("Idea added successfully");
    } catch (err) {
        throw err;
    } finally {
        if(connection) connection.end();
    }
})


app.listen(3000, () => {
    console.log("Server started on http://127.0.0.1:3000");
});


// const insertIdea = async (title, description) => {
//     let connection; 
//      try {
//        connection = await pool.getConnection();
//        const query = `INSERT INTO Ideas (Title, Description, Created_at) VALUES (?, ?, NOW())`; 
//        const data = [title, description]; 
//        const result = await connection.query(query, data); 
//        console.log(result)
//        return result; 
//      } catch (err) {
//        throw err; 
//      } finally {
//        if (connection) connection.end(); 
//    };
//    }
   
//    app.post("/new-idea", async (req, res) => {
//      const { Title, Description } = req.body; 
//      try {
//        const result = await insertIdea(Title, Description);
//        res.redirect("http://localhost:5500/client"); //<--- should redirect???
//      } catch (err) {
//        console.error(err);
//        res
//          .status(500)
//          .send("Erreur lors de l'insertion de l'idée dans la base de données"); 
//      }
//    });
