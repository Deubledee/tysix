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
        <article name="home">  
            <slot name="galleries"></slot>  
        </article>

        <article name="view-edit-images">  
            <slot name="images"></slot>  
        </article>`
    }

    static get is() { return 'cms-gallery-viewer'; }

    static get properties() {
        return {
            lang: {
                type: String,
                notify: true,
                observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
            },
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
    _routePageChanged(route, page, query) {
        if (route.prefix === '/media/images') {
            if (page !== undefined && 'page' in page) {
                if (route.path === "") {
                    this.routeData.page = ''
                    page.page = ''
                }
                if (!page.page) {
                    this.page = 'home';
                } else
                    if (['galleries'].indexOf(page.page) !== -1) {
                        this.page = 'home';

                    } else
                        if (['view-images'].indexOf(page.page) !== -1) {
                            this.page = 'view-edit-images';
                        } else
                            if (['view-images', 'galleries', 'add-gallery', 'edit-gallery'].indexOf(page.page) !== -1) {
                                this.page = page.page;
                            } else {
                                this.page = 'view404';
                            }
            }
            else
                if (page instanceof Object === true) {
                    this.page = 'home';
                }
        }
    }
    __changeLang() {
        try {
            if (this.langs[this.lang]) {
                let obj = this.langs[this.lang];
                for (let par in obj) {
                    if (Boolean(this[par]) === true) {
                        this.set(par, obj[par])
                    } else {
                        this.set(par, '');
                        this.set(par, obj[par]);
                    }
                }
            }
        }
        catch (err) {
            console.error(err)
        }
    }
    _setLangObject(langs) {
        try {
            for (let par in langs) {
                if (par !== 'styles') {
                    this.langs[par] = langs[par].pop();
                }
            }
            this.__changeLang();
        }
        catch (err) {
            console.error(err)
        }
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
    _pageChanged(page) {
        if (page !== undefined) {
            if (page === 'home' || page === 'galleries') {
                import('./cms-galleries').then(item => {
                });
                return;
            }
            if (page === 'view-edit-images') {
                import('./cms-images').then(item => {
                });
                return;
            }
            if (['add-gallery', 'edit-gallery'].indexOf(page)) {
                import('./cms-gallery-form').then(item => {
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