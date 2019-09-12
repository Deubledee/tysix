import { html } from '@polymer/polymer/polymer-element.js';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import '../media/cms-image';
import './cms-image-item'
class cmsImages extends cmsMiddlePageTemplate {
    static get _getShoutAnchor() {
        let template = document.createElement('template')
        template.innerHTML = `      
            <div>
                <a id="reset" href="[[rootPath]]media/images[[Seach]]">                
                    <paper-icon-button  icon="arrow-back" aria-label="Go back">
                    </paper-icon-button>
                </a>  
                <paper-button id="saveButton" class="diferent" aria-label="mode-save">
                    [[Save]]
                </paper-button>
            </div> `
        return template
    }

    static get _getSilentAnchor() {
        return html`
            <a href="[[rootPath]]media/images/add-images?&add=true">
                <paper-tab name=" add-category-pages">                        
                    <span class="spanpadding"> 
                    [[ADD]] [[images]]
                    </span>
                    <paper-icon-button-light>
                        <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                    </paper-icon-button-light>
                </paper-tab>
            </a>
        `
    }
    static get _getBottom() {
        return html`  
        `
    }
    static get _getTable() {
        let template = html`
            <div table> 
                <cms-image 
                    add-to="{{add}}" 
                    ad-tosub="[[adTosub]]" 
                    to-content="[[contentto]]" 
                    indexarr="[[indexarr]]"
                    return-path="[[returnPath]]"
                    save-button="[[saveButton]]" 
                    reset-button="[[resetButton]]"
                    lang="[[lang]]" 
                    route="[[route]]"
                    images="[[contents]]">
                </cms-image>
            </div>`
        return template
    }
    static get _getNavside() {
        return html`
        <dom-repeat repeat items="[[inform]]" as="detail">
            <template>
                <div class="flexsidecenter">
                    <aside>
                        <span>
                            [[info]]
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
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
                <div class="navsideright">
                    <aside>
                        <span>
                        <b> [[detail.author]] </b>
                        </span>
                    </aside>
                    <aside>
                        <span>
                        <b> [[detail.dateCreated]] </b>
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                        [[gallery]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                        [[itemCount]]
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                        <b> [[detail.gallery]] </b>
                        </span>
                    </aside>
                    <aside>
                        <span>
                        <b> [[detail.itemCount]] </b>
                        </span>
                    </aside>
                </div>
            </template>
        </dom-repeat>
        `
    }
    static get is() { return 'cms-images'; }

    static get properties() {
        return {
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            hidebottom: {
                type: Boolean,
                value: true,
                reflectToAttribute: true,
            },
            indexarr: Array,
            lang: {
                type: String,
                notify: true
            },
            langs: {
                type: Object,
                value: {}
            },
            Seach: {
                type: String,
                notify: true,
                value: ''
            },
            route: {
                type: Object,
                notify: true
            },
            add: {
                type: Boolean,
                notify: true
            },
            adTosub: {
                type: Boolean,
                notify: true
            },
            returnPath: {
                type: String,
                notify: true,
            },
            contentto: {
                type: Object,
                notify: true
            },
            resetButton: Object,
            saveButton: Object,
            imageData: {
                type: Array,
                notify: true
            },
            user: {
                type: Object,
                notify: true,
            },
            contents: {
                type: Array,
                notify: true,
                computed: '_setContent(imageData)'
            },
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, active, query)'
        ];
    }
    ready() {
        super.ready()
        this.translator.target('cms-page-list-type-content', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-page-list-type-content', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-page-list-type-content', 'setLangObject')
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
    _routePageChanged(routeData, active, query) {
        if (!!active && !!routeData.page && routeData.page === "view-images") {
            this.slashed = false;
            this.set('Seach', location.search)
            this.set('add', false)
            this.imageData
            if ('addimageto' in query) {
                this.set('add', true)
                if ('indexarr' in query) {
                    this.set('indexarr', query.indexarr.split(''))
                    this.adTosub = query.adTosub
                }
                this.set('contentto', query.content)
            }
        }
    }
    _setContent(cont) {
        console.log(cont)
        this.slashed = false;
        this.removed = false;
        this.set('inform', cont.info)
        return cont/**/
    }
    reset() {
        this.routeData.page = ''
        this.slashed = true;
        this.imageData = []
    }
}
customElements.define(cmsImages.is, cmsImages);