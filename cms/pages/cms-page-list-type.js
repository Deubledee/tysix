import '@polymer/iron-selector/iron-selector';
import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template';
import './cms-page-list-item';
class cmsPageListType extends cmsMiddlePageTemplate {
    static get _getShoutAnchor() {
        return html`
        <a href="[[rootPath]]content/pages/add-category-pages?content=eyJjb250ZW50VGV4dCI6W3siZGVzY3JpcHRpb24iOiIifV0sImltYWdlIjpbXSwiaW5mbyI6W3siYXV0aG9yIjoiIiwiZGF0ZUFkZGVkIjoiIiwicHVibGlzaGVkQnkiOlt7ImF1dGhvciI6IiIsImRhdGUiOiIiLCJ1aWQiOiIifV0sInVuUHVibGlzaGVkQnkiOlt7ImF1dGhvciI6IiIsImRhdGUiOiIiLCJ1aWQiOiIifV0sImxhc3RNb2RpZmllZCI6W3siYXV0aG9yIjoiIiwiZGF0ZSI6IiIsInVpZCI6IiJ9XSwiZGF0ZVB1Ymxpc2hlZCI6Ik5QIiwicHVibGlzaGVkIjoiTlAifV0sIml0ZW1zIjpbeyJjYXRlZ29yeU5hbWUiOiIiLCJ0eXBlIjoiIiwibGFuZyI6IiJ9XSwic3ViQ2F0ZWdvcmllcyI6W119&add=true">
            <paper-tab name=" add-category-pages">
            [[ADD]] [[categorypages]]
                <paper-icon-button-light>
                    <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                </paper-icon-button-light>
            </paper-tab>
        </a>
        `
    }
    static get is() { return 'cms-page-list-type'; }
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
                    return MyAppGlobals.translator
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
        this._askPages();
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
        this._askPages()
    }
    _askPages() {
        this.translator._DBW.askAllPages((done) => {
            this._setAll(done);
        }, this.translator.__DEV);
    }
    _setAll(data) {
        let arr = [], arr2 = [];
        this.set('inForm', arr);
        this.pages = '';
        for (let i = 0; i < data.length; i++) {
            if ('categoryCount' in data[i]) {
                arr.push(data[i]);
            }
            else {
                arr2.push(data[i]);
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
    }
    deSpin(data) {
        if (this.$.spinner.active === true) {
            this.$.spinner.active = false;
        }
    }
}
customElements.define(cmsPageListType.is, cmsPageListType);