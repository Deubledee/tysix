import { cmsViewerTemplate } from '../templates/cms-viewer-template';
class cmsPageViewer extends cmsViewerTemplate {
    static get is() { return 'cms-page-viewer'; }
    static get observers() {
        return [
            '_routePageChanged(route, routeData.page)'
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
    _routePageChanged(route, page) {
        if (route.prefix === '/content/pages') {
            if (route.path === '/' || route.path === '') {
                this.page = 'home';
            }
            else if (['subcategory-pages'].indexOf(page) !== -1) {
                this.page = 'subcategory-pages' //'home'
            }
            else {
                this.page = 'view404';
                this.subcats = 'view404';
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