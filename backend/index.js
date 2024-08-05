const mysql = require('mysql');
const express = require('express');
const cors = require('cors');
const morgen = require("morgan")
const app = express();

app.use(express.json());
app.use(cors());

app.use(morgen("tiny"))

const connection = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'Golu@12345',
    database: 'oneLab1',
    port: 3306
});

connection.connect((error) => {
    if (error) {
        console.log("db not connected", error);
    } else {
        console.log("db connected");
    }
});

app.post('/api/post', (req, res) => {
    const { id, name, email, mobile } = req.body;
    const sqlQuery = "INSERT INTO users (id, name, email, mobile) VALUES (?, ?, ?, ?)";
    const values = [id, name, email, mobile];

    connection.query(sqlQuery, values, (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).json({ error: 'Error inserting data' });
        } else {
            console.log("Data inserted successfully:", result);
            res.status(200).json({ message: 'Data inserted successfully' });
        }
    });
});

app.get('/api/get/', (req, res) => {
    
    const sqlQuery = "select * from users ";
    // const sqlQuery = "select * from users where id = ?"
    // const values = [id, name, email, mobile];
    //

    connection.query(sqlQuery,  (err, result) => {
        if (err) {
            console.error("Error inserting data:", err);
            res.status(500).json({ error: 'Error inserting data' });
        } else {
            console.log("Data get successfully:", result);
            res.status(200).json(result);
        }
    });
});

app.get('/api/get/:name', (req, res) => {
    const id = req.params.id; 
    const sqlQuery = "SELECT * FROM users WHERE name = ?"; 

    connection.query(sqlQuery, [id], (err, result) => {
        if (err) {
            console.error("Error retrieving data:", err);
            res.status(500).json({ error: 'Error retrieving data' });
        } else {
            console.log("Data retrieved successfully:", result);
            res.status(200).json(result);
        }
    });
});

app.get('/api/search', (req, res) => {
    try {
        const searchTerm = req.query.searchTerm; 
        console.log(searchTerm)

        if (!searchTerm) {
            return res.status(400).send({ status: 400, Error: 'Search term is required' });
        }
        console.log(typeof searchTerm)

        const SQLQuery = 'SELECT * FROM users WHERE name LIKE ?';
        const formattedQuery = `${searchTerm}%`; 

        connection.query(SQLQuery, [formattedQuery], (err, result) => {
            if (err) {
                console.error('Query Error:', err.sqlMessage);
                return res.status(500).send({ status: 500, Error: err.sqlMessage });
            }
            res.send({ status: 200, response: result });
        });
    } catch (err) {
        console.error('Catch Error:', err);
        res.status(500).send({ status: 500, Error: err.message });
    }
});


app.listen(8000, () => {
    console.log("Server is running on port 8000");
});
