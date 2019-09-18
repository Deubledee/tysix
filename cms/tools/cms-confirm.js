import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import '../styles/cms-comon-style_v3';
import { dataBaseworker } from '../tools/dataBaseWorker';
const _DBW = new dataBaseworker();
const __DEV = true;
const _STYLES = _DBW.getElementAssets('cms-confirm', __DEV);
class cmsConfirm extends PolymerElement {
    static get template() {
        return html`
    <style  include="cms-comon-style_v3">
        nav[bottom2]{
            @apply --layout-vertical;
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.45098039215686275);
            position: fixed;
            top: 0%;
            width: 100%;
            height: 100%;
            padding: 118px;
        }
        nav[bottom2] div {
            text-align: center;
            word-break: break-word;
            letter-spacing: 2px;
            color: #356ea1;
            margin-left: auto;
            margin-right: auto;
            border-radius: 5px;
            width: auto;
            padding: 34px;
        }
        nav[bottom2] div[one] {
            height: auto;
            color: var(--app-item-backgound-color);
            font-size: 26px;
            text-shadow: 1px 1px 1px var(--google-blue-500);
        }
        nav[bottom2]div[tow] {
            width: 61%;
        }
        h2 {
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            text-shadow: 1px 1px 1px var(--light-theme-text-color);
            width: 42%;
            border-radius: 5px;
            height: 35px;
        }
        .typeKind{
            color: var(--app-backgound-color);
            font-size: 44px;
            font-variant: all-petite-caps;
            text-shadow: 1px 1px 1px var(--paper-red-400);
            font-style: italic;
            font-weight: 400;
            letter-spacing: 5px;
        }
        .typeheader {
            color: var(--paper-deep-orange-600);
            font-size: 23px;
            text-shadow: 3px 2px 2px var(--app-primary-color)
        }
       h2[pub="send to articles ?"],  h2[pub="publish ?"]{
            color: #75ff32;
            text-shadow: unset!important;
         } 
                
        paper-button {
            background-color: #e3e3e3
        }
        paper-button[right] {
            float: right;
        }
        paper-button[left] {
            float: left;
        }        
    </style>

    <nav id="navbottom" bottom2 >
        <h2 class="typeKind" pub$="[[headderMsgKind]]"> [[headderMsg]] </h2>    
        <h2 class="typeheader">[[type]]</h1>
        <div one>
            <h3>[[title]]</h3>
        </div>
        <div tow>
            <paper-button left on-click="openConfirm">
                cancel 
            </paper-button>
            <paper-button right on-click="execute">
                confirm 
            </paper-button>
        </div>     
    </nav>
    `}

    static get is() { return 'cms-confirm'; }

    static get properties() {
        return {
            user: {
                type: Object,
                notify: true
            },
            lang: {
                type: String,
                observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
            },
            confirm: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true,
            },
            pub: {
                type: String,
                notify: true,
                value: false,
                reflectToAttribute: true,
            },
            open: {
                type: Boolean,
                notify: true,
                value: false,
            },
            title: {
                type: Object,
                notify: true,
            },
            headderMsg: {
                type: Object,
                notify: true,
            },
            type: {
                type: Object,
                notify: true,
            },
            method: Object
        }
    }

    ready() {
        super.ready();
        _STYLES.then((querySnapshot) => {
            let langs = querySnapshot.data();
            this._setLangObject(langs);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
    }
    __changeLang() {
        if (this.langs[this.lang]) {
            let obj = this.langs[this.lang];
            for (let par in obj) {
                this.set(par, obj[par]);
            }
        }
    }
    _setLangObject(langs) {
        for (let par in langs) {
            if (par !== 'styles') {
                this.langs[par] = langs[par].pop();
            }
        }
        this.__changeLang();
    }
    execute() {
        this.method(this.argument)
        this.closeOut()
    }
    _cleanUnderscore(data) {
        let cleaned = data
        cleaned = cleaned.split('_').join(' ')
        return cleaned
    }
    openConfirm(event) {
        if (this.confirm === false) {
            this.title = this._cleanUnderscore(event.detail.name)
            this.method = event.detail.method;
            this.argument = event.detail.argument || event
            this.headderMsg = this[event.detail.headderMsgKind] || event.detail.headderMsgKind
            this.headderMsgKind = event.detail.headderMsgKind
            this.type = this[event.detail.type] || event.detail.type
            this.confirm = true
        } else {
            this.closeOut()
        }
    }
    closeOut() {
        this.confirm = false
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('closepopout', {
                bubbles: true, composed: true
            }));
        });
    }
}
customElements.define(cmsConfirm.is, cmsConfirm);
