var mongoose = require("mongoose");
var Review = require('../schema/review.js');

// add method for modifying score based on click
// possibly add delete and edit method for reviews

function findAll(req, res) {
  console.log('req.query', req.query)
  // reviews.findAll(req.query.imdb_id, (err, movie) => {
  //   console.log('MOVIE', movie);
  //   res.send(movie);
  // })
  Review.find({'imdb_id': req.query.imdb_id}, (err, movies) => {
    if (err) {
      console.log('err: ', err)
      res.sendStatus(400)
    } else {
      console.log('Movies: ', movies)
      res.send(movies)
    }
  });
};

function findOne(params, cb) {
  // params should be an object structured like this: {user: user, date: date}
  Review.findOne(params, cb);
};

function insertReview(review) {
  console.log('REVIEW', review)
  //review should be an object including the following keys: imdb_id, user, text, date, rating, score, upvotes, downvotes
  Review.create(review, (err, movie) => {
    if (err) {
      console.log('error!', err)
    } else {
      //saved!
      console.log('saved!');
    }
  })
};

function upVote(req, res) {
  // search findOne with {user: USER, date: DATE}
  // push user into upvote array
  var imdb_id = req.body.imdb_id;
  var user = req.body.user;
  var date = req.body.date;
  var clickUser = req.body.clickUser;
  console.log('in upVote!!!')

  Review.findOne({imdb_id: imdb_id, user: user, date: date}, function(err, review) {
    if (err) {
      console.log('error in upvote', err);
      res.sendStatus(400);
    } else {
      if (!review.upvotes.includes(clickUser)) {
        review.upvotes.push(clickUser)
        review.score += 1;
        if (review.downvotes.includes(clickUser)) {
          var i = review.downvotes.indexOf(clickUser)
          review.downvotes.splice(i, 1)
          review.score += 1
        }
      } else {
        var i = review.upvotes.indexOf(clickUser);
        review.upvotes.splice(i, 1);
        review.score -= 1;
      }
      review.save();
      console.log('upvote saved!')
      res.sendStatus(201);
    }
  })
}

function downVote(req, res) {
  // search findOne with {user: USER, date: DATE}
  // push user into upvote array
  var imdb_id = req.body.imdb_id;
  var user = req.body.user;
  var date = req.body.date;
  var clickUser = req.body.clickUser;

  Review.findOne({imdb_id: imdb_id, user: user, date: date}, function(err, review) {
    if (err) {
      console.log('error in upvote', err);
      res.sendStatus(400);
    } else {
      if (!review.downvotes.includes(clickUser)) {
        review.downvotes.push(clickUser)
        review.score -= 1;
        if (review.upvotes.includes(clickUser)) {
          var i = review.upvotes.indexOf(clickUser)
          review.upvotes.splice(i, 1)
          review.score -= 1
        }
      } else {
        var i = review.downvotes.indexOf(clickUser);
        review.downvotes.splice(i, 1);
        review.score += 1;
      }
      review.save();
      console.log('upvote saved!')
      res.sendStatus(201);
    }
  })
}



exports.findAll = findAll;
exports.findOne = findOne;
exports.insertReview = insertReview;
exports.upVote = upVote;
exports.downVote = downVote;
// exports.insertUserIntoUpvote = insertUserIntoUpvote;
// exports.removeUserFromUpvote = removeUserFromUpvote;
// exports.insertUserIntoDownvote = insertUserIntoDownvote;
// exports.removeUserFromDownvote = removeUserFromDownvote;
// exports.incrementScore = incrementScore;
// exports.decrementScore = decrementScore;
