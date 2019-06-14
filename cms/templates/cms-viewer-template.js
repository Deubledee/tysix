import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-selector/iron-selector';
import { html, PolymerElement } from '@polymer/polymer/polymer-element';
export class cmsViewerTemplate extends PolymerElement {
    static get template() {
        return html`
    <style>
        :host {
          position: relative;
        }
              
        article {
          max-width: 1890px;
          min-width: 730px;
          color: #5487b6;
          padding-left: 21px;
          padding-right: 18px;
        }

        #reset {
          display: none;
        }
    </style>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}"
    active="{{active}}">
    </app-route>
        ${this._getSilentAnchor}
        <main id="main">
        <iron-pages selected="[[page]]" attr-for-selected="name"> 
            ${this._getPages}
        </iron-pages>  
    </main> `;
    }

    static get _getSilentAnchor() {
        return html`  
    <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
        <a id="reset" href="[[rootPath]]content/pages/">
        </a>
    </iron-selector>`
    }
    static get _getPages() {
        return html`
            <article name="add-category-pages">  
                <slot name="add"></slot>  
            </article>

            <article name="add-subcategory-pages">  
                <slot name="sub-categories"></slot>  
            </article>

            <article name="home">           
                <slot name="categories"></slot>
            </article>`
    }
    static get is() { return 'cms-viewer-template'; }
    static get properties() {
        return {
            lang: {
                type: String,
                notify: true
            },
            page: {
                type: String,
                reflectToAttribute: true,
                observer: '_pageChanged'
            },
            active: {
                type: String,
                value: ''
            },
            pages: {
                type: Array,
                notify: true
            }
        };
    }
    ready() {
        super.ready();
    }
}
customElements.define(cmsViewerTemplate.is, cmsViewerTemplate);