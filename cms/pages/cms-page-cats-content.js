import { cmsContentTemplate } from '../templates/cms-content-template';
import { html } from '@polymer/polymer/polymer-element.js';
import '../elements/cms-content-item'
import '../elements/cms-content-text'
import '../elements/cms-content-image'
class cmsPageCatsContent extends cmsContentTemplate {

    static get _getAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="anchor">
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
        </iron-selector>`
    }
    static get _getContentItems() {
        return html`
        <div container>
            <div bottom hidebottom$="[[hidebottom]]">                   
                <dom-repeat repeat items="[[inputVal]]" as="item">
                    <template>
                        <section class="flexchildbotomShort">
                            <cms-content-item
                                item="[[item]]" 
                                save-button="[[saveButton]]" 
                                res="{{inputResponse}}">
                            </cms-content-item>                                    
                        </section>   
                    </template>
                </dom-repeat>        
                <dom-repeat repeat items="[[textareaVal]]" as="item">
                    <template>
                        <section class="flexchildbotomFull">  
                            <cms-content-text 
                                item="[[item]]" 
                                save-button="[[saveButton]]"
                                res="{{textAreaResponse}}"> 
                            </cms-content-text>  
                        </section>
                    </template>
                </dom-repeat>                         
                <section class="flexchildbotom">      
                    <cms-content-image  id="image"
                        item-label="[[imageLabel]]"
                        images="[[imageArr]]"  
                        _deleteImg="[[deleteImg]]"  
                    </cms-content-image>
                </section>
            </div>
        </div>  `
    }
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
        this.set('anchor', this.$.anchor)
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
    _routePageChanged(routeData, query, active) {
        this.cancelElemenObject = {}
        this.inputObject = {}
        if (Boolean(this.slashed) === false) {
            this.slashed = true
        }
        if (active === true &&
            routeData.page === 'edit-category-pages' ||
            routeData.page === 'add-category-pages' ||
            routeData.page === 'edit-subcategory-pages' ||
            routeData.page === 'add-subcategory-pages') {
            this.set('content', []);
            this.$.saveButton.classList.add('diferent')
            this.add = true
            if (!!query.added) {
                this.add = false
                this.$.saveButton.classList.remove('diferent')
            }
            if ('add' in query) {
                this.add = (query.add === 'true' || query.add === true)
            }
            if ('content' in query) {
                if (this.add === false) {
                    this._setContent(localStorage[`page${query.content}`], query)
                }
                if (this.add === true) {
                    this._setContent(atob("W3siY29udGVudFRleHQiOnsiZGVzY3JpcHRpb24iOiJramhnaGpnIn0sImltYWdlcyI6eyJjb250ZW50IjpbeyJhdXRob3IiOiJEaW9nbyIsImRhdGVBZGRlZCI6IjIwMTktMDYtMzBUMjM6MDA6MDAuMDAwWiIsInRpdGxlIjoibGFkaWVzX3RzaGlydHMiLCJ1cmwiOiJkYXRhL3BhZ2VzL2xhZGllc190c2hpcnRzLmpwZyJ9XX0sIml0ZW1zIjp7ImNhdGVnb3J5TmFtZSI6ImZkZyIsImxhbmciOiJwdCIsInR5cGUiOiJjYXRlZ29yeSJ9fV0="), query)
                }
            }
        }
    }
    _setContent(content, query) {
        if (this.time !== undefined) clearTimeout(this.time)
        this.$.anchor.setAttribute('href', `${this.rootPath}content/pages`)
        this.set('add', (query.add === 'true'))
        this.set('content', JSON.parse(content));
        let obj = this.content[0].images.content
        this.imageLabel = 'images'
        this.set('imageArr', obj)
        this.set('inputVal', this._getObjArr([this.content[0].items]))
        this.set('textareaVal', this._getObjArr([this.content[0].contentText]))
        this.set('slashed', false)
        this.set('inform', [])
        this.time = setTimeout(() => {
            this._getPageInfo()
        }, 120);
    }
    _getPageInfo() {
        this.infoState = 'info not available..'
        let time
        if (this.add === false) {
            this.infoState = 'getting info data..'
            time = setTimeout(() => {
                this.infoState = ''
                this.set('inform', JSON.parse(localStorage[`page${this.query.content}info`]))
                clearTimeout(time)
            }, 250);
        } else {
            clearTimeout(time)
            this.set('inform', [])
        }
    }
    addImage() {
        console.log(this.content)
        localStorage[`page${this.query.content}`] = JSON.stringify(this.content)
        let string = `addimageto=page&method=editPages&content=${this.content[0].items.categoryName}`
        window.history.pushState({}, null, `${this.rootPath}media/images/galleries?${string}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
        window.onbeforeunload = function (e) {
            return "you might have changes to be saved, are you sure you whant to leave?";
        };
    }
    _setItemsValue(data) {
        if (this.content['items']) {
            for (let par in data) {
                if (par.toString() !== 'undefined') {
                    this.content.items[0][par] = data[par]
                }
            }
        }
    }
    _setContentTextValue(data) {
        if (this.content['contentText']) {
            for (let par in data) {
                if (par.toString() !== 'undefined') {
                    this.content.contentText[0][par] = data[par]
                }
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
        this.$.anchor.setAttribute('href', `${this.rootPath}content/pages`)
        this.query = {}
        this.routeData = {}
        this.imageLabel = ''
        this.set('content', []);
        this.set('imageArr', [])
        this.set('inform', [])
        this.set('add', 0);
        this.set('slashed', true);
        this.set('inform', []);
        this.set('add', 0);
    }
}
customElements.define(cmsPageCatsContent.is, cmsPageCatsContent);