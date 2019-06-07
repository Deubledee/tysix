import { cmsTopPageTemplate } from './templates/cms-top-page-template';
import { html } from '@polymer/polymer/polymer-element.js';
class cmsMedia extends cmsTopPageTemplate {
  static get topTitle() {
    return html`
    <div> [[Media]] </div>
    <paper-icon-button-light>
      <iron-icon icon="image:photo-library" aria-label="Content">
      </iron-icon>
    </paper-icon-button-light>`
  }
  static get topPages() {
    return html`
      <a href="[[rootPath]]media/search">
        <paper-button class="button" front$="[[search]]" name="search" aria-label="search">
                    [[Search]]
                <iron-icon icon="icons:search" aria-label="search">
                </iron-icon>
        </paper-button>
      </a> 
      <a href="[[rootPath]]media/images">
        <paper-button class="button" front$="[[images]]" name="images" aria-label="images">
                    [[Images]]
                <iron-icon icon="av:library-books" aria-label="images">
                </iron-icon>
        </paper-button>
      </a> 
      <a href="[[rootPath]]media/videos">
        <paper-button  class="button" front$="[[videos]]" name="videos" aria-label="videos">    
                    [[Videos]]
                <iron-icon icon="av:art-track" aria-label="cms videos">
                </iron-icon> 
        </paper-button>      
      </a>`
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
          return MyAppGlobals.translator
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
      search: {
        type: Boolean,
        computed: '_checkMyName(page, "search")'
      },
      images: {
        type: Boolean,
        computed: '_checkMyName(page, "images")'
      },
      videos: {
        type: Boolean,
        computed: '_checkMyName(page, "videos")'
      }
    }
  }

  static get observers() {
    return [
      '_routePageChanged(routeData, query, active)'
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
  }
  __changeLang() {
    this.lang = this.translator.lang
    this.translator.changeLang.call(this)
  }
  _routePageChanged(page, query) {
    if (this.route.prefix === '/media') {
      if (page !== undefined && 'page' in page) {
        if (['search', 'images', 'videos'].indexOf(page.page) !== -1) {
          this.page = page.page;
        }
        else {
          console.log('view404', page, query);
        }
      }
      else {
        this.page = 'search';
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
      /*    if (page === 'articles') {
            import('./cms-articles-viewer');
            return;
          }
          if (page === 'view404') {
            import('./cms-404-warning');
            return;
          }*/
    }
  }
}
customElements.define(cmsMedia.is, cmsMedia);