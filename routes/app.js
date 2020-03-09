const express = require('express');
const router = express.Router();
const graphqlHTTP = require('express-graphql');
const { App } = require('../graphQl/app');

const G = new App()
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
