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
                        apiKey: error.msg,
                        authDomain: error.msg,
                        databaseURL: error.msg,
                        projectId: error.msg,
                        storageBucket: error.msg,
                        messagingSenderId: error.msg,
                    }
                try {
                    let projects = JSON.parse(fs.readFileSync('data/projects.json'));
                    obj = (args.apiKey === projects.main.client.apiKey &&
                        args.projectId === projects.main.name &&
                        projects.main.origins.indexOf(req.hostname.toString()) !== -1 ||
                        projects.main.origins.indexOf(req.headers.host.toString()) !== -1) ?
                        { config: projects.main.client } : { config: error.config}
                } catch (err) {
                    console.error(err)
                }
                return obj
            }
        }
    }
}
module.exports = { Projects };
