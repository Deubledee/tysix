/*<!--
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
-->*/
import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';

class cmsInputSellector extends PolymerElement {
     static get template() {
          return html`         
          <custom-style>
          <style is="custom-style">
               :host {
                    width: 100%;
               }
               a {
                    color: black;
                    text-decoration: none;
               }
               nav {
                    /*   box-shadow: 2px 2px 6px #272424;*/
                    border-radius: var(--app-standart-border-radius);
                    margin-top: 6px;
               }
               section {
                    display: flex;
               }
               paper-item[not-active] {
                    background-color: rgb(160, 153, 153);
               }
               @media (max-width: 640px) {
                    paper-dropdown-menu.custom2 {
                         min-width: 80px;
                         max-width: 100px;
                         width: auto;
                    }
               }
               
          </style>
          </custom-style>
          <nav>
               <section>
                    <aside>
                         <paper-dropdown-menu class="custom custom2" label="[[label]]">
                              <paper-listbox id="listBox" slot="dropdown-content" class="dropdown-content" selected="0">
                                   <dom-repeat items="{{options}}" as="option" mutable-data="true">
                                        <template>
                                             <div on-click="changeToOne">
                                                  <paper-item id="[[option.id]]" value=[[option.name]] not-active$="[[option.notAtive]]">
                                                       [[option.name]]
                                                  </paper-item>
                                             </div>
                                        </template>
                                   </<dom-repeat>
                              </paper-listbox>
                         </paper-dropdown-menu>
                    </aside>
               </section>
          </nav> `
     }
     static get is() { return 'cms-input-sellector'; }

     static get properties() {
          return {
               label: {
                    type: String,
                    computed: 'LabelThis(options)',
                    notify: true,
               },
               notActive: {
                    type: Boolean,
                    value: false,
                    notify: true,
                    reflectToAttribute: true
               },
               value: {
                    type: String,
                    value: '---',
                    notify: true,
               },
               options: {
                    value: [],
                    notify: true
               }
          }
     }
     LabelThis(options) {
          let label = options[0].label
          options.reverse().pop()
          this.options = options.reverse()
          return label
     }
     changeToOne(data) {
          // if (data.model.__data.option.id !== 'agents') {
          // if (data.model.__data.option.notAtive === false) {
          this.value = data.model.__data.option.name

     }
}
customElements.define(cmsInputSellector.is, cmsInputSellector);  