const router = require('express').Router()
, passport = require('passport')
, mongoose = require('mongoose')
, Poll = mongoose.model('Poll');


// AUTH/GITHUB
router
.get('/logout', function(req,res,next){
    req.logout();
    res.json({});
})
.get('/auth/github', 
    passport.authenticate('github', { failureRedirect: '/auth/github/failed' })
).get('/auth/github/callback', passport.authenticate('github'),
  function(req, res) {
    res.json({
      error: undefined, data: req.user
    });
}).get('/auth/github/failed', function (req, res) { 
    res.status(402);
    res.json({ 
        error: 'Unauthenticated', data: undefined
    });
});







router.get('/polls', function (req, res, next) {
   Poll.findOne({})
    .then((poll)=> res.end())
    .catch(e=> next(e));
});



module.exports = function (app) {  
    app.use('/', router); 
};