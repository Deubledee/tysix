import '@polymer/iron-icons/editor-icons';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { html } from '@polymer/polymer/polymer-element';
import '../elements/cms-content-image';
import '../elements/cms-content-item';
import '../elements/cms-content-text';
import '../styles/cms-comon-style_v3';
import { cmsSaveLib } from '../tools/cms-save-lib.js';
export class cmsContentTemplate extends cmsSaveLib {
    static get template() {
        return html`       
        ${this._getStyles}
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>
        <main id="main">
            <nav top>    
                <div goback>
                    ${this._getAnchor}
                </div>
                    ${this._getLangAnchor} 
                <div save> 
                    <paper-button id="saveButton" class="diferent" on-click="onSave" aria-label="mode-save">
                        [[Save]]
                    </paper-button>
                </div>
            </nav>           
                <div class="flex">
                    <nav class="navbottom" id="bottom">                    
                            ${this._getContentItems}
                    </nav>
                    <nav class="navside">
                        [[infoState]]
                        ${this._getSideInfo}
                    </nav>
                </div> 
        </main>
        `;
    }
    static get _getStyles() {
        return html` 
        <style include="cms-comon-style_v3">
        :host {
            position: relative;
        }
        .navbottom{
            margin-top: 48px;  
        }
        paper-button[langbtn]{  
            background-color: var(--paper-blue-50);
        }
        div[goback]{
            height: 38px;
            display: flex;
            padding-left: 10px;
        }
        div[save]{
            position: relative;
            top: 4px;            
        }
        paper-button{
            height: auto
        }
        div[langdiv]{
            height: 38px;
            border-radius: 4px;
            background-color: var(--divider-color);
        }
        </style>`
    }
    static get _getAnchor() {
        return html`   
            <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">                    
                <a>   
                    < 
                </a>            
                <dom-repeat repeat items="[[trigger]]" as="page">
                    <template>  
                        <a href="[[_getStr(page)]]">  
                            <paper-button  aria-label="Go back page">                   
                               [[_getPage(page)]]
                            </paper-button>               
                        </a>    /                
                    </template>
                </dom-repeat> 
            </iron-selector> `
    }
    static get _getLangAnchor() {
        return html`         
        <div langdiv>
            <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation"> 
                <a id="adlang">
                    <paper-icon-button icon="av:library-add" aria-label="lang">
                    </paper-icon-button>
                    Add lang
                </a>           
                <dom-repeat repeat items="[[pageLangs]]" as="pagelang">
                    <template>
                        <a href="[[rootPath]][[str]]&lang=[[pagelang]]">
                            <paper-button langbtn aria-label="lang">
                                [[pagelang]]
                            </paper-button>
                        </a>
                    </template>
                </dom-repeat> 
            </iron-selector> 
        </div>`
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
            </div>
        `;
    }
    static get _getSideInfo() {
        return html`
        <dom-repeat repeat items="[[inform]]" as="cat">
            <template>
                <div class="center-menu">
                    <aside>
                        <span>
                            [[info]]
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
                    <dom-repeat repeat items="[[cat.lastModified]]" as="createdAt">
                        <template>
                            <section>
                                <aside class="asideBackgrc">
                                    <span>
                                        [[createdAt.author]]
                                    </span>
                                </aside>
                                <aside class="asideBackgrc">
                                    <span>
                                        [[createdAt.date]]
                                    </span>
                                </aside>
                            </section>
                        </template>
                    </dom-repeat>
                </div>
            </template>
        </dom-repeat>`
    }
    static get is() { return 'cms-content-template'; }
    static get properties() {
        return {
            user: {
                type: Object,
                notify: true
            },
            size: {
                type: Boolean,
                value: true,
                notify: true
            },
            infoState: {
                type: String,
                value: 'No info available..',
                notify: true
            },
            tempo: {
                type: String,
                value: 'undefined',
                notify: true
            }
        }
    }
    ready() {
        super.ready();
    }
    onSave() {
        return 0
    }
    _setContent(lang, content) {
        if (this.time !== undefined) clearTimeout(this.time)
        this.content = content
        let cont = this.content[0][lang]
        this.set('inputVal', this._getObjArr(cont, true))
        this.set('textareaVal', this._getObjArr(cont, false))
        this.set('inform', [])
    }
    _getStr(item) {
        let str = ''
        if (item === 'home') {
            str = `/${item}`
        }
        if (item.match('/content') !== null) {
            str = `${item}`;
        }
        if (item.match('/subcategory') !== null) {
            str = `${this.route.prefix}${item}${location.search}`;
        }
        return str
    }
    _getPage(item) {
        let str = ''
        let word
        if (item === 'home') {
            str = `${item}`
        } else {
            word = item.split('/')
            word.shift()
            word = word.join(' | ')
            str = word;
        }
        return str
    }
    _getObjArr(content, item) {
        let obj,
            arr = []
        for (let par in content) {
            if (par !== 'image') {
                if (!!item) {
                    if (par !== 'description') {
                        obj = Object()
                        obj[par] = content[par]
                        arr.push(obj)
                    }
                } else {
                    if (par === 'description') {
                        obj = Object()
                        obj[par] = content[par]
                        arr.push(obj)
                    }
                }
            }
        }
        return arr || []
    }
    _getPageInfo(str) {
        this.infoState = 'info not available..'
        let time
        if (this.add === false) {
            this.infoState = 'getting info data..'
            time = setTimeout(() => {
                this.infoState = ''
                this.set('inform', JSON.parse(localStorage[`${str}info`]))
                clearTimeout(time)
            }, 250);
        } else {
            clearTimeout(time)
            this.set('inform', [])
        }
    }
    _setItemsValue(data) {
        if (!!this.content[0]) {
            for (let par in data) {
                if (par.toString() !== 'undefined') {
                    let lang = this.query.lang || 'lang'
                    this.content[0][lang][par] = data[par]
                }
            }
        }
    }
    _setContentTextValue(data) {
        if (!!this.content[0]) {
            for (let par in data) {
                if (par.toString() !== 'undefined') {
                    let lang = this.query.lang || 'lang'
                    this.content[0][lang][par] = data[par]
                }
            }
        }
    }
    save() {
        if (this.add === true) {
            this.saveAdded().then(data => {
                window.onbeforeunload = function () { };
                this.editing = 0;
                this.temp = '';
                this.$.saveButton.classList.add('diferent');
                this.$.anchor.classList.remove('diferent');
                setTimeout(() => {
                    this.__reset();
                }, 500)
            })
            this.saveAddedData('data').then(data => {
                window.onbeforeunload = function () { };
                this.editing = 0;
                this.temp = '';
                this.$.saveButton.classList.add('diferent');
                this.$.anchor.classList.remove('diferent');
                setTimeout(() => {
                    this.__reset();
                }, 500)
            })
        }
        if (this.add === false) {
            this.saveChanged().then(data => {
                window.onbeforeunload = function () { };
                this.editing = 0;
                this.temp = '';
                this.$.saveButton.classList.add('diferent');
                setTimeout(() => {
                    this.__reset();
                }, 500)
            })
        }
    }
    __reset() {
        this._debounceEvent = Debouncer.debounce(this._debounceEvent, microTask, () => {
            window.dispatchEvent(new CustomEvent('reset-list-type', {
                bubbles: true, composed: true
            }));
            window.dispatchEvent(new CustomEvent('reset', {
                bubbles: true, composed: true
            }));
        });
    }
}
customElements.define(cmsContentTemplate.is, cmsContentTemplate);