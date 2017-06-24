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
// var cookieParser = require('cookie-parser');
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

app.get('/userCheck', function(req, res) {
  res.send(req.session);
});

app.get('/sess', function(req, res) {
  accounts.findOne(req.session.user.username, (err, user) => {
    res.send(user);
  });
});

app.get('/signin', function (req, res) {
  console.log('test /signin get');
  res.redirect('/login');
});

app.post('/signin', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  //res.redirect('/')
  accounts.findOne(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      console.log(user, 'null means no matching user was found');
      // res.redirect('/login');
    } else {
      accounts.comparePassword(password, user.password, function(err, match) {
        if (match) {
          //create session
          utility.createSession(req, res, user);
          console.log('Everything works /signin');
        } else {
          console.log('A user was found, but the password did not match. /signin');
          // res.redirect('/login');
        }
      });
    }
  })
})

app.get('/signup', function (req, res) {
  console.log('test /signup get');
  res.redirect('/login');
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  console.log('session: ', req.session);
  res.redirect('/login');
});

//DATABASE TESTING THINGS-- comment out if necessary

accounts.insertMovieIntoFaves("Minh2", {details: {title: "Beauty and The Beast", year: 2017}, rating: '5',comment: 'This movie rules!'});
accounts.insertMovieIntoFaves("Minh2", {details: {title: "Beauty and The Beast", year: 1991}, rating: '5',comment: 'This movie rules!'});
// accounts.insertMovieIntoWatched("Minh2", {details: {title: "Superman"},rating: '5',comment: 'This movie rules!'});

// accounts.insertMovie("Jordan", {title: "Sailor Moon", year:"1994", director: "Usagi Tsukino"}); /* --for testing -JO */
// accounts.insertMovie("Jordan", {title: "Inception", year:"2010", director: "Christopher Nolan"}); /* --for testing -JB */
// setTimeout(function() {accounts.removeMovie("Jordan", {title:'inception', year:"2010", director: "Christopher Nolan"})}, 3000);/* --for testing -JB */

app.post('/signup', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;


  accounts.findOne(username, (err, user) => {
    if (err) throw err;
    if (user) {
      console.log('Username already exists!');
      // res.redirect('/signup');
    } else {
      accounts.insertOne({username: username, password: password}, (err, user) => {
        if (err) throw err;
        console.log('Account created.');
        // res.redirect('/');
      });
    }
  });

});

app.post('/addMovie', function (req, res) {
  // console.log(req.body);
  var user = req.body.user;
  var movieTitle = req.body.movieTitle;
  var year = req.body.year

  accounts.insertMovieIntoWatched(user, {details: {title: movieTitle, year: year}, rating:'?', comment: 'N/A'});
  //req.session.user.watched.unshift({details: {title: movieTitle}, rating: '10',comment: 'WE ADDED THIS!'});
  //console.log(req.session.user, 'hello');
  res.sendStatus(200);

});

app.post('/addComment', function (req, res) {
  // console.log(req.body);
  console.log('about to add comment goodfilms')
  console.log('req.body', req.body);
  var user = req.body.user;
  var movieTitle = req.body.movieTitle;
  var year = req.body.year;
  var comment = req.body.comment;


  accounts.addCommentToWatchedMovie(user, movieTitle, year, comment);
  //req.session.user.watched.unshift({details: {title: movieTitle}, rating: '10',comment: 'WE ADDED THIS!'});
  //console.log(req.session.user, 'hello');
  res.sendStatus(200);

})

app.post('/removeFromWatched', function (req, res) {
  // console.log(req.body);
  var user = req.body.user;
  var movieTitle = req.body.movieTitle;
  var year = req.body.year

  accounts.removeMovieFromWatched(user, {title: movieTitle, year: year})
  res.sendStatus(200);

})

app.use('/*', function(req, res){
  res.sendFile(__dirname.slice(0, __dirname.length - 6) + 'index.html');
});

module.exports = app;
