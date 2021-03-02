
//third party packages
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

//authenication modules
let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');


//database setup
let mongoose = require('mongoose');
let DB = require('./db');

//point mongoose to the DB URI
mongoose.connect(DB.URI,{useNewUrlParser: true, useUnifiedTopology: true});

let mongoDB = mongoose.connection;

mongoDB.on('error', console.error.bind(console, 'error connecting to the database:'));
mongoDB.once('open', ()=>{
  console.log('connected to mongoDB.......');
});

let indexRouter = require('../routes/index');
let lognRouter = require('../routes/users');
let usersRouter = require('../routes/login');
let businessContactsRouter = require('../routes/businessContacts'); //added the line to create a router for businessContactsRouter
let  db = require('./db');
let { Strategy } = require('passport');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));

//setup the express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

//setup or initialise flash
app.use(flash());

//initialize passport 
app.use(passport.initialize()); //authenticator
app.use(passport.session());  // session for authentication

//passport user configuation

//setup the user model instance
let userModel = require('../models/user'); 
let User = userModel.User; //the reason we did this is because our user model has a user object inside of it

// using strategy(it was the error the instructor was facing wth the errormessage that strategy is not defined)

passport.use(User.createStrategy());
//serialize and deserialize the user info
/* this is basically to encrypt and decrypt the user information(passport is used for that)*/
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use('/', indexRouter);
app.use('/users', usersRouter);
//app.use('/login', lognRouter); //route for login page
app.use('/businessContactList', businessContactsRouter); //added so that we can use the businessContactsRouter

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
