import { cmsContentTemplate } from '../templates/cms-content-template';
import { html } from '@polymer/polymer/polymer-element.js';
const Modelo = "eyJpbWFnZXMiOnsiY29udGVudCI6W119LCJsYW5nIjp7ImNhdGVnb3J5TmFtZSI6IiIsImxhbmciOiIiLCJkZXNjcmlwdGlvbiI6IiIsInR5cGUiOiIifX0="
class cmsPageCatsContent extends cmsContentTemplate {
    static get _getSideInfo() {
        return html`
        <dom-repeat repeat items="[[inform]]" as="cat">
        no items here
            <template>
                <div class="center-menu">
                    <aside>
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
    static get is() { return 'cms-page-cats-content'; }
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
                    return MyAppGlobals.translator
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
            hidebottom: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
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
                value: {
                }
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
        window.addEventListener('reset', (this._reset).bind(this))
        this.set('saveButton', this.$.saveButton)
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
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeLang.call(this)
    }

    _routePageChanged(routeData, query, active) {
        if (!!routeData.page) {
            let arr = []
            if (!!this.route) {
                let arr2 = []
                arr2.push('home')
                arr2.push(this.route.prefix)
                this.set('trigger', arr2)
            }
            if (!!query.add) {
                this.add = (query.add === 'true' || query.add === true)
            }
            if (!!query.added) {
                this.added = (query.added === 'true' || query.added === true)
            }
            if (active === true && routeData.page === 'add-category-pages') {
                if (this.add === true) {
                    let cont = JSON.parse(atob(Modelo))
                    let obj = cont.images.content
                    this.imageLabel = 'images'
                    this.set('imageArr', obj)
                    this.set('str', `content/pages/add-category-pages?content=pagenotsaved`)
                    this._setContent('lang', [cont])
                    this.set('pageLangs', [])
                }
            }
            if (active === true && routeData.page === 'edit-category-pages') {
                this.set('content', []);
                this.$.saveButton.classList.add('diferent')
                if (!!this.added) {
                    this.$.saveButton.classList.remove('diferent')
                }
                if (!!query.content) {
                    let cont = JSON.parse(localStorage[`page${query.content}`])
                    if (this.add === false || this.added === true) {
                        this.set('inputVal', [])
                        this.set('textareaVal', [])
                        if (!!query.lang) {
                            this._setContent(query.lang, cont)
                        } else {
                            for (let par in cont[0]) {
                                if (par !== 'images') {
                                    arr.push(par)
                                }
                            }
                            let obj = cont[0].images.content
                            this.imageLabel = 'images'
                            this.set('imageArr', obj)
                            this.set('str', `content/pages/edit-category-pages?content=${query.content}&add=${this.add}`)
                            this.set('pageLangs', arr)
                        }
                    }
                }
            }
        }
    }
    addImage() {
        if (this.add === false) {
            localStorage[`page${this.query.content}`] = JSON.stringify(this.content)
            let string = `addimageto=page&method=editPages&content=${this.query.content}`
            window.history.pushState({}, null, `${this.rootPath}media/images/galleries?${string}`);
            window.dispatchEvent(new CustomEvent('location-changed'));
            window.onbeforeunload = function (e) {
                return "you might have changes to be saved, are you sure you whant to leave?";
            };
        } else {
            localStorage[`pagenotsaved`] = JSON.stringify(this.content)
            let string = `addimageto=page&method=editPages&content=notsaved`
            window.history.pushState({}, null, `${this.rootPath}media/images/galleries?${string}`);
            window.dispatchEvent(new CustomEvent('location-changed'));
            window.onbeforeunload = function (e) {
                return "you might have changes to be saved, are you sure you whant to leave?";
            }
        }
    }
    _getPublishedBy(publishedBy) {
        if (publishedBy !== undefined && publishedBy.length > 0) {
            let pubuser = publishedBy[0].name;
            return pubuser;
        }
    }
    onSave() {
        this.save((set) => {
            let data = new Date()
            if (set === true) {
                this.inform.Published.date = 'NP'
                this.inform.Published.publishedBy = 'N/A'
                this.inform.Published.state = 'NP'
                this.inform.Published.unPublishedBy
                this.inform.author.uid = this.user.uid
                this.inform.author.name = this.user.displayName
                this.inform.dateAdded = data.toLocaleString().replace(',', '')
            }
            this.inform.lastModified.pages.push({
                uid: this.user.uid,
                author: this.user.displayName,
                date: data.toLocaleString().replace(',', '')
            });
            this.translator._DBW.setPageData((done) => {
                if (done === 'error') {
                    console.log(done)
                }
            }, { name: this.content.id, dataType: 'info', data: this.inform }, this.translator.__DEV)
        })
    }
    _reset() {
        this.query = {}
        this.routeData = {}
        this.imageLabel = ''
        this.set('content', []);
        this.set('imageArr', [])
        this.set('inform', [])
        this.set('inputVal', [])
        this.set('textareaVal', [])
        this.set('add', 0);
    }
}
customElements.define(cmsPageCatsContent.is, cmsPageCatsContent);