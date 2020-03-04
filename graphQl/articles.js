const { buildSchema } = require('graphql');
const { dataBaseworker } = require('../database/dataBaseWorker')
class articles extends dataBaseworker {
    get schema() {
        return buildSchema(`            

        `);
    }
    get rootValue() {
        return {
        }
    }
}
module.exports = { articles };
