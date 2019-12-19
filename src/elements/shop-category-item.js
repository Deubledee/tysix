import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { html as litHtml, render } from 'lit-html';
import '../shop-button.js';
import '../shop-image.js';

class ShopCategoryItem extends PolymerElement {
    static get template() {
        return html`
    <style>   
      span {
        font-size: 1.3em;
        font-weight: 500;
        margin: 32px 0;
        color: var(--google-blue-700);
        text-transform: capitalize;
        letter-spacing: 4px;
    }
      @media (max-width: 767px) {
        shop-image {
          height: 240px;
        }

        span {
          margin: 24px 0;
      }
    }
      article{
        @apply --layout-horizontal;        
        width: 100%;
        margin-left: auto;
        margin-right: auto;
      }
      
     section { 
        @apply --layout-flex;
      }

      section{
        max-width: 300px;
      }

    </style>    
    <slot name="spinner"></slot>  
    <article homepage$="[[homepage]]"> 
        <section homepage$="[[homepage]]">
            <slot name="shop-image-[[category.name]]">
            </slot> 
            <shop-button>
                <slot name="shop-btn-[[category.name]]">
                </slot>              
            </shop-button>
        </section>
        <section>   
            <span title="[[category.title]]">
                [[category.name]]
            </span>
            <slot name="shop-description-[[category.name]]">
            </slot>  
        </section>
    </article> `;
    }

    static get is() { return 'shop-category-item'; }

    static get properties() {
        return {
            category: {
                type: Object,
                notify: true,
                observer: '_renderSlotedCatItems'
            },
            homepage: {
                type: Boolean,
                notify: true,
                value: true,
                reflectToAttribute: true
            },
            index: {
                type: String,
                notify: true
            },
            type: {
                type: String,
                notify: true
            },
            classcss: {
                type: String,
                notify: true
            }
        }
    }

    _log(data) {
        console.log(data)
    }

    ready() {
        super.ready();
    }

    setForCats(data) {
        if (this.homepage === false) {
            return litHtml`
                        <div slot="shop-description-${data.name}">
                            <p>${data.title}</p> 
                            <p>${data.placeholder}</p>
                        </div>
                            <a class="${this.type}" slot="shop-btn-${data.name}" aria-label="${data.name} Shop Now" title="Shop Now ${data.title}" href="/${this.type}/${data.name}">
                            <paper-button>      
                                Shop Now 
                            </paper-button>
                        </a>`
        } else {
            return litHtml`
                        <div class="peecan" slot="shop-description-${data.name}">
                            <p class="greenpees">${data.title}</p>             
                            <p class="redpees">${data.placeholder}</p>
                        </div>`;
        }
    }
    _renderSlotedCatItems(items) {
        this.classcss = !this.homepage ? this.type : 'categories'
        const helloTemplate = (data, idx) => litHtml`       
                        <a slot="shop-image-${data.name}" title="${data.title}" class="image-link" href="/${this.type}/${data.name}?t=${idx}">         
                            <shop-image src="${data.image}" class="${this.classcss}" alt="${data.title}" placeholder-img="${data.placeholder}">
                            </shop-image>
                        </a>
                        ${this.setForCats(data)}`;
        render(helloTemplate(items, this.index), this);
    }
}

customElements.define(ShopCategoryItem.is, ShopCategoryItem);
