import { cmsTopPageTemplate } from './templates/cms-top-page-template';
import { html } from '@polymer/polymer/polymer-element';
class cmsContent extends cmsTopPageTemplate {
  static get topTitle() {
    return html`
      <a href="[[_getStr(page)]][[_queryContent(index, page)]]">  
          <paper-button  aria-label="Go back page">                   
          [[_getPage(page)]]
          </paper-button>               
      </a>     
  `}
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
          return MyAppGlobals[window.cms]//MyAppGlobals.translator
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
      breadcrumbs: {
        type: Array,
        notify: true,
        value: []
      },
    };
  }
  static get observers() {
    return [
      '_routePageChanged(route, routeData , query)'
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
  _routePageChanged(route, page, query) {
    if (!!route)
      if (route.prefix === "/content") {
        if (this.breadcrumbs.length > 0) {
          this.setBreadcrumbs(this.route, this.routeData)
        }
        if (page !== undefined && "page" in page) {
          if (["articles", "pages"].indexOf(page.page) !== -1) {
            this.page = page.page;
            /* */
          }
        }
        if (route.path === '/')
          if (!!query.reset) {
            this.query = {}
            window.history.pushState({}, null, `${this.rootPath}content/`)
            window.dispatchEvent(new CustomEvent('location-changed'))
          }
      }
  }
  setBreadcrumbs(route, routeData) {
    this.set("breadcrumbs", [])
    if (typeof this.time === 'number') clearTimeout(this.time)
    this.time = setTimeout(() => {
      if (!routeData.page) {
        let arr2 = []
        this.page = "home";
        arr2.push("cmshome")
        this.set("breadcrumbs", arr2)
      }
      if (!!routeData && !!routeData.page) {
        if (["articles", "pages", "search"].indexOf(routeData.page) !== -1) {
          let arr2 = []
          arr2.push("cmshome")
          this.set("breadcrumbs", arr2)
        }
        if (["/pages/edit-category-pages",
          "/pages/add-category-pages",
          "/pages/subcategory-pages"].indexOf(route.path) !== -1) {
          let arr2 = []
          arr2.push("cmshome")
          arr2.push("/content/pages")
          this.set("breadcrumbs", arr2)
        }
        if (["/pages/edit-subcategory-pages",
          "/pages/add-subcategory-pages"].indexOf(route.path) !== -1) {
          let arr2 = []
          arr2.push("cmshome")
          arr2.push("/content/pages")
          arr2.push("/content/pages/subcategory-pages")
          this.set("breadcrumbs", arr2)
        }
        if (["/articles/edit-article",
          "/articles/add-article"].indexOf(route.path) !== -1) {
          let arr2 = []
          arr2.push("cmshome")
          arr2.push("/content/articles")
          this.set("breadcrumbs", arr2)
        }
      }
    }, 120);
  }
  _getStr(item) {
    let str = ''
    str = (item === '/content') ? `${item}/` : `${item}`
    return str
  }
  _queryContent(index) {
    if (index > 1)
      return `?content=${this.query.content}&reset=false&update=${this.query.content}`
  }
  _getPage(item) {
    let word, final
    if (item === 'cmshome') {
      word = item.split('')
      word[0] = word[0].toUpperCase()
      word = word.join('')
      this.translator.changeItemTitleLang.call(this, word.toString(), 'word')
    } else {
      word = item.split('/')
      word.shift()
      word = word.pop()
      word = word.split('')
      word[0] = word[0].toUpperCase()
      word = word.join('')
      final = (word === 'Subcategory-pages') ? 'SubcategoryPages' : word
      this.translator.changeItemTitleLang.call(this, final.toString(), 'word')/**/
    }
    return this.word
  }
  _pageChanged(page) {
    if (page !== undefined) {
      if (page === "pages") {
        import("./pages/cms-page-viewer")
        return;
      }
      if (page === "articles") {
        import("./articles/cms-article-view");
        return;
      }
      if (page === "view404") {
        import("./cms-404-warning");
        return;
      }
    }
  }
}
customElements.define(cmsContent.is, cmsContent);