import { dataBaseworker, MediaDB } from './dataBaseWorker';
const _DBW = new dataBaseworker()
const _MEDIADBW = new MediaDB()
const __DEV = true

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
        getPageData(item) {
            let ID = item.id, hasArticle = item.data().toArticle === 'A'
            getPageData(ID).then(data => {
                let categories = this.CATS
                this.CATS = []
                this.type = 'categories'
                categories.push({ data: data, hasArticle: hasArticle })
                this.CATS = categories
                // console.log(this.CATS)
            })
        }
        parseCats(obj) {
            return obj.map((item) => {
                let obj = {}
                obj.hasArticle = item.hasArticle
                obj.name = item.data.pt.categoryName
                obj.placeholder = item.data.pt.description
                obj.title = item.data.pt.type
                obj.image = item.data.images.content[0] ? item.data.images.content[0].url : ''
                return obj
            })/**/
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
                let subCategories = []
                this.SUBCATS = []
                done.forEach(item => {
                    let ID = item.id, hasArticle = item.data().toArticle === 'A'
                    this.getSubcatsData(parent, ID).then((done) => {
                        this.type = 'subCategories'
                        subCategories.push({ data: done, hasArticle: hasArticle })
                        this.SUBCATS = subCategories
                    }).catch(err => {
                        console.error(err)
                    })
                })
            }).catch(err => {
                console.error(err)
                this.dispatchEvent(new CustomEvent('show-invalid-url-warning', {
                    bubbles: true, composed: true
                }));
            })
        }
        getSubcatsData(parent, id) {
            return getSubcatsData(parent, id)
        }
        getSubcat(parent, id) {
            getSubcat(parent, id).then((done) => {
                this._setContent(done)
                checkSpinner.call(this)
            }).catch(err => {
                console.error(err)
            })
        }
        getChildrenSubcats(parent, subCatChildren) {
            let dataObj = []
            getChildrenSubcats(parent, subCatChildren).then((done) => {
                dataObj.push(done.pop())
                this.dataObj = dataObj
            }).catch(err => {
                console.error(err)
            })/* */
        }
    }
}

/* ************************************************************************************************ */
/* *******************************************media************************************************ */
/* ************************************************************************************************ */
/* ************************************************************************************************ */

const cmsMediaLib = function cmsMediaLib(superClass) {
    return class extends superClass {
        static get is() { return 'cms-media-lib'; }
        ready() {
            super.ready();
        }
        _setGallery() {
            setGalleries(this.gall, this.newGall).then(data => {
                window.onbeforeunload = function () { };
                this.galleries = []
                this.sloted = false
                this.innerHTML = ''
                this.warningMsg = 'saved'
                this.raised = false
                setTimeout(() => {
                    this.tgglelang = !this.tgglelang
                    this._getGalleries({ q: 'removed', v: false })
                    this.warningMsg = ''
                    console.log('di it')
                }, 250)
            }).catch(error => {
                console.log(error)
            })
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
        getFilesFromStorage() {
            getFilesFromStorage(this.Path).then(files => {
                let arr = []
                files.map(file => {
                    if (typeof this.time === 'number') clearTimeout(this.time)
                    file.getDownloadURL().then(url => {
                        arr.push({ localSource: url, uploaded: 'inBD' })
                        this.time = setTimeout(() => {
                            this.IMAGES = arr
                            window.dispatchEvent(new CustomEvent('flat', {
                                bubbles: true,
                                composed: true
                            }));
                            setTimeout(() => {
                                this._openStoragePath()
                            }, 250);
                        }, 250);
                    })
                })
            }).catch(err => {
                console.error(err)
            })
        }
        setGalleryImages() {
            let str = !!this.query.type ? `media/view-images${location.search}&update=${this.query.gallery}` :
                `media/view-images?gallery=${this.query.gallery}&update=${this.query.gallery}`
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
            if (this.itemsIn === true) {
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
            } else {
                alert('no items inserted \n !!!?DROP ITEMS?!!!! || !!!?SAVE?!!!!')
            }
        }
        _promisseCallback() {
            this.fromCheckBox = false
        }
        sendToStorage(tempobj, obj, idx) {
            return new Promise((resolve, reject) => {
                let meta = { 'contentType': obj.file.type }
                storageRef.child(`${this.query.gallery}/${obj.title}`).getDownloadURL().then((url) => {
                    this.num = this.num + 1
                    tempobj[idx]['uploaded'] = 'inBD'
                    console.info('gallery/file name - already in storage - was not uploaded - %s/%s', tempobj[idx].gallery, tempobj[idx].title)
                    console.info(tempobj[idx]['uploaded'])
                    this._checkPop(tempobj)
                }).catch(() => {
                    storageRef.child(`${this.query.gallery}/${obj.title}`).put(obj.file, meta).then((snapshot) => {
                        this.num = this.num + 1
                        console.info('error 404 expected if file not in storage')
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
                    this.itemsIn = false
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

/** private methods **/

/* ************************************************************************************************ */
/* ********************************************media*********************************************** */
/* ************************************************************************************************ */
/* ************************************************************************************************ */

function getFilesFromStorage(path) {
    return new Promise((resolve, reject) => {
        const storageRef = firebase.storage().ref();
        storageRef.child(path).listAll().then((res) => {
            let arr, arr2 = []
            arr = res.items.map((itemRef) => {
                return itemRef
            });
            resolve(arr)
        }).catch(function (error) {
            reject(error)
        });
    })
}
function setGalleries(gall, content) {
    return new Promise((resolve, reject) => {
        _MEDIADBW.setGalleries((done, err) => {
            if (done !== 'error') {
                resolve(done)
            } else {
                console.log(err);
                reject(err)
            }
        }, { name: gall, create: content }, __DEV)
    })
}
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

/* ************************************************************************************************ */
/* *********************************************cats*********************************************** */
/* ************************************************************************************************ */
/* ************************************************************************************************ */

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

/* ************************************************************************************************ */
/* *******************************************subcats********************************************** */
/* ************************************************************************************************ */
/* ************************************************************************************************ */

function getTopSubcats(parent) {
    return new Promise((resolve, reject) => {
        _DBW.mixQueryPageData((done, err) => {
            if (!err) {
                resolve(done)
            } else {
                reject(err)
            }
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