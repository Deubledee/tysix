import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';

class cmsConfirm extends PolymerElement {

    static get template() {
        return html`


    <style>
        nav[bottom2]{
            display: none;
            position: fixed;
            top: 0px;
            left: 0px;
        }

        nav[bottom2][confirm]{
            display: block;
        }

        paper-dialog.diferent {
            left: 29%;
            width: 585px;
            height: 236px;
            border-radius: 4px;
        }

        paper-dialog.diferent div {
            text-align: center;
            word-break: break-word;
            letter-spacing: 2px;
            color: #356ea1;
            margin-left: auto;
            margin-right: auto;
            border-radius: 5px;
            width: 20%;
        }

        paper-dialog.diferent div[one] {
            height: 44px;
        }


        paper-dialog.diferent div[tow] {
            width: 61%;
        }

        paper-dialog.diferent h2 {
            color: #d87e7e;
            text-shadow: 2px 2px 2px #161616;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
            width: 42%;
            border-radius: 5px;
            height: 35px;
            font-size: 29px;
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

    <nav id="navbottom" bottom2 confirm$="[[open]]">           
        <paper-dialog id="animated" class="diferent" exit-animation="fade-out-animation">
            <h2> Delete [[type]] </h2>
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
        </paper-dialog>      
    </nav>
    `}

    static get is() { return 'cms-confirm'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
            },
            confirm: {
                type: Boolean,
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
            type: {
                type: String
            },
            method: {
                type: Object
            }
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
            this.$.animated.open()
        } else {
            this.$.animated.cancel()
            setTimeout(() => {
                this.open = false
                this.confirm = false
            }, 400)
        }
    }

}
customElements.define(cmsConfirm.is, cmsConfirm);
