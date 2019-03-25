import { html } from '@polymer/polymer/polymer-element';
import { cmsViewerTemplate } from './cms-viewer-template.js';
class cmsPageViewer extends cmsViewerTemplate {
    static get is() { return 'cms-page-viewer'; }
    static get properties() {
        return {
            lang: {
                type: String,
                notify: true
            },
            page: {
                type: String,
                reflectToAttribute: true,
                observer: '_pageChanged'
            },
            active: {
                type: String,
                value: ''
            },
            pages: {
                type: Array,
                notify: true
            },
            lastChosen: {
                type: Array,
                value: new Array()
            }
        };
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, query)'
        ];
    }
    ready() {
        super.ready();
        this._routePageChanged(this.routeData);
        window.addEventListener('reset-list-type-content', (this.__reset).bind(this));
    }
    __reset(event) {
        if (['categorypages'].indexOf(event.detail) !== -1) {
            let template = html`<cms-page-list-type slot="categories">
                          </cms-page-list-type>`;
            let clone = document.importNode(template.content, true);
            clone.route = this.route;
            clone.lang = this.lang;
            if (this.childElementCount < 5) {
                this.appendChild(clone);
                this.$.reset.click();
            }
        }
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
    setLastChosen(elem, bool) {
        let arr = new Array();
        if (elem.style.color === "var(--google-blue-700)" || elem.style.color === 'rgb(140, 174, 247)') {
            elem.style.color = bool === true ? '#f0f0f0' : "rgb(128, 152, 173)";
            this.lastChosen.pop();
        }
        else {
            elem.style.color = bool === true ? 'rgb(140, 174, 247)' : "var(--google-blue-700)";
            arr.push(elem);
            this.lastChosen = arr;
        }
    }
    showName(cats, name) {
        return cats[name];
    }
}
customElements.define(cmsPageViewer.is, cmsPageViewer);