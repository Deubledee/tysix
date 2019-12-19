import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html as litHtml, render } from 'lit-html';
import './elements/shop-category-item';
import './elements/shop-home-cats';
import './shop-button.js';

class ShopHome extends PolymerElement {
  static get template() {
    return html`
  <style include="shop-button">    
    .spinnercenter {
      margin-inline-start: 49%;
      margin-block-start: 10%;
    }
    
    </style>

    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
    <div class="spinnercenter">
        <slot name="spinner"></slot>  
    </div>      
      <shop-home-cats categories="[[categories]]">
        <!-- slots go here -->
      </shop-home-cats> 

     `;
  }

  static get is() { return 'shop-home'; }

  static get properties() {
    return {
      categories: {
        type: Array,
        notify: true,
        value: [],
        observer: '_renderSlotedCats'
      },
      BINDER: {
        type: Object,
        value: window.MyAppGlobals[window.cms]
      },
      visible: {
        type: Boolean,
        observer: '_visibleChanged'
      }
    }
  }

  _log(data) {
    console.log(data)
  }

  ready() {
    super.ready();
    this.BINDER.setBinder('shopHome', 'categories', (this.bindCallback).bind(this))
    this.BINDER.setBinder('shopHome', 'route', (this.bindCallback).bind(this))
    this.BINDER.setBinder('shopHome', 'subCategories', (this.bindCallback).bind(this))
  }

  bindCallback(par, value) {
    this[par] = value
  }

  _shouldRenderCategories(route) {

  }

  _getPathType(data) {
    return !data.hasArticle ? 'categories' : 'list'
  }

  _renderSlotedCats(data) {
    const spinnerTemplate = () => litHtml`<paper-spinner-lite active="false" slot="spinner">
      </paper-spinner-lite>`;
    render(spinnerTemplate(), this)
    if (data.length > 0) {
      const catItemTemplate = (items, b) => litHtml`${items.map((item, idx) => {
        return litHtml`
          <shop-category-item slot="cat-${item.name}" .homepage="${b}" .category="${item}" .index="${idx}" .type="${this._getPathType(item)}">
          </shop-category-item>
        `
      })}`;
      afterNextRender(this, () => {
        render(catItemTemplate(data, true), this);
      });
    }
  }

  _visibleChanged(visible) {
    if (visible) {
      this.dispatchEvent(new CustomEvent('change-section', {
        bubbles: true, composed: true, detail: { title: 'Home' }
      }));
    }
  }
}

customElements.define(ShopHome.is, ShopHome);
