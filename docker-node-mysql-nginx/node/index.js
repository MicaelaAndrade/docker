const express = require('express');
const mysql = require('mysql');
const app = express();

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'test'
};

const connection = mysql.createConnection(config);

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }

  // Ensure table `people` exists
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS people (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL
    )
  `;
  
  connection.query(createTableQuery, (err, results) => {
    if (err) {
      console.error('Error creating table:', err);
      process.exit(1);
    }
    console.log('Connected to database and ensured table `people` exists');
  });
});

app.get('/', (req, res) => {
  connection.query("INSERT INTO people(name) values('Full Cycle Rocks!')", (err, results) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    connection.query('SELECT name FROM people', (err, results) => {
      if (err) {
        console.error('Error retrieving data:', err);
        res.status(500).send('Internal Server Error');
        return;
      }

      const names = results.map(row => row.name).join('<br>');
      res.send(`<h1>Full Cycle Rocks!</h1><br>${names}`);
    });
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
