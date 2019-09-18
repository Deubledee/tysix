//import { cmsListTemplate } from '../templates/cms-list-template';
import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/editor-icons';
import '../styles/cms-comon-style_v3';
import '../sub-categories/cms-subcats'
import '../sub-categories/cms-subcats-item'
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template';
import { cmsSubcatsLib } from '../tools/cms-save-lib.js';
export class cmsPageSubcats extends cmsSubcatsLib(cmsMiddlePageTemplate) {
    static get _getSilentAnchor() {
        return html`    
                <a href="" on-click="_addSubCategory">
                    <paper-icon-button  name="[[itemLabel]]" icon="av:library-add"   aria-label="mode-edit">
                    </paper-icon-button> 
                       [[ADD]]
                </a>            
        `
    }
    static get _topLabel() {
        return html`       
            <h3 class="higherh3">[[query.content]]</h3>       
            <h5 class="higherh5"> [[subcatLabel]] </h5> 
        `
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

    static get _getBottom() {
        return html`                      
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4 title="[[title]]"> [[title]] </h4>   
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
                <h4 title="[[viewedit]]"> [[viewedit]] </h4>
            </div>
        </section>                          
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4 title="[[delete]]"> 
            [[delete]]   </h4>   
            </div>
        </section>`
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
    _routePageChanged(routeData, query) {
        if (routeData.page === "subcategory-pages" && (!!query.content || !!query.reset)) {
            let parent = query.content
            console.log(document.querySelector('cms-controler'))
            if (this.lastpagesubs === parent && !query.reset) {
                this.lastpagesubs = atob(localStorage.getItem('lastpagesubs'))

                console.log('no reset')
                return
            } else
                if (this.lastpagesubs !== parent || (!!query.reset && query.reset === 'true')) {
                    this.translator.template.innerHTML = `<paper-spinner-lite active="false" slot="spinner">
                    </paper-spinner-lite>`
                    this.spinOut = false
                    this.translator.clone(this)
                    localStorage.setItem('lastpagesubs', btoa(parent))
                    this.lastpagesubs = parent

                    console.log(this.lastpagesubs, parent)
                    this.$.subcats._reset(() => {
                        this.getTopSubcats(this.lastpagesubs)

                    }, 550)
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