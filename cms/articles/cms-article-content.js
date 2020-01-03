import { cmsContentTemplate } from '../templates/cms-content-template';
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsArticlesLib, cmscategoriesLib } from '../tools/cms-save-lib.js';
import '../elements/cms-content-text'
import '../elements/cms-content-item'
import '../elements/cms-dropdown-menu';
const Modelo = "eyJpbWFnZXMiOnsiY29udGVudCI6W119LCJsYW5nIjp7ImFydGljbGVOYW1lIjoiIiwibGFuZyI6IiIsImRlc2NyaXB0aW9uIjoiIiwidHlwZSI6IiJ9fQ=="
const ModeloInfo = "eyJQdWJsaXNoZWQiOiIiLCJSRUYiOiIiLCJTS0EiOiIiLCJhZGRlZEJ5IjoiIiwiYWRkZWREYXRlIjoiIiwiYnJhbmRNYW51ZmFjcnVyZXIiOiIiLCJjYXRlZ29yeSI6IiIsImRpbWVudGlvbnMiOiIiLCJrZXl3b3JkcyI6W10sImxhc3RNb2RpZmVpZCI6W10sInByaWNlIjoiIiwicHJvbW90aW9uQ29kZSI6IiIsInJlbW92ZWQiOmZhbHNlLCJyZXRhaWxlciI6IiIsInNoaXBwaW5nIjoiIiwic2hpcHBpbmdUYXgiOiIiLCJzdG9jayI6IiIsInN0b3JlV2FycmFudHkiOiIiLCJ0YXgiOiIiLCJ3ZWlnaHQiOiIifQ=="
class cmsArticleContent extends cmscategoriesLib(cmsArticlesLib(cmsContentTemplate)) {
    static get _getStyles() {
        return html`
        div[placerbottom] {
            overflow: auto;
        }
        .row-layout{
            flex-direction: row!important;
            flex-flow: wrap;
            flex-basis: 99%!important;
        }
        .flexchild-article {
            flex-basis: 24%;
            margin-block-end: 40px;
            margin-inline-end: 120px;
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
                            <cms-content-item info="*" editing="[[editing]]" item="[[item]]"
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
                            <cms-content-text info="*" editing="[[editing]]" item="[[item]]"
                                res="{{textAreaResponse}}">
                            </cms-content-text>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>

        <div bottom on-click="_seeFlat">
            <article class="row-layout" on-click="_seeFlat">
                <dom-repeat repeat items="[[dtDetails]]" as="item">
                    <template>
                        <section on-click="_seeFlat" class="flexchildbotomFull flexchild-article">
                            <cms-content-item editing="[[editing]]" item="[[item]]"
                                res="{{ifResponse}}">
                            </cms-content-item>
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

        <div bottom>     
            <cms-dropdown-menu 
                items="[[category]]"  
                horizontal-align="left" 
                vertical-align="top" 
                scroll-action="refit"
                res="{{catResponse}}">            
            </cms-dropdown-menu>       
        </div>

        <div bottom on-click="_seeFlat">
            <article class="row-layout" on-click="_seeFlat">
                <dom-repeat repeat items="[[phDetails]]" as="item">
                    <template>
                        <section on-click="_seeFlat" class="flexchildbotomFull flexchild-article">
                            <cms-content-item editing="[[editing]]" item="[[item]]"
                                res="{{ifResponse}}">
                            </cms-content-item>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>

        <div bottom on-click="_seeFlat">
            <article class="row-layout" on-click="_seeFlat">
                <dom-repeat repeat items="[[infoVals]]" as="item">
                    <template>
                        <section on-click="_seeFlat" class="flexchildbotomFull flexchild-article">
                            <cms-content-item editing="[[editing]]" item="[[item]]"
                                res="{{ifResponse}}">
                            </cms-content-item>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>

        <div bottom on-click="_seeFlat">
            <article class="row-layout" on-click="_seeFlat">
                <dom-repeat repeat items="[[shDetails]]" as="item">
                    <template>
                        <section on-click="_seeFlat" class="flexchildbotomFull flexchild-article">
                            <cms-content-item editing="[[editing]]" item="[[item]]"
                                res="{{ifResponse}}">
                            </cms-content-item>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>

        <div bottom on-click="_seeFlat">
            <article on-click="_seeFlat">
                <dom-repeat repeat items="[[keywords]]" as="item">
                    <template>
                        <section on-click="_seeFlat" class="flexchildbotomFull">
                            <cms-content-text info="* separete with commas" editing="[[editing]]" item="[[item]]"
                                res="{{kwResponse}}">
                            </cms-content-text>
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
            textareaVal: {
                type: Array,
                notify: true,
                value: ''
            },
            infoVals
                : {
                type: Array,
                notify: true,
                value: []
            },
            dtDetails
                : {
                type: Array,
                notify: true,
                value: []
            },
            phDetails: {
                type: Array,
                notify: true,
                value: []
            },
            shDetails: {
                type: Array,
                notify: true,
                value: ''
            },
            keywords
                : {
                type: Array,
                notify: true,
                value: []
            },
            category: {
                type: Array,
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
            ifResponse: {
                type: Object,
                notify: true,
                value: {},
                observer: '_setInfomr'
            },
            catResponse: {
                type: Object,
                notify: true,
                value: {},
                observer: '_setInfomr'
            },
            kwResponse: {
                type: Object,
                notify: true,
                value: {},
                observer: '_setInfomrKw'
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
            if (path === '/add-articles' || path === '/edit-articles') {
                if (!this.$.overlay.opened) {
                    this.$.overlay.open()
                    this.ctnOpened = true
                }
                if (!!this.langs[this.lang]) this._checkLabel()
                this.closestr = 'content/articles?reset=false'
                if (path === '/add-articles') {
                    this._setAddedContent()
                    return 0
                }
                if (path === '/edit-articles') {
                    if (!!query.content) {
                        this._setEditContent(query)
                        return 0
                    }
                }
            } else {
                this.$.overlay.close()
            }
        }
    }
    _setAllInfo(urlstring, media, infoVals, phDetails, shDetails, dtDetails, category, keywords, images) {
        this.set('str', `content/articles/edit-articles${urlstring}lang=`)
        this.set('media', media)
        this.set('imageArr', 'images' in this.media ? this.media.images.content : [])
        this.set('infoVals', this._getObjArr(infoVals, true))
        this.set('phDetails', this._getObjArr(phDetails, true))
        this.set('shDetails', this._getObjArr(shDetails, true))
        this.set('dtDetails', this._getObjArr(dtDetails, true))
        this._getCatArr(category)
        this.set('keywords', [{ keywords: keywords.keywords.join(', ') }])
        this.imageLabel = images
    }
    _getCatArr(category) {
        this.getCategories({ q: 'removed', v: false }).then(data => {
            category.items = []
            data.forEach(item => {
                category.items.push(item.data().id)
            })
            this.set('category', this._getObjArr(category, true))
        }).catch(error => {
            console.log(error)
        })
    }
    _setAddedContent() {
        let infoVals, media, images, urlstring, phDetails, shDetails, dtDetails, keywords, category
        [media, infoVals, images, urlstring,
            phDetails, shDetails, dtDetails, keywords, category] = generateAddData.call(this)
        this._setAllInfo(urlstring, media, infoVals, phDetails, shDetails, dtDetails, category, keywords, images)
    }
    _setEditContent(query) {
        let arr = []
        let infoVals, cont, media, images, urlstring, phDetails, shDetails, dtDetails, keywords, category
        [cont, media, infoVals, images, urlstring,
            phDetails, shDetails, dtDetails, keywords, category] = generateEditData.call(this, query)
        this._setAllInfo(urlstring, media, infoVals, phDetails, shDetails, dtDetails, category, keywords, images)
        if (!!query.lang) {
            if (query.lang !== 'lang') {
                arr = this._setLangArr(cont)
                this.set('pageLangs', arr)
            }
            this.__setLAng(query.lang, [cont])
        }
    }
    __setStorage() {
        localStorage[`article-${this.query.content}-data`] = JSON.stringify(this.content[0])
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
        if (this.add === false) {
            this.getArticleData(this.inform.id, 'info').then((this._save).bind(this)).catch(err => console.log(err))
        } else {
            this._save(undefined)
        }
    }
    _save(item) {
        let obj = { addedBy: '', addedDate: '', lastModifeid: [] }
        let Cont = !!item && !!item.data ? item.data : obj
        this.INFO = this._lastModified(Cont)
        let dataValidation = this._setAndCheckDataBeforeSave(this.inform)
        if (!dataValidation) return
        if (!!this.removelang) {
            this._removeLang()
            return
        }
        if (!!this.newlangstate) this.add = true
        this.newlangstate = !this.newlangstate
        this.saveArticles()
        return
    }

    _lastModified(ifo) {
        let INFO = ifo
        let data = new Date()
        if (this.add === true) {
            INFO.addedBy = this.user.name
            INFO.addedDate = data
        }
        INFO.lastModifeid.push({
            author: this.user.name,
            date: data.toLocaleString().replace(',', ''),
            uid: this.user.uid
        });
        return INFO
    }
    _setAndCheckDataBeforeSave() {
        if (!this.newlangstate) {
            if (this.add === true) {
                if (!this.content[0].lang.lang && !this.content[0].lang.articleName) {
                    return false
                }
                this.content[0][this.content[0].lang.lang] = this.content[0].lang
                this.inform.id = (this.content[0][this.content[0].lang.lang].articleName).split(' ').join('_')
                delete this.content[0].lang
                this.inform.removed = false
                this.inform.Published = "NP"
                return true
            }
        }
        for (let par in this.media) {
            this.content[0][par] = this.media[par]
        }
        return true
    }
    _reset() {
        this.set('content', []);
        this.set('imageArr', [])
        this.set('inputVal', '')
        this.set('infoVals', [])
        this.set('media', [])
        this.set('dtDetails', [])
        this.set('category', [])
        this.set('phDetails', [])
        this.set('shDetails', [])
        this.set('keywords', [])
        this.set('textareaVal', [])
        this.set('inform', [])
        this.newlangstate = false
    }
}
customElements.define(cmsArticleContent.is, cmsArticleContent);

function* generateAddData() {
    let cont = JSON.parse(atob(Modelo))
    localStorage[`article-new-content-info`] = atob(ModeloInfo)
    let obj = cont.images.content
    this._setContent('lang', [cont])
    let strg = location.search
    strg = strg.split('lang=')[0]
    this.set('pageLangs', [])
    //  yield cont
    yield obj
    this._getPageInfo(`article-new-content-`)
    yield _getInforDetails(this.inform)
    yield 'images'
    yield strg
    yield _getPhysicalDetails(this.inform)
    yield _getShippingDEtails(this.inform)
    yield _getDetails(this.inform)
    yield _getKeywords(this.inform)
    yield _getCatDetails(this.inform)
}

function* generateEditData(query) {
    yield JSON.parse(localStorage[`article-${query.content}-data`])
    yield JSON.parse(localStorage[`article-${query.content}-media`])
    this._getPageInfo(`article-${query.content}-`)
    yield _getInforDetails(this.inform)
    yield 'images'
    let strg = location.search
    strg = strg.split('lang=')[0]
    yield strg
    yield _getPhysicalDetails(this.inform)
    yield _getShippingDEtails(this.inform)
    yield _getDetails(this.inform)
    yield _getKeywords(this.inform)
    yield _getCatDetails(this.inform)
}

function _getInforDetails(details) {
    let infoVals = {}
    for (let par in details) {
        if (
            par === 'REF' ||
            par === 'SKA' ||
            par === 'brandManufacturer' ||
            par === 'promotionCode' ||
            par === 'retailer' ||
            par === 'storeWarranty') {
            infoVals[par] = details[par]
        }
    }
    return infoVals
}
function _getPhysicalDetails(details) {
    let phDetails = {}
    for (let par in details) {
        if (par === 'dimentions' || par === 'weight') {
            phDetails[par] = details[par]
        }
    }
    return phDetails
}
function _getShippingDEtails(details) {
    let shDEtails = {}
    for (let par in details) {
        if (par === 'shipping' || par === 'shippingTax') {
            shDEtails[par] = details[par]
        }
    }
    return shDEtails
}
function _getDetails(details) {
    let dtDetails = {}
    for (let par in details) {
        if (par === 'price' || par === 'stock' || par === 'tax') {
            dtDetails[par] = details[par]
        }
    }
    return dtDetails
}
function _getCatDetails(details) {
    let catDetails = {}
    for (let par in details) {
        if (par === 'category') {
            catDetails[par] = details[par]
        }
    }
    return catDetails
}
function _getKeywords(details) {
    let keywords = {}
    for (let par in details) {
        if (par === 'keywords') {
            keywords[par] = details[par]
        }
    }
    return keywords
}
