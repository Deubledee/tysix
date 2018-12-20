//express\\
const express = require('express');
//const expressSession = require("express-session")
const serveIndex = require('serve-index');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const responseTime = require('response-time')
const cors = require('cors');
const index = require('./routes/index');

//firebase\\;
const admin = require("firebase-admin");
const serviceAccount = require("./routes/tysix-75b86-firebase-adminsdk-8yguk-63709f70f1.js");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tysix-75b86.firebaseio.com"
});
const settings = { timestampsInSnapshots: true };

const dB = admin.firestore()
dB.settings(settings);
// view engine setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseTime());
//app.use('/node', express.static(path.join(__dirname, 'public/bower_components/webcomponentsjs')));
app.use('/webcomponentsjs', express.static(path.join(__dirname, 'node_modules/@webcomponents/webcomponentsjs')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/data', express.static(path.join(__dirname, 'data')));

/**
 * Apply this filter function to files. Defaults to `false`. The `filter` function
is called for each file, with the signature `filter(filename, index, files, dir)`
where `filename` is the name of the file, `index` is the array index, `files` is
the array of files and `dir` is the absolute path the file is located (and thus,
the directory the listing is for).
 */

app.use('/artcleimagedir', express.static('/data/images'), serveIndex(__dirname + '/data/images'))
app.use('/pageimagedir', express.static('/data/images'), serveIndex(__dirname + '/data/images'))
//firebase admin
app.use('/', index);

app.post('/admin', (req, res) => {
  resolveUsersdb(req.query, data => {
    let admin = data.admin.booleanValue
    if (admin === true) {
      resolveUsers(res, req.query, admin)
    } else {
      res.send({ error: 'not Admin' })
    }
  })
})

app.post('/update', (req, res) => {
  // getUserDoc(query)
  updateUsers(res, req.query.obj)
})

app.post('/create', (req, res) => {
  //getUserDoc(query)
  createUsers(res, req.query.obj)
})

function resolveUsersdb(query, call) {
  let userRef = dB.collection('users')
  var queryRef = userRef.where('uid', '==', query.uid);
  queryRef.get().then((items) => {
    items.forEach(r => {
      call(r._fieldsProto)
    });
  }).catch((error) => {
    console.log(error);
  })
  res.send('parsed')

}

function resolveUsers(res, query, accepted, nextPageToken) {
  admin.auth().listUsers(1, nextPageToken)
    .then(function (listUsersResult) {
      listUsersResult.users.forEach(function (userRecord) {
        let obj = { accepted: accepted, data: userRecord }
        res.send(obj)
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
      }
    })
    .catch(function (error) {
      console.log("Error listing users:", error);
    });
}
function createUsers(res, obj) {
  let parse = JSON.parse(obj)
  let uid = parse.uid
  admin.auth().createUser(uid, parse)
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      res.send(userRecord.toJSON())
      console.info("Successfully updated user");
    })
    .catch(function (error) {
      res.send({ "error": error })
      console.error("Error updating user:", error);
    });
}

function updateUsers(res, obj) {
  let parse = JSON.parse(obj)
  let uid = parse.uid
  // var docRef = db.collection('users').doc(uid).set(obj);
  console.info("Successfull updated request");
  admin.auth().updateUser(uid, parse)
    .then(function (userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      res.send(userRecord.toJSON())
      console.info("Successfully updated user", userRecord.toJSON());
    })
    .catch(function (error) {
      res.send({ "error": error })
      console.error("Error updating user:", error);
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


