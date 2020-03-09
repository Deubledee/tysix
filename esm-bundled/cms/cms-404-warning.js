define(["../src/cms-login.js"],function(_cmsLogin){"use strict";class cms404Warning extends _cmsLogin.PolymerElement{static get template(){return _cmsLogin.html`
    <style>

      :host {
        display: block;
        text-align: center;
        color: var(--app-secondary-color);
      }

      iron-icon {
        display: inline-block;
        width: 60px;
        height: 60px;
      }

      h1 {
        margin: 50px 0 50px 0;
        font-weight: 300;
      }

    </style>

    <div>
      <iron-icon icon="error"></iron-icon>
      <h1>Sorry, we couldn't find that page</h1>
    </div>
    <oaper-button>
      <a href="/">Go to the home page</a>
    </oaper-button>
`}static get is(){return"cms-404-warning"}}customElements.define(cms404Warning.is,cms404Warning)});