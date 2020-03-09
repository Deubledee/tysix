import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { IronFormElementBehavior } from '@polymer/iron-form-element-behavior/iron-form-element-behavior.js';
import { PaperInputBehavior } from '@polymer/paper-input/paper-input-behavior';
import '@polymer/polymer/polymer-legacy.js';
import '@polymer/iron-input/iron-input.js';
import '@polymer/paper-input/paper-input-char-counter';
import '@polymer/paper-input/paper-input-container';
import '@polymer/paper-input/paper-input-error';
export class cmsContentInput extends mixinBehaviors([IronFormElementBehavior, PaperInputBehavior], PolymerElement) {

  static get template() {
    return html` <style>
      :host {
        display: block;
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
      iron-input > input {
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

      input:disabled {
        @apply --paper-input-container-input-disabled;
      }

      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        @apply --paper-input-container-input-webkit-spinner;
      }

      input::-webkit-clear-button {
        @apply --paper-input-container-input-webkit-clear;
      }

      input::-webkit-calendar-picker-indicator {
        @apply --paper-input-container-input-webkit-calendar-picker-indicator;
      }

      input::-webkit-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input:-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input::-moz-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      input::-ms-clear {
        @apply --paper-input-container-ms-clear;
      }

      input::-ms-reveal {
        @apply --paper-input-container-ms-reveal;
      }

      input:-ms-input-placeholder {
        color: var(--paper-input-container-color, var(--secondary-text-color));
      }

      label {
        pointer-events: none;
      }
      paper-input-container{
          padding: 8px;
      }
    </style>

    <paper-input-container id="container" 
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
        <input 
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
    return 'cms-content-input';
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
      text: {
        type: String,
        notify: true,
      },
      value: {
        type: String,
        notify: true,
        reflectToAttribute: true,
        computed: 'setValue(text)'
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
  ready() {
    super.ready();
    //   this.translator.target('cms-content-item', 'setLangObject', (this._setLObj).bind(this))
    //  this.translator.target('cms-content-item', 'changeLang', (this._setLang).bind(this), true)
    //  this.translator.shoot('cms-content-item', 'setLangObject')
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
    res.call(this, this.name, 'title');
    res.call(this, 'cancel', 'cancel');
  }
  __changeLang() {
    this.lang = this.translator.lang
    this.translator.changeItemTitleLang.call(this, this.name, 'title')
    this.translator.changeItemTitleLang.call(this, 'cancel', 'cancel');
  }
  /**
* Returns a reference to the focusable element. Overridden from
* PaperInputBehavior to correctly focus the native input.
*
* @return {!HTMLElement}
* get _focusableElement() {
        return this.inputElement._inputElement;
    }
  */
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
      console.log(this.nameText)

    }
  }
  setValue(data) {
    return data
  }
}
customElements.define(cmsContentInput.is, cmsContentInput);
