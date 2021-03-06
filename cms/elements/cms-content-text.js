import {
    html
} from '@polymer/polymer/polymer-element';
import {
    cmsContentItemTemplate
} from '../templates/cms-content-item-template';
import '@polymer/iron-autogrow-textarea';
export class cmsContentText extends cmsContentItemTemplate {
    static get _getStyles() {
        return html` 
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
                    <cms-input settextarea="true" class="larger keyboard-focus" id="inpt1" on-click="edit" name="[[itemLabel]]" raised="[[raised]]"> 
                            [[itemText]]  
                            <iron-autogrow-textarea class="classy" id="input" autofocus="true" slot="input" value="{{itemText}}" id="a1"></iron-autogrow-textarea>
                        </iron-input>                            
                    </cms-input>  
                    <span> [[info]] </span>
                </div>
            </div>`
    }

    static get is() {
        return 'cms-content-text';
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
                value: true,
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
}
customElements.define(cmsContentText.is, cmsContentText);