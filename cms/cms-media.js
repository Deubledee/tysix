import { cmsTopPageTemplate } from './cms-top-page-template.js';
import { html } from '@polymer/polymer/polymer-element.js';
import { dataBaseworker } from './dataBaseWorker';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/paper-spinner/paper-spinner.js';
import './cms-common-top-styles';
const __DEV = true;
const _DBW = new dataBaseworker();
const _STYLES = _DBW.getElementAssets('cms-image-viewer', __DEV);
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
        <cms-gallery-viewer route="[[subroute]]" lang="[[lang]]">
          <cms-galleries slot="galleries" id="galleries">
          </cms-galleries>

          <cms-images slot="images" id="images">
          </cms-images>
        </cms-gallery-viewer>
      </article>
      <article name="videos" route="[[subroute]]" lang="[[lang]]"> 
            videos
      </article>
  `
  }
  static get is() { return 'cms-media'; }

  static get properties() {
    return {
      lang: {
        type: String,
        notify: true,
        observer: '__changeLang'
      },
      langs: {
        type: Object,
        value: {}
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
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
    _STYLES.then((querySnapshot) => {
      let style = querySnapshot.data();
      this._setLangObject(style);
    }).catch(function (error) {
      console.error("Error reteaving assets: ", error);
    });
  }

  __changeLang() {
    try {
      if (this.langs[this.lang]) {
        let obj = this.langs[this.lang];
        for (let par in obj) {
          if (Boolean(this[par]) === true) {
            this.set(par, obj[par])
          } else {
            this.set(par, '');
            this.set(par, obj[par]);
          }
        }
      }
    }
    catch (err) {
      console.error(err)
    }
  }

  _setLangObject(langs) {
    try {
      for (let par in langs) {
        if (par !== 'styles') {
          this.langs[par] = langs[par].pop();
        }
      }
      this.__changeLang();
    }
    catch (err) {
      console.error(err)
    }
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
        import('./cms-gallery-viewer').then(module => {
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
            import('../shop-404-warning');
            return;
          }*/
    }
  }
}
customElements.define(cmsMedia.is, cmsMedia);