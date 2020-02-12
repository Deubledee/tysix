const { buildSchema } = require('graphql');
const { MediaDB } = require('../cms/tools/dataBaseWorker')
const _DEV = process.env.develolpment === "true"
class galleries extends MediaDB {
    get schema() {
        return buildSchema(`             
          type Content {
                id: String,
                addedTo: String,
                author: String,
                dateCreated: String,
                gallery: String,
                group: String,
                lastModifiedDate: String,
                removed: String,
                title: String,
                type: String,
                uploaded: String,
                url: String
            }
                    
            type Galleries {
                id: ID!,
                removed: String,
            }

            type Query {
                title: String,
                galleries(removed: Boolean): [Galleries],  
                gallerieImages (id: ID, removed: Boolean): [Content]
            }            
        `);
    }
    get rootValue() {
        return {
            title: () => {
                return 'TySix';
            },
            galleries: async (args) => {
                var result = []
                await this.getGalleries(_DEV).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => (item.removed === args.removed))
                })
                return result instanceof Array ? result : [result] || 'Dam!!';
            },

            gallerieImages: async (args) => {
                var result = []
                await this.getGalleryData({
                    name: args.id,
                    dataType: "data",
                    query: 'removed',
                    condition: '==',
                    value: args.removed
                }, _DEV).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => (item.removed === args.removed))
                })
                return result instanceof Array ? result : [result] || 'Dam!!';
            }
        }
    }
}
module.exports = { galleries };
