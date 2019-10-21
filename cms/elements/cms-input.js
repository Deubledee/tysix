import {
    PolymerElement,
    html
} from '@polymer/polymer/polymer-element';
import {
    PaperButtonBehavior,
    PaperButtonBehaviorImpl
} from '@polymer/paper-behaviors/paper-button-behavior.js';
import {
    mixinBehaviors
} from '@polymer/polymer/lib/legacy/class.js';
import '@polymer/iron-input/iron-input.js';
export class cmsInput extends mixinBehaviors([PaperButtonBehavior, PaperButtonBehaviorImpl], PolymerElement) {
    static get template() {
        return html `
        <style include="paper-material-styles">
            :host {
                @apply --layout-inline;
                position: relative;
                box-sizing: border-box;
                min-width: 5.14em;
                margin: 0 0.29em;
                background: var(--app-item-backgound-color);
                -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                -webkit-tap-highlight-color: transparent;
                font: inherit;
                outline-width: 0;
                border-radius: 3px;
                -moz-user-select: none;
                -ms-user-select: none;
                -webkit-user-select: none;
                user-select: none;
                cursor: pointer;
                z-index: 0;
                padding: 0.7em 0.57em;
                width: 150px;
                height: 27px;
                @apply --cms-font-common-base;
                @apply --cms-input;
            }
        
            :host([elevation="1"]) {
                @apply --paper-material-elevation-1;
            }
        
            :host([elevation="2"]) {
                @apply --paper-material-elevation-2;
            }
        
            :host([elevation="3"]) {
                @apply --paper-material-elevation-3;
            }
        
            :host([elevation="4"]) {
             @apply --paper-material-elevation-4;
            }
        
            :host([elevation="5"]) {
                @apply --paper-material-elevation-5;
            }
        
        /*  :host([hidden]) {
            display: none !important;
            }*/
        
            :host([raised].keyboard-focus) {
                font-weight: bold;
                @apply --paper-button-raised-keyboard-focus;
            }
        
            :host(:not([raised]).keyboard-focus) {
                font-weight: bold;
                @apply --paper-button-flat-keyboard-focus;
            }
        
            :host([disabled]) {
                background: none;
                color: #a8a8a8;
                cursor: auto;
                pointer-events: none;
            
                @apply --paper-button-disabled;
            }
        
            :host([disabled][raised]) {
                background: #eaeaea;
            }
        
        
            :host([animated]) {
            @apply --shadow-transition;
            }
        
            paper-ripple {
                color: var(--paper-button-ink-color);
            }

            div[hidden]{
                display: none
            }
            input{
                position: relative;
                top: -8px;
                left: -6px;
                width: 145px;
                height: 23px;
                -webkit-appearance: none;
                background-color: #ffffff00;
                -webkit-rtl-ordering: unset;
                cursor: text;
                padding: 1px;
                border-width: 0px;
                border-style: none;
                border-color: initial;
                border-image: none;
                border-radius: 3px;   
            }
            input:focus{
              outline-offset: 0px;
              outline-style: none;
            }
            .textfield{
                min-height: 23px;
                overflow: hidden;
                position: relative;
                top: -8px;
                left: -2px;
                text-overflow: ellipsis;
            }
            div[overf][textarea]{
                position: relative;
                top: 3px;
                left: -4px;
                color: initial;
                letter-spacing: normal;
                font: 400 13.3333px Arial;
            }
            div[overf][textarea]::-webkit-scrollbar-track {
                background-color: var(--app-scrollbar-color)
            }

            div[overf][textarea]::-webkit-scrollbar {
                width: 5px
            }

            div[overf][textarea]::-webkit-scrollbar-thumb {
                background-color: var(--app-primary-text-color)
            }
        </style>
        
        <div class="textfield" hidden$="[[!hidden]]">
            <slot></slot>
        </div>  
        <div overf textarea$="[[textarea]]" hidden$="[[hidden]]"> 
            <slot name="input"></slot> 
        </div>  
        `
    }
    static get is() {
        return 'cms-input';
    }
    static get properties() {
        return {
            raised: {
                type: Boolean,
                reflectToAttribute: true,
                notify: true,
                value: false,
                observer: '_calculateElevation',
            },
            value: {
                type: String,
                notify: true,
                value: ''
            },
            hidden: {
                type: Boolean,
                reflectToAttribute: true,
                notify: true,
                value: true,
                observer: '_checkHidden',
            },
            settextarea: {
                type: Boolean,
                notify: true,
                value: false,
                observer: '_setTextArea',
            },
            textarea: {
                type: Boolean,
                reflectToAttribute: true,
                notify: true,
                value: false,
            }
        }
    }
    ready() {
        super.ready();
        this.onkeydown = (evt) => {
            this.noink = true
            setTimeout(() => {
                this.noink = false
            }, 60)
        }
    }
    _setTextArea(data) {
        this.textarea = data

    }
    _checkHidden(data) {
        if (data === false) {
            //this.children[0]
        }
    }
    _calculateElevation() {
        if (!this.raised) {
            this._setElevation(0);
        } else {
            this._setElevation(2);
        }
    }
}
customElements.define(cmsInput.is, cmsInput);