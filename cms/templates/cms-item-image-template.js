import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-spinner/paper-spinner';
import '@polymer/paper-input/paper-input';
import '../styles/cms-comon-style_v3';
import '../../src/shop-image';
export class cmsItemImageTemplate extends PolymerElement {
    static get template() {
        return html`  
        <style include="cms-comon-style_v3">
                :host {
                    position: var(--app-default-position);
                }            
                ${this._getStyles}
        </style>    
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>          
        <main class="flexH" small$="[[small]]">          
            <div table size$="[[size]]" class="scroll">
                ${this._getItem}   
            </div> 
        </main> `;
    }
    static get _getStyles() {
        return html`
        article[centerListItem]{
        letter-spacing: var(--app-content-letter-spacing);
        font-size: var(--app-content-font-size);
        font-weight: var(--app-default-font-weight);
        word-break: keep-all;
        }

        div[table] , div[arow]{
            max-width: 100%;
        } 

        div[arow]{
            font-size: var(--app-images-article-font-size);
            /*box-shadow: 1px 1px 4px var(--disabled-text-color);*/
        }
        main[small]{
            width: 342px; 
        }
        div[arow] div[small]{
            height: 23px;
            font-size: 9px; 
        }
        div[arow] h4{
            margin-block-start: 8px;
        }
        div[table] {
            font-size: 9px;
            font-weight: bold; box-sizing: var(--app-default-box-sizing);
            padding: 0px;
            overflow: var(--app-images-div-overflow);
            text-overflow: var(--app-images-div-text-overflow);
            overflow-y: var(--app-images-divnav-overflow-y);
        }
        #reset{
            display: none
        }
        div[arow][size],
        div[table][size]{
            max-width: 75%; 
        }`
    }

    static get _getMenu() {
        return html`                           
            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4>  data   </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4> 
                    method      </h4>     
                </div>  
            </section>`
    }
    static get _getItem() {
        return html` 
        <dom-repeat repeat items="[[content]]" as="item">
            <template>
                <slot name="item[[index]]"></slot>  
                [[_slottItem(item, index)]]
            </template>                            
        </dom-repeat>`
    }
    _slottItem(item, index) {
        // let template = document.createElement('template')
        let str = `
        <article centerImageItem>
            <div class="paddingSmall">
                <span title="">                 
                </span>  
            </div>
            <div class="paddingSmall">
                <paper-button title="delete">
                    <paper-icon-button icon="av:not-interested" aria-label="delete">
                    </paper-icon-button> 
                </paper-button>
            </div>
        </article> `
        /* template.innerHTML = str
         template.content.children[0].setAttribute('slot', 'item' + index)
         var clone = document.importNode(template.content, true);
         this.appendChild(clone)
         this.children[index].children[5].setAttribute('value', index)
         this.children[index].children[5].children[0].addEventListener('click', (this._openConfirm).bind(this))*/
    }

    _getParameter(item) {
        return item
    }

    static get is() { return 'cms-item-image-template'; }
    static get properties() {
        return {
            images: {
                type: Object,
                notify: true
            },
            size: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
            },
            hidden: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
            },
            small: {
                type: Boolean,
                value: false,
                reflectToAttribute: true,
            }
        };
    }
}
customElements.define(cmsItemImageTemplate.is, cmsItemImageTemplate);