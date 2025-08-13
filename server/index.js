const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'doc_management'
});

app.post('/api/credentials', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [result] = await connection.query(
      'INSERT INTO credentials SET ?',
      req.body
    );
    connection.release();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/credentials', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT * FROM credentials');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3001, () => {
  console.log('الخادم يعمل على http://localhost:3001');
});
