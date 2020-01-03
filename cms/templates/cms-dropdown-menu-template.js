import '@polymer/iron-dropdown/demo/grow-height-animation.js';
import '@polymer/iron-dropdown/iron-dropdown';
import '@polymer/neon-animation/animations/fade-in-animation.js';
import '@polymer/neon-animation/animations/fade-out-animation.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-listbox/paper-listbox';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element';
export class cmsDropdownMenuTemplate extends PolymerElement {
    static get template() {
        return html`
        <style>
        :host {
            position: relative;
        }    
        div[inputs] {
            /*background-color: #dadfe2;*/
            height: 0px;
        }
        
        div[inputs] {
            box-sizing: border-box;
            height: 30px;
            background-color: var(--app-item-backgound-color);
            padding-block-end: 7px;
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
        .alt{
            padding-inline-start: 60px;
        }
        .span{
            color: var(--paper-red-600);
            font-weight: 400;
        } 
        iron-dropdown.formal{
            margin-top: 1px;
            margin-left: 0.2%;
        }
        paper-item.form-al{
            font-size: 14px;
            --paper-item-min-height: 30px;
            cursor: pointer;
        }
        paper-listbox.dropdown-content{
            background-color: var(--app-item-backgound-color);
            box-shadow: 0px 2px 3px grey;
        }
            ${this._getStyles} 
        </style>
        <div class="alt">  
            <div class="flexleft">
                ${this._getButtons}   
            </div>
            <div class="flexright">               
                <iron-dropdown id="dropdown"
                    class="formal" 
                    slot="input"
                    vertical-align="[[verticalAlign]]"
                    horizontal-align="[[horizontalAlign]]"
                    disabled="[[disabled]]"
                    scroll-action="[[scrollAction]]"
                    open-animation-config="[[openAnimationConfig]]"
                    close-animation-config="[[closeAnimationConfig]]"
                    opened="{{dmopened}}">  
                    ${this._getListItem} 
                </iron-dropdown>
            </div>
        </div>
       `
    }
    static get _getStyles() {
        return html``
    }
    static get _getButtons() {
        return html`
            <div class="flexleft">
                <paper-button name="[[itemLabel]]" aria-label="mode-title" on-click="open">
                    [[itemLabel]]
                </paper-button>
            </div>
            <div class="flexleft">
                <div inputs name="[[itemLabel]]">
                    <paper-button aria-label="mode-category" on-click="open">
                        [[itemText]]
                    </paper-button>
                </div>
            </div>`
    }

    static get _getListItem() {
        return html`
            <paper-listbox class="dropdown-content" slot="dropdown-content">
                <dom-repeat repeat items="[[list]]" as="item">
                    <template>
                        <paper-item class="form-al" on-click="_setResValue">[[item]]</paper-item>
                    </template>
                </dom-repeat>
            </paper-listbox>`
    }

    static get is() {
        return 'cms-dropdown-menu-template';
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
            res: {
                type: Object,
                notify: true,
                value: {}
            },
            list: {
                type: Array,
                notify: true,
            },
            info: {
                type: String,
                notify: true,
            },
        };
    }
    _log(data) {
        console.log(data)
    }
    ready() {
        super.ready();
    }
    _getObjArr(content, withDescription) {
        return getObjArr(content, withDescription)
    }
    _setResValue(evt) {
        let value = evt.model.__data.item,
            obj = {};

        obj[this.itemLabel] = value
        this.set('itemText', value);
        this.set('res', obj)
        this.$.dropdown.close();
        this.opened = false
        window.onbeforeunload = function () {
            return 'are you sure ?'
        }
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
        afterNextRender(this, () => {
            if (!this.opened) {
                this.$.dropdown.open();
                this.opened = true
            } else {
                this.opened = this.$.dropdown.opened
            }
        });
    }
}
customElements.define(cmsDropdownMenuTemplate.is, cmsDropdownMenuTemplate);

/*
--paper - item                                       /*| Mixin applied to the item | { } *
--paper - item - selected - weight                   /*| The font weight of a selected item | bold*
--paper - item - selected                            /*| Mixin applied to selected paper-items | { } *
--paper - item - disabled - color                    /*| The color for disabled paper-items | --disabled - text - color*
--paper - item - disabled                            /*| Mixin applied to disabled paper-items | { } *
--paper - item - focused                             /*| Mixin applied to focused paper-items | { } *
--paper - item - focused - before                    /*| Mixin applied to :before focused paper-items | { }*/
