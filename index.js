const express = require('express')
const fs = require('fs')
const app = express();
const request = require('request')
const path = require('path')
const mysql = require('mysql')
const apidata = require('./api.json')
require('dotenv').config();
var apiJson = "";

app.get('/', (req,res) => {
    res.send('/')
    console.log('/ page')
})

app.get('/getapi/:pageNo', (req,res) => {
  apiRequest(req.params.pageNo);
  console.log('testlog')
  res.send(apidata)
})

const apiRequest = (pageNo) => {
  console.log(pageNo)
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
    //console.log(body)
    apiJson = JSON.stringify(body)
    apiJson.replace('+', ' ')
    apiJson.replace('/\n/g', ' ')
    //console.log(apiJson)
    fs.writeFileSync('api.json',apiJson)
  })
}



app.listen(8008, () => {
  console.log('http://localhost:8008')
})
