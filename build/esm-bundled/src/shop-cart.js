import{PolymerElement,html}from"./shop-app.js";class ShopCart extends PolymerElement{static get template(){return html`
    <style include="shop-common-styles shop-button shop-form-styles">

      .list {
        margin: 40px 0;
      }

      .checkout-box {
        font-weight: bold;
        text-align: right;
        margin-right: 10px;
      }

      .subtotal {
        margin: 0 64px 0 24px;
      }

      @media (max-width: 767px) {

        .subtotal {
          margin: 0 0 0 24px;
        }

      }

    </style>

    <div class="main-frame">
      <div class="subsection" visible$="[[!_hasItems]]">
        <p class="empty-cart">Your <iron-icon icon="shopping-cart"></iron-icon> is empty.</p>
      </div>
      <div class="subsection" visible$="[[_hasItems]]">
        <header>
          <h1>Your Cart</h1>
          <span>([[_getPluralizedQuantity(cart.length)]])</span>
        </header>
        <div class="list">
          <dom-repeat items="[[cart]]" as="entry">
            <template>
              <shop-cart-item entry="[[entry]]"></shop-cart-item>
            </template>
          </dom-repeat>
        </div>
        <div class="checkout-box">
          Total: <span class="subtotal">[[_formatTotal(total)]]</span>
          <shop-button responsive>
            <a href="/checkout">Checkout</a>
          </shop-button>
        </div>
      </div>
    </div>
    `}static get is(){return"shop-cart"}static get properties(){return{total:Number,cart:Array,visible:{type:Boolean,observer:"_visibleChanged"},_hasItems:{type:Boolean,computed:"_computeHasItem(cart.length)"}}}_formatTotal(total){return isNaN(total)?"":"$"+total.toFixed(2)}_computeHasItem(cartLength){return 0<cartLength}_getPluralizedQuantity(quantity){return quantity+" "+(1===quantity?"item":"items")}_visibleChanged(visible){if(visible){this.dispatchEvent(new CustomEvent("change-section",{bubbles:!0,composed:!0,detail:{title:"Your cart"}}))}}}customElements.define(ShopCart.is,ShopCart);