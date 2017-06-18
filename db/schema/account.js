var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');

var accountSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  favorites: [Object],
  watched: [Object],
  toWatch: [Object]
});

var Account = mongoose.model('Account', accountSchema);

accountSchema.pre('save', function(next) {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
      next();
    });
});

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
  Account.find({username: username}, cb);
}

function insertOne(user, cb) {
  Account.create(user, cb);
}

exports.comparePassword = comparePassword;
exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
