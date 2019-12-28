import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import '@polymer/iron-dropdown/iron-dropdown';
import '@polymer/iron-dropdown/demo/grow-height-animation.js';
import '@polymer/neon-animation/animations/fade-in-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox'

export class cmsDropdownMenu extends PolymerElement {
    static get template() {
        return html`
        <style include="cms-comon-style_v3">
        :host {
            position: relative;
        }    
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

        .flexleft, .flexright {
            max-height: unset;
        }

        .flexright {
            min-height: 134px;
            max-width: unset;
        }

        .span{
            color: var(--paper-red-600);
            font-weight: 400;
        } 
        </style>
        <div class="alt">       
            <div class="flexright">   
                <paper-button class="flexleft" name="[[itemLabel]]" aria-label="mode-title" on-click="open">
                    [[itemLabel]]
                </paper-button>
                <div inputs name="[[itemLabel]]">    
                    <paper-button  aria-label="mode-category" on-click="open">
                        [[itemText]] 
                    </paper-button>              
                        <iron-dropdown id="dropdown"
                            class="keyboard-focus" 
                            slot="input"
                            vertical-align="[[verticalAlign]]"
                            horizontal-align="[[horizontalAlign]]"
                            disabled="[[disabled]]"
                            scroll-action="[[scrollAction]]"
                            open-animation-config="[[openAnimationConfig]]"
                            close-animation-config="[[closeAnimationConfig]]"
                            opened="{{dmopened}}">   
                            <paper-listbox class="dropdown-content" slot="dropdown-content">

                                <dom-repeat repeat items="[[list]]" as="item">
                                    <template>
                                        <paper-item>[[item.id]]</paper-item>
                                    </template>
                                </dom-repeat>
                            </paper-listbox>
                        </iron-dropdown>
                    </cms-input>
                </div>  
            </div>
        </div>
       `
    }

    static get is() {
        return 'cms-dropdown-menu';
    }
    static get properties() {
        return {
            verticalAlign: String,
            horizontalAlign: String,
            disabled: Boolean,
            scrollAction: String,
            openAnimationConfig: {
                type: Array,
                value: function () {
                    return [
                        { name: 'fade-in-animation', timing: { delay: 150, duration: 50 } },
                        { name: 'expand-animation', timing: { delay: 150, duration: 200 } }
                    ];
                }
            },
            closeAnimationConfig: {
                type: Array,
                value: function () {
                    return [{ name: 'fade-out-animation', timing: { duration: 200 } }];
                }
            },
            lang: {
                type: String,
                notify: true,
            },
            langs: {
                type: Object,
                value: {}
            },
            dmopened: {
                type: Boolean,
                value: false,
            },
            opened: {
                type: Boolean,
                value: false,
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
            list: {
                type: Array,
                notify: true,
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
        // window.addEventListener('flat', (this._getFlat).bind(this), false)
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
        if (data.length > 0) {
            let obj = data.shift()
            this._setValues(obj)
            this.list = data[0].items
            this.__changeLang()
        }
    }
    _setValues(data) {
        //  this.$.cancel.classList.add('diferent');
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
    open() {
        if (typeof this.time === 'number') clearInterval(this.time)
        this.time = setTimeout(() => {
            afterNextRender(this, () => {
                if (!this.opened) {
                    this.$.dropdown.open();
                    this.opened = true
                } else {
                    this.opened = this.$.dropdown.opened
                }
            });
        }, 120);
    }
}
customElements.define(cmsDropdownMenu.is, cmsDropdownMenu);