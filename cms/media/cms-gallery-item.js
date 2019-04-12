import { cmsItemTemplate } from '../templates/cms-item-template'
import { html } from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-input/paper-input.js';
import { dataBaseworker } from '../tools/dataBaseWorker';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { microTask } from '@polymer/polymer/lib/utils/async.js';

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
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
            },
            add: {
                type: Boolean,
                notify: true
            },
            images: {
                type: Array,
                notify: true
            },
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
        let template = html`
        <article centerListItem slot="table">
            <div class="padding">

            </div>
            <div>
                <paper-button>
                    <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>                   
                    <paper-icon-button  icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                </paper-button>
            </div> 
            <div>
                <paper-icon-button on-click="openConfirm" icon="av:not-interested" aria-label="mode-delete">
                </paper-icon-button>      
            </div>
        </article>`;
        template.content.children[0].
            children[0].innerHTML = `
            <span> 
                ${this._getGalleryName(data)}
            </span>`;
        let clone = document.importNode(template.content, true);
        this.append(clone);
        this.children[0].children[1].
            children[0].addEventListener('click', (this._showImages).
                bind(this));
        this.children[0].children[2].
            children[0].addEventListener('click', (this._openConfirm).bind(this));
    }
    _getGalleryName(gall) {
        return gall.gallery;
    }
    _showImages() {
        this.set('images', []);
        this.set('images', this.gallery)
        this.default()
        if (this[this.addImageTo] !== undefined) {
            this[this.addImageTo]()
        }
    }
    default() {
        window.history.pushState({}, null, `/media/images/view-images`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }
    editArticles() {
        this.set('returnPath', 'content/articles/edit-articles')
    }
    editPages() {
        this.set('returnPath', 'content/pages/add-category-pages')
    }
    deleteGallerie(data) {
        this.DBW.deleteMediaGallery((done, err) => {
            if (done !== 'error') {
                this.setter = true
            } else {
                console.error(err)
            }
        }, data)
    }
    _openConfirm(event) {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer,
            microTask, () => {
                this.dispatchEvent(new CustomEvent('confirm', {
                    bubbles: true, composed: true,
                    detail: {
                        name: this.gallery, method: (this.deleteGallerie).bind(this),
                        argument: this.gallery, headderMsgKind: 'delete', type: 'gallery'
                    }
                }))
            }
        )
    }
}
customElements.define(cmsGalleryItem.is, cmsGalleryItem);