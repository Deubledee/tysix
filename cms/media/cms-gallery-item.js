import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/paper-input/paper-input.js';
import { microTask } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsItemTemplate } from '../templates/cms-item-template';
import { Setter } from '../tools/cms-element-set';
import './cms-gallery-item';
const Consts = new Setter()

class cmsGalleryItem extends cmsItemTemplate {
    static get template() {
        return html`
        <style>    
        :host {
            position: relative;
            display: block;
        } 
                /* styles reside in cms-content*/
        </style>        
        <app-location route="{{route}}">
        </app-location> 
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route> 
        <slot name="table"></slot> 
            `;
    }
    static get is() { return 'cms-gallery-item'; }

    static get properties() {
        return {
            route: {
                type: Object,
                notify: true
            },
            add: {
                type: Boolean,
                notify: true
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            images: {
                type: Array,
                notify: true
            },
            query: String,
            returnPath: {
                type: String,
                notify: true
            },
            method: {
                type: String,
                notify: true,
                value: {}
            },
            gallery: {
                type: Array,
                notify: true,
                observer: '_putRow'
            },
            noItem: {
                type: Array,
                value: [{
                    "url": [],
                }]
            }
        }
    }
    ready() {
        super.ready()
        this.translator.template.innerHTML = `<paper-spinner-lite active="false" slot="spinner">
        </paper-spinner-lite>`
        this.spinOut = false
        this.translator.clone(this)
    }
    _putRow(data) {
        let template = `
             <article centerListItem slot="table">
                 <div>
                    <paper-button>
                        ${data.id}
                    </paper-button>
                    <paper-button>
                    <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button> 
                    </paper-button>
                 </div>
                 <div>
                     <paper-button>
                         <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button> 
                     </paper-button>
                 </div> 
                 <div>
                     <paper-button>
                         <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button> 
                     </paper-button>
                 </div> 
                 <div>
                     <paper-icon-button icon="av:not-interested" aria-label="mode-delete">
                     </paper-icon-button>      
                 </div>
             </article>`;

        this.translator.template.innerHTML = template
        this.translator.clone(this)

        /*  this.children[this.childElementCount - 1].children[0].children[0].
              addEventListener('click', (this._showImages).bind(this))*/

        this.children[this.childElementCount - 1].children[1].children[0].
            addEventListener('click', (this._showImages).bind(this))

        this.children[this.childElementCount - 1].children[3].children[0].
            addEventListener('click', (this._openConfirm).bind(this))
    }
    _showImages() {
        this.default()
        if (this[this.method] !== undefined) {
            this[this.method]()
        }/**/
    }
    default() {
        console.log(this.query)
        let string = !!location.search ?
            `/media/view-images${location.search}&gallery=${this.gallery.id}` :
            `/media/view-images?gallery=${this.gallery.id}`
        window.history.pushState({}, null, string);
        window.dispatchEvent(new CustomEvent('location-changed'));/**/
    }
    editArticles() {
        this.set('returnPath', 'content/articles/edit-articles')
    }
    editPages() {
        this.set('returnPath', 'content/pages/add-category-pages')
    }
    editSubCats() {
        this.set('returnPath', 'content/pages/add-subcategory-pages')
    }
    deleteGallerie(data) {
        console.log(data)

    }
    _openConfirm() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer,
            microTask, () => {
                this.dispatchEvent(new CustomEvent('confirm', {
                    bubbles: true, composed: true,
                    detail: {
                        name: this.gallery.id, method: (this.deleteGallerie).bind(this),
                        argument: this.gallery.id, headderMsgKind: 'remove ?', type: 'gallery'
                    }
                }))
            }
        )
    }
}
customElements.define(cmsGalleryItem.is, cmsGalleryItem);