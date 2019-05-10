import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { Setter } from '../tools/cms-element-set';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
import '../media/cms-image';
import '../styles/cms-comon-style_v3';
const Consts = new Setter()
Consts.assets = Consts.getAssets('cms-content-item')
export class cmsContentItem extends PolymerElement {
    static get template() {
        return html`<style include="cms-comon-style_v3">
        :host {
            position: relative;
        }
        </style>      
            <div class="flexleft" name="itemLabel">
                <paper-button id="label" on-click="edit" name="[[itemLabel]]">
                    [[title]]
                </paper-button>
                <paper-button id="cancel" name="[[itemLabel]]" value="[[itemLabel]]" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                    [[cancel]]
                </paper-button>
            </div>
            <div class="flexright" id="inpt1">
                <div name="[[itemLabel]]">
                    <paper-button id="button" on-click="edit" name="[[itemLabel]]" icon="editor:mode-edit" aria-label="mode-edit">
                        <h4 class="contenth4" title="[[itemLabel]]">   [[itemText]] </h4> 
                    </paper-button>
                    <dom-if if="[[itemInput]]">
                        <template>
                            <paper-input  hidden 
                                name="[[itemLabel]]"
                                value="[[itemText]]" 
                                on-input="inputing"
                                placeholder="[[itemText]]">
                            </paper-input>
                        </template>
                    </dom-if> 
                    <dom-if if="[[itemTextArea]]">
                        <template>                
                            <paper-textarea hidden 
                                name="[[itemLabel]]"   
                                value="[[itemText]]" 
                                on-input="inputing"
                                placeholder="[[itemText]]">
                            </paper-textarea>
                        </template>
                    </dom-if> 
                </div>
            </div>
        `;
    }
    static get is() { return 'cms-content-item'; }
    static get properties() {
        return {
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
            itemTextArea: {
                type: Boolean,
                notify: true
            },
            lang: {
                type: String,
                notify: true,
                // observer: '__changeLang'
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
            saveButton: {
                type: Object,
                value: {}
            },
            anchor: {
                type: Object,
                value: {}
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals.translator
                }
            },
            res: {
                type: Object,
                notify: true,
                value: {}
            },
            temp: {
                type: Object,
                value: new Object(),
            },
            editing: {
                type: Number,
                notify: true,
                value: 0,
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
        this.translator.target('cms-content-item', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-content-item', 'changeLang', (this._setLang).bind(this), true)
        this.translator.shoot('cms-content-item', 'setLangObject')
    }

    _setLObj(res, querySnapshot) {
        if ('data' in querySnapshot) {
            let langs = querySnapshot.data()
            res.call(this, langs);
        }
    }
    _setLang(res, lang) {
        this.lang = lang
        res.call(this, this.itemLabel, 'title');
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeItemTitleLang.call(this, this.itemLabel, 'title')
    }
    _setValues(data) {
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
    edit() {
        this._setObjects()
        this._setButtons()
    }
    _setObjects() {
        this.button = this.$.button
        this.set('par', this.itemLabel)
        let input = this.$.inpt1.children[0].children[1].nodeName === "DOM-IF" ?
            this.$.inpt1.children[0].children[2] :
            this.$.inpt1.children[0].children[1]
        this.cancelElement = this.$.cancel
        this.inputObject = input
    }
    _setButtons() {
        if (this.button.classList.contains('diferent') === false) {
            this.inputObject.hidden = false;
            this.inputObject.onkeydown = (this.__keyDownHandler).bind(this);
            this.button.classList.add('diferent');
            this._setTemp()
            window.onbeforeunload = function () {
                return "not without saving first :)";
            };
        }
        else {
            this.inputObject.hidden = true;
            this.button.classList.remove('diferent');
            this.temp.inputing = false
            if (this.editing === 0) {
                this.inputObject.onkeydown = function () { };
                window.onbeforeunload = function () { }
            }
        }
    }
    _setTemp() {
        this.temp = { inputing: false }
        this.temp.data = this.item[this.par] === undefined ? '' : this.item[this.par]
        this.temp.canceled = false
    }
    __keyDownHandler(event) {
        if (event.code === "Backspace" || event.code === "Delete") {
            this.set('par', event.srcElement.getAttribute('name'));
            if (this.temp[this.par] === '') {
                this.temp[this.par] = this.content[this.par];
                this.Cancel(event)
            }
            this.inputing(event);
        }
    }
    inputing(event) {
        let value = event.srcElement.value,
            obj = {};
        obj[this.itemLabel] = value
        this.set('itemText', value);
        this.set('res', obj);
        this._inputState();
    }
    _inputState() {
        if (this.temp.inputing === false) {
            this.cancelElement.classList.remove('diferent');
            this.saveButton.classList.remove('diferent');
            this.anchor.classList.add('diferent');
            this.temp.inputing = true
            this.temp.canceled = false;
            this.editing = this.editing + 1;
            this.canceled = false;
            window.onbeforeunload = function () {
                return 'are you sure ?'
            }
        }
    }
    Cancel() {
        let obj = {};
        obj[this.itemLabel] = this.temp.data
        this.set('itemText', this.temp.data);
        this.set('res', obj);
        if (this.temp.canceled === false) {
            this.cancelState();
        }
    }
    cancelState() {
        this.temp.data = '';
        this.temp.canceled = true;
        this.temp.inputing = false
        this.cancelElement.classList.add('diferent');
        this.inputObject.onkeydown = function () { };
        if (this.editing <= 1) {
            this._reset('simple')
            window.onbeforeunload = function () { }
        }
        else {
            this.set('par', {});
            this.editing = this.editing - 1;
        }
    }
    _reset(type) {
        this.editing = 0;
        window.onbeforeunload = function () { };
        this.saveButton.classList.add('diferent');
        this.anchor.classList.remove('diferent');
        if (type === "simple") {
            this.cancelElement.classList.add('diferent');
        }
    }
}
customElements.define(cmsContentItem.is, cmsContentItem);