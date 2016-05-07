// Load env settings
require('dotenv').load(process.env.ENV_PATH ? {
    path: process.env.ENV_PATH
} : undefined);

const express = require('express')
, app = express()
, mongoose = require('mongoose')
, glob = require('glob')
, logger = require('morgan')
, bodyParser = require('body-parser')
, compress = require('compression')
, methodOverride = require('method-override')
, passport = require('passport')
, cookieParser = require('cookie-parser')
, session = require('express-session')
, MongoStore = require('connect-mongo')(session);
//, flash = require('connect-flash');

// Db Models
glob.sync(__dirname +  "/models/*.js").forEach( model => require(model) );

// Connect to database
mongoose.connect(process.env.DB);

mongoose.connection.on('error', function () {
    throw new Error('unable to connect to database');
});

// Static serve our assets folder
app.use(express.static('dist/'));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(compress());
app.use(methodOverride());

// Session settings
const sess = {
    key: process.env.SESSION_KEY || 'connect.sid',
    secret: process.env.SESSION_SECRET || 'keyboard cat',
    saveUninitialized: false, // don't create session until something is stored
    resave: false, //don't save session if unmodified
    cookie: {},
    store: new MongoStore({
    //  hash: { salt: process.env.SESSION_SALT || 'connect-mongo' } ,
     mongooseConnection : mongoose.connection,
    //   ttl: 14 * 24 * 60 * 60, // = 14 days. Default
    //   touchAfter: 24 * 3600 // time period in seconds (24h)
    })
};

// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1); // trust first proxy
//   sess.cookie.secure = true; // serve secure cookies
// }

app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
//app.use(flash());


// Strategies
glob.sync(__dirname + '/strategies/*.js').forEach(function (strategy) {
    require(strategy)(passport);
});



// Routes 
var controllers = glob.sync(__dirname + '/controllers/*.js');
controllers.forEach(function (controller) { 
  require(controller)(app); 
});

// Error handlers
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      res.json({
        message: err.message,
        error: err,
        title: 'error'
      });
    });
}

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {},
        title: 'error'
    });
});

// Start the server
app.listen(process.env.PORT, process.env.IP, function () {
   console.log('Express App listening on', process.env.IP); 
});
