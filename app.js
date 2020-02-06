
const express = require('express');
const session = require('express-session')
const graphqlHTTP = require('express-graphql');
const { buildSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const responseTime = require('response-time')
const index = require('./routes/index');
const app = express();
//const cors = require('cors');
const { MediaDB } = require('./cms/tools/dataBaseWorker')
var media = new MediaDB()
//graphQl
var schema = buildSchema(`
  type Query {
    title: String,
    pages: String,
    galleries: String,
    articles: String
  }
`);

var hello = {
  title: () => {
    return 'TySix';
  },

  pages: async () => {
    var result = []
    /*  await getCollection('pages').then(data => {
        result = data
      })*/
    return JSON.stringify(result) || 'Dam!!';
  },

  galleries: async () => {
    var result = []
    await media.getGalleries().then((QuerySnapshot) => {
      QuerySnapshot.forEach(item => {
        result.push(item.data())
      })
    }, process.env.develolpment === "true")
    return JSON.stringify(result) || 'Dam!!';
  },

  articles: async () => {
    var result = []
    /* await getCollection('articles').then(data => {
       result = data
     })*/
    return JSON.stringify(result) || 'Dam!!';
  },
};

// Midleware
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: "mkljmdsaldsdad!jm7sa7k341234$#"
}));
//app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(responseTime());
// Static routes
app.use('/webcomponentsjs', express.static(path.join(__dirname, 'node_modules/@webcomponents/webcomponentsjs')));
app.use('/src', express.static(path.join(__dirname, 'src')));
app.use('/cms', express.static(path.join(__dirname, 'cms')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/data', express.static(path.join(__dirname, 'data')));
// View routes
app.get('/', index);
app.use('/home', index);
app.use('/content', index);
app.use('/content/articles', index);
app.use('/content/pages', index);
app.use('/content/pages/edit-category-pages', index);
app.use('/content/search', index);
app.use('/users', index);
app.use('/galleries', index);
app.use('/view404', index);
//graphQL api route
app.use('/api', graphqlHTTP({
  schema: schema,
  rootValue: hello,
  graphiql: true,
}));
//graphQL session verification
var postType = new GraphQLObjectType({
  name: 'Post',
  fields: {
    body: {
      type: GraphQLString,
      resolve: (post, args, context, { hello }) => {
        // return the post body only if the user is the post's author
        if (context.user && (context.user.id === post.authorId)) {
          return post.body;
        }
        return null;
      }
    }
  }
});

module.exports = app;

/**/
async function getCollection(coll) {
  let collection = dB.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(coll)
  let result = []
  await collection.get().then(querySnapshot => {
    querySnapshot.forEach((doc) => {
      result.push(doc.data())

    });
  })
  return result
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
