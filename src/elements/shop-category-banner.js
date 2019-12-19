import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { html as litHtml, render } from 'lit-html';
import '../shop-button.js';
import '../shop-image.js';

class ShopCategoryItem extends PolymerElement {
    static get template() {
        return html`
    <style>   

      h1 {
        margin: 32px 0;
        text-shadow: 1px 2px 3px var(--google-blue-700);
        color: var(--google-blue-100);
        text-transform: capitalize;
        letter-spacing: 6px;
    }

      @media (max-width: 767px) {
        shop-image {
          height: 240px;
        }

    }

    </style>    
    <slot name="spinner"></slot>  
    <div>  
        <h1 title="[[category.title]]">
            [[category.name]]
        </h1>
        <slot name="image-anchor-[[category.name]]">
        </slot>  
        <shop-button>
            <slot name="shop-btn-[[category.name]]">
            </slot>              
        </shop-button>
    </div>`;
    }

    static get is() { return 'shop-category-banner'; }

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
            <shop-image slot="image-anchor-${data.name}" src="${data.image}" class="${this.type}" alt="${data.title}" placeholder-img="${data.placeholder}">
            </shop-image>
        `;
        render(helloTemplate(items), this);
    }
}

customElements.define(ShopCategoryItem.is, ShopCategoryItem);
