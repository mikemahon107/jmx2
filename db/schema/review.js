var mongoose = require("mongoose");
var Promise = require('bluebird');


var reviewSchema = mongoose.Schema({
  imdb_id: { type: String, required: true, index: { unique: true } },
  // reviews: [] // this will be an array of objects {id: 'UNIQUE ID', user: 'USERNAME', text: 'TEXT OF REVIEW', score: 'SCORE', date: 'POSTED', rating: 'RATING'} -- see watched under account schema for example
  user: { type: String, required: true },
  text: { type: String, required: true },
  date: { type: String, required: true },
  rating: { type: String },
  score: { type: Number},
  upvotes: [],
  downvotes: []

});

module.exports = mongoose.model('Review', reviewSchema);
