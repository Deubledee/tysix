import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import { dataBaseworker } from '../tools/dataBaseWorker';
import '@polymer/iron-selector/iron-selector';
import './cms-page-list-item';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
const __DEV = true;
const _DBW = new dataBaseworker();
const _STYLES = _DBW.getElementAssets('cms-page-list-type', __DEV);
class cmsPageListType extends cmsMiddlePageTemplate {
    static get is() { return 'cms-page-list-type'; }
    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker();
                },
                notify: true
            }
        }
    }

    ready() {
        super.ready();
        _STYLES.then((querySnapshot) => {
            let style = querySnapshot.data();
            this._setLangObject(style);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
        this._askPages();
        window.addEventListener('reset-list-type', (this._contentChanged.bind(this)));
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
    //to review
    /* __changeStyle(style) {
         this.shadowRoot.firstElementChild.innerText += style;
     }*/
    __changeLang() {
        if (this.langs[this.lang]) {
            let obj = this.langs[this.lang];
            for (let par in obj) {
                this.set(par, obj[par]);
            }
        }
    }
    _setLangObject(langs) {
        for (let par in langs) {
            if (par !== 'styles') {
                this.langs[par] = langs[par].pop();
            }
        }
        this.__changeLang();
    }

    _askPages() {
        this.DBW.askAllPages((done) => {
            this._setAll(done);
        }, __DEV);
    }

    _setAll(data) {
        let arr = [], arr2 = [];
        this.set('info', arr);
        this.pages = '';
        for (let i = 0; i < data.length; i++) {
            if ('categoryCount' in data[i]) {
                arr.push(data[i]);
            }
            else {
                arr2.push(data[i]);
            }
        }
        this.set('info', arr);
        this.set('pages', arr2);
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