const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const mariadb = require('mariadb');
// const server = require('./server');


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
        const data = await connection.query(`SELECT * FROM brilliant_minds.ideas WHERE id=${ideaId}`);
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
});

app.put("/:id", async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      const ideaId = req.params.id;
      const newTitle = req.body.title;
      const newDescription = req.body.description;
      if (!newTitle || !newDescription) {
        throw new Error("title and description are required");
      }
      const data = await connection.query(
        "UPDATE brilliant_minds.ideas SET title = ?, description = ? WHERE id = ?",
        [newTitle, newDescription, ideaId]
      );
      res.status(200).send("Idea updated successfully");
    } catch (err) {
      throw err;
    } finally {
      if (connection) connection.end();
    }
  });

  app.delete("/:id", async (req, res) => {
    let connection;
    try {
      connection = await pool.getConnection();
      let ideaId = req.params.id;
      const data = await connection.query(`DELETE FROM brilliant_minds.ideas WHERE id=${ideaId}`);
      res.json({ message: "Idea deleted successfully." });
    } catch (err) {
      throw err;
    } finally {
      if (connection) connection.end();
    }
  });
  
//   app.use('/', express.static(path.join(__dirname, 'client')));
//   app.use('/api', server);
  

app.listen(3000, () => {
    console.log("Server started on http://127.0.0.1:3000");
});

