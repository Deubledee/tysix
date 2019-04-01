
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsContentImageTemplate } from '../templates/cms-content-image-template';
import './cms-article';
class cmsArticleView extends cmsContentImageTemplate {

    static get _getAnchor() {
        let template = document.createElement('template')
        template.innerHTML = `
            <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
                <a id="reset" href="[[rootPath]]content/articles">
                    <paper-icon-button  icon="arrow-back" aria-label="Go back">
                    </paper-icon-button>
                </a>
            </iron-selector>`
        return template
    }

    static get is() { return 'cms-article-view'; }
    static get properties() {
        return {
            lang: {
                type: String,
                notify: true,
                // observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
            },
            route: {
                type: Object,
                notify: true
            },
            lang: {
                type: Object,
                notify: true,
            },
            user: {
                type: Object,
                notify: true,
            },
            removed: {
                type: Boolean,
                value: false
            },
            contents: {
                type: Array,
                notify: true,
                value: new Array()
                // observer: '_cashlast'
            }
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, query, active)'
        ];
    }

    ready() {
        super.ready()
        this.$.reset.addEventListener('click', (this._removeInnerHTML).bind(this))
        window.addEventListener('reset', (this._removeInnerHTML).bind(this))
    }

    _slotElement(item, index) {
        if (this.childElementCount === 0) {
            let template = html`
                <cms-article>
                </cms-article>`
            template.content.children[0].setAttribute('slot', 'article' + index)
            let clone = document.importNode(template.content, true)
            this.appendChild(clone)
        }
    }
    _removeInnerHTML() {
        this.innerHTML = ''
        window.onbeforeunload = function () { };
    }
    _routePageChanged(routeData, query, active) {
        if (Boolean(active) === true && Boolean(routeData.page) === true && routeData.page === "view-articles") {
            if ('content' in query) {
                this._setContent(query.content, query)
            }
        }
        else if (Boolean(active) === false && Boolean(this.slashed) === false && routeData.page === "view-articles") {
            this.set('contents', []);
            this.set('add', false);
            console.log(Boolean(this.innerHTML))
            //this._removeInnerHTML()
            window.history.pushState({}, null, `${location.pathname}/`);
            window.dispatchEvent(new CustomEvent('location-changed'));
            this.slashed = true

        }
    }

    _setContent(cont, query) {
        let content = JSON.parse(atob(cont))
        if (content instanceof Array === true) {
            this.set('contents', content)
        }
        this.set('add', (query.add === 'true'));
        this.slashed = false;
        this.removed = false;
    }

    _getContent() {
        return this.contents
    }
}
customElements.define(cmsArticleView.is, cmsArticleView);