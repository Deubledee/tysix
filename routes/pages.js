const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const { pages } = require('../graphQl/pages');
const P = new pages(),
  schema = P.schema,
  rootValue = P.rootValue

//graphQL api route
router.get('/', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));

//graphQL api route
router.post('/', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}));/**/

module.exports = router;
