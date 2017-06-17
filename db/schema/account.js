var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var accountSchema = mongoose.Schema({
  username: { type: String, required: true, index: { unique: true } },
  password: { type: String, required: true },
  favorites: [Object],
  watched: [Object],
  toWatch: [Object]
});

var Account = mongoose.model('Account', accountSchema);

// Account.comparePassword = function(candidatePassword, savedPassword, cb) {
//   bcrypt.compare(candidatePassword, savedPassword, function(err, isMatch) {
//     if (err) { return cb(err); }
//     cb(null, isMatch);
//   });
// };

//TODO: hash pw before saving

module.exports = Account;
