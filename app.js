var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var load = require('express-load');
var session = require('express-session');

//var models = require ('./models');
//var controllers = require('./controllers');
//-------------------------------------------------------------------------------
//TINHA QUE TIRAR ISSO AQUI:
//var routes = require('./routes/');
//var users = require('./routes/users');
//------------------------------------------------------------------------------------

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(session({
  secret: 'leandro',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(express.session());



//-------------------------------------------------------------------------------
//TINHA QUE TIRAR ISSO AQUI:
//app.use('/', routes);
//app.use('/users', users);
//------------------------------------------------------------------------


/**
 *  Autoload Configuration.
 */

load('config').into(app);

for (var environment in app.config) {
  if (environment == app.get('env')) {
    for (var key in app.config[environment]) {
      app.set(key, app.config[environment][key]);
    }
  }
}

/**
 *  Autoload models, controllers and routes into application instance.
 */

load('models')
  .then('controllers')
  .then('routes')
  .into(app);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
