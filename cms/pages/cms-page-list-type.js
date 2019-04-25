import '@polymer/iron-selector/iron-selector';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template';
import { Setter } from '../tools/cms-element-set';
import './cms-page-list-item';
const Consts = new Setter()
Consts.assets = Consts.getAssets('cms-page-list-type')
Consts.template.innerHTML = `<paper-spinner-lite active="false" slot="spinner">
    </paper-spinner-lite>`
class cmsPageListType extends cmsMiddlePageTemplate {
    static get _getShoutAnchor() {
        return html`
        <a href="[[rootPath]]content/pages/add-category-pages?content=eyJjb250ZW50VGV4dCI6W3siZGVzY3JpcHRpb24iOiIifV0sImltYWdlIjpbXSwiaW5mbyI6W3siYXV0aG9yIjoiIiwiZGF0ZUFkZGVkIjoiIiwicHVibGlzaGVkQnkiOlt7ImF1dGhvciI6IiIsImRhdGUiOiIiLCJ1aWQiOiIifV0sInVuUHVibGlzaGVkQnkiOlt7ImF1dGhvciI6IiIsImRhdGUiOiIiLCJ1aWQiOiIifV19XSwiaXRlbXMiOlt7ImNhdGVnb3J5IjoiIiwibGFuZyI6IiIsInRpdGxlIjoiIiwidHlwZSI6IiIsInB1Ymxpc2hlZCI6Ik5QIn1dfQ==&add=true">
            <paper-tab name=" add-category-pages">
                [[categorypages]]
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
        }
    }
    ready() {
        super.ready();
        Consts.clone(this)
        Consts.assets.then((querySnapshot) => {
            let style = querySnapshot.data();
            Consts.setLangObject.call(this, style);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
        this._askPages();
        window.addEventListener('reset-list-type', (this._contentChanged.bind(this)));
    }
    __changeLang() {
        Consts.changeLang.call(this)
    }
    _contentChanged() {
        this._debounceEvent = Debouncer.debounce(this._debounceEvent, microTask, () => {
            window.dispatchEvent(new CustomEvent('reset-list-type-content', {
                bubbles: true, composed: true, detail: 'categorypages'
            }));
        });
        if (this.parentElement) {
            this.parentElement.removeChild(this);
        }
    }
    _askPages() {
        Consts._DBW.askAllPages((done) => {
            this._setAll(done);
        }, Consts.__DEV);
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
        this.removeChild(this.children[0])
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