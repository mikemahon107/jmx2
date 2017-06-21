var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var Account = require('../schema/account.js');

console.log(Account);

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

function insertMovie(user, movie) {

};

exports.comparePassword = comparePassword;
exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
