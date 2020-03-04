import { dataBaseworker, MediaDB, CategoriesDB } from './dataBaseWorker';
const _DBW = new dataBaseworker()
const _MEDIADBW = new MediaDB()
const _CATEGORIESDBW = new CategoriesDB()
const __DEV = true
var storageRef = firebase.storage().ref();

export { cmsMediaLib, cmsPagesLib, cmsSubcatsLib, cmsArticlesLib, cmscategoriesLib, cmslangsLib }
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
            }).catch(standartErr)
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
            }).catch(standartErr)
        }
        _removeLang() {
            let t = { content: this.query.content, type: 'data', langArr: this.removeArr }
            window.history.pushState({}, null, `${this.rootPath}content/pages?reset=true`)
            deletePageData(t).then(() => {
                window.onbeforeunload = function () { };
                this.editing = 0;
                localStorage.clear()
                this.__reset();
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('location-changed'))
                }, 500)
                console.log('removed lang: %s')
            }).catch(standartErr)
        }
        savePages() {
            if (this.add === true) {
                if (!!this.inform[0].id) {
                    window.history.pushState({}, null, `${this.rootPath}content/pages?reset=true`)
                    saveAdded(this.inform[0].id, this.inform[0]).then(data => {
                        if (data !== 'error') {
                            saveAddedData('data', this.inform[0].id, this.content[0]).then(data => {
                                window.onbeforeunload = function () { };
                                this.editing = 0;
                                localStorage.clear()
                                this.__reset();
                                setTimeout(() => {
                                    window.dispatchEvent(new CustomEvent('location-changed'))
                                }, 500)
                            })
                        }
                    }).catch(standartErr)
                }
            } else
                if (this.add === false) {
                    if (!!this.inform[0].id) {
                        window.history.pushState({}, null, `${this.rootPath}content/pages?reset=true`)
                        saveChanged(this.inform[0].id, this.inform[0]).then(() => {
                            saveChangedData('data', this.inform[0].id, this.content[0]).then(() => {
                                window.onbeforeunload = function () { };
                                this.editing = 0;
                                localStorage.clear()
                                this.__reset();
                                setTimeout(() => {
                                    window.dispatchEvent(new CustomEvent('location-changed'));
                                }, 500)
                            })/* */
                        }).catch(standartErr)
                    }
                }
        }

        removePage() {
            let str = `${this.rootPath}content/pages?reset=true`
            window.onbeforeunload = function () { };
            saveChanged(this.objInfo[0].id, this.objInfo[0]).then(() => {
                window.history.pushState({}, null, str)
                window.onbeforeunload = function () { };
                localStorage.clear()
                this.__reset()
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('location-changed'))
                }, 250)

            }).catch(standartErr)
            if (this.objInfo[0].toArticle === "A") {

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
        getTopSubcats(parent, render, spinnerOutTemplate) {
            getTopSubcats(parent).then(done => {
                if (!!done && done.length > 0) {
                    render(spinnerOutTemplate(), this);
                    this.subSubCats = done
                } else {
                    this.subSubCats = ''
                }
            }).catch(standartErr)
        }
        getSubcat(parent, id) {
            getSubcat(parent, id).then((done) => {
                this._setContent(done)
            }).catch(standartErr)
        }
        getChildrenSubcats(parent, subCatChildren) {
            let dataObj = []
            getChildrenSubcats(parent, subCatChildren).then((done) => {
                dataObj.push(done.pop())
                this.dataObj = dataObj
            }).catch(standartErr)
        }
        getSubcatsData(parent, id) {
            getSubcatsData(parent, id).then((done) => {
                this._setContent(done)
            }).catch(standartErr)
        }
        __checkEqual() {
            getSubcatsData(this.parent, this.subcat.id).then((done) => {
                this._setContent(done)
            }).catch(standartErr)
        }
        __checkBigger(data, temp, index2) {
            if (data[index2 - 1] === temp[index2 - 1]) {
                getSubcatsData(this.parent, this.subcat.id).then((done) => {
                    this._setContent(done)
                    this._toggleChildren()
                }).catch(standartErr)
            } else {
                getSubcatsData(this.parent, this.subcat.id).then((done) => {
                    this._setContent(done)

                }).catch(standartErr)
            }
        }
        saveSubcats() {
            let str = `${this.rootPath}content/pages/subcategory-pages?content=${this.inform[0].parent}&update=${this.query.name}&reset=true`
            this.ctnOpened = false
            if (this.add === true) {
                saveAddedSubcat(this.inform[0].parent, this.inform[0].id, this.inform[0]).then(() => {
                    saveAddedSubcatData(this.inform[0].parent, this.inform[0].id, this.content[0]).then(() => {
                        window.history.pushState({}, null, str)
                        window.onbeforeunload = function () { };
                        localStorage.clear()
                        this.__reset();
                        setTimeout(() => {
                            window.dispatchEvent(new CustomEvent('location-changed'))
                        }, 500)
                    }).catch(standartErr)
                }).catch(standartErr)
            }
            if (this.add === false) {
                saveChangedSubcat(this.inform[0].parent, this.inform[0].id, this.inform[0]).then(() => {
                    saveChangedSubcatData(this.inform[0].parent, this.inform[0].id, this.content[0]).then(() => {
                        window.history.pushState({}, null, str)
                        window.onbeforeunload = function () { };
                        localStorage.clear()
                        this.__reset();
                        setTimeout(() => {
                            window.dispatchEvent(new CustomEvent('location-changed'));
                        }, 500)
                    }).catch(standartErr)
                }).catch(standartErr)
            }
        }
        removeSubcatsLang() {
            let str = `${this.rootPath}content/pages/subcategory-pages?content=${this.inform[0].parent}&reset=true&update=${this.inform[0].id}`
            deleteSubcatData(this.inform[0].parent, this.inform[0].id, this.removeArr).then(() => {
                window.history.pushState({}, null, str)
                window.onbeforeunload = function () { };
                this.__reset()
                localStorage.clear()
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('location-changed'))
                }, 250)
            }).catch(standartErr)
        }
        updateSubcatParentInfo(cont, parent, id) {
            updateSubcatParentInfo(cont, parent, id)
        }
        removeSubcats(cont, parent, id) {
            let str
            if (!!cont) {
                str = `${this.rootPath}content/pages/subcategory-pages?content=${parent}&reset=true&update=${id}`
                cont[0].children = cont[0].children.filter(item => { if (item !== this.subcat.id) return item })
                cont[0].childrenCount = cont[0].childrenCount--
                cont[0].removedChildren.push(this.subcat.id)
                updateSubcatParentInfo(cont[0], parent, id)
                window.history.pushState({}, null, str)
                window.onbeforeunload = function () { };
                saveChangedSubcat(parent, this.subcat.id, this.subcat).then(() => {
                    window.onbeforeunload = function () { };
                    localStorage.clear()
                    setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('location-changed'))
                    }, 250)
                }).catch(standartErr)
            } else {
                str = `${this.rootPath}content/pages/subcategory-pages?content=${parent}&reset=true`
                saveChangedSubcat(parent, id, this.subcat).then(() => {
                    window.history.pushState({}, null, str)
                    window.onbeforeunload = function () { };
                    setTimeout(() => {
                        window.dispatchEvent(new CustomEvent('location-changed'))
                    }, 250)
                }).catch(standartErr)

            }
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
                this.warningMsg = 'saved'
                this.raised = false
                setTimeout(() => {
                    this.tgglelang = !this.tgglelang
                    this._getGalleries({ q: 'removed', v: false })
                    this.warningMsg = ''
                    console.log('di it')
                }, 250)
            }).catch(standartErr)
        }
        _getGalleries(query) {
            getNRGalleries(query).then(data => {
                this.set('galleries', data)
            }).catch(standartErr)
        }
        _getAllGalleries() {
            getRnNRGallerries().then(data => {
                this.set('galleries', data)
            }).catch(standartErr)
        }
        getGalleryImages(gallery, query) {
            getGalleryImages(gallery, query).then(data => {

                this.set('IMAGES', data)
            }).catch(standartErr)
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
            }).catch(standartErr)
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
            }).catch(standartErr)
        }
        removeGallerie(data) {
            removeGalleries(data).then(() => {
                this.setter = true
            }).catch(error => {
                console.log(error)
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


//standart error callback function
function standartErr(err) {
    throw err
}
/* ************************************************************************************************ */
/* **********************************************langs********************************************* */
/* ************************************************************************************************ */
/* ************************************************************************************************ */

const cmslangsLib = function (superClass) {
    return class extends superClass {
        static get is() { return 'cms-media-lib'; }
        ready() {
            super.ready();
        }

        getLangs() {
            return getLangs()
        }

        setLangs(data) {
            setLangs(data).then(() => {
                console.log('art saved')
            }).catch(standartErr)
        }

        removeLangs(id, inform) {
            removeLangs(id, inform).then(() => {
                console.log('art removed')
            }).catch(standartErr)
        }
    }
}

/* ************************************************************************************************ */
/* **********************************************langs********************************************* */
/* ************************************************************************************************ */
/* ************************************************************************************************ */

function getLangs() {
    return new Promise((resolve, reject) => {
        _DBW.getLangs((done) => {
            if (done !== 'error') {
                resolve(done)
            } else {
                reject(error)
            }
        }, __DEV)
    })
}

function setLangs(id, inform) {
    return new Promise((resolve, reject) => {
        _DBW.setCategories((msg, err) => {
            if (msg !== 'error') {
                resolve(msg)
            }
            else {
                reject(err)
            }
        }, { name: id, create: inform }, __DEV);/* */
    })
}

/* ************************************************************************************************ */
/* *******************************************categories******************************************* */
/* ************************************************************************************************ */
/* ************************************************************************************************ */

const cmscategoriesLib = function (superClass) {
    return class extends superClass {
        static get is() { return 'cms-media-lib'; }
        ready() {
            super.ready();
        }

        getCategories(query) {
            return getCategories(query)
        }

        setCategories(id, inform) {
            setCategory(id, inform).then(() => {
                console.log('art saved')
            }).catch(standartErr)
        }

        removeCategory(id, inform) {
            removeCategory(id, inform).then(() => {
                console.log('art removed')
            }).catch(standartErr)
        }
    }
}

/* ************************************************************************************************ */
/* *******************************************categories******************************************* */
/* ************************************************************************************************ */
/* ************************************************************************************************ */

function getCategories(query) {
    if (!query)
        return new Promise((resolve, reject) => {
            _CATEGORIESDBW.getCategories((done) => {
                if (done !== 'error') {
                    resolve(done)
                } else {
                    reject(error)
                }
            }, __DEV)
        })

    if (query)
        return new Promise((resolve, reject) => {
            _CATEGORIESDBW.getCategoriesEqualTo((done, error) => {
                if (done !== 'error') {
                    resolve(done)
                } else {
                    reject(error)
                }
            }, query.q, query.v, __DEV)
        })
}

function setCategory(id, inform) {
    return new Promise((resolve, reject) => {
        _CATEGORIESDBW.setCategories((msg, err) => {
            if (msg !== 'error') {
                resolve(msg)
            }
            else {
                reject(err)
            }
        }, { name: id, create: inform }, __DEV);/* */
    })
}

function removeCategory(id, inform) {
    return new Promise((resolve, reject) => {
        _CATEGORIESDBW.changeCategory((done, err) => {
            if (done !== 'error') {
                resolve()
            } else {
                reject()
                console.error(err)
            }
        }, { name: id, update: inform }, __DEV)
    })
}

/* ************************************************************************************************ */
/* *******************************************articles********************************************** */
/* ************************************************************************************************ */
/* ************************************************************************************************ */


const cmsArticlesLib = function (superClass) {
    return class extends superClass {
        static get is() { return 'cms-media-lib'; }
        ready() {
            super.ready();
        }
        getArticles(query) {
            getArticles(query).then(data => {
                data.forEach(item => {
                    this.getArticleData(item.id, 'data').then(art => {
                        this._setContent(item.data(), art)
                    }).catch(standartErr) /**/
                })
            }).catch(standartErr)
        }

        getArticleData(id, type) {
            return getArticleData(id, type)
        }
        removeArticle(item) {
            let id = [this.objInfo.id]
            let Cont = item.data
            this.set('INFO', this._lastModifiedRemoved(Cont))
            window.history.pushState({}, null, `${this.rootPath}content/articles?reset=true`)
            saveChangedArticle(id[0], this.objInfo).then(res => {
                window.onbeforeunload = function () { };
                localStorage.clear()
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent('location-changed'));
                }, 500)
                saveChangedArticleInfo('info', id[0], this.INFO).then(() => {
                }).catch(standartErr)
            }).catch(standartErr)
        }
        saveArticles() {
            if (this.add === false) {
                if (!!this.inform.id) {
                    window.history.pushState({}, null, `${this.rootPath}content/articles?reset=true`)
                    let id = [this.inform.id]
                    saveChangedArticle(id[0], this.inform).then(res => {
                        saveChangedArticleData('data', id[0], this.content[0]).then((d) => {
                            window.onbeforeunload = function () { };
                            localStorage.clear()
                            setTimeout(() => {
                                window.dispatchEvent(new CustomEvent('location-changed'));
                                this._reset();
                            }, 500)
                            saveChangedArticleInfo('info', id[0], this.INFO).then(() => {
                            }).catch(standartErr)
                        }).catch(standartErr)
                    }).catch(standartErr)
                }
            }
            if (this.add === true) {
                if (!!this.inform.id) {
                    window.history.pushState({}, null, `${this.rootPath}content/articles?reset=true`)
                    let id = [this.inform.id]
                    setArticles(id[0], this.inform).then(() => {
                        saveAddedArticleData('data', id[0], this.content[0]).then(() => {
                            window.onbeforeunload = function () { };
                            localStorage.clear()
                            setTimeout(() => {
                                window.dispatchEvent(new CustomEvent('location-changed'));
                                this._reset();
                            }, 500)
                            saveAddedArticleInfo('info', id[0], this.INFO).then(() => {
                            }).catch(standartErr)
                        }).catch(standartErr)
                    }).catch(standartErr)
                }
            }
        }
        _setLangArr(cont) {
            return _setLangArr(cont)
        }
        _lastModifiedRemoved(ifo) {
            let INFO = ifo
            let data = new Date()
            INFO.removedBy = this.user.name
            INFO.removeedDate = data
            INFO.lastModifeid.push({
                author: this.user.name,
                date: data.toLocaleString().replace(',', ''),
                uid: this.user.uid
            });
            return INFO
        }
    }
}

/* ************************************************************************************************ */
/* *******************************************articles********************************************** */
/* ************************************************************************************************ */
/* ************************************************************************************************ */

function getArticles(query) {
    if (!query)
        return new Promise((resolve, reject) => {
            _DBW.getAllArticles((done) => {
                resolve(done)
            }, __DEV)
        })

    if (query)
        return new Promise((resolve, reject) => {
            _DBW.getArticlesEqualTo((done, error) => {
                if (done !== 'error') {
                    resolve(done)
                } else {
                    reject(error)
                }
            }, query.q, query.v, __DEV)
        })
}

function getArticleData(id, type) {
    return new Promise((resolve, reject) => {
        _DBW.getArticleData((done2) => {
            resolve(done2)
        }, { name: id, dataType: type }, __DEV)/* */
    })
}

function setArticles(id, inform) {
    return new Promise((resolve, reject) => {
        _DBW.setArticles((msg, err) => {
            if (msg !== 'error') {
                resolve(msg)
            }
            else {
                reject(err)
            }
        }, { name: id, create: inform }, __DEV);/* */
    })
}
function saveAddedArticleInfo(type, id, INFO) {
    if (id !== 'undefined') {
        return new Promise((resolve, reject) => {
            _DBW.setArticleData((done) => {
                if (done !== 'error') {
                    resolve(done)
                } else {
                    reject(done)
                }
            }, { name: id, dataType: type, doc: 'data', data: INFO }, __DEV);
        })
    }
}

function saveAddedArticleData(type, id, content) {
    let toPromisse = []
    for (let par in content) {
        toPromisse.push(new Promise((resolve, reject) => {
            _DBW.setArticleData((done, err) => {
                if (done !== 'error') {
                    resolve(done)
                } else {
                    reject(done)
                }
            }, { name: id, dataType: type, doc: par.toString(), data: content[par] }, __DEV);/* */
        }))
    }
    return Promise.race(toPromisse)
}

function saveChangedArticle(id, inform) {
    return new Promise((resolve, reject) => {
        _DBW.updateArticles((msg, err) => {
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
function saveChangedArticleInfo(type, id, INFO) {
    if (!!id) {
        return new Promise((resolve, reject) => {
            _DBW.changeArticleData((done) => {
                if (done !== 'error') {
                    resolve(true)
                } else {
                    reject(done)
                }
            }, { name: id, dataType: type, doc: 'data', data: INFO }, __DEV);
        })
    }
}
function saveChangedArticleData(type, id, content) {
    let toPromisse = []
    if (!!id) {
        for (let par in content) {
            toPromisse.push(new Promise((resolve, reject) => {
                _DBW.changeArticleData((done, err) => {
                    if (done !== 'error') {
                        resolve(true)
                    }
                }, { name: id, dataType: type, doc: par.toString(), data: content[par] }, __DEV);
            }))
        }/**/
    }
    return Promise.race(toPromisse)
}
function deleteArticleData(t) {
    let toPromisse = []
    for (let i = 0; i < t.langArr.length; i++) {
        toPromisse.push(new Promise((resolve, reject) => {
            _DBW.deleteArticles((done, err) => {
                console.log(done)
                if (done !== 'error') {
                    resolve(done)
                }
                else {
                    reject(err)
                }
            }, { name: t.content, dataType: t.type, doc: t.langArr[i] }, __DEV)
        }))
    }
    return Promise.race(toPromisse)
}


/* ************************************************************************************************ */
/* *******************************************galleries******************************************** */
/* ************************************************************************************************ */
/* ************************************************************************************************ */




function getFilesFromStorage(path) {
    return new Promise((resolve, reject) => {
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
    if (id !== 'undefined') {
        for (let par in content) {
            toPromisse.push(new Promise((resolve, reject) => {
                _DBW.changePageData((done, err) => {
                    if (done !== 'error') {
                        resolve(true)
                    }
                }, { name: id, dataType: type, doc: par.toString(), data: content[par] }, __DEV);
            }))
        }/**/
    }
    return Promise.race(toPromisse)
}
function deletePageData(t) {
    let toPromisse = []
    for (let i = 0; i < t.langArr.length; i++) {
        toPromisse.push(new Promise((resolve, reject) => {
            _DBW.deletePageData((done, err) => {
                console.log(done)
                if (done !== 'error') {
                    resolve(done)
                }
                else {
                    reject(err)
                }
            }, { name: t.content, dataType: t.type, doc: t.langArr[i] }, __DEV)
        }))
    }
    return Promise.race(toPromisse)
}

/* ************************************************************************************************ */
/* *******************************************subcats********************************************** */
/* ************************************************************************************************ */
/* ************************************************************************************************ */
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
        }, { name: parent, dataType: 'subCategories', doc: doc, data: inform }, __DEV);
    })
}

function saveAddedSubcatData(parent, name, content) {
    let toPromisse = []
    for (let par in content) {
        if (!!par)
            toPromisse.push(new Promise((resolve, reject) => {
                _DBW.setubcatsData((done, err) => {
                    if (done !== 'error') {
                        resolve(done)
                    }
                }, { page: parent, name: name, doc: par.toString(), data: content[par] }, __DEV);
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
                __DEV)

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
            __DEV)
    }) /* */
}
function updateSubcatParentInfo(cont, parent, topparent) {
    _DBW.changePageData((done, err) => {
        if (done !== 'error') {
        }
        else {
            console.error(err)
        }
    }, { name: parent, dataType: 'subCategories', doc: topparent, data: cont }, __DEV)
}
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


///
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
