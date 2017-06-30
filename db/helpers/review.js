var mongoose = require("mongoose");
var Review = require('../schema/review.js');

// add method for modifying score based on click
// possibly add delete and edit method for reviews

function findAll(imdb_id, cb) {
  Review.find({'imdb_id': imdb_id}, cb);
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

function insertUserIntoUpvote(imdb_id, user, date, clickUser) {
  // search findOne with {user: USER, date: DATE}
  // push user into upvote array
  Review.findOne({imdb_id: imdb_id, user: user, date: date}, function(err, review) {
    if (err) {
      console.log('error in upvote', err);
    } else {
      if (!review.upvotes.includes(clickUser)) {
        review.upvotes.push(clickUser)
        review.save();
        console.log('upvote saved!')
      }
    }
  })
}

function removeUserFromUpvote(imdb_id, user, date, clickUser) {
  // search findOne with {user: USER, date: DATE}
  //splice user out of upvote array
  Review.findOne({imdb_id: imdb_id, user: user, date: date}, function(err, review) {
    if (err) {
      console.log('error in upvote', err);
    } else {
      for (var i = 0; i < review.upvotes.length; i++) {
        if (review.upvotes[i] === clickUser) {
            review.upvotes.splice(i, 1);
            console.log('upvote removed')
            break;
        }
      }
      review.save();
    }
  })
}

function insertUserIntoDownvote(imdb_id, user, date, clickUser) {
  // search findOne with {user: USER, date: DATE}
  //push user into downvote array
  console.log('CLICKUSER', clickUser);
  Review.findOne({imdb_id: imdb_id, user: user, date: date}, function(err, review) {
    if (err) {
      console.log('error in upvote', err);
    } else {
      if (!review.downvotes.includes(clickUser)) {
        review.downvotes.push(clickUser)
        review.save();
        console.log('downvotes saved!')
      }
    }
  })
}

function removeUserFromDownvote(imdb_id, user, date, clickUser){
  // search findOne with {user: USER, date: DATE}
  //splice user out of upvote array
  console.log('in REMOVE USER FROM DOWNVOTE')
  Review.findOne({imdb_id: imdb_id, user: user, date: date}, function(err, review) {
    if (err) {
      console.log('error in upvote', err);
    } else {
      for (var i = 0; i < review.downvotes.length; i++) {
        if (review.downvotes[i] === clickUser) {
            review.downvotes.splice(i, 1);
            console.log('downvote removed')
          break;
        }
      }
      review.save();
    }
  })
}

function incrementScore(imdb_id, user, date) {
  // add one to score
  Review.findOne({imdb_id: imdb_id, user: user, date: date}, function(err, review) {
    if (err) {
      console.log('error in incrementScore', err);
    } else {
      review.score += 1;
      review.save();
      console.log('score incremented!');
    }
  })
}

function decrementScore(imdb_id, user, date) {
  // subtract one from score
  Review.findOne({imdb_id: imdb_id, user: user, date: date}, function(err, review) {
    if (err) {
      console.log('error in decrementScore', err);
    } else {
      review.score -= 1;
      review.save();
      console.log('score decremented!');
    }
  })
}


exports.findAll = findAll;
exports.findOne = findOne;
exports.insertReview = insertReview;
exports.insertUserIntoUpvote = insertUserIntoUpvote;
exports.removeUserFromUpvote = removeUserFromUpvote;
exports.insertUserIntoDownvote = insertUserIntoDownvote;
exports.removeUserFromDownvote = removeUserFromDownvote;
exports.incrementScore = incrementScore;
exports.decrementScore = decrementScore;
