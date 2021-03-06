var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//TODO: add all routes
app.use('/', require('./routes/index'));
app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/leaderboard', require('./routes/leaderboard'));
app.use('/game/groupjoin', require('./routes/game/group_join'));
app.use('/game/groupinfo', require('./routes/game/group_info'));
app.use('/game/groupcrime', require('./routes/game/group_crime'));
app.use('/logout', require('./routes/logout'));
app.use('/game/crime', require('./routes/game/crimes'));
app.use('/game/car', require('./routes/game/cars'));
app.use('/game/roulette', require('./routes/game/roulette'));
app.use('/game/roulette/singlebet', require('./routes/game/singlebet'));
app.use('/game/shop', require('./routes/game/shop'));
app.use('/game/inventory', require('./routes/game/inventory'));
app.use('/games', require('./routes/games'));
app.use('/garage', require('./routes/garage'));
//TODO: add all routes


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
