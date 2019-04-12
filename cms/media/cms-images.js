import { html } from '@polymer/polymer/polymer-element.js';
import { cmsContentImageTemplate } from '../templates/cms-content-image-template';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import '../media/cms-image';
import './cms-image-item'
class cmsImages extends cmsContentImageTemplate {

    static get _getAnchor() {
        let template = document.createElement('template')
        template.innerHTML = `
            <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
                <a id="reset" href="[[rootPath]]media/images">
                    <paper-icon-button  icon="arrow-back" aria-label="Go back">
                    </paper-icon-button>
                </a>
            </iron-selector>         
            <div>
                <paper-button id="saveButton" class="diferent" aria-label="mode-save">
                    SAVE
                </paper-button>
            </div> `
        return template
    }

    static get _getContentAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a href="[[rootPath]]media/images/add-images?&add=true">
                <paper-tab name=" add-category-pages">
                    [[articles]] <span class="spanpadding"> images </span>
                    <paper-icon-button-light>
                        <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                    </paper-icon-button-light>
                </paper-tab>
            </a>
        </iron-selector>
        `
    }
    static get _slotElement() {
        let template = html`
                <dom-repeat items="[[contents]]" as="item">
                    <template>
                        <cms-image 
                            add-to="{{add}}" 
                            to-content="[[contentto]]" 
                            return-path="[[returnPath]]"
                            save-button="[[saveButton]]" 
                            reset-button="[[resetButton]]"
                            lang="[[lang]]" 
                            images="[[item]]">
                        </cms-image>
                    </template>
                </dom-repeat>`
        return template
    }
    static get is() { return 'cms-images'; }

    static get properties() {
        return {
            lang: {
                type: String,
                notify: true
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
            images: {
                type: Array,
                notify: true,
                observer: '_log'
            },
            user: {
                type: Object,
                notify: true,
            },
            contents: {
                type: Array,
                notify: true,
                computed: '_setContent(images)'
            },
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, active)'
        ];
    }
    _log(data) {
        console.log(data)
    }
    ready() {
        super.ready()
        this.$.reset.addEventListener('click', (this.reset).bind(this))
        window.addEventListener('reset', (this.reset).bind(this))
        this.saveButton = this.$.saveButton
        this.resetButton = this.$.reset
    }

    _routePageChanged(routeData, active) {
        // console.log(query)
        if (Boolean(active) === true && Boolean(routeData.page) === true && routeData.page === "view-images") {
            this.slashed = false;
        }
        if (Boolean(active) === false && routeData.page === "view-images") {
            this.reset()
        }

    }
    _log(data) {
        console.log(data)
    }
    _setContent(cont) {
        this.slashed = false;
        this.removed = false;
        return cont.content
    }
    reset(event) {
        this.routeData.page = ''
        this.set('images', [{}]);
        this.set('add', false);
        this.slashed = true;
        window.onbeforeunload = function () { };
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('reset-html', { detail: 'reset-html' }))
        })
        console.log(event, this.images)
    }

}
customElements.define(cmsImages.is, cmsImages);