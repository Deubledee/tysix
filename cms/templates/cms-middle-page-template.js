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
                flex-basis: 600px;
                padding: 10px;
                margin-left: auto;
                margin-right: auto;
                width: 80%;
                border-radius: 10px;
                box-shadow: 0px 1.5px 4px var(--secondary-text-color);
            }            
            .flex2{
                display: flex;
                flex-direction: column;
            }
            div[top] {                
                /*padding-left: 10px;*/
                height: 32px;
                }
            div[silent]{
                color: var(--paper-blue-grey-300);
                display: block;
                box-sizing: border-box;
                height: 39px;
                border-right: 1px solid var(--divider-color);;
            }
            .navside{
                flex-basis: 80px;
                padding-top: 8px;
            }
            .schooch{
                margin-left: auto; 
            }
            .smaller{
                height: 29px;
                min-width: 35px;
                padding: 0 0;
            }
            .back-a-litle{
                margin-inline-start: -18px;
            }
            .higherh3{
                margin-block-end: -1px;
                margin-block-start: 2px;
            }
            .higherh5{
                margin-block-start: -2px;
                margin-block-end: 0px;
                color: var(--light-primary-color);
                flex-basis: auto;
                letter-spacing: 0.2px;
            } 
            div[spinnercenter]{
                position: absolute;
                left: 50%;
                top: 30%;
            }
            .add-btn-group{
                display: flex;
                flex-direction: row;
                flex-flow: wrap;
                box-sizing: border-box;
                width: 75px;
                padding: 19px;
                padding-top: 3px; 
            }
            .add-btn-group-item{
                color: var(--app-item-backgound-color);
                flex-basis: 15px;
                height: 15px;;
            }
            .group-item-top-left{
                border-right: 2px solid;
                border-bottom: 2px solid; 
            }
            .group-item-top-right{
                border-left: 2px solid;
                border-bottom: 2px solid; 
            }
            .group-item-bottom-left{
                border-top: 2px solid;
                border-right: 2px solid;  
            }
            .group-item-bottom-right{
                border-top: 2px solid;
                border-left: 2px solid; 
            }
            .count{
                position: relative;
                top: -15px;
            }
        </style>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}"
            active="{{active}}">
        </app-route>
            <div spinnercenter>
                <slot name="spinner"></slot>  
            </div>
        <main class="flex2">        
            <nav class="navside">

                <div class="navsidecontent">   
                    <div silent>
                        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">                   
                            ${this._getSilentAnchor}
                        </iron-selector>
                    </div>              
                    <nav top> 
                        ${this._topLabel}
                    </nav>
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
        <div class="count">
            <span> [[pages.length]] </span>
        </div>
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