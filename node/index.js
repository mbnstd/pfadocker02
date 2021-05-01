const mysql = require('mysql2/promise');
const express = require('express');
const app = express();

const connectdb = async () => {
  try {
    const conn = await mysql.createConnection({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_ROOT_USER,
      database: process.env.MYSQL_DATABASE,
      charset: 'utf8mb4'
    });
    await conn.connect();
    console.log('Connected to mysqldb');
    return conn;
  } catch (err) {
    console.error('Could not connect to mysql db');
  }
}

const getModules = async (conn) => {
  const [rows, fields] = await conn.execute('SELECT * FROM `MODULES`');
  console.log(rows);
  return rows.map(e => e.NAME);
}

const startServer = async () => {
  const conn = await connectdb();

  app.get('/', async (req, res) => {
    const modules = await getModules(conn);
    res.send(modules)
  });

  await app.listen(3000);
  console.log("Rodando na porta 3000");
}

startServer();