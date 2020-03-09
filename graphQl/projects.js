const { buildSchema } = require('graphql');
const fs = require('fs');
const path = require('path')
const _DEV = process.env.NODE_ENV === "development" ? true : false
class Projects {
    get schema() {
        return buildSchema(`
            type projectConfig {
                apiKey: String!,
                authDomain: String!,
                databaseURL: String!,
                projectId: String!,
                storageBucket: String!,
                messagingSenderId: String!
            }
            type Mproject {
                config: projectConfig!
            } 
            type Query {
                mainProject(apiKey: ID, projectId: String): Mproject,
            }
        `);
    }

    get rootValue() {
        return {
            mainProject: async (args, req) => {
                let obj, error = { msg: 'api key not valid'}
                    error.config = {
                        apiKey: 'hostname ' + req.hostname,
                        authDomain: 'origin ' + req.origin,
                        databaseURL: 'headers ' + JSON.stringify(req.headers),
                        projectId: 'ip ' + req.ip,
                        storageBucket: error.msg,
                        messagingSenderId: error.msg,
                    }
                try {
                    let projects = JSON.parse(fs.readFileSync('data/projects.json'));
                    obj = (args.apiKey === projects.main.client.apiKey &&
                        args.projectId === projects.main.name) ?
                        { config: error.config /* projects.main.client*/ } : { config: { apiKey: 'api key not valid for main' } }
                } catch (err) {
                    console.error(err)
                }
                return obj
            }
        }
    }
}
module.exports = { Projects };
