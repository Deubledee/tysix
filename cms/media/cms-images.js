import { html } from '@polymer/polymer/polymer-element.js';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import '../media/cms-image';
import './cms-image-item'
class cmsImages extends cmsMiddlePageTemplate {
    static get _getShoutAnchor() {
        let template = document.createElement('template')
        template.innerHTML = `
            <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
                <a id="reset" href="[[rootPath]]media/images[[Seach]]" on-click="reset">                
                    <paper-icon-button  icon="arrow-back" aria-label="Go back">
                    </paper-icon-button>
                </a>
            </iron-selector>         
            <div>
                <paper-button id="saveButton" class="diferent" aria-label="mode-save">
                    [[Save]]
                </paper-button>
            </div> `
        return template
    }

    static get _getSilentAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
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
        </iron-selector>
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
                    to-content="[[contentto]]" 
                    return-path="[[returnPath]]"
                    save-button="[[saveButton]]" 
                    reset-button="[[resetButton]]"
                    lang="[[lang]]" 
                    query="[[query]]"
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
                    return MyAppGlobals.translator
                }
            },
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
        this.$.reset.addEventListener('click', (this.reset).bind(this))
        window.addEventListener('reset', (this.reset).bind(this))
        this.saveButton = this.$.saveButton
        this.resetButton = this.$.reset
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
        if (Boolean(active) === true && Boolean(routeData.page) === true && routeData.page === "view-images") {
            this.slashed = false;
            this.set('Seach', location.search)
            this.set('add', false)
            if ('addimageto' in query) {
                this.set('add', true)
                this.set('contentto', JSON.parse(atob(query.content)))
            }
        }
    }
    _setContent(cont) {
        this.slashed = false;
        this.removed = false;
        this.set('inform', cont.info)
        return cont.content
    }
    reset() {
        this.routeData.page = ''
        this.slashed = true;
        this.imageData = []
    }
}
customElements.define(cmsImages.is, cmsImages);