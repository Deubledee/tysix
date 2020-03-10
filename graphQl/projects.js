const { buildSchema } = require('graphql');
const fs = require('fs');
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
                mainProject(licence: ID, projectId: String): Mproject,
                clientProject(apiKey: ID, projectId: String): Mproject
            }
        `);
    }

    get rootValue() {
        return {
            mainProject: async (args, req) => {
                let obj, error = { msg: 'error occurred', status: false }
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
                    if (args.projectId !== projects.main.name) {
                        error.status = true
                        error.config.projectId = 'invalid project name'
                    }
                    if (args.licence !== projects.main.licence) {
                        error.status = true
                        error.config.databaseURL = 'invalid project licence'
                        error.config.storageBucket = 'invalid project licence'
                        error.config.messagingSenderId = 'invalid project licence'
                    }
                    if (req.get('tysix-api-origin-control') !== projects.main.client.apiKey) {
                        error.status = true
                        error.config.apiKey = 'invalid project apiKey'
                    }
                    if (projects.main.origins.indexOf(req.hostname.toString()) < 0) {
                        error.status = true
                        error.config.authDomain = 'unauthorized origin'
                    }
                    obj = !error.status ? { config: projects.main.client } : { config: error.config }

                } catch (err) {
                    console.error(err)
                }
                return obj
            },
            clientProject: async (args, req) => {

            }
        }
    }
}
module.exports = { Projects };
