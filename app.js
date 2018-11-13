
const express = require('express');
//const expressSession = require("express-session")
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const index = require('./routes/index');
const app = express();
const responseTime = require('response-time')

// view engine setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseTime());
//app.use('/node', express.static(path.join(__dirname, 'public/bower_components/webcomponentsjs')));
app.use('/webcomponentsjs', express.static(path.join(__dirname, 'node_modules/@webcomponents/webcomponentsjs')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/data', express.static(path.join(__dirname, 'data')));

app.use('/', index);
app.use('/build', index);
app.use('/list', index);
app.use('/detail', index);
app.use('/view2', index);
app.use('/cart', index);
app.use('/checkout', index);
app.use('/view404', index);
module.exports = app;

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
