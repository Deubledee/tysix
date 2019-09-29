import { dataBaseworker, MediaDB } from './dataBaseWorker';
const _DBW = new dataBaseworker()
const _MEDIADBW = new MediaDB()
const __DEV = true
var storageRef = firebase.storage().ref();

const cmsPagesLib = function (superClass) {
    return class extends superClass {
        static get is() { return 'cms-pages-lib'; }
        ready() {
            super.ready();
        }
        _setLangArr(cont) {
            return _setLangArr(cont)
        }
        _askPages(query) {
            getPages(query).then((done) => {
                this._setAll(done);
            }).catch(error => {
                console.error(error)
            });
        }
        getPageData(id) {
            var ID = id
            getPageData(ID).then(data => {
                let cont = [data]
                let arr = this._setLangArr(cont[0])
                let str = `content/pages/edit-category-pages?content=${ID}&add=false&lang=${arr[0]}`
                localStorage.setItem(`page-${ID}`, JSON.stringify(cont))
                window.history.pushState({}, null, str);
                window.dispatchEvent(new CustomEvent('location-changed'));
            })
        }
        removePage(parent, cont) {
            let str = `${this.rootPath}content/pages?content=${parent}&removed=true`
            window.onbeforeunload = function () { };
            saveChanged(parent, cont).then(() => {
                window.history.pushState({}, null, str)
                window.onbeforeunload = function () { };
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('location-changed'))
                    this.__reset()
                }, 250)
            })
        }
        savePages() {
            console.log(this.inform[0])
            if (this.add === true)
                if (!!this.inform[0].id) {
                    let id = [this.inform[0].id]
                    console.log(id)
                    window.history.pushState({}, null, `${this.rootPath}content/pages?reset=true`)
                    saveAdded(this.inform[0].id, this.inform[0]).then(data => {
                        if (data !== 'error')
                            saveAddedData('data', this.inform[0].id, this.content[0]).then(data => {
                                window.onbeforeunload = function () { };
                                this.editing = 0;
                                //this.$.saveButton.classList.add('diferent');
                                setTimeout(() => {
                                    this.__reset();
                                    window.dispatchEvent(new CustomEvent('location-changed'))
                                }, 500)
                            })
                    })
                } else {
                    console.log(this.inform)
                }
            if (this.add === false)
                if (!!this.inform[0].id) {
                    let id = [this.inform[0].id]
                    window.history.pushState({}, null, `${this.rootPath}content/pages?reset=true`)
                    saveChanged(id[0], this.inform[0], Object.keys(this.content[0])).then(data => {
                        saveChangedData('data', id[0], this.content[0]).then(data => {
                            window.onbeforeunload = function () { };
                            this.editing = 0;
                            setTimeout(() => {
                                window.dispatchEvent(new CustomEvent('location-changed'));
                                localStorage.clear()
                            }, 500)
                        })/* */
                    })
                }
        }
    }
}
/************************************************************************************************* */
/******************************************sub-categorias***************************************** */
/************************************************************************************************* */
/************************************************************************************************* */




const cmsSubcatsLib = function (superClass) {
    return class extends superClass {
        static get is() { return 'cms-subcats-lib'; }
        ready() {
            super.ready();
        }
        _setLangArr(cont) {
            return _setLangArr(cont)
        }
        getTopSubcats(parent) {
            getTopSubcats(parent).then(done => {
                let child = this.children[0]
                child = child.getAttribute('slot')
                if (!!done && done.length > 0) {
                    if (child === "spinner") {
                        this.removeChild(this.children[0])
                    }
                    this.subSubCats = done
                } else {
                    if (child === "spinner") {
                        this.removeChild(this.children[0])
                    }
                    this.subSubCats = 'no content'
                }
            })
        }
        getSubcat(parent, id) {
            getSubcat(parent, id).then((done) => {
                this._setContent(done)
                checkSpinner.call(this)
            })
        }
        getChildrenSubcats(parent, subCatChildren) {
            let dataObj = []
            getChildrenSubcats(parent, subCatChildren).then((done) => {
                dataObj.push(done.pop())
                this.dataObj = dataObj
            })/* */
        }
        getSubcatsData(parent, id) {
            getSubcatsData(parent, id).then((done) => {
                this._setContent(done)
                checkSpinner.call(this)
            })
        }
        __checkEqual(data, temp, index2) {
            if (data[index2 - 1] === temp[index2 - 1]) {
                this.updated = true;
                getSubcatsData(this.parent, this.subcat.id).then((done) => {
                    this._setContent(done)
                    checkSpinner.call(this)
                })

            } else {
                getSubcatsData(this.parent, this.subcat.id).then((done) => {
                    this._setContent(done)
                    checkSpinner.call(this)
                })
            }
        }
        __checkBigger(data, temp, index2) {
            if (data[index2 - 1] === temp[index2 - 1]) {
                _DBW.getSubcatsData((done) => {
                    this._setContent(done)
                    checkSpinner.call(this)
                    this._toggleChildren()
                }, { name: this.parent, doc: this.subcat.id }, __DEV)
            } else {
                _DBW.getSubcatsData((done) => {
                    this._setContent(done)
                    checkSpinner.call(this)
                }, { name: this.parent, doc: this.subcat.id }, __DEV)
            }
        }
        saveSubcats() {
            let str = `${this.rootPath}content/pages/subcategory-pages?content=${this.inform[0].parent}&reset=true&update=${this.inform[0].id}`
            if (this.add === true) {
                saveAddedSubcat(this.inform[0].parent, this.inform[0].id, this.inform[0]).then(() => {
                    saveAddedSubcatData(this.inform[0].parent, this.inform[0].id, this.content[0]).then(() => {
                        window.history.pushState({}, null, str)
                        window.onbeforeunload = function () { };
                        //  this.$.saveButton.classList.add('diferent');
                        setTimeout(() => {
                            this._reset();
                            window.dispatchEvent(new CustomEvent('location-changed'))
                        }, 500)
                    }) /**/
                })
            }
            if (this.add === false) {
                saveChangedSubcat(this.inform[0].parent, this.inform[0].id, this.inform[0]).then(() => {
                    saveChangedSubcatData(this.inform[0].parent, this.inform[0].id, this.content[0]).then(() => {
                        window.history.pushState({}, null, str)
                        window.onbeforeunload = function () { };
                        //     this.$.saveButton.classList.add('diferent')
                        setTimeout(() => {
                            this._reset();
                            window.dispatchEvent(new CustomEvent('location-changed'));
                        }, 500)
                    })/* */
                })
            }/**/
        }
        removeSubcatsLang() {
            let str = `${this.rootPath}content/pages/subcategory-pages?content=${this.inform[0].parent}&reset=true&update=${this.inform[0].id}`
            // this.deleteSubcatData(this.inform[0].parent, this.inform[0].id, this.removeArr).then((item, id) => {
            deleteSubcatData(this.inform[0].parent, this.inform[0].id, this.removeArr).then(() => {
                window.history.pushState({}, null, str)
                window.onbeforeunload = function () { };
                setTimeout(() => {
                    this._reset()
                    window.dispatchEvent(new CustomEvent('location-changed'))
                }, 250)/**/
            })
        }
        updateSubcatParentInfo(cont, parent, id) {
            updateSubcatParentInfo(cont, parent, id)
        }
        removeSubcats(cont, parent, id) {
            let str
            if (!!cont) {
                str = `${this.rootPath}content/pages/subcategory-pages?content=${parent}&reset=true&update=${topparentname}`
                cont[0].children = cont[0].children.filter(item => { if (item !== this.subcat.id) return item })
                cont[0].childrenCount = cont[0].childrenCount--
                cont[0].removedChildren.push(this.subcat.id)
                updateSubcatParentInfo(cont[0], parent, id)
                window.history.pushState({}, null, str)
                window.onbeforeunload = function () { };
                saveChangedSubcat(parent, this.subcat.id, this.subcat).then(() => {
                    window.onbeforeunload = function () { };
                    setTimeout(() => {
                        this._reset()
                        window.dispatchEvent(new CustomEvent('location-changed'))
                    }, 250)
                })
            } else {
                str = `${this.rootPath}content/pages/subcategory-pages?content=${parent}&reset=true`
                saveChangedSubcat(parent, id, this.subcat).then(() => {
                    window.history.pushState({}, null, str)
                    window.onbeforeunload = function () { };
                    setTimeout(() => {
                        this._reset()
                        window.dispatchEvent(new CustomEvent('location-changed'))
                    }, 250)
                })
            }
        }
    }
}

/* ************************************************************************************************ */
/* *******************************************media************************************************ */
/* ************************************************************************************************ */
/* ************************************************************************************************ */

const cmsMediaLib = function (superClass) {
    return class extends superClass {
        static get is() { return 'cms-media-lib'; }
        ready() {
            super.ready();
        }
        _getGalleries(query) {
            getNRGalleries(query).then(data => {
                checkSpinner.call(this)
                this.set('galleries', data)
            }).catch(error => {
                console.log(error)
            })
        }
        _getAllGalleries() {
            getRnNRGallerries().then(data => {
                checkSpinner.call(this)
                this.set('galleries', data)
            }).catch(error => {
                console.log(error)
            })
        }
        getGalleryImages(gallery, query) {
            getGalleryImages(gallery, query).then(data => {
                checkSpinner.call(this)
                this.set('IMAGES', data)
            }).catch(error => {
                console.log(error)
            })
        }
        setGalleryImages() {
            let str = `media/view-images?gallery=${this.query.gallery}&update=${this.query.gallery}&reset=false`
            setGalleryData(this.IMAGES).then(() => {
                window.history.pushState({}, null, str)
                window.onbeforeunload = function () { };
                setTimeout(() => {
                    this._reset()
                    window.dispatchEvent(new CustomEvent('location-changed'))
                }, 250)
            }).catch(error => {
                console.log(error)
            })
        }
        removeGallerie(data) {
            removeGalleries(data).then(() => {
                this.setter = true
            })
        }
        /* upload  methods */
        _checkValidity(evt) {
            this.toUpload.push(evt.model.__data)
            this.fromCheckBox = true
        }
        _upload() {
            let promisseArray
            if (this.IMAGES.length === this.uploadedItems.length) { alert('all heve been uploaded \n !!?SAVE?!!'); return }
            this.pop = true
            this.popMsg = 'uploading...'
            if (!this.fromCheckBox && this.uploadedItems.length === 0) {
                promisseArray = this._getTakeAway()
            } else if (!this.fromCheckBox && this.uploadedItems.length > 0) {
                promisseArray = this._getCheckedFalse()
            } else if (!!this.fromCheckBox) {
                promisseArray = this._getCheckedTrue()
            }
            Promise.race(promisseArray).then((this._promisseCallback).bind(this)).catch((error) => {
                this.fromCheckBox = false
                this.toUpload = []
                alert('something whent wrong \n upload not possible..!!')
                let time = setTimeout(() => {
                    this.pop = false
                    this.popMsg = 'loading...'
                    clearTimeout(time)
                }, 1000);
                throw error
            });
        }
        _promisseCallback() {
            this.fromCheckBox = false
        }
        sendToStorage(tempobj, obj, idx) {
            return new Promise((resolve, reject) => {
                let meta = { 'contentType': obj.file.type }
                storageRef.child(`${this.query.gallery}/${obj.title}`).getDownloadURL().then((url) => {
                    this.num = this.num + 1
                    tempobj[idx].uploaded = 'inBD'
                    console.info('gallery/file name - already in storage - was not uploaded - %s/%s', tempobj[idx].gallery, tempobj[idx].title)
                    this._checkPop(tempobj)
                }).catch(() => {
                    storageRef.child(`${this.query.gallery}/${obj.title}`).put(obj.file, meta).then((snapshot) => {
                        this.num = this.num + 1
                        console.info('error 404 expected if file not in DB')
                        console.info('file added to storage', tempobj[idx].gallery, tempobj[idx].title)
                        snapshot.ref.getDownloadURL().then((url) => {
                            tempobj[idx].uploaded = 'uploaded'
                            tempobj[idx].url = url
                            this.uploadedItems.push(idx)
                            resolve()
                            this._checkPop(tempobj)
                        }).catch((error) => {
                            console.log(error)
                            reject(error)
                        });
                    }).catch((error) => {
                        reject(error)
                    });
                })
            })
        }

        _checkPop(tempobj) {
            if (this.num === this.toUpload.length) {
                this.IMAGES = []
                this.time = setTimeout(() => {
                    clearTimeout(this.time)
                    this.IMAGES = tempobj
                    this.toUpload = []
                    this.pop = false
                    this.num = 0
                    this.popMsg = 'loading...'
                }, 250);
                return
            } else {
                this.pop = true
            }
        }
        _getTakeAway() {
            let promisseArray = []
            this.toUpload = this.IMAGES
            this.set('totalCount', `${this.toUpload.length}`)
            for (let i = 0; i < this.toUpload.length; i++) {
                if (!this.toUpload[i]) { continue }
                promisseArray.push(this.sendToStorage(this.IMAGES, this.toUpload[i], i))
            }
            return promisseArray
        }
        _getCheckedFalse() {
            let promisseArray = []
            this.toUpload = this.IMAGES.filter((item, idx) => {
                if (this.uploadedItems.indexOf(idx) === -1) {
                    item['idx'] = idx
                    return item
                }
            })
            this.set('totalCount', `${this.toUpload.length}`)
            for (let i = 0; i < this.toUpload.length; i++) {
                if (!this.toUpload[i]) { continue }
                promisseArray.push(this.sendToStorage(this.IMAGES, this.toUpload[i], this.toUpload[i].idx))
            }
            return promisseArray
        }
        _getCheckedTrue() {
            let promisseArray = []
            this.set('totalCount', `${this.toUpload.length}`)
            for (let i = 0; i < this.toUpload.length; i++) {
                if (!this.toUpload[i]) { continue }
                let image = this.toUpload[i].image, idx = this.toUpload[i].index
                promisseArray.push(this.sendToStorage(this.IMAGES, image, idx))
            }
            return promisseArray
        }
    }
}

export { cmsMediaLib }
export { cmsPagesLib }
export { cmsSubcatsLib }

function setGalleryData(imageArr) {
    let promisseArray = []
    for (let i = 0; i < imageArr.length; i++) {
        promisseArray.push(new Promise((resolve, reject) => {
            _MEDIADBW.setGalleryData((done, err) => {
                if (done !== 'error') {
                    resolve(done)
                } else {
                    console.log(err);
                    reject(err)
                }
            }, { name: imageArr[i].gallery, doc: imageArr[i].id, data: imageArr[i] }, __DEV)
        }))
    }
    return Promise.race(promisseArray)
}

function getRnNRGallerries() {
    return new Promise((resolve, reject) => {
        _MEDIADBW.getGalleries((done, err) => {
            if (done !== 'error') {
                resolve(done)
            } else {
                console.log(err);
                reject(err)
            }
        }, __DEV)
    })
}
function getNRGalleries(query) {
    return new Promise((resolve, reject) => {
        _MEDIADBW.getGalleriesEqualTo((done, err) => {
            if (done !== 'error') {
                let arr = []
                done.forEach(item => {
                    arr.push(item.data())
                    localStorage.setItem(`galleries-${item.data().id}`, JSON.stringify(item.data()))
                })
                resolve(arr)
            } else {
                reject(err)
            }
        }, query.q, query.v, __DEV)
    })
}
function getGalleryImages(gallery, q) {
    return new Promise((resolve, reject) => {
        let query, condition, value
        [query, condition, value] = q.split(',')
        value = (value === 'true') || !(value === 'false')
        _MEDIADBW.getGalleryData((done) => {
            if (done !== 'error') {
                resolve(done)
            } else {
                reject()
                console.error(err)
            }
        }, { name: gallery, dataType: "data", query: query, condition: condition, value: value }, __DEV)
    })
}
function removeGalleries(data) {
    return new Promise((resolve, reject) => {
        _MEDIADBW.deleteGallery((done, err) => {
            if (done !== 'error') {
                resolve()
            } else {
                reject()
                console.error(err)
            }
        }, data, __DEV)
    })
}
function checkSpinner() {
    if (this.spinOut === false) {
        if (this.children.item(this.children).tagName === "PAPER-SPINNER-LITE")
            this.removeChild(this.children[0])
        this.spinOut = true
    }
}

function queryGalleries(data) {
    return new Promise((resolve, reject) => {

    })
}

function getImages() {
    return new Promise((resolve, reject) => {
        _DBW.getMediaGalleriesData((done, err) => {
            if (done !== 'error') {
                resolve(done)
            } else {
                console.log(err);
                reject(err)
            }
        }, { gallery: '' }, __DEV)
    })
}

/* ************************************************************************************************ */
/* *******************************************subcats********************************************** */
/* ************************************************************************************************ */
/* ************************************************************************************************ */

function removeSubcatInfo(parent, id, inform) {
    return new Promise((resolve, reject) => {
        _DBW.setPageData((done, err) => {
            if (done !== 'error') {
                resolve(done)
            }
            else {
                console.log(err);
                reject(err)
            }
        }, { name: parent, dataType: 'subCategories', doc: id, data: inform }, __DEV);/* */
    })
}

function removeSubcatData(parent, id, content) {
    let toPromisse = []
    for (let par in this.content[0]) {
        toPromisse.push(new Promise((resolve, reject) => {
            _DBW.setubcatsData((done, err) => {
                if (done !== 'error') {
                    resolve(done)
                }
                else {
                    reject(err)
                }
            }, { page: parent, name: id, doc: par.toString(), data: content[par] }, __DEV); /* */
        }))
    }
    return Promise.race(toPromisse)
}

function deleteAdded() {
    return new Promise((resolve, reject) => {
        _DBW.deletePage((msg) => {
            if (done !== 'error') {
                resolve(true)
            }
            else {
                console.log(err);
                reject(err)
            }
            this.__reset()
        }, data, __DEV);
    })
}

function deleteAddedData(parent) {
    return new Promise((resolve, reject) => {
        _DBW.getPageDataSnapshot((done2) => {
            if (done !== 'error') {
                resolve(true)
            }
            else {
                console.log(err);
                reject(err)
            }
            if (done2.docs.length > 0)
                done2.forEach(item => {
                    item.ref.delete()
                })
        }, { name: parent, dataType: 'data' }, __DEV)
    })
}

function deleteAddedDataĨtem(parent, itemArray) {
    return new Promise((resolve, reject) => {
        _DBW.getPageDataSnapshot((done2, err) => {
            if (done2 !== 'error' && done2.docs.length > 0) {
                let arr = itemArray.entries()
                done2.forEach(item => {
                    if (arr.next().value[1] === item.id) {
                        item.ref.delete()
                    }
                })
                resolve(true)
            }
            else {
                console.log(err);
                reject(err)
            }
        }, { name: parent, dataType: 'data' }, __DEV)
    })
}

/**in use */

function _setLangArr(cont) {
    let arr = []
    for (let par in cont) {
        if (par !== 'images') {
            arr.push(par)
        }
    }
    return arr
}
function getPages(query) {
    if (!query)
        return new Promise((resolve, reject) => {
            _DBW.getAllPages((done) => {
                resolve(done)
            }, __DEV)
        })

    if (query)
        return new Promise((resolve, reject) => {
            _DBW.getPagesEqualTo((done, error) => {
                if (done !== 'error') {
                    resolve(done)
                } else {
                    reject(error)
                }
            }, query.q, query.v, __DEV)
        })
}
function getPageData(id) {
    return new Promise((resolve, reject) => {
        _DBW.getPageData((done2) => {
            resolve(done2)
        }, { name: id, dataType: 'data' }, __DEV)/* */
    })
}
function saveAdded(id, inform) {
    return new Promise((resolve, reject) => {
        _DBW.setPages((msg, err) => {
            if (msg !== 'error') {
                resolve(msg)
            }
            else {
                reject(err)
            }
        }, { name: id, create: inform }, __DEV);/* */
    })
}
function saveAddedData(type, id, content) {
    let toPromisse = []
    for (let par in content) {
        toPromisse.push(new Promise((resolve, reject) => {
            _DBW.setPageData((done, err) => {
                if (done !== 'error') {
                    resolve(done)
                }
            }, { name: id, dataType: type, doc: par.toString(), data: content[par] }, __DEV);/* */
        }))
    }
    return Promise.race(toPromisse)
}

function saveChanged(id, inform) {
    return new Promise((resolve, reject) => {
        _DBW.changePages((msg, err) => {
            if (msg !== 'error') {
                resolve(msg)
            }
            else {
                console.log(err);
                reject(err)
            }
        }, { name: id, update: inform }, __DEV);/* */
    })
}

function saveChangedData(type, id, content) {
    let toPromisse = []
    for (let par in content) {
        if (id !== 'undefined')
            toPromisse.push(new Promise((resolve, reject) => {
                _DBW.changePageData((done, err) => {
                    if (done !== 'error') {
                        resolve(true)
                    }
                }, { docName: id, dataType: type, doc: par.toString(), data: content[par] }, __DEV);
            }))
    }/**/
    return Promise.race(toPromisse)
}

function saveAddedSubcat(parent, doc, inform) {
    return new Promise((resolve, reject) => {
        _DBW.setPageData((done, err) => {
            if (done !== 'error') {
                resolve(done)
            }
            else {
                console.log(err);
                reject(err)
            }
        }, { name: parent, dataType: 'subCategories', doc: doc, data: inform }, __DEV);/* */
    })
}

function saveAddedSubcatData(parent, name, content) {
    let toPromisse = []
    for (let par in content) {
        toPromisse.push(new Promise((resolve, reject) => {
            _DBW.setubcatsData((done, err) => {
                if (done !== 'error') {
                    resolve(done)
                }
            }, { page: parent, name: name, doc: par.toString(), data: content[par] }, __DEV); /* */
        }))
    }
    return Promise.race(toPromisse)
}

function deleteSubcatData(parent, name, arr) {
    let toPromisse = []
    for (let i = 0; i < arr.length; i++) {
        toPromisse.push(new Promise((resolve, reject) => {
            _DBW.deleteSubcatData((done) => {
                if (done !== 'error') {
                    resolve()
                }
            }, { page: parent, name: name, doc: arr[i] }, __DEV)
        }))  /* */
    }
    return Promise.race(toPromisse)
}

function saveChangedSubcatData(parent, docName, content) {
    let toPromisse = []
    for (let par in content) {
        toPromisse.push(new Promise((resolve, reject) => {
            _DBW.changeSubcatsData((done, err) => {
                if (done !== 'error') {
                    resolve(done)
                }
            }, { name: parent, docName: docName, doc: par.toString(), data: content[par] },
                __DEV) /* */

        }))
    }
    return Promise.race(toPromisse)
}

function saveChangedSubcat(parent, doc, data) {
    return new Promise((resolve, reject) => {
        _DBW.changePageData((done, err) => {
            if (done !== 'error') {
                resolve(done)
            }
            else {
                reject(err)
            }
        }, { name: parent, dataType: 'subCategories', doc: doc, data: data },
            __DEV) /* */
    })
}
function updateSubcatParentInfo(cont, parent, topparent) {
    _DBW.changePageData((done, err) => {
        if (done !== 'error') {
            console.log(done)
        }
        else {
            console.error(err)
        }
    }, { name: parent, dataType: 'subCategories', doc: topparent, data: cont }, __DEV)
}
function getTopSubcats(parent) {
    return new Promise((resolve, reject) => {
        _DBW.mixQueryPageData((done) => {
            resolve(done)
        }, { name: parent, dataType: "subCategories", query: 'top,==,true', query2: `removed,==,false` }, __DEV)
    })
}

function getChildrenSubcats(parent, subCatChildren) {
    let arr = subCatChildren
    let toPromisseArray = []
    for (let i = 0; i < arr.length; i++) {
        toPromisseArray.push(new Promise((resolve, reject) => {
            _DBW.queryPageData((done) => {
                resolve(done)
            }, { name: parent, dataType: "subCategories", query: `id,==,${arr[i]}` }, __DEV)
        }))
    }
    return Promise.race(toPromisseArray)
}
function getSubcatsData(parent, id) {
    return new Promise((resolve, reject) => {
        _DBW.getSubcatsData((done) => {
            resolve(done)
        }, { name: parent, doc: id }, __DEV)
    })
}

function getSubcat(parent, id) {
    return new Promise((resolve, reject) => {
        _DBW.getSubcatsData((done) => {
            resolve(done)
        }, { name: parent, doc: id }, __DEV)
    })
}