import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html as litHtml, render } from 'lit-html';
import './elements/shop-category-item';
import './shop-button.js';

class ShopHome extends PolymerElement {
  static get template() {
    return html`
  <style include="shop-button">
  .subcats,
    .item {
      display: block;
      text-decoration: none;
      text-align: center;
      margin-bottom: 40px;
    }

    .subcats,    
    .item:nth-of-type(3),
    .item:nth-of-type(4) {
      display: inline-block;
      width: 50%;
    }
    .subcats{
      width: 50%;
    }
      
    .item:nth-of-type(3) > h2,
    .item:nth-of-type(4) > h2 {
      font-size: 1.1em;
    }

    .item:nth-of-type(3) > shop-button > a,
      .item:nth-of-type(4) > shop-button > a {
        padding: 8px 24px;
      }
    
    .spinnercenter {
      margin-inline-start: 49%;
      margin-block-start: 10%;
    }

    </style>

    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}"></app-route>

    <div class="spinnercenter">
        <slot name="spinner"></slot>  
    </div>

    <dom-if if="[[_shouldRenderCategories]]">
      <template>
      
        <dom-repeat items="[[categories]]">
          <template strip-whitespace="">
            <div class="item">
              <slot name="cat-[[item.name]]">
              </slot>
            </div>
          </template>
        </dom-repeat>

      </template>
    </dom-if>

    <dom-if if="[[!_shouldRenderCategories]]">
      <template>
      
        <dom-repeat items="[[subCategories]]">
          <template strip-whitespace="">
            <div class="subcats">
              <slot name="cat-[[item.name]]">
              </slot>
            </div>
          </template>
        </dom-repeat>
      </template>
    </dom-if>`;
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
      subCategories: {
        type: Array,
        notify: true,
        observer: '_renderSlotedCats'
      },
      BINDER: {
        type: Object,
        value: window.MyAppGlobals[window.cms]
      },
      _shouldRenderCategories: {
        computed: '_computeShouldRenderCategories(route, routeData)'
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

  _computeShouldRenderCategories(route) {
    const helloTemplate = () => litHtml`<paper-spinner-lite active="false" slot="spinner">
      </paper-spinner-lite>`;
    render(helloTemplate(), this)
    if (!!route) {
      if (route.path === "" || route.path === "/") {
        let temp = this.categories
        afterNextRender(this, () => {
          this.categories = []
          this.categories = temp
        });
        return true
      }
      if (route.prefix === "/categories") {
        return false
      }
    }
  }

  _getPathType() {
    return !!this._shouldRenderCategories ? 'categories' : 'list'
  }

  _renderSlotedCats(items) {
    if (items.length > 0) {
      const helloTemplate = (data) => litHtml`${data.map((item) => {
        return litHtml`
          <shop-category-item slot="cat-${item.name}" .category="${item}" type="${this._getPathType()}">
          </shop-category-item>
        `
      })}`;
      afterNextRender(this, () => {
        render(helloTemplate(items), this);
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
