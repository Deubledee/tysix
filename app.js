
const express = require('express');
const session = require('express-session')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const responseTime = require('response-time')
const cors = require('cors');
const index = require('./routes/index');
const formidable = require('formidable');
const app = express();
let fs = require('fs');
//const index2 = require('./routes/index2');
const admin = require("firebase-admin");
const util = require('util');
const serviceAccount = require("./routes/tysix-75b86-firebase-adminsdk-8yguk-63709f70f1.js")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tysix-75b86.firebaseio.com"
});
//const settings = { timestampsInSnapshots: true };
const dB = admin.firestore()
// view engine setup
//dB.settings(settings);
app.use(session({
  secret: "mkljmdsaldsdad!jm7sa7k341234$#",
  resave: true,
  saveUninitialized: true,
  clientInfo: {
    uid: '',
    role: '',
    name: '',
    loginDateTime: ''
  }
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseTime());
//app.use('/node', express.static(path.join(__dirname, 'public/bower_components/webcomponentsjs')));
app.use('/webcomponentsjs', express.static(path.join(__dirname, 'node_modules/@webcomponents/webcomponentsjs')));
app.use('/cms', express.static(path.join(__dirname, 'cms')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/data', express.static(path.join(__dirname, 'data')));

app.use('/', index);
app.use('/home', index);
app.use('/content', index);
app.use('/content/articles', index);
app.use('/content/pages', index);
app.use('/content/pages/edit-category-pages', index);
app.use('/content/search', index);
app.use('/users', index);
app.use('/galleries', index);
app.use('/view404', index);

app.post('/admin', (req, res) => {
  console.log(req.session)
  resolveUsers(res, admin)
})

let workingDirectory = process.cwd();

app.post('/images', (req, res, next) => {
  res.writeHead(200, { 'content-type': 'text/plain' });
  uploadHandler(req, res, next)
})

function checkAdmin(query) {
  let userRef = dB.collection('users')
  let queryRef = userRef.where('uid', '==', query.uid);
  return queryRef.get()
}

function checkDirectory(directory, callback) {
  fs.stat(directory, function (err, stats) {
    if (stats === undefined) {
      fs.mkdir(directory, callback);
    } else {
      callback('exists')
    }
  });
}

function writeData(req, res, fields, files, next) {
  next()
  let directory = path.join(workingDirectory, 'data', fields.gallerie)
  checkDirectory(directory, item => {
    let inStream = fs.createReadStream(files.filepond.path);
    let outStream = fs.createWriteStream(path.join(workingDirectory, 'data', fields.gallerie, files.filepond.name));
    inStream.pipe(outStream);
    inStream.on('end', function () {
      fs.unlinkSync(files.filepond.path);
    });
    inStream.on('error', function (err) {
      if (err) {
        util.log("move file error: " + err.toString());
        res.statusCode = 400;
        return;
      }
    });
    res.write('Received Upload')
    res.end();
    next()
  })
}

let uploadHandler = function (req, res, next) {
  let form = new formidable.IncomingForm();
  form.multiples = true
  form.parse(req, function (err, fields, files) {
    if (err) {
      util.log("upload error: " + err.toString());
      res.statusCode = 400;
      return;
    }
    writeData(req, res, fields, files, next)
  });
  form.on('progress', function (bytesReceived, bytesExpected) {
    util.log(bytesReceived, bytesExpected);
  });
  return;
}

function resolveUsers(res, accepted, nextPageToken) {
  admin.auth().listUsers(1, nextPageToken)
    .then(function (listUsersResult) {
      let obj
      listUsersResult.users.forEach(function (userRecord) {
        obj = { accepted: accepted, data: userRecord }
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
      }
      //  console.log(obj.data)
      res.status(200).send(obj.data)
    })
    .catch(function (error) {
      console.log("Error listing users:", error);
    });
}

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