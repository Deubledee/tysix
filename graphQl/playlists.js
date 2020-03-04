const { buildSchema } = require('graphql');
const { MediaDB } = require('../database/dataBaseWorker')
class galleries extends MediaDB {
    schema() {
        return buildSchema(`
            type Query {
                title: String,
                galleries: String
            }
        `);
    }
    rootValue() {
        return {
            title: () => {
                return 'TySix';
            },
            galleries: async () => {
                var result = []
                await this.getGalleries().then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                }, process.env.develolpment === "true")
                return JSON.stringify(result) || 'Dam!!';
            },
        }
    }
}
module.exports = { galleries };
