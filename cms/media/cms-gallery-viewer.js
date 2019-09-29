import { html } from '@polymer/polymer/polymer-element.js';
import { cmsViewerTemplate } from '../templates/cms-viewer-template.js';
import './cms-gallery-item';

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

        <article name="view-images">  
            <slot name="images"></slot>  
        </article>`
    }

    static get is() { return 'cms-gallery-viewer'; }

    static get properties() {
        return {
            page: {
                type: String,
                reflectToAttribute: true,
                observer: '_pageChanged'
            }
        }
    }

    ready() {
        super.ready()
    }

    static get observers() {
        return [
            '_routePageChanged(route, routeData, query)'
        ];
    }
    _routePageChanged(route, routeData, query) {
        if (['galleries', 'view-images'].indexOf(routeData.page) !== -1) {
            this.page = routeData.page;
        }
    }

    _pageChanged(page) {
        if (page !== undefined) {
            if (page === 'home' || page === 'galleries') {
                import('./cms-galleries').then(item => {
                });
                return;
            }
            if (page === 'view-images') {
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