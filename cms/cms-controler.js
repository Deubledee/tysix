import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-selector/iron-selector';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-tabs/paper-tabs';
import '@polymer/paper-tabs/paper-tab';
import '@polymer/paper-button/paper-button';
import '@polymer/iron-icons/iron-icons';
import '@polymer/iron-icons/editor-icons';
import '@polymer/iron-icons/hardware-icons';
import '@polymer/iron-icons/av-icons';
import '@polymer/iron-icons/image-icons';
import '@polymer/iron-icons/social-icons';
import '@polymer/iron-icons/maps-icons';
import './styles/cms-common-styles_v2';
import './styles/cms-common-styles';
import './elements/cms-sidebar-item'
import './elements/cms-langs-menu'
import { cmslangsLib } from './tools/cms-save-lib'
setPassiveTouchGestures(true);
setRootPath('/');

class cmsControler extends cmslangsLib(PolymerElement) {
  static get template() {
    return html`
    <style>
        :host {
            display: var(--app-block)
          }
          
          nav[toolbar] {
            background-color: #082138;
          }
          
          .sellector-list a{
            font-weight: 400;
            font-size: larger;
            letter-spacing: 0px;
          }
          
          .topcontainer,
            div[rows] {
            display: flex;
          }
          
          div[rows] {
            flex-direction: row;
          }
          
          .topcontainer {
            flex-direction: column
          }
          
          div[pages] {
            height: auto;
            flex: 1;
          }
          
          a,
            nav[toolbar] {
            color: var(--app-item-backgound-color)
          }
          
          nav[toolbar] {
            font-size: var(--app-tollbar-default-font-size);
            flex-basis: 230px;
            height: 100vh;
          }
          
           a {
            position: relative;
            text-decoration: var(--app-none);
            line-height: var(--app-tollbar-sellector-list-line-height);
            top: -3px;
          }
          
          a.{
            color: var(--app-content-title-text-color)
          }
          
          span[role] {
            color: var(--app-dropDwonMenu-icon-color)
          }          
          
          paper-icon-button {
            height: 30px;
            float: right;
          }       

          div[ty6] {
            box-sizing: border-box;
            width: 99%;
            padding: 2px;
            padding-left: 15px;
            max-height: 50px;
          }
          
          div[ty6] h1 {
            font-size: large;
            margin-block-start: 4px;
            margin-block-end: 4px;
          }
          
          div[ty6] div {
            box-sizing: border-box;
            height: 24px;
            width: 35px;
            border-right: 1px solid #3d5058;
            padding-left: 8px;
          }

      </style>

      <app-location route="{{route}}"> </app-location>
      <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" active="{{active}}">
      </app-route>
      <app-route route="{{subroute}}" pattern="/:layer" tail="{{popOutRoute}}">
      </app-route>
      <div>
          <div rows>
              <nav toolbar>
                  <div class="content-wrapper">

                      <nav class="slight">
                          <div ty6>
                              <h1>Ty6</h1>
                          </div>
                      </nav>
                      <nav>
                          <div ty6>
                            <cms-langs-menu langs="[[langsArray]]" lang="{{lang}}">
                            </cms-langs-menu>
                          </div>
                      </nav>
                      <dom-repeat repeat items="[[pageArray]]" as="page">
                        <template>  
                          <cms-sidebar-item content="[[page]]" route="[[subroute]]" route="[[route]]">
                          </cms-sidebar-item>
                        </template>                            
                      </dom-repeat>                      
                      <nav id="login" class="">   
                        <div>
                            <div>
                                <span> [[user.displayName]]</span> <span role> [[user.role]]</span>
                            </div>
                            <div>
                                <paper-icon-button icon="perm-identity" aria-label\$=""></paper-icon-button>
                            </div>
                            <div>
                                <paper-button icon="perm-identity" aria-label\$="logout" on-click="_logout">
                                    logout
                                </paper-button>
                            </div>
                        </div>
                      </nav>

                  </div>
              </nav>
              <div pages>
                  <iron-pages selected="[[page]]" attr-for-selected="name">
                      <article name="cmshome">
                          <h1>
                              <b>Cms Home</b>
                          </h1>
                      </article>
                      <cms-user-viewer route="[[subroute]]" name="users" user="[[user]]" lang="[[lang]]">
                      </cms-user-viewer>

                      <cms-content route="[[subroute]]" name="content" user="[[user]]">
                      </cms-content>

                      <cms-media name="media" route="[[subroute]]" user="[[user]]" lang="[[lang]]">
                      </cms-media>

                      <my-view404 name="view404"></my-view404>
                  </iron-pages>
              </div>
          </div>
      </div>
      <iron-pages class="flexy" selected="[[popout]]" attr-for-selected="name">

          <cms-page-cats-content name="add-category-pages" user="[[user]]" route="[[popOutRoute]]">
          </cms-page-cats-content>

          <cms-subcats-content name="add-subcategory-pages" user="[[user]]" route="[[popOutRoute]]">
          </cms-subcats-content>

          <cms-article-content name="add-articles" user="[[user]]" route="[[popOutRoute]]">
          </cms-article-content>

          <cms-images-content name="add-images" user="[[user]]" route="[[popOutRoute]]">
          </cms-images-content>

      </iron-pages>

      <iron-pages class="flexy" selected="[[confirm]]" attr-for-selected="name">

          <cms-confirm name="confirm" id="confirm" type="gallery" user="[[user]]" lang="[[lang]]">
          </cms-confirm>

      </iron-pages>

        `;
  }
  static get is() { return 'cms-controler'; }
  static get properties() {
    return {
      user: {
        type: Object,
        notify: true
      },
      translator: {
        type: Object,
        notify: true,
        value: function () {
          return MyAppGlobals[window.cms]//MyAppGlobals.translator
        }
      },
      stylesSet: {
        type: Boolean,
        notify: true,
        value: false,
      },
      lang: {
        type: String,
        notify: true,
        observer: '__changeLang'
      },
      langsArray: {
        type: Array,
        notify: true
      },
      pageArray: {
        type: Array,
        notify: true,
        value: function () {
          return [{
            title: 'Content',
            description: 'pages sub-categories articles',
            pages: [{
              url: 'content/pages/',
              views: ['pages'],
              iconString: 'av:library-books',
              title: 'pages & categories'
            },
            {
              url: 'content/articles/',
              views: ['articles'],
              iconString: 'av:library-books',
              title: 'articles'
            }]
          },
          {
            title: 'Media',
            description: 'images videos',
            pages: [{
              url: 'media/galleries',
              views: ['galleries', 'view-images'],
              iconString: 'av:art-track',
              title: 'galleries & images'
            },
            {
              url: 'media/playlists',
              views: ['playlists', 'view-videos'],
              iconString: 'av:art-track',
              title: 'playlists & videos'
            }]
          },
          {
            title: 'Users',
            description: 'users groups permissions',
            pages: [{
              url: 'users/accounts/',
              views: ['accounts'],
              iconString: 'perm-identity',
              title: 'users & groups'
            },
            {
              url: 'us[ers/login/',
              views: ['login'],
              iconString: 'perm-identity',
              title: 'login & logout'
            }]
          },
          {
            title: 'Preview',
            description: 'preview the app',
            views: [],
            pages: []
          }]
        }
      },
      langs: {
        type: Object,
        notify: true,
        value: {},
        observer: '_setLang'
      },
      openMain: {
        type: Boolean,
        notify: true,
      },
      popout: {
        type: String,
        observer: '_pageChanged'
      },
      page: {
        type: String,
        observer: '_pageChanged'
      },
      confirm: {
        type: String,
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
      '_routePageChanged(routeData, route)',
      '_routePopoutChanged(popOutRoute)'
    ];
  }
  connectedCallback() {
    super.connectedCallback();
    /* this._observer = new FlattenedNodesObserver(this, (info) => {
         this.info = info;
     });*/
  }
  disconnectedCallback() {
    super.disconnectedCallback();
    //this._observer.disconnect();
  }
  ready() {
    super.ready();
    this.addEventListener('confirm', this.openConfirm);
    this.addEventListener('closepopout', this._closeConfirm);
    this.translator.target('cms-controler', 'setLangObject', (this._setLObj).bind(this))
    this.translator.target('cms-controler', 'changeLang', (this.__setLang).bind(this), false)
    this.translator.shoot('cms-controler', 'setLangObject')
    this.getLangs().then(querySnapshot => {
      this.langsArray = querySnapshot["west-europe"]
    })

  }
  _setLObj(res, querySnapshot) {
    if ('data' in querySnapshot) {
      let langs = querySnapshot.data()
      res.call(this, langs)
    };
  }
  __setLang(res, lang) {
    this.lang = lang
    res.call(this);
  }
  __changeLang() {
    this.translator.shoot(undefined, 'changeLang', this.lang)
    window.localStorage.setItem('lang', this.lang)
  }
  _setLang() {
    let lang = window.localStorage.getItem('lang');
    if (Boolean(lang) === true) {
      if (lang.split('').length > 0) {
        this.set('lang', lang);
      }
    }
    else {
      this.set('lang', 'en');
    }
  }
  _logout() {
    this.translator.logoutFire()
    window.location.reload()
  }
  openConfirm(event) {
    this.confirm = 'confirm';
    if (!this.$.confirm.openConfirm) {
      setTimeout(() => {
        this.$.confirm.openConfirm(event);
      }, 500);
    } else {
      this.$.confirm.openConfirm(event);
    }
  }
  _closeConfirm() {
    this.confirm = '';
  }

  _routePopoutChanged(popOutRoute) {
    if (['/add-category-pages', '/edit-category-pages'].indexOf(popOutRoute.path) !== -1) {
      this.popout = 'add-category-pages';
    } else
      if (['/add-subcategory-pages', '/edit-subcategory-pages'].indexOf(popOutRoute.path) !== -1) {
        this.popout = 'add-subcategory-pages'
      } else
        if (['/add-gallery', '/edit-gallery'].indexOf(popOutRoute.path) !== -1) {
          this.popout = 'add-gallery'
        } else
          if (['/add-images', '/edit-images'].indexOf(popOutRoute.path) !== -1) {
            this.popout = 'add-images'
          } else
            if (['/add-articles', '/edit-articles'].indexOf(popOutRoute.path) !== -1) {
              this.popout = 'add-articles'
            } else {
              this.popout = ''
            }
  }
  _routePageChanged(page) {
    if (this.page !== page.page && page.page == page.page) {
      if (!page.page) {
        this.page = 'cmshome';
      }
      else if (['app', 'content', 'users', 'cmshome', 'media'].indexOf(page.page) !== -1) {
        this.page = page.page;
      }
      else {
        // this.page = 'view404';
      }
    }
  }
  _resetEvent() {
    this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer,
      microTask, () => {
        window.dispatchEvent(new CustomEvent('reset'))
      }
    )
  }
  _pageChanged(page) {
    if (page === 'cmshome') {
      /*- import('./cms-home-viewer');
       return;*/
    }
    if (page === 'content') {
      import('./cms-content');
      return;
    }
    if (page === 'users') {
      import('./cms-user-viewer');
      return;
    }
    if (page === 'media') {
      import('./cms-media')
      return;
    }
    if (page === 'view404') {
      import('./cms-404-warning');
      return;
    }
    if (page === 'add-category-pages') {
      import('./pages/cms-page-cats-content').then(item => {
      });
      return;
    }
    if (page === 'add-subcategory-pages') {
      import('./sub-categories/cms-subcats-content').then(item => {
      });
      return;
    }
    if (page === 'add-articles') {
      import('./articles/cms-article-content').then(item => {
      });
      return;
    }
    if (page === 'add-images') {
      import('./media/cms-images-content').then(item => {
      });
      return;
    }
    if (page === 'confirm') {
      import('./tools/cms-confirm').then(item => {
      });
      return;
    }
  }
}
customElements.define(cmsControler.is, cmsControler);
