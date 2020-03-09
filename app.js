
const express = require('express');
const session = require('express-session')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');
const responseTime = require('response-time')
const index = require('./routes/index');
const appRoute = require('./routes/app');
const projects = require('./routes/projects')
const app = express();
app.use(session({
  name: 'tySixCMS',
  resave: true,
  saveUninitialized: true,
  secret: "mkljmdsaldsdad!jm7sa7k341234$#",
  cookie: {
    secure: false,
    httpOnly: true,
    domain: 'localhost',
    // path: 'api/projects',
    expires: new Date(Date.now() + 60 * 60 * 1000)//1 hour
  }
})); 

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseTime());
// Static routes
app.use('/webcomponentsjs', express.static(path.join(__dirname, 'node_modules/@webcomponents/webcomponentsjs')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/cms', express.static(path.join(__dirname, 'cms')));
// View routes
app.get('/', index);
app.use('/home', index);
app.use('/content', index);
app.use('/content/articles', index);
app.use('/content/pages', index);
app.use('/content/pages/edit-category-pages', index);
app.use('/settings', index);
app.use('/settings/projects/', index);
app.use('/settings/templates', index);
app.use('/settings/tools', index);
app.use('/users', index);
app.use('/galleries', index);
app.use('/view404', index);
// grapkql routes 
app.use('/api/app', appRoute);
app.use('/api/projects', projects);
/*
app.use('/api/galleries', galleries);
app.use('/api/pages', pages);*/
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  //res.render('error');
});
module.exports = app;
