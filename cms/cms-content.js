import { cmsTopPageTemplate } from './templates/cms-top-page-template';
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
      translator: {
        type: Object,
        notify: true,
        value: function () {
          return MyAppGlobals.translator
        }
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
      '_routePageChanged(routeData, query, route)'
    ];
  }
  ready() {
    super.ready();
    this.translator.target('cms-content', 'setLangObject', (this._setLObj).bind(this))
    this.translator.target('cms-content', 'changeLang', (this._setLang).bind(this), false)
    this.translator.shoot('cms-content', 'setLangObject')
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
  _routePageChanged(page, query, route) {
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
        import('./pages/cms-page-viewer').then(module => {
          return;
        }).catch(error => {
          console.log(error);
        });
        return;
      }
      if (page === 'articles') {
        import('./articles/cms-articles-viewer');
        return;
      }
      if (page === 'view404') {
        import('./cms-404-warning');
        return;
      }
    }
  }
}
customElements.define(cmsContent.is, cmsContent);