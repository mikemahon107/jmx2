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

app.post('/signin', function (req, res) {



});

app.get('/signup', function (req, res) {
  res.render('/signup');
});

app.post('/signup', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  accounts.findOne({username: username}, (err, user) => {
    if (!user) {
      res.send('Username already exists');
      res.redirect('/signup');
    } else {
      accounts.insertOne({username: username, password: password}, () => {
        res.send('Account created.');
        res.redirect('/index');
      });
    }
  });
  //find the username
  //if result exists, redirect to signup w/ note that their username is taken
  // else call accounts.insertOne w/ object of the username and pw


})

app.get('/index', function (req, res) {
  res.render('/signup');
});

app.get('/movie', function (req, res) {
  res.render('/movie');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
