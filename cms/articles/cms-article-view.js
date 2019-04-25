
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import './cms-article';
import './cms-article-item';
import { Setter } from '../tools/cms-element-set';
const Consts = new Setter()
Consts.assets = Consts.getAssets('cms-article-view')
class cmsArticleView extends cmsMiddlePageTemplate {

    static get _getShoutAnchor() {
        return html`        
            <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
                <a id="reset" href="[[rootPath]]content/articles">
                    <paper-icon-button  icon="arrow-back" aria-label="Go back">
                    </paper-icon-button>
                </a>
            </iron-selector>`
    }
    static get _getSilentAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a href="[[rootPath]][[url]]">
                <paper-tab name=" add-category-pages">
                    <span class="spanpadding"> 
                        [[articles]] 
                    </span>
                    <paper-icon-button-light>
                        <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                    </paper-icon-button-light>
                </paper-tab>
            </a>
        </iron-selector>
        `
    }

    static get _getBottom() {
        return html` `
    }

    static get _getTable() {
        return html`
        <div table> 
            <dom-repeat items="[[contents]]" as="item">
                <template>
                    <cms-article article="[[item]]" route="[[routeData]]" lang="[[lang]]">
                    </cms-article>
                </template>
            </dom-repeat>
        </div>    `
    }

    static get _getNavside() {
        return html`
        <dom-repeat repeat items="[[info]]" as="detail">
            <template>
                <div class="flexsidecenter">
                    <aside>
                        <span>
                            [[Info]]
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                        [[Category]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                        [[articlecount]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                        [[Type]]
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                        <b> [[detail.id]]</b>
                        </span>
                    </aside>
                    <aside>
                        <span>
                        <b> [[detail.items]]</b>
                        </span>
                    </aside>
                    <aside>
                        <span>
                        <b> [[detail.type]]</b>
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                        [[Published]]
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                        <b> [[detail.publishedCount]] </b>
                        </span>
                    </aside>
                </div>
                <div rightSide>                            
                    <dom-repeat repeat items="[[detail.published]]" as="published">
                        <template>
                            <section>
                                <aside>
                                    <span>
                                        [[published.article]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[published.datePublished]]
                                    </span>
                                </aside>
                            </section>
                        </template>
                    </dom-repeat>
                </div>
            </template>
        </dom-repeat>
        `
    }
    static get is() { return 'cms-article-view'; }
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
            route: {
                type: Object,
                notify: true
            },
            user: {
                type: Object,
                notify: true,
            },
            contents: {
                type: Array,
                notify: true,
                value: new Array(),
                observer: '_killSpinner'
            },
            url: {
                type: String,
                notify: true,
            },
            obj: {
                type: Object,
                notify: true,
                value: {
                    contentText:
                        [{ description: "" }],
                    image: [],
                    info: [{
                        author: "",
                        dateAdded: "", publishedBy: [{
                            author: "",
                            date: "",
                            uid: ""
                        }],
                        unPublishedBy: [{
                            author: "",
                            date: "",
                            uid: ""
                        }]
                    }],
                    items: [{
                        brand: "",
                        category: "",
                        lang: "",
                        price: "",
                        stock: "",
                        title: "",
                        type: ""
                    }]
                }
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
        Consts.assets.then((querySnapshot) => {
            let langs = querySnapshot.data();
            Consts.setLangObject.call(this, langs);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
        this.$.reset.addEventListener('click', (this._removeInnerHTML).bind(this))
        window.addEventListener('reset', (this._removeInnerHTML).bind(this))
    }
    __changeLang() {
        Consts.changeLang.call(this)
    }
    _routePageChanged(routeData, query, active) {
        if (Boolean(active) === true && Boolean(routeData.page) === true && routeData.page === "view-articles") {
            if ('content' in query) {
                this._setContent(query.content, query)
                console.log
            }
        }
    }
    _setContent(cont, query) {
        let content = JSON.parse(atob(cont)), info
        info = content.info
        content = content.content
        if (content instanceof Array === true) {
            this.obj.items[0].type = query.type
            this.obj.items[0].category = query.category
            this.obj.info[0].author = this.user.displayName
            let obj = btoa(JSON.stringify(this.obj))
            this.url = `content/articles/add-articles?content=${obj}&add=true`
            this.set('contents', [])
            this.set('contents', content)
            this.set('info', [])
            this.set('info', info)
        }
        this.set('add', (query.add === 'true'));
        this.slashed = false;
    }
    _killSpinner(data) {
        if (data.length > 0 && this.childElementCount > 0 && this.children[0].getAttribute('slot') === 'spinner') {
            this.removeChild(this.children[0])
        }
    }
    _removeInnerHTML() {
        this.set('contents', []);
        this.set('info', [])
        this.set('add', false);
        this.slashed = true
        window.onbeforeunload = function () { };
    }

}
customElements.define(cmsArticleView.is, cmsArticleView);