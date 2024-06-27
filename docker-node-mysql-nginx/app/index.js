const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'test'
};

const connection = mysql.createConnection(config);

connection.connect((err) => {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

app.get('/', (req, res) => {
  const name = `User${Date.now()}`;
  const sql = `INSERT INTO people(name) values('${name}')`;

  connection.query(sql, function (err, result) {
    if (err) throw err;
    connection.query('SELECT name FROM people', (err, results) => {
      if (err) throw err;
      let response = '<h1>Full Cycle Rocks!</h1><ul>';
      results.forEach(row => {
        response += `<li>${row.name}</li>`;
      });
      response += '</ul>';
      res.send(response);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
