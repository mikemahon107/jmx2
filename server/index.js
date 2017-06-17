var express = require('express');
var app = express();
var imdb = require('imdb-api');
var config = require('../db/config');
var movies = require('../db/schema/movie');
var accounts = require('../db/schema/account');

// console.log('hello', users, movies);

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})