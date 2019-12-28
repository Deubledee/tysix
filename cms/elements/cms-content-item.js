import { html } from '@polymer/polymer/polymer-element';
import { cmsContentItemTemplate } from '../templates/cms-content-item-template';
export class cmsContentItem extends cmsContentItemTemplate {

    static get _getStyles() {
        return html`    
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
        .span{
            color: var(--paper-red-600);
            font-weight: 400;
        }
        cms-input[texarea].larger{
            --cms-input:{
                width: 407px;
                height: 247px; 
            }
        }
        `
    }

    static get _getElement() {
        return html`        
            <div class="flexright">
                <div inputs name="[[itemLabel]]">  
                    <cms-input class="larger keyboard-focus" texarea$="[[texarea]]" id="inpt1" on-click="edit" 
                        name="[[itemLabel]]"
                        raised="[[raised]]">
                           <span> [[itemText]] </span>
                        <iron-input slot="input" bind-value="{{itemText}}">
                            <input id="input" value="{{value::input}}">
                            </input>  
                        </iron-input>   
                    </cms-input>  
                    <span class="span"> [[info]] </span>
                </div>  
            </div> `
    }

    static get is() {
        return 'cms-content-item';
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
    /* _log(data) {
         console.log(data)
     }*/
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
        this.translator.changeItemTitleLang.call(this, this.itemLabel, 'title')
        this.translator.changeItemTitleLang.call(this, 'cancel', 'cancel');
    }
}
customElements.define(cmsContentItem.is, cmsContentItem);
