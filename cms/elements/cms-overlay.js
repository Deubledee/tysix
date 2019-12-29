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

import { IronOverlayBehavior } from '@polymer/iron-overlay-behavior/iron-overlay-behavior';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element';

export class cmsOverlay extends mixinBehaviors(IronOverlayBehavior, PolymerElement) {
  static get template() {
    return html`
    <style>
      :host {
        background: inherit;
        color: black;
        box-shadow: rgba(0, 0, 0, 0.24) -2px 5px 12px 0px, rgba(0, 0, 0, 0.12) 0px 0px 12px 0px;
      }
    </style>
    <slot></slot>
`
  }
  static get is() { return 'cms-overlay' }

  ready() {
    super.ready();
  }
}

customElements.define(cmsOverlay.is, cmsOverlay);
