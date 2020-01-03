import '@polymer/iron-selector/iron-selector';
import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { html as litHtml, render } from 'lit-html';
import './cms-page-list-item';
import { cmsPagesLib } from '../tools/cms-save-lib.js';
class cmsPageCats extends cmsPagesLib(cmsMiddlePageTemplate) {
    static get _getSilentAnchor() {
        return html`            
        <a href="[[rootPath]]content/pages/add-category-pages?&add=true">
            <div class="add-btn-group" title="[[ADD]]">
                <div class="add-btn-group-item group-item-top-left" ></div>

                <div class="add-btn-group-item group-item-top-right"></div>

                <div class="add-btn-group-item group-item-bottom-left"></div>

                <div class="add-btn-group-item group-item-bottom-right"></div>
            </div>
        </a>
        `
    }
    static get is() { return 'cms-page-cats'; }
    static get properties() {
        return {
            lang: {
                type: String,
                observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            pages: {
                type: Array,
                notify: true,
                value: new Array(),
                observer: 'putElement',
            }
        }
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        //this._observer.disconnect();
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, query)'
        ];
    }
    ready() {
        super.ready();
        const spinnerTemplate = () => litHtml`<paper-spinner-lite active="false" slot="spinner">`
        render(spinnerTemplate(), this);
        this.translator.target('cms-page-list-type', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-page-list-type', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-page-list-type', 'setLangObject')
    }
    _setLang(res, lang) {
        this.lang = lang
        res.call(this);
    }
    _setLObj(res, querySnapshot) {
        if ('data' in querySnapshot) {
            let langs = querySnapshot.data()
            res.call(this, langs);
        }
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeLang.call(this)
    }
    _routePageChanged(routeData, query) {
        if (typeof this.time === 'number') clearInterval(this.time)
        let reset = (query.reset === 'true')
        if (!query.reset) {
            if (routeData.page === "pages") {
                this.time = setTimeout(() => {
                    if (this.pages.length === 0) {
                        afterNextRender(this, () => {
                            this._askPages({ q: 'removed', v: false });
                        });
                    }
                }, 120);

            }
        } else if (reset === true) {
            this.pages = [];
            this._contentChanged()
        }
    }

    _contentChanged() {
        if (typeof this.time === 'number') clearTimeout(this.time)
        const spinnerTemplate = () => litHtml`<paper-spinner-lite active="false" slot="spinner">`
        render(spinnerTemplate(), this);
        if (this.routeData.page === 'pages' && this.route.path === '/pages') {
            this.time = setTimeout(() => {
                window.history.pushState({}, null, `${this.rootPath}content/pages`)
                window.dispatchEvent(new CustomEvent('location-changed'))
            }, 500);
        } else {
            this.pages = []
        }
    }
    _setAll(response) {
        let arr = []
        this.pages = [];
        for (let i = 0; i < response.length; i++) {
            if (!!response[i].id) {
                let datarr = response[i].data()
                arr.push(datarr);
            }
        }
        this.set('pages', arr);
    }

    putElement(data) {
        if (typeof this.time === 'number') clearInterval(this.time)
        this.time = setTimeout(() => {
            const pageTemplate = (pages) => litHtml`${pages.map((article, idx) => {
                return litHtml`<cms-page-list-item slot="item${idx}" .page="${article}">
                        </cms-page-list-item>`
            })} `
            render(pageTemplate(data), this);
        }, 60);
    }

    _reset(call, mlscs) {

        console.log('reseted pages')
        this.innerHTML = ''
        this.pages = undefined
        this.inForm = undefined
        this.set('sloted', false)
        window.onbeforeunload = function () { }
        setTimeout(() => {
            call()
        }, mlscs)
    }
}
customElements.define(cmsPageCats.is, cmsPageCats);
