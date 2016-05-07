const router = require('express').Router()
, passport = require('passport')
, mongoose = require('mongoose')
, Poll = mongoose.model('Poll');


// AUTH/GITHUB
router
.get('/logout', function(req,res,next){
    req.logout();
    res.redirect('/');
})
.get('/auth/github', 
    passport.authenticate('github', { failureRedirect: '/auth/github/failed' })
).get('/auth/github/callback', passport.authenticate('github'),
  function(req, res) {
    res.redirect('/');
    // res.json({
    //   error: undefined, data: req.user
    // });
}).get('/auth/github/failed', function (req, res) { 
    res.status(402);
    res.json({ 
        error: 'Unauthenticated', data: undefined
    });
});







router.get('/polls', function (req, res, next) {
   Poll.find({})
    .then((poll)=> res.json(poll))
    .catch(e=> next(e));
});

router.all('/polls/insert', function (req, res, next) {
//   if (!req.user) {
//         return res.json({
//             'error': 'Unauthenticated'
//         });
//   } 
   
   var poll = new Poll({
       title: req.query.title || "Title"
   });
   poll.save((err)=> {
       if(err) return next(err);
       else {
           res.json({
               data: poll,
               error: undefined
           });
       }
   });
});


module.exports = function (app) {  
    app.use('/', router); 
};