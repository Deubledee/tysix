
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsContentImageTemplate } from '../templates/cms-content-image-template';
import './cms-article';
import './cms-article-item'
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
    static get _getContentAnchor() {
        return html`
        <a href="[[rootPath]][[url]]">
            <paper-tab name=" add-category-pages">
                [[articles]] <span class="spanpadding"> articles </span>
                <paper-icon-button-light>
                    <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                </paper-icon-button-light>
            </paper-tab>
        </a>
        `
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
            url: {
                type: String,
                notify: true,
            },
            obj: {
                type: Object,
                notify: true,
                value: {
                    author: "",
                    brand: "",
                    category: "",
                    dateAdded: "",
                    description: "",
                    image: [],
                    lang: "",
                    name: "",
                    type: "",
                    price: "",
                    published: "NP",
                    publishedBy: [{
                        author: "",
                        date: "", "uid": ""
                    }], stock: "",
                    title: "",
                    nPublishedBy: [{
                        author: "",
                        date: "", "uid": ""
                    }]
                }
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

    _routePageChanged(routeData, query, active) {
        if (Boolean(active) === true && Boolean(routeData.page) === true && routeData.page === "view-articles") {
            if ('content' in query) {
                this._setContent(query.content, query)
            }
        }
        if (Boolean(active) === false && routeData.page === "edit-articles") {
            console.log("no view-articles")
        }
    }
    _setContent(cont, query) {
        let content = JSON.parse(atob(cont))
        if (content instanceof Array === true) {
            this.obj.type = query.type
            this.obj.category = query.category
            let obj = btoa(JSON.stringify([this.obj]))
            this.url = `content/articles/add-articles?content=${obj}&add=true`
            this.set('contents', [])
            this.set('contents', content)
        }
        this.set('add', (query.add === 'true'));
        this.slashed = false;
        this.removed = false;
    }
    _slotElement(item, index) {
        if (this.childElementCount === 0) {
            let template = html``
            template.content.children[0].setAttribute('slot', 'article' + index)
            let clone = document.importNode(template.content, true)
            this.appendChild(clone)
        }
    }

    static get _slotElement() {
        return html`
            <dom-repeat items="[[contents]]" as="item">
                <template>
                    <cms-article article="[[item]]" route="[[routeData]]" lang="[[lang]]">
                    </cms-article>
                </template>
            </dom-repeat>`
    }
    _removeInnerHTML() {
        this.set('contents', []);
        this.set('add', false);
        this.slashed = true
        //this.innerHTML = ''
        window.onbeforeunload = function () { };
    }

}
customElements.define(cmsArticleView.is, cmsArticleView);