import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
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
        <slot name="image-anchor[[category.name]]">
        </slot>    
        <h2 title="[[category.title]]">
            [[category.name]]
        </h2>
        <shop-button>
            <slot name="shop-anchor[[category.name]]">
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
                computed: '_parseData(data)',
                observer: '_renderSlotedCatItems'
            },
            data: {
                type: String,
                notify: true
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

    _parseData(data) {
        let final = JSON.parse(atob(data))
        return final
    }

    _renderSlotedCatItems(items) {
        console.log(this.type)
        const helloTemplate = (data) => litHtml`       
         <a slot="image-anchor${data.name}" title="${data.title}" class="image-link" href="/${this.type}/${data.name}">
            <shop-image src="${data.image}" class="${this.type}" alt="${data.title}" placeholder-img="${data.placeholder}">
            </shop-image>
        </a>
        <a class="${this.type}" slot="shop-anchor${data.name}" aria-label="${data.name} Shop Now" title="Shop Now ${data.title}" href="/${this.type}/${data.name}">
            Shop Now
        </a> 
        `;
        render(helloTemplate(items), this);
    }
}

customElements.define(ShopCategoryItem.is, ShopCategoryItem);
