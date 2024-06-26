const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});

connection.connect();

app.get('/', (req, res) => {
  const sql = `INSERT INTO people(name) VALUES('John Doe')`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    connection.query('SELECT * FROM people', (err, results) => {
      if (err) throw err;
      let namesList = '<ul>';
      results.forEach(row => {
        namesList += `<li>${row.name}</li>`;
      });
      namesList += '</ul>';
      res.send(`<h1>Full Cycle Rocks!</h1>${namesList}`);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
