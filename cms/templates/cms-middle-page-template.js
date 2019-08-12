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
            .navbottom{
                height: auto
            }
            flexchildbotom{
                
            }
            .flex{
                height: auto
            }
            div[top] {                
                padding-left: 10px;
                padding-top: 6px;
                height: 32px;
                }
            div[silent]{
                height: 38px;
                border-radius: 4px;
                background-color: var(--divider-color);
            }
        </style>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}"
            active="{{active}}">
        </app-route>
           <slot name="spinner"></slot>
        <nav top>          
            <div top>
                <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                    ${this._getShoutAnchor}
                </iron-selector>
            </div>
            <div silent>
                <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">                   
                    ${this._getSilentAnchor}
                </iron-selector>
            </div>
        </nav>
        <main class="flex">
            <div class="navbottom">
                <div arow hidebottom$="[[hidebottom]]">
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
            <paper-icon-button-light>
                <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
            </paper-icon-button-light>            
        </a>
        `
    }
    static get _getSilentAnchor() {
        return html`
            <a id="reset" href="[[rootPath]]content/">
            </a>
        `
    }
    static get _getBottom() {
        return html`
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[title]] </h4>
            </div>
        </section>                        
            
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[viewedit]] </h4>
            </div>
        </section>  
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[viewedit]] sub-cat </h4>
            </div>
        </section>                      
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[type]] </h4>
            </div>
        </section>                        
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[published]] </h4>
            </div>
        </section>                        
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[delete]] </h4>
            </div>
        </section>
        `
    }

    static get _getNavside() {
        return html`
        <dom-repeat repeat items="[[inForm]]" as="detail">
            <template>
                <div class="center-menu">
                    <aside class="">
                        <span>
                            [[Info]] 
                        </span>
                    </aside>
                </div>
                <div class="collumn-left-menu">
                    <aside>
                        <span>
                        [[categorycount]]
                        </span>
                    </aside>
                </div>
                <div class="collumn-left-menu">
                    <aside  class="asideBackgrc">
                        <span>
                            <b> [[detail.categoryCount]] </b>
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
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
                                <div published$="[[_getPublished(published.page)]]">
                                    <aside class="asideBackgrc">
                                            [[published.page]]
                                    </aside>
                                </div>
                                <aside class="asideBackgrc">
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
            hidebottom: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
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

    _getStr(item) {
        let str = ''
        str = `${item}`
        return str
    }
    _getPage(item) {
        let str = ''
        let word
        if (item === 'home') {
            str = `${item}`
        } else {
            word = item.split('/')
            word.shift()
            word = word.join(' | ')
            str = word;
        }
        return str
    }
}
customElements.define(cmsMiddlePageTemplate.is, cmsMiddlePageTemplate);