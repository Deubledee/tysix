import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-ajax/iron-ajax.js';
import '@polymer/font-roboto/roboto.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-layout/demo/sample-content.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
class cmsControler extends PolymerElement {
  static get template() {
    return html`
    <custom-style>
    <style is="custom-style">

      html {
        --app-drawer-width: 350px;
      }

      body {
        margin: 0;
        font-family: 'Roboto', 'Noto', sans-serif;
        background-color: #eee;
      }

      app-toolbar {
        background-color: #4285f4;
        color: #fff;
      }

      app-drawer-layout:not([narrow]) [drawer-toggle] {
        display: none;
      }

      app-drawer {
        --app-drawer-content-container: {
          background-color: #B0BEC5;
        }
      }

    </style>
  </custom-style>

</head>
<body>

  <app-drawer-layout>

    <app-drawer slot="drawer"></app-drawer>

    <app-toolbar>
      <paper-icon-button icon="menu" drawer-toggle></paper-icon-button>
    </app-toolbar>

    <sample-content size="100"></sample-content>

  </app-drawer-layout>

</body>
</html>
  }
  static get is() { return 'cms-controler'; }

  static get properties() { 
    return {

  }}

  fsd() {
    let url = 'data/categories.json', json = [], str = ''
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', onLoad.bind(this))
    xhr.addEventListener('error', onError);
    xhr.open('GET', url);
    xhr.send();
    function onLoad(e) {
      json.push(JSON.parse(e.target.responseText))
      str = json[0]
      this.categories = str
      // console.log(str, this.categories)
    }
    function onError(e) {
      console.log(e)
    }
  }
  handleResponse(res){

    console.log(res)
  }

}

customElements.define(cmsControler.is, cmsControler);
