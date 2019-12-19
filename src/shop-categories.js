import { microTask } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html as litHtml, render } from 'lit-html';
import './elements/shop-category-item';
import './elements/shop-category-banner';
import './shop-button.js';

class ShopCategories extends PolymerElement {
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
    
    ::slotted(paper-spinner-lite){
      margin-inline-start: 49%;
      margin-block-start: 10%;
    }

    </style>

    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}"></app-route>

    <slot name="spinner">
    </slot>  

    <div class="item">
        <slot name="banner-[[category.name]]">
        </slot>
    </div>          
    <dom-repeat items="[[subCategories]]">
        <template strip-whitespace="">
            <div class="subcats">
                <slot name="cat-[[item.name]]">
                </slot>
            </div>
        </template>
    </dom-repeat>`;
    }

    static get is() { return 'shop-categories'; }

    static get properties() {
        return {
            category: {
                type: Array,
                notify: true,
                value: []
            },
            subCategories: {
                type: Array,
                notify: true,
                value: [],
                observer: '_renderSlotted'
            },
            items: {
                type: Array,
                notify: true,
                observer: '_setContent'
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
        this.BINDER.setBinder('shopCategories', 'categories', (this.bindCallback).bind(this))
        this.BINDER.setBinder('shopCategories', 'route', (this.bindCallback).bind(this))
        this.BINDER.setBinder('shopCategories', 'subCategories', (this.bindCallback).bind(this))
    }

    bindCallback(par, value) {
        this[par] = value
    }

    _setContent(data) {
        let category = data[1][0]//this.category = data.pop().pop()
        let subCategories = data[0]// this.subCategories = data[0]/* */
        this.category = category
        this.subCategories = subCategories

    }

    _computeShouldRenderCategories(route) {
        const spinnerTemplate = () => litHtml`<paper-spinner-lite active="false" slot="spinner">
      </paper-spinner-lite>`;
        render(spinnerTemplate(), this)
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

    _renderSlotted(data) {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer,
            microTask, () => {
                if (data) {
                    // Notify the category and the page's title
                    this.dispatchEvent(new CustomEvent('change-section', {
                        bubbles: true, composed: true, detail: {
                            category: this.category.name,
                            title: this.category.title,
                            image: this.category.image
                        }
                    }));
                }
            }); /* */
        if (data.length > 0) {
            afterNextRender(this, () => {
                const categoryTemplate = (cat, items, b) => litHtml`
            <shop-category-banner slot="banner-${cat.name}" .category="${cat}" type="${this._getPathType()}">
            </shop-category-banner>
            ${items.map((item) => {
                    return litHtml`
               <shop-category-item slot="cat-${item.name}" .category="${item}" .homepage="${b}" type="${this._getPathType()}">
               </shop-category-item>
             `
                })}`;
                afterNextRender(this, () => {
                    render(categoryTemplate(this.category, data, false), this);
                });
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

customElements.define(ShopCategories.is, ShopCategories);
