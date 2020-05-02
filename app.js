var createError = require('http-errors');
var express = require('express');
var path = require('path');
require('./utils/db');

var loginRouter = require('./routes/user');
var measurementRouter = require('./routes/measurement');

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', loginRouter);
app.use('/measurement', measurementRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    status: err.status || 500,
    name: err.name,
    message: err.message
  });
});

module.exports = app;
