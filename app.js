//express\\
const express = require('express');
//const expressSession = require("express-session")
const serveIndex = require('serve-index');
const finalhandler = require('finalhandler')
const serveStatic = require('serve-static')
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
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseTime());
app.use('/webcomponentsjs', express.static(path.join(__dirname, 'node_modules/@webcomponents/webcomponentsjs')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/data', express.static(path.join(__dirname, 'data')));
app.use('/articleimagedir', express.static('/data/images'), serveIndex(__dirname + '/data/images'))
app.use('/pageimagedir', express.static('/images'), serveIndex(__dirname + '/images'))
app.use('/', index);

//firebase admin
app.post('/admin', (req, res) => {
  checkAdmin(req.query).then((items) => {
    items.forEach(user => {
      let admin = user.data().role
      if (admin === 'admin') {
        resolveUsers(res, admin)
      } else {
        res.send({ error: 'not Admin', admin })
        console.log(data)
      }
    });
  }).catch((error) => {
    console.log(error);
  })
})

app.post('/update', (req, res) => {
  checkAdmin(req.query).then((items) => {
    items.forEach(user => {
      let admin = user.data().role
      if (admin === 'admin') {
        updateUsers(res, req.query, admin)
      } else {
        res.send({ error: 'not Admin', admin })
        console.log(data)
      }
    });
  }).catch((error) => {
    console.log(error);
  })
})

app.post('/create', (req, res) => {
  checkAdmin(req.query).then((items) => {
    items.forEach(user => {
      let admin = user.data().role
      if (admin === 'admin') {
        createUsers(res, req.query.obj, admin)
      } else {
        res.send({ error: 'not Admin', admin })
        console.log(data)
      }
    });
  }).catch((error) => {
    console.log(error);
  })
})

function checkAdmin(query) {
  let userRef = dB.collection('users')
  var queryRef = userRef.where('uid', '==', query.uid);
  return queryRef.get()
}

function resolveUsers(res, accepted, nextPageToken) {
  admin.auth().listUsers(1, nextPageToken)
    .then(function (listUsersResult) {
      listUsersResult.users.forEach(function (userRecord) {
        let obj = { accepted: accepted, data: userRecord }
        res.status(200).send(obj)
      });
      if (listUsersResult.pageToken) {
        // List next batch of users.
      }
    })
    .catch(function (error) {
      console.log("Error listing users:", error);
    });
}

function createUsers(res, obj, accepted) {
  let parse = JSON.parse(obj)
  let uid = parse.uid
  admin.auth().createUser(uid, parse)
    .then(function (userRecord) {
      let obj2 = { accepted: accepted, data: userRecord }
      res.status(200).send(obj2)
      console.info("Successfully updated user");
    })
    .catch(function (error) {
      res.send({ "error": error })
      console.error("Error updating user:", error);
    });
}

function updateUsers(res, query, accepted) {
  let parse = JSON.parse(query.obj)
  let uid = query.uid
  // var docRef = db.collection('users').doc(uid).set(obj);
  console.info("Successfull update request");
  admin.auth().updateUser(uid, parse)
    .then(function (userRecord) {
      let obj2 = { accepted: accepted, data: userRecord }
      res.status(200).send(obj2)
      console.info("Successfully updated user");
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


