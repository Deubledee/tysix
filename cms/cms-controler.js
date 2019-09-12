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
import './tools/cms-confirm';
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
            background-color: var(--app-primary-color)
        }
        .cart-btn-container,
        .sellector-list a,
        .sellector-list a.iron-selected {
            font-weight: var(--app-default-font-weight)
        }
        :host {
            display: var(--app-block)
        }
        nav {
            display: var(--app-flex);
            flex-flow: var(--app-flexrow);
            flex-grow: var(--app-flexgrowshrink);
            color: var(--app-secondary-text-color)
        }
        .sellector-list a,
        nav[toolbar] {
            display: var(--app-block);
            color: var(--app-secondary-text-color)
        }
        nav div {
            flex-grow: var(--app-flexgrowshrink)
        }
        nav[toolbar] {
          height: 28px;
          padding: var(--app-default-padding);
          font-size: var(--app-tollbar-default-font-size);
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
          /* padding: var(--app-tollbar-sellector-list-padding); */
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
            flex-direction: var(--app-flexrow);
            max-width: var(--app-tollbar-content-wrapper-max-width);
            padding-left: var(--app-tollbar-content-wrapper-padding-left)
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
        div[rows]{
          display: flex;
          flex-direction: column
        }
        div[pages]{
          min-height: 1470px;
          height: auto;
        }
        paper-dropdown-menu.styled {
            width: 82px;
            box-sizing: border-box;
            color: var(--app-primary-color);
            --paper-dropdown-menu-input:{
              color: #df8018
            }
            --paper-dropdown-menu-icon: {
                color: var(--app-dropDwonMenu-icon-color, red)
            }
        }
        .color {
            color: blue!important;/*var(-app-content-title-text-color)*/
        }
    </style>
  <app-location route="{{route}}">
  </app-location>

  <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" active="{{active}}">
  </app-route>
  <div rows>
    <nav toolbar>
      <iron-selector selected="[[page]]" attr-for-selected="name" class="sellector-list" role="navigation">
          <div class="content-wrapper">
              <nav>
                  <paper-icon-button icon="arrow-back" aria-label="Go back"></paper-icon-button>
                  <div>
                      <a on-click="_resetEvent" name="Preview" href="[[rootPath]]app">[[preview]]</a>
                  </div>
              </nav>
              <nav>
                  <paper-icon-button icon="social:pages" aria-label="content">
                  </paper-icon-button>
                  <div>
                      <a on-click="_resetEvent" name="content" href="[[rootPath]]content/">[[content]]</a>
                  </div>
              </nav>
              <nav>
                  <paper-icon-button icon="social:person-outline" aria-label="users">
                  </paper-icon-button>
                  <div>
                      <a on-click="_resetEvent" name="users" href="[[rootPath]]users/">[[users]]</a>
                  </div>
              </nav>
              <nav>
                  <paper-icon-button icon="image:photo-library" aria-label="galleries">
                  </paper-icon-button>
                  <div>
                      <a on-click="_resetEvent" name="media" id="media" href="[[rootPath]]media/">[[galleries]]</a>
                  </div>
              </nav>
          </div>
      </iron-selector>
      <div class="cart-btn-container">
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
        <cms-user-viewer route="[[subroute]]" name="users" user="[[user]]" lang="[[lang]]" >
        </cms-user-viewer>

        <cms-content route="[[subroute]]" name="content" user="[[user]]">
        </cms-content>

        <cms-media name="media" route="[[subroute]]" user="[[user]]" lang="[[lang]]">
        </cms-media>

        <my-view404 name="view404"></my-view404>
      </iron-pages>
    </div>
    <div>
      <ul>
        <li>sera</li>
        <li>sempre</li>
        <li>a subir</li>
      </ul>
    </div>
  </div>
  <cms-confirm id="confirm" bottom2 open="{{confirm}}" type="gallery" user="[[user]]" lang="[[lang]]">
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
      '_routePageChanged(routeData, route)'
    ];
  }
  static connectedCallback() {
    console.log('aloo');
  }
  ready() {
    super.ready();
    this.addEventListener('confirm', this.openConfirm);
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
  _resetEvent() {
    this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer,
      microTask, () => {
        window.dispatchEvent(new CustomEvent('reset'))
      }
    )
  }
  openConfirm(event) {
    this.$.confirm.openConfirm(event);
    this.confirm = !this.confirm;
  }
  _routePageChanged(page, route) {
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
  }
}
customElements.define(cmsControler.is, cmsControler);