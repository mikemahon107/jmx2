var mongoose = require("mongoose");
var Review = require('../schema/review.js');

// add method for modifying score based on click
// possibly add delete and edit method for reviews

function findAll(cb) {
  Review.find({}, cb);
}

function findOne(imdb_id, cb) {
  console.log('imdb_id', imdb_id)
  Review.findOne({imdb_id: imdb_id}, cb);
}

function insertReview(imdb_id, review) {
  //reviewObj should be structured like this: {id: 'UNIQUE ID', user: 'USERNAME', text: 'TEXT OF REVIEW', score: 'SCORE', date: 'POSTED', rating: 'RATING'}
  findOne(imdb_id, function (err, movie) {
    if (err) {
      console.log('ERROR', err)
      throw err;
    };
    if (movie) {
      console.log('FOUND MOVIE')
      movie.reviews.unshift(review);
      movie.save();
    } else {
      //create entry with review
      Review.create({'imdb_id':imdb_id, 'reviews': review}, (err, movie) => {
        if (err) {
          console.log('error!!', err)
        } else {
          // saved!
          console.log("saved!")
        }
      });
    }
  });
};


exports.findAll = findAll;
exports.findOne = findOne;
exports.insertReview = insertReview;
