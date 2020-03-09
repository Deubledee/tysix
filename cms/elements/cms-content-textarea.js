import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronFormElementBehavior } from '@polymer/iron-form-element-behavior/iron-form-element-behavior.js';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior';
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/iron-autogrow-textarea';
import '@polymer/paper-input/paper-input-char-counter';
import '@polymer/paper-input/paper-input-container';
import '@polymer/paper-input/paper-input-error';
export class cmsContentText extends mixinBehaviors([IronFormElementBehavior, PaperInputBehavior], PolymerElement) {
    static get template() {
        return html` 
        <style>
      :host {
        display: inline-block;
        overflow: hidden;
        outline-style: none;
        resize: none;
        position: relative;
        border: none;
        top: -8px;
        left: -3px;
        -moz-appearance: none;
        -webkit-appearance: none;
        background-color: #ffffff00;
        -webkit-rtl-ordering: unset;
        cursor: text;
        padding: 2px;
        width:100%;
      }

      .mirror-text {
        visibility: hidden;
        word-wrap: break-word;
        @apply --iron-autogrow-textarea;
      }

    .fit {
        @apply --layout-fit;
      } 

      textarea {
        position: relative;
        outline: none;
        border: none;
        resize: none;
        background: inherit;
        color: inherit;
        /* see comments in template */
        width: 100%;
        height: 100%;
        font-size: inherit;
        font-family: inherit;
        line-height: inherit;
        text-align: inherit;
        @apply --iron-autogrow-textarea;
      }

      textarea::-webkit-input-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea:-moz-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea::-moz-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }

      textarea:-ms-input-placeholder {
        @apply --iron-autogrow-textarea-placeholder;
      }
        :host([focused]) {
            outline: none;
        }

        :host([hidden]) {
            display: none !important;
        }

        input {
            /* Firefox sets a min-width on the input, which can cause layout issues */
            min-width: 0;
        }

        /* In 1.x, the <input> is distributed to paper-input-container, which styles it.
        In 2.x the <iron-input> is distributed to paper-input-container, which styles
        it, but in order for this to work correctly, we need to reset some
        of the native input's properties to inherit (from the iron-input) */
        iron-input > textarea {
            @apply --paper-input-container-shared-input-style;
            font-family: inherit;
            font-weight: inherit;
            font-size: inherit;
            letter-spacing: inherit;
            word-spacing: inherit;
            line-height: inherit;
            text-shadow: inherit;
            color: inherit;
            cursor: inherit;
        }

        textarea:disabled {
            @apply --paper-input-container-input-disabled;
        }

        textarea::-webkit-outer-spin-button,
        textarea::-webkit-inner-spin-button {
            @apply --paper-input-container-input-webkit-spinner;
        }

        textarea::-webkit-clear-button {
            @apply --paper-input-container-input-webkit-clear;
        }

        textarea::-webkit-calendar-picker-indicator {
            @apply --paper-input-container-input-webkit-calendar-picker-indicator;
        }

        textarea::-ms-clear {
            @apply --paper-input-container-ms-clear;
        }

        textarea::-ms-reveal {
            @apply --paper-input-container-ms-reveal;
        }


        label {
            pointer-events: none;
        }
        paper-input-container{
            padding: 8px;
        }
        </style>
        <div id="mirror" class="mirror-text" aria-hidden="true">&nbsp;</div>
        <paper-input-container id="container" class="textarea-container fit"
            no-label-float="[[noLabelFloat]]" 
            always-float-label="[[_computeAlwaysFloatLabel(alwaysFloatLabel,placeholder)]]" 
            auto-validate$="[[autoValidate]]" 
            disabled$="[[disabled]]" 
            invalid="[[invalid]]">

            <slot name="prefix" slot="prefix"></slot>

            <label hidden$="[[!label]]" aria-hidden="true" for$="[[_inputId]]" slot="label">[[label]]</label>

            <!-- Need to bind maxlength so that the paper-input-char-counter works correctly -->
            <iron-input 
                bind-value="{{text}}"
                slot="input" 
                class="input-element" 
                id$="[[_inputId]]" 
                maxlength$="[[maxlength]]" 
                allowed-pattern="[[allowedPattern]]" 
                invalid="{{invalid}}" 
                validator="[[validator]]">
                <textarea 
                    name$="[[nameText]]" 
                    aria-label$="[[label]]"  
                    rows$="[[rows]]" 
                    aria-labelledby$="[[_ariaLabelledBy]]"
                    aria-describedby$="[[_ariaDescribedBy]]" 
                    disabled$="[[disabled]]" 
                    title$="[[title]]"
                    type$="[[type]]" 
                    pattern$="[[pattern]]" 
                    required$="[[required]]" 
                    autocomplete$="[[autocomplete]]"
                    autofocus$="[[autofocus]]"
                    inputmode$="[[inputmode]]"
                    minlength$="[[minlength]]"
                    maxlength$="[[maxlength]]"
                    min$="[[min]]" 
                    max$="[[max]]"
                    step$="[[step]]" 
                    name$="[[nameText]]"
                    placeholder$="[[placeholder]]"
                    readonly$="[[readonly]]"
                    list$="[[list]]"
                    size$="[[size]]"
                    autocapitalize$="[[autocapitalize]]"
                    autocorrect$="[[autocorrect]]"
                    on-change="_onChange"
                    tabindex$="[[tabIndex]]"
                    autosave$="[[autosave]]" 
                    results$="[[results]]"
                    accept$="[[accept]]" 
                    multiple$="[[multiple]]"
                    role$="[[inputRole]]" 
                    aria-haspopup$="[[inputAriaHaspopup]]">
            </iron-input>

            <slot name="suffix" slot="suffix"></slot>

            <template is="dom-if" if="[[errorMessage]]">
                <paper-input-error aria-live="assertive" slot="add-on">[[errorMessage]]</paper-input-error>
            </template>

            <template is="dom-if" if="[[charCounter]]">
                <paper-input-char-counter slot="add-on"></paper-input-char-counter>
            </template>

        </paper-input-container>`
    }

    static get is() {
        return 'cms-content-textarea';
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
            rows: {
                type: Number,
                value: 1,
                observer: '_updateCached'
            },
            maxRows: {
                type: Number,
                value: 0,
                observer: '_updateCached'
            },
            autocomplete: {
                type: String,
                value: 'off'
            },
            autofocus: {
                type: Boolean,
                value: false
            },
            inputmode: {
                type: String
            },
            placeholder: {
                type: String
            },
            readonly: {
                type: String
            },
            required: {
                type: Boolean
            },
            minlength: {
                type: Number
            },
            maxlength: {
                type: Number
            },
            label: { type: String },
            text: {
                type: String,
                notify: true,
                observer: 'validate'
            },
            value: {
                type: String,
                notify: true,
                reflectToAttribute: true,
                computed: 'setValue(text)',
            },
            nameText: {
                type: String,
                notify: true,
            },
            name: {
                type: String,
                notify: true,
                reflectToAttribute: true,
                computed: 'setValue(nameText)'
            },
            inputRole: {
                type: String,
                value: undefined,
            },
            inputAriaHaspopup: {
                type: String,
                value: undefined,
            },
            item: {
                type: Object,
                value: '',
                notify: true,
                observer: '_setValues'
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
    get textarea() {
        return this.$.textarea;
    }
    _log(data) {
        console.log(data)
    }
    ready() {
        super.ready();
        /*  this.translator.target('cms-content-item', 'setLangObject', (this._setLObj).bind(this))
          this.translator.target('cms-content-item', 'changeLang', (this._setLang).bind(this), true)
          this.translator.shoot('cms-content-item', 'setLangObject')*/
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
    _setValues(data) {
        this.temp = this.item
        for (let par in data) {
            this.set('text', data[par])
        }
        this._setLabels(data)
    }
    _setLabels(data) {
        for (let par in data) {
            this.set('nameText', par)
            this.set('label', par)
        }
    }
    setValue(data) {
        //replace with html entities        
        if (!!data)
            return data.match(/[a-zA-Z0-9@&!?:.,<>"']/g).join('')
                .replace(/@/gm, '&#64;')
                .replace(/;/gm, '&#59;')
                .replace(/!/gm, '&#33;')
                .replace(/&/gm, '&amp;')
                .replace(/&/gm, '&amp;')
                .replace(/"/gm, '&quot;')
                .replace(/'/gm, '&#39;')
                .replace(/</gm, '&lt;')
                .replace(/>/gm, '&gt;') || '';//data
    }
    _valueForMirror() {
        var input = this.textarea;
        if (!input) {
            return;
        }
        this.tokens = (input && input.value) ? input.value.split('\n') : [''];
        return this._constrain(this.tokens);
    }
    _constrain(tokens) {
        var _tokens;
        tokens = tokens || [''];
        // Enforce the min and max heights for a multiline input to avoid
        // measurement
        if (this.maxRows > 0 && tokens.length > this.maxRows) {
            _tokens = tokens.slice(0, this.maxRows);
        } else {
            _tokens = tokens.slice(0);
        }
        while (this.rows > 0 && _tokens.length < this.rows) {
            _tokens.push('');
        }
        // Use &#160; instead &nbsp; of to allow this element to be used in XHTML.
        return _tokens.join('<br/>') + '&#160;';
    }
    _updateCached() {
        this.$.mirror.innerHTML = this._constrain(this.tokens);
    }
}
customElements.define(cmsContentText.is, cmsContentText);
