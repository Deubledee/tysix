import { html } from '@polymer/polymer/polymer-element';
import { cmsViewerTemplate } from '../templates/cms-viewer-template.js';
import '@polymer/paper-spinner/paper-spinner.js';
class cmsArticlesViewer extends cmsViewerTemplate {
  static get _getSilentAnchor() {
    return html`  
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="reset" href="[[rootPath]]content/articles/">
            </a>
        </iron-selector>`
  }
  static get _getPages() {
    return html`
        <article name="add-category-pages">  
            <slot name="add"></slot>  
        </article>
        <article name="add-edit-articles">  
            <slot name="addart"></slot>  
        </article>
        <article name="home">           
            <slot name="categories"></slot>
            <slot name="suCategories"></slot>
        </article>
        <article name="view-articles"> 
            <slot name="view"></slot>
        </article>`
  }
  static get is() { return 'cms-articles-viewer'; }

  static get observers() {
    return [
      '_routePageChanged(route, routeData)'
    ];
  }

  ready() {
    super.ready();
    this._routePageChanged(this.routeData);

  }

  __setEleemnt() {
    let template = html`<cms-article-view id="view" slot="view">
                         </cms-article-view>`;
    let clone = document.importNode(template.content, true);
    clone.route = this.route;
    clone.user = this.user;
    clone.lang = this.lang;
    setTimeout(() => {
      // this.appendChild(clone)
      console.log('elem', this.children[this.childElementCount - 1])
    }, 500)
  }

  _routePageChanged(route, page) {
    if (route.prefix === '/content/articles') {
      if (page !== undefined && 'page' in page) {
        if (!page.page) {
          this.page = 'home';
        }
        else if (['add-articles', 'edit-articles'].indexOf(page.page) !== -1) {
          this.page = 'add-edit-articles';
        }
        else if (['view-articles'].indexOf(page.page) !== -1) {
          this.page = page.page;
        }
        else {
          this.page = 'view404';
        }
      }
      else if (page instanceof Object === true) {
        this.page = 'home';
      }
    }
  }

  _pageChanged(page) {
    if (page !== undefined) {
      if (page === 'home') {
        import('./cms-article-list-type.js')
        return;
      }
      if (page === 'view-articles') {
        import('./cms-article-view.js')
        return;
      }
      if (page === 'add-edit-articles') {
        import('./cms-article-content.js')
        return;
      }
      if (page === 'view404') {
        import('../cms-404-warning');
        return;
      }
    }
  }
}

customElements.define(cmsArticlesViewer.is, cmsArticlesViewer);
