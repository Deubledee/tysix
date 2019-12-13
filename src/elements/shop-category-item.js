import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { html as litHtml, render } from 'lit-html';
import '../shop-button.js';
import '../shop-image.js';

class ShopCategoryItem extends PolymerElement {
    static get template() {
        return html`
    <style>   

      h2 {
        font-size: 1.3em;
        font-weight: 500;
        margin: 32px 0;
    }
      @media (max-width: 767px) {
        shop-image {
          height: 240px;
        }

        h2 {
          margin: 24px 0;
      }

    </style>    
    <slot name="spinner"></slot>  
    <div>
        <slot name="image-anchor-[[category.name]]">
        </slot>    
        <h2 title="[[category.title]]">
            [[category.name]]
        </h2>
        <shop-button>
            <slot name="shop-btn-[[category.name]]">
            </slot>              
        </shop-button>
    </div>`;
    }

    static get is() { return 'shop-category-item'; }

    static get properties() {
        return {
            category: {
                type: Object,
                notify: true,
                observer: '_renderSlotedCatItems'
            },
            type: {
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


    _renderSlotedCatItems(items) {
        const helloTemplate = (data) => litHtml`       
         <a slot="image-anchor-${data.name}" title="${data.title}" class="image-link" href="/${this.type}/${data.name}">
            <shop-image src="${data.image}" class="${this.type}" alt="${data.title}" placeholder-img="${data.placeholder}">
            </shop-image>
        </a>
        <a class="${this.type}" slot="shop-btn-${data.name}" aria-label="${data.name} Shop Now" title="Shop Now ${data.title}" href="/${this.type}/${data.name}">
            Shop Now
        </a> 
        `;
        render(helloTemplate(items), this);
    }
}

customElements.define(ShopCategoryItem.is, ShopCategoryItem);
