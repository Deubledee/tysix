const { worker } = require('./firebaseWorker');


const Worker = new worker();
class CategoriesDB {
    constructor() {
        this.categories = [];
    }
    //Categories
    getCategoriesEqualTo(query, value, dev) {
        let obj = { name: 'categories', query: query, value: value, condition: '==' };
        return queryDocList.call(this, obj, dev)
    }

    getCategories(dev) {
        let obj = { name: 'categories' };
        return getDocList.call(this, obj, dev)
    }

    setCategories(table, dev) {
        let obj = { name: 'categories', docName: table.name, doc: table.create }
        return createDoc.call(this, obj, dev)
    }

    deleteCategory(gallery, dev) {
        let obj = { name: 'categories', docName: gallery }
        return deleteDoc.call(this, obj, dev)
    }
    changeCategory(table, dev) {
        let obj = { name: 'categories', doc: table.name, data: table.update };
        return updateContent.call(this, obj, dev)
    }
}

class MediaDB {
    //media
    constructor() {
        this.categories = [];
    }
    writeGalleryContent(table, dev) {
        let obj = { name: "galleries", doc: table.gallerie, data: { content: table.content } };
        return updateContent.call(obj, dev)
    }

    /* getGalleriesEqualTo(query, value, dev) {
         let obj = { name: 'galleries', query: query, value: value, condition: '==' };
         return  queryDocList.call(this, obj, dev)
     }
     getPlaylistsEqualTo(query, value, dev) {
         let obj = { name: 'playlists', query: query, value: value, condition: '==' };
         return queryDocList.call(this, obj, dev)
     }*/

    getGalleries(dev) {
        let obj = { name: 'galleries' };
        return getDocList.call(this, obj, dev)
    }
    getPlaylists(dev) {
        let obj = { name: 'playlists' };
        return getDocList.call(this, obj, dev)
    }
    setGalleries(table, dev) {
        let obj = { name: 'galleries', docName: table.name, doc: table.create }
        return createDoc.call(this, obj, dev)
    }
    deleteGallery(gallery, dev) {
        let obj = { name: 'galleries', docName: gallery }
        return deleteDoc.call(this, obj, dev)
    }
    getGalleryData(table, dev) {
        let obj = { name: 'galleries', docName: table.name, coll: 'data', query: table.query, condition: table.condition, value: table.value }
        return queryItemCollectionDoc.call(this, obj, dev)
    }
    getGalleryGroups(table, dev) {
        let obj = { name: 'galleries', collDocName: table.gallery, collDocCollName: 'groups' }
        return queryItemCollectionDoc.call(this, obj, dev)
    }
    setGalleryData(table, dev) {
        let obj = { name: 'galleries', docName: table.name, coll: 'data', doc: table.doc, data: table.data }
        return createItemCollectionDoc.call(this, obj, dev)
    }
}

class dataBaseworker {
    constructor() {
        this.categories = [];
    }

    updateBrands(table, dev) {
        let obj = { name: "brands&manufactures", doc: table.name, data: { content: table.content } };
        return updateContent.call(this, obj, dev)
    }
    setBrands(table, dev) {
        let obj = table.name !== undefined ? { name: 'brands&manufactures', docName: table.name, doc: table.langs } : false;
        return createDoc.call(this, obj, dev)
    }
    deleteBrandsZone(lang, dev) {
        let obj = { name: 'brands&manufactures', docName: lang }
        return deleteDoc.call(this, obj, dev)
    }
    getBrands(table, dev) {
        let obj = { name: 'brands&manufactures', doc: table.name };
        return getDoc.call(this, obj, dev)
    }
    getAllBrands(dev) {
        let obj = { name: 'brands&manufactures' };
        return getDocListDev.call(this, obj, dev)
    }

    //langs
    getLangs(dev) {
        let obj = { name: 'langs', doc: 'data' };
        return getDoc.call(this, obj, dev)
    }

    updateLangs(table, dev) {
        let obj = { name: "langs", doc: table.name, data: { content: table.content } };
        return updateContent.call(this, obj, dev)
    }
    setLangs(table, dev) {
        let obj = table.name !== undefined ? { name: 'langs', docName: table.name, doc: table.langs } : false;
        return createDoc.call(this, obj, dev)
    }
    deleteLangZone(lang, dev) {
        let obj = { name: 'langs', docName: lang }
        return deleteDoc.call(this, obj, dev)
    }
    getAllLangs(dev) {
        let obj = { name: 'langs' };
        return getDocList.call(this, obj, dev)
    }


    /****************************************************************************************************************************/
    /***************************************************queries******************************************************************/
    /****************************************************************************************************************************/

    getPagesEqualTo(query, value, dev) {
        let obj = { name: 'pages', query: query, value: value, condition: '==' };
        return queryDocList.call(this, obj, dev)
    }

    getArticlesEqualTo(query, value, dev) {
        let obj = { name: 'articles', query: query, value: value, condition: '==' };
        return queryDocList.call(this, obj, dev)
    }

    queryPage(table, dev) {
        let query, condition, value
        [query, condition, value] = table.query.split(',')
        value = value === 'true' || value === 'false' ? (value === 'true') : value
        let obj = { name: 'pages', docName: table.name, query: query, condition: condition, value: value }
        return queryItemCollectionDoc.call(this, obj, dev)
    }

    mixQueryPage(table, dev) {
        let query, query2
        query = table.query.split(',')
        query2 = table.query2.split(',')
        let obj = { name: 'pages', docName: table.name, query: query, query2: query2 }
        return mixQueryDocList.call(this, obj, dev)
    }

    queryPageData(table, dev) {
        let query, condition, value
        [query, condition, value] = table.query.split(',')
        value = value === 'true' || value === 'false' ? (value === 'true') : value
        let obj = { name: 'pages', docName: table.name, coll: table.dataType, query: query, condition: condition, value: value }
        return queryItemCollectionDoc.call(this, obj, dev)
    }

    mixQueryPageData(table, dev) {
        let query, query2
        query = table.query.split(',')
        query2 = table.query2.split(',')
        let obj = { name: 'pages', docName: table.name, coll: table.dataType, query: query, query2: query2 }
        return mixQueryItemCollectionDoc.call(this, obj, dev)
    }

    querySubcatsData(table, dev) {
        let query, condition, value
        [query, condition, value] = table.query.split(',')
        let obj = { name: 'pages', docName: table.name, coll: 'subCategories', collDocName: table.doc, collDocCollName: 'data', query: query, condition: condition, value: value }
        return queryCollDoCollItem.call(this, obj, dev)
    }

    //aticles
    getAllArticles(dev) {
        let obj = { name: 'articles' };
        return getDocList.call(this, obj, dev)
    }
    getArticle(table, dev) {
        let obj = { name: 'articles', doc: table.name };
        return getDoc.call(this, obj, dev)
    }
    getArticleData(table, dev) {
        let obj = { name: 'articles', docName: table.name, coll: table.dataType }
        return getItemCollectionDoc.call(this, obj, dev)
    }

    setArticles(table, dev) {
        let obj = { name: 'articles', docName: table.name, doc: table.create }
        console.log(obj)
        return createDoc.call(this, obj, dev)
    }

    setArticleData(table, dev) {
        let obj = { name: 'articles', docName: table.name, coll: table.dataType, doc: table.doc, data: table.data }
        return createItemCollectionDoc.call(this, obj, dev)
    }
    updateArticles(table, dev) {
        let obj = { name: "articles", doc: table.name, data: table.update };
        return updateContent.call(this, obj, dev)
    }
    changeArticleData(table, dev) {
        let obj = { name: 'articles', docName: table.name, coll: table.dataType, doc: table.doc, data: table.data }
        // console.log(table, obj)
        return updateDocItemCollection.call(this, obj, dev)
    }
    deleteArticles(page, dev) {
        let obj = { name: 'articles', docName: page }
        return deleteDoc.call(this, obj, dev)
    }
    /****************************************************************************************************************************/
    /*********************************************************pages**************************************************************/
    /****************************************************************************************************************************/

    getAllPages(dev) {
        let obj = { name: 'pages' };
        return getDocList.call(this, obj, dev)
    }
    changePages(table, dev) {
        let obj = { name: 'pages', doc: table.name, data: table.update };
        return updateContent.call(this, obj, dev)
    }

    changePageData(table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: table.dataType, doc: table.doc, data: table.data }
        // console.log(table, obj)
        return updateDocItemCollection.call(this, obj, dev)
    }

    setPages(table, dev) {
        let obj = { name: 'pages', docName: table.name, doc: table.create }
        return createDoc.call(this, obj, dev)
    }

    deletePage(page, dev) {
        // console.log(page, dev)
        let obj = { name: 'pages', docName: page }
        // console.log(obj, dev)

        return deleteDoc.call(this, obj, dev)
    }
    getPageData(table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: table.dataType }
        return getItemCollectionDoc.call(this, obj, dev)
    }
    getPageDataSnapshot(table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: table.dataType }
        return getItemCollectionDocSnapshot.call(this, obj, dev)
    }

    setPageData(table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: table.dataType, doc: table.doc, data: table.data }
        return createItemCollectionDoc.call(this, obj, dev)
    }

    deletePageData(table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: table.dataType, doc: table.doc }
        return deleteCollectionDocData.call(this, obj, dev)
    }

    getSubcatsData(table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: 'subCategories', collDocName: table.doc, collDocCollName: 'data' }
        return getDocItemCollectionCollection.call(this, obj, dev)
    }
    setubcatsData(table, dev) {
        let obj = { name: 'pages', docName: table.page, coll: 'subCategories', collDocName: table.name, collDocCollName: 'data', doc: table.doc, data: table.data }
        return createDocItemCollectionCollection.call(this, obj, dev)
    }
    changeSubcatsData(table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: 'subCategories', collDocName: table.docName, doctable: 'data', doc: table.doc, data: table.data }
        return updateCollectionDoc.call(this, obj, dev)
    }
    deleteSubcatData(table, dev) {
        let obj = { name: 'pages', docName: table.page, coll: 'subCategories', collDocName: table.name, collDocCollName: 'data', doc: table.doc }
        return deleteCollectionDoc.call(this, obj, dev)
    }
    //other
    loginFire(user) {
        return Worker.login(user);
    }
    logoutFire() {
        return Worker.logout();
    }
    authStateChanged(done) {
        return Worker.authState(done);
    }
    checkMailLink() {
        return Worker.mailLink();
    }
    getElementAssets(element, dev) {
        let obj = { name: 'stylesandlangs', doc: element };
        if (dev === false) {
            return Worker.getDoc(obj)
        }
        else {
            return Worker.getDocDev(obj)
        }

    }
    setElementAssets(table, dev) {
        let obj = { name: 'stylesandlangs', docName: String, doc: Object };
        obj.docName = table.element;
        obj.doc = table.content;
        return createDoc.call(obj, dev)
    }
}

module.exports = { dataBaseworker, CategoriesDB, MediaDB }

// shared functions
async function getDocList(obj, dev) {
    if (dev === false) {
        this.categories = [];
        await Worker.getDocList(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(async function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    else {
        await Worker.getDocListDev(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(async function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    return this.categories
}
async function updateContent(obj, dev) {
    if (dev === false) {
        await Worker.updateContent(obj)
            .then(function () {
                this.categories = 'successfully updated'
            })
            .catch(async function (error) {
                this.categories = "Error"
                console.error("Error", error);
            });
    }
    else {
        await Worker.updateContentDev(obj)
            .then(function () {
                this.categories = 'successfully updated'
            })
            .catch(function (error) {
                this.categories = "Error"
                console.error("Error", error);
            });
    }
    return this.categories
}
async function createDoc(obj, dev) {
    if (obj === false) {
        console.error(false, false);
        return;
    }
    if (dev === false) {
        await Worker.createDoc(obj)
            .then(function () {
                this.categories = 'successfully created'
            })
            .catch((error) => {
                this.categories = "Error"
                console.error('error', error);
            });
    }
    else {
        await Worker.createDocDev(obj)
            .then(function () {
                this.categories = 'successfully created'
            })
            .catch((error) => {
                this.categories = "Error"
                console.error('error', error);
            });
    }
    return this.categories
}
async function deleteDoc(obj, dev) {
    if (dev === false) {
        await Worker.deleteDoc(obj)
            .then(function () {
                this.categories = "successfully deleted!"
            }).catch(function (error) {
                this.categories = "Error"
                console.error("error", error);
            });
    }
    else {
        await Worker.deleteDocDev(obj)
            .then(function () {
                this.categories = "successfully deleted!"
            }).catch(function (error) {
                this.categories = "Error"
                console.error("error", error);
            });
    }
    return this.categories
}

async function getDoc(obj, dev) {
    if (dev === false) {
        await Worker.getDoc(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    else {
        await Worker.getDocDev(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    return this.categories
}

async function queryDocList(obj, dev) {
    this.categories = []
    if (dev === false) {
        await Worker.queryDocList(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    else {
        await Worker.queryDocListDev(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    return this.categories
}

async function getItemCollectionDocSnapshot(obj, dev) {
    if (dev === false) {
        await Worker.getItemCollectionDoc(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    else {
        await Worker.getItemCollectionDocDev(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    return this.categories
}
async function getItemCollectionDoc(obj, dev) {
    if (dev === false) {
        await Worker.getItemCollectionDoc(obj)
            .then((querySnapshot) => {
                this.categories = {}
                this.categories = querySnapshot/*
                querySnapshot.forEach(item => {
                    this.categories[item.id] = item.data()
                })*/
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    else {
        await Worker.getItemCollectionDocDev(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    return this.categories
}
async function queryItemCollectionDoc(obj, dev) {
    if (dev === false) {
        await Worker.queryItemCollectionDoc(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
                /*  querySnapshot.forEach((doc) => {
                      this.categories.push(doc.data())
                  });*/
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    else {
        await Worker.queryItemCollectionDocDev(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    return this.categories
}
async function mixQueryDocList(obj, dev) {
    if (dev === false) {
        await Worker.mixQueryDocList(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
                /* querySnapshot.forEach((doc) => {
                     this.categories.push(doc.data())
                 });*/
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    else {
        await Worker.mixQueryDocListDev(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    return this.categories
}
async function mixQueryItemCollectionDoc(obj, dev) {
    if (dev === false) {
        await Worker.mixQueryItemCollectionDoc(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
                /* querySnapshot.forEach((doc) => {
                     this.categories.push(doc.data())
                 });*/
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    else {
        await Worker.mixQueryItemCollectionDocDev(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    return this.categories
}

async function createItemCollectionDoc(obj, dev) {
    if (dev === false) {
        await Worker.createItemCollectionDoc(obj)
            .then(function () {
                this.categories = 'successfully created'
            })
            .catch((error) => {
                this.categories = 'error'
                console.error('error', error);
            });
    }
    else {
        await Worker.createItemCollectionDocDev(obj)
            .then(function () {
                this.categories = 'successfully created'
            })
            .catch((error) => {
                this.categories = 'error'
                console.error('error', error);
            });
    }
    return this.categories
}
async function updateDocItemCollection(obj, dev) {
    if (dev === false) {
        await Worker.updateCollectionDocItem(obj)
            .then(function () {
                this.categories = 'successfully updated'
            })
            .catch((error) => {
                this.categories = 'Error writing page'
                console.error("Error writing page: ", error);
            });/**/
    }
    else {
        await Worker.updateCollectionDocItemDev(obj)
            .then(function () {
                this.categories = 'successfully updated'
            }).catch((error) => {
                this.categories = 'Error writing page'
                console.error("Error writing page: ", error);
            });/* */
    }
    return this.categories
}
async function deleteCollectionDocData(obj, dev) {
    if (dev === false) {
        await Worker.deleteCollectionDocData(obj)
            .then(function () {
                this.categories = "successfully deleted!"
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    else {
        await Worker.deleteCollectionDocDataDev(obj)
            .then(function () {
                this.categories = "successfully deleted!"
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    return this.categories
}


async function deleteCollectionDoc(obj, dev) {
    if (dev === false) {
        await Worker.deleteCollectionDoc(obj)
            .then(function () {
                this.categories = "successfully deleted!"
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    else {
        await Worker.deleteCollectionDocDev(obj)
            .then(function () {
                this.categories = "successfully deleted!"
            }).catch(function (error) {
                this.categories = 'error'
                console.error("error", error);
            });
    }
    return this.categories
}

async function getDocItemCollectionCollection(obj, dev) {
    if (dev === false) {
        await Worker.getDocItemCollectionCollection(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
                /*  querySnapshot.forEach((doc) => {
                      this.categories[doc.id] = doc.data()
                  });*/
            }).catch(function (error) {
                this.categories = "error"
                console.error("Error getting all pages: ", error);
            });
    }
    else {
        await Worker.getDocItemCollectionCollectionDev(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(function (error) {
                this.categories = "error"
                console.error("Error getting all pages: ", error);
            });
    }
    return this.categories
}


async function createDocItemCollectionCollection(obj, dev) {
    if (dev === false) {
        await Worker.createDocItemCollectionCollection(obj)
            .then(() => {
                this.categories = "successfully created"
            }).catch(function (error) {
                this.categories = "error"
                console.error("error", error);
            });
    }
    else {
        await Worker.createDocItemCollectionCollectionDev(obj)
            .then(() => {
                this.categories = "successfully created"
            }).catch(function (error) {
                this.categories = "error"
                console.error("error", error);
            });
    }
    return this.categories
}


async function updateCollectionDoc(obj, dev) {
    if (dev === false) {
        await Worker.updateCollectionDoc(obj)
            .then((msg) => {
                this.categories = "successfully updated"
            }).catch(function (error) {
                this.categories = "error"
                console.error("error", error);
            });
    }
    else {
        await Worker.updateCollectionDocDev(obj)
            .then((msg) => {
                this.categories = "successfully updated"
            }).catch(function (error) {
                this.categories = "error"
                console.error("error", error);
            });
    }
    return this.categories
}

async function queryCollDoCollItem(obj, dev) {
    if (dev === false) {
        await Worker.queryDocItemCollectionCollection(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
                /*  this.categories = {};
                  querySnapshot.forEach((doc) => {
                      this.categories[doc.id] = doc.data()
                  });*/
            }).catch(function (error) {
                this.categories = "error"
                console.error("error", error);
            });
    }
    else {
        await Worker.queryDocItemCollectionCollectionDev(obj)
            .then((querySnapshot) => {
                this.categories = querySnapshot
            }).catch(function (error) {
                this.categories = "error"
                console.error("error", error);
            });
    }
    return this.categories
}
async function createDocItemCollection(obj, dene, dev) {
    if (dev === false) {
        await Worker.createDocItemCollection(obj)
            .then(function () {
                this.categories = 'page successfully created'
            })
            .catch((error) => {
                this.categories = "error"
                console.error("Error writing page: ", error);
            });
    }
    else {
        await Worker.createDocItemCollectionDev(obj)
            .then(function () {
                this.categories = 'page successfully created'
            })
            .catch((error) => {
                this.categories = "error"
                console.error("Error writing page: ", error);
            });
    }
    return this.categories
}

