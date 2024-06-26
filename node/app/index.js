const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

const config = {
  host: 'db', // Nome do serviço do MySQL
  user: 'root',
  password: 'root',
  database: 'nodedb'
};

const connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

app.get('/', (req, res) => {
  const sqlInsert = `INSERT INTO people(name) VALUES('John Doe')`;
  connection.query(sqlInsert, err => {
    if (err) throw err;

    const sqlSelect = 'SELECT * FROM people';
    connection.query(sqlSelect, (err, results) => {
      if (err) throw err;
      let names = '<ul>';
      results.forEach(person => {
        names += `<li>${person.name}</li>`;
      });
      names += '</ul>';
      res.send(`<h1>Full Cycle Rocks!</h1>${names}`);
    });
  });
});

app.listen(port, () => {
  console.log('Running on port ' + port);
});
