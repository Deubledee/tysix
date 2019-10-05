import '@polymer/iron-selector/iron-selector';
import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template';
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
            spinOut: {
                type: Boolean,
                value: false
            },
            pages: {
                type: Array,
                value: []
            },
            sloted: {
                type: Boolean,
                value: false
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
        this.translator.template.innerHTML = `<paper-spinner-lite active="false" slot="spinner">
        </paper-spinner-lite>`
        this.translator.clone(this)
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
        let reset = (query.reset === 'true')
        let removed = (query.removed === 'true')
        if (routeData.page === "pages") {
            if (!query.reset) {
                if (this.pages.length < 1)
                    this._askPages({ q: 'removed', v: false });
            }
            if ((!!query.reset) || (query.removed)) {
                if ((reset === true) || (removed === true)) {
                    this._contentChanged(query, (reset || removed))
                }
            }
        }
    }
    _contentChanged(query, reset) {
        this.innerHTML = ''
        setTimeout(() => {
            if (this.spinOut === true) {
                this.spinOut = false
                this.translator.template.innerHTML = `<paper-spinner-lite active="false" slot="spinner">`
                this.translator.clone(this)
            }
            setTimeout(() => {
                this._askPages({ q: 'removed', v: false })
            }, 500);
        }, 500);
        this.sloted = false
    }
    _setAll(response) {
        let arr = [], arr2 = [];
        this.set('inForm', arr);
        for (let i = 0; i < response.length; i++) {
            this.pages = '';
            if (!!response[i].id) {
                let datarr = response[i].data()
                if (response[i].id === 'addedContent') {
                    arr.push(datarr);
                }
                else {
                    arr2.push(datarr);
                }
            }
        }
        this.set('inForm', arr);
        this.set('pages', arr2);
        if (this.spinOut === false) {
            this.removeChild(this.children[0])
            this.spinOut = true
        }
    }
    putElement(index, page) {
        if (typeof this.time === 'number') {
            clearTimeout(this.time)
        }
        if (this.sloted === false) {
            let template = html`
                <cms-page-list-item>
                </cms-page-list-item>`;
            var clone = document.importNode(template.content, true);
            this.appendChild(clone);
            this.children[index].setAttribute('slot', `item${index}`);
            this.children[index].set('page', page);
            this.children[index].set('idx', index);
            this.time = setTimeout(() => {
                this.set('sloted', true)
            }, 60);
        }
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