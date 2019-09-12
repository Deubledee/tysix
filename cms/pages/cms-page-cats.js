import '@polymer/iron-selector/iron-selector';
import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template';
import './cms-page-list-item';
import { cmsPagesLib } from '../tools/cms-save-lib.js';
class cmsPageCats extends cmsPagesLib(cmsMiddlePageTemplate) {
    static get _getSilentAnchor() {
        return html`            
        <a href="[[rootPath]]content/pages/add-category-pages?&add=true">
                <paper-icon-button icon="av:library-add" aria-label="categories"></iron-icon>
                </paper-icon-button>
            [[ADD]] [[categorypages]]
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
        }
    }
    ready() {
        super.ready();
        this.translator.template.innerHTML = `<paper-spinner-lite active="false" slot="spinner">
        </paper-spinner-lite>`
        this.translator.clone(this)
        this.translator.target('cms-page-list-type', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-page-list-type', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-page-list-type', 'setLangObject')
        //sem query pede todas as páginas\\
        this._askPages({ q: 'removed', v: false });
        window.addEventListener('reset-list-type', (this._contentChanged.bind(this)));
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
    _contentChanged() {
        this.innerHTML = ''
        this.translator.clone(this)
        this.spinOut = false
        setTimeout(() => {
            this._askPages({ q: 'removed', v: false })
        }, 500);
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
        let template = html`
        <cms-page-list-item>
        </cms-page-list-item>`;
        var clone = document.importNode(template.content, true);
        this.appendChild(clone);
        this.children[index].setAttribute('slot', `item${index}`);
        this.children[index].set('page', page);
        this.children[index].set('idx', index);
    }
}
customElements.define(cmsPageCats.is, cmsPageCats);