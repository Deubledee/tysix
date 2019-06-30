
const express = require('express');
const session = require('express-session')
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const responseTime = require('response-time')
const cors = require('cors');
const index = require('./routes/index');
const formidable = require('formidable');
const IPFS = require('ipfs')
const app = express();
let fs = require('fs');
//const index2 = require('./routes/index2');
const node = new IPFS()
node.on('ready', async () => {
  const version = await node.version()

  console.log('Version:', version.version)

  const filesAdded = await node.add({
    path: 'hello.txt',
    content: Buffer.from('Hello World 101')
  })

  console.log('Added file:', filesAdded[0].path, filesAdded[0].hash)
})


const admin = require("firebase-admin");
const util = require('util');
const serviceAccount = require("./routes/tysix-75b86-firebase-adminsdk-8yguk-63709f70f1.js")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tysix-75b86.firebaseio.com"
});
const settings = {};
const dB = admin.firestore()
// view engine setup
//dB.settings(settings); 
app.use(session({
  resave: true, saveUninitialized: true,
  secret: "mkljmdsaldsdad!jm7sa7k341234$#"
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseTime());
//app.use('/node', express.static(path.join(__dirname, 'public/bower_components/webcomponentsjs')));
app.use('/webcomponentsjs', express.static(path.join(__dirname, 'node_modules/@webcomponents/webcomponentsjs')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/cms', express.static(path.join(__dirname, 'cms')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/data', express.static(path.join(__dirname, 'data')));

app.use('/', index);
//app.use('/cms', index);
app.use('/home', index);
app.use('/content', index);
app.use('/content/articles', index);
app.use('/content/pages', index);
app.use('/content/pages/edit-category-pages', index);
app.use('/content/search', index);
app.use('/users', index);
app.use('/galleries', index);
app.use('/view404', index);
module.exports = app;

app.post('/admin', (req, res) => {
  console.log(req.session)
  /* checkAdmin(req.query).then((items) => {
     items.forEach(user => {
       let admin = user.data().role
       if (admin === 'admin') {*/
  resolveUsers(res, admin)
  /*  } else {
    res.send({ error: 'not Admin', admin })
    util.log(data)
  }
});
}).catch((error) => {
util.log(error);
})*/
})
let workingDirectory = process.cwd();

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

app.post('/images', (req, res, next) => {
  res.writeHead(200, { 'content-type': 'text/plain' });
  uploadHandler(req, res, next)
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
  let queryRef = userRef.where('uid', '==', query.uid);
  return queryRef.get()
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
  // let docRef = db.collection('users').doc(uid).set(obj);
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
