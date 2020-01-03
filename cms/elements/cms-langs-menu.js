import { cmsDropdownMenuTemplate } from '../templates/cms-dropdown-menu-template';
import { html } from '@polymer/polymer/polymer-element';

export class cmsLangsMenu extends cmsDropdownMenuTemplate {
    static get _getStyles() {
        return html`
        .alt{
            display: flex;
            flex-direction: row;
            padding-inline-start: unset;
            width: 20%;
        }
        .flexright {
            min-height: 0px;
            max-width: unset;
        }
        div[inputs] {
            background-color: #082138;
            width: 100%;
            padding: 4px;
            border-right: 1px solid var(--app-primary-text-color);
            height: 25px;
            cursor: pointer;
        }

        .flexleft, .flexright {
            flex: 1;
            max-height: unset;
        } 

        .flexleft {
            width: 84px;
            flex-basis: 92px;
        } 
        paper-listbox.dropdown-content {
            background-color: #082138;
            box-shadow: 0px 0px 0px;
            color: var(--app-item-backgound-color);
        }
        `
    }
    static get _getButtons() {
        return html`
            <div inputs name="[[itemLabel]]" aria-label="mode-category" on-click="open">
                [[lang]]
            </div>`
    }

    static get _getListItem() {
        return html`
            <paper-listbox class="dropdown-content" slot="dropdown-content">
                <dom-repeat repeat items="[[langs]]" as="item">
                    <template>
                        <paper-item class="form-al" on-click="_setResValue">[[item]]</paper-item>
                    </template>
                </dom-repeat>
            </paper-listbox>`
    }
    static get is() {
        return 'cms-langs-menu';
    }
    static get properties() {
        return {
            lang: {
                type: String,
                notify: true,
            },
            langs: {
                type: Array,
                value: [],
                notify: true
            },
            list: {
                type: Array,
                notify: true,
            }
        };
    }
    ready() {
        super.ready();

    }
    _setResValue(evt) {
        this.lang = evt.model.__data.item
        this.$.dropdown.close()
        this.opened = false
    }
}
customElements.define(cmsLangsMenu.is, cmsLangsMenu);
