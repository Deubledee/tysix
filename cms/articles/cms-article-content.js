import { cmsContentTemplate } from '../templates/cms-content-template';
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsArticlesLib } from '../tools/cms-save-lib.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '../elements/cms-content-text'
const Modelo = "eyJpbWFnZXMiOnsiY29udGVudCI6W119LCJsYW5nIjp7ImNhdGVnb3J5TmFtZSI6IiIsImxhbmciOiIiLCJkZXNjcmlwdGlvbiI6IiIsInR5cGUiOiIifX0="
const ModeloInfo = "eyJQdWJsaXNoZWQiOiIiLCJSRUYiOiIiLCJTS0EiOiIiLCJhZGRlZEJ5IjoiIiwiYWRkZWREYXRlIjoiIiwiYnJhbmRNYW51ZmFjcnVyZXIiOiIiLCJjYXRlZ29yeSI6IiIsImRpbWVudGlvbnMiOiIiLCJrZXl3b3JkcyI6W10sImxhc3RNb2RpZmVpZCI6W10sInByaWNlIjo4MDAsInByb21vdGlvbkNvZGUiOiIiLCJyZW1vdmVkIjpmYWxzZSwicmV0YWlsZXIiOiJzb2xpZG8iLCJzaGlwcGluZyI6IiIsInNoaXBwaW5nVGF4IjoiIiwic3RvY2siOjAsInN0b3JlV2FycmFudHkiOiIiLCJ0YXgiOiIiLCJ3ZWlnaHQiOiIifQ=="
class cmsArticleContent extends cmsArticlesLib(cmsContentTemplate) {
    static get _getStyles() {
        return html`
        div[placerbottom] {
            overflow: auto;
        }
        .row-layout{
            flex-direction: row!important;
            flex-flow: wrap;
            lex-basis: 99%!important;
        }
        `
    }
    static get _getAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a id="anchora" on-click="reset">
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
        </iron-selector>
        `
    }
    static get _getContentItems() {
        return html`
        <div bottom on-click="_seeFlat">
            <article>
                <dom-repeat repeat items="[[inputVal]]" as="item">
                    <template>
                        <section class="flexchildbotomFull">
                            <cms-content-item editing="[[editing]]" item="[[item]]" save-button="[[saveButton]]"
                                res="{{inputResponse}}">
                            </cms-content-item>
                        </section>
                    </template>
                </dom-repeat>
            </article>
            <article>
                <dom-repeat repeat items="[[textareaVal]]" as="item">
                    <template>
                        <section class="flexchildbotomFullExtra">
                            <cms-content-text editing="[[editing]]" item="[[item]]" save-button="[[saveButton]]"
                                res="{{textAreaResponse}}">
                            </cms-content-text>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>
        <div bottom imageplacer>
            <section class="flexchildbotom">
                <cms-content-image id="image" editing="[[editing]]" item-label="[[imageLabel]]" images="[[imageArr]]" _deleteImg="[[deleteImg]]">
                </cms-content-image>
            </section>
        </div>
        <div bottom on-click="_seeFlat">
            <article class="row-layout">
                <dom-repeat repeat items="[[infoVals]]" as="item">
                    <template>
                        <section class="flexchildbotomFull">
                            <cms-content-item editing="[[editing]]" item="[[item]]" save-button="[[saveButton]]"
                                res="{{inputResponse}}">
                            </cms-content-item>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>`;
    }
    static get is() { return 'cms-article-content'; }
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
            '_routePageChanged(routeData, query, active)'
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
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeLang.call(this)
    }
    _checkLabel() {
        if (this.add === true) {
            this.translator.changeItemTitleLang.call(this, 'addPage', 'navLabel')
        } else {
            this.translator.changeItemTitleLang.call(this, 'editPage', 'navLabel')
        }
    }
    _routePageChanged(routeData, query) {
        if (!!routeData.page) {
            this._reset()
            let arr = []
            if (!!query.add) {
                this.add = (query.add === 'true')
            }
            if (!!query.added) {
                this.added = (query.added === 'true')
            }
            if (!!this.langs[this.lang]) this._checkLabel()
            this.closestr = 'content/articles'
            if (routeData.page === 'add-articles') {
                if (this.add === true) {
                    let cont = JSON.parse(atob(Modelo))
                    localStorage[`article-new-content-info`] = atob(ModeloInfo)
                    let obj = cont.images.content
                    this.imageLabel = 'images'
                    this.set('imageArr', obj)
                    this.set('str', `content/articles/add-articles?content=pagenotsaved`)
                    this._setContent('lang', [cont])
                    this._getPageInfo(`article-new-content-`)
                    this.set('pageLangs', [])
                    return 0
                }
            }
            if (routeData.page === 'edit-articles') {
                if (!!query.content) {
                    let infoVals, cont, media, images, urlstring
                    [cont, media, infoVals, images, urlstring] = generateData.call(this, query)
                    if (this.add === false || this.added === true) {
                        this.set('str', `content/articles/edit-articles${urlstring}lang=`)
                        this.set('media', media)
                        this.set('imageArr', this.media.images.content)
                        this.set('infoVals', this._getObjArr(infoVals, true))
                        this.imageLabel = images
                        if (!!query.lang) {
                            if (query.lang !== 'lang') {
                                arr = this._setLangArr(cont)
                                this.set('pageLangs', arr)
                            }
                            this.__setLAng(query.lang, [cont])
                        }
                        return 0
                    }
                }
            }
        }
    }

    _getInforVals(inform) {
        let infoVals = {}
        for (let par in inform) {
            if (par !== 'addedDate' && par !== 'addedBy' && par !== 'lastModified' && par !== 'Published', 'keywords') {
                infoVals[par] = inform[par]
            }
        }
        return infoVals
    }

    addImage() {
        if (this.add === false) {
            localStorage[`article-${this.query.content}-media`] = JSON.stringify(this.media)
            let string = `type=article&content=${this.query.content}&lang=${this.query.lang}&add=${this.add}`
            window.history.pushState({}, null, `${this.rootPath}media/galleries?${string}`);
            window.dispatchEvent(new CustomEvent('location-changed'));
        } else {
            localStorage[`article-new-content-media`] = JSON.stringify(this.media)
            let string = `type=article&content=new-content&lang=lang&add=${this.add}`
            window.history.pushState({}, null, `${this.rootPath}media/galleries?${string}`);
            window.dispatchEvent(new CustomEvent('location-changed'));
        }
        window.onbeforeunload = function (e) {
            return "you might have changes to be saved, are you sure you whant to leave?";
        };
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
                author: this.user.displayName,
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
                inform.id = this.content[0][this.content[0].lang.lang].categoryName
                inform.ref = btoa(this.content[0][this.content[0].lang.lang].categoryName)
                inform.type = this.content[0][this.content[0].lang.lang].type
                delete this.content[0].lang
                inform.Published.date = 'NP'
                inform.Published.publishedBy = 'N/A'
                inform.Published.state = 'NP'
                inform.author.id = this.user.uid
                inform.author.name = this.user.displayName
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
        this.set('content', []);
        this.set('imageArr', [])
        this.set('inputVal', '')
        this.set('infoVals', [])
        this.set('media', [])
        this.set('textareaVal', '')
        this.set('inform', [])
    }
}
customElements.define(cmsArticleContent.is, cmsArticleContent);

function* generateData(query) {
    yield JSON.parse(localStorage[`article-${query.content}-data`])
    yield JSON.parse(localStorage[`article-${query.content}-media`])
    this._getPageInfo(`article-${query.content}-`)
    yield this._getInforVals(this.inform)
    yield 'images'
    let strg = location.search
    strg = strg.split('lang=')[0]
    yield strg
}