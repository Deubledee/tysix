import '@polymer/iron-icons/editor-icons';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '../elements/cms-content-image';
import '../elements/cms-content-item';
import '../elements/cms-content-text';
import '../styles/cms-comon-style_v3';
export class cmsContentTemplate extends PolymerElement {
    static get template() {
        return html`
        <style include="cms-comon-style_v3">
        :host {
            position: relative;
        }       
            ${this._getStyles}
        </style>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>
        <main id="main">
            <nav top>
                <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">                    
                    <div langdiv>
                        ${this._getLangAnchor} 
                    </div> 
                </iron-selector>        
                <div path> 
                    ${this._getPath} 
                    <div inputlang tgglelang$="[[!tgglelang]]"> 
                        <cms-content-item
                            item="[[itemlang]]"
                            save-button="[[saveButton]]"
                            res="{{addLangResponse}}">
                        </cms-content-item>               
                        <!--dom-repeat repeat items="[[itemlang]]" as="item">
                            <template-->
                            <!--/template>
                        </dom-repeat-->
                        <div class="closed" warning$="[[warning]]">
                            <h5>
                                [[warningMsg]] 
                            </h5>   
                            <a href="https://www.metamodpro.com/browser-language-codes" target="_blank">
                            <h6>  more info </h6> 
                            </a>                        
                        </div>                                               
                    </div>
                </div>
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
        nav[top]{
            display: flex;
            flex-direction: column;
        }
        div[saveandaddlang]:{
            flex-basis: 100px
        }
        .navbottom{
            margin-top: 48px;  
        }
        div[langdiv] section {
            display: flex;
            width: 75px;
            flex-flow: nowrap;
            flex-direction: row-reverse;
            height: 23px;
            color: var(--app-published-color);
            border-radius: 6px;
            border-bottom-right-radius: unset;
            border-bottom-left-radius: unset;
            border-top-left-radius: unset;
            box-shadow: 1px -1px 0px var(--app-topnav-icon-color)
        }
        div[goback]{
            height: 38px;
            display: flex;
            padding-left: 10px;
        }
        div[path]{
            display: flex;
            flex-direction: row;
            position: relative;
          /*  top: -14px; */ 
            font-style: italic;    
            padding-left: 42px;      
        }
        div[path] h3 {
            margin-block-start: 21px;
            margin-block-end: 7px;
        }
        div[path] h4 {
            margin-block-start: 8px;
            margin-block-end: 25.33px;
            color: var(--paper-blue-a100); 
        }
        .path{
            flex-basis: 100%;
        }
        div[save]{
            position: relative;
            top: 20px;
            padding-left: 10px;            
        }
        div[inputlang] {
            padding: 17px;
        }
        div[langdiv]{
            display: flex;
            flex-direction: row;
        }
        .langdivsectionflexbasis{
            flex-basis: 143px;
            text-align: center;
            border-radius: unset!important;
            box-shadow: unset!important;
            margin-right: 35px;
        }
        .langdivsectionnpaddingtop {
            padding-top: 6px;
            flex-basis: 7%;
        }
        div[tgglelang]{
            display: none
        }
        .anchorish{
            cursor: pointer; 
        }
        div[bottom]{
            flex-direction: column;
            padding-left: 10%;
        }
        div[langdiv] section[nova]{
            color: var(--paper-grey-300);;
            background-color: grey;
        }
        div[langdiv] paper-button[nova]{
            color: var(--paper-blue-300);
            background-color: var(--paper-blue-300);;
        }
        section[class="langdivsectionnpaddingtop"] a{
            height: 16px;
            width: 54px;  
        }
        div.closed{
            position: absolute;
            display: none
        }
        div[warning]{
            width: 100%;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            color: var(--paper-pink-700);
           /* background-color: grey;*/
        }
        div[warning] h5{
            flex-basis: 19%;
            margin-block-start: 0.4em;
        }
        div[warning] h5, div[warning] h6{
            letter-spacing: 0.1em;
        }
        div[warning] h6 {
            margin-block-start: 1.3em;
        }
        div[warning]  a{
            flex-basis: 6%;
            color: var(--paper-grey-600);
        }        
        `
    }
    static get _getLangAnchor() {
        return html` 
        <section class="langdivsectionflexbasis">
            <a class="anchorish" id="adlang"  on-click="_newLang">
                <paper-icon-button icon="av:library-add" aria-label="lang">
                </paper-icon-button> <span>Add lang</span>
            </a> 
        </section>         
        <dom-repeat repeat items="[[pageLangs]]" as="pagelang">
            <template>
                <section class="langdivsectionnpaddingtop" nova$="[[_nova(event, pagelang)]]">
                    <paper-button class="exex" on-click="_openConfirm">
                            x
                    </paper-button>
                    <a href="[[rootPath]][[str]]&lang=[[pagelang]]" >
                        <paper-button langbtn aria-label="lang">
                            [[pagelang]]
                        </paper-button>
                    </a>
                </section>
            </template>
        </dom-repeat> `
    }
    static get _getPath() {
        return html`   
         <div  class="path" tgglelang$="[[tgglelang]]">          
        </div>`
    }

    static get _getContentItems() {
        return html`
                <div container >
                    <div bottom hidebottom$="[[hidebottom]]">
                        <dom-repeat repeat items="[[inputVal]]" as="item">
                            <template>
                                <section class="flexchildbotomFull">
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
                                <section class="flexchildbotomFullExtra">
                                    <cms-content-text
                                        item="[[item]]"
                                        save-button="[[saveButton]]"
                                        res="{{textAreaResponse}}">
                                    </cms-content-text>
                                </section>
                            </template>
                        </dom-repeat>
                        <section class="flexchildbotom">
                            <cms-content-image id="image"
                                item-label="[[imageLabel]]"
                                images="[[imageArr]]"
                                _deleteImg="[[deleteImg]]"  
                    </cms-content-image>
                </section>

                    </div>
            </div >
                `;
    }
    static get _getSideInfo() {
        return html`
                < dom - repeat repeat items = "[[inform]]" as="cat" >
                    <template>
                        <div class="center-menu">
                            <aside class="info">
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
        </dom - repeat > `
    }
    static get is() { return 'cms-content-template'; }
    static get properties() {
        return {
            user: {
                type: Object,
                notify: true
            },
            removeArr: {
                type: Array,
                value: []
            },
            infoState: {
                type: String,
                value: 'No info available..',
                notify: true
            },
            itemlang: {
                type: Object,
                notify: true,
                value: function () { return { 'addlang': '' } }
            },
            tgglelang: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true,
            },

        }
    }
    ready() {
        super.ready();
    }
    onSave() {
        return 0
    }
    _setContent(lang, content) {
        this.content = content
        let cont = this.content[0][lang]
        this.set('inputVal', this._getObjArr(cont, true))
        this.set('textareaVal', this._getObjArr(cont, false))
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
        let time
        this.infoState = 'getting info data..'
        if (!!localStorage[`${str}info`]) {
            time = setTimeout(() => {
                this.infoState = 'setting info data..'
                clearTimeout(time)
                time = setTimeout(() => {
                    this.set('inform', JSON.parse(localStorage[`${str}info`]))
                    this.infoState = ''
                    clearTimeout(time)
                }, 250);
            }, 500);
        } else {
            time = setTimeout(() => {
                this.infoState = 'no info data found..!!'
                clearTimeout(time)
                time = setTimeout(() => {
                    this.infoState = '!!info not available..!!'
                    this.set('inform', JSON.parse(localStorage[`${str}info`]))
                    clearTimeout(time)
                }, 250);
            }, 500);
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
    _setAddLangValue(data) {
        if (typeof this.time === 'number') clearTimeout(this.time)
        if (typeof this.time2 === 'number') clearTimeout(this.time2)
        if (!!this.content[0] && !!data && ('undefined' in data) === false) {
            let arr = Object.keys(data)
            if (data[arr[0]] !== undefined) {
                let datalength = data[arr[0]].split(''), cont
                datalength = datalength.length
                this.time = setTimeout(() => {
                    if (datalength === 2) {
                        this.newLang = data.addlang
                        this.content[0][this.newLang] = {}
                        //   console.log(data, this.content[0])
                        for (let par in this.content[0][this.setContetnLang]) {
                            if (par.toString() !== 'undefined')
                                this.content[0][this.newLang][par] = this.content[0][this.setContetnLang][par]
                        }
                        this.set('pageLangs', [])
                        this.content[0][this.newLang].lang = this.newLang
                        cont = this.content[0]
                        arr = this._setLangArr(cont)
                        setTimeout(() => {
                            this.set('pageLangs', arr)
                            this.warning = false
                            this.warningMsg = ''
                        }, 250);
                    }
                    else {
                        this.time2 = setTimeout(() => {
                            this.warning = true
                            this.warningMsg = 'lang must have two charecters ex: pt, en, fr'
                        }, 250);
                    }
                }, 500)
            }
        }
    }
    __removelang(event) {
        let obj = {}
        for (let par in this.content[0]) {
            if (par.toString() !== event.model.__data.pagelang) {
                obj[par] = this.content[0][par]
            }
        }
        this.content = []
        this.content = [obj]
        this.removeArr.push(event.model.__data.pagelang)
        let arr = this._setLangArr(this.content[0])
        this.pageLangs = []
        this.set('pageLangs', arr)
        this.$.saveButton.classList.remove('diferent')
        let evalu = !!(this.newlangstate)
        this.removelang = (evalu === true) ? false : true
    }
    _openConfirm(event) {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: { name: event.model.__data.pagelang, method: (this.__removelang).bind(this), argument: event, headderMsgKind: 'delete', type: 'sub-category-lang' }
            }));
        });
    }
    _nova(event, lang) {
        if (!!this.newlangstate) {
            let evalu = !!(lang === this.newLang)
            return (evalu === true) ? true : false
        }
    }
    _newLang() {
        if (!!this.setContetnLang) {
            this.set('tgglelang', !this.tgglelang)
            if (this.tgglelang === true) {
                this.set('newlangstate', true)
            } else {
                this.warning = false
                this.warningMsg = ''
            }
        }
    }
    __setLAng(lang, cont) {
        this.set('setContetnLang', lang)
        this._setContent(lang, cont)
    }
    __reset() {
        this._debounceEvent = Debouncer.debounce(this._debounceEvent, microTask, () => {
            window.dispatchEvent(new CustomEvent('reset-list-type', {}));
        });
    }
}
customElements.define(cmsContentTemplate.is, cmsContentTemplate);