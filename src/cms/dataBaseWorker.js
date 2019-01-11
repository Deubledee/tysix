function dataBaseworker() {
    this.db = firebase.firestore()
    this.categories = []
}

dataBaseworker.prototype.getDoc = function getDoc(table) {
    var categoriesRef = this.db.collection(table.name).doc(table.doc);
    return categoriesRef.get()
}

dataBaseworker.prototype.getDocList = function getDocList(table) {
    var pagesRef = this.db.collection(table.name)
    return pagesRef.get()
}

dataBaseworker.prototype.queryDocList = function queryDocList(table) {
    var pagesRef = this.db.collection(table.name).where(table.query, table.condition, table.value)
    return pagesRef.get()
}

dataBaseworker.prototype.createDoc = function createDoc(table) {
    var pagesRef = this.db.collection(table.name).doc(table.docName);
    return pagesRef.set(table.doc)
}

dataBaseworker.prototype.deleteDoc = function deleteDoc(table) {
    var pagesRef = this.db.collection(table.name).doc(table.docName)
    return pagesRef.delete()
}

dataBaseworker.prototype.writeImageContent = function writeImageContent(done, table) {
    var imagesRef = this.db.collection("images").doc(table.gallerie);
    imagesRef.update({
        content: table.content
    })
        .then(function () {
            console.log("gallerie successfully updated!");
            done("gallerie successfully updated!", table.gallerie)
        })
        .catch(function (error) {
            done("Error", error)
        });
}

dataBaseworker.prototype.writePageContent = function writeImageContent(done, table) {
    var imagesRef = this.db.collection("pages").doc(table.name);
    imagesRef.update(table)
        .then(function () {
            console.log("page successfully updated!");
            done("page successfully updated!", table.name)
        })
        .catch(function (error) {
            done("Error", error)
        });
}
dataBaseworker.prototype.handleTransaction = function handleTransaction(table) {
    var sfDocRef = db.collection(table.name).doc(table.doc);
    // Uncomment to initialize the doc.
    //ex:{role: admin}
    sfDocRef.set(table.query);
    return db.runTransaction(function (transaction) {
        // This code may get re-run multiple times if there are conflicts.
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
}

/*
    app methods for convenience some seem repeated
*/

dataBaseworker.prototype.setPages = function setPages(done, parsed) {
    console.log(parsed)
    this.createDoc({ name: 'pages', docName: parsed.name, doc: parsed })
        .then(function () {
            done('newPage')
        })
        .catch((error) => {
            done('error', error)
            console.error("Error writing document: ", error);
        });
}

dataBaseworker.prototype.deletePage = function deleteGallerie(done, page) {
    this.deleteDoc({ name: 'pages', docName: page })
        .then(function () {
            console.log("Document successfully deleted!");
            done("Page successfully deleted!", gallerie)
        }).catch(function (error) {
            console.error("Error removing document: ", error);
            done("error", error)
        });
}

dataBaseworker.prototype.askAllPages = function askAllPages(done, list) {
    this.getDocList(list).then((querySnapshot) => {
        this.categories = []
        querySnapshot.forEach((doc) => {
            this.categories.push(doc.data())
        });
        done(this.categories)
    })
}

dataBaseworker.prototype.getImageGalleries = function getImageGalleries(done) {
    let obj = { name: 'images' }
    this.getDocList(obj).then((querySnapshot) => {
        this.categories = []
        querySnapshot.forEach((doc) => {
            this.categories.push(doc.data())
        });
        done(this.categories)
    })
}

dataBaseworker.prototype.setImageGalleries = function setImageGalleries(done, table) {
    let obj = {}
    obj.name = 'images'
    obj.docName = table.gallerie
    obj.doc = table.content
    this.createDoc(obj).then(() => {
        done('gallerie created', obj.docName)
    }).catch((error) => {
        done('error', error)
    })
}

dataBaseworker.prototype.deleteGallerie = function deleteGallerie(done, gallerie) {
    this.deleteDoc({ name: 'images', docName: gallerie + '_images' })
        .then(function () {
            done("Gallerie successfully deleted!", gallerie)
        }).catch(function (error) {
            done("error", error)
        });
}

dataBaseworker.prototype.getPagesEqualTo = function getPagesEqualTo(done, query, value) {
    let obj = { name: 'pages', query: query, value: value, condition: '==' }
    this.categories = []
    this.queryDocList(obj).then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            this.categories.push(doc.data())
        });
        done({ categories: this.categories, lang: language })
    })
};

dataBaseworker.prototype.loginFire = function loginFire(user) {
    firebase.auth().signInWithEmailAndPassword(user.email, user.pwd).then((item) => {
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage, errorCode)
        // ...
    });
}

dataBaseworker.prototype.authStateChanged = function authStateChanged(done) {
    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            done(user)
        } else {
            done(0, 'No user is signed in.')
        }
    });
}

dataBaseworker.prototype.checkMailLink = function checkMailLink() {
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
}

export { dataBaseworker }