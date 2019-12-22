import { html } from '@polymer/polymer/polymer-element';
import { cmsContentItemTemplate } from '../templates/cms-content-item-template';
import '@polymer/iron-dropdown/iron-dropdown';
import '@polymer/paper-listbox/paper-listbox'

export class cmsDropdownMenu extends cmsContentItemTemplate {

    static get _getStyles() {
        return html`        
        div[inputs] {
            /*background-color: #dadfe2;*/
            height: 0px;
        }
        
        div[inputs] {
            height: 22px;
            width: 42%;
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

        input[texarea]{
            width: 407px;
            height: 247px;
        }

        iron-autogrow-textarea.classy{
                outline-style: none;
                resize: none;
                position: relative;
                border: none;
                top: -8px;
                left: -3px;
                -webkit-appearance: none;
                background-color: #ffffff00;
                -webkit-rtl-ordering: unset;
                cursor: text;
                padding: 1px;
                --layout-fit:{
                    position: relative!important;
                    top: -15px!important;
                    left: 2px!important;
                    width: 76%;
                    height: 117px;
                }               
        }

        .flexleft, .flexright {
            max-height: unset;
        }

        .flexright {
            min-height: 134px;
            max-width: unset;
        }

        span{
            color: var(--paper-red-600);
            font-weight: 400;
        }
        
        cms-input.larger{
            --cms-input:{
                width: 314px;
                height: 127px;
            }
        }`
    }
    static get _getElement() {
        return html`  
            <div class="flexright">
                <div inputs name="[[itemLabel]]">
                    <cms-input class=" keyboard-focus" texarea$="[[texarea]]" id="inpt1" on-click="edit"
                        name="[[itemLabel]]"
                        raised="[[raised]]">

                        [[itemText]]

                        <iron-dropdown id="input"
                            slot="input"
                            vertical-align="[[verticalAlign]]"
                            horizontal-align="[[horizontalAlign]]"
                            disabled="[[disabled]]"
                            scroll-action="[[scrollAction]]"
                            open-animation-config="[[openAnimationConfig]]"
                            close-animation-config="[[closeAnimationConfig]]">
                            <paper-listbox class="dropdown-content" slot="dropdown-content">

                                <iron-input bind-value="{{itemText}}">
                                    
                                    <input type="submit"  value="{{value::input}}">
                                    </input>

                                </iron-input>

                            </paper-listbox>

                        </iron-dropdown>
                    </cms-input>
                </div>  
            </div>`
    }

    static get is() {
        return 'cms-dropdown-menu';
    }
    static get properties() {
        return {
            lang: {
                type: String,
                notify: true,
            },
            langs: {
                type: Object,
                value: {}
            },
            texarea: {
                type: Boolean,
                value: false,
            },
            items: {
                type: Array,
                notify: true,
                observer: '__setValues'
            },
            info: {
                type: String,
                notify: true,
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms] //MyAppGlobals.translator
                }
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
        window.addEventListener('flat', (this._getFlat).bind(this), false)
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
        res.call(this, 'cancel', 'cancel');
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeItemTitleLang.call(this, this.itemLabel, 'title');
        this.translator.changeItemTitleLang.call(this, 'cancel', 'cancel');
    }
    __setValues(data) {
        if (!!data) {
            let obj = data.shift()
            this._setValues(obj)
        }
    }
    _getLabel(items) { }
    _getText(items) { }
}
customElements.define(cmsDropdownMenu.is, cmsDropdownMenu);