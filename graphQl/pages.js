const { buildSchema } = require('graphql');
const { dataBaseworker } = require('../cms/tools/dataBaseWorker')
const _DEV = !!process.env.develolpment ? (process.env.develolpment === "true") : true

class pages extends dataBaseworker {
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
            type Langs {
                categoryName: String,
                description: String,               
                lang: String,
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
                path: [String],
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
            type Pages {
                id: ID,
                removed: String,
                Published: Published,
                ref: String!
            }
            type Query {
                title: String,
                pages(removed: Boolean, PublishedState: String): [Pages], 
                page(id: ID): [Page!],  
                pageDataLang(id: ID, lang: String): [Langs],
                pageDataIamges (id: ID): [Content],                
                pageSubcats(id: ID): [Pages],                    
                pageSubcat(id: ID, subcatId: ID): [Subcat],   
                pageSubcatDataLang(id: ID, subcatId: ID, lang: String): [Langs],   
                pageSubcatDataIamges(id: ID, subcatId: ID): [Content]
            }
        `);
    }
    get rootValue() {
        return {
            title: () => {
                return 'TySix';
            },
            pages: async (args) => {
                var result = new Array()
                await this.getAllPages(_DEV).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => (item.removed === args.removed && item.Published.state === args.PublishedState))
                })
                return result instanceof Array ? result : [result] || 'Dam!!';
            },
            page: async (args) => {
                var result = new Array()
                await this.getAllPages(_DEV).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => (item.id === args.id))
                })
                return result instanceof Array ? result : [result] || 'Dam!!';
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
            pageSubcatDataIamges: async (args) => {
                var result = new Array()
                await this.getSubcatsData({ name: args.id, doc: args.subcatId }, _DEV).then((QuerySnapshot) => {
                    QuerySnapshot.forEach(item => {
                        result.push(item.data())
                    })
                    result = result.filter(item => item.content)
                })
                return !!result[0] ? result[0].content : [] || 'Dam!!';
            }
        }
    }
}
module.exports = { pages };
