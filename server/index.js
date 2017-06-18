var express = require('express');
var app = express();
var imdb = require('imdb-api');
var config = require('../db/config');
var movies = require('../db/schema/movie');
var accounts = require('../db/schema/account');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// console.log('hello', users, movies);

app.get('/', function (req, res) {
  res.render('/signin');
});

app.get('/signin', function (req, res) {
  res.render('/signin');
});

app.get('/signup', function (req, res) {
  res.render('/signup');
});

app.get('/index', function (req, res) {
  res.render('/signup');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
