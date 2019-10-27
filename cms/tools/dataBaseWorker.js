import { worker } from './firebaseWorker';
const Worker = new worker();
//Class
export class MediaDB {
    //media
    writeGalleryContent(done, table, dev) {
        let teble = { name: "galleries", doc: table.gallerie, data: { content: table.content } };
        updateContent.call(obj, done, dev)
    }

    getGalleriesEqualTo(done, query, value, dev) {
        let obj = { name: 'galleries', query: query, value: value, condition: '==' };
        queryDocList.call(this, obj, done, dev)
    }
    getPlaylistsEqualTo(done, query, value, dev) {
        let obj = { name: 'playlists', query: query, value: value, condition: '==' };
        queryDocList.call(this, obj, done, dev)
    }
    getGalleries(done, dev) {
        let obj = { name: 'galleries' };
        getDocList.call(this, obj, done, dev)
    }
    getPlaylists(done, dev) {
        let obj = { name: 'playlists' };
        getDocList.call(this, obj, done, dev)
    }
    setGalleries(done, table, dev) {
        let obj = { name: 'galleries', docName: table.name, doc: table.create }
        createDoc.call(this, obj, done, dev)
    }
    deleteGallery(done, gallery, dev) {
        let obj = { name: 'media', docName: gallery }
        deleteDoc.call(this, obj, done, dev)
    }
    getGalleryData(done, table, dev) {
        let obj = { name: 'galleries', docName: table.name, coll: 'data', query: table.query, condition: table.condition, value: table.value }
        queryItemCollectionDoc.call(this, obj, done, dev)
    }
    getGalleryGroups(done, table, dev) {
        let obj = { name: 'galleries', collDocName: table.gallery, collDocCollName: 'groups' }
        queryItemCollectionDoc.call(this, obj, done, dev)
    }
    setGalleryData(done, table, dev) {
        let obj = { name: 'galleries', docName: table.name, coll: 'data', doc: table.doc, data: table.data }
        createItemCollectionDoc.call(this, obj, done, dev)
    }
}

export class dataBaseworker {
    constructor() {
        this.categories = [];
    }

    updateBrands(done, table, dev) {
        let obj = { name: "brands&manufactures", doc: table.name, data: { content: table.content } };
        updateContent.call(this, obj, done, dev)
    }
    setBrands(done, table, dev) {
        let obj = table.name !== undefined ? { name: 'brands&manufactures', docName: table.name, doc: table.langs } : false;
        createDoc.call(this, obj, done, dev)
    }
    deleteBrandsZone(done, lang, dev) {
        let obj = { name: 'brands&manufactures', docName: lang }
        deleteDoc.call(this, obj, done, dev)
    }
    getBrands(done, table, dev) {
        let obj = { name: 'brands&manufactures', doc: table.name };
        getDoc.call(this, obj, done, dev)
    }
    getAllBrands(done, dev) {
        let obj = { name: 'brands&manufactures' };
        getDocListDev.call(this, obj, done, dev)
    }
    //langs
    updateLangs(done, table, dev) {
        let obj = { name: "langs", doc: table.name, data: { content: table.content } };
        updateContent.call(this, obj, done, dev)
    }
    setLangs(done, table, dev) {
        let obj = table.name !== undefined ? { name: 'langs', docName: table.name, doc: table.langs } : false;
        createDoc.call(this, obj, done, dev)
    }
    deleteLangZone(done, lang, dev) {
        let obj = { name: 'langs', docName: lang }
        deleteDoc.call(this, obj, done, dev)
    }
    getLangs(done, table, dev) {
        let obj = { name: 'langs', doc: table.name };
        getDoc.call(this, obj, done, dev)
    }
    getAllLangs(done, dev) {
        let obj = { name: 'langs' };
        getDocList.call(this, obj, done, dev)
    }
    //aticles
    updateArticles(done, table, dev) {
        let obj = { name: "articles", doc: table.name, data: { content: table.content } };
        updateContent.call(this, obj, done, dev)
    }
    setArticles(done, table, dev) {
        let obj = table.parent !== undefined ? { name: 'articles', docName: table.parent, doc: table } : false;
        createDoc.call(this, obj, done, dev)
    }
    deleteArticles(done, page, dev) {
        let obj = { name: 'articles', docName: page }
        deleteDoc.call(this, obj, done, dev)
    }
    getArticle(done, categoryObj, dev) {
        let obj = { name: 'articles', doc: categoryObj.name };
        getDoc.call(this, obj, done, dev)
    }
    getAllArticles(done, dev) {
        let obj = { name: 'articles' };
        getDocList.call(this, obj, done, dev)
    }


    /****************************************************************************************************************************/
    /************************************************queries**********************************************************************/
    /****************************************************************************************************************************/

    getPagesEqualTo(done, query, value, dev) {
        let obj = { name: 'pages', query: query, value: value, condition: '==' };
        queryDocList.call(this, obj, done, dev)
    }

    queryPage(done, table, dev) {
        let query, condition, value
        [query, condition, value] = table.query.split(',')
        value = value === 'true' || value === 'false' ? (value === 'true') : value
        let obj = { name: 'pages', docName: table.name, query: query, condition: condition, value: value }
        queryItemCollectionDoc.call(this, obj, done, dev)
    }

    mixQueryPage(done, table, dev) {
        let query, query2
        query = table.query.split(',')
        query2 = table.query2.split(',')
        let obj = { name: 'pages', docName: table.name, query: query, query2: query2 }
        mixQueryDocList.call(this, done, obj, done, dev)
    }

    queryPageData(done, table, dev) {
        let query, condition, value
        [query, condition, value] = table.query.split(',')
        value = value === 'true' || value === 'false' ? (value === 'true') : value
        let obj = { name: 'pages', docName: table.name, coll: table.dataType, query: query, condition: condition, value: value }
        queryItemCollectionDoc.call(this, obj, done, dev)
    }

    mixQueryPageData(done, table, dev) {
        let query, query2
        query = table.query.split(',')
        query2 = table.query2.split(',')
        let obj = { name: 'pages', docName: table.name, coll: table.dataType, query: query, query2: query2 }
        mixQueryItemCollectionDoc.call(this, obj, done, dev)
    }

    querySubcatsData(done, table, dev) {
        let query, condition, value
        [query, condition, value] = table.query.split(',')
        let obj = { name: 'pages', docName: table.name, coll: 'subCategories', collDocName: table.doc, collDocCollName: 'data', query: query, condition: condition, value: value }
        queryCollDoCollItem.call(this, obj, done, dev)
    }

    /****************************************************************************************************************************/
    /*********************************************************pages**************************************************************/
    /****************************************************************************************************************************/

    getAllPages(done, dev) {
        let obj = { name: 'pages' };
        getDocList.call(this, obj, done, dev)
    }
    changePages(done, table, dev) {
        let obj = { name: 'pages', doc: table.name, data: table.update };
        updateContent.call(this, obj, done, dev)
    }

    changePageData(done, table, dev) {
        let obj = { name: 'pages', docName: table.docName, coll: table.dataType, doc: table.doc, data: table.data }
        // console.log(table, obj)
        updateDocItemCollection.call(this, obj, done, dev)
    }

    setPages(done, table, dev) {
        let obj = { name: 'pages', docName: table.name, doc: table.create }
        createDoc.call(this, obj, done, dev)
    }

    deletePage(done, page, dev) {
        // console.log(done, page, dev)
        let obj = { name: 'pages', docName: page }
        // console.log(obj, done, dev)

        deleteDoc.call(this, obj, done, dev)
    }
    getPageData(done, table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: table.dataType }
        getItemCollectionDoc.call(this, obj, done, dev)
    }
    getPageDataSnapshot(done, table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: table.dataType }
        getItemCollectionDocSnapshot.call(this, obj, done, dev)
    }

    setPageData(done, table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: table.dataType, doc: table.doc, data: table.data }
        createItemCollectionDoc.call(this, obj, done, dev)
    }

    deletePageData(done, table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: table.dataType, doc: table.doc }
        deleteCollectionDocData.call(this, obj, done, dev)
    }

    getSubcatsData(done, table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: 'subCategories', collDocName: table.doc, collDocCollName: 'data' }
        getDocItemCollectionCollection.call(this, obj, done, dev)
    }
    setubcatsData(done, table, dev) {
        let obj = { name: 'pages', docName: table.page, coll: 'subCategories', collDocName: table.name, collDocCollName: 'data', doc: table.doc, data: table.data }
        createDocItemCollectionCollection.call(this, obj, done, dev)
    }
    changeSubcatsData(done, table, dev) {
        let obj = { name: 'pages', docName: table.name, coll: 'subCategories', collDocName: table.docName, doctable: 'data', doc: table.doc, data: table.data }
        updateCollectionDoc.call(this, obj, done, dev)
    }
    deleteSubcatData(done, table, dev) {
        let obj = { name: 'pages', docName: table.page, coll: 'subCategories', collDocName: table.name, collDocCollName: 'data', doc: table.doc }
        deleteCollectionDoc.call(this, obj, done, dev)
    }


    //other
    loginFire(user) {
        Worker.login(user);
    }
    authStateChanged(done) {
        Worker.authState(done);
    }
    checkMailLink() {
        Worker.mailLink();
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
        createDoc.call(obj, done, dev)
    }
}
//private methods
function getDocList(obj, done, dev) {
    if (dev === false) {
        Worker.getDocList(obj)
            .then((querySnapshot) => {
                this.categories = [];
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc);
                });
                done(this.categories);
            }).catch(function (error) {
                done("error", error);
            });
    }
    else {
        Worker.getDocListDev(obj)
            .then((querySnapshot) => {
                this.categories = [];
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc);
                });
                done(this.categories);
            }).catch(function (error) {
                done("error", error);
            });
    }
}
function updateContent(obj, done, dev) {
    if (dev === false) {
        Worker.updateContent(obj)
            .then(function () {
                done("successfully updated!", table.lang);
            })
            .catch(function (error) {
                done("Error", error);
            });
    }
    else {
        Worker.updateContentDev(obj)
            .then(function () {
                done("successfully updated!", obj.lang);
            })
            .catch(function (error) {
                done("Error", error);
            });
    }
}
function createDoc(obj, done, dev) {
    if (obj === false) {
        done(false, false);
        return;
    }
    if (dev === false) {
        Worker.createDoc(obj)
            .then(function () {
                done();
            })
            .catch((error) => {
                done('error', error);
            });
    }
    else {
        Worker.createDocDev(obj)
            .then(function () {
                done();
            })
            .catch((error) => {
                done('error', error);
            });
    }

}
function deleteDoc(obj, done, dev) {
    if (dev === false) {
        Worker.deleteDoc(obj)
            .then(function () {
                done("successfully deleted!");
            }).catch(function (error) {
                done("error", error);
            });
    }
    else {
        Worker.deleteDocDev(obj)
            .then(function () {
                done("successfully deleted!");
            }).catch(function (error) {
                done("error", error);
            });
    }
}

function getDoc(obj, done, dev) {
    if (dev === false) {
        Worker.getDoc(obj)
            .then((querySnapshot) => {
                let content = querySnapshot.data();
                done(content);
            }).catch(function (error) {
                console.error(error);
                done("error", error);
            });
    }
    else {
        Worker.getDocDev(obj)
            .then((querySnapshot) => {
                let content = querySnapshot.data();
                done(content);
            }).catch(function (error) {
                console.error(error);
                done("error", error);
            });
    }
}

function queryDocList(obj, done, dev) {
    this.categories = []
    if (dev === false) {
        Worker.queryDocList(obj)
            .then((querySnapshot) => {
                this.categories = []
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc);
                });
                done(this.categories);
            }).catch(function (error) {
                done("error", error);
            });
    }
    else {
        Worker.queryDocListDev(obj)
            .then((querySnapshot) => {
                this.categories = []
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc);
                });
                done(this.categories);
            }).catch(function (error) {
                done("error", error);
            });
    }
}

function getItemCollectionDocSnapshot(obj, done, dev) {
    if (dev === false) {
        Worker.getItemCollectionDoc(obj)
            .then((querySnapshot) => {
                done(querySnapshot);
            }).catch(function (error) {
                console.error(error);
                done("error", error);
            });
    }
    else {
        Worker.getItemCollectionDocDev(obj)
            .then((querySnapshot) => {
                done(querySnapshot);
            }).catch(function (error) {
                console.error(error);
                done("error", error);
            });
    }
}
function getItemCollectionDoc(obj, done, dev) {
    if (dev === false) {
        Worker.getItemCollectionDoc(obj)
            .then((querySnapshot) => {
                this.categories = {}
                querySnapshot.forEach(item => {
                    this.categories[item.id] = item.data()
                })
                done(this.categories);
            }).catch(function (error) {
                console.error(error);
                done("error", error);
            });
    }
    else {
        Worker.getItemCollectionDocDev(obj)
            .then((querySnapshot) => {
                this.categories = {}
                querySnapshot.forEach(item => {
                    this.categories[item.id] = item.data()
                })
                done(this.categories);
            }).catch(function (error) {
                console.error(error);
                done("error", error);
            });
    }
}
function queryItemCollectionDoc(obj, done, dev) {
    if (dev === false) {
        Worker.queryItemCollectionDoc(obj)
            .then((querySnapshot) => {
                this.categories = [];
                console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc.data())
                });
                done(this.categories);
            }).catch(function (error) {
                done("error", error);
            });
    }
    else {
        Worker.queryItemCollectionDocDev(obj)
            .then((querySnapshot) => {
                this.categories = [];
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc.data())
                });
                done(this.categories);
            }).catch(function (error) {
                done("error", error);
            });
    }
}
function mixQueryDocList(obj, done, dev) {
    if (dev === false) {
        Worker.mixQueryDocList(obj)
            .then((querySnapshot) => {
                this.categories = [];
                console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc.data())
                });
                done(this.categories);
            }).catch(function (error) {
                done("error", error);
            });
    }
    else {
        Worker.mixQueryDocListDev(obj)
            .then((querySnapshot) => {
                this.categories = [];
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc.data())
                });
                done(this.categories);
            }).catch(function (error) {
                done("error", error);
            });
    }
}
function mixQueryItemCollectionDoc(obj, done, dev) {
    if (dev === false) {
        Worker.mixQueryItemCollectionDoc(obj)
            .then((querySnapshot) => {
                this.categories = [];
                console.log(querySnapshot)
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc.data())
                });
                done(this.categories);
            }).catch(function (error) {
                done("error", error);
            });
    }
    else {
        Worker.mixQueryItemCollectionDocDev(obj)
            .then((querySnapshot) => {
                this.categories = [];
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc.data())
                });
                done(this.categories);
            }).catch(function (error) {
                done("error", error);
            });
    }
}

function createItemCollectionDoc(obj, done, dev) {
    if (dev === false) {
        Worker.createItemCollectionDoc(obj)
            .then(function () {
                done('successfully created');
            })
            .catch((error) => {
                done('error', error);
            });
    }
    else {
        Worker.createItemCollectionDocDev(obj)
            .then(function () {
                done('successfully created');
            })
            .catch((error) => {
                done('error', error);
            });
    }
}
function updateDocItemCollection(obj, done, dev) {
    if (dev === false) {
        Worker.updateCollectionDocItem(obj)
            .then(function () {
                done('successfully created');
            })
            .catch((error) => {
                done('error', error);
                console.error("Error writing page: ", error);
            });/**/
    }
    else {
        Worker.updateCollectionDocItemDev(obj)
            .then(function () {
                done('successfully updated');
            })
            .catch((error) => {
                done('error', error);
                console.error("Error writing page: ", error);
            });/* */
    }
}
function deleteCollectionDocData(obj, done, dev) {
    if (dev === false) {
        Worker.deleteCollectionDocData(obj)
            .then(function () {
                done("successfully deleted!", obj.doc);
            }).catch(function (error) {
                done("error", error);
            });
    }
    else {
        Worker.deleteCollectionDocDataDev(obj)
            .then(function () {
                done("successfully deleted!", obj.doc);
            }).catch(function (error) {
                done("error", error);
            });
    }
}

function deleteCollectionDoc(obj, done, dev) {
    if (dev === false) {
        Worker.deleteCollectionDoc(obj)
            .then(function (data) {
                done(data);
            }).catch(function (error) {
                done("error", error);
            });
    }
    else {
        Worker.deleteCollectionDocDev(obj)
            .then(function (data) {
                done(data);
            }).catch(function (error) {
                done("error", error);
            });
    }
}

function getDocItemCollectionCollection(obj, done, dev) {
    if (dev === false) {
        Worker.getDocItemCollectionCollection(obj)
            .then((querySnapshot) => {
                this.categories = {};
                querySnapshot.forEach((doc) => {
                    this.categories[doc.id] = doc.data()
                });
                done(this.categories);
            }).catch(function (error) {
                console.error("Error getting all pages: ", error);
                done("error", error);
            });
    }
    else {
        Worker.getDocItemCollectionCollectionDev(obj)
            .then((querySnapshot) => {
                obj = {}
                this.categories = {}
                querySnapshot.forEach((doc) => {
                    this.categories[doc.id] = doc.data()
                });
                done(this.categories);
            }).catch(function (error) {
                console.error("Error getting all pages: ", error);
                done("error", error);
            });
    }
}


function createDocItemCollectionCollection(obj, done, dev) {
    if (dev === false) {
        Worker.createDocItemCollectionCollection(obj)
            .then(() => {
                done();
            }).catch(function (error) {
                console.error("Error getting all pages: ", error);
                done("error", error);
            });
    }
    else {
        Worker.createDocItemCollectionCollectionDev(obj)
            .then(() => {
                done();
            }).catch(function (error) {
                console.error("Error getting all pages: ", error);
                done("error", error);
            });
    }
}


function updateCollectionDoc(obj, done, dev) {
    if (dev === false) {
        Worker.updateCollectionDoc(obj)
            .then((msg) => {
                done(msg);
            }).catch(function (error) {
                console.error("Error getting all pages: ", error);
                done("error", error);
            });
    }
    else {
        Worker.updateCollectionDocDev(obj)
            .then((msg) => {
                done(msg);
            }).catch(function (error) {
                console.error("Error getting all pages: ", error);
                done("error", error);
            });
    }
}

function queryCollDoCollItem(obj, done, dev) {
    if (dev === false) {
        Worker.queryDocItemCollectionCollection(obj)
            .then((querySnapshot) => {
                this.categories = {};
                querySnapshot.forEach((doc) => {
                    this.categories[doc.id] = doc.data()
                });
                done(this.categories);
            }).catch(function (error) {
                console.error("Error getting all pages: ", error);
                done("error", error);
            });
    }
    else {
        Worker.queryDocItemCollectionCollectionDev(obj)
            .then((querySnapshot) => {
                obj = {}
                this.categories = {}
                querySnapshot.forEach((doc) => {
                    this.categories[doc.id] = doc.data()
                });
                done(this.categories);
            }).catch(function (error) {
                console.error("Error getting all pages: ", error);
                done("error", error);
            });
    }
}
function createDocItemCollection(obj, dene, dev) {
    if (dev === false) {
        Worker.createDocItemCollection(obj)
            .then(function () {
                done('page successfully created');
            })
            .catch((error) => {
                done('error', error);
                console.error("Error writing page: ", error);
            });
    }
    else {
        Worker.createDocItemCollectionDev(obj)
            .then(function () {
                done('page info created');
            })
            .catch((error) => {
                done('error', error);
                console.error("Error writing page: ", error);
            });
    }
}