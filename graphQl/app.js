const { buildSchema } = require('graphql');
const { dataBaseworker } = require('../database/dataBaseWorker')
const _DEV = process.env.NODE_ENV === "development" ? true : false
class App extends dataBaseworker {
    get schema() {
        return buildSchema(`
            interface PageTemplate {
                id: ID,
                ref: String,
                author: Author,
                dateCreated: String,
                Published: Published,
                removed: String,
                toArticle: String,
                type: String!
                lastModified: [lastModified],
            }         
            type Author {
                id: ID,
                name: String,
            }
            type Published {
                state: String,
                date: String,
                publishedBy: String,
            }
            type lastModified {
                author: String,
                date: String,
                uid: String
            }
            type Content {                
                gallery: String,              
                title: String,
                type: String,
                url: String
            }

            interface LangsTemplate {
                description: String,               
                lang: String,
                type: String
            }
            type Langs implements LangsTemplate{
                categoryName: String,
                description: String,               
                lang: String,
                type: String
            }

            type Viewes {
                id: String,
                categoryName: String,
                type: String
            }
            type Subcat implements PageTemplate {
                id: ID,
                ref: String,
                author: Author,
                dateCreated: String,
                Published: Published,
                removed: String,
                toArticle: String,
                type: String!
                lastModified: [lastModified!],
                categoryName: String,
                children: [String],
                path: String,
                childrenCount: String,
                parent: String,
                removedChildren: String,
                top: String
            }
           type Page implements PageTemplate {
                id: ID,
                ref: String,
                author: Author,
                dateCreated: String,
                Published: Published,
                removed: String,
                toArticle: String,
                type: String!
                lastModified: [lastModified]
            }

            interface PagesTemplate {
                id: ID
            }  
            type Pages implements PagesTemplate{
                id: ID
            }   
            type Articles implements LangsTemplate{
                id: String,
                articleName: String,
                description: String,               
                lang: String,
                type: String
            }
            type PageArticles {
                id: ID,
                articles: [Articles]
            }
            type Query {
                pageviewes(removed: Boolean, Published: String, lang: String): [Viewes], 
                getSubCatecoryImages(id: ID, path: String): [Content],
                getArticleData(removed: Boolean, Published: String, category: String, lang: String): [Articles],

                pageDataLang(id: ID, lang: String): [Langs],
                pageDataIamges (id: ID): [Content],     
                pageSubcats(id: ID,toArticle: String): [Subcat], 
                pageSubcat(id: ID, subcatId: ID): [Subcat],   
                pageSubcatDataLang(id: ID, subcatId: ID, lang: String): [Langs],                   
                 
                getArticleImages(removed: Boolean, Published: String, category: String, lang: String): [Content]
        }
        `);
    }

    get rootValue() {
        return {
            pageviewes: async (args, l, r) => {
                (l, r)
                var result = new Array()
                await this.getAllPages(_DEV).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => (item.removed === args.removed && item.Published.state === args.Published))
                }).catch(err => {
                    console.log('Error', err)
                })
                let result2 = result.map(async (item, idx, arr) => {
                    let responseItems
                    try {
                        await this.getByDocPath(`/dev/VoSSMkzGYmPTvUhh9mgL/pages/${item.id}/data/${args.lang}`).then((QuerySnapshot) => {
                            responseItems = QuerySnapshot.data()
                            responseItems.id = arr[idx].id
                            responseItems.type = arr[idx].type
                        }).catch(err => {
                            console.log('Error', err)
                        })
                    }
                    catch (err) {
                        console.log('Error', err)
                    }
                    return responseItems
                })
                return result2 instanceof Array ? result2 : [result2] || 'Dam!!';
            },

            getSubCatecoryImages: async (args) => {
                var result = new Array(), result2
                await this.getByCollectionPath(`/dev/VoSSMkzGYmPTvUhh9mgL/pages/${args.id}/subCategories`).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => item.path === args.path)
                }).catch(err => {
                    console.log('Error', err)
                })
                await this.getByDocPath(`/dev/VoSSMkzGYmPTvUhh9mgL/pages/${args.id}/subCategories/${result[0].id}/data/images`)
                    .then((QuerySnapshot) => {
                        let responseItems = QuerySnapshot.data()
                        result2 = !!responseItems ? responseItems.content : []
                    }).catch(err => {
                        console.log('Error', err)
                    })
                return result2 instanceof Array ? result2 : [result2] || 'Dam!!';
            },

            getArticleData: async (args) => {
                var result = []
                await this.getAllArticles(_DEV).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                }).catch(err => {
                    console.log('Error', err)
                })
                result = result.filter(item => (args.removed === item.removed && item.Published === args.Published && item.categories.indexOf(args.category) !== -1))
                let result2 = result.map(async item => {
                    let responseItems = {}
                    await this.getByDocPath(`/dev/VoSSMkzGYmPTvUhh9mgL/articles/${item.id}/data/${args.lang}`).then((QuerySnapshot) => {
                        responseItems = QuerySnapshot.data()
                    }).catch(err => {
                        console.log('Error', err)
                    })
                    return responseItems
                })
                return result2 instanceof Array ? result2 : [result2] || 'Dam!!';
            },

            pageDataLang: async (args) => {
                var result = []
                await this.getPageData({ name: args.id, dataType: 'data' }, _DEV).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => (item.lang === args.lang))
                })
                return result instanceof Array ? result : [result] || 'Dam!!';
            },

            pageDataIamges: async (args) => {
                var result = new Array()
                await this.getPageData({ name: args.id, dataType: 'data' }, _DEV).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => item.content)
                })
                return !!result[0] ? result[0].content : [] || 'Dam!!';
            },

            pageSubcats: async (args) => {
                var result = new Array()
                await this.getPageData({ name: args.id, dataType: 'subCategories' }, _DEV).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => (item.id))
                })
                return result instanceof Array ? result : [result] || 'Dam!!';
            },

            pageSubcat: async (args) => {
                var result = new Array()
                await this.getPageData({ name: args.id, dataType: 'subCategories' }, _DEV).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => (item.id === args.subcatId))
                })
                return result instanceof Array ? result : [result] || 'Dam!!';
            },

            pageSubcatDataLang: async (args) => {
                var result = new Array()
                await this.getSubcatsData({ name: args.id, doc: args.subcatId }, _DEV).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => item.lang === args.lang)
                })
                return result instanceof Array ? result : [result] || 'Dam!!';
            },

            getArticleImages: async (args) => {
                var result = []
                await this.getAllArticles(process.env.develolpment === "true").then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => (args.removed === item.removed && item.Published === args.Published && item.category === args.category))
                })
                result = result.filter(item => (args.removed === item.removed && item.Published === args.Published && item.category === args.category))
                let result2 = result.map(async item => {
                    let responseImgs = {}, responseItems = {}
                    try {
                        await this.getByDocPath(`/dev/VoSSMkzGYmPTvUhh9mgL/articles/${item.id}/data/images`).then((QuerySnapshot) => {
                            responseImgs = QuerySnapshot.data()
                        })
                    }
                    catch (err) {
                        console.log('Error', err)
                    }
                    //responseItems.images = responseImgs.content
                    return responseImgs.content
                })
                return result2 instanceof Array ? result2 : [result2] || 'Dam!!';
            }
        }
    }
}
module.exports = { App };
