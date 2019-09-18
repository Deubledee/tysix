import { cmsViewerTemplate } from '../templates/cms-viewer-template';
class cmsPageViewer extends cmsViewerTemplate {
    static get is() { return 'cms-page-viewer'; }
    static get observers() {
        return [
            '_routePageChanged(route, routeData, query)'
        ];
    }
    ready() {
        super.ready();
        this._routePageChanged(this.routeData);
        this.addEventListener('scrollpageholder', this._pageholderScroller, false)
    }
    _pageholderScroller(event) {
        this.$.pageholder.scrollTo(event.detail, 0)
    }
    _routePageChanged(route, page, query) {
        if (route.prefix === '/content/pages') {
            if (page !== undefined && 'page' in page) {
                if (route.path === '') {
                    this.routeData.page = ''
                    page.page = ''
                }
                if (!page.page) {
                    this.page = 'home';
                    // this.subcats = '';
                }
                else if (['subcategory-pages'].indexOf(page.page) !== -1) {
                    //  this.subcats = ;
                    this.page = 'subcategory-pages' //'home'
                }
                else if (['add-category-pages', 'edit-category-pages'].indexOf(page.page) !== -1) {
                    // this.page = 'add-category-pages';
                    // this.subcats = '';
                }
                else if (['edit-subcategory-pages', 'add-subcategory-pages'].indexOf(page.page) !== -1) {
                    // this.subcats = 'add-subcategory-pages';
                    // this.page = 'home'
                }
                else {
                    this.page = 'view404';
                    this.subcats = 'view404';
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
                import('./cms-page-cats').then(item => {
                });
                return;
            }
            if (page === 'subcategory-pages') {
                import('./cms-page-subcats').then(item => {
                });
                return;
            }
            if (page === 'view404') {
                import('../cms-404-warning');
                return;
            }
        }
    }
}
customElements.define(cmsPageViewer.is, cmsPageViewer);