const express = require('express');
const mysql = require('mysql');
const app = express();

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    process.exit(1);
  } else {
    console.log('Conectado ao servidor MySQL.');
  }
});

app.get('/', (req, res) => {
  connection.query('SELECT * FROM people', (error, results, fields) => {
    if (error) throw error;

    let names = '<ul>';
    results.forEach(result => {
      names += `<li>${result.name}</li>`;
    });
    names += '</ul>';

    res.send(`<h1>Full Cycle Rocks!</h1>${names}`);
  });
});

app.listen(3000, () => {
  console.log('Servidor está rodando na porta 3000');
});
