const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

const connection = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'test'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.get('/', (req, res) => {
  const sqlInsert = `INSERT INTO people(name) VALUES('Full Cycle Rocks!')`;
  connection.query(sqlInsert, (err) => {
    if (err) {
      console.error('Error inserting into table:', err);
      res.send('Error inserting into table');
      return;
    }
    connection.query(`SELECT name FROM people`, (err, results) => {
      if (err) {
        console.error('Error fetching from table:', err);
        res.send('Error fetching from table');
        return;
      }
      const namesList = results.map(row => `<li>${row.name}</li>`).join('');
      res.send(`<h1>Full Cycle Rocks!</h1><ul>${namesList}</ul>`);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
