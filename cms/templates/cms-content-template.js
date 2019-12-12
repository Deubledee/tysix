import '@polymer/iron-icons/editor-icons';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '../elements/cms-content-image';
import '../elements/cms-content-item';
import '../elements/cms-pop-input';
import '../elements/cms-content-text';
import '../elements/cms-lang-tab-item';
import '../styles/cms-comon-style_v3';
export class cmsContentTemplate extends PolymerElement {
    static get template() {
        return html`
    <style include="cms-comon-style_v3">
    :host {
        position: relative;
        /*font-family: DeliciousRoman;*/
    }  

    main{
        width: 1100px  
    }                  
    nav[bottom2]{
        background-color: rgba(0, 0, 0, 0.45098039215686275);
        position: fixed;
        top: 0%;
        width: 100%;
        height: 100vh;
    }   
    div[background]{
        margin-left: auto;
        top: 0%;
        display: flex;
        flex-direction: column;
        width: 983px;
        height: 100vh;
        background-color: var(--app-secondary-text-color);
    }
    div[placertop]{
        display: block;
    }
    div[placerbottom]{
        display: flex;
        flex-direction: column;
    }
    div[path]{
        height: 30px;
        width: 300px;
    }
    nav[buttons] {
        background-color: var(--app-backgound-color);
        display: flex;
        flex-direction: row;
        border: unset;
        flex-basis: 60px;
        border-bottom: 1px solid var(--light-theme-divider-color);
    } 
    div[saveandaddlang]:{
        flex-basis: 100px
    }
    .navside {
        display: none;
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
        font-style: italic;    
        padding-left: 57px;
        color: var(--app-content-section-span-color)    
    }
    div[path] h5 {
        margin-block-start: 12px;
        margin-block-end: 7px;
    }
    div[path] h6 {
        margin-block-start: 12px;
        margin-block-end: 7px;
        color: var(--paper-blue-a200); 
    }
    .path{
        flex-basis: 100%;
    }
    div[langdiv]{
        position: relative;
        top: 6px;
        border-bottom: 6px solid var(--app-backgound-color);
        display: flex;
        flex-direction: row;
        width: 800px;
        height: 36px;
        margin-left: auto;
        z-index: 2;
        margin-right: auto;;
    }      
    .titleactive{
        position: relative;
        height: 20px;
        top: 10px;
        background-color:var(--paper-grey-200);
    }
    .langdivsection{
        display: flex;
        border-radius: unset!important; 
        box-shadow: unset!important;
        width: 110px;
        height: 60px;
        color: var(--google-blue-300);
    }  
    .anchorish{
        cursor: pointer; 
    }
    div[bottom]{
        background-color: var(--app-backgound-color);
        flex-direction: row;
        box-shadow: 0px 1px 4px var(--disabled-text-color);
        border-radius: 12px;
        padding: 22px;
        width: 816px;
        margin-left: auto;
        margin-right: auto;
        margin-bottom: 10px;
    }
    div[bottom] article{
        flex-basis: 50%;
        padding-inline-start: 50px;
        display: flex;
        flex-direction: column;
    }
    div[langdiv] section[nova]{
        color: var(--paper-grey-300);;
        background-color: grey;
    }
    div[langdiv] paper-button[nova]{
        color: var(--paper-blue-300);
        background-color: var(--paper-blue-300);;
    } 
    div[save]{
        flex-basis: 70%;
        display: block;  
    }       
    .rightblock{
        display: block;
        width: 100%;
    } 
    .marginalize{
        float: right;
    }
    .borderright{
        border-right: 1px solid var(--app-item-backgound-color)
    } 
    .borderleft{
        border-left : 1px solid var(--app-item-backgound-color);
    }  
    .xbuton{
        cursor: pointer;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        padding-top: 2px;
    }     
    .upright, .upleft{
        top: 15px;
        height: 27px;
        width: 27px;
        -webkit-transition: box-shadow 1s ease-out;
        -moz-transition: box-shadow 1s ease-out;
        transition: box-shadow 1s ease-out;
    }
    .upright{
        position: relative;
        margin-left: auto;
        transform: rotateZ(46deg);
        box-shadow: 2px -2px 1px var(--light-theme-divider-color);
        right: 22px;   
        border-top-right-radius: 7px;   
        border-top-left-radius: 7px;
        -webkit-transition: box-shadow 1s ease-in, width 1s ease-in, height 1s ease-in, right is ease-in;
        -moz-transition: box-shadow 1s ease-in, width 1s ease-in, , height 1s ease-in, right is ease-in;
        transition: box-shadow 1s ease-in, width 1s ease-in, height 1s ease-in, right is ease-in;
    }
    .upleft{
        position: relative;
        margin-right: auto;
        margin-left: auto;
        transform: rotateZ(-45deg);
        box-shadow: -2px -2px 1px var(--light-theme-divider-color);
        right: -1px;
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
        -webkit-transition: box-shadow 1s ease-in, width 1s ease-in, height 1s ease-in, right is ease-in;
        -moz-transition: box-shadow 1s ease-in, width 1s ease-in, height 1s ease-in, right is ease-in;
        transition: box-shadow 1s ease-in, width 1s ease-in, height 1s ease-in, right is ease-in;
    }
    .upright[hovererd]{
        -webkit-transition: box-shadow 1s ease-out, width 1s ease-out, height 1s ease-out, right is ease-out;
        -moz-transition: box-shadow 1s ease-out, width 1s ease-out, height 1s ease-out, right is ease-out;
        transition: box-shadow 1s ease-out, width 1s ease-out, height 1s ease-out, right is ease-out;
        transform: rotateZ(-45deg);
        box-shadow: -2px -2px 2px var(--paper-lime-700);
        border-top-left-radius: 0px;
        height: 20px;
        width: 20px;
        right: 34px;
    }
    .upleft[hovererd]{
        -webkit-transition: box-shadow 1s ease-out, width 1s ease-out, height 1s ease-out, right is ease-out;
        -moz-transition: box-shadow 1s ease-out, width 1s ease-out, height 1s ease-out, right is ease-out;
        transition: box-shadow 1s ease-out, width 1s ease-out, height 1s ease-out, right is ease-out;
        transform: rotateZ(45deg);
        border-top-right-radius: 0px;
        box-shadow: 2px -2px 2px var(--paper-lime-700);
        height: 20px;
        width: 20px;
        right: -4px;
    }  
    cms-lang-tab-item {
        margin-right: 3px
    }
    cms-pop-input.abs{
        position: absolute;
        top: 110px;
        left: 68%;
    }
    ${this._getStyles}
    </style>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
    </app-route>
    <main id="main">
        <nav bottom2 on-click="closeanchor">
            <div placertop>
                <div background>
                    <nav class="diferent">
                        [[infoState]]
                        ${this._getSideInfo}
                    </nav>
                    <nav buttons>  
                        <a id="closeanchor" class="xbuton" href="[[rootPath]][[closestr]]" on-click="_cancelhoverd" title="close">
                            <div class="langdivsection borderright" on-mouseover="_hoverd" on-mouseout="_hoverd">        
                                <div class="upleft" hovererd$="[[hovererd]]">
                                </div>
                                <div class="upright" hovererd$="[[hovererd]]">
                                </div>
                            </div>
                        </a>

                        <div class="rightblock">  
                            <div class="langdivsection marginalize"> 
                                <paper-button id="saveButton" class="saveButton" aria-label="mode-save">
                                    [[navLabel]]
                                </paper-button>
                            </div>
                        </div>

                        <div class="rightblock">  
                            <div class="langdivsection marginalize borderleft"> 
                                <paper-button id="saveButton" class="saveButton" on-click="onSave" aria-label="mode-save">
                                    [[Save]]
                                </paper-button>
                            </div> 
                            ${this._getLangButton}
                        </div>

                    </nav> 
                    <div placerbottom>
                        <div path> 
                            ${this._getPath} 
                            <cms-pop-input class="abs" tgglelang="{{tgglelang}}" warning="[[warning]]" warning-msg="[[warningMsg]]"> 
                                ${this._getXbutton}
                                <cms-content-item
                                    slot="input" 
                                    item="[[itemlang]]"
                                    res="{{addLangResponse}}"
                                    raised="[[raised]]">
                                </cms-content-item>  
                                <a slot="anchor" href="https://www.metamodpro.com/browser-language-codes" target="_blank">
                                    <h6>  more info </h6> 
                                </a>                                              
                            </cms-pop-input>
                        </div> 
                        <div langdiv> 
                            ${this._getLangAnchor}
                        </div>
                        <nav class="navbottom" id="bottom">                    
                            ${this._getContentItems}
                        </nav>
                    </div> 
                </div> 
            </div> 
        </nav> 
    </main>
        `;
    }
    static get _getStyles() {
        return html``
    }
    static get _getLangButton() {
        return html` 
        <section class="langdivsection marginalize borderleft">
            <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation"> 
                <a class="anchorish" id="adlang"  on-click="_newLang">                                            
                    <paper-button class="saveButton" aria-label="lang"> 
                        <span>Add lang</span>
                    </paper-button>
                </a>           
            </iron-selector>
        </section>`
    }
    static get _getXbutton() {
        return html` 
        <paper-button slot="button" class="exex" on-click="_newLang">
            x
        </paper-button> 
         `
    }


    static get _getLangAnchor() {
        return html`            
        <dom-repeat id="model" repeat items="[[pageLangs]]" as="pagelang">
            <template>
                <cms-lang-tab-item route="[[route]]" str="[[str]]" pagelang="[[pagelang]]">
                    <paper-button slot="button" class="exex exexsmall" on-click="_openConfirm">
                            x
                    </paper-button>
                </cms-lang-tab-item>
            </template>
        </dom-repeat> `
    }


    static get _getPath() {
        return html`   
         <div  class="path">          
        </div>`
    }
    static get _getContentItems() {
        return html`
        <div bottom on-click="_seeFlat">
            <article>
                <dom-repeat repeat items="[[inputVal]]" as="item">
                    <template>
                        <section class="flexchildbotomFull">
                            <cms-content-item editing="[[editing]]" item="[[item]]" save-button="[[saveButton]]"
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
                            <cms-content-text editing="[[editing]]" item="[[item]]" save-button="[[saveButton]]"
                                res="{{textAreaResponse}}">
                            </cms-content-text>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>
        <div bottom>
            <section class="flexchildbotom">
                <cms-content-image id="image" editing="[[editing]]" item-label="[[imageLabel]]" images="[[imageArr]]" _deleteImg="[[deleteImg]]">
                </cms-content-image>
            </section>
        </div>`;
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
        </dom-repeat>`
    }
    static get is() {
        return 'cms-content-template';
    }
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
            warningMsg: {
                type: String,
                notify: true,
                value: ''
            },
            warning: {
                type: Boolean,
                notify: true,
                value: false,
            },
            itemlang: {
                type: Object,
                notify: true,
                value: function () {
                    return {
                        'addlang': ''
                    }
                }
            },
            tgglelang: {
                type: Boolean,
                value: true,
                notify: true
            },
            hovererd: {
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
    _log(data) {
        console.log(data)
    }
    onSave() {
        return 0
    }
    _hoverd(evt) {
        this.set('hovererd', !this.hovererd)
    }
    _cancelhoverd() {
        let time = setTimeout(() => {
            this.hovererd = !1
            clearTimeout(time)
        }, 120);
    }
    _setContent(lang, content) {
        this.content = content
        let cont = this.content[0][lang]
        this.set('inputVal', this._getObjArr(cont, true))
        this.set('textareaVal', this._getObjArr(cont, false))
    }
    closeanchor(event) {
        if (event.srcElement.hasAttribute('placertop')) this.$.closeanchor.click()
    }
    _seeFlat(e) {
        if (e.srcElement.tagName === 'DIV' || e.srcElement.tagName === 'ARTICLE') {
            this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
                window.dispatchEvent(new CustomEvent('flat', {
                    bubbles: true,
                    composed: true
                }));
            });
        }
    }
    _newLang() {
        //   if (!!this.contetnLang) {
        this.set('tgglelang', !this.tgglelang)
        if (this.tgglelang === true) {
            this.set('newlangstate', true)
        } else {
            this.warning = false
            this.warningMsg = ''
        }
        // }
    }
    __setLAng(lang, cont) {
        this.set('contetnLang', lang)
        this._setContent(lang, cont)
    }
    _getObjArr(content, withDescription) {
        let obj,
            arr = []
        if (typeof withDescription !== 'boolean') return 'second argument expected to be a boolean'
        for (let par in content) {
            if (par !== 'image') {
                if (!!withDescription) {
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
        this.infoState = 'getting info data..'
        if (!!localStorage[`${str}info`]) {
            this.set('inform', JSON.parse(localStorage[`${str}info`]))
            this.infoState = ''
        } else {
            this.infoState = '!!info not available..!!'
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
                        for (let par in this.content[0][this.contetnLang]) {
                            if (par.toString() !== 'undefined')
                                this.content[0][this.newLang][par] = this.content[0][this.contetnLang][par]
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
                    } else {
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
        let evalu = !!(this.newlangstate)
        this.removelang = (evalu === true) ? false : true
    }

    _openConfirm(event) {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true,
                composed: true,
                detail: {
                    name: event.model.__data.pagelang,
                    method: (this.__removelang).bind(this),
                    argument: event,
                    headderMsgKind: 'delete',
                    type: 'sub-category-lang'
                }
            }));
        });
    }
    __reset() {
        this._debounceEvent = Debouncer.debounce(this._debounceEvent, microTask, () => {
            window.dispatchEvent(new CustomEvent('reset-list-type', {}));
        });
    }
}
customElements.define(cmsContentTemplate.is, cmsContentTemplate);