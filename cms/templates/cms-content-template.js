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
    main{
        width: 1100px  
    }                  
    nav[bottom2]{
        background-color: rgba(0, 0, 0, 0.45098039215686275);
        position: fixed;
        top: 0%;
        width: 100%;
        height: 100%;
    }   
    div[background]{
        margin-left: auto;
        margin-right: auto;
        top: 0%;
        display: flex;
        flex-direction: column;
        width: 1014px;
        height: 100%;
        background-color: rgba(241, 241, 241)
    }
    div[placertop]{
        display: block;
    }
    div[placerbottom]{
        display: flex;
        flex-direction: column;
        padding-left: 5%;
        padding-right: 5%;
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
    div[langdiv] section {
        display: flex;
        flex-flow: nowrap;
        flex-direction: row-reverse;
        border-right: 1px solid var(--disabled-text-color);
        color: var(--app-published-color);
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
    div[inputlang] {
        padding: 17px;
        box-sizing: border-box;
        position: absolute;
        top: 110px;
        left: 68%;
        /* display: none; */
        background-color: var(--app-backgound-color);
        width: 419px;
        z-index: 10;
        height: 155px;
        padding: 17px;
        padding-top: 43px;
        /* border: 1px solid var(--light-theme-divider-color); */
        box-shadow: 0px 1px 7px var(--disabled-text-color);
        border-radius: 8px;
    }
    div[langdiv]{
        margin-top: 30px;
        display: flex;
        flex-direction: row;
        flex-basis: 35px;
        background-color: var(--app-backgound-color);
        border: 1px solid var(--divider-color);
        border-radius: 9px;
    }
    .langdivsection{
        border-radius: unset!important; 
        box-shadow: unset!important;
        width: 110px;
        height: 60px;
    }
    .langdivsectionnpaddingtop {
        padding-top: 6px;
        flex-basis: 7%;
    }
    div[tgglelang]{
        display: none;
    }
    .anchorish{
        cursor: pointer; 
    }
    div[bottom]{
        background-color: var(--app-backgound-color);
        flex-direction: column;
        border: 1px solid var(--divider-color);
        border-radius: 12px;
        padding: 22px;
        padding-left: 17%;
        width: 816px;
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
        flex-basis: 66%;
        margin-block-start: 1.4em;
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
        border-right: 1px solid grey;
    }   
    .xbuton{
        cursor: pointer;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        padding-top: 2px;
    }    
    .borderleft{
        border-left : 1px solid grey;
    }
    .upright, .upleft{
        top: 15px;
        height: 27px;
        border-right-color: var(--dark-theme-secondary-color);
        border-right-style: ridge;
        border-right-width: 1px;
        width: 1px;
    }
    .upright{
        position: relative;
        right: -13px;
        margin-left: auto;
        transform: rotateZ(46deg)
    }
    .upleft{
        position: relative;
        right: 19px;
        margin-right: auto;
        margin-left: auto;
        transform: rotateZ(-46deg);;
    }
    paper-button[aria-label="lang"]{
        top: 11px;
        left: 8px;
        color: var(--app-content-section-span-color);
        font-weight: 500;
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
                        <div class="langdivsection borderright"> 
                            <a id="closeanchor" class="xbuton" href="[[rootPath]][[closestr]]">
                                <div class="upright">
                                </div>
                                <div class="upleft">
                                </div>
                            </a>
                        </div>
                        <div class="rightblock"> 
                            <div class="langdivsection marginalize borderleft"> 
                                <paper-button id="saveButton" class="saveButton" on-click="onSave" aria-label="mode-save">
                                    [[Save]]
                                </paper-button>
                            </div> 
                            <section class="langdivsection marginalize borderleft">
                                <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation"> 
                                    <a class="anchorish" id="adlang"  on-click="_newLang">                                            
                                        <paper-button aria-label="lang"> 
                                            <span>Add lang</span>
                                        </paper-button>
                                    </a>           
                                </iron-selector>
                            </section>
                        </div>
                    </nav> 
                    <div placerbottom> 
                        <div langdiv> 
                            ${this._getLangAnchor}
                        </div>  
                        <div path> 
                            ${this._getPath} 
                            <div inputlang tgglelang$="[[!tgglelang]]"> 
                                    <cms-content-item
                                        item="[[itemlang]]"
                                        save-button="[[saveButton]]"
                                        res="{{addLangResponse}}">
                                    </cms-content-item>     
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
                        <div class="flex">
                            <nav class="navbottom" id="bottom">                    
                                ${this._getContentItems}
                            </nav>
                        </div> 
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
    static get _getLangAnchor() {
        return html`            
        <dom-repeat repeat items="[[pageLangs]]" as="pagelang">
            <template>
                <section class="langdivsectionnpaddingtop" nova$="[[_nova(event, pagelang)]]">
                    <paper-button class="exex" on-click="_openConfirm">
                            x
                    </paper-button>
                    <a href="[[rootPath]][[str]]&lang=[[pagelang]]" >
                        <paper-button langbtn aria-label="langbutton">
                            [[pagelang]]
                        </paper-button>
                    </a>
                </section>
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
                <div container >
                    <div bottom hidebottom$="[[hidebottom]]">
                        <dom-repeat repeat items="[[inputVal]]" as="item">
                            <template>
                                <section class="flexchildbotomFull">
                                    <cms-content-item
                                        editing="[[editing]]"
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
                                        editing="[[editing]]"
                                        item="[[item]]"
                                        save-button="[[saveButton]]"
                                        res="{{textAreaResponse}}">
                                    </cms-content-text>
                                </section>
                            </template>
                        </dom-repeat>
                        <section class="flexchildbotom">
                            <cms-content-image id="image"
                                editing="[[editing]]"
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
    closeanchor(event) {
        if (event.srcElement.hasAttribute('placertop')) this.$.closeanchor.click()
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
        // this.$.saveButton.classList.remove('diferent')
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