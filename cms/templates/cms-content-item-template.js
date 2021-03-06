import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/editor-icons';
import '@polymer/iron-input/iron-input';
import '../elements/cms-input';
export class cmsContentItemTemplate extends PolymerElement {
    static get template() {
        return html`<style include="cms-comon-style_v3">
        :host {
            position: relative;
        }
        div[arow] {
            background: unset;
        }           
        div[inputs] {
            height: 22px;
            width: auto;
            display: flex;
            flex-direction: column;        
        }
        ${this._getStyles}
        </style> 
        <div class="alt">
            <div class="button-container">
                <div class="flexleft" name="itemLabel">
                    <paper-button id="label" on-click="edit" name="[[itemLabel]]" aria-label="mode-title">
                        [[title]]
                    </paper-button>
                </div>
                <div class="flexleft" name="itemLabel">
                    <paper-button id="cancel" name="[[itemLabel]]" value="[[itemLabel]]" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                        [[cancel]]
                    </paper-button>
                </div>
            </div>
            ${this._getElement}
        </div>
        `;
    }
    static get _getStyles() {
        return html`
        textarea:focus, input:focus{
          outline-offset: 0px;
          outline-style: none;
        }
        `
    }
    static get _getElement() {
        return html`        
            <div class="flexright">
                <div inputs name="[[itemLabel]]">  
                    <cms-input class="larger" id="inpt1" on-click="edit" 
                        name="[[itemLabel]]"
                        raised="[[raised]]">
                            [[itemText]]                        
                        <iron-input slot="input" bind-value="{{itemText}}">
                            <input id="input" value="{{value::input}}">
                            </input>       
                        </iron-input>   
                    </cms-input>  
                </div>
            </div>`
    }
    static get is() {
        return 'cms-content-item-template';
    }
    static get properties() {
        return {
            itemText: {
                type: String,
                notify: true,
                value: '',
                observer: 'inputing'
            },
            item: {
                type: Object,
                value: '',
                notify: true,
                observer: '_setValues'
            },
            itemInput: {
                type: Boolean,
                notify: true
            },
            raised: {
                type: Boolean,
                notify: true,
                value: false,
            },
            lang: {
                type: String,
                notify: true,
            },
            langs: {
                type: Object,
                value: {}
            },
            tempArray: {
                type: Array,
                value: new Array(),
            },
            cancelElemenObject: {
                type: Object,
                value: {}
            },
            inputObject: {
                type: Object,
                value: {}
            },
            cancelButton: {
                type: Object,
            },
            res: {
                type: Object,
                notify: true,
                value: {}
            },
            temp: {
                type: Object,
                value: {},
                notify: true,
            },
            inedit: {
                type: Boolean,
                notify: true,
                value: false,
            },
            oninputing: {
                type: Boolean,
                notify: true,
                value: false,
            },
            editing: {
                type: Number,
                notify: true,
                value: 0,
            },
            texarea: {
                type: Boolean,
                notify: true,
                value: false,
            },
            slashed: {
                type: Boolean,
                value: false
            }
        };
    }
    _log(data) {
        console.log(data)
    }
    ready() {
        super.ready();
    }
    _setLObj(res, querySnapshot) {
        if ('data' in querySnapshot) {
            let langs = querySnapshot.data()
            res.call(this, langs);
        }
    }
    _setValues(data) {
        this.$.cancel.classList.add('diferent');
        this.temp = this.item
        for (let par in data) {
            this.set('itemText', data[par])
        }
        this._setLabels(data)
    }
    _setLabels(data) {
        for (let par in data) {
            this.set('itemLabel', par)
        }
    }
    edit(event) {
        if (event.srcElement.nodeName === 'PAPER-BUTTON' || (event.srcElement.nodeName === 'CMS-INPUT' && event.srcElement.hidden === true)) {
            this._setObjects(event)
            this._setButtons()
        }
    }
    _setObjects() {
        this.set('par', this.itemLabel)
        let input = this.$.inpt1
        this.cancelElement = this.$.cancel
        this.inputObject = input

    }
    _setButtons() {
        if (this.inedit === false) {
            this._getSharp()
        } else {
            this._getFlat()
        }
    }
    _seeSharp() {
        if (this.raised === true) {
            this._getFlat()
        }
    }
    _getFlat() {
        this.inputObject.hidden = true;
        this.inedit = false;
        this.raised = false
        if (this.editing === 0) {
            this.inputObject.onkeydown = function () { };
            window.onbeforeunload = function () { }
        }
    }
    _getSharp() {
        this.inedit = true;
        this.inputObject.hidden = false;
        this.raised = true
        this.oninputing = true
        if (this.texarea !== true) {
            this.$.input.focus()
        } else {
            this.$.input.$.textarea.focus()
        }
        window.onbeforeunload = function () {
            return "not without saving first :)";
        };
    }
    inputing(event) {
        let value = event,
            obj = {};
        obj[this.itemLabel] = value

        this.set('res', obj);
        this._inputState();
    }
    _inputState() {
        if (this.oninputing === true) {
            this.$.cancel.classList.remove('diferent');
            this.oninputing = false
            this.editing++
            this.canceled = false;
            window.onbeforeunload = function () {
                return 'are you sure ?'
            }
        }
    }
    Cancel() {
        this.set('itemText', this.temp[this.itemLabel])
        this.set('res', this.temp);
        this.cancelState()
    }
    cancelState() {
        this.$.cancel.classList.add('diferent');
        console.log(this.editing)
        if (this.editing === 1) {
            this.oninputing = true
            this.editing = 0
            window.onbeforeunload = function () { };
        }
        if (this.editing > 1) {
            this.editing--;
        }
    }
    _reset() {
        this.editing = 0;
        this.raised = false
        this.oninputing = true
        this.$.cancel.classList.add('diferent');
        window.onbeforeunload = function () { };
    }
}
customElements.define(cmsContentItemTemplate.is, cmsContentItemTemplate);