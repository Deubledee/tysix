import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '../styles/cms-comon-style_v3';

class cmsConfirm extends PolymerElement {

    static get template() {
        return html`
    <style  include="cms-comon-style_v3">
        nav[bottom2]{
            box-sizing: border-box;
            background-color: rgba(0, 0, 0, 0.45098039215686275);
            display: none;
            position: fixed;
            top: 0%;
            width: 100%;
            height: 100%;
            padding: 118px;
        }

        nav[bottom2][confirm]{
            @apply --layout-vertical;
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
            height: 44px;
            color: #3bdbdd;
            font-size: 26px;
            text-shadow: 1px 1px 1px black;;
        }


        nav[bottom2]div[tow] {
            width: 61%;
        }

        nav[bottom2] h2 {
            color: #ff5600;
            text-shadow: 2px 2px 2px #161616;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            width: 42%;
            border-radius: 5px;
            height: 35px;
            font-size: 44px;
        }
        nav[bottom2] h2[pub="publish"] {
            color: #75ff32;
            font-size: 64px;
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

    <nav id="navbottom" bottom2 confirm$="[[open]]" id="animated">
        <h2 pub$="[[headderMsg]]"> [[headderMsg]] </h2>
        <h3>[[type]]</h3>
        <div one>
            <h3>[[title]]</h3>
        </div>
        <div tow>
            <paper-button left on-click="openConfirm">
                cancel 
            </paper-button>
            <paper-button right on-click="delete">
                confirm 
            </paper-button>
        </div>     
    </nav>
    `}

    static get is() { return 'cms-confirm'; }

    static get properties() {
        return {
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
                observer: 'cleanUnderscore'
            },
            headderMsg: String,
            type: String,
            method: Object
        }
    }

    log(data) {
        console.log('log from cms-confirm', data)
    }

    error(data) {
        console.error('error from cms-page-viewer', data)
    }

    delete() {
        this.method(this.title)
        this.open = !this.open
        this.confirm = false
    }

    cleanUnderscore(data) {
        let cleaned = data
        cleaned = cleaned.split('_').join(' ')
        return cleaned
    }

    ready() {
        super.ready();
    }

    openConfirm(event) {
        if (this.confirm === false) {
            this.title = this.cleanUnderscore(event.name)
            this.confirm = true
        } else {
            this.open = false
            this.confirm = false
        }
    }
}
customElements.define(cmsConfirm.is, cmsConfirm);
