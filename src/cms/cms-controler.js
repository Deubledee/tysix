import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';


class cmsControler extends PolymerElement {
  static get template() {
    return html`
    <style include="shop-common-styles shop-button shop-form-styles">
      div[main-frame]{

        
      }
      @media (max-width: 767px) {

        .subtotal {
          margin: 0 0 0 24px;
        }

      }

    </style>
    <iron-ajax
        auto
        url="../../data/categories.json"
        handle-as="json"
        on-response="handleResponse"
        debounce-duration="300">
    </iron-ajax>
    <div main-frame>

    </div>
    `;
  }
  static get is() { return 'cms-controler'; }

  static get properties() { 
    return {

  }}

  handleResponse(res){

    console.log(res)
  }

}

customElements.define(cmsControler.is, cmsControler);
