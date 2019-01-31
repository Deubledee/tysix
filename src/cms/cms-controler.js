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
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import '@polymer/paper-icon-button/paper-icon-button.js';
import '@polymer/paper-icon-button/paper-icon-button-light.js';
import '@polymer/paper-dialog/paper-dialog.js';
import '@polymer/paper-dialog-behavior/paper-dialog-behavior.js'
import '@polymer/paper-dialog-scrollable/paper-dialog-scrollable.js'
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/iron-icons/av-icons.js';
import '@polymer/iron-icons/image-icons.js';
import '@polymer/iron-icons/social-icons.js'
import './cms-confirm.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
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

          nav { 
            display: flex;
            flex-flow: row;
            color: #fff
          }

          nav div {
            flex-basis: 100px;
          }

          nav div[dashboard] {
            flex-basis: 100px;
            margin-top: 9px;
            font-size: medium;
          }

          app-toolbar{
            color: #fff;
            height: 41px;
            background-color: #3f4756;
            padding: 8px;
            font-size: 13px;
          }

          app-drawer-layout:not([narrow]) [drawer-toggle] {
            display: none;
          }

          app-header {
            color: #fff;
            background-color: var(--app-primary-color);
            left: 160px!important;
          }
          
          paper-icon-button {
            color: white;
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
            color: #fff;
            font-weight: bold
          }
          .drawer-list a.iron-selected {
            color: black;
            font-weight: bold;
          }
          app-drawer.diferent {
            background-color: grey;
            width: 160px;
            --app-drawer-content-container:{
              background-color: #3f4756;
            }
          }
          .content-wrapper{
            padding-left: 15px
          }
          
          app-header-layout{
        ￼     left: -44px!mportant;        
          }
          .cart-btn-container {
              position: relative;
              width: 40px;
              left: 80%;
          }
          cms-image-viewer.diferent{
            --main-style:{
              position: unset;
              margin-left: -46px;
            }
          }
        </style>
        <app-route route="{{route}}" pattern="/:admin/:pages" data="{{routeData}}" tail="{{subroute}}">
        </app-route>
        <app-drawer-layout fullbleed="" narrow="{{narrow}}">
          <!-- Drawer content -->
          <app-drawer id="drawer" class="diferent" slot="drawer" swipe-open="[[narrow]]">
            <app-toolbar>
            <nav>
              <paper-icon-button icon="dashboard" aria-label="dashboard"> dashboard</paper-icon-button>
              <div dashboard>
                Dashboard
             </div>
            </nav>
            </app-toolbar>
            <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">     
            <div class="content-wrapper">       
              <nav>
                <paper-icon-button icon="av:library-books" aria-label="pages"></paper-icon-button>
                <div>
                 <a name="pages" href="[[rootPath]]admin/pages">Pages</a>
                </div>                
              </nav>
              <nav>
                <paper-icon-button icon="av:art-track" aria-label="Articles"></paper-icon-button>
                <div>
                 <a name="Articles" href="[[rootPath]]admin/articles">Articles</a>
                </div>                
              </nav>
              <nav>      
                <paper-icon-button icon="social:person-outline" aria-label="users"></paper-icon-button>    
                <div>
                  <a name="users" href="[[rootPath]]admin/users">Users</a>
                </div>                
              </nav> 
              <nav>      
                <paper-icon-button icon="image:photo-library" aria-label="galleries"></paper-icon-button>    
                <div>
                  <a name="galleries" href="[[rootPath]]admin/galleries">Galleries</a>
                </div>                
              </nav>    
            </div>                  
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
                <paper-icon-button on-click="" icon="perm-identity" aria-label\$=""></paper-icon-button> 
                <div class="user-badge">[[user.email]]</div>      
              </div>         
          </app-toolbar>
            </app-header>
            <iron-pages selected="[[page]]" attr-for-selected="name">
              <cms-page-viewer name="pages" lang=[[lang]]></cms-page-viewer>
              <cms-user-viewer name="users"></cms-user-viewer>
              <cms-articles-viewer name="articles" lang=[[lang]]></cms-articles-viewer>
              <cms-image-viewer id="viewer" name="galleries" openMain="[[openMain]]" open="[[open]]" class="diferent"></cms-image-viewer>
              <my-view404 name="view404"></my-view404>
            </iron-pages>
          </app-header-layout>
        </app-drawer-layout>
        <cms-confirm id="confirm" bottom2 open="{{confirm}}" type="gallery"> 
        </cms-confirm>
        
        `;
  }

  static get is() { return 'cms-controler'; }

  static get properties() {
    return {
      user: {
        type: Object,
        notify: true
      },
      lang: {
        type: String,
        notify: true
        // value: lang
      },
      openMain: {
        type: Boolean,
        notify: true,
        //value: true,
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      open: {
        type: Boolean,
        value: false
      },
      categories: {
        type: Array,
        notify: true
      },
      confirm: {
        type: Boolean,
        notify: true,
        value: false
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

  ready() {
    super.ready()
    this.addEventListener('confirm', this.openConfirm)
  }

  openConfirm(event) {
    //console.log(event)
    this.$.confirm.openConfirm({ name: event.detail.name })
    this.$.confirm.method = event.detail.method
    this.confirm = !this.confirm

  }

  _routePageChanged(page) {
    // console.log(this.routeData, page)
    // Show the corresponding page according to the route.
    //
    // If no page was found in the route data, page will be an empty string.
    // Show 'view1' in that case. And if the page doesn't exist, show 'view404'.
    if (!page) {
      this.page = '';
    } else if (['pages', 'users', 'home', 'articles', 'galleries'].indexOf(page) !== -1) {
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
    switch (page) {
      case 'home':
        import('./cms-home-viewer.js');
        break;
      case 'pages':
        import('./cms-page-viewer.js');
        break;
      case 'users':
        import('./cms-user-viewer.js');
        break;
      case 'articles':
        import('./cms-articles-viewer.js');
        break;
      case 'galleries':
        import('./cms-image-viewer.js').then(() => {
          this.$.viewer.open = true
        });
        break;
      case 'view404':
        import('../shop-404-warning.js');
        break;
    }
  }
}

customElements.define(cmsControler.is, cmsControler);
