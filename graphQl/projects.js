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
            mainProject: async (args, req, res) => {
                let obj, projects
                var error = { msg: 'api key not valid for main', config:{} }
                try {
                    projects = JSON.parse(fs.readFileSync(path.resolve('../data/projects.json')));
                    if (!!projects.main) {
                        error.config = {
                            apiKey: req.hostname,
                            authDomain: req.origin,
                            databaseURL: JSON.stringify(req.headers),
                            projectId: req.ip,
                            storageBucket: error.msg,
                            messagingSenderId: error.msg,
                        }
                        obj = error
                        /* (args.apiKey === projects.main.client.apiKey &&
                            args.projectId === projects.main.name) ?
                            { config: projects.main.client } : error*/
                    } else {
                        error.config = {
                            apiKey: error.msg,
                            authDomain: error.msg,
                            databaseURL: error.msg,
                            projectId: error.msg,
                            storageBucket: error.msg,
                            messagingSenderId: error.msg,
                        }
                    }
                } catch (err) {
                    error.config = {
                        apiKey: err,
                        authDomain: error.msg,
                        databaseURL: error.msg,
                        projectId: error.msg,
                        storageBucket: error.msg,
                        messagingSenderId: error.msg,
                    }
                    obj = error
                }
                return obj
            }
        }
    }
}
module.exports = { Projects };
