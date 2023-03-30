const express = require('express')
const app = express();
const mysql = require('mysql')
const dbconfig = require('./config/dbconfig')
const connection = mysql.createConnection(dbconfig);

connection.connect();



connection.query('SELECT * from Users', (error, rows, fields) => {
  if (error) throw error;
  console.log('User info is: ', rows);
});

connection.end();