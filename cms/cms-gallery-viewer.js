import { html } from '@polymer/polymer/polymer-element.js';
import { cmsViewerTemplate } from './cms-viewer-template.js';
import '@polymer/iron-flex-layout/iron-flex-layout.js';
import './cms-galleries.js';
import './cms-images.js';

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
            galleries: {
                type: Array,
                notify: true
            },
            gallery: {
                type: String,
                notify: true
            }
        }
    }

    ready() {
        super.ready()
    }

    static get observers() {
        return [
            '_routePageChanged(routeData, query)'
        ];
    }
    _routePageChanged(page, query) {
        if (page !== undefined && 'page' in page) {
            if (!page.page) {
                this.page = 'galleries';
            }
            else if (['images', 'galleries'].indexOf(page.page) !== -1) {
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
    _pageChanged(page) {
        if (page !== undefined) {
            if (page === 'home') {
                import('./galleries').then(item => {
                });
                return;
            }
            if (page === 'images') {
                import('./cms-images').then(item => {
                });
                return;
            }
            if (page === 'view404') {
                import('../shop-404-warning');
                return;
            }
        }
    }
}
customElements.define(cmsGalleryViewer.is, cmsGalleryViewer);