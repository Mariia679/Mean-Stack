var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');

var comment = require('./routes/news');
var app = express();
var mongoose = require('mongoose');

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost/news', { promiseLibrary: require('bluebird')})
  .then((res) => console.log('connection succesful')).catch((err) => console.error(err));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'false'}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use('/news', express.static(path.join(__dirname, 'dist')));
app.use('/comment', comment);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('index');
});

// view engine setup
app.set('views', path.join(__dirname, 'dist'));
app.set('view engine', 'html');
app.engine('html', require('ejs').renderFile);

module.exports = app;
