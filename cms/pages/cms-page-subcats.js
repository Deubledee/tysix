import { cmsListTemplate } from '../templates/cms-list-template';
import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/editor-icons';
import '../styles/cms-comon-style_v3';
import '../sub-categories/cms-subcats'
import '../sub-categories/cms-subcats-item'
import { cmsSubcatsLib } from '../tools/cms-save-lib.js';
export class cmsPageSubcats extends cmsSubcatsLib(cmsListTemplate) {
    static get _getStyles() {
        return html` 
        <style include="cms-comon-style_v3">
            :host {
                position: relative;
            }
            div[scroll]{
                overflow-x: auto;
                overflow-y: hidden;
                margin-bottom: 12px;
            }
            div[scroll]::-webkit-scrollbar-track {
                background-color: var(--app-scrollbar-color)
            }
            div[scroll]::-webkit-scrollbar {
                height: 5px
            }
            div[scroll]::-webkit-scrollbar-thumb {
                background-color: var(--app-primary-text-color)
            }
            div[goback]{
                height: 38px;
                display: flex;
                padding-left: 10px;
            }
            paper-button{
                height: auto
            }
            div[path]{
                padding-left: 12px
            }
            div[path] h4{
                padding-left: 12px;
                font-style: italic;
            }
        </style>`
    }
    static get _getLangAnchor() {
        return html`      
        <div langdiv>
            <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                <a href="" on-click="_addSubCategory">
                    <paper-icon-button  name="[[itemLabel]]" icon="av:library-add"   aria-label="mode-edit">
                    </paper-icon-button> 
                       add [[subcatLabel]]
                </a>
            </iron-selector>
        </div>
        `
    }
    static get _getContentItems() {
        return html`
        <div container>
            <div bottom hidebottom$="[[hidebottom]]"> 
                <section class="flexchildbotomFull">  
                    <cms-subcats id="subcats"
                        sub-sub-cats="{{subSubCats}}"
                        user="{{user}}"
                        add="{{addSubCategory}}"
                        route="{{route}}">                    
                    </cms-subcats>  
                </section>
            </div>
        </div>`
    }
    static get _getSideInfo() {
        return html`
        <!--dom-repeat repeat items="[[inform]]" as="cat">
            <template-->
                <div class="center-menu">
                    <aside class="info">
                        <span>
                            [[info]]
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
                    <aside>
                        <span>
                            [[publishedby]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[publiShed]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datepublished]]
                        </span>
                    </aside>
                </div>
                <div class="center-menu">
                    <aside class="asideBackgrc">
                        <span>
                            [[ _getPublishedBy(cat.publishedBy)]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc" published$="[[cat.published]]">
                        <span>
                            [[cat.published]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.datePublished]]
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
                    <aside>
                        <span>
                            [[author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datecreated]]
                        </span>
                    </aside>
                </div>
                <div class="center-menu">
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.author]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.dateAdded]]
                        </span>
                    </aside>
                </div>
                <div class="center-menu">
                    <aside>
                        <span>
                            [[lastmodified]]
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
                    <aside>
                        <span>
                            [[author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[date]]
                        </span>
                    </aside>
                </div>
                <div rightSide>
                    <!--dom-repeat repeat items="[[cat.lastModified]]" as="createdAt">
                        <template-->
                            <section>
                                <aside class="asideBackgrc">
                                    <span>
                                        [[createdAt.author]]
                                    </span>
                                </aside>
                                <aside class="asideBackgrc">
                                    <span>
                                        [[createdAt.date]]
                                    </span>
                                </aside>
                            </section>
                        <!--/template>
                    </dom-repeat-->
                </div>
            <!--/template>
        </dom-repeat-->`
    }
    static get is() { return 'cms-page-subcats'; }
    static get properties() {
        return {
            content: {
                type: Array,
                notify: true,
                value: []
            },
            subSubCats: {
                type: Array,
                notify: true,
                value: []
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            lang: {
                type: String,
                value: '',
                notify: true
            },
            langs: {
                type: Object,
                value: {}
            },
            itemLabel: {
                type: String,
                value: '',
                notify: true
            },
            lastpagesubs: {
                type: String,
                value: '',
                notify: true
            },
            addSubCategory: {
                type: Boolean,
                value: false,
                notify: true
            },
            add: Boolean,
            time: Number
        };
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, query)'
        ];
    }
    _log(data) {
        console.log(data)
    }
    ready() {
        super.ready();
        this.translator.target('cms-content-image', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-content-image', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-content-image', 'setLangObject')
    }
    _setLObj(res, querySnapshot) {
        if ('data' in querySnapshot) {
            let langs = querySnapshot.data()
            res.call(this, langs);
        }
    }
    _setLang(res, lang) {
        this.lang = lang
        res.call(this);
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeLang.call(this)
    }
    _routePageChanged(routeData, query) {
        if (routeData.page === "subcategory-pages" && (!!query.content || !!query.reset)) {
            let parent = query.content
            if (!!this.lastpagesubs && !query.reset)
                this.lastpagesubs = atob(localStorage.getItem('lastpagesubs'))
            if (!this.lastpagesubs.includes(parent) || (!!query.reset && query.reset === 'true')) {
                localStorage.setItem('lastpagesubs', btoa(parent))
                this.lastpagesubs = parent
                this.subSubCats = []
                this.$.subcats._reset(() => {
                    this.getTopSubcats(parent)
                }, 250)
            } else
                if (!!query.reset && query.reset === 'false') {
                    window.dispatchEvent(new CustomEvent('changecolor', { detail: query }))
                }

        }
    }
    _addSubCategory(evt) {
        evt.preventDefault()
        this.addSubCategory = true
    }
}

customElements.define(cmsPageSubcats.is, cmsPageSubcats);