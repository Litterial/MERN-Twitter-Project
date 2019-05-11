var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressSession = require('express-session');
var bodyparser=require('body-parser');

//requires my route directories
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//database
var zangoose = require('mongoose');
var zangooseDB = 'mongodb+srv://Admin:test4321@cluster0-3fq3b.mongodb.net/test?retryWrites=true';
zangoose.connect(zangooseDB, { useNewUrlParser: true });
var db = zangoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var app = express();
app.use(cookieParser());
app.use(expressSession({
  secret: "codecrew",
  name: "cookie_name",
  // store: "sessionStore", // connect-mongo session store
  proxy: true,
  resave: false,
  saveUninitialized: false,
  expires: new Date(Date.now() + (60 * 60* 24 * 7 * 1000)),
  cookie: { }
}));





// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
