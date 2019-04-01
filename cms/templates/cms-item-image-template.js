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
              
        <app-location route="{{route}}">
        </app-location>            
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="[[query]]">
        </app-route>
        <main class="flexH">
            <div bottom>    
                ${this._getMenu}  
            </div>
            <div table>                       
                <dom-repeat repeat items="[[content]]" as="item">
                    <template>
                        <slot name="item[[index]]"></slot>  
                        [[_slottItem(item, index)]]
                    </template>                            
                </dom-repeat> 
            </div> 
        <main> `;
    }

    static get _getStyles() {
        return html`
        article[centerListItem]{
        letter-spacing: var(--app-content-letter-spacing);
        font-size: var(--app-content-font-size);
        font-weight: var(--app-default-font-weight);
        word-break: keep-all;
        }

        div[table] , div[bottom]{
            max-width: 75%;
        } 
        div[bottom]{
            height: 35px;
            background-color: var(--app-tabs-color);
            font-size: var(--app-images-article-font-size);
            box-shadow: 1px 1px 4px var(--disabled-text-color);
        }
        div[bottom] h4{
            margin-block-start: 8px;
        }
        div[table] {
            font-size: 9px;
            font-weight: bold; box-sizing: var(--app-default-box-sizing);
            padding: 0px;
            background: var(--app-secondary-text-color);
            overflow: var(--app-images-div-overflow);
            text-overflow: var(--app-images-div-text-overflow);
            overflow-y: var(--app-images-divnav-overflow-y;
        }
        `
    }

    static get _getMenu() {
        return html`                           
            <section class="flexchildbotom">
                <div class="flexleft">   
                    <h4>  image   </h4>     
                </div>  
            </section>

            <section class="flexchildbotom">
                <div class="flexleft">   
                    <h4> 
                    title    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">   
                    <h4> 
                    date created    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">  
                    <h4> 
                    gallery     </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">  
                    <h4> 
                    url      </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">  
                    <h4> 
                    delete      </h4>     
                </div>  
            </section>`
    }

    _slottItem(item, index) {
        let template = document.createElement('template')
        let str = `
        <article centerImageItem>
            <div class="paddingSmall">
                <shop-image
                    class="bigger"
                    aria-label="image"
                    title="${this._getParameter(item.title)}" 
                    src="${this._getParameter(item.url)}" 
                    alt=${this._getParameter(item.title)}">
                </shop-image> 
            </div>
            <div class="paddingSmall">
                <span title="${this._getParameter(item.title)}"> 
                ${this._getParameter(item.title)}
                </span>
            </div>
            <div class="paddingSmall">
                <span title="${this._getParameter(item.dateAdded)}">
                ${this._getParameter(item.dateAdded)}  
                </span>
            </div>
            <div class="paddingSmall">
                <span title="${this._getParameter(item.gallery)}"> 
               <h3> ${this._getParameter(item.gallery)} </h3>
                </span>
            </div>
            <div class="paddingSmall">
                <span title="${this._getParameter(item.url)}"> 
                ${this._getParameter(item.url)} 
                </span>  
            </div>
            <div class="paddingSmall">
                <paper-button title="delete">
                    <paper-icon-button icon="av:not-interested" aria-label="delete">
                    </paper-icon-button> 
                </paper-button>
            </div>
        </article> `
        template.innerHTML = str
        template.content.children[0].setAttribute('slot', 'item' + index)
        var clone = document.importNode(template.content, true);
        this.appendChild(clone)
        this.children[index].children[5].setAttribute('value', index)
        this.children[index].children[5].children[0].addEventListener('click', (this._openConfirm).bind(this))
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
            }
        };
    }
}
customElements.define(cmsItemImageTemplate.is, cmsItemImageTemplate);