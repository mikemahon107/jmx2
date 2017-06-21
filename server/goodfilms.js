var express = require('express');
var app = express();
var config = require('../db/config');
var movies = require('../db/helpers/movie');
var accounts = require('../db/helpers/account');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var utility = require('./utility.js');
var cookieParser = require('cookie-parser');
// var helpers = require('../dbr/helpers/helpers.js');

// app.use(app.router);

app.use(express.static(__dirname.slice(0, __dirname.length - 6)));
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
  secret: 'kthxbai',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function (req, res) {
  res.sendFile(__dirname.slice(0, __dirname.length - 6) + 'index.html')
});

app.get('/signin', function (req, res) {
  res.render('/signin');
});

app.post('/signin', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  accounts.findOne(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.send('Incorrect password or username.');
      // res.redirect('/login');
    } else {
      accounts.comparePassword(password, user.password, function(match) {
        if (match) {
          //create session
          utility.createSession(req, res, user);
          res.redirect('/')
          console.log('Everything works');
        } else {
          res.send('Incorrect password or username.');
          // res.redirect('/login');
        }
      });
    }
  })
})

app.get('/signup', function (req, res) {
  res.render('/signup');
});

// accounts.insertMovie("Jordan", {title:'sailor moon', year:"1898", director: "Jeremy Odell"}); --for testing -JO

app.post('/signup', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;


  accounts.findOne(username, (err, user) => {
    if (err) throw err;
    if (user) {
      console.log(user)
      res.send('Username already exists!');
      // res.redirect('/signup');
    } else {
      accounts.insertOne({username: username, password: password}, (err, user) => {
        if (err) throw err;
        res.send('Account created.');
        // res.redirect('/');
      });
    }
  });
  
  accounts.findAll((err, user) => {
    console.log(user);
  
  });

});

app.use('/*', function(req, res){
  res.sendFile(__dirname.slice(0, __dirname.length - 6) + 'index.html');
});

module.exports = app;
