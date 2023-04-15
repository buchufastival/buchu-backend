const express = require('express')
const fs = require('fs')
const app = express();
const request = require('request')
const mysql = require('mysql')
const apidata = require('./api.json')
require('dotenv').config();
var apiJson = "";
var pageno = 1;

const options = {
  url : process.env.FASTIVAL_API_URL,
  qs : {
    serviceKey : process.env.URL_KEY_DECODING,
    //보낼 때 자체적으로 encoding 을 하기 때문에 decoding 된 key로 전달을 해줘야 한다고 한다.
    numOfRows : 10,
    pageNo : pageno,
    resultType : 'json',
    //resultType은 json으로 줘서 보기 편하게 해준다.
  }
}

app.get('/get/api', (req,res) => {
  apiRequest();
  //res.send(apidata)
})

const apiRequest = () => {
  request(options, (err, res, body) => {
    //console.log(body)
    apiJson = JSON.stringify(body)
    apiJson.replace('+', ' ')
    apiJson.replace('/\n/g', ' ')
    //console.log(apiJson)
    fs.writeFileSync('api.json',apiJson)
  })
  
  
}

app.listen(8035, () => {
  console.log('http://localhost:8035')
})
