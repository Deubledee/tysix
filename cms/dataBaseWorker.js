import { worker } from './firebaseWorker';
const Worker = new worker();
export class dataBaseworker {
    constructor() {
        this.categories = [];
    }
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
                    done("categorie", content);
                }).catch(function (error) {
                    console.error("Error reteaving article: ", error);
                    done("error", error);
                });
        }
        else {
            Worker.getDocDev(obj)
                .then((querySnapshot) => {
                    let content = querySnapshot.data().content;
                    done("categorie", content);
                }).catch(function (error) {
                    console.error("Error reteaving article: ", error);
                    done("error", error);
                });
        }
    }
    askAllArticles(done, dev) {
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
    writePagesContent(done, table, dev) {
        let teble = { name: 'pages', doc: table.name, data: table };
        console.log(teble)
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
    setPages(done, parsed, dev) {
        console.log(parsed);
        let obj = parsed.name !== undefined ? { name: 'pages', docName: parsed.name, doc: parsed } : false;
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
                    console.error("Error writing page: ", error);
                });
        }
        else {
            Worker.createDocDev(obj)
                .then(function () {
                    done('newPage');
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
    askAllPages(done, dev) {
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
    writeImageContent(done, table, dev) {
        let teble = { name: "images", doc: table.gallerie, data: { content: table.content } };
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
    getImageGalleries(done, dev) {
        let obj = { name: 'images' };
        if (dev === false) {
            Worker.getDocList(obj)
                .then((querySnapshot) => {
                    this.categories = [];
                    querySnapshot.forEach((doc) => {
                        this.categories.push(doc.data());
                    });
                    done(this.categories);
                }).catch(function (error) {
                    console.error("Error getting Image Galleries ", error);
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
                    console.error("Error getting Image Galleries ", error);
                    done("error", error);
                });
        }
    }
    setImageGalleries(done, table, dev) {
        let obj = { name: String, docName: String, doc: Object };
        obj.name = 'images';
        obj.docName = table.gallerie;
        obj.doc = table.content;
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
    deleteGallerie(done, gallerie, dev) {
        if (dev === false) {
            Worker.deleteDoc({ name: 'images', docName: gallerie + '_images' })
                .then(function () {
                    done("Gallerie successfully deleted!", gallerie);
                }).catch(function (error) {
                    console.error("Error deleting gallerie" + error);
                    done("error", error);
                });
        }
        else {
            Worker.deleteDocDev({ name: 'images', docName: gallerie + '_images' })
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