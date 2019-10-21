import { html } from '@polymer/polymer/polymer-element.js';
import { cmsContentTemplate } from '../templates/cms-content-template';
import { cmsSubcatsLib } from '../tools/cms-save-lib.js';
const Modelo = "eyJpbWFnZXMiOnsiY29udGVudCI6W119LCJsYW5nIjp7ImNhdGVnb3J5TmFtZSI6IiIsImxhbmciOiIiLCJkZXNjcmlwdGlvbiI6IiIsInR5cGUiOiIifX0="
const ModeloInfo = "W3siYXV0aG9yIjp7InVpZCI6IiIsIm5hbWUiOiIifSwiY2hpbGRyZW4iOltdLCJkYXRlQ3JlYXRlZCI6IiIsImlkIjoiIiwibGFzdE1vZGlmaWVkIjpbXSwicGFyZW50IjoiIiwidG9BcnRpY2xlIjoiIiwidG9wIjoiIiwiY2hpbGRyZW5Db3VudCI6MCwicmVtb3ZlZCI6ZmFsc2UsInJlbW92ZWRDaGlsZHJlbiI6W119XQ=="
class cmsSubcatsContent extends cmsSubcatsLib(cmsContentTemplate) {
    static get _getPath() {
        return html`   
         <div class="path"> 
            <h5>[[_getpreaty(query.topparentname)]] </h5>
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
            time: Number,
            nova: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true,
            },
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
        window.addEventListener('reset', (this._reset).bind(this))
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
        if (!!query.parent) {
            this.nova = false
            this.add = this.query.adTosub
            let parentName = this.query.content
            let parentIndex = query.parent
            this.set("parentName", parentName)
            let indexArr = (!!this.query.indexarr) === false ? parentIndex : this.query.indexarr
            this.set("_indexArr", indexArr)
            let arr = []
            if (!!query.add) {
                this.add = (query.add === 'true' || query.add === true)
            }
            if (!!query.added) {
                this.added = (query.added === 'true' || query.added === true)
            }

            this.closestr = `content/pages/subcategory-pages?content=${this.query.content}&update=${this.query.parent}&reset=false`
            if (routeData.page === 'add-subcategory-pages') {
                if (this.add === true) {
                    if (typeof this.time === 'number')
                        clearTimeout(this.time)
                    this._reset()
                    let cont = JSON.parse((atob(Modelo)))
                    let obj = cont.images.content
                    localStorage.setItem(`subcat-new-content-info`, atob(ModeloInfo))
                    this.imageLabel = 'images'
                    this.set('imageArr', obj)
                    this.set('str', `content/pages/add-subcategory-pages?content=subcatnotsaved`)
                    this._setContent('lang', [cont])
                    this.set('pageLangs', [])
                    this._getPageInfo(`subcat-new-content-`)
                }
            }
            if (routeData.page === 'edit-subcategory-pages') {
                if (!!query.parent) {
                    let cont = JSON.parse(localStorage[`cats-${parentName}-${parentIndex}`])
                    this._getPageInfo(`cats-${parentName}-${parentIndex}-`)
                    if (this.add === false || this.added === true) {
                        this.set('inputVal', [])
                        this.set('textareaVal', [])
                        arr = this._setLangArr(cont[0])
                        this.set('pageLangs', arr)
                        let obj = cont[0].images.content
                        this.imageLabel = 'images'
                        this.set('imageArr', obj)
                        let strg = location.search
                        strg = strg.split('lang=')[0]
                        this.set('str', `content/pages/edit-subcategory-pages${strg}lang=`)
                        if (!!query.lang) {
                            this.__setLAng(query.lang, cont)
                        }
                    }
                }
            }
        }
    }
    addImage() {
        if (this.add === false) {
            let string = `add=true&type=subcat&content=${this.inform[0].id}&parent=&${this.inform[0].parent}`
            localStorage.setItem(`cats-${this.inform[0].id}-${this.inform[0].parent}`, JSON.stringify(this.content))
            window.history.pushState({}, null, `${this.rootPath}media/galleries?${string}`);
            window.dispatchEvent(new CustomEvent('location-changed'));
        } else {
            localStorage.setItem(`subcat-not-saved`, JSON.stringify(this.content))
            let string = `add=true&type=subcat&content=subcat-not-saved`
            window.history.pushState({}, null, `${this.rootPath}media/galleries?${string}`);
            window.dispatchEvent(new CustomEvent('location-changed'));
        }
        window.onbeforeunload = function (e) {
            return "you might have changes to be saved, are you sure you whant to leave?";
        };
    }
    _getPublishedBy(publishedBy) {
        if (publishedBy !== undefined && publishedBy.length > 0) {
            let pubuser = publishedBy[0].name;
            return pubuser;
        }
    }
    onSave() {
        if (!!this.newlangstate) {
            this.add = true
        }
        let top = (this.query.top === "true")
        let data = new Date(),
            inform
        let cont = (top === false) ? JSON.parse(localStorage[`cats-${this.query.content}-${this.query.topparent}-info`]) : undefined
        inform = this.inform.pop()
        let noLang = this._lastModified(this._setInfo(inform, data), data, cont, this.query.name)
        if (!!noLang) return
        if (!this.removelang) {
            this.saveSubcats()
        } else {
            this.removeSubcatsLang()
        }
    }
    _lastModified(inform, data, cont, name) {
        if (!inform) return 1
        if (this.add === true)
            inform.lastModified.push({
                uid: this.user.uid,
                author: this.user.displayName,
                date: data.toLocaleString().replace(',', '')
            });
        this.inform = [inform]
        if (!!cont && this.add === true) {
            cont[0].children.push(this.query.name)
            cont[0].childrenCount = cont[0].children.length
            this.updateSubcatParentInfo(cont[0], this.query.content, this.query.topparent)
        }
    }
    _setInfo(inform, data) {
        let top = (this.query.top === "true")
        if (!this.newlangstate) {
            if (this.add === true) {
                if (!this.content[0].lang.lang) {
                    alert('insert lang first')
                    return undefined
                }
                this.content[0][this.content[0].lang.lang] = this.content[0].lang
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
                inform.path = this.query.topparentname
                inform.toArticle = 'B'
                inform.top = top
                inform.dateCreated = data.toLocaleString().replace(',', '')
            }
        }
        return inform
    }
    _reset() {
        this.set('tgglelang', false)
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
        /* this._debounceEvent = Debouncer.debounce(this._debounceEvent, microTask, () => {
             window.dispatchEvent(new CustomEvent('reset-list-type', {}));
         });*/
    }
}
customElements.define(cmsSubcatsContent.is, cmsSubcatsContent);