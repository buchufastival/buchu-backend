const express = require('express')
const fs = require('fs')
const app = express();
const request = require('request')
const mysql = require('mysql')
require('dotenv').config();

var pageno = 1;

const options = {
  url : process.env.FASTIVAL_API_URL,
  qs : {
    serviceKey : process.env.URL_KEY_DECODING,
    //보낼 때 자체적으로 encoding 을 하기 때문에 디코딩 된 key로 전달을 해줘야 한다고 한다.
    numOfRows : 10,
    pageNo : pageno,
    resultType : 'json',
    //resultType은 json으로 줘서 보기 편하게 해준다.
  }
}

app.get('/', (req,res) => {
  apiRequest();

})


function apiRequest() {
  request(options, (err, res, body) => {
    console.log(body)
    var apiJson = JSON.stringify(body)
    apiJson.toString();
    apiJson.replace('+', ' ')
    //console.log(apiJson)
    fs.writeFileSync('api.json',apiJson)
  })
  pageno += 1;
}
