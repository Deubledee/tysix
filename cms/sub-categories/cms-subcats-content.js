import { html } from '@polymer/polymer/polymer-element.js';
import { cmsContentTemplate } from '../templates/cms-content-template';
import { cmsSubcatsLib } from '../tools/cms-save-lib.js';
const Modelo = "eyJpbWFnZXMiOnsiY29udGVudCI6W119LCJsYW5nIjp7ImNhdGVnb3J5TmFtZSI6IiIsImxhbmciOiIiLCJkZXNjcmlwdGlvbiI6IiIsInR5cGUiOiIifX0="
const ModeloInfo = "W3siYXV0aG9yIjp7InVpZCI6IiIsIm5hbWUiOiIifSwiY2hpbGRyZW4iOltdLCJkYXRlQ3JlYXRlZCI6IiIsImlkIjoiIiwibGFzdE1vZGlmaWVkIjpbXSwicGFyZW50IjoiIiwidG9BcnRpY2xlIjoiIiwidG9wIjoiIiwiY2hpbGRyZW5Db3VudCI6MCwicmVtb3ZlZCI6ZmFsc2UsInJlbW92ZWRDaGlsZHJlbiI6W119XQ=="
class cmsSubcatsContent extends cmsSubcatsLib(cmsContentTemplate) {
    static get _getPath() {
        return html`   
         <div class="path"> 
            <h5>[[_getpreaty(query.path)]] </h5>
        </div>`
    }
    static get _getSideInfo() {
        return html`
        <dom-repeat repeat items="[[inform]]" as="cat">
        no items here
            <template>
                <div class="center-menu">
                    <aside class="info">
                        <span>
                            [[info]]
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
                    <aside>
                        <span>
                            [[publishedby]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[publiShed]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datepublished]]
                        </span>
                    </aside>
                </div>
                <div class="center-menu">
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.Published.publishedBy]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc" published$="[[cat.Published.state]]">
                        <span>
                            [[cat.Published.state]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.Published.date]]
                        </span>
                    </aside>
                </div>

                <div class="row-menu">
                    <aside>
                        <span>
                            [[author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datecreated]]
                        </span>
                    </aside>
                </div>
                <div class="center-menu">
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.author.name]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.dateCreated]]
                        </span>
                    </aside>
                </div>

                <div class="row-menu-especial">
                    <aside>
                        <span>
                        children Count 
                        </span>
                    </aside>
                </div>
                <div class="center-menu-especial">
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.children.length]]
                        </span>
                    </aside>
                </div>

                <div class="center-menu">
                    <aside>
                        <span>
                            [[lastmodified]]
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
                    <aside>
                        <span>
                            [[author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[date]]
                        </span>
                    </aside>
                </div>
                <div rightSide>
                    <dom-repeat repeat items="[[cat.lastModified]]" as="mod">
                        <template>
                            <section>
                                <aside class="asideBackgrc">
                                    <span>
                                        [[mod.author]]
                                    </span>
                                </aside>
                                <aside class="asideBackgrc">
                                    <span>
                                        [[mod.date]]
                                    </span>
                                </aside>
                            </section>
                        </template>
                    </dom-repeat>
                </div>
            </template>
        </dom-repeat>`
    }

    static get is() {
        return 'cms-subcats-content';
    }
    static get properties() {
        return {
            user: {
                type: Object
            },
            inputVal: {
                type: Array,
                notify: true,
                value: []
            },
            textarea: {
                type: Boolean,
                value: true,
                notify: true
            },
            textareaVal: {
                type: String,
                notify: true,
                value: ''
            },
            imageArr: {
                type: Array,
                notify: true,
                value: []
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms] //MyAppGlobals.translator
                }
            },
            lang: {
                type: String,
                notify: true,
                value: ''
            },
            langs: {
                type: Object,
                value: {}
            },
            addLangResponse: {
                type: Object,
                notify: true,
                value: {},
                observer: '_setAddLangValue'
            },
            inputResponse: {
                type: Object,
                notify: true,
                value: {},
                observer: '_setItemsValue'
            },
            textAreaResponse: {
                type: Object,
                notify: true,
                value: {},
                observer: '_setContentTextValue'
            },
            content: {
                type: Object,
                notify: true,
                value: {},
            },
            tocontent: {
                type: Object,
                notify: true,
                value: {},
            },
            Model: {
                type: Object,
                value: {}
            },
            newlangstate: {
                Boolean,
                value: false
            },
            tgglelang: {
                type: Boolean,
                value: true,
                notify: true
            },
            time: Number
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, query, active)'
        ];
    }
    ready() {
        super.ready();
        this.translator.target('cms-page-list-type-content', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-page-list-type-content', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-page-list-type-content', 'setLangObject')
        // window.addEventListener('reset', (this.__reset).bind(this))
        this.set('saveButton', this.$.saveButton)
        this.$.image.addImage = (this.addImage).bind(this)
    }
    _setValues(data) {
        this.set('temp', data)
        for (let par in data) {
            this.set('itemText', data[par])
        }
        this._setLabels(data)
    }
    _setLObj(res, querySnapshot) {
        if ('data' in querySnapshot) {
            let langs = querySnapshot.data()
            res.call(this, langs);
        }
    }
    _setLang(res, lang) {
        this.lang = lang
        res.call(this);
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeLang.call(this)
    }
    _getpreaty(str) {
        if (!!str) {
            let STR = str.split('/')
            return STR.join(' - ')
        }
    }
    _routePageChanged(routeData, query) {
        if (!!routeData.page) {
            this.add = this.query.adTosub
            let parentName = this.query.content
            let parentIndex = query.parent
            this.set("parentName", parentName)
            let indexArr = (!!this.query.indexarr) === false ? parentIndex : this.query.indexarr
            this.set("_indexArr", indexArr)
            let arr = []
            if (!!query.add) {
                this.add = (query.add === 'true')
                this.parent = parseInt(this.query.parent)
            }
            if (!!query.added) {
                this.added = (query.added === 'true')
                this.parent = parseInt(this.query.parent)
            }
            this.closestr = this.query.content === 'new-content' ? `content/pages/subcategory-pages?content=${this.query.content}` : `content/pages/subcategory-pages?content=${this.query.content}&update=${this.query.name}&reset=false`
            if (routeData.page === 'add-subcategory-pages') {
                if (this.add === true) {
                    if (typeof this.time === 'number')
                        clearTimeout(this.time)
                    this.__reset()
                    let cont = JSON.parse((atob(Modelo)))
                    let obj = cont.images.content
                    let parent = parseInt(this.query.name)
                    localStorage.setItem(`cats-${this.query.content}-${parent}-info`, atob(ModeloInfo))
                    this.imageLabel = 'images'
                    this.set('imageArr', obj)
                    this.set('str', `content/pages/add-subcategory-pages?content=${this.query.content}`)
                    this._setContent('lang', [cont])
                    this.set('pageLangs', [])
                    this._getPageInfo(`cats-${query.content}-${parent}-`)
                }
            }
            if (routeData.page === 'edit-subcategory-pages') {
                if (!!query.name) {
                    if (this.add === false || this.added === true) {
                        let cont = JSON.parse(localStorage[`cats-${query.content}-${query.name}`])
                        this._getPageInfo(`cats-${query.content}-${query.name}-`)
                        this.set('inputVal', [])
                        this.set('textareaVal', [])
                        arr = this._setLangArr(cont[0])
                        let obj = cont[0].images.content
                        this.imageLabel = 'images'
                        let strg = location.search
                        strg = strg.split('lang=')[0]
                        this.set('str', `content/pages/edit-subcategory-pages${strg}lang=`)
                        if (!!query.lang) {
                            if (query.lang !== 'lang')
                                this.set('pageLangs', arr)
                            this.__setLAng(query.lang, cont)
                            this._setContent(query.lang, cont)
                            this.set('imageArr', obj)
                        }
                    }
                }
            }
        }
    }
    addImage() {
        if (this.add === false) {
            let string = `type=cats&content=${this.inform[0].parent}&name=${this.inform[0].id}&lang=${this.query.lang}&path=${this.inform[0].path}&add=${this.add}&top=${this.query.top}&parent=${this.query.parent}`
            localStorage.setItem(`cats-${this.inform[0].parent}-${this.inform[0].id}`, JSON.stringify(this.content))
            window.history.pushState({}, null, `${this.rootPath}media/galleries?${string}`);
            window.dispatchEvent(new CustomEvent('location-changed'));
        } else {
            let parent = parseInt(this.query.name)
            let string = `type=cats&content=${this.query.content}&name=${this.query.name}&lang=lang&path=${this.query.path}&add=${this.add}&top=${this.query.top}&parent=${this.query.parent}`
            localStorage.setItem(`cats-${this.query.content}-${parent}`, JSON.stringify(this.content))
            window.history.pushState({}, null, `${this.rootPath}media/galleries?${string}`);
            window.dispatchEvent(new CustomEvent('location-changed'));
        }
        window.onbeforeunload = function (e) {
            return ''
        };
    }
    onSave() {
        if (!!this.newlangstate) {
            this.add = true
        }
        let top = (this.query.top === "true"), data = new Date(), inform
        let parentInfo = (top === false) ? JSON.parse(localStorage[`cats-${this.query.content}-${this.query.parent}-info`]) : undefined
        inform = this.inform.pop()
        let noLang = this._lastModified(this._setInfo(inform, data, parentInfo), data)
        if (!!noLang) return
        if (!this.removelang) {
            this.saveSubcats()
        } else {
            this.removeSubcatsLang()
        }
    }
    _lastModified(inform, data) {
        if (!inform) return 1
        if (this.add === true)
            inform.lastModified.push({
                uid: this.user.uid,
                author: this.user.displayName,
                date: data.toLocaleString().replace(',', '')
            });
        this.inform = [inform]
    }
    _setInfo(inform, data, parentInfo) {
        let top = (this.query.top === "true")
        if (!this.newlangstate) {
            if (this.add === true) {
                if (!this.content[0].lang.lang) {
                    alert('insert lang first')
                    return undefined
                }
                this.content[0][this.content[0].lang.lang] = this.content[0].lang
                let lang = [this.content[0].lang.lang]
                lang = lang.pop()
                delete this.content[0].lang
                inform.ref = btoa(this.query.content) + '-' + btoa(Math.ceil(Math.random(Math.ceil(Math.random() * 20)) * 10000) +
                    Math.ceil(Math.random(Math.ceil(Math.random() * 30)) * 10000))
                inform.Published = {}
                inform.Published.date = 'NP'
                inform.Published.publishedBy = 'N/A'
                inform.Published.state = 'NP'
                inform.Published.unPublishedBy = 'N/A'
                inform.author.uid = this.user.uid
                inform.author.name = this.user.displayName
                inform.parent = this.query.content
                inform.id = this.query.name
                inform.removed = false
                inform.path = [this.query.path, this.content[0][lang].categoryName]
                inform.toArticle = 'B'
                inform.top = top
                inform.dateCreated = data.toLocaleString().replace(',', '')
                if (!!parentInfo) {
                    parentInfo[0].children = []
                    parentInfo[0].children.push(inform.id)
                    parentInfo[0].childrenCount = inform.children.length
                    this.updateSubcatParentInfo(parentInfo[0], this.query.content, this.query.parent)
                }
            }
        }
        return inform
    }
    __reset() {
        this.set('tgglelang', true)
        this.set('removelang', false)
        this.set('newlangstate', false)
        this.set('addlang', false)
        this.set('newLang', '')
        this.set('removeArr', [])
        this.set('pageLangs', [])
        this.set('content', []);
        this.set('imageArr', [])
        this.set('inform', [])
        this.set('inputVal', [])
        this.set('textareaVal', [])
        this.set('itemlang', []);
        console.log('here')
        /* this._debounceEvent = Debouncer.debounce(this._debounceEvent, microTask, () => {
             window.dispatchEvent(new CustomEvent('reset-list-type', {}));
         });*/
    }
}
customElements.define(cmsSubcatsContent.is, cmsSubcatsContent);