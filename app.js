
const express = require('express');
const session = require('express-session')
const { ApolloServer, gql } = require('apollo-server-express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const responseTime = require('response-time')
const cors = require('cors');
const index = require('./routes/index');
const app = express();
const admin = require("firebase-admin");
const util = require('util');
const serviceAccount = require("./routes/tysix-75b86-firebase-adminsdk-8yguk-63709f70f1.js")
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://tysix-75b86.firebaseio.com"
});
//const settings = { timestampsInSnapshots: true };
const dB = admin.firestore()
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });
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
app.use('/cmshome', index);
app.use('/content', index);
app.use('/content/articles', index);
app.use('/content/pages', index);
app.use('/content/pages/edit-category-pages', index);
app.use('/content/search', index);
app.use('/users', index);
app.use('/galleries', index);
app.use('/view404', index);

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
