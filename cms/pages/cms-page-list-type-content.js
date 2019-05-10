import { cmsContentTemplate } from '../templates/cms-content-template';
import { html } from '@polymer/polymer/polymer-element.js';
import { Setter } from '../tools/cms-element-set';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import '../sub-categories/cms-content-subcats'
import '../elements/cms-content-item'
import '../elements/cms-content-image'
const Consts = new Setter()
Consts.assets = Consts.getAssets('cms-page-list-type-content')
class cmsPageListTypeContent extends cmsContentTemplate {

    static get _getAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="anchor" on-click="reset">
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
        </iron-selector>`
    }
    static get _getContentItems() {
        return html`
        <div container>
            <div bottom>                   
                <dom-repeat repeat items="[[inputVal]]" as="item">
                    <template>
                        <section class="flexchildbotom">
                            <cms-content-item item-input="true"
                                item="[[item]]" 
                                anchor="[[anchor]]" 
                                save-button="[[saveButton]]" 
                                lang="[[lang]]"  
                                editing="{{editing}}"
                                lang="[[lang]]" 
                                res="{{inputResponse}}">
                            </cms-content-item>                                    
                        </section>   
                    </template>
                </dom-repeat>         
                <dom-repeat repeat items="[[textareaVal]]" as="item">
                    <template>
                        <section class="flexchildbotomFull">
                            <cms-content-item item-text-area="true"
                                item="[[item]]" 
                                anchor="[[anchor]]" 
                                save-button="[[saveButton]]"  
                                lang="[[lang]]"  
                                editing="{{editing}}" 
                                lang="[[lang]]"
                                res="{{textAreaResponse}}">
                            </cms-content-item>            
                        </section>
                    </template>
                </dom-repeat>                         
                <section class="flexchildbotom">      
                    <cms-content-image  id="image"
                        item-label="[[imageLabel]]"
                        images="[[imageArr]]" 
                        editing="{{editing}}" 
                        anchor="[[anchor]]" 
                        save-button="[[saveButton]]" 
                        _deleteImg="[[deleteImg]]"  
                        lang="[[lang]]">
                    </cms-content-image>
                </section>
                <dom-if if="[[CaTeGoRy]]">
                    <template>
                        <section class="flexchildbotomFull">
                            <cms-content-subcats 
                                route="{{route}}" 
                                sub-sub-cats="[[subSubCats]]" 
                                content="[[content]]"
                                lang="[[lang]]"
                                res="{{subcatsResponse}}">
                            </cms-content-subcats>
                        </section>  
                    </template> 
                </dom-if> 
            </div>
        </div>  `
    }
    static get is() { return 'cms-page-list-type-content'; }
    static get properties() {
        return {
            user: {
                type: Object
            },
            CaTeGoRy: {
                type: Boolean,
                value: true,
                notify: true
            },
            inputVal: {
                type: Array,
                notify: true,
                value: []
            },
            textareaVal: {
                type: String,
                notify: true,
                value: ''
            },
            editing: {
                type: Number,
                notify: true,
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
                value: {},
                // observer: '_setLang'
            },
            subSubCats: {
                type: Array,
                notify: true,
                value: []
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
            subcatsResponse: {
                type: Object,
                notify: true,
                value: {},
                observer: '_setsubcatsValue'
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
            }
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
            this.set('content', []);
            this.set('imageArr', [])
            this.set('inform', [])
            this.set('subCats', [])
        }
        if (active === true &&
            routeData.page === 'edit-category-pages' ||
            routeData.page === 'add-category-pages' ||
            routeData.page === 'edit-subcategory-pages' ||
            routeData.page === 'add-subcategory-pages') {
            this.set('content', []);
            this.add = true
            if ('added' in query) {
                this.$.saveButton.classList.remove('diferent')
                this.$.anchor.classList.add('diferent');
                this.imageElemen = ''
            }
            if ('content' in query) {
                if ('added' in query) {
                    this.add = false
                    this.CaTeGoRy = true
                }

                if ('add' in query) {
                    this.add = true
                    this.CaTeGoRy = true
                }
                if ('indexarray' in query) {
                    this.CaTeGoRy = false
                }
                this._setContent(query.content, query)
            }
            this.slashed = false;
        }
    }
    _setContent(content, query) {
        this.$.anchor.setAttribute('href', `${this.rootPath}content/pages`)
        this.set('content', JSON.parse(window.atob(content)));
        let obj = this.content.image
        this.imageLabel = 'images'
        this.set('imageArr', obj)
        this.set('inputVal', this._getObjArr(this.content.items))
        this.set('textareaVal', this.content.contentText)
        this.set('inform', this.content.info)
        this.set('subSubCats', this.content.subCategories)
        this.set('add', (query.add === 'true') || (query.added === 'true'));
        this.set('slashed', false)
    }
    addImage() {
        let string = 'editPages&content=' + btoa(JSON.stringify(this.content))
        this.set('slashed', true)
        window.history.pushState({}, null, `${this.rootPath}media/images/galleries?addimageto=pages&method=${string}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
        window.onbeforeunload = function (e) {
            return "you might have changes to be saved, are you sure you whant to leave?";
        };
    }
    _setItemsValue(data) {
        if (this.content['items']) {
            for (let par in data) {
                this.content.items[0][par] = data[par]
                console.log(this.content, par)
            }
        }
    }
    _setContentTextValue(data) {
        if (this.content['contentText']) {
            for (let par in data) {
                this.content.contentText[0][par] = data[par]
                console.log(this.content.contentText[0][par], par, data)
            }
        }
    }
    _setsubcatsValue() {
        if (this.content['contentText']) {
            for (let par in data) {
                this.content.subCategories[0][par] = data[par]
                console.log(this.content.subCategories[0][par], par, data)
            }
        }
    }
    _getPublishedBy(publishedBy) {
        if (publishedBy !== undefined && publishedBy.length > 0) {
            let pubuser = publishedBy[0].name;
            return pubuser;
        }
    }
    save() {
        let data = new Date()
        this.content.info[0].lastModified.push({
            uid: this.user.uid,
            author: this.user.displayName,
            date: data.toLocaleString().replace(',', '')
        });
        if (this.add === true) {
            this.saveAdded(data)
        }
        else {
            this.saveChanged(data)
        }
    }
    saveAdded(data) {
        this.content.info[0].author = this.user.displayName;
        this.content.info[0].dateAdded = data.toLocaleString().replace(',', '');
        this.content.info[0].uid = this.user.uid;
        Consts._DBW.setPages((done, err) => {
            if (done !== 'error') {
                window.onbeforeunload = function () { };
                this.editing = 0;
                this.temp = '';
                this.$.saveButton.classList.add('diferent');
                this.$.anchor.classList.remove('diferent');
                this.__reset();
            }
            else {
                console.log(err);
            }
        }, this.content, Consts.__DEV);
    }
    saveChanged() {
        Consts._DBW.writePagesContent((done, err) => {
            if (done !== 'error') {
                window.onbeforeunload = function () { };
                this.editing = 0;
                this.temp = '';
                this.$.saveButton.classList.add('diferent');
                this.$.anchor.classList.remove('diferent');
                this.__reset();
            }
            else {
                console.log(err);
            }
        }, this.content, Consts.__DEV);
    }
    _reset() {
        this.$.anchor.setAttribute('href', `${this.rootPath}content/pages`)
        this.$.saveButton.classList.add('diferent')
        this.$.anchor.classList.remove('diferent')
        this.query = {}
        this.routeData = {}
        this.imageLabel = ''
        this.set('content', '');
        this.set('imageArr', '')
        this.set('inputVal', '')
        this.set('textareaVal', '')
        this.set('inform', [0])
        this.set('add', 0);
        this.set('slashed', true);
    }
    __reset() {
        this.$.anchor.click()
        this._debounceEvent = Debouncer.debounce(this._debounceEvent, microTask, () => {
            window.dispatchEvent(new CustomEvent('reset-list-type', {
                bubbles: true, composed: true
            }));
        });
    }
}
customElements.define(cmsPageListTypeContent.is, cmsPageListTypeContent);