/**
@license
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
import '@polymer/iron-a11y-keys-behavior/iron-a11y-keys-behavior.js';
import { IronButtonState } from '@polymer/iron-behaviors/iron-button-state.js';
import { IronControlState } from '@polymer/iron-behaviors/iron-control-state.js';
import { IronFormElementBehavior } from '@polymer/iron-form-element-behavior/iron-form-element-behavior.js';
import '@polymer/iron-icon/iron-icon.js';
import { IronValidatableBehavior } from '@polymer/iron-validatable-behavior/iron-validatable-behavior.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-menu-button/paper-menu-button.js';
import '@polymer/paper-ripple/paper-ripple.js';
import '@polymer/paper-styles/default-theme.js';
import { dom } from '@polymer/polymer/lib/legacy/polymer.dom.js';
import { GestureEventListeners } from '@polymer/polymer/lib/mixins/gesture-event-listeners.js';
import * as gestures from '@polymer/polymer/lib/utils/gestures.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
import { PolymerElement } from '@polymer/polymer/polymer-element';
import '@polymer/polymer/polymer-legacy.js';
import './paper-dropdown-menu-icons.js';
import './paper-dropdown-menu-shared-styles.js';

export class cmsInput extends mixinBehaviors([IronButtonState, IronControlState, IronFormElementBehavior, IronValidatableBehavior, GestureEventListeners], PolymerElement) {
    static get template() {
        html`
    <style include="paper-dropdown-menu-shared-styles"></style>

    <!-- this div fulfills an a11y requirement for combobox, do not remove -->
    <span role="button"></span>
    <paper-menu-button id="menuButton" 
        vertical-align="[[verticalAlign]]" 
        horizontal-align="[[horizontalAlign]]" 
        dynamic-align="[[dynamicAlign]]" 
        vertical-offset="[[_computeMenuVerticalOffset(noLabelFloat, verticalOffset)]]" 
        disabled="[[disabled]]" no-animations="[[noAnimations]]" 
        on-iron-select="_onIronSelect" 
        on-iron-deselect="_onIronDeselect" opened="{{opened}}" 
        close-on-activate allow-outside-scroll="[[allowOutsideScroll]]" 
        restore-focus-on-close="[[restoreFocusOnClose]]">
      <!-- support hybrid mode: user might be using paper-menu-button 1.x which distributes via <content> -->
      <div class="dropdown-trigger" slot="dropdown-trigger">
        <paper-ripple></paper-ripple>
        <!-- paper-input has type="text" for a11y, do not remove -->
        <paper-input type="text" invalid="[[invalid]]" readonly disabled="[[disabled]]" value="[[value]]" placeholder="[[placeholder]]" error-message="[[errorMessage]]" always-float-label="[[alwaysFloatLabel]]" no-label-float="[[noLabelFloat]]" label="[[label]]">
          <!-- support hybrid mode: user might be using paper-input 1.x which distributes via <content> -->
          <iron-icon icon="paper-dropdown-menu:arrow-drop-down" suffix slot="suffix"></iron-icon>
        </paper-input>
      </div>
      <slot id="content" name="dropdown-content" slot="dropdown-content"></slot>
    </paper-menu-button>`}

    static get is() { return 'paper-dropdown-menu' }



    static get properties() {
        return {
            selectedItemLabel: { type: String, notify: true, readOnly: true },
            selectedItem: { type: Object, notify: true, readOnly: true },
            value: {
                type: String,
                notify: true,
            },
            label: { type: String },
            placeholder: { type: String },
            errorMessage: { type: String },
            opened:
                { type: Boolean, notify: true, value: false, observer: '_openedChanged' },
            allowOutsideScroll: { type: Boolean, value: false },
            noLabelFloat: { type: Boolean, value: false, reflectToAttribute: true },
            alwaysFloatLabel: { type: Boolean, value: false },
            noAnimations: { type: Boolean, value: false },
            horizontalAlign: { type: String, value: 'right' },
            verticalAlign: { type: String, value: 'top' },
            verticalOffset: Number,
            dynamicAlign: { type: Boolean },
            restoreFocusOnClose: { type: Boolean, value: true },
            hostAttributes:
                { role: 'combobox', 'aria-autocomplete': 'none', 'aria-haspopup': 'true' },
        }
    }



    /**
     * @type {!Object}
     */

    static get observers() { return ['_selectedItemChanged(selectedItem)'] }

    connectedCallback() {
        super.connectedCallback()
        var contentElement = this.contentElement;
        if (contentElement && contentElement.selectedItem) {
            this._setSelectedItem(contentElement.selectedItem);
        }
    }

    static get contentElement() {
        var nodes = this.children
        for (var i = 0, l = nodes.length; i < l; i++) {
            if (nodes[i].nodeType === Node.ELEMENT_NODE) {
                return nodes[i];
            }
        }
    }
    open() {
        this.$.menuButton.open();
    }

    close() {
        this.$.menuButton.close();
    }

    _onIronSelect(event) {
        this._setSelectedItem(event.detail.item);
    }

    _onIronDeselect(event) {
        this._setSelectedItem(null);
    }
    _onTap(event) {
        if (gestures.findOriginalTarget(event) === this) {
            this.open();
        }
    }
    _selectedItemChanged(selectedItem) {
        var value = '';
        if (!selectedItem) {
            value = '';
        } else {
            value = selectedItem.label || selectedItem.getAttribute('label') ||
                selectedItem.textContent.trim();
        }

        this.value = value;
        this._setSelectedItemLabel(value);
    }

    _computeMenuVerticalOffset(noLabelFloat, opt_verticalOffset) {
        // Override offset if it's passed from the user.
        if (opt_verticalOffset) {
            return opt_verticalOffset;
        }
        return noLabelFloat ? -4 : 8;
    }

    _getValidity(_value) {
        return this.disabled || !this.required || (this.required && !!this.value);
    }

    _openedChanged() {
        var openState = this.opened ? 'true' : 'false';
        var e = this.contentElement;
        if (e) {
            e.setAttribute('aria-expanded', openState);
        }
    }
}
