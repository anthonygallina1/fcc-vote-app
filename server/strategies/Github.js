
var User = require('mongoose').model('User');
var GitHubStrategy = require('passport-github').Strategy;

module.exports = function(passport) {

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, cb) {
    User.findOne({ githubId: profile.id }, function (err, user) {
        var u;
        if (err) return cb(err);
        if (!user) {
          u = new User({ 
                githubId: profile.id,
                avatar: profile.photos[0].value,
                profileUrl: profile.profileUrl
          });
          u.save((e)=> cb(e, u));
          return;
        }
        return cb(err, user);
    });
  }
));
};