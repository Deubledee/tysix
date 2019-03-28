import { html } from '@polymer/polymer/polymer-element.js';
import { cmsViewerTemplate } from '../templates/cms-viewer-template.js';

class cmsGalleryViewer extends cmsViewerTemplate {

    static get _getSilentAnchor() {
        return html`  
        <iron-selector selected="[[gallery]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="reset" href="[[rootPath]]media/images/">
            </a>
        </iron-selector>`
    }
    static get _getPages() {
        return html`
        <article name="galleries">  
            <slot name="galleries"></slot>  
        </article>

        <article name="images">  
            <slot name="images"></slot>  
        </article>`
    }

    static get is() { return 'cms-gallery-viewer'; }

    static get properties() {
        return {
            page: {
                type: String,
                notify: true,
                observer: '_pageChanged'
            }
        }
    }

    ready() {
        super.ready()
    }

    static get observers() {
        return [
            '_routePageChanged(route, routeData)'
        ];
    }
    __reset(event) {
        if (['categorypages'].indexOf(event.detail) !== -1) {
            let template = html`<cms-galleries slot="galleries">
                          </cms-galleries>`;
            let clone = document.importNode(template.content, true);
            clone.route = this.route;
            clone.lang = this.lang;
            if (this.childElementCount < 5) {
                this.appendChild(clone);
                this.$.reset.click();
            }
        }
    }
    _routePageChanged(route, page) {
        if (route.prefix === '/media/images') {
            if (page !== undefined && 'page' in page) {
                if (!page.page) {
                    this.page = 'home';
                }
                else if (['images', 'galleries', 'add-gallery', 'edit-gallery'].indexOf(page.page) !== -1) {
                    this.page = page.page;
                }
                else {
                    console.log(page.page);
                    this.page = 'view404';
                }
            }
            else if (page instanceof Object === true) {
                this.page = 'galleries';
            }
        }
    }
    _pageChanged(page) {
        console.log(page)
        if (page !== undefined) {
            if (page === 'home' || page === 'galleries') {
                import('./cms-galleries').then(item => {
                });
                return;
            }
            if (page === 'images') {
                import('./cms-images').then(item => {
                });
                return;
            }
            if (['add-gallery', 'edit-gallery'].indexOf(page)) {
                import('./cms-images').then(item => {
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
customElements.define(cmsGalleryViewer.is, cmsGalleryViewer);