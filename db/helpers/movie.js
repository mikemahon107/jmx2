var mongoose = require("mongoose");
var Movie = require('../schema/movie');

function findAll(cb) {
  Movie.find({}, cb);
}

function findOne(title, cb) {
  Movie.find({title: title}, cb);
}

function insertOne(movie, cb) {
  Movie.create(movie, cb);
}


exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;

