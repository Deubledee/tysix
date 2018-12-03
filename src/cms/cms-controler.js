import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings.js';
import '@polymer/app-layout/app-drawer/app-drawer.js';
import '@polymer/app-layout/app-drawer-layout/app-drawer-layout.js';
import '@polymer/app-layout/app-header/app-header.js';
import '@polymer/app-layout/app-header-layout/app-header-layout.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js';
import '@polymer/app-layout/app-toolbar/app-toolbar.js';
import '@polymer/app-route/app-location.js';
import '@polymer/app-route/app-route.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-icon-button/paper-icon-button-light.js';
import '@polymer/paper-button/paper-button.js';
import './my-icons.js';

// Gesture events like tap and track generated from touch will not be
// preventable, allowing for better scrolling performance.
setPassiveTouchGestures(true);

// Set Polymer's root path to the same value we passed to our service worker
// in `index.html`.
setRootPath(MyAppGlobals.rootPath);

class cmsControler extends PolymerElement {
  static get template() {
    return html`
        <style>
          :host {
            --app-primary-color: #4285f4;
            --app-secondary-color: black;
            display: block;
          }
          app-drawer-layout:not([narrow]) [drawer-toggle] {
            display: none;
          }
          app-header {
            color: #fff;
            background-color: var(--app-primary-color);
          }
          app-header paper-icon-button {
            --paper-icon-button-ink-color: white;
          }
          .drawer-list {
            margin: 0 20px;
          }
          .drawer-list a {
            display: block;
            padding: 0 16px;
            text-decoration: none;
            color: var(--app-secondary-color);
            line-height: 40px;
          }
          .drawer-list a.iron-selected {
            color: black;
            font-weight: bold;
          }
          app-drawer {
            background-color: grey
          }
          nav { 
            display: flex;
            flex-flow: row;
            flex-basis: 100px;
          }

          nav div {
            flex-basis: 100px;
          }
        </style>
        <app-route route="{{route}}" pattern="/:admin/:pages" data="{{routeData}}" tail="{{subroute}}">
        </app-route>
        <app-drawer-layout fullbleed="" narrow="{{narrow}}">
          <!-- Drawer content -->
          <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
            <app-toolbar>Dashboard</app-toolbar>
            <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
              <nav>
                <div>
                 <a name="pages" href="[[rootPath]]admin/pages">Pages</a>
                </div>                
                <paper-icon-button icon="arrow-back" aria-label="Go back"></paper-icon-button>
              </nav>
              <nav>              
                <div>
                  <a name="view2" href="[[rootPath]]admin/view2">View Two</a>
                </div>  
                <paper-icon-button icon="arrow-back" aria-label="Go back"></paper-icon-button>              
              </nav>
              <nav>
               <div>
                <a name="view3" href="[[rootPath]]admin/view3">View Three</a>
              </div>               
              <paper-icon-button icon="arrow-back" aria-label="Go back"></paper-icon-button> 
              </nav>              
            </iron-selector>
          </app-drawer>
          <!-- Main content -->
          <app-header-layout>
            <app-header slot="header" condenses="" reveals="" effects="waterfall">
            <app-toolbar>            
            <div class="left-bar-item">
              <a class="back-btn" href="/[[categoryPage]]/[[categoryName]]" tabindex="-1">
                <paper-icon-button icon="arrow-back" aria-label="Go back"></paper-icon-button>
              </a>
            </div>
            <div class="cart-btn-container">
              <!--a href="/cart" tabindex="-1">
                <paper-icon-button icon="shopping-cart"></paper-icon-button>
                          </a>
             <div class="cart-badge" aria-hidden="true" hidden\$="[[!numItems]]">[[numItems]]</div-->         
            </div>
          </app-toolbar>
            </app-header>
            <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
              <cms-page-viewer name="pages" categories="{{categories}}"></cms-page-viewer>
              <my-view2 name="view2"></my-view2>
              <my-view3 name="view3"></my-view3>
              <my-view404 name="view404"></my-view404>
            </iron-pages>
          </app-header-layout>
        </app-drawer-layout>`;
    }
  
  static get is() { return 'cms-controler'; }

  static get properties() {
    return {
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      categories: {
        type: Array,
        notify: true
      },
      routeData: Object,
      subroute: Object
    };
  }

  static get observers() {
    return [
      '_routePageChanged(routeData.pages)'
    ];
  }

  _routePageChanged(page) {    
   // console.log(this.routeData, page)
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = '';
    } else if (['pages', 'view2', 'view3'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }
    // Close a non-persistent drawer when the page & route are changed.
    if (!this.$.drawer.persistent) {
      this.$.drawer.close();
    }
  }
  _pageChanged(page) {
    // Import the page component on demand.
    //
    // Note: `polymer build` doesn't like string concatenation in the import
    // statement, so break it up.    
   // console.log(this.routeData, page)
    switch (page) {
      case 'pages':
        import('./cms-page-viewer.js');
        break;
      case 'view2':
        import('./my-view2.js');
        break;
      case 'view3':
        import('./my-view3.js');
        break;
      case 'view404':
        import('../shop-404-warning.js');
        break;
    }
  }

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

}

customElements.define(cmsControler.is, cmsControler);
