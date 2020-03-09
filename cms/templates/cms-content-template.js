import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-icons/editor-icons';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { NeonAnimationBehavior } from '@polymer/neon-animation/neon-animation-behavior'
import { NeonAnimationRunnerBehavior } from '@polymer/neon-animation/neon-animation-runner-behavior.js';
import '@polymer/neon-animation/neon-animations'
import '../elements/cms-content-image';
import '../elements/cms-content-input';
import '../elements/cms-content-textarea';
import '../elements/cms-lang-tab-item';
import '../elements/cms-pop-input';
import { getObjArr } from '../tools/objectArray';
export class cmsContentTemplate extends mixinBehaviors(
    [NeonAnimationBehavior, NeonAnimationRunnerBehavior],
    PolymerElement) {
    static get template() {
        return html`
    <style include="iron-flex-layout">
        :host {
           /* display: block;*/
            position: fixed;
            top: 0px;
            box-sizing: border-box;
            width: 100vw;
            height: 100vh;
            background-color: #0e0e0e57;
        }  
      
        .container {
            background-color: var(--app-backgound-color);
            margin-left: auto;
            margin-right: auto;
            padding: 5px;
            height: 85vh;
            width: 72.5vw;
            box-sizing: border-box;
            padding: 3%;
            border-radius: 2px;
            box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
            border-bottom-right-radius: 4px;
            border-bottom-left-radius: 4px;
            @apply --shadow-elevation-3dp;
        }
        app-toolbar {
            background-color: var(--app-item-backgound-color);
            color:var(--app-content-section-span-color);
            margin-top: 20px;
            @apply --shadow-elevation-3dp;
            border-top-right-radius: 4px;
        }
        app-toolbar {
            margin-left: auto;
            margin-right: auto;
            width: 70vw;
        }
        .xbuton{
            background-color: var(--paper-cyan-200);
            border-radius: 50%;
            position: absolute;
            top: -15px;
            left: -15px; 
            @apply --shadow-elevation-2dp;
        }
         app-toolbar a:hover{
            background-color: var(--paper-cyan-300);
            @apply --shadow-elevation-3dp;
         }         
        .flex-horizontal {
            @apply --layout-horizontal;
        }
        .flex-vertical {
            @apply --layout-vertical;
        }
        .flexchild {
            @apply --layout-flex;
        }
        .flex2child {
            @apply --layout-flex-2;
        }
        .flex3child {
            @apply --layout-flex-3;
        }
        .input-area,
        iron-form {
            box-sizing: border-box;
            padding: 20px; 
        }
        input, paper-input, paper-checkbox {
          margin-bottom: 8px;
        }
        paper-button {
          display: inline-block;
          box-sizing: border-box;
          width: 45%;
          height: 40px;
          text-align: center;
        } 

        #form1 paper-button {
            width: 100%;
        }
        paper-dropdown-menu{
            padding: 8px;
            height: 68px;
        }
       paper-button:not([disabled]),
        paper-dropdown-menu,
        cms-content-textarea,
        cms-content-input{
            background: var(--paper-grey-200);
        }

        paper-dropdown-menu.pdd-sm {
            height: 64px;
            padding: 0;
        }

        paper-button.pbtn-sm {
            background: var(--divider-color)!important;
            color: var(--app-content-section-span-color)!important;
            padding: 4px;
            max-width: 8%!important;
            min-width: 8%;
        }

        cms-content-textarea {
            margin-top: 20px;
        }
        paper-button:not([disabled]) {
                max-width: 150px;
                color: var(--app-item-backgound-color);
                background: var(--app-content-section-span-color);
        }
        paper-spinner {
          width: 14px;
          height: 14px;
          margin-right: 20px;
        }
        paper-spinner[hidden] {
          display: none;
        }
        .output {
            margin-top: 20px;
            word-wrap: break-word;
            font-family: monospace;
        }
        .form-placing{
            box-sizing: border-box;
        }
        form[id=formal1]{
            @apply --layout-scroll;
            max-height: 60vh; 
            min-height: 20vh; 
            overflow-x: hidden;
            padding-inline-end: 2%;
            box-sizing: border-box;
        }
        .input-area{
            height: 100px;
            box-sizing: border-box;
            padding-top: 30px;
            padding-bottom: 30px;
            padding-right: 60px;
        }

        paper-icon-button {
            --paper-icon-button-ink-color: white;
        }

        paper-icon-button + [main-title] {
            margin-left: 24px;
        }

        paper-icon-button[icon=close]{
            color: var(--app-backgound-color)
        }
        .shorter {
            max-width: 25vw;
        }
    ${this._getStyles}
  </style>  


    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
    </app-route>
        <app-toolbar id="toolbar">
            <a id="closeanchor" class="xbuton" href="[[rootPath]][[closestr]]" title="close">
                <paper-icon-button icon="close"></paper-icon-button>
            </a>
            <paper-icon-button icon="av:library-books"></paper-icon-button>
            <div main-title> [[navLabel]]</div>
            <iron-form id="formlang" allow-redirect="[[redirect]]">   
                <form id="formallang">
                    <paper-dropdown-menu class="pdd-sm" label="langs" name="langs" required >
                        <paper-listbox class="dropdown-content" slot="dropdown-content" selected="[[_sellectedLangIndex]]">
                            <dom-repeat repeat items="[[pageLangs]]" as="item">
                                <template>
                                    <paper-item value="[[item]]">[[item]]</paper-item>
                                </template>
                            </dom-repeat>   
                        </paper-listbox>
                    </paper-dropdown-menu>  
                </form>                    
            </iron-form>
            <paper-button class="pbtn-sm" on-click="_newLang" raised>
                <iron-icon icon="add">
                </iron-icon>
            </paper-button>  
        </app-toolbar>  
        <div  id="forms" class="flex-vertical container">
            <div class="flex2child flex-horizontal form-placing" aria-label="form-submition-area">  
                <nav class="flex2child flex-vertical form-placing" >
                   
                    ${this._getContentItems}

                </nav>  
                <div id="formside" class="flexchild shorter">          
                    <iron-form id="form3" allow-redirect="[[redirect]]">   
                        <form id="formal4" class="flex-vertical">     
                            <input hidden name="formtype" value="content"></input>
                            <cms-content-image class="flexchild" id="image" item-label="[[imageLabel]]" images="[[imageArr]]">
                            </cms-content-image>        
                        </form>
                    </iron-form>             
                    <iron-form id="form2" allow-redirect="[[redirect]]">   
                        <form id="formal3" class="flex-vertical">
                            <input hidden name="formtype" value="inform"></input>                                                            

                             <cms-pop-input class="abs" tgglelang="{{tgglelang}}" warning="[[warning]]" warning-msg="[[warningMsg]]">
                                ${this._getXbutton}                                
                                <cms-content-input
                                    slot="input" 
                                    item="[[itemlang]]"
                                    raised="[[raised]]">
                                </cms-content-input>                                       
                                <paper-button slot="anchor" raised on-click="submit">
                                    Submit
                                <paper-button>                                       
                            </cms-pop-input>
                            
                        </form>
                    </iron-form>    
                </div>  
            </div>
            <div id="inputarea" class="flex-horizontal flexchild input-area">
                <paper-button class="flexchild" raised on-click="submit">Submit</paper-button>
                <paper-button class="flexchild" raised on-click="reset">Reset</paper-button>
            </div>
        </div>
        `;
    }
    static get _getStyles() {
        return html``
    }
    static get _getLangButton() {
        return html` 
                <a class="anchorish" id="adlang"  on-click="_newLang">                                            
                    <paper-button class="saveButton" aria-label="lang"> 
                        <span>Add lang</span>
                    </paper-button>
                </a> `
    }
    static get _getXbutton() {
        return html` 
        <a id="closeanchor" slot="button" class="xbuton" title="close" on-click="_newLang">
            <paper-icon-button icon="close"></paper-icon-button>
        </a>
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
        <iron-form id="form1" class="flex2child" allow-redirect="[[redirect]]">   
            <form id="formal1">
                <input hidden name="formtype" value="contentlang"></input>
                <dom-repeat repeat items="[[inputVal]]" as="item">
                    <template>
                        <cms-content-input class="" item="[[item]]" 
                            required 
                            pattern="[a-zA-Z]*" 
                            error-message="letters only!">                                
                        </cms-content-input>
                    </template>
                </dom-repeat>      
                <dom-repeat repeat items="[[textareaVal]]" as="item">
                    <template>                                
                        <cms-content-textarea class="" item="[[item]]"
                            required rows="6" 
                            pattern="[a-zA-Z]*" 
                            error-message="letters only!">
                        </cms-content-textarea>
                    </template>
                </dom-repeat>   
            </form>                    
        </iron-form>   
        <iron-form id="form12" class="flex2child" allow-redirect="[[redirect]]">   
            <form id="formal2">
                <input hidden name="formtype" value="inform"></input>
                <paper-dropdown-menu  class="" label="type" name="type" required>
                    <paper-listbox class="dropdown-content" slot="dropdown-content" selected="[[_typeSellectedIndex]]">  
                        <dom-repeat repeat items="[[typesArray]]" as="item">
                            <template>   
                                <paper-item value="[[item]]">[[item]]</paper-item>
                            </template>
                        </dom-repeat> 
                    </paper-listbox>
                </paper-dropdown-menu>   
            </form>                    
        </iron-form>`;
    }
    static get _getSideInfo() {
        return html``
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
            redirect: {
                type: Boolean,
                value: false
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
                value: true,
            },
            sharedElements: {
                type: Object
            },
            animationConfig: {
                type: Object,
                computed: '_setConfig(opened)'
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
        }
    }

    ready() {
        super.ready();
        this.addEventListener('neon-animation-finish', this._onAnimationFinish)
    }

    _setConfig() {
        return {
            'entry': [{
                name: 'scale-up-animation',
                node: this.$.toolbar,
            },
            {
                name: 'scale-up-animation',
                node: this.$.forms
            },
            {
                name: 'slide-from-top-animation',
                node: this.$.inputarea,
            },
            {
                name: 'slide-from-left-animation',
                node: this.$.formside,
            },
            {
                name: 'slide-from-bottom-animation',
                node: this.$.form1
            }],
            'exit': [
                {
                    name: 'scale-down-animation',
                    node: this.$.toolbar
                },
                {
                    name: 'scale-down-animation',
                    node: this.$.forms
                },
                {
                    name: 'fade-out-animation',
                    node: this
                }]
        }
    }

    submit() {
        var forms = this.shadowRoot.querySelectorAll('iron-form')
        forms = Array.from(forms)
        let valid = []
        valid = forms.map(form => form.validate())
        console.log(forms)
        if (valid.indexOf(false) !== -1) return alert('required field not set.')
        forms.forEach(form => form.submit())
    }
    reset() {
        var forms = this.shadowRoot.querySelectorAll('iron-form')
        forms.forEach(form => form.reset())
    }
    //'slide-left-animation'
    _onAnimationFinish() {
        if (!this.opened) {
            this.style.display = 'none';
            this.reset()
        }
    }
    showThis() {
        this.opened = true;
        this.style.display = 'block';
        this.playAnimation('entry');
    }
    hideThis() {
        this.opened = false;
        this.playAnimation('exit');
    }
    _log(data) {
        // console.log(data)
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
        return getObjArr(content, withDescription)
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
    _setInfomr(data) {
        if (!!this.content[0]) {
            for (let par in data) {
                if (par.toString() !== 'undefined') {
                    this.inform[par] = data[par]
                }
            }
        }
    }
    _setInfomrCat(data) {
        //  console.log(data);
        for (let par in data) {
            if (par.toString() !== 'undefined') {
                //   console.log(par);

                this.tempCategory = data[par]
            }
        }
    }
    _setInfomrKw(data) {
        if (!!this.content[0]) {
            for (let par in data) {
                if (par.toString() !== 'undefined') {
                    this.inform[par] = data[par].split(',')
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
                        for (let par in this.content[0][this.contetnLang]) {
                            if (par.toString() !== 'undefined')
                                this.content[0][this.newLang][par] = this.content[0][this.contetnLang][par]
                        }
                        this.set('pageLangs', [])
                        this.content[0][this.newLang].lang = this.newLang
                        this.__setStorage()
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

    __setStorage() {
        localStorage[`page-${query.content}`] = JSON(this.content)
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
