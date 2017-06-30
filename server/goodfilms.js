var express = require('express');
var app = express();
var config = require('../db/config');
var accounts = require('../db/helpers/account');
var reviews = require('../db/helpers/review.js');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var bodyParser = require('body-parser');
var session = require('express-session');
var utility = require('./utility.js');

app.use(express.static(__dirname.slice(0, __dirname.length - 6)));
app.use(bodyParser.json());
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
  res.redirect('/login');
});

app.post('/signin', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  accounts.findOne(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      console.log('username does not exist');
      res.sendStatus(400);
    } else {
      accounts.comparePassword(password, user.password, function(err, match) {
        if (match) {
          //create session
          utility.createSession(req, res, user);
          console.log('Everything works /signin');
        } else {
          console.log('A user was found, but the password did not match. /signin');
          res.sendStatus(400);
          // res.redirect('/login');
        }
      });
    }
  })
});

app.get('/signup', function (req, res) {
  res.redirect('/user');
});

app.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/login');
});

app.post('/signup', function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  accounts.findOne(username, (err, user) => {
    if (err) throw err;
    if (user) {
      console.log('Username already exists!');
      res.sendStatus(400);
    } else {
      accounts.insertOne({username: username, password: password}, (err, user) => {
        if (err) throw err;
        console.log('Account created.');
        res.redirect('/user');
      });
    }
  });
});

app.post('/addMovie', function (req, res) {
  var user = req.body.user;
  var imdb_id = req.body.imdb_id;

  accounts.insertMovieIntoWatched(user, {imdb_id: imdb_id, rating:'?', comment: 'N/A'});
  res.sendStatus(201);

});

app.post('/addFavorite', function(req, res) {
  var user = req.body.user;
  var movie = req.body.movie;

  accounts.toggleMovieFavorite(user, movie);
  res.sendStatus(201);
});

app.post('/addComment', function (req, res) {
  var user = req.body.user;
  var imdb_id = req.body.imdb_id
  var comment = req.body.comment;

  accounts.addCommentToWatchedMovie(user, imdb_id, comment);
  res.sendStatus(201);
});

app.post('/addReview', function (req, res) {
  console.log('REQ.BODY', req.body)
  reviews.insertReview(req.body);
  res.sendStatus(201);
});

app.get('/reviews', function(req, res) {
  console.log('req.query', req.query)
  reviews.findAll(req.query.imdb_id, (err, movie) => {
    console.log('MOVIE', movie);
    res.send(movie);
  })
});

app.post('/upvote', function(req, res) {
  // req.body should be {imdb_id: imdb_id, user: USER, date: DATE, clickUser: CLICKUSER}
  // user req.session.user.username for clickUser
  var imdb_id = req.body[0].imdb_id;
  var user = req.body[0].user;
  var date = req.body[0].date;

  console.log('REQ.BODY - upvote', req.body[0]);

  reviews.findOne({imdb_id: imdb_id, user: user, date: date}, (err, review) => {
    if (err) {
      console.log('error in upvote', err);
    } else {
      if (!review.upvotes.includes(req.body[0].clickUser)) {
        reviews.insertUserIntoUpvote(imdb_id, user, date, req.body[0].clickUser);
        reviews.removeUserFromDownvote(imdb_id, user, date, req.body[0].clickUser);
        reviews.incrementScore(imdb_id, user, date);
      } else {
        reviews.removeUserFromUpvote(imdb_id, user, date, req.body[0].clickUser);
        reviews.decrementScore(imdb_id, user, date);
      }
    }
  })
  res.sendStatus(201);
});

app.post('/downvote', function(req, res) {
  // user req.session.user.username for clickUser
  var imdb_id = req.body[0].imdb_id;
  var user = req.body[0].user;
  var date = req.body[0].date;

  reviews.findOne({imdb_id: imdb_id, user: user, date: date}, (err, review) => {
    if (err) {
      console.log('error in downvote', err);
    } else {
      if (!review.downvotes.includes(req.body[0].clickUser)) {
        reviews.insertUserIntoDownvote(imdb_id, user, date, req.body[0].clickUser);
        reviews.removeUserFromUpvote(imdb_id, user, date, req.body[0].clickUser);
        reviews.decrementScore(imdb_id, user, date);
      } else {
        reviews.removeUserFromDownvote(imdb_id, user, date, req.body[0].clickUser);
        reviews.incrementScore(imdb_id, user, date);
      }
    }
  })
  res.sendStatus(201);
})

app.post('/removeFromWatched', function (req, res) {
  var user = req.body.user;
  var imdb_id = req.body.imdb_id;

  accounts.removeMovieFromWatched(user, imdb_id);
  res.sendStatus(200);
});

app.post('/editRating', function (req, res) {
  var user = req.body.user;
  var imdb_id = req.body.imdb_id;
  var rating = req.body.rating;

  accounts.addRatingToWatchedMovie(user, imdb_id, rating);
  res.sendStatus(200);
});

app.use('/*', function(req, res) {
  res.sendFile(__dirname.slice(0, __dirname.length - 6) + 'index.html');
});

module.exports = app;
