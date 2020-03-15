const { buildSchema } = require('graphql');
const fs = require('fs');
const _DEV = process.env.NODE_ENV === "development" ? true : false
function error() {
    let msg = 'error occurred'
    return {
        status: false,
        config: {
            apiKey: msg,
            authDomain: msg,
            databaseURL: msg,
            projectId: msg,
            storageBucket: msg,
            messagingSenderId: msg
        }
    }
}

class Projects {
    get schema() {
        return buildSchema(`
            interface Config {
                apiKey: String!,
                authDomain: String!,
                databaseURL: String!,
                projectId: String!,
                storageBucket: String!,
                messagingSenderId: String!
            }

            type serveConfig implements Config {
                apiKey: String!,
                authDomain: String!,
                databaseURL: String!,
                projectId: String!,
                storageBucket: String!,
                messagingSenderId: String!
            }
            type clientConfig implements Config {
                apiKey: String!,
                authDomain: String!,
                databaseURL: String!,
                projectId: String!,
                storageBucket: String!,
                messagingSenderId: String!
                appId: String!
                measurementId: String!
            }
            type Mproject {
                config: serveConfig!
            } 
            type Cproject {
                config: clientConfig!
            } 
            type Query {
                mainProject(projectId: ID): Mproject,
                clientProject(licence: ID, projectId: String): Cproject
            }`);
    }

    get rootValue() {
        return {
            mainProject: async (args, req) => {
                let obj, mainError = error()
                try {
                    let projects = JSON.parse(fs.readFileSync('data/projects.json'));
                    if (args.projectId !== projects.main.name) {
                        mainError.status = true
                        mainError.config.projectId = 'invalid project name'
                    }
                    if (req.get('tysix-licence-origin-control') !== projects.main.licence) {
                        mainError.status = true
                        mainError.config.databaseURL = 'invalid project licence'
                    }
                    if (req.get('tysix-api-origin-control') !== projects.main.client.apiKey) {
                        mainError.status = true
                        mainError.config.apiKey = 'invalid project apiKey'
                    }
                    if (projects.main.origins.indexOf(req.get('origin').toString()) < 0) {
                        mainError.status = true
                        mainError.config.authDomain = 'unauthorized origin'
                    }
                    obj = !mainError.status ? { config: projects.main.client } : mainError

                } catch (err) {
                    console.error(err)
                }
                return obj
            },
            clientProject: async (args, req, res) => {
                let obj,
                    clientError = error()
                try {
                    let projects = JSON.parse(fs.readFileSync('data/projects.json'));
                    let project = projects.dependents.find(item => item.name === args.projectId)
                    if (!project) {
                        clientError.status = true
                        clientError.config.projectId = 'invalid project name'
                    }
                    if (req.get('tysix-licence-origin-control') !== project.licence && project.state !== 'active') {
                        clientError.status = true
                        clientError.config.databaseURL = 'invalid project licence ' + project.state
                    } else {
                        res.set('Tysix-licence-Verification-Control', project.licence + 'state:' + project.state)
                    }

                    if (req.get('tysix-api-origin-control') !== project.client.appId) {
                        clientError.status = true
                        clientError.config.apiKey = 'invalid project apiKey'
                    } else {
                        res.set('Tysix-api-Origin-Control', project.client.appId)
                    }

                    if (project.origins.indexOf(req.get('origin').toString()) < 0) {
                        clientError.status = true
                        clientError.config.authDomain = 'unauthorized origin'
                    } /**/

                    obj = !clientError.status ? { config: project.client } : { config: clientError.config }

                } catch (err) {
                    console.error(err)
                }
                return obj
            }
        }
    }
}
module.exports = { Projects };
