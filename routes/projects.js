const express = require('express');
const router = express.Router();
//const fs = require('fs');
const graphqlHTTP = require('express-graphql');
const { Projects } = require('../graphQl/projects');

const G = new Projects()
const schema = G.schema,
    rootValue = G.rootValue
//graphQL api route

router.post('/', (req, res, next) => {
    // console.log(req.headers);

    let projects = JSON.parse(fs.readFileSync('data/projects.json'));
    let origin = req.hostname
    //TODO active and licence verification
    if (projects.main.origins.indexOf(origin) !== -1) {
        next()
    }
    else {
        res.status('404').send('origin not allowed')
    }
});
router.get('/', graphqlHTTP({
    schema,
    rootValue,
    graphiql: false,
}));

router.post('/', graphqlHTTP({
    schema,
    rootValue,
    graphiql: false,
}));

module.exports = router;
