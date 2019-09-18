import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer';
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '../elements/cms-content-image';
import '../elements/cms-content-item';
import '../elements/cms-content-text';
import '../styles/cms-comon-style_v3';
import { cmsSubcatsLib } from '../tools/cms-save-lib.js';
export class cmsSubcatsItem extends cmsSubcatsLib(PolymerElement) {
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
                display: flex;
            }
            div[chilssubcat]{
                border-bottom: 1px dashed #10b6be;;
            }
            article[updated]{
                background-color: var(--app-scrollbar-color);
            }
        </style>
            <slot name="spinner"></slot>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>  
        
        <dom-repeat repeat items="[[subcatContent]]" as="item">
            <template>                
                <article on-click="__changeColorTimeout" centerlistitem updated$="[[updated]]">                    
                    <div title="[[item.categoryName]]">
                        <paper-button title="[[item.categoryName]]">
                            [[item.categoryName]]
                        </paper-button>
                    </div>
                    <div title="[[item.toArticle]]" toarticle$="[[item.toArticle]]">
                        <paper-button title="[[item.toArticle]]">
                            [[item.toArticle]]
                        </paper-button>
                    </div>
                    <div title="[[item.Published.state]]" published$="[[item.Published.state]]">
                        <paper-button title="[[item.Published.state]]">
                            [[item.Published.state]]
                        </paper-button>
                    </div>
                    <div>
                        <paper-button on-click="_viewEdit">
                            <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
                            <paper-icon-button icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                        </paper-button>
                    </div>
                    <div>
                        <paper-icon-button icon="av:not-interested" aria-label="delete" on-click="_openConfirm">
                        </paper-icon-button>
                    </div>                
                </article>
            </template>                            
        </dom-repeat>         
        <div  bottom>        
            <div  class="plus">
                    <div class="plussubcat noFlex">
                        <paper-icon-button on-click="_addChildren" icon="av:library-add" aria-label="mode-show"></paper-icon-button>
                    </div>  
                <div class="subcat noFlex">
                        <div on-click="__changeColorTimeout" class="flexleft">
                            <paper-icon-button on-click="_toggleChildren" icon="editor:drag-handle" aria-label="mode-show"></paper-icon-button>
                        </div>
                        <div  id="subcats" class="diferent">
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
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
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
            published: {
                type: String,
                reflectToAttribute: true
            },
            updated: {
                type: Boolean,
                reflectToAttribute: true,
                notify: true,
                value: false
            },
            published: {
                type: String,
                reflectToAttribute: true,
                notify: true,
                value: ''
            },
            toarticle: {
                type: String,
                reflectToAttribute: true,
                notify: true,
                value: ''
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
        window.addEventListener('changecolor', (event) => {
            this.updated = this.subcat.id === event.detail.update ? true : false
            setTimeout(() => {
                this.routeData.page = "subcategory-pages"
                this.query = { content: this.query.content }
                if (this.childElementCount > 0 && this.children.item(this.children).tagName === "PAPER-SPINNER-LITE") {
                    this._subcatAdded(this._indexArr)
                }
            }, 125);
        }, false)
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
                let parent = this.query.content
                this.set("parent", parent)
                this.set('subCatChildren', this.subcat.children)
                if (!!this.query.reset)
                    this._setNewUpdated(data)
                if (!this.query.reset)
                    this.getSubcat(this.parent, this.subcat.id)
            }
        }
    }
    _viewEdit(boll) {
        let pid = this.subcat.id.split('')
        pid.pop()
        pid = pid.join('')
        let arr = []
        for (let par in this.content) {
            if (par !== 'images') {
                arr.push(par)
            }
        }
        this.subcatLang = arr[0]
        let string = `parent=${this.subcat.id}&content=${this.subcat.parent}&topparent=${pid}&topparentname=${this.subcat.path}&name=${this.content[this.catlang].categoryName}&top=${this.subcat.top}&add=false&lang=${this.subcatLang}`
        this.add = (boll instanceof MouseEvent) === true ? false : boll
        this._changeColor()
        window.history.pushState({}, null, `${this.rootPath}content/pages/edit-subcategory-pages?${string}`);
        window.dispatchEvent(new CustomEvent('location-changed'))
    }
    _changeColor() {
        if (this.updated === true) this.updated = false
    }
    __changeColorTimeout() {
        this.updated = true
        setTimeout(() => {
            this._changeColor()
        }, 500);
    }
    _toggleChildren() {
        let parent = this.query.content
        if (this.$.subcats.classList.contains('diferent') === true) {
            this.$.subcats.classList.remove('diferent')
            if (!this.subcatSubats && !!this.subCatChildren && this.subCatChildren.length > 0) {
                if (!!this.parent) {
                    this.getChildrenSubcats(parent, this.subcat.children)
                }
            }
        } else {
            this.$.subcats.classList.add('diferent')
        }
    }
    _addChild(data) {
        if (data === true) {
            let name
            if (this.subcat.removedChildren.length > 0) {
                name = `${this._indexArr}${(this.subcat.children.length + this.subcat.removedChildren.length) + 1}`
            } else {
                name = `${this._indexArr}${this.subcat.children.length}`
            }
            this.add = true
            let string = `${this.rootPath}content/pages/add-subcategory-pages?content=${this.subcat.parent}&name=${name}&topparentname=${this.subcat.path}/${this.content[this.catlang].categoryName}&parent=${this.subcat.id}&topparent=${this._indexArr}&topparenttype=${this.content[this.catlang].type}&top=false&add=${this.add}`
            window.history.pushState({}, null, string);
            window.dispatchEvent(new CustomEvent('location-changed'))
        }
    }
    __store() {
        localStorage.setItem(`cats${this.subcat.parent}${this.subcat.id}`, JSON.stringify([this.content]))
        localStorage.setItem(`cats${this.subcat.parent}${this.subcat.id}info`, JSON.stringify([this.subcat]))
    }
    _setContent(content) {
        this.set('content', content);
        this._setsubcatContent()
        if (this.$.Imag)
            this.$.Imag.addImage = (this.addImage).bind(this) /**/
    }

    _setsubcatContent() {
        let arr = []
        arr.push(this.subcat)
        if (!!this.content) {
            if (!!this.content[this.lang]) {
                this.set('catlang', this.lang)
                arr[0].categoryName = this.content[this.catlang].categoryName
                this.set('subcatContent', arr)
            } else {
                let keys = Object.keys(this.content)
                let arr2 = keys.find(item => { if (item !== 'images') return item })
                this.set('catlang', arr2)
                arr[0].categoryName = this.content[this.catlang].categoryName

                this.set('subcatContent', arr)
            }
        }
        this.__store()
    }
    _setNewUpdated(data) {
        let temp, index2 = data.length, index
        if (!!this.query.update) {
            temp = this.query.update.split('')
            index = (temp.length)
        }
        if (!!this.query.new) {
            temp = this.query.new.split('')
            index = (temp.length)
        }
        if (index > index2) {
            this.__checkBigger(data, temp, index2)
        }
        if (index === index2) {
            this.__checkEqual(data, temp, index2)
        }
    }
    deSpin() {
        if (this.spinOut === false) {
            this.removeChild(this.children[0])
            this.spinOut = true
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
    _setChildren(data) {
        if (typeof this.time === 'number') {
            clearTimeout(this.time)
        }
        this.time = setTimeout(() => {
            this.set('subcatSubats', data)
        }, 120);
    }
    _addChildren() {
        this._addChild(true)
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
        this.children[this.childElementCount - 1].children[0].lang = this.lang
        this.children[this.childElementCount - 1].children[0].route = this.route
        this.children[this.childElementCount - 1].children[0].subcat = data
        this.children[this.childElementCount - 1].children[0].indexArr = btoa(arr.join(''))
    }
    _openConfirm() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: { name: this.subcatContent[0].categoryName, method: (this._remove).bind(this), argument: { idx: this._indexArr, add: this.add }, headderMsgKind: 'delete', type: 'sub-category' }
            }));
        });
    }
    _remove() {
        let cont, parent = this.query.content, id
        if (this.subcat.top === false) {
            id = this.subcat.id.split('')
            id.pop()
            id = id.join('')
            cont = (this.subcat.top === false) ? JSON.parse(localStorage[`cats${this.subcat.parent}${id}info`]) : undefined
        } else {
            cont = undefined
            id = this.subcat.id
        }
        this.subcat.removed = true
        this.removeSubcats(cont, parent, id)
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