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
import '@polymer/paper-input/paper-textarea.js'
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/iron-icons/av-icons.js';
import '@polymer/iron-icons/image-icons.js';
import '@polymer/iron-icons/social-icons.js'
import '@polymer/paper-spinner/paper-spinner.js';
import './cms-confirm.js';
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

          nav[toolbar] {
            display: block;
            color: #fff;
            height: 41px;
            background-color: #3f4756;
            padding: 8px;
            font-size: 13px;
          }

          app-header-layout{
            left: -44px!mportant;        
          }

          app-header {
            color: #fff;
            background-color: var(--app-primary-color);
            left: 0px!mportant;
            right: 0px!mportant;
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
            position: relative;
            top: -18px;
            display: flex;
            flex-direction: row;
            max-width: 475px;
            padding-left: 15px
          }
          
          .cart-btn-container {
            position: relative;
            left: -94px;
            top: -73px;
            width: 40px;
            float: right;
          }
          
          paper-spinner{
            left: 45%;
            top: 300px;
          }


          cms-image-viewer.diferent{
            --main-style:{
              position: unset;
              margin-left: -46px;
            }
          }

          .user-badge {

          }
        </style>

        <!--
        app-location and app-route elements provide the state of the URL for the app.
          -->

      <app-location route="{{route}}">
      </app-location>

      <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}">
      </app-route>
  
      <iron-media-query query="max-width: 767px" query-matches="{{smallScreen}}">
      </iron-media-query>

      <shop-category-data categories="{{categories}}" lang="{{lang}}">
      </shop-category-data>

      <app-header-layout>
        <app-header role="navigation" condenses="" reveals="" effects="waterfall">
          <nav toolbar> 
            <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation"> 
              <div class="content-wrapper"> 
                <nav>      
                  <paper-icon-button icon="arrow-back" aria-label="Go back"></paper-icon-button>   
                  <div>
                    <a name="Preview" href="[[rootPath]]app">Preview</a>
                  </div>                
                </nav> 
                <nav>      
                  <paper-icon-button icon="social:person-outline" aria-label="content">
                  </paper-icon-button>    
                  <div>
                    <a name="content" href="[[rootPath]]content/search">Content</a>
                  </div>                
                </nav>  
                <nav>      
                  <paper-icon-button icon="social:person-outline" aria-label="users">
                  </paper-icon-button>    
                  <div>
                    <a name="users" href="[[rootPath]]users">Users</a>
                  </div>                
                </nav> 
                <nav>      
                  <paper-icon-button icon="image:photo-library" aria-label="galleries">
                  </paper-icon-button>    
                  <div>
                    <a name="galleries" href="[[rootPath]]galleries">Galleries</a>
                  </div>                
                </nav>    
              </div>                  
            </iron-selector>           
            <div class="cart-btn-container">   
              <div> 
                <paper-icon-button on-click="" icon="perm-identity" aria-label\$=""></paper-icon-button> 
              </div> 
              <div class="user-badge">
                <span>  [[user.email]] </span>
              </div>  
            </div>         
          </nav>
        </app-header>

        <iron-pages selected="[[page]]" attr-for-selected="name">
          <cms-user-viewer route="[[subroute]]" name="users">
              <paper-spinner id="spinner" active></paper-spinner> 
          </cms-user-viewer>
          <cms-content route="[[subroute]]" name="content" user="[[user]]">
              <paper-spinner id="spinner" active></paper-spinner> 
          </cms-content>
          <cms-image-viewer route="[[subroute]]" id="viewer" name="galleries" openMain="[[openMain]]" open="[[open]]" class="diferent">
              <paper-spinner id="spinner" active></paper-spinner> 
          </cms-image-viewer>
          <shop-app  name="app" route="[[route]]" categories="{{categories}}" DBW="[[DBW]]" lang=[[lang]]> </shop-app>
          <my-view404 name="view404"></my-view404>
        </iron-pages>    
      </app-header-layout><!--/app-drawer-layout>-->

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
      '_routePageChanged(routeData.page, route)'
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

  _routePageChanged(page, rtr) {
    if (!page) {
      this.page = '';
    } else if (['app', 'content', 'users', 'home', 'galleries'].indexOf(page) !== -1) {
      this.page = page;
    } else {
      this.page = 'view404';
    }
  }
  _pageChanged(page) {
    switch (page) {
      case 'app':
        import('../shop-app');
        break;
      case 'home':
        import('./cms-home-viewer.js');
        break;
      case 'content':
        import('./cms-content.js');
        break;
      case 'users':
        import('./cms-user-viewer.js');
        break;
      case 'galleries':
        import('./cms-image-viewer.js').then(() => {
          this.$.viewer.open = true
        });
        break;
      case 'view404':
        import('../shop-404-warning.js');
        break;
      default:
        break
    }
  }
}

customElements.define(cmsControler.is, cmsControler);
