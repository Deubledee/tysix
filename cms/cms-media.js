import { cmsTopPageTemplate } from './templates/cms-top-page-template';
import { html } from '@polymer/polymer/polymer-element.js';
class cmsMedia extends cmsTopPageTemplate {
  static get topPages() {
    return html`
      <section>
        <a  on-click="_resetEvent" href="[[rootPath]]media/search">
          <paper-button class="button" name="search" aria-label="images search">
                  [[Search]]
              <iron-icon icon="icons:search" aria-label="images search">
              </iron-icon>
          </paper-button>
        </a> 
      </section>
      <section>
        <a  on-click="_resetEvent" href="[[rootPath]]media/galleries">
          <paper-button class="button" name="Images galleries"" aria-label="Images galleries"">
                  [[Images]]
              <iron-icon icon="av:library-books" aria-label="Images galleries">
              </iron-icon>
          </paper-button>
        </a> 
      </section>
      <section>
        <a on-click="_resetEvent"  href="[[rootPath]]media/playlists">
          <paper-button  class="button" name="Videos playlists" aria-label="Videos playlists"> 
                  [[Videos]]
              <iron-icon icon="av:art-track" aria-label="Videos playlists">
              </iron-icon> 
          </paper-button>      
        </a>
      </section>`
  }
  static get viewPages() {
    return html`
      <article name="galleries">         
        <cms-gallery-viewer route="{{route}}" lang="[[lang]]">  

          <cms-galleries slot="galleries" id="galleries"            
            route="{{route}}">
          </cms-galleries>

          <cms-images slot="images" id="images" route="{{route}}">
          </cms-images>

        </cms-gallery-viewer>
      </article>
      <article name="playlists" route="{{route}}"> 
            videos
      </article>
  `
  }
  static get is() { return 'cms-media'; }

  static get properties() {
    return {
      route: {
        type: Object,
        notify: true
      },
      lang: {
        type: String,
        notify: true
      },
      langs: {
        type: Object,
        value: {}
      },
      translator: {
        type: Object,
        notify: true,
        value: function () {
          return MyAppGlobals[window.cms]// MyAppGlobals.translator
        }
      },
      queryContent: {
        type: String,
        notify: true
      },
      returnPath: {
        type: String,
        notify: true
      },
      contentto: {
        type: Object,
        notify: true,
        value: {}
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      add: {
        type: Boolean,
        notify: true
      },
      add: {
        type: Boolean,
        value: false
      },
      breadcrumbs: {
        type: Array,
        notify: true,
        value: []
      },
    }
  }

  static get observers() {
    return [
      '_routePageChanged(route, routeData, query, layer2Data, layer2route)'
    ];
  }
  ready() {
    super.ready()
    this.translator.target('cms-image-viewer', 'setLangObject', (this._setLObj).bind(this))
    this.translator.target('cms-image-viewer', 'changeLang', (this._setLang).bind(this), false)
    this.translator.shoot('cms-image-viewer', 'setLangObject')
  }
  _setLObj(res, querySnapshot) {
    if ('data' in querySnapshot) {
      let langs = querySnapshot.data()
      res.call(this, langs);
    }
  }
  _setLang(res, lang) {
    this.lang = lang
    res.call(this);
    this.set('breadcrumbs', [])
    if (this.breadcrumbs.length > 0) {
      this.setBreadcrumbs(this.route, this.routeData)
    }
  }
  __changeLang() {
    this.lang = this.translator.lang
    this.translator.changeLang.call(this)
    this.setBreadcrumbs(this.route, this.routeData)
  }
  _routePageChanged(route, routeData, query) {
    if (route.prefix === '/media') {
      if (this.breadcrumbs.length > 0) {
        this.setBreadcrumbs(this.route, this.routeData)
      }
      if (!routeData.page) {
        this.page = 'home';
      }
      if (!!routeData && !!routeData.page) {
        if (["view-images"].indexOf(routeData.page) !== -1) {
          this.page = 'galleries';
        } else
          if (['search', 'galleries', 'playlists'].indexOf(routeData.page) !== -1) {
            this.page = routeData.page;
          }
          else {
            // console.log('view404', routeData.page, query);
          }
      }
    }
  }
  setBreadcrumbs(route, routeData) {
    this.set('breadcrumbs', [])
    if (!routeData.page) {
      let arr2 = []
      this.page = 'home';
      arr2.push('cmshome')
      this.set('breadcrumbs', arr2)
    }
    if (!!routeData.page) {
      if (['galleries', 'playlists', 'search'].indexOf(routeData.page) !== -1) {
        let arr2 = []
        arr2.push('cmshome')
        arr2.push('/media')
        this.set('breadcrumbs', arr2)
      }
      if (["/view-images", "/view-images/add-images", "/view-images/edit-images"].indexOf(route.path) !== -1) {
        let arr2 = []
        arr2.push("cmshome")
        arr2.push("/media")
        arr2.push("/media/galleries")
        this.set("breadcrumbs", arr2)
      }
      if (["/view-videos"].indexOf(route.path) !== -1) {
        let arr2 = []
        arr2.push("cmshome")
        arr2.push("/media")
        arr2.push("/media/galleries")
        this.set("breadcrumbs", arr2)
      }
    }
  }
  _getStr(item) {
    let str = ''
    str = (item === '/media') ? `${item}/` : `${item}`
    return str
  }
  _queryContent(index) {
    if (index > 1)
      return `?reset=false&update=${this.query.gallery}`
  }
  _pageChanged(page) {
    if (page !== undefined) {
      if (page === 'galleries') {
        import('./media/cms-gallery-viewer')
        return;
      }
      if (page === 'articles') {
        import('./cms-articles-viewer');
        return;
      }
      /*    if (page === 'view404') {
           import('./cms-404-warning');
           return;
         }*/
    }
  }
}
customElements.define(cmsMedia.is, cmsMedia);