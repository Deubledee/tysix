import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer';
import { html } from '@polymer/polymer/polymer-element';
import '../elements/cms-content-image';
import '../elements/cms-content-item';
import '../elements/cms-content-text';
import '../styles/cms-comon-style_v3';
import { PolymerElement } from '@polymer/polymer/polymer-element';
const Model = "eyJjb250ZW50VGV4dCI6eyJkZXNjcmlwdGlvbiI6ImFzZGFkc2FkcyJ9LCJpbWFnZXMiOnsiY29udGVudCI6W3siYXV0aG9yIjoiRGlvZ28iLCJkYXRlQWRkZWQiOiIiLCJnYWxsZXJ5IjoicGFnZXMiLCJ0aXRsZSI6ImxhZGllc190c2hpcnRzIiwidXJsIjoiZGF0YS9wYWdlcy9sYWRpZXNfdHNoaXJ0cy5qcGcifV19LCJpdGVtcyI6eyJjYXRlZ29yeU5hbWUiOiJmZGciLCJsYW5nIjoicHQiLCJpbWFnZSI6ImRhdGEvcGFnZXMvbGFkaWVzX3RzaGlydHMuanBnIn19"
const ModeloInfo = "eyJhdXRob3IiOiIiLCJjaGlsZHJlbiI6W10sImRhdGVDcmVhdGVkIjoiIiwiaWQiOiIiLCJsYXN0TW9kaWZpZWQiOltdLCJwYXJlbnQiOiIiLCJ0b0FydGljbGUiOiIiLCJ0b3AiOiIiLCJjaGlsZHJlbkNvdW50IjowfQ=="
export class cmsSubcatsItem extends PolymerElement {
    static get template() {
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
        </style>
        <slot name="spinner"></slot>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>  
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
        <div bottom> 
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
            /* toContent: {
                 type: Object,
                 notify: true,
                 value: {}
             },*/
            published: {
                type: String,
                reflectToAttribute: true
            },
            onSave: {
                type: Object,
                notify: true,
                value: {}
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
            spinOut: {
                type: Boolean,
                value: false
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
        this.translator.template.innerHTML = `<paper-spinner-lite active="false" slot="spinner">
        </paper-spinner-lite>`
        this.spinOut = false
        this.translator.clone(this)
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
            if (this.routeData.page === "subcategory-pages") {
                let parent = (!!this.query.parent) === false ? this.query.content : this.query.parent
                this.set("parent", parent)
                this.set('subCatChildren', this.subcat.children)
                if ('indexarr' in this.query) {
                    let temp = this.query.indexarr.split(','),
                        index2 = data.length,
                        index = (temp.length)
                    if (index > index2) {
                        this.translator._DBW.getSubcatsData((done) => {
                            this._setContent(done)
                            this.deSpin()

                        }, { name: this.parent, doc: this.subcat.id }, this.translator.__DEV)
                        if (data[index2 - 1] === parseInt(temp[index2 - 1])) {
                            this._toggleChildren()
                        }
                    }
                    if (index === index2) {
                        if (data[index2 - 1] === temp[index2 - 1]) {
                            this._setContent(JSON.parse(localStorage[`cats${parent}${this.query.indexarr}`]).pop())
                            this._viewEdit(false)
                            this.saveButton.classList.remove('diferent')
                        } else {
                            this.translator._DBW.getSubcatsData((done) => {
                                this._setContent(done)
                                this.deSpin()
                            }, { name: this.parent, doc: this.subcat.id }, this.translator.__DEV)
                        }
                    }
                } else {
                    this.translator._DBW.getSubcatsData((done) => {
                        this._setContent(done)
                        this.deSpin()
                    }, { name: this.parent, doc: this.subcat.id }, this.translator.__DEV)

                }
            }
        }
    }
    deSpin() {
        if (this.spinOut === false) {
            this.removeChild(this.children[0])
            this.spinOut = true
        }
    }
    _viewEdit(boll) {
        let string = `content=${this.subcat.id}&parent=${this.parent}&add=false&name=${this.content[this.catlang].categoryName}`
        this.add = (boll instanceof MouseEvent) === true ? false : boll
        localStorage[`cats${this.parent}${this.subcat.id}`] = JSON.stringify([this.content])
        localStorage[`cats${this.parent}${this.subcat.id}info`] = JSON.stringify([this.subcat])
        window.history.pushState({}, null, `${this.rootPath}content/pages/edit-subcategory-pages?${string}`);
        window.dispatchEvent(new CustomEvent('location-changed'))

    }
    _setContent(content) {
        this.set('content', content);
        this._setsubcatContent()
        if (this.$.Imag)
            this.$.Imag.addImage = (this.addImage).bind(this) /**/
    }
    _setsubcatContent() {
        if (this.content[this.lang]) {
            this.set('catlang', this.lang)
            this.set('subcatContent', [this.content[this.lang]])
            this.subcatContent[0].image = this.content.images.content[0] === undefined ? '' : this.content.images.content[0].url
        } else {
            let keys = Object.keys(this.content)
            let arr = keys.find(item => { if (item !== 'images') return item })
            this.set('catlang', arr)
            this.set('subcatContent', [this.content[this.catlang]])
            this.subcatContent[0].image = this.content.images.content[0] === undefined ? '' : this.content.images.content[0].url
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
            let model = JSON.parse(atob(ModeloInfo))
            let subcat = this.subcat
            modelo.top = false
            subcat.subCategories.push(model)
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
    _save(subcat, content, add) {
        this.content = content
        this.__info = {}
        this.__info.page = subcat.parent
        this.__info.id = subcat.id
        this.__info.content = subcat
        this.add = add
        this.saveSubcats()
    }
    setChild(id) {
        this.subcat.children.push(id)
        this.__info = {}
        this.__info.page = this.subcat.parent
        this.__info.id = this.subcat.id
        this.__info.content = this.subcat
        this.saveChangedData('subCategories').then(data => { console.log(data) })
    }
    saveSubcats() {
        if (this.add === true) {
            this.saveAddedData('subCategories').then(data => {
                this.saveAddedSubcatData().then(data => {
                    this._setsubcatContent()
                    this.saveButton.classList.add('diferent')
                    this.routeData = {}
                    this.query = {}
                    this.view = !this.view
                    this.onSave()
                })
            })
            this.parentElement.parentElement.setChild(this.__info.id)
        }
        if (this.add === false) {
            this.saveChangedData('subCategories').then(data => {
                saveCangedSubcatData('subCategories').then(data => {
                    this._setsubcatContent()
                    this.saveButton.classList.add('diferent')
                    this.routeData = {}
                    this.query = {}
                    this.view = !this.view
                    this.onSave()
                })
            })
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
        this.subcat.children.push(arr.join(''))
        this.translator.template.innerHTML = str;
        this.translator.clone(this)
        this.children[this.childElementCount - 1].children[0].view = true
        if (this.editIndex === index) this.children[this.childElementCount - 1].children[0].view = false
        this.children[this.childElementCount - 1].children[0].lang = this.lang
        this.children[this.childElementCount - 1].children[0].route = this.route
        //this.children[this.childElementCount - 1].children[0].toContent = [this.toContent]
        this.children[this.childElementCount - 1].children[0].subcat = data
        this.children[this.childElementCount - 1].children[0].onSave = (this.onSave).bind(this)
        this.children[this.childElementCount - 1].children[0].indexArr = btoa(arr.join(''))
        this.children[this.childElementCount - 1].children[0]._removeChild = (this._removeChild).bind(this)
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
        this.subcatSubats = []
        this.subCatChildren = ''
        setTimeout(() => {
            call()
        }, mlscs)
    }
}
customElements.define(cmsSubcatsItem.is, cmsSubcatsItem);