const woker = {}

Object.defineProperty(woker, 'db', {
    value: firebase.firestore()
})

Object.defineProperty(woker, 'getDoc', {
    value: function getDoc(table) {
        var categoriesRef = this.db.collection(table.name).doc(table.doc);
        return categoriesRef.get()
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(woker, 'getDocList', {
    value: function getDocList(table) {
        var pagesRef = this.db.collection(table.name)
        return pagesRef.get()
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(woker, 'queryDocList', {
    value: function queryDocList(table) {
        var pagesRef = this.db.collection(table.name).where(table.query, table.condition, table.value)
        return pagesRef.get()
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(woker, 'createDoc', {
    value: function createDoc(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName);
        return pagesRef.set(table.doc)
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(woker, 'deleteDoc', {
    value: function deleteDoc(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName)
        return pagesRef.delete()
    },
    writable: false, enumerable: false, configurable: false
})

/*
///////////////////////////////////////  review for kepps \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
                                                                                            
                                                                                                \\\
*/
Object.defineProperty(woker, 'handleTransaction', {
    value: function handleTransaction(table) {
        var sfDocRef = db.collection(table.name).doc(table.doc);
        sfDocRef.set(table.query);
        return db.runTransaction(function (transaction) {
            return transaction.get(sfDocRef).then(function (sfDoc) {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }

                var newPopulation = sfDoc.data()
            });
        }).then(function () {
            console.log("Transaction successfully committed!");
        }).catch(function (error) {
            console.log("Transaction failed: ", error);
        });
    },
    writable: false, enumerable: false, configurable: false
})

/*
                                                                                                \\\
                                                                                                  \
////////////////////////////////////////\\\\////\\\\////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

Object.defineProperty(woker, 'updateContent', {
    value: function updateContent(done, table) {
        var imagesRef = this.db.collection(table.name).doc(table.doc);
        return imagesRef.update(table.data)
    },
    writable: false, enumerable: false, configurable: false
})


/*
    app methods for convenience some may seem repeated
*/

/* Articles */

function dataBaseworker() {
    this.categories = []
}

Object.defineProperty(dataBaseworker.prototype, 'setArticles', {
    value: function setArticles(done, parsed) {
        console.log(parsed)
        woker.createDoc({ name: 'pages', docName: parsed.name, doc: parsed })
            .then(function () {
                done('newPage')
            })
            .catch((error) => {
                done('error', error)
                console.error("Error writing document: ", error);
            });
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(dataBaseworker.prototype, 'deleteArticles', {
    value: function deleteArticles(done, page) {
        woker.deleteDoc({ name: 'pages', docName: page })
            .then(function () {
                done("Page successfully deleted!", gallerie)
            }).catch(function (error) {
                console.error("Error removing article: ", error);
                done("error", error)
            });
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(dataBaseworker.prototype, 'getArticle', {
    value: function getArticle(done, categoryObj) {
        let obj = { name: 'articles', doc: categoryObj.name }
        woker.getDoc(obj)
            .then((querySnapshot) => {
                let content = querySnapshot.data().content
                done("categorie", content)
            }).catch(function (error) {
                console.error("Error reteaving article: ", error);
                done("error", error)
            });;
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(dataBaseworker.prototype, 'askAllArticles', {
    value: function askAllArticles(done) {
        let obj = { name: 'articles' }
        woker.getDocList(obj)
            .then((querySnapshot) => {
                this.categories = []
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc.data())
                })
                done(this.categories)
            }).catch(function (error) {
                console.error("Error getting All Articles: " + value, error);
                done("error", error)
            });
    },
    writable: false, enumerable: false, configurable: false
})

/* Pages */

Object.defineProperty(dataBaseworker.prototype, 'writePageContent', {
    value: function writeImageContent(done, table) {
        let teble = { name: 'pages', doc: table.name, data: table }
        woker.updateContent(done, teble)
            .then(function () {
                console.log("page successfully updated!");
                done("page successfully updated!", table.name)
            })
            .catch(function (error) {
                done("Error", error)
            });
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(dataBaseworker.prototype, 'setPages', {
    value: function setPages(done, parsed) {
        console.log(parsed)
        woker.createDoc({ name: 'pages', docName: parsed.name, doc: parsed })
            .then(function () {
                done('newPage')
            })
            .catch((error) => {
                done('error', error)
                console.error("Error writing page: ", error);
            });
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(dataBaseworker.prototype, 'deletePage', {
    value: function deletePage(done, page) {
        woker.deleteDoc({ name: 'pages', docName: page })
            .then(function () {
                done("Page successfully deleted!", page)
            }).catch(function (error) {
                console.error("Error removing page: ", error);
                done("error", error)
            });
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(dataBaseworker.prototype, 'askAllPages', {
    value: function askAllPages(done) {
        let obj = { name: 'pages' }
        woker.getDocList(obj)
            .then((querySnapshot) => {
                this.categories = []
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc.data())
                });
                done(this.categories)
            }).catch(function (error) {
                console.error("Error getting all pages: ", error);
                done("error", error)
            });
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(dataBaseworker.prototype, 'getPagesEqualTo', {
    value: function getPagesEqualTo(done, query, value) {
        let obj = { name: 'pages', query: query, value: value, condition: '==' }
        this.categories = []
        woker.queryDocList(obj)
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc.data())
                });
                done({ categories: this.categories, lang: language })
            }).catch(function (error) {
                console.error("Error getting Pages Equal To: " + value, error);
                done("error", error)
            });
    },
    writable: false, enumerable: false, configurable: false
})

/* Galleries */

Object.defineProperty(dataBaseworker.prototype, 'writeImageContent', {
    value: function writeImageContent(done, table) {
        let teble = { name: "images", doc: table.gallerie, data: { content: table.content } }
        woker.updateContent(done, teble)
            .then(function () {
                console.log("gallerie successfully updated!");
                done("gallerie successfully updated!", table.gallerie)
            })
            .catch(function (error) {
                done("Error", error)
            });
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(dataBaseworker.prototype, 'getImageGalleries', {
    value: function getImageGalleries(done) {
        let obj = { name: 'images' }
        woker.getDocList(obj)
            .then((querySnapshot) => {
                this.categories = []
                querySnapshot.forEach((doc) => {
                    this.categories.push(doc.data())
                });
                done(this.categories)
            }).catch(function (error) {
                console.error("Error getting Image Galleries ", error);
                done("error", error)
            });
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(dataBaseworker.prototype, 'setImageGalleries', {
    value: function setImageGalleries(done, table) {
        let obj = {}
        obj.name = 'images'
        obj.docName = table.gallerie
        obj.doc = table.content
        woker.createDoc(obj)
            .then(() => {
                done('gallerie created', obj.docName)
            }).catch((error) => {
                console.error("Error creating gallerie" + value, error);
                done('error', error)
            })
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(dataBaseworker.prototype, 'deleteGallerie', {
    value: function deleteGallerie(done, gallerie) {
        woker.deleteDoc({ name: 'images', docName: gallerie + '_images' })
            .then(function () {
                done("Gallerie successfully deleted!", gallerie)
            }).catch(function (error) {
                console.error("Error deleting gallerie" + value, error);
                done("error", error)
            });
    },
    writable: false, enumerable: false, configurable: false
})

/*
///////////////////////////////////////review for callback\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
                                                                                            
                                                                                                \\\
*/
Object.defineProperty(dataBaseworker.prototype, 'loginFire', {
    value: function loginFire(user) {
        firebase.auth().signInWithEmailAndPassword(user.email, user.pwd)
            .then((item) => {
            }).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage, errorCode)
                // ...
            });
    },
    writable: false, enumerable: false, configurable: false
})
/*
                                                                                                \\\
                                                                                                  \
////////////////////////////////////////\\\\////\\\\////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
*/

Object.defineProperty(dataBaseworker.prototype, 'authStateChanged', {
    value: function authStateChanged(done) {
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                done(user)
            } else {
                done(0, 'No user is signed in.')
            }
        });
    },
    writable: false, enumerable: false, configurable: false
})

Object.defineProperty(dataBaseworker.prototype, 'checkMailLink', {
    value: function checkMailLink() {
        if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
            var email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            firebase.auth().signInWithEmailLink(email, window.location.href)
                .then(function (result) {
                    window.localStorage.removeItem('emailForSignIn');
                })
                .catch(function (error) {
                });
        }
    },
    writable: false, enumerable: false, configurable: false
})

Object.seal(dataBaseworker);
Object.preventExtensions(dataBaseworker)
export { dataBaseworker }