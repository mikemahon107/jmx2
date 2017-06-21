var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var Account = require('../schema/account.js');

function comparePassword(candidatePassword, savedPassword, cb) {
  bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
    if (err) { return cb(err); }
    cb(null, isMatch);
  });
};

function findAll(cb) {
  Account.find({}, cb);
}

function findOne(username, cb) {
  Account.findOne({username: username}, cb);
}

function insertOne(user, cb) {
  bcrypt.hash(user.password, null, null, function(a,b,c) {
    console.log('a: ', a ,'b: ', b, 'c: ', c); // this just changes the password at insertion
    user.password = b;
    Account.create(user, cb);
  });
};

// takes a username and a movie, user: String, movie: Object
// puts the movie into user.watched
function insertMovie(user, movie) {

  findOne(user, function (err, account) {
    if (err) throw err;
    // console.log(account);
    account.save(function(err, doc) {
      // console.log('save: ', doc);
      Account.update({_id: account._id}, 
        { "$addToSet": { "watched": movie } 
      }, function (err, numAffected) {
          // numAffected should be 1
      });
    })
    // Account.save();
    // console.log(account, user, movie, 'trying');
    setTimeout(function() {console.log(account, user, movie, 'trying')}, 2000);
  });
};



exports.comparePassword = comparePassword;
exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.insertMovie = insertMovie;
