import { createConnection } from 'mysql';
import { databaseConfig } from './config.js';
import { generateFullName } from './utils.js';

const connection = createConnection(databaseConfig);

export const insertPeople = async () => {
  return new Promise((resolve, reject) => {
    const name = generateFullName();

    const sql = `INSERT INTO people (name) VALUES ('${name}')`;
    connection.query(sql, (error, result) =>
      error ? reject(error) : resolve(result)
    );
  });
};

export const getAllPeople = async () => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM people';
    connection.query(sql, (error, results) =>
      error ? reject(error) : resolve(results)
    );
  });
};