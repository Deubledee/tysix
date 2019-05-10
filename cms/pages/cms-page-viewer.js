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
    }
    _routePageChanged(route, page) {
        if (route.prefix === '/content/pages') {
            if (page !== undefined && 'page' in page) {
                if (route.path === '') {
                    this.routeData.page = ''
                    page.page = ''
                }
                if (!page.page) {
                    this.page = 'home';
                } else
                    if (['add-category-pages', 'edit-category-pages', 'edit-subcategory-pages', 'add-subcategory-pages'].indexOf(page.page) !== -1) {
                        this.page = 'add-category-pages';
                    } else {
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
                import('../cms-404-warning');
                return;
            }
        }
    }
}
customElements.define(cmsPageViewer.is, cmsPageViewer);