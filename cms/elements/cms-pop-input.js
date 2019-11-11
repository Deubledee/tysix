import { PolymerElement, html } from '@polymer/polymer/polymer-element';
export class cmsPopInput extends PolymerElement {
    static get template() {
        return html`
        <style include="cms-comon-style_v3">       
            :host{
                position: absolute;
            }     
            div[inputlang] {
                position: absolute;
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                background-color: var(--app-backgound-color);
                width: 419px;
                z-index: 10;
                height: 155px;
                padding: 9px;
                box-shadow: 0px 1px 7px var(--disabled-text-color);
                border-radius: 8px;
            }

            div.closed{
                display: none
            }

            div[warning]{
                width: 90%;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                padding-inline-start: 10%
            }

            div[warning] h5{
                flex-basis: 66%;
                margin-block-start: 1.4em;
                color: var(--paper-pink-700);
                @apply --warningh5
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

            .btnx{
                height: 0px;
                width: 7px;
                flex-basis: 24%;
            }  
            
            div[tgglelang]{
                display: none;
            }
            .input {
                height: 59px;
                padding-inline-start: 12%;
            }

        </style>
        <main>
            <div tgglelang$="[[tgglelang]]" inputlang>
                <div class="btnx">
                    <slot name="button"></slot>
                </div>
                <div class="input">
                    <slot name="input">
                    </slot>
                </div>
                <div class="closed" warning$="[[warning]]">
                    <h5>
                        [[warningMsg]]
                    </h5>
                    <slot name="anchor">
                    </slot>
                </div>
            </div>
        </main>
        `
    }
    static get is() {
        return 'cms-pop-input';
    }
    static get properties() {
        return {
            warningMsg: {
                type: String,
                notify: true,
                value: ''
            },
            warning: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true,
            },
            tgglelang: {
                type: Boolean,
                value: true,
                notify: true,
                reflectToAttribute: true,
                observer: '_resetInput'
            },
        }
    }
    ready() {
        super.ready();
    }

    _resetInput(data) {
        if (data === true) {
            this.children[1].itemText = ''
        }
    }
}
customElements.define(cmsPopInput.is, cmsPopInput);