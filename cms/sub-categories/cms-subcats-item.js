import { cmsItemTemplate } from '../templates/cms-item-template'
import { html } from '@polymer/polymer/polymer-element';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
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
            }     
            paper-icon-button {
                width: 31px;
                height: 31px;
            }
            article[centerListItem] div{
                box-shadow: 1px 1px 2px var(--paper-blue-200)
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
                                <shop-image class="bigger" title="[[item.title]]" aria-label="image" src="[[_getImage()]]"
                                    alt="[[item.title]]">
                                </shop-image>
                            </div>
                            <div title="[[item.title]]">
                                <paper-button title="[[item.title]]">
                                    [[item.title]]title
                                </paper-button>
                            </div>
                            <div>
                                <paper-button on-click="_viewEdit">
                                    <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
                                    <paper-icon-button icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                                </paper-button>
                            </div>
                            <div title="[[item.lang]]">
                                <paper-button title="[[item.lang]]">
                                    [[item.lang]]lang
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
        <dom-if if="[[!view]]">
            <template>
                <nav>
                    <paper-button id="saveButton" on-click="_viewEdit"> 
                        [[save]]save
                    </paper-button>
                </nav>             
                <div bottom>
                    <dom-repeat repeat items="[[inputVal]]" as="item">
                        <template>                              
                            <section class="flexchildbotom">
                                <cms-content-item item-input="true"
                                    item="[[item]]" 
                                    anchor="[[anchor]]" 
                                    save-button="[[saveButton]]"  
                                    editing="{{editing}}" 
                                    res="{{inputResponse}}"> 
                                </cms-content-item>    
                            </section> 
                        </template>                            
                    </dom-repeat>
                    <dom-repeat repeat items="[[textareaVal]]" as="item">
                        <template>    
                            <section class="flexchildbotomFull">                                
                                <cms-content-item  item-text-area="true"
                                    item="[[item]]" 
                                    anchor="[[anchor]]" 
                                    save-button="[[saveButton]]"  
                                    editing="{{editing}}" 
                                    res="{{textAreaResponse}}">
                                </cms-content-item> 
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
            </template>
        </dom-if>
        <div bottom> 
            <div class="plus">
                <div class="plussubcat noFlex">
                    <paper-icon-button icon="av:library-add" aria-label="mode-show"></paper-icon-button>
                </div>  
                <div class="subcat noFlex">
                    <div class="center">
                        <paper-icon-button icon="editor:drag-handle" aria-label="mode-show"></paper-icon-button>
                    </div>
                    <slot name="table"></slot> 
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
                value: {},
                observer: '_setContent'
            },
            imageArr: {
                type: Array,
                notify: true
            },
            subcatContent: {
                type: Array,
                notify: true,
                // coputed: '_setContent(subcat)'
            },
            subcatSubats: {
                type: Array,
                notify: true,
            },
            saveButton: {
                type: Object,
                notify: true,
                coputed: '_setSaveButton(subcat)'
            },
            toContent: {
                type: Object,
                notify: true
            },
            view: {
                type: Boolean,
                notify: true,
                value: true
            },
            published: {
                type: String,
                reflectToAttribute: true
            },
            papgePath: {
                type: String,
                value: 'edit-articles'
            },
            indexArr: {
                type: Array,
                value: []
            }
        };
    }
    ready() {
        super.ready();
    }
    _log(data) {
        console.log(data)
    }
    _setContent(content) {
        if (content['info']) {
            this.set('content', content);
            let obj = this.content.image
            this.imageLabel = 'images'
            this.set('imageArr', obj)
            this.set('inputVal', this._getObjArr(this.content.items))
            this.set('textareaVal', this.content.contentText)
            this.set('subcatSubats', this.content.subCategories)
            if (this.$.Imag)
                this.$.Imag.addImage = (this.addImage).bind(this)
        }
    }
    _setItemsValue(data) {
        if (this.content !== undefined && this.content['items']) {
            for (let par in data) {
                this.content.items[0][par] = data[par]
                console.log(this.content, par)
            }
        }
    }
    _setContentTextValue(data) {
        if (this.content !== undefined && this.content['contentText']) {
            for (let par in data) {
                this.content.contentText[0][par] = data[par]
                console.log(this.content.contentText[0][par], par, data)
            }
        }
    }
    _pushModel(data) {
        if (data === true) {
            let subcat = this.subcat
            this._reset()
            setTimeout(() => {
                subcat.subCategories.push(this.Modelo)
                this.subcat = subcat
                this.add = false
            }, 100)
        }
    }
    _slottItem(data, index) {
        let str = `
            <div slot="table"> 
                <cms-subcats-item>
                </cms-subcats-item>
            </div>             
            `;
        this.translator.template.innerHTML = str;
        this.translator.clone(this)
        this.children[this.childElementCount - 1].subcat = data
        this.children[this.childElementCount - 1].toContent = this.toContent
        this.indexArr.push(index)
        this.children[this.childElementCount - 1].indexArr = this.indexArr
    }
    _viewEdit() {
        this.view = !this.view
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
    addImage() {
        let string = `editSubCats&content=${btoa(JSON.stringify(this.content))}&tocontent=${btoa(JSON.stringify(this.tocontent))}&indexarr=${this.indexArr}`
        this.set('slashed', true)
        window.history.pushState({}, null, `${this.rootPath}media/images/galleries?addimageto=cats&method=${string}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
        window.onbeforeunload = function (e) {
            return "you might have changes to be saved, are you sure you whant to leave?";
        };
    }
    _openConfirm(event) {
        let index = event.srcElement.parentElement.getAttribute('value')
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: { name: this.content[index].name, method: (this._deleteImg).bind(this), argument: index, headderMsgKind: 'delete', type: 'article' }
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
}
customElements.define(cmsSubcatsItem.is, cmsSubcatsItem);