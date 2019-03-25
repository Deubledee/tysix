import { cmsTopPageTemplate } from './cms-top-page-template.js';
import { dataBaseworker } from './dataBaseWorker';
const __DEV = true;
const _DBW = new dataBaseworker();
const _STYLES = _DBW.getElementAssets('cms-content', __DEV);

class cmsContent extends cmsTopPageTemplate {
  static get is() { return 'cms-content'; }
  static get properties() {
    return {
      user: {
        type: Object,
        notify: true
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
      },
      lang: {
        type: String,
        notify: true,
        observer: '__changeLang'
      },
      langs: {
        type: Object,
        value: {}
      },
      search: {
        type: Boolean,
        computed: '_checkMyName(page, "search")'
      },
      pages: {
        type: Boolean,
        computed: '_checkMyName(page, "pages")'
      },
      articles: {
        type: Boolean,
        computed: '_checkMyName(page, "articles")'
      }
    };
  }
  static get observers() {
    return [
      '_routePageChanged(routeData, query)'
    ];
  }

  ready() {
    super.ready();
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
    if (this.route.prefix === '/content') {
      if (page !== undefined && 'page' in page) {
        if (['articles', 'pages', 'search'].indexOf(page.page) !== -1) {
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
      if (page === 'pages') {
        import('./cms-page-viewer').then(module => {
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
      if (page === 'view404') {
        import('../shop-404-warning');
        return;
      }
    }
  }
}
customElements.define(cmsContent.is, cmsContent);