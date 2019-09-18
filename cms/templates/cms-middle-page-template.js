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
            .flex{
                height: auto
            }
            div[top] {                
                /*padding-left: 10px;*/
                height: 32px;
                }
            div[silent]{
                width: 174px;
                box-sizing: border-box;
                height: 47px;
                background-color: var(--paper-blue-grey-700);
                padding: 7px;
                border-bottom: 3px solid var(--app-primary-color)
            }
            .navside{
                flex-basis: 181px;
            }
            
           h3, h5, h2{
               margin-inline-start: -26px;
            }

            .higherh5{
                background-color: var(--paper-cyan-700) 
            } 
            div[spinnercenter]{
                position: absolute;
                left: 50%;
                top: 30%;
            }
        </style>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}"
            active="{{active}}">
        </app-route>
            <div spinnercenter>
                <slot name="spinner"></slot>  
            </div>
        <main class="flex">        
            <nav class="navside">

                <div class="navsidecontent">                
                    <nav top> 
                        ${this._topLabel}
                    </nav> 
                    <div silent>
                        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">                   
                            ${this._getSilentAnchor}
                        </iron-selector>
                    </div>
                </div>

            </nav>
            <div class="navbottom">
                <div arow>
                    ${this._getBottom}
                </div>
            
                    ${this._getTable}
            </div>
        </main> 
        `;
    }
    static get is() { return 'cms-middle-page-template'; }
    static get _topLabel() {
        return html`       
            <h2>[[categorypages]]</h2>               
        `
    }
    static get _getSilentAnchor() {
        return html`
            <a id="reset" href="[[rootPath]]content/">
            </a>
        `
    }
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
    static get _getBottom() {
        return html`
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[title]] </h4>
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
                <h4> [[delete]] </h4>
            </div>
        </section>
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
            },
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