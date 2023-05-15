const express = require('express')
const fs = require('fs')
const app = express();
const request = require('request')
const path = require('path')
const apidata = require('./api.json')
require('dotenv').config();
const mysql = require('mysql')
const dbconfig = require('./config/dbconfig')
const connection = mysql.createConnection(dbconfig);
const dbinsert = require('./config/dbinsert');
var apiJson = "";

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connection.connect(
  console.log('Succeed to connect MySQL')
);

app.get('/', (req,res) => {
    res.send('/ page')
    console.log('/ page')
})

app.get('/admin', (req,res) => {
  res.send('admin page')
  console.log('admin page')
})

app.get('/fastivals/:pageNo', (req,res) => {
  apiRequest(req.params.pageNo);
  res.send(apidata)
})

app.get('/sqlfastivals', (req,res) => {
  connection.query('select * from fastival_kr', (err, row, fields) => {
    if(err) throw err;
    res.send(row)
  })
})

app.post('/newfastival', (req,res) => {
  var insertsql = dbinsert.sql;
  var values = [
    req.body.title,
    req.body.subtitle,
    req.body.main_place,
    req.body.addr1,
    req.body.addr2,
    req.body.cntct_tel,
    req.body.homepage_url,
    req.body.trfc_info,
    req.body.usage_day,
    req.body.usage_day_week_and_time,
    req.body.usage_amount,
    req.body.main_img_normal,
    req.body.main_img_thumb,
    req.body.itemcntnts
    ]
    console.log(values)
    connection.query(insertsql,values, (err, row, fields) => {
      if(err) throw err;
      console.log('succeed insert');
    })
})

app.delete('/deletefastival/:id', (req,res) => {
  connection.query(`delete from fastival_kr where api_id = ${req.params.id}`, (err, row, fields) => {
    if(err) throw err;
    console.log('succeed delete');
  })
})

const apiRequest = (pageNo) => {
  //console.log(pageNo)
  let options = {
    url : process.env.FASTIVAL_API_URL,
    qs : {
      serviceKey : process.env.URL_KEY_DECODING,
      //보낼 때 자체적으로 encoding 을 하기 때문에 decoding 된 key로 전달을 해줘야 한다고 한다.
      numOfRows : 10,
      pageNo : pageNo,
      resultType : 'json',
      //resultType은 json으로 줘서 보기 편하게 해준다.
    }
  }
  request(options, (err, res, body) => {
    apiJson = JSON.stringify(body)
    apiJson.replace('+', ' ')
    apiJson.replace('/\n/g', ' ')
  })
}

app.listen(8008, () => {
  console.log('http://localhost:8008')
})
