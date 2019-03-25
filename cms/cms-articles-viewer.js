import { html } from '@polymer/polymer/polymer-element';
import { cmsViewerTemplate } from './cms-viewer-template.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-input/paper-input.js';
import './cms-article-content.js';
import './cms-article-list-type.js';
class cmsArticlesViewer extends cmsViewerTemplate {
  /* static get template() {       
      <cms-article-list-type route="{{route}}" article=[[article]]>
      </cms-article-list-type>

      <cms-artilce-sub-cat-type article=[[article]]>
      </cms-artilce-sub-cat-type>
        `
   }*/

  static get _getSilentAnchor() {
    return html`  
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="reset" href="[[rootPath]]content/pages/">
            </a>
        </iron-selector>`
  }
  static get _getPages() {
    return html`
        <article name="add-category-pages">  
            <slot name="add"></slot>  
        </article>

        <article name="home">           
            <slot name="categories"></slot>
            <slot name="suCategories"></slot>
        </article>`
  }
  static get is() { return 'cms-articles-viewer'; }

  static get properties() {
    return {
      DBW: {
        type: Object,
        value: function () {
          return new dataBaseworker()
        },
        notify: true
      },
      articles: {
        type: Array,
        notify: true
      },
      setter: {
        type: String,
        notify: true,
        observer: 'resetCollor'
      },
      closed: {
        type: Boolean,
        notify: true,
      },
      image: {
        type: Object,
        notify: true,
        observer: 'sendImage'
      },
      sett: {
        type: Boolean,
        value: false
      },
      confirm: {
        type: Boolean,
        notify: true,
        value: false,
      },
      lastChosen: {
        type: Array,
        value: new Array()
      }
    }
  }

  static get observers() {
    return [
      '_routePageChanged(routeData, query)'
    ];
  }
  ready() {
    super.ready();
    this._getArticles()
    scroll({ top: 0, behavior: 'silent' });
  }

  log(data) {
    console.log('log from cms-article-viewer', data)
  }

  error(data) {
    console.error('error from cms-article-viewer', data)
  }

  /*deSpin() {
    this.$.spinner1.active = !this.$.spinner1.active
    //this.$.spinner2.active = !//this.$.spinner2.active
  }*/

  _getArticles() {
    /* if (this.$.spinner1.active === false) {
       this.deSpin()
     }*/
    this.DBW.askAllArticles((data) => {
      this.articles = data
      scroll({ top: 0, behavior: 'silent' });
    })
  }

  _routePageChanged(page) {
    if (page !== undefined && 'page' in page) {
      if (!page.page) {
        this.page = 'home';
      }
      else if (['add-category-pages', 'edit-category-pages'].indexOf(page.page) !== -1) {
        this.page = 'add-category-pages';
      }
      else {
        console.log(page.page);
        this.page = 'view404';
      }
    }
    else if (page instanceof Object === true) {
      this.page = 'home';
    }
  }
  _pageChanged(page) {
    if (page !== undefined) {
      if (page === 'home') {
        import('./cms-page-list-type').then(item => {
        });
        return;
      }
      if (page === 'add-category-pages') {
        import('./cms-page-list-type-content').then(item => {
        });
        return;
      }
      if (page === 'view404') {
        import('../shop-404-warning');
        return;
      }
    }
  }
  resetCollor(data, element) {
    if (data === 'newPage') {
      this.AskPages()
    }
  }

  toggleLists() {
    this.$.typer.classList.toggle('diferent')
  }

  toggleCats() {
    this.$.subCats.classList.toggle('diferent')
  }

}

customElements.define(cmsArticlesViewer.is, cmsArticlesViewer);
