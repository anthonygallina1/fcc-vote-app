const router = require('express').Router()
, passport = require('passport')
, mongoose = require('mongoose')
, Poll = mongoose.model('Poll');


router.get('/', function (req, res, next) {
   res.render('index', {
      user: req.user 
   });
});

module.exports = function (app) {  
    app.use('/', router); 
};