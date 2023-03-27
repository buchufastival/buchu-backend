const express = require('express')
const app = express();
const request = require('request')
const mysql = require('mysql')
require('dotenv').config();

const options = {
  url : process.env.FASTIVAL_API_URL,
  qs : {
    serviceKey : process.env.URL_KEY_DECODING,
    //보낼 때 자체적으로 encoding 을 하기 때문에 디코딩 된 key로 전달을 해줘야 한다고 한다.
    numOfRows : 10,
    pageNo : 1,
    resultType : 'json',
    //resultType은 json으로 줘서 보기 편하게 해준다.
  }
}

request(options, (err, res, body) => {
  console.log(body)
})