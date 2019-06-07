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

        <slot name="table"></slot> 
            `;
    }
    static get is() { return 'cms-gallery-item'; }

    static get properties() {
        return {
            add: {
                type: Boolean,
                notify: true
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals.translator
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
            addImageTo: {
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
    }
    _putRow(data) {
        let template = `
            <article centerListItem slot="table">
                <div>
                    <span> 
                        <paper-button>
                            ${this._getGalleryName(data.content[0])}
                        </paper-button>
                    </span>
                </div>
                <div>
                    <paper-button>
                        <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>                   
                        <paper-icon-button  icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                    </paper-button>
                </div> 
                <div>
                    <paper-icon-button icon="av:not-interested" aria-label="mode-delete">
                    </paper-icon-button>      
                </div>
            </article>`;

        this.translator.template.innerHTML = template
        this.translator.clone(this)
        this.children[this.childElementCount - 1].children[1].
            children[0].addEventListener('click', (this._showImages).
                bind(this));
        this.children[this.childElementCount - 1].children[2].
            children[0].addEventListener('click', (this._openConfirm).bind(this));
        this.children[this.childElementCount - 1].children[2].
            children[0].setAttribute('id', "item-" + (this.childElementCount - 1))
    }
    _getGalleryName(gall) {
        return gall.gallery;
    }
    _showImages() {
        this.set('images', [])
        this.set('images', this.gallery)
        this.default()
        if (this[this.addImageTo] !== undefined) {
            this[this.addImageTo]()
        }
    }
    default() {
        window.history.pushState({}, null, `/media/images/view-images${location.search}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }
    editArticles() {
        this.set('returnPath', 'content/articles/edit-articles')
    }
    editPages() {
        this.set('returnPath', 'content/pages/add-category-pages')
    }
    deleteGallerie(data) {
        console.log(this.gallery.content[data])
        /* Consts._DBW.deleteMediaGallery((done, err) => {
             if (done !== 'error') {
                 this.setter = true
             } else {
                 console.error(err)
             }
         }, data)*/
    }
    _openConfirm(event) {
        let index = event.srcElement.id.split('-').pop()
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer,
            microTask, () => {
                this.dispatchEvent(new CustomEvent('confirm', {
                    bubbles: true, composed: true,
                    detail: {
                        name: this._getGalleryName(this.gallery.content[0]), method: (this.deleteGallerie).bind(this),
                        argument: index, headderMsgKind: 'delete', type: 'gallery'
                    }
                }))
            }
        )
    }
}
customElements.define(cmsGalleryItem.is, cmsGalleryItem);