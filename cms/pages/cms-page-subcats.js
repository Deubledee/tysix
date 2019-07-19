import { cmsContentTemplate } from '../templates/cms-content-template';
import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/editor-icons';
import '../styles/cms-comon-style_v3';
import '../sub-categories/cms-subcats'
import '../sub-categories/cms-subcats-item'
export class cmsPageSubcats extends cmsContentTemplate {
    static get _getStyles() {
        return html` 
        <style include="cms-comon-style_v3">
            :host {
                position: relative;
            }
            .navbottom{
                margin-top: 48px;  
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
        </style>`
    }
    static get _getAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a id="anchor">
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
            <a>
                <paper-button>
                    [[subcatLabel]]
                </paper-button>
                <paper-icon-button  name="[[itemLabel]]" icon="av:library-add"  on-click="_addSubCategory" aria-label="mode-edit">
                </paper-icon-button> 
            </a>
        </iron-selector>`
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
                    <aside>
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
                    return MyAppGlobals.translator
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
        this.$.anchor.setAttribute('href', `${this.rootPath}content/pages`)
        this.$.subcats.onSave = (this._Save).bind(this)
        this.$.subcats.setInfo = (this.setInfo).bind(this)
        this.$.subcats.getInfo = (this.getInfo).bind(this)
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
        if (routeData.page === "edit-subcategory-pages" || routeData.page === "add-subcategory-pages") {
            let subs = query.content
            if ('content' in query) {
                this._resetSubCats()
                if (typeof this.time === 'number') {
                    clearTimeout(this.time)
                }
                this.translator._DBW.getPageData((done) => {
                    this.set('inform', [done.info])
                }, { name: subs, dataType: "subCategoriesInfo" })

                this.time = setTimeout(() => {
                    this.translator._DBW.queryPageData((done) => {
                        this.set('subSubCats', done)
                    }, { name: subs, dataType: "subCategories", query: 'top,==,true' })/* */
                }, 120)
            }
            // this._resetSubCats()
            /*  if ('indexarr' in query) {
                  let subs = JSON.parse(this.content).subCategories
                  let temp = query.indexarr.split(',')
              }  */
        }
    }

    getInfo(data) {
        this.translator._DBW.getSubcatsInfo((done) => {

        }, { name: '' }, this.translator.__DEV)
    }

    setInfo(data) {
        this.translator._DBW.setSubcatsInfo((msg) => {

        }, { name: data.id, info: data.type, doc: data.info }, this.translator.__DEV)
    }

    _Save(add, idx) {
        this.content = JSON.parse(this.content)
        this.add = add
        let index = parseInt(idx) === parseInt(idx) ? idx : (this.$.subcats.childElementCount - 1) //avoid NaN
        let temp = this.content.subCategories
        if (this.add === 'false' || this.add === false) {
            if (this.subSubCats.constructor === [].constructor) {
                console.log(this.subSubCats, temp, idx)
                if (index === 0) {
                    temp.splice(0, 1)
                } else {
                    temp.splice(index, index)
                }
                this.content.subCategories.push(this.subSubCats.pop())
            }
        }
        if (this.add === 'true' || this.add === true) {
            if (this.subSubCats.constructor === [].constructor) {
                this.content.subCategories = this.subSubCats
            }
        }
        this.save(() => {
            this.routeData = {}
            this.query = {}
        })
    }
    _addSubCategory() {
        this.addSubCategory = true
    }
    _resetSubCats() {

        this.$.subcats._reset(() => { })
    }
}
customElements.define(cmsPageSubcats.is, cmsPageSubcats);