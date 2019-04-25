import { html } from '@polymer/polymer/polymer-element.js';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { Setter } from '../tools/cms-element-set';
import '../media/cms-image';
import './cms-image-item'
const Consts = new Setter()
Consts.assets = Consts.getAssets('cms-page-list-type-content')
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
                        [[LABEL]] 
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
                            [[Info]]
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                        [[categorycount]]
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                        <b> detail.categoryCount </b>
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                        [[Published]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                        [[categorypages]]
                        </span>
                    </aside>
                </div>
                <div rightSide>                            
                    <dom-repeat repeat items="[[detail.published]]" as="published">
                        <template>
                            <section>
                                <aside>
                                    <span>
                                        published.page
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        published.datePublished
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
    static get is() { return 'cms-images'; }

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
        Consts.assets.then((querySnapshot) => {
            let style = querySnapshot.data();
            Consts.setLangObject.call(this, style);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
        this.$.reset.addEventListener('click', (this.reset).bind(this))
        window.addEventListener('reset', (this.reset).bind(this))
        this.saveButton = this.$.saveButton
        this.resetButton = this.$.reset
    }
    __changeLang() {
        Consts.changeLang.call(this)
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
        return cont.content
    }
    reset() {
        this.routeData.page = ''
        this.slashed = true;
        this.imageData = []
        window.onbeforeunload = function () { };
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            window.dispatchEvent(new CustomEvent('reset-html'))
        })
    }
}
customElements.define(cmsImages.is, cmsImages);