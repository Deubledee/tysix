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
            left: 170.5px;
            width: 79.5%;
            height: 200px;
        }

        paper-dialog.diferent h3 {
            letter-spacing: 2px;
            color: #ff4700;
            background-color: #454748;
            margin-left: auto;
            margin-right: auto;
            max-width: 14em;
            min-width: 8em;
            border-radius: 5px;
        }

        paper-dialog.diferent h2 {
            color: #f2f2f2;
            text-shadow: 1px 1px 1px #161616;
            text-align: center;
            background-color: #e2dfdc;
            margin-left: auto;
            margin-right: auto;
            width: 17%;
            border-radius: 5px;
        }
    </style>

    <nav id="navbottom" bottom2 confirm$="[[confirm]]">           
        <paper-dialog id="animated" class="diferent" exit-animation="fade-out-animation">
            <h2> Delete page </h2>
            <h3>[[title]]</h3>
            <p>
            <paper-button on-click="openConfirm">
                cancel 
            </paper-button>
            <paper-button on-click="delete">
                confirm 
            </paper-button>
            </p>
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
                reflectToAttribute: true
            },
            title: {
                type: Object,
                notify: true
            },
            method: {
                type: Object
            }
        }
    }

    delete() {
        this.method(this.title)
    }

    log(data) {
        console.log('log from cms-confirm', data)
    }

    error(data) {
        console.error('error from cms-confirm', data)
    }

    ready() {
        super.ready();
    }
    openConfirm(event) {
        if (this.confirm === false) {
            this.title = {}
            this.title = event.name
            this.confirm = true
            this.$.animated.open()
            scroll({ top: 0, behavior: 'smooth' });
        } else {
            this.$.animated.cancel()
            setTimeout(() => {
                this.confirm = false
            }, 400)
        }
    }

}
customElements.define(cmsConfirm.is, cmsConfirm);
