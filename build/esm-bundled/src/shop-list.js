import{PolymerElement,html,Debouncer,microTask}from"./shop-app.js";class ShopListItem extends PolymerElement{static get template(){return html`
    <style>

      :host {
        @apply --layout-vertical;
        @apply --layout-center-justified;
        text-align: center;
        margin: 0 48px;
      }

      shop-image {
        margin: 32px 0 16px;
      }

      shop-image::before {
        content: "";
        display: block;
        padding-top: 100%;
      }

      .title {
        color: var(--app-primary-color);
        font-weight: bold;
      }

      .price {
        color: var(--app-secondary-color);
      }

      @media (max-width: 767px) {
        :host {
          margin: 0 12px;
        }
      }

    </style>

    <shop-image src="[[item.image]]" alt="[[item.title]]"></shop-image>
    <div class="title">[[item.title]]</div>
    <span class="price">[[_formatPrice(item.price)]]</span>
`}static get is(){return"shop-list-item"}static get properties(){return{item:Object}}_formatPrice(price){return price?"$"+price.toFixed(2):""}}customElements.define(ShopListItem.is,ShopListItem);class ShopList extends PolymerElement{static get template(){return html`
    <style include="shop-common-styles">

      .hero-image {
        position: relative;
        height: 320px;
        overflow: hidden;
        margin-bottom: 32px;
      }

      .hero-image {
        --shop-image-img: {
          position: absolute;
          top: 0;
          bottom: 0;
          left: -9999px;
          right: -9999px;
          max-width: none;
        };
      }

      .grid {
        @apply --layout-horizontal;
        @apply --layout-wrap;
        @apply --layout-justified;
        margin: 0 10px 32px 10px;
        padding: 0;
        list-style: none;
      }

      .grid li {
        -webkit-flex: 1 1;
        flex: 1 1;
        -webkit-flex-basis: 33%;
        flex-basis: 33%;
        max-width: 33%;
      }

      .grid a {
        display:block;
        text-decoration: none;
      }

      @media (max-width: 767px) {
        .hero-image {
          display: none;
        }

        .grid  li {
          -webkit-flex-basis: 50%;
          flex-basis: 50%;
          max-width: 50%;
        }
      }

    </style>

    <!--
      app-route provides the name of the category.
    -->
    <app-route
        route="[[route]]"
        pattern="/:category"
        data="{{routeData}}"></app-route>

    <!--
      shop-category-data provides the category data for a given category name.
    -->
    <shop-category-data
        id="categoryData"
        category-name="[[routeData.category]]"
        category="{{category}}"
        failure="{{failure}}"></shop-category-data>

    <shop-image
        alt="[[category.title]]"
        src="[[category.image]]"
        placeholder-img="[[category.placeholder]]" class="hero-image"></shop-image>

    <header>
      <h1>[[category.title]]</h1>
      <span>[[_getPluralizedQuantity(category.items.length)]]</span>
    </header>

    <ul class="grid" hidden$="[[failure]]">
      <dom-repeat items="[[_getListItems(category.items)]]" initial-count="4">
        <template>
          <li>
            <a href$="[[_getItemHref(item)]]"><shop-list-item item="[[item]]"></shop-list-item></a>
          </li>
        </template>
      </dom-repeat>
    </ul>

    <!--
      shop-network-warning shows a warning message when the items can't be rendered due
      to network conditions.
    -->
    <shop-network-warning
        hidden$="[[!failure]]"
        offline="[[offline]]"
        on-try-reconnect="_tryReconnect"></shop-network-warning>

  </template>
  `}static get is(){return"shop-list"}static get properties(){return{category:Object,route:Object,routeData:Object,visible:{type:Boolean,value:!1},offline:{type:Boolean,observer:"_offlineChanged"},failure:Boolean}}static get observers(){return["_categoryChanged(category, visible)"]}connectedCallback(){super.connectedCallback();this.isAttached=!0}disconnectedCallback(){super.disconnectedCallback();this.isAttached=!1}_getListItems(items){return items||[{},{},{},{},{},{},{},{},{},{}]}_getItemHref(item){return item.name?["/detail",this.category.name,item.name].join("/"):null}_getPluralizedQuantity(quantity){if(!quantity){return""}let pluralizedQ=1===quantity?"item":"items";return"("+quantity+" "+pluralizedQ+")"}_categoryChanged(category,visible){if(!visible){return}this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{if(category){this.dispatchEvent(new CustomEvent("change-section",{bubbles:!0,composed:!0,detail:{category:category.name,title:category.title,image:this.baseURI+category.image}}))}else{this.dispatchEvent(new CustomEvent("show-invalid-url-warning",{bubbles:!0,composed:!0}))}})}_tryReconnect(){this.$.categoryData.refresh()}_offlineChanged(offline){if(!offline&&this.isAttached){this._tryReconnect()}}}customElements.define(ShopList.is,ShopList);