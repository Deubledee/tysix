import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
//import { expresso } from './tools/expresso/expresso';
import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/iron-icon/iron-icon';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-selector/iron-selector';
import '@polymer/paper-icon-button/paper-icon-button';
import '@polymer/paper-dropdown-menu/paper-dropdown-menu';
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
import './media/cms-image-item'
setPassiveTouchGestures(true);
setRootPath('/');
class cmsControler extends PolymerElement {
  static get template() {
    return html`
    <style>
        :host {
            display: var(--app-block)
        }

        app-header,
        nav[toolbar] {
            background-color: var(--app-primary-color);
        }

        .cart-btn-container,
        .sellector-list a,
        .sellector-list a.iron-selected {
            font-weight: var(--app-default-font-weight)
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

        nav {
            color: var(--app-secondary-text-color)
        }

        .sellector-list a,
        nav[toolbar] {
            color: var(--app-secondary-text-color)
        }

        nav[toolbar] {
            font-size: var(--app-tollbar-default-font-size);
            flex-basis: 130px;
        }

        paper-icon-button {
            color: var(--app-secondary-text-color);
            height: 30px;
        }

        .sellector-list {
            margin: var(--app-tollbar-sellector-list-margin)
        }

        .sellector-list a {
            position: relative;
            text-decoration: var(--app-none);
            line-height: var(--app-tollbar-sellector-list-line-height);
            top: -3px;
        }

        .cart-btn-container,
        .content-wrapper {
            display: var(--app-flex);
            position: var(--app-default-position)
        }

        .sellector-list a.iron-selected {
            color: var(--app-content-title-text-color)
        }

        .content-wrapper {
            top: var(--app-tollbar-content-wrapper-top);
            flex-direction: var(--app-flexcolumn);
            /*  max-width: var(--app-tollbar-content-wrapper-max-width);
            padding-left: var(--app-tollbar-content-wrapper-padding-left)*/
        }

        .cart-btn-container {
            flex-flow: var(--app-flexrow);
            top: var(--app-tollbar-cart-btn-top);
            width: var(--app-tollbar-cart-btn-width);
            float: var(--app-tollbar-cart-btn-float);
            height: var(--app-tollbar-cart-btn-height)
        }

        span[role] {
            color: var(--app-dropDwonMenu-icon-color)
        }

        .user-badge {
            margin-top: var(--app-tollbar-user-badge-margin-top)
        }

        cms-image-viewer.diferent {
            --main-style: {
                position: (--app-unset-position);
                margin-left: -46px
            }
        }

        .background {
            background-color: var(--app-secondary-text-color)
        }

        paper-dropdown-menu.styled {
            width: 82px;
            box-sizing: border-box;
            color: var(--app-primary-color);

            --paper-dropdown-menu-input: {
                color: #df8018
            }

            --paper-dropdown-menu-icon: {
                color: var(--app-dropDwonMenu-icon-color, red)
            }
        }

        .color {
            color: blue !important;
            /*var(-app-content-title-text-color)*/
        }

        .inline {
            display: inline-flex;
        }
    </style>

    <app-location route="{{route}}"> </app-location>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" active="{{active}}">
    </app-route>
    <app-route route="{{subroute}}" pattern="/:layer" tail="{{popOutRoute}}">
    </app-route>
    
    <div calss="topcontainer">
        <div rows>
            <nav toolbar>
                <iron-selector selected="[[page]]" attr-for-selected="name" class="sellector-list" role="navigation">
                    <div class="content-wrapper">
                        <nav class="inline">
                            <paper-icon-button icon="arrow-back" aria-label="Go back"></paper-icon-button>
                            <div>
                                <a on-click="_resetEvent" name="Preview" href="[[rootPath]]app">[[preview]]</a>
                            </div>
                        </nav>
                        <nav class="inline">
                            <paper-icon-button icon="social:pages" aria-label="content">
                            </paper-icon-button>
                            <div>
                                <a on-click="_resetEvent" name="content" href="[[rootPath]]content/">[[content]]</a>
                            </div>
                        </nav>
                        <nav class="inline">
                            <paper-icon-button icon="social:person-outline" aria-label="users">
                            </paper-icon-button>
                            <div>
                                <a on-click="_resetEvent" name="users" href="[[rootPath]]users/">[[users]]</a>
                            </div>
                        </nav>
                        <nav class="inline">
                            <paper-icon-button icon="image:photo-library" aria-label="galleries">
                            </paper-icon-button>
                            <div>
                                <a on-click="_resetEvent" name="media" id="media"
                                    href="[[rootPath]]media/">[[galleries]]</a>
                            </div>
                        </nav>
                    </div>
                </iron-selector>
                <div>
                    <div class="background">
                        <paper-dropdown-menu class="styled" label="[[language]]" value="{{lang}}">
                            <paper-tabs slot="dropdown-content" class="dropdown-content">
                                <paper-tab class="color">pt</paper-tab>
                                <paper-tab>en</paper-tab>
                            </paper-tabs>
                        </paper-dropdown-menu>
                    </div>
                    <div>
                        <paper-icon-button icon="perm-identity" aria-label\$=""></paper-icon-button>
                    </div>
                    <div class="user-badge">
                        <span> [[user.displayName]]</span> <span role> [[user.role]]</span>
                    </div>
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

        <div>
            <ul>
                <li>sera</li>
                <li>sempre</li>
                <li>a subir</li>
            </ul>
        </div>
    </div>
    <iron-pages class="flexy" selected="[[popout]]" attr-for-selected="name">

        <cms-page-cats-content name="add-category-pages" user="[[user]]" route="[[popOutRoute]]">
        </cms-page-cats-content>

        <cms-subcats-content name="add-subcategory-pages" user="[[user]]" route="[[popOutRoute]]">
        </cms-subcats-content>

        <cms-galleries-content name="add-gallery" user="[[user]]" route="[[popOutRoute]]">
        </cms-galleries-content>

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
      open: {
        type: Boolean,
        value: false
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
    if (page === 'add-gallery') {
      import('./media/cms-gallery-content').then(item => {
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