const express = require('express')
const app = express();
const mysql = require('mysql')
const dbconfig = require('./config/dbconfig')
const connection = mysql.createConnection(dbconfig);

connection.connect();

connection.query('SELECT title from fastival_kr', (error, rows, fields) => {
  if (error) throw error;
  console.log('title : ', rows);
});

connection.end();