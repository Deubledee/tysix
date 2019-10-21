import { PolymerElement, html } from '@polymer/polymer/polymer-element';
export class cmsPopInput extends PolymerElement {
    static get template() {
        return html`
        <style>            
            div[inputlang] {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                position: absolute;
                top: 110px;
                left: 68%;
                background-color: var(--app-backgound-color);
                width: 419px;
                z-index: 10;
                height: 155px;
                padding: 17px;
                box-shadow: 0px 1px 7px var(--disabled-text-color);
                border-radius: 8px;;
            }

            div.closed{
                display: none
            }

            div[warning]{
                width: 100%;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                color: var(--paper-pink-700);
                padding-inline-start: 10%;
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

            .btnx{
                height: 25px; 
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
            },
        }
    }
    ready() {
        super.ready();
    }
}
customElements.define(cmsPopInput.is, cmsPopInput);