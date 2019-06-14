import { cmsItemTemplate } from '../templates/cms-item-template'
import { html } from '@polymer/polymer/polymer-element';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer'
import '../styles/cms-comon-style_v3';
const Model = {
    value: {
        contentText: [{
            description: ""
        }],
        image: [],
        info: [{
            author: "",
            dateAdde: "",
            publishedBy: [{
                author: "",
                date: "", uid: ""
            }],
            unPublishedBy: [{
                author: "",
                date: "",
                uid: ""
            }],
            lastModified: [{
                author: "",
                date: "",
                uid: ""
            }],
            datePublished: "NP",
            published: "NP"
        }],
        items: [{
            categoryName: "",
            type: "",
            lang: ""
        }],
        subCategories: []
    }
}
export class cmsSubcatsItem extends cmsItemTemplate {
    static get _getStyles() {
        return html`
        <style include="cms-comon-style_v3">    
            :host {
                position: relative;
                display: block;
            } 
            div[bottom] {
                padding: 4px;
                height: auto;
            }     
            paper-icon-button {
                width: 31px;
                height: 31px;
            }
            div[bottom]{
                display: flex
            }
            div[bottom][hide]{
                display: none
            }
        </style>`
    }
    static get _getElement() {
        return html`
        <dom-if if="[[view]]">
            <template>
                <dom-repeat repeat items="[[subcatContent]]" as="item">
                    <template>                
                        <article centerlistitem>
                            <div>
                                <shop-image class="bigger" title="[[item.categoryName]]" aria-label="image" src="[[item.image]]"
                                    alt="[[item.categoryName]]">
                                </shop-image>
                            </div>
                            <div title="[[item.categoryName]]">
                                <paper-button title="[[item.categoryName]]">
                                    [[item.categoryName]]
                                </paper-button>
                            </div>
                            <div>
                                <paper-button on-click="_viewEdit">
                                    <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
                                    <paper-icon-button icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                                </paper-button>
                            </div>
                            <div title="[[item.type]]">
                                <paper-button title="[[item.lang]]">
                                    [[item.type]]
                                </paper-button>
                            </div>
                            <div>
                                <paper-icon-button icon="av:not-interested" aria-label="delete" on-click="_openConfirm">
                                </paper-icon-button>
                            </div>                
                        </article>
                    </template>                            
                </dom-repeat>
            </template>
        </dom-if> 
        <nav>
            <paper-button id="backButton" on-click="_showBack">                         
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </paper-button>
            <paper-button id="saveButton" on-click="_save"> 
                [[save]]
            </paper-button>
        </nav>         
        <div bottom hide$="[[view]]" noborder$="[[noborder]]">
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
                <cms-content-image  id="Imag"
                    item-label="[[imageLabel]]"
                    images="[[imageArr]]" 
                    editing="{{editing}}" 
                    anchor="[[anchor]]" 
                    save-button="[[saveButton]]" 
                    _deleteImg="[[deleteImg]]" >
                </cms-content-image>
            </section>             
        </div>
        <div bottom hide$="[[!view]]"> 
            <div class="plus">
                <div class="plussubcat noFlex">
                    <paper-icon-button on-click="_addChildren" icon="av:library-add" aria-label="mode-show"></paper-icon-button>
                </div>  
                <div class="subcat noFlex">
                    <div class="flexleft">
                        <paper-icon-button on-click="_toggleChildren" icon="editor:drag-handle" aria-label="mode-show"></paper-icon-button>
                    </div>
                    <div id="subcats" class="diferent">
                        <slot name="table"></slot> 
                    </div>
                    <dom-repeat repeat items="[[subcatSubats]]" as="item">
                        <template> 
                            [[_slottItem(item, index)]]
                        </template>                            
                    </dom-repeat>               
                </div>  
            </div> 
        </div>
        `;
    }
    static get is() { return 'cms-subcats-item'; }
    static get properties() {
        return {
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals.translator
                }
            },
            lang: {
                type: String,
                value: '',
                notify: true
            },
            langs: {
                type: Object,
                value: {}
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
            noborder: {
                type: Boolean,
                value: true,
                reflectToAttribute: true,
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
            subcat: {
                type: Object,
                notify: true,
                value: {}
            },
            imageArr: {
                type: Array,
                notify: true,
            },
            subcatContent: {
                type: Array,
                notify: true
            },
            subcatSubats: {
                type: Array,
                notify: true,
            },
            saveButton: {
                type: Object,
                notify: true
            },
            toContent: {
                type: Object,
                notify: true,
                value: {}
            },
            view: {
                type: Boolean,
                notify: true,
                value: true,
                observer: '_setButtons'
            },
            published: {
                type: String,
                reflectToAttribute: true
            },
            hide: {
                type: Boolean,
                notify: true,
                reflectToAttribute: true
            },
            indexArr: {
                type: Array,
                notify: true,
                value: function () {
                    return []
                },
                observer: '_routePageChanged'
            },
        };
    }
    _log(data) {
        console.log(data)
    }
    connectedCallback() {
        super.connectedCallback();
        this._observer = new FlattenedNodesObserver(this, (info) => {
            this.info = info;
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._observer.disconnect();
    }
    ready() {
        super.ready();
        this.set('saveButton', this.$.saveButton)
        this.$.saveButton.classList.add('diferent')
        this.translator.target('cms-subcats-item', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-subcats-item', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-subcats-item', 'setLangObject')
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
    _routePageChanged(data) {
        if (data.length > 0) {
            if ('indexarr' in this.query) {
                if (this.routeData.page === "edit-subcategory-pages" || this.routeData.page === "add-subcategory-pages") {
                    let index = this.query.indexarr.split(',').length, index2 = this.indexArr.length
                    this.view = false
                    if (index === index2) {
                        if (this.indexArr.join(',') === this.query.indexarr) {
                            this.subcat = JSON.parse(atob(this.query.content))
                            this._setContent(this.subcat)
                            this.view = false
                            console.log('indexarr1', index, index2)
                        }
                    } else
                        if (this.indexArr[index - 1] === this.query.indexarr.split(',')[index - 1]) {
                            this._setContent(this.subcat)
                            this.view = false
                            console.log('indexarr2', index, index2)
                        } else {
                            this._setContent(this.subcat)
                            console.log('indexarr3', index, index2)
                        }
                }
            } else {
                console.log('indexarr4')
                this._setContent(this.subcat)
            }
        }
    }
    addImage() {
        let string = `editSubCats&content=${btoa(JSON.stringify(this.content))}&tocontent=${this.toContent}&indexarr=${this.indexArr}`
        this.set('slashed', true)
        window.history.pushState({}, null, `${this.rootPath}media/images/galleries?addimageto=cats&method=${string}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
        window.onbeforeunload = function (e) {
            return "you might have changes to be saved, are you sure you whant to leave?";
        };
    }
    _setContent(content) {
        if (content['info']) {
            this.set('temp', content.items[0].categoryName)
            this.set('content', content);
            let obj = this.content.image
            this.imageLabel = 'images'
            this.set('imageArr', obj)
            this.set('inputVal', this._getObjArr(this.content.items))
            this.set('textareaVal', this.content.contentText)
            this.set('subcatSubats', this.content.subCategories)
            this._setsubcatContent()
            if (this.$.Imag)
                this.$.Imag.addImage = (this.addImage).bind(this)
        }
    }
    _setsubcatContent() {
        if (this.content.items[0].categoryName.split('').length > 0) {
            this.set('subcatContent', this.content.items)
            this.subcatContent[0].image = this.content.image[0] === undefined ? '' : this.content.image[0].url
        }
    }
    _setButtons(data) {
        if (data === false) {
            this.$.backButton.classList.remove('diferent')
        } else {
            this.$.backButton.classList.add('diferent')
        }
    }
    _toggleChildren(evt) {
        this.$.subcats.classList.toggle('diferent')
    }
    _addChildren() {
        console.log(true)
        this._pushModel(true)
    }
    _pushModel(data) {
        if (data === true) {
            let subcat = this.subcat
            subcat.subCategories.push(this.Modelo)
            this._reset(() => {
                this.subcat = subcat
                this.view = false
            }, 100)
        }
    }
    _showBack(data) {
        this.$.backButton.classList.add('diferent')
        if (this.temp !== undefined && this.temp.split('').length === 0) {
            this._setContent(Model.value)
            this._removeChild(this.indexArr[0])
        }
        this._viewEdit()
    }
    _viewEdit() {
        this.view = !this.view
    }
    _save() {
        this._viewEdit()
        this._setsubcatContent()
        this.saveButton.classList.add('diferent')
    }
    _setItemsValue(data) {
        if (this.content !== undefined && this.content['items']) {
            for (let par in data) {
                if (par.toString() !== 'undefined') {
                    this.content.items[0][par] = data[par]
                }
            }
        }
    }
    _setContentTextValue(data) {
        if (this.content !== undefined && this.content['contentText']) {
            for (let par in data) {
                if (par.toString() !== 'undefined') {
                    this.content.contentText[0][par] = data[par]
                }
            }
        }
    }
    _slottItem(data, index) {
        let str = `
            <div slot="table"> 
                <cms-subcats-item>
                </cms-subcats-item>
            </div>             
            `;
        let arr = this.indexArr
        arr.push(index)
        this.translator.template.innerHTML = str;
        this.translator.clone(this)
        this.children[this.childElementCount - 1].subcat = data
        this.children[this.childElementCount - 1].toContent = this.toContent
        this.children[this.childElementCount - 1].indexArr = arr
    }
    _getObjArr(content) {
        let obj,
            arr = []
        for (let par in content[0]) {
            obj = Object()
            obj[par] = content[0][par]
            arr.push(obj)
        }
        return arr
    }
    _setSaveButton() {
        return this.$.saveButton
    }
    _setChildrenLang(data) {
        if (this.childElementCount > 0) {
            for (let i = 0; i < this.childElementCount; i++) {
                this.children[i].children[0].lang = data
            }
        }
    }
    _openConfirm(event) {
        let index = event.srcElement.parentElement.getAttribute('value')
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: { name: this.subcatContent[0].categoryName, method: (this._removeChild).bind(this), argument: this.indexArr[0], headderMsgKind: 'delete', type: 'sub-category' }
            }));
        });
    }
    __delete(data) {
        let page = data;
        this.translator._DBW.deletePage((msg) => {
            if (msg !== 'error') {
                this.log(msg);
            }
            else {
                this.error(msg);
            }
        }, page, Consts.__DEV);
    }
    _reset(call, mlscs) {
        this.innerHTML = ''
        setTimeout(() => {
            call()
        }, mlscs)
    }
}
customElements.define(cmsSubcatsItem.is, cmsSubcatsItem);