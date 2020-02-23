export class worker {
    constructor() {
        this.db = firebase.firestore();
        this.auth = firebase.auth;
    }
    /**queries */
    queryDocList(table) {
        var pagesRef = this.db.collection(table.name).where(table.query, table.condition, table.value);
        return pagesRef.get();
    }

    queryDocListDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).where(table.query, table.condition, table.value);
        return pagesRef.get();
    }

    mixQueryDocList(table) {
        var pagesRef = this.db.collection(table.name).where(table.query[0], table.query[1], table.query[2]).where(table.query2[0], table.query2[1], table.query2[2]);
        return pagesRef.get();
    }

    mixQueryDocListDev(table) {
        var pagesRef = this.db.doc(`/dev/VoSSMkzGYmPTvUhh9mgL/${table.name}`).where(table.query[0], table.query[1], table.query[2]).where(table.query2[0], table.query2[1], table.query2[2]);
        return pagesRef.get();
    }

    queryItemCollectionDoc(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).where(table.query, table.condition, table.value)
        doc(table.docName).
            collection(table.coll)
        return pagesRef.get();/**/
    }

    queryItemCollectionDocDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).where(table.query, table.condition, table.value)
        return pagesRef.get(); /**/
    }

    mixQueryItemCollectionDoc(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).where(table.query[0], table.query[1], table.query[2]).where(table.query2[0], table.query2[1], table.query2[2])
        return pagesRef.get();/**/
    }

    mixQueryItemCollectionDocDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).where(table.query[0], table.query[1], (table.query[2] === 'true')).where(table.query2[0], table.query2[1], (table.query2[2] === 'true'))
        return pagesRef.get(); /**/
    }

    queryCCDoc(table) {
        var pagesRef = this.db.collection(table.name).where(table.query).doc(table.docName).collection(table.coll).where(table.query, table.condition, table.value)
        return pagesRef.get();/**/
    }

    queryCCDocDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).where(table.query, table.condition, table.value)
        return pagesRef.get(); /**/
    }


    mixQueryCCDoc(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).where(table.query[0], table.query[1], table.query[2]).where(table.query2[0], table.query2[1], table.query2[2])
        return pagesRef.get();/**/
    }

    mixQueryCCDocDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).where(table.query[0], table.query[1], (table.query[2] === 'true')).where(table.query2[0], table.query2[1], (table.query2[2] === 'true'))
        return pagesRef.get(); /**/
    }




    /** */

    getDoc(table) {
        var categoriesRef = this.db.collection(table.name).doc(table.doc);
        return categoriesRef.get();
    }
    getDocDev(table) {
        var categoriesRef = this.db.doc(`/dev/VoSSMkzGYmPTvUhh9mgL/${table.name}/${table.doc}`)
        return categoriesRef.get();
    }
    getDocList(table) {
        var pagesRef = this.db.collection(table.name);
        return pagesRef.get();
    }
    getDocListDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name)
        return pagesRef.get();
    }
    createDoc(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName);
        return pagesRef.set(table.doc);
    }
    createDocDev(table) {
        var pagesRef = this.db.doc(`/dev/VoSSMkzGYmPTvUhh9mgL/${table.name}/${table.docName}`)
        console.log(table)
        return pagesRef.set(table.doc);
    }



    updateContent(table) {
        var imagesRef = this.db.collection(table.name).doc(table.doc);
        return imagesRef.update(table.data);
    }
    updateContentDev(table) {
        var imagesRef = this.db.doc(`/dev/VoSSMkzGYmPTvUhh9mgL/${table.name}/${table.doc}`)
        return imagesRef.update(table.data);
    }
    deleteDoc(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName);
        return pagesRef.delete();
    }
    deleteDocDev(table) {
        var pagesRef = this.db.doc(`/dev/VoSSMkzGYmPTvUhh9mgL/${table.name}/${table.docName}`)
        return pagesRef.delete();
    }
    //collection 
    createItemCollectionDoc(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).
            doc(table.doc);
        return pagesRef.set(table.data);
    }
    createItemCollectionDocDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).
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
    updateCollectionDocItem(table) {
        //  console.log(table)
        var imagesRef = this.db.collection(table.name).
            doc(table.docName).
            collection(table.coll).doc(table.doc);;

        return imagesRef.update(table.data);/**/
    }

    updateCollectionDocItemDev(table) {
        // console.log(table)
        var imagesRef = this.db.collection('dev').
            doc('VoSSMkzGYmPTvUhh9mgL').
            collection(table.name).doc(table.docName).collection(table.coll).doc(table.doc)
        return imagesRef.update(table.data); /**/
    }

    deleteDocItemCollection(table) {
        var imagesRef = this.db.collection(table.name).
            doc(table.docName).
            collection(table.coll).doc(table.doc);;
        return imagesRef.update(table.data);
    }

    /* deleteCollectionDoc(table) {
         var imagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).doc(table.doc)
         return imagesRef.delete();
     }
     deleteCollectionDocDev(table) {
         var imagesRef = this.db.collection('dev').
             doc('VoSSMkzGYmPTvUhh9mgL').
             collection(table.name).doc(table.docName).collection(table.coll).doc(table.doc)
         return imagesRef.delete();
     }*/

    //collection collection
    updateCollectionDoc(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName).doc(table.doc)
        return pagesRef.update(table.data);
    }
    updateCollectionDocDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.doctable).doc(table.doc)
        return pagesRef.update(table.data);
    }


    deleteCollectionDoc(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName).doc(table.doc).delete();
        return pagesRef
    }
    deleteCollectionDocDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName).doc(table.doc).delete();
        return pagesRef
    }

    //
    deleteCollectionDocData(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).doc(table.doc).delete();
        return pagesRef
    }

    deleteCollectionDocDataDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).doc(table.doc).delete();
        return pagesRef
    }

    //
    createDocItemCollectionCollection(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName).doc(table.doc)
        return pagesRef.set(table.data);
    }
    createDocItemCollectionCollectionDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName).doc(table.doc)
        return pagesRef.set(table.data);
    }
    getDocItemCollectionCollection(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName)
        return pagesRef.get();
    }
    getDocItemCollectionCollectionDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName)
        return pagesRef.get();
    }
    createDocItemCollectionCollection(table) {
        var pagesRef = this.db.collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName).doc(table.doc)
        return pagesRef.set(table.data);
    }
    createDocItemCollectionCollectionDev(table) {
        var pagesRef = this.db.collection('dev').doc('VoSSMkzGYmPTvUhh9mgL').collection(table.name).doc(table.docName).collection(table.coll).doc(table.collDocName).collection(table.collDocCollName).doc(table.doc)
        return pagesRef.set(table.data);
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
        let AUTH = this.auth().signInWithEmailAndPassword(user.email, user.pwd)
        return AUTH
    }
    logout() {
        let signOut = this.auth().signOut()
        return signOut
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
