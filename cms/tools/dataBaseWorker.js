import { worker } from './firebaseWorker';
const Worker = new worker();
export class dataBaseworker {
    constructor() {
        this.categories = [];
    }
    updateBrands(done, table, dev) {
        let teble = { name: "brands&manufactures", doc: table.name, data: { content: table.content } };
        if (dev === false) {
            Worker.updateContent(done, teble)
                .then(function () {
                    console.log("brands&manufactures successfully updated!");
                    done("brands&manufactures successfully updated!", table.lang);
                })
                .catch(function (error) {
                    done("Error", error);
                });
        }
        else {
            Worker.updateContentDev(done, teble)
                .then(function () {
                    console.log("brands&manufactures successfully updated!");
                    done("brands&manufactures successfully updated!", table.lang);
                })
                .catch(function (error) {
                    done("Error", error);
                });
        }
    }
    setBrands(done, table, dev) {
        let obj = table.name !== undefined ? { name: 'brands&manufactures', docName: table.name, doc: table.langs } : false;
        if (obj === false) {
            done(false, false);
            return;
        }
        if (dev === false) {
            Worker.createDoc(obj)
                .then(function () {
                    done('newlangs');
                })
                .catch((error) => {
                    done('error', error);
                    console.error("Error writing document: ", error);
                });
        }
        else {
            Worker.createDocDev(obj)
                .then(function () {
                    done('newlang');
                })
                .catch((error) => {
                    done('error', error);
                    console.error("Error writing document: ", error);
                });
        }
    }
    deleteBrandsZone(done, lang, dev) {
        if (dev === false) {
            Worker.deleteDoc({ name: 'brands&manufactures', docName: lang })
                .then(function () {
                    done("brands&manufactures successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing article: ", error);
                    done("error", error);
                });
        }
        else {
            Worker.deleteDocDev({ name: 'brands&manufactures', docName: lang })
                .then(function () {
                    done("brands&manufactures successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing article: ", error);
                    done("error", error);
                });
        }
    }
    getBrands(done, table, dev) {
        let obj = { name: 'brands&manufactures', doc: table.name };
        if (dev === false) {
            Worker.getDoc(obj)
                .then((querySnapshot) => {
                    let content = querySnapshot.data();
                    done("brands&manufactures", content);
                }).catch(function (error) {
                    console.error("Error reteaving brands&manufactures: ", error);
                    done("error", error);
                });
        }
        else {
            Worker.getDocDev(obj)
                .then((querySnapshot) => {
                    let content = querySnapshot.data();
                    done("brands&manufactures", content);
                }).catch(function (error) {
                    console.error("Error reteaving brands&manufactures: ", error);
                    done("error", error);
                });
        }
    }
    getAllBrands(done, dev) {
        let obj = { name: 'brands&manufactures' };
        if (dev === false) {
            Worker.getDocList(obj)
                .then((querySnapshot) => {
                    this.categories = [];
                    querySnapshot.forEach((doc) => {
                        this.categories.push(doc);
                    });
                    done(this.categories);
                }).catch(function (error) {
                    console.error("Error getting All brands&manufactures: ", error);
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
                    console.error("Error getting All brands&manufactures: ", error);
                    done("error", error);
                });
        }
    }
    //langs
    updateLangs(done, table, dev) {
        let teble = { name: "langs", doc: table.name, data: { content: table.content } };
        if (dev === false) {
            Worker.updateContent(done, teble)
                .then(function () {
                    console.log("langs successfully updated!");
                    done("langs successfully updated!", table.lang);
                })
                .catch(function (error) {
                    done("Error", error);
                });
        }
        else {
            Worker.updateContentDev(done, teble)
                .then(function () {
                    console.log("langs successfully updated!");
                    done("langs successfully updated!", table.lang);
                })
                .catch(function (error) {
                    done("Error", error);
                });
        }
    }
    setLangs(done, table, dev) {
        let obj = table.name !== undefined ? { name: 'langs', docName: table.name, doc: table.langs } : false;
        if (obj === false) {
            done(false, false);
            return;
        }
        if (dev === false) {
            Worker.createDoc(obj)
                .then(function () {
                    done('newlangs');
                })
                .catch((error) => {
                    done('error', error);
                    console.error("Error writing document: ", error);
                });
        }
        else {
            Worker.createDocDev(obj)
                .then(function () {
                    done('newlang');
                })
                .catch((error) => {
                    done('error', error);
                    console.error("Error writing document: ", error);
                });
        }
    }
    deleteLangZone(done, lang, dev) {
        if (dev === false) {
            Worker.deleteDoc({ name: 'langs', docName: lang })
                .then(function () {
                    done("lang successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing article: ", error);
                    done("error", error);
                });
        }
        else {
            Worker.deleteDocDev({ name: 'langs', docName: lang })
                .then(function () {
                    done("lang successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing article: ", error);
                    done("error", error);
                });
        }
    }
    getLangs(done, table, dev) {
        let obj = { name: 'langs', doc: table.name };
        if (dev === false) {
            Worker.getDoc(obj)
                .then((querySnapshot) => {
                    let content = querySnapshot.data();
                    done("langs", content);
                }).catch(function (error) {
                    console.error("Error reteaving langs: ", error);
                    done("error", error);
                });
        }
        else {
            Worker.getDocDev(obj)
                .then((querySnapshot) => {
                    let content = querySnapshot.data();
                    done("langs", content);
                }).catch(function (error) {
                    console.error("Error reteaving langs: ", error);
                    done("error", error);
                });
        }
    }
    getAllLangs(done, dev) {
        let obj = { name: 'langs' };
        if (dev === false) {
            Worker.getDocList(obj)
                .then((querySnapshot) => {
                    this.categories = [];
                    querySnapshot.forEach((doc) => {
                        this.categories.push(doc);
                    });
                    done(this.categories);
                }).catch(function (error) {
                    console.error("Error getting All langs: ", error);
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
                    console.error("Error getting All langs: ", error);
                    done("error", error);
                });
        }
    }
    //aticles
    updateArticles(done, table, dev) {
        let teble = { name: "articles", doc: table.name, data: { content: table.content } };
        if (dev === false) {
            Worker.updateContent(done, teble)
                .then(function () {
                    console.log("gallerie successfully updated!");
                    done("gallerie successfully updated!", table.gallerie);
                })
                .catch(function (error) {
                    done("Error", error);
                });
        }
        else {
            Worker.updateContentDev(done, teble)
                .then(function () {
                    console.log("gallerie successfully updated!");
                    done("gallerie successfully updated!", table.gallerie);
                })
                .catch(function (error) {
                    done("Error", error);
                });
        }
    }
    setArticles(done, table, dev) {
        let obj = table.parent !== undefined ? { name: 'articles', docName: table.parent, doc: table } : false;
        if (obj === false) {
            done(false, false);
            return;
        }
        if (dev === false) {
            Worker.createDoc(obj)
                .then(function () {
                    done('newPage');
                })
                .catch((error) => {
                    done('error', error);
                    console.error("Error writing document: ", error);
                });
        }
        else {
            Worker.createDocDev(obj)
                .then(function () {
                    done('newPage');
                })
                .catch((error) => {
                    done('error', error);
                    console.error("Error writing document: ", error);
                });
        }
    }
    deleteArticles(done, page, dev) {
        if (dev === false) {
            Worker.deleteDoc({ name: 'articles', docName: page })
                .then(function () {
                    done("Page successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing article: ", error);
                    done("error", error);
                });
        }
        else {
            Worker.deleteDocDev({ name: 'articles', docName: page })
                .then(function () {
                    done("Page successfully deleted!");
                }).catch(function (error) {
                    console.error("Error removing article: ", error);
                    done("error", error);
                });
        }
    }
    getArticle(done, categoryObj, dev) {
        let obj = { name: 'articles', doc: categoryObj.name };
        if (dev === false) {
            Worker.getDoc(obj)
                .then((querySnapshot) => {
                    let content = querySnapshot.data().content;
                    done("article", content);
                }).catch(function (error) {
                    console.error("Error reteaving article: ", error);
                    done("error", error);
                });
        }
        else {
            Worker.getDocDev(obj)
                .then((querySnapshot) => {
                    let content = querySnapshot.data().content;
                    done("article", content);
                }).catch(function (error) {
                    console.error("Error reteaving article: ", error);
                    done("error", error);
                });
        }
    }
    getAllArticles(done, dev) {
        let obj = { name: 'articles' };
        if (dev === false) {
            Worker.getDocList(obj)
                .then((querySnapshot) => {
                    this.categories = [];
                    querySnapshot.forEach((doc) => {
                        this.categories.push(doc.data());
                    });
                    done(this.categories);
                }).catch(function (error) {
                    console.error("Error getting All Articles: ", error);
                    done("error", error);
                });
        }
        else {
            Worker.getDocListDev(obj)
                .then((querySnapshot) => {
                    this.categories = [];
                    querySnapshot.forEach((doc) => {
                        this.categories.push(doc.data());
                    });
                    done(this.categories);
                }).catch(function (error) {
                    console.error("Error getting All Articles: ", error);
                    done("error", error);
                });
        }
    }
    changePages(done, table, dev) {
        console.log(table.id)
        let teble = { name: 'pages', doc: table.id, data: table };
        if (dev === false) {
            Worker.updateContent(done, teble)
                .then(function () {
                    console.log("page successfully updated!");
                    done("page successfully updated!", table.name);
                })
                .catch(function (error) {
                    done("Error", error);
                });
        }
        else {
            Worker.updateContentDev(done, teble)
                .then(function () {
                    console.log("page successfully updated!");
                    done("page successfully updated!", table.name);
                })
                .catch(function (error) {
                    done("Error", error);
                });
        }
    }
    setPages(done, table, dev) {
        let obj = { name: 'pages', docName: table.id, doc: table }
        if (dev === false) {
            Worker.createDoc(obj)
                .then(function () {
                    done('page successfully created');
                })
                .catch((error) => {
                    done('error', error);
                    console.error("Error writing page: ", error);
                });
        }
        else {
            Worker.createDocDev(obj)
                .then(function () {
                    done('page successfully created');
                })
                .catch((error) => {
                    done('error', error);
                    console.error("Error writing page: ", error);
                });
        }
    }
    deletePage(done, page, dev) {
        if (dev === false) {
            Worker.deleteDoc({ name: 'pages', docName: page })
                .then(function () {
                    done("Page successfully deleted!", page);
                }).catch(function (error) {
                    console.error("Error removing page: ", error);
                    done("error", error);
                });
        }
        else {
            Worker.deleteDocDev({ name: 'pages', docName: page })
                .then(function () {
                    done("Page successfully deleted!", page);
                }).catch(function (error) {
                    console.error("Error removing page: ", error);
                    done("error", error);
                });
        }
    }
    getAllPages(done, dev) {
        let obj = { name: 'pages' };
        if (dev === false) {
            Worker.getDocList(obj)
                .then((querySnapshot) => {
                    this.categories = [];
                    querySnapshot.forEach((doc) => {
                        this.categories.push(doc.data());
                    });
                    done(this.categories);
                }).catch(function (error) {
                    console.error("Error getting all pages: ", error);
                    done("error", error);
                });
        }
        else {
            Worker.getDocListDev(obj)
                .then((querySnapshot) => {
                    this.categories = [];
                    querySnapshot.forEach((doc) => {
                        this.categories.push(doc.data());
                    });
                    done(this.categories);
                }).catch(function (error) {
                    console.error("Error getting all pages: ", error);
                    done("error", error);
                });
        }
    }
    getPagesEqualTo(done, query, value, dev) {
        let obj = { name: 'pages', query: query, value: value, condition: '==' };
        this.categories = [];
        if (dev === false) {
            Worker.queryDocList(obj)
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.categories.push(doc.data());
                    });
                    done({ categories: this.categories });
                }).catch(function (error) {
                    console.error("Error getting Pages Equal To: " + value, error);
                    done("error", error);
                });
        }
        else {
            Worker.queryDocListDev(obj)
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        this.categories.push(doc.data());
                    });
                    done({ categories: this.categories });
                }).catch(function (error) {
                    console.error("Error getting Pages Equal To: " + value, error);
                    done("error", error);
                });
        }
    }
    writeMediaContent(done, table, dev) {
        let teble = { name: "media", doc: table.gallerie, data: { content: table.content } };
        if (dev === false) {
            Worker.updateContent(done, teble)
                .then(function () {
                    console.log("gallerie successfully updated!");
                    done("gallerie successfully updated!", table.gallerie);
                })
                .catch(function (error) {
                    done("Error", error);
                });
        }
        else {
            Worker.updateContentDev(done, teble)
                .then(function () {
                    console.log("gallerie successfully updated!");
                    done("gallerie successfully updated!", table.gallerie);
                })
                .catch(function (error) {
                    done("Error", error);
                });
        }
    }
    getMediaContent(done, categoryObj, dev) {
        let obj = { name: 'media', doc: categoryObj.name };
        if (dev === false) {
            Worker.getDoc(obj)
                .then((querySnapshot) => {
                    this.categories = [];
                    done(querySnapshot.data());
                }).catch(function (error) {
                    console.error("Error getting Media Galleries ", error);
                    done("error", error);
                });
        }
        else {
            Worker.getDocDev(obj)
                .then((querySnapshot) => {
                    this.categories = [];
                    done(querySnapshot.data());
                }).catch(function (error) {
                    console.error("Error getting Media Galleries ", error);
                    done("error", error);
                });
        }
    }
    setMediaGalleries(done, table, dev) {
        let obj = { name: String, docName: String, doc: Object };
        obj.name = 'media';
        obj.docName = table.gallery;
        obj.doc = table;
        if (dev === false) {
            Worker.createDoc(obj)
                .then(() => {
                    done('gallerie created', obj.docName);
                }).catch((error) => {
                    console.error("Error creating gallerie" + error);
                    done('error', error);
                });
        }
        else {
            Worker.createDocDev(obj)
                .then(() => {
                    done('gallerie created', obj.docName);
                }).catch((error) => {
                    console.error("Error creating gallerie" + error);
                    done('error', error);
                });
        }
    }
    deleteMediaGallery(done, gallerie, dev) {
        if (dev === false) {
            Worker.deleteDoc({ name: 'media', docName: gallery })
                .then(function () {
                    done("Gallerie successfully deleted!", gallery);
                }).catch(function (error) {
                    console.error("Error deleting gallerie" + error);
                    done("error", error);
                });
        }
        else {
            Worker.deleteDocDev({ name: 'media', docName: gallerie })
                .then(function () {
                    done("Gallerie successfully deleted!", gallerie);
                }).catch(function (error) {
                    console.error("Error deleting gallerie" + error);
                    done("error", error);
                });
        }
    }
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
            return Worker.getDoc(obj);
        }
        else {
            return Worker.getDocDev(obj);
        }
    }
    setElementAssets(table, dev) {
        let obj = { name: 'stylesandlangs', docName: String, doc: Object };
        obj.docName = table.element;
        obj.doc = table.content;
        if (dev === false) {
            return Worker.createDoc(obj);
        }
        else {
            return Worker.createDocDev(obj);
        }
    }
}