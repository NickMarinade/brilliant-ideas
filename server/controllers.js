const mariadb = require('mariadb');
const dotenv = require('dotenv');

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    connectionLimit: 5
});




const controllers = {
    
    getIdeas: async (req, res) => {
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
    },

    getIdea: async (req, res) => {
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
    },
    
    postIdea: async (req, res) => {
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
        res.status(200);
    } catch (err) {
        throw err;
    } finally {
        if(connection) connection.end();
    }
    },

    updateIdea: async (req, res) => {
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
    },

    deleteIdea: async (req, res) => {
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
    }
}





module.exports = controllers;

