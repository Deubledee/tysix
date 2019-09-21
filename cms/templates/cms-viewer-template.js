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
        }

        #reset {
          display: none;
        }
     /*   div[horizontal]{
            @apply --layout-horizontal;
            max-width: 1800px;
            max-height: 600px;
            height: auto;
            overflow-y: auto;
            overflow-x: auto;
        }
       div[horizontal]::-webkit-scrollbar-track {
            background: #ddd;
        }
        div[horizontal]::-webkit-scrollbar-button{
            height: 7.5px;
            width: 7.5px;
            background: var(--google-blue-300);

        }
        div[horizontal]::-webkit-scrollbar {
            width: 7.5px;
            height: 7.5px;
        }

        div[horizontal]::-webkit-scrollbar-thumb {
            background-color: var(--content-color-default, #8098ad)
        } */
        iron-pages.flexy{
            flex-basis: 100%;
        }
        ${this._getStyles} 
    </style>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}"
    active="{{active}}">
    ${this._getLayer2Route}    
    </app-route>
        ${this._getSilentAnchor}
    <main id="main">
        <div id="pageholder" horizontal>
            <iron-pages class="flexy" selected="[[page]]" attr-for-selected="name"> 
                ${this._getPages}
            </iron-pages>  
        </div>
    </main> `;
    }
    static get _getStyles() {
        return html``
    }
    static get _getSilentAnchor() {
        return html`  
    <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
        <a id="reset" href="[[rootPath]]content/pages/">
        </a>
    </iron-selector>`
    }
    static get _getLayer2Route() {
        return html` `
    }
    static get _getPages() {
        return html`
            <article name="home">           
                <slot name="categories"></slot>
            </article>

            <article name="subcategory-pages">  
                <slot name="sub-categories"></slot>  
            </article> `
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
            subcats: {
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