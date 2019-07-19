import { cmsItemTemplate } from '../templates/cms-item-template'
import { html } from '@polymer/polymer/polymer-element';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer'
import '../styles/cms-comon-style_v3';
import '../elements/cms-content-item'
import '../elements/cms-content-text'
import '../elements/cms-content-image'
const Model = "eyJ2YWx1ZSI6eyJjb250ZW50VGV4dCI6W3siZGVzY3JpcHRpb24iOiIifV0sImltYWdlIjpbXSwiaXRlbXMiOlt7ImNhdGVnb3J5TmFtZSI6IiIsInR5cGUiOiIiLCJsYW5nIjoiIn1dLCJzdWJDYXRlZ29yaWVzIjpbXX19"
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
            onSave: {
                type: Object,
                notify: true,
                value: {}
            },
            _onSave: {
                type: Object,
                notify: true,
                computed: '__onSave(onSave)'
            },
            indexArr: {
                type: Array,
                notify: true,
            },
            _indexArr: {
                type: Object,
                notify: true,
                computed: '_onIndexArr(indexArr)',
                observer: '_subcatAdded'
            },
            dataObj: {
                type: Array,
                observer: '_setChildren'
            },
            add: {
                type: Boolean,
                value: true,
                notify: true
            },
            time: Number
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

    _subcatAdded(data) {
        if (!!data) {
            if (this.routeData.page === "edit-subcategory-pages" || this.routeData.page === "add-subcategory-pages") {
                this.add = this.query.adTosub
                if ('indexarr' in this.query) {
                    let temp = this.query.indexarr.split(','),
                        index2 = this._indexArr.length,
                        index = (temp.length)
                    if (index > index2) {
                        if (this._indexArr[index2 - 1] === parseInt(temp[index2 - 1])) {
                            this._toggleChildren()
                        }
                    }
                    if ((index - 1) === index2) {
                        if (this._indexArr[index2 - 1] === parseInt(temp[index2 - 1])) {
                            this._reset(() => {
                                this._setContent(this.subcat)
                            }, 60)
                        }
                    }
                    if (index === index2) {
                        if (this._indexArr[index2 - 1] === parseInt(temp[index2 - 1])) {
                            this._setContent(JSON.parse(localStorage[`cats${this.subcat.id}`]))
                            this._viewEdit(false)
                            this.saveButton.classList.remove('diferent')
                        }
                    }
                } else {
                    this.set("parent", this.query.content)
                    this.translator._DBW.getSubcatsData((done) => {
                        this._setContent(done)
                    }, { name: this.parent, doc: this.subcat.id }, this.translator.__DEV)
                    if (this.subcat.subCatChildren !== 'N/A') {
                        this.set('subCatChildren', this.subcat.children)
                    }
                }
            }
        }
    }

    _setContent(content) {
        if (content['items']) {
            //  console.log(this.subcat[0].name)
            this.set('content', content);
            this.set('temp', content.items.categoryName)
            let obj = this.content.images.content
            this.imageLabel = 'images'
            this.set('imageArr', obj)
            this.set('inputVal', this._getObjArr([this.content.items]))
            this.set('textareaVal', [this.content.contentText])
            this._setsubcatContent()
            if (this.$.Imag)
                this.$.Imag.addImage = (this.addImage).bind(this)
            /**/
        }
    }
    _getObjArr(content) {
        let obj,
            arr = []
        for (let par in content[0]) {
            if (par.toString() !== 'undefined' && par.toString() !== 'image') {
                obj = Object()
                obj[par] = content[0][par]
                arr.push(obj)
            }
        }
        return arr
    }
    _setsubcatContent() {
        if (this.content.items.categoryName.split('').length > 0) {
            this.set('subcatContent', [this.content.items])
            this.subcatContent[0].image = this.content.images.content[0] === undefined ? '' : this.imageArr[0].url
        }
    }
    _setButtons(data) {
        if (data === false) {
            this.$.backButton.classList.remove('diferent')
        } else {
            this.$.backButton.classList.add('diferent')
        }
    }
    _onIndexArr(data) {
        return atob(data)
    }
    addImage() {
        let string = `addimageto=cats&content=${this.subcat.id}&method=editSubCats&indexarr=${this._indexArr}&adTosub=${this.add}`
        localStorage[`cats${this.subcat.id}`] = JSON.stringify(this.subcat)
        window.history.pushState({}, null, `${this.rootPath}media/images/galleries?${string}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
        window.onbeforeunload = function (e) {
            return "you might have changes to be saved, are you sure you whant to leave?";
        };
    }
    _toggleChildren() {
        if (this.$.subcats.classList.contains('diferent') === true) {
            this.$.subcats.classList.remove('diferent')
        } else {
            this.$.subcats.classList.add('diferent')
        }
        if (!this.subcatSubats && this.subCatChildren !== 'N/A') {
            let dataObj = []
            this.subCatChildren.map(item => {
                if (!!this.parent) {
                    this.translator._DBW.queryPageData((done) => {
                        dataObj.push(done.pop())
                        this.dataObj = dataObj
                    }, { name: this.parent, dataType: "subCategories", query: `id,==,${item}` })
                }
            })
        }
    }
    _setChildren(data) {
        if (typeof this.time === 'number') {
            clearTimeout(this.time)
        }
        this.time = setTimeout(() => {
            this.set('subcatSubats', data)
        }, 120);
    }
    _addChildren() {
        this._pushModel(true)
        this._toggleChildren()
    }
    _pushModel(data) {
        if (data === true) {
            let model = JSON.parse(atob(Model))
            let subcat = this.subcat
            subcat.subCategories.push(model.value)
            this.subcat = subcat
            this.subcatSubats = []
            this.editIndex = this.childElementCount
            console.log(this, this.subcat.subCategories, data)
            this._reset(() => {
                this._setContent(this.subcat)
                this.subcatSubats = this.subcat.subCategories
            }, 60)/* */
        }
    }
    _slottItem(data, index) {
        let str = `
             <div slot="table"> 
                <cms-subcats-item>
                </cms-subcats-item>
             </div>             
             `;
        let arr = [atob(this.indexArr)]
        arr.push(index)
        this.translator.template.innerHTML = str;
        this.translator.clone(this)
        this.children[this.childElementCount - 1].children[0].view = true
        if (this.editIndex === index) this.children[this.childElementCount - 1].children[0].view = false
        this.children[this.childElementCount - 1].children[0].lang = this.lang
        this.children[this.childElementCount - 1].children[0].route = this.route
        this.children[this.childElementCount - 1].children[0].toContent = [this.toContent]
        this.children[this.childElementCount - 1].children[0].getInfo = (this.getInfo).bind(this)
        this.children[this.childElementCount - 1].children[0].setInfo = (this.setInfo).bind(this)
        this.children[this.childElementCount - 1].children[0].subcat = data
        this.children[this.childElementCount - 1].children[0].onSave = (this._onSave).bind(this)
        this.children[this.childElementCount - 1].children[0].indexArr = btoa(arr.join(''))
        this.children[this.childElementCount - 1].children[0]._removeChild = (this._removeChild).bind(this)
    }
    _showBack() {
        this.$.backButton.classList.add('diferent')
        if (this.temp !== undefined && this.temp.split('').length === 0) {
            let model = JSON.parse(atob(Model))
            this._setContent(model.value)
            this._removeChild({ idx: this._indexArr, add: this.add })
        }
        this._viewEdit(true)
    }
    _viewEdit(boll) {
        this.view = !this.view
        this.add = (boll instanceof MouseEvent) === true ? false : boll
    }
    _save() {
        this._setsubcatContent()
        this.view = !this.view
        this.saveButton.classList.add('diferent')
        this._onSave(this.add, this._indexArr)
    }
    __onSave(data) {
        return function (add, indexArr) {
            data(add, indexArr[0])
        }
    }
    _setItemsValue(data) {
        if (this.content !== undefined && this.content['items']) {
            for (let par in data) {
                if (par.toString() !== 'undefined' && par.toString() !== 'image') {
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
                detail: { name: this.subcatContent[0].categoryName, method: (this._removeChild).bind(this), argument: { idx: this._indexArr, add: this.add }, headderMsgKind: 'delete', type: 'sub-category' }
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
        this.subcatSubats = undefined
        this.subCatChildren = undefined
        setTimeout(() => {
            call()
        }, mlscs)
    }
}
customElements.define(cmsSubcatsItem.is, cmsSubcatsItem);