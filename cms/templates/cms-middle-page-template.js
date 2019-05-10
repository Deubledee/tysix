import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-selector/iron-selector';
import '../styles/cms-comon-style_v3';
export class cmsMiddlePageTemplate extends PolymerElement {
    static get template() {
        return html`<style include="cms-comon-style_v3">
            :host {
                position: var(--app-default-position);
                display: var(--app-block)
            }
        </style>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}"
            active="{{active}}">
        </app-route>
            ${this._getSilentAnchor}
           <slot name="spinner"></slot>
        <main class="flex">
            <div class="navbottom">
                <nav top>
                    <app-toolbar>
                        <paper-tabs no-bar>
                            <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                            ${this._getShoutAnchor}
                            </iron-selector>
                        </paper-tabs>
                    </app-toolbar>
                </nav>
                <div bottom>
                    ${this._getBottom}
                </div>
                    ${this._getTable}
            </div>
            <nav class="navside">
             ${this._getNavside}
            </nav>
        </main> 
        `;
    }
    static get is() { return 'cms-middle-page-template'; }
    static get _getTable() {
        return html`
            <div table class="scroll"> 
                <dom-repeat items="[[pages]]" as="page">
                    <template strip-whitespace>
                        [[putElement(index, page)]]
                        <slot name="item[[index]]"></slot>
                    </template>
                </dom-repeat>
            </div>
        `}
    static get _getShoutAnchor() {
        return html`
        <a href="[[rootPath]]content/pages/add-category-pages?content=&add=true">
            <paper-tab name="add-category-pages">
                
                <paper-icon-button-light>
                    <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                </paper-icon-button-light>
            </paper-tab>
        </a>
        `
    }
    static get _getSilentAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="reset" href="[[rootPath]]content/">
            </a>
        </iron-selector>
        `
    }
    static get _getBottom() {
        return html`
        <section class="flexchildbotom noFlex">
            <div class="flexleft">
                <h3> [[title]] </h3>
            </div>
        </section>                        
            
        <section class="flexchildbotom noFlex">
            <div class="flexleft">
                <h3> [[viewedit]] </h3>
            </div>
        </section>                        
        <section class="flexchildbotom noFlex">
            <div class="flexleft">
                <h3> [[type]] </h3>
            </div>
        </section>                        
        <section class="flexchildbotom noFlex">
            <div class="flexleft">
                <h3> [[published]] </h3>
            </div>
        </section>                        
        <section class="flexchildbotom noFlex">
            <div class="flexleft">
                <h3> [[delete]] </h3>
            </div>
        </section>
        `
    }

    static get _getNavside() {
        return html`
        <dom-repeat repeat items="[[inForm]]" as="detail">
            <template>
                <div class="flexsidecenter">
                    <aside>
                        <span>
                            [[Info]] 
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                        [[categorycount]]
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                        <b> [[detail.categoryCount]] </b>
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                        [[publishedpage]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                        [[datepublished]]
                        </span>
                    </aside>
                </div>
                <div rightSide>                            
                    <dom-repeat repeat items="[[detail.published]]" as="published">
                        <template>
                            <section>
                                <aside>
                                    <div published$="[[_getPublished(published.page)]]">
                                        [[published.page]]
                                    </div>
                                </aside>
                                <aside>
                                    <span>
                                        [[published.datePublished]]
                                    </span>
                                </aside>
                            </section>
                        </template>
                    </dom-repeat>
                </div>
            </template>
        </dom-repeat>
        `
    }
    static get properties() {
        return {
            pages: {
                type: Array,
                notify: true
            },
            closed: {
                type: Boolean,
                notify: true,
            },
            confirm: {
                type: Boolean,
                notify: true,
                value: false,
            }
        };
    }
    ready() {
        super.ready();
    }
    _getPublished(data) {
        return (data === 'NPP' || data === 'NPA') ? 'NP' : 'p'
    }
}
customElements.define(cmsMiddlePageTemplate.is, cmsMiddlePageTemplate);