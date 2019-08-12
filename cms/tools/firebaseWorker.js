export class worker {
    constructor() {
        this.db = firebase.firestore();
        this.auth = firebase.auth;
    }
    getDoc(table) {
        var categoriesRef = this.db.collection(table.name).doc(table.doc);
        return categoriesRef.get();
    }
    getDocList(table) {
        var pagesRef = this.db.collection(table.name);
        return pagesRef.get();
    }
    queryDocList(table) {
        var pagesRef = this.db.collection(table.name).where(table.query, table.condition, table.value);
        return pagesRef.get();
    }
    createDoc(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName);
        return pagesRef.set(table.doc);
    }
    deleteDoc(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName);
        return pagesRef.delete();
    }
    updateContent(done, table) {
        var imagesRef = this.db.collection(table.name).doc(table.doc);
        return imagesRef.update(table.data);
    }
    //collection 
    createItemCollectionDoc(table) {
        var pagesRef = this.db.collection(table.name).
            doc(table.docName).collection(table.coll).
            doc(table.doc);
        return pagesRef.set(table.data);
    }
    createItemCollectionDocDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').
            collection(table.name).doc(table.docName).collection(table.coll).
            doc(table.doc)
        return pagesRef.set(table.data);
    }

    getItemCollectionDoc(table) {
        var pagesRef = this.db.collection(table.name).
            doc(table.docName).
            collection(table.coll)
        return pagesRef.get();
    }
    getItemCollectionDocDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll)
        return pagesRef.get();
    }


    queryItemCollectionDoc(table) {
        var pagesRef = this.db.collection(table.name).where(table.query, table.condition, table.value)
        doc(table.docName).
            collection(table.coll)
        return pagesRef.get();/**/
    }
    queryItemCollectionDocDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).where(table.query, table.condition, table.value)
        return pagesRef.get(); /**/
    }


    updateItemCollectionDoc(table) {
        var imagesRef = this.db.collection(table.name).
            doc(table.docName).
            collection(table.coll).doc(table.doc);;

        return imagesRef.update(table.data);
    }
    updateDocItemCollectionDev(table) {
        var imagesRef = this.db.collection('dev').
            doc('VoSSMkzGYmPTvUhh9mgL').
            collection(table.name).doc(table.docName).collection(table.coll).doc(table.doc)
        return imagesRef.update(table.data);
    }

    deleteDocItemCollection(table) {
        var imagesRef = this.db.collection(table.name).
            doc(table.docName).
            collection(table.coll).doc(table.doc);;
        return imagesRef.update(table.data);
    }

    deleteCollectionDocDev(table) {
        var imagesRef = this.db.collection('dev').
            doc('VoSSMkzGYmPTvUhh9mgL').
            collection(table.name).doc(table.docName).collection(table.coll).doc(table.doc)
        return imagesRef.delete();
    }

    //collection collection
    getDocItemCollectionCollection(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName)
        return pagesRef.get();
    }
    getDocItemCollectionCollectionDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName)
        return pagesRef.get();
    }


    createDocItemCollectionCollection(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName)
        return pagesRef.set(table.doc);
    }
    createDocItemCollectionCollectionDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName)
        return pagesRef.set(table.doc);
    }


    updateDocItemCollectionCollection(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName)
        return pagesRef.update(table.doc);
    }
    updateDocItemCollectionCollectionDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName)
        return pagesRef.update(table.doc);
    }


    queryDocItemCollectionCollection(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName).where(table.query, table.condition, table.value)
        return pagesRef.get();
    }
    queryDocItemCollectionCollectionDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName).where(table.query, table.condition, table.value)
        return pagesRef.get();
    }

    ///

    getDocPath(table) {
        var pagesRef = this.db.doc(table)
        return pagesRef.get();
    }
    getDocListDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name)
        return pagesRef.get();
    }
    getDocDev(table) {
        var categoriesRef = this.db.doc(`/dev/VoSSMkzGYmPTvUhh9mgL/${table.name}/${table.doc}`)
        return categoriesRef.get();
    }
    queryDocListDev(table) {
        var pagesRef = this.db.doc(`/dev/VoSSMkzGYmPTvUhh9mgL/${table.name}`).where(table.query, table.condition, table.value);
        return pagesRef.get();
    }
    createDocDev(table) {
        var pagesRef = this.db.doc(`/dev/VoSSMkzGYmPTvUhh9mgL/${table.name}/${table.docName}`)
        return pagesRef.set(table.doc);
    }
    deleteDocDev(table) {
        var pagesRef = this.db.doc(`/dev/VoSSMkzGYmPTvUhh9mgL/${table.name}/${table.docName}`)
        return pagesRef.delete();
    }
    updateContentDev(table) {
        var imagesRef = this.db.doc(`/dev/VoSSMkzGYmPTvUhh9mgL/${table.name}/${table.doc}`)
        return imagesRef.update(table.data);
    }
    mailLink() {
        if (this.auth().isSignInWithEmailLink(window.location.href)) {
            var email = window.localStorage.getItem('emailForSignIn');
            if (!email) {
                email = window.prompt('Please provide your email for confirmation');
            }
            this.auth().signInWithEmailLink(email, window.location.href)
                .then(function (result) {
                    window.localStorage.removeItem('emailForSignIn');
                })
                .catch(function (error) {
                });
        }
    }
    authState(done) {
        this.auth().onAuthStateChanged((user) => {
            if (user) {
                let obj = { name: 'users', doc: user.uid };
                this.getDoc(obj)
                    .then((querySnapshot) => {
                        let user = querySnapshot.data();
                        done(user);
                    }).catch(function (error) {
                        console.error("Error reteaving article: ", error);
                        done("error", error);
                    });
            }
            else {
                done(0, 'No user is signed in.');
            }
        });
    }
    login(user) {
        this.auth().signInWithEmailAndPassword(user.email, user.pwd)
            .then((item) => {
            }).catch(function (error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorMessage, errorCode);
            });
    }
    handleTransaction(table) {
        var sfDocRef = this.db.collection(table.name).doc(table.doc);
        sfDocRef.set(table.query);
        return this.db.runTransaction(function (transaction) {
            return transaction.get(sfDocRef).then(function (sfDoc) {
                if (!sfDoc.exists) {
                    throw "Document does not exist!";
                }
                var newPopulation = sfDoc.data();
            });
        }).then(function () {
            console.log("Transaction successfully committed!");
        }).catch(function (error) {
            console.log("Transaction failed: ", error);
        });
    }
}