const express = require('express');
const mysql = require('mysql');
const app = express();

const db = mysql.createConnection({
  host: 'db',
  user: 'root',
  password: 'password',
  database: 'test'
});

db.connect();

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);

  db.query('INSERT INTO people (name) VALUES ("Full Cycle Rocks!")', (error, results, fields) => {
    if (error) throw error;

    db.query('SELECT * FROM people', (error, results, fields) => {
      if (error) throw error;

      let html = '<h1>Full Cycle Rocks!</h1><ul>';
      results.forEach(row => {
        html += `<li>${row.name}</li>`;
      });
      html += '</ul>';

      res.send(html);
    });
  });
});

app.listen(3000, () => {
  console.log('App running on port 3000');
});
