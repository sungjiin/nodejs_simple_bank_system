const express = require('express')
const app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:false}));

app.use('/main', require('./api/router/main.js'))


app.listen(3000, ()=>{
  console.log('Connected');
})
