//import { cmsListTemplate } from '../templates/cms-list-template';
import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/editor-icons';
import '../styles/cms-comon-style_v3';
import '../sub-categories/cms-subcats'
import '../sub-categories/cms-subcats-item'
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { cmsSubcatsLib } from '../tools/cms-save-lib.js';
import { html as litHtml, render } from 'lit-html';
export class cmsPageSubcats extends cmsSubcatsLib(cmsMiddlePageTemplate) {
    static get _getSilentAnchor() {
        return html`    
                <a href="" on-click="_addSubCategory">
                    <div class="add-btn-group" title="[[ADD]]">
                        <div class="add-btn-group-item group-item-top-left" ></div>

                        <div class="add-btn-group-item group-item-top-right"></div>

                        <div class="add-btn-group-item group-item-bottom-left"></div>

                        <div class="add-btn-group-item group-item-bottom-right"></div>
                    </div> 
                </a>            
        `
    }
    static get _topLabel() {
        return html`       
            <h3 class="higherh3">[[subcatLabel]]</h3>       
            <h5 class="higherh5"> category - [[query.content]]  </h5> 
        `
    }

    static get _getBottom() {
        return html`              
        <div class="count">
            <span> [[subSubCats.length]] </span>
        </div>               
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4 title="[[viewedit]]"> [[viewedit]] </h4>
            </div>
        </section>                           
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4 title="[[item]]"> [[item]] </h4>   
            </div>
        </section>     
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4 title="[[type]]"> 
            [[type]]     </h4>     
        </section>                            
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4 title="[[delete]]"> 
            [[delete]]   </h4>   
            </div>
        </section>`
    }

    static get _getTable() {
        return html`
            <div table class="scroll"> 
                <cms-subcats id="subcats"
                    sub-sub-cats="{{subSubCats}}"
                    user="{{user}}"
                    add="{{addSubCategory}}"
                    route="{{route}}">      
                </cms-subcats> 
            </div>
        `}

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
                notify: true
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
            '_routePageChanged(routeData.page, query)'
        ];
    }
    _log(data) {
        console.log(data)
    }

    ready() {
        super.ready();
        this.translator.target('cms-subcats', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-subcats', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-subcats', 'setLangObject')
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
    _routePageChanged(page, query) {
        if (typeof this.time === 'number') clearInterval(this.time)
        let reset = (query.reset === 'true')
        if (page === "subcategory-pages" && (!!query.content)) {
            if (!query.reset || !!reset) {
                let parent = query.content
                if (this.lastpagesubs === parent && !query.reset) {
                    this.lastpagesubs = atob(localStorage.getItem('lastpagesubs'))
                    return
                } else
                    if (this.lastpagesubs !== parent || !!reset) {
                        this.spinner.active = true

                        localStorage.setItem('lastpagesubs', btoa(parent))
                        this.lastpagesubs = parent
                        this.subSubCats = []
                        this.time = setTimeout(() => {
                            afterNextRender(this, () => {
                                this.getTopSubcats(this.lastpagesubs)
                                    .then(done => {
                                        if (!!done && done.length > 0) {
                                            this.spinner.active = false
                                            this.subSubCats = done
                                        } else {
                                            this.subSubCats = ''
                                        }
                                    }).catch(this.standartErr)

                                afterNextRender(this, () => {
                                    if (!!reset) {
                                        this.time = setTimeout(() => {
                                            window.history.pushState({}, null, `${this.rootPath}content/pages/subcategory-pages?content=${this.query.content}`);
                                            window.dispatchEvent(new CustomEvent('location-changed'))
                                        }, 500)
                                    }
                                });
                            });
                        }, 60)
                    }
            } else
                if (!reset) {
                    window.dispatchEvent(new CustomEvent('changecolor', { detail: query }))
                    window.history.pushState({}, null, `${this.rootPath}content/pages/subcategory-pages?content=${this.query.content}`);
                    window.dispatchEvent(new CustomEvent('location-changed'))
                }

        }
    }
    _addSubCategory(evt) {
        evt.preventDefault()
        this.addSubCategory = true
    }
}

customElements.define(cmsPageSubcats.is, cmsPageSubcats);
