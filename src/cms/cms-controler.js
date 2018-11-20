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
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
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

        </style>
        <app-route route="{{route}}" pattern="/:admin/:item" data="{{routeData}}" tail="{{subroute}}">
        </app-route>
        <app-drawer-layout fullbleed="" narrow="{{narrow}}">
          <!-- Drawer content -->
          <app-drawer id="drawer" slot="drawer" swipe-open="[[narrow]]">
            <app-toolbar>Menu</app-toolbar>
            <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
              <a name="view1" href="[[rootPath]]admin/pages">pages</a>
              <a name="view2" href="[[rootPath]]admin/view2">View Two</a>
              <a name="view3" href="[[rootPath]]admin/view3">View Three</a>
            </iron-selector>
          </app-drawer>
          <!-- Main content -->
          <app-header-layout has-scrolling-region="">
            <app-header slot="header" condenses="" reveals="" effects="waterfall">
              <app-toolbar>
                <paper-icon-button icon="my-icons:menu" drawer-toggle=""></paper-icon-button>
                <div main-title="">My App</div>
              </app-toolbar>
            </app-header>
            <iron-pages selected="[[page]]" attr-for-selected="name" role="main">
              <cms-page-viewer name="page" categories="{{categories}}"></cms-page-viewer>
              <my-view2 name="view2"></my-view2>
              <my-view3 name="view3"></my-view3>
              <my-view404 name="view404"></my-view404>
            </iron-pages>
          </app-header-layout>
        </app-drawer-layout>
      `;
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
        notify: true,
        observer: 'log'
      },
      routeData: Object,
      subroute: Object
    };
  }
  _routePageChanged(page) {
     // Show the corresponding page according to the route.
     //
     // If no page was found in the route data, page will be an empty string.
     // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
     console.log(this.routeData, page)
    if (!page) {
      this.page = '';
    } else if (['page', 'view2', 'view3'].indexOf(page) !== -1) {
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
    switch (page) {
      case 'page':
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
