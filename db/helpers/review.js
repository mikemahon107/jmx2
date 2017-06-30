var mongoose = require("mongoose");
var Review = require('../schema/review.js');

// add method for modifying score based on click
// possibly add delete and edit method for reviews

function findAll(imdb_id, cb) {
  Review.find({'imdb_id': imdb_id}, cb);
};

function findOne(imdb_id, cb) {
  console.log('imdb_id', imdb_id)
  Review.findOne({imdb_id: imdb_id}, cb);
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

function insertUserIntoUpvote(user, date) {
  // search findOne with {user: USER, date: DATE}
  // push user into upvote array
}

function removeUserFromUpvote(user, date) {
  // search findOne with {user: USER, date: DATE}
  //splice user out of upvote array
}

function insertUserIntoDownvote(user, date) {
  // search findOne with {user: USER, date: DATE}
  //push user into downvote array
}

function removeUserFromDownvote(user, date){
  // search findOne with {user: USER, date: DATE}
  //splice user out of upvote array
}

function incrementScore() {
  // add one to score
}

function decrementScore() {
  // subtract one from score
}


exports.findAll = findAll;
exports.findOne = findOne;
exports.insertReview = insertReview;
