import { html } from '@polymer/polymer/polymer-element.js';
import { cmsContentTemplate } from '../templates/cms-content-template';
import { cmsPagesLib } from '../tools/cms-save-lib.js';
const Modelo = "eyJpbWFnZXMiOnsiY29udGVudCI6W119LCJsYW5nIjp7ImNhdGVnb3J5TmFtZSI6IiIsImxhbmciOiIiLCJkZXNjcmlwdGlvbiI6IiIsInR5cGUiOiIifX0="
const ModeloInfo = "W3siUHVibGlzaGVkIjp7ImRhdGUiOiIiLCJwdWJsaXNoZWRCeSI6Ik4vQSIsInN0YXRlIjoiTi9QIn0sImF1dGhvciI6eyJpZCI6IiIsIm5hbWUiOiIifSwiZGF0ZUNyZWF0ZWQiOiIiLCJpZCI6IiIsInN1YkNhdGVnb3J5Q291bnQiOiIiLCJ0b0FydGljbGUiOmZhbHNlLCJ0eXBlIjoiIiwibGFzdE1vZGlmaWVkIjpbXX1d"
class cmsPageCatsContent extends cmsPagesLib(cmsContentTemplate) {
    static get _getSideInfo() {
        return html`
        <dom-repeat repeat items="[[inform]]" as="cat">
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
                    </aside>.str
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
        return 'cms-page-cats-content';
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
            ctnOpened: {
                type: Boolean,
                notify: true,
            },
            opened: {
                type: Boolean,
                notify: true,
                observer: '_checkIfClose'
            },
            getdown: {
                type: Boolean,
                reflectToAttribute: true,
                notify: true,
                value: false,
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
            langStr: String,
            time: Number
        }
    }
    static get observers() {
        return [
            '_routePageChanged(route.path, query)'
        ];
    }
    ready() {
        super.ready();
        this.translator.target('cms-page-list-type-content', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-page-list-type-content', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-page-list-type-content', 'setLangObject')
        this.$.image.addImage = (this.addImage).bind(this)
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
        this._checkLabel()
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeLang.call(this)
        this._checkLabel()
    }
    _checkLabel() {
        if (this.add === true) {
            this.translator.changeItemTitleLang.call(this, 'addPage', 'navLabel')
        } else {
            this.translator.changeItemTitleLang.call(this, 'editPage', 'navLabel')
        }
    }
    _checkIfClose(data) {
        if (data === false && this.ctnOpened === true) {
            this.$.closeanchor.click();
            this.ctnOpened = false
        }
    }
    _routePageChanged(path, query) {
        if (!path) {
            if (!!this.ctnOpened) {
                this.ctnOpened = false
                setTimeout(() => {
                    if (!!this.$.overlay.opened) {
                        this.$.overlay.close()
                        this.ctnOpened = false
                    }
                }, 500)
            }
        }
        if (!!path) {
            this._reset()
            this.scrollTo(0, 0)
            if (!!query.add) {
                this.add = (query.add === 'true')
            }
            if (!!query.added) {
                this.added = (query.added === 'true')
            }
            if (!!this.langs[this.lang]) this._checkLabel()
            this.closestr = 'content/pages'
            if (path === '/add-category-pages' || path === '/edit-category-pages') {
                if (!this.$.overlay.opened) {
                    this.$.overlay.open()
                    this.ctnOpened = true
                }
                if (path === '/add-category-pages') {
                    this._setAddedContent(query)
                }
                if (path === '/edit-category-pages') {
                    if (!!localStorage[`page-${query.content}`]) {
                        this._setEditContent(query)
                        return
                    }
                }
            } else {
                this.ctnOpened = false
                this.$.overlay.close()
            }
        }
    }
    addImage() {
        if (this.add === false) {
            localStorage[`page-${this.query.content}`] = JSON.stringify(this.content)
            let string = `type=page&content=${this.query.content}&lang=${this.query.lang}&add=${this.add}`
            window.history.pushState({}, null, `${this.rootPath}media/galleries?${string}`);
            window.dispatchEvent(new CustomEvent('location-changed'));
        } else {
            localStorage[`page-new-content`] = JSON.stringify(this.content)
            let string = `type=page&content=new-content&lang=lang&add=${this.add}`
            window.history.pushState({}, null, `${this.rootPath}media/galleries?${string}`);
            window.dispatchEvent(new CustomEvent('location-changed'));
        }
        window.onbeforeunload = function (e) {
            return "you might have changes to be saved, are you sure you whant to leave?";
        };
    }

    _setAddedContent() {
        if (this.add === true) {
            let cont = JSON.parse(atob(Modelo))
            localStorage[`page-new-content-info`] = atob(ModeloInfo)
            let obj = cont.images.content
            this.imageLabel = 'images'
            this.set('imageArr', obj)
            this.set('str', `content/pages/add-category-pages?content=pagenotsaved`)
            this._setContent('lang', [cont])
            this._getPageInfo(`page-new-content-`)
            this.set('pageLangs', [])
            return
        }
    }

    _setEditContent(query) {
        let strg = location.search
        strg = strg.split('lang=')[0]
        this.set('str', `content/pages/edit-category-pages${strg}lang=`)
        this.imageLabel = 'images'
        let arr, cont, images
        this.set('imageArr', images)
        if (this.add === false || this.added === true) {
            [arr, cont, images] = generateData.call(this, query)
            this.set('imageArr', images)
            if (!!query.lang) {
                if (query.lang !== 'lang')
                    this.set('pageLangs', arr)
                this.__setLAng(query.lang, cont)
            }
        }
    }

    onSave() {
        let data = new Date(), inform
        inform = this.inform.pop()
        let noLang = this._lastModified(this._setInfo(inform, data), data)
        if (!!noLang) return
        if (!!this.removelang) {
            this._removeLang()
            return
        }
        if (!!this.newlangstate) this.add = true
        this.savePages()
    }
    _lastModified(inform, data) {
        if (!inform) return 1
        if (this.add === true)
            inform.lastModified.push({
                uid: this.user.uid,
                author: this.user.name,
                date: data.toLocaleString().replace(',', '')
            });
        this.inform = [inform]
    }
    _setInfo(inform, data) {
        if (!this.newlangstate) {
            if (this.add === true) {
                if (!this.content[0].lang.lang && !this.content[0].lang.categoryName) {
                    alert('insert Lang & Category Name first')
                    return undefined
                }
                this.content[0][this.content[0].lang.lang] = this.content[0].lang
                inform.id = this.content[0][this.content[0].lang.lang].categoryName.toLowerCase()
                inform.ref = btoa(this.content[0][this.content[0].lang.lang].categoryName)
                inform.type = this.content[0][this.content[0].lang.lang].type
                delete this.content[0].lang
                inform.Published.date = 'NP'
                inform.Published.publishedBy = 'N/A'
                inform.Published.state = 'NP'
                inform.author.id = this.user.uid
                inform.author.name = this.user.name
                inform.path = [inform.id]
                inform.toArticle = 'B'
                inform.removed = false
                inform.dateCreated = data.toLocaleString().replace(',', '')
            } else {
                if (inform.type === "")
                    inform.type = this.content[0][this.setContetnLang].type
            }
        }
        return inform
    }
    _reset() {
        this.imageLabel = ''
        this.set('content', []);
        this.set('imageArr', [])
        this.set('inform', [])
        this.set('inputVal', [])
        this.set('textareaVal', [])
    }

}
customElements.define(cmsPageCatsContent.is, cmsPageCatsContent);

function* generateData(query) {
    let cont = JSON.parse(localStorage[`page-${query.content}`])
    yield this._setLangArr(cont[0])
    yield cont
    this._getPageInfo(`page-${query.content}-`)
    yield cont[0].images.content
}
