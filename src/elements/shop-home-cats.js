import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { html, PolymerElement } from '@polymer/polymer/polymer-element.js';
import { html as litHtml, render } from 'lit-html';

class ShopHomeCats extends PolymerElement {
    static get template() {
        return html`   
         <style>
         .inline{
            @apply --layout-horizontal;
            width: 94%;
            overflow-x: hidden;
            margin-left: auto;
            margin-right: auto;
          }
          .inline-scroll{
             scroll-behavior: smooth;
            }
          .item {
            display: block;
            text-decoration: none;
            text-align: center;
            margin-bottom: 40px;
            min-width: 50%;
          }
      
         .item {
            @apply --layout-flex;
            padding-block-start: 12px;
          }
      
          .item > h2 {
            font-size: 1.1em;
          }
      
          .item > a {
              padding: 8px 24px;
            }
            
            .nav {
                color: var(--dark-primary-color);
                width: 74vw;
                margin-left: auto;
                margin-right: auto;
                margin-block-start: 14px;
                margin-block-end: 29px;
            }
            span{
               /* background-color: var(--light-theme-divider-color);*/
                padding: 5px;
                border-radius: 5px;  
            }
        </style>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>  
        <nav class="nav"> 
            <span> Categories </span> 
        </nav>     
        <nav class="inline inline-scroll" id="inline">          
            <dom-repeat items="[[categories]]" as="category">
                <template>
                    <div class="item">
                        <slot name="[[category.name]]">
                        </slot>
                    </div>
                </template>
            </dom-repeat>
        </nav>    
        `
    }

    static get is() { return 'shop-home-cats'; }
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
            notInPause: {
                type: Boolean,
                value: true
            }
        }
    }

    static get observers() {
        return [
            '_routePageChanged(route)'
        ]
    }

    _log(data) {
        console.log(data)
    }

    ready() {
        super.ready();
        this.BINDER.setBinder('shopHomeCats', 'route', (this.bindCallback).bind(this))
    }

    bindCallback(par, value) {
        this[par] = value
    }

    _routePageChanged(route) {
        if (route.prefix.length === 0 && route.path === '/' || route.prefix === '/' && route.path.length === 0) {
            if (!this.notInPause) {
                this.notInPause = true
                this.$.inline.classList.remove("inline-scroll")
                this.__cicleCats()
                this.$.inline.classList.add("inline-scroll")
            }
        } else {
            this.notInPause = false
        }
    }
    _renderSlotedCats(data) {
        if (data.length > 0) {
            const catItemTemplate = (items) => litHtml`${items.map((item) => {
                return litHtml`
                <slot slot="${item.name}" name="cat-${item.name}">
                </slot>`
            })}`;
            afterNextRender(this, () => {
                render(catItemTemplate(data, true), this);
                this.set('count', 0)
                this.__cicleCats()
            });
        }
    }
    __cicleCats() {
        let scrollWidth = parseInt(this.$.inline.scrollWidth)
        let length = this.categories.length
        length = (scrollWidth / (length / 2))
        if (this.count >= (scrollWidth - 1000)) {
            this.$.inline.classList.remove("inline-scroll")
            this.$.inline.scrollTo(0, 0)
            this.$.inline.classList.add("inline-scroll")
            this.count = length
        } else {
            this.$.inline.scrollTo(this.count, 0)
            this.count = this.count + length
        }
        if (!!this.notInPause) {
            let time = setTimeout(() => {
                let time2 = setTimeout(() => {
                    requestAnimationFrame((this.__cicleCats).bind(this))
                    clearTimeout(time2)
                }, 5000);
                clearTimeout(time)
            }, 5000);
        }
    }
}
customElements.define(ShopHomeCats.is, ShopHomeCats);
