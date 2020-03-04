const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const { GraphQLObjectType, GraphQLString } = require('graphql');
const { galleries } = require('../graphQl/galleries');
const G = new galleries()
const schema = G.schema,
  rootValue = G.rootValue
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
}));

module.exports = router;
