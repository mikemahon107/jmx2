var mongoose = require("mongoose");
var Review = require('../schema/review.js');

function findAll(cb) {
  Review.find({}, cb);
}

function findOne(imdb_id, cb) {
  Review.findOne({imdb_id: imdb_id}, cb);
}

function insertReview(imdb_id, reviewObj) {
  //reviewObj should be structured like this: {user: 'USERNAME', text: 'TEXT OF REVIEW', score: 'SCORE', date: 'POSTED'}
  findOne(imdb_id, function (err, movie) {
    if (err) throw err;
    movie.reviews.unshift(reviewObj);
    movie.save();
  });
};


exports.findAll = findAll;
exports.findOne = findOne;
exports.insertReview = insertReview;
