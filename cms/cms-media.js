import { cmsTopPageTemplate } from './templates/cms-top-page-template';
import { html } from '@polymer/polymer/polymer-element.js';
class cmsMedia extends cmsTopPageTemplate {
  static get topPages() {
    return html`
      <section>
        <a href="[[rootPath]]media/search">
          <paper-button class="button" name="search" aria-label="search">
                      [[Search]]
                  <iron-icon icon="icons:search" aria-label="search">
                  </iron-icon>
          </paper-button>
        </a> 
      </section>
      <section>
        <a href="[[rootPath]]media/images">
          <paper-button class="button" name="images" aria-label="images">
                      [[Images]]
                  <iron-icon icon="av:library-books" aria-label="images">
                  </iron-icon>
          </paper-button>
        </a> 
      </section>
      <section>
        <a href="[[rootPath]]media/videos">
          <paper-button  class="button" name="videos" aria-label="videos">    
                      [[Videos]]
                  <iron-icon icon="av:art-track" aria-label="cms videos">
                  </iron-icon> 
          </paper-button>      
        </a>
      </section>`
  }
  static get viewPages() {
    return html`
      <article name="images">         
        <cms-gallery-viewer route="{{subroute}}" lang="[[lang]]">        
          <cms-galleries slot="galleries" id="galleries"            
            route="{{subroute}}" 
            images="{{Imags}}" 
            add="{{add}}" 
            contentto="{{contentto}}" 
            return-path="{{returnPath}}">
          </cms-galleries>

          <cms-images slot="images" id="images"            
            route="{{subroute}}" 
            image-data="{{Imags}}" 
            add="[[add]]" 
            contentto="[[contentto]]" 
            return-path="[[returnPath]]">
          </cms-images>

        </cms-gallery-viewer>
      </article>
      <article name="videos" route="{{subroute}}"> 
            videos
      </article>
  `
  }
  static get is() { return 'cms-media'; }

  static get properties() {
    return {
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
      Imags: {
        type: Array,
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
      '_routePageChanged(route, routeData, query)'
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
    setTimeout(() => {
      this.setBreadcrumbs(this.route, this.routeData)
    }, 120);
  }
  __changeLang() {
    this.lang = this.translator.lang
    this.translator.changeLang.call(this)
    setTimeout(() => {
      this.setBreadcrumbs(this.route, this.routeData)
    }, 120);
  }
  _routePageChanged(route, routeData, query) {
    if (route.prefix === '/media') {
      if (this.breadcrumbs.length > 0) {
        this.set('breadcrumbs', [])
        setTimeout(() => {
          this.setBreadcrumbs(this.route, this.routeData)
        }, 120);
      }
      if (!routeData.page) {
        this.page = 'home';
      }
      if (!!routeData && !!routeData.page) {
        if (['search', 'images', 'videos'].indexOf(routeData.page) !== -1) {
          this.page = routeData.page;
        }
        else {
          console.log('view404', routeData.page, query);
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
    if (!!routeData && !!routeData.page) {
      if (['images', 'videos', 'search'].indexOf(routeData.page) !== -1) {
        let arr2 = []
        arr2.push('cmshome')
        arr2.push('/media')
        this.set('breadcrumbs', arr2)
      }
      if (["/images/view-images",
        "/images/add-images",
        "/images/add-gallery"].indexOf(route.path) !== -1) {
        let arr2 = []
        arr2.push('cmshome')
        arr2.push('/media')
        arr2.push('/media/images')
        this.set('breadcrumbs', arr2)
      }
      if (["/videos/view-videos",
        "/videos/add-videos",
        "/videos/add-playlist"].indexOf(route.path) !== -1) {
        let arr2 = []
        arr2.push('cmshome')
        arr2.push('/media')
        arr2.push('/media/videos')
        this.set('breadcrumbs', arr2)
      }
    }
  }
  _pageChanged(page) {
    if (page !== undefined) {
      if (page === 'images') {
        import('./media/cms-gallery-viewer').then(module => {
          return;
        }).catch(error => {
          console.log(error);
        });
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