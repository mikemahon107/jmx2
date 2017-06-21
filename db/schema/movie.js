var mongoose = require('mongoose');


var movieSchema = mongoose.Schema({
  title: { type: String, required: true, index: true },
  genre: { type: String },
  director: { type: String },
  year: { type: String },
  AFArating: { type: String },
  poster: { type: String }
});

module.exports = mongoose.model('Movie', movieSchema);

// function findAll(cb) {
//   Movie.find({}, cb);
// }

// function findOne(title, cb) {
//   Movie.find({title: title}, cb);
// }

// function insertOne(movie, cb) {
//   Movie.create(movie, cb);
// }


// exports.findOne = findOne;
// exports.findAll = findAll;
// exports.insertOne = insertOne;
