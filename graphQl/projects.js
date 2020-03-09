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
                let obj, projects, error = {
                    config: {
                        apiKey: 'api key not valid for main',
                        authDomain: 'api key not valid for main',
                        databaseURL: 'api key not valid for main',
                        projectId: 'api key not valid for main',
                        storageBucket: 'api key not valid for main',
                        messagingSenderId: 'api key not valid for main',
                    }
                }
                try {
                    projects = JSON.parse(fs.readFileSync(path.resolve('../data/projects.json')));
                    if (!!projects.main) {
                        error.apiKey = req.hostname
                        error.apiKey = req.origin
                        error.apiKey = JSON.stringify(req.headers)
                        error.apiKey = req.ip
                        obj = error  
                        /* (args.apiKey === projects.main.client.apiKey &&
                            args.projectId === projects.main.name) ?
                            { config: projects.main.client } : error*/
                    } else {
                        error.apiKey = '' + projects
                        obj = error

                    }
                } catch (err) {
                    error.apiKey = 'fuck ' + projects
                    obj = error
                    console.error(err)
                }
                return obj
            }
        }
    }
}
module.exports = { Projects };
