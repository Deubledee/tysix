import '@polymer/app-route/app-location';
import '@polymer/app-route/app-route';
import '@polymer/paper-input/paper-input.js';
import { microTask } from '@polymer/polymer/lib/utils/async.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { cmsItemTemplate } from '../templates/cms-item-template';
import { html } from '@polymer/polymer/polymer-element';
class cmsGalleryItem extends cmsItemTemplate {
    static get _getElement() {
        return html` 
            <div centerImageItem>
                <article class="padding">
                    <paper-button>
                        [[gallery.id]]
                    </paper-button>
                </article>  
                <article class="padding">
                    <paper-button on-click="_showImages">
                        <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show">
                        </paper-icon-button> 
                    </paper-button>
                </article> 
                <article class="padding">
                    <paper-button>
                        <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button> 
                    </paper-button>
                </article> 
                <article class="padding">
                    <paper-button on-click="_openConfirm">
                        <paper-icon-button icon="av:not-interested" aria-label="mode-delete">
                        </paper-icon-button>   
                    </paper-button> 
                </article>  
            </div> `;
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
                type: Object,
                notify: true,
                value: {}
            },
            galleryArray: {
                type: Array,
                notify: true,
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

    _showImages() {
        this.default()
    }
    default() {
        let string = !!location.search ?
            `/media/view-images${location.search}&gallery=${this.gallery.id}` :
            `/media/view-images?gallery=${this.gallery.id}`
        window.history.pushState({}, null, string);
        window.dispatchEvent(new CustomEvent('location-changed'));
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