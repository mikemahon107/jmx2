var mongoose = require('mongoose');


var movieSchema = mongoose.Schema({
  title: { type: String, required: true, index: true },
  genre: { type: String },
  director: { type: String },
  year: { type: String },
  AFArating: { type: String },
  poster: { type: String }
});

var Movie = mongoose.model('Movie', movieSchema);

Movie.hello = function() {
  console.log("hi");
};
// var movie = new Movie({title:'hello'}).save();

module.exports = Movie;