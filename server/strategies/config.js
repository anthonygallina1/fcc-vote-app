"use strict";
// Serialize | Deserialize user
var User = require('mongoose').model('User');
module.exports = function(passport) {
  passport.serializeUser(function(user, cb) { cb(null, user._id); });
  passport.deserializeUser(function(id, cb) {
    User.findById(id, function (err, user) { cb(err, user); });
  });
};
