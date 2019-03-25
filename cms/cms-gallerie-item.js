import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/paper-input/paper-input.js';
import { dataBaseworker } from './dataBaseWorker.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { microTask } from '@polymer/polymer/lib/utils/async.js';
class cmsGalleriesItem extends PolymerElement {
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
    static get is() { return 'cms-gallerie-item'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
            },
            gallerie: {
                type: Array,
                notify: true,
                observer: '_putRow'
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
                <paper-icon-button on-click="addImage" title="add to gallerie list" icon="av:playlist-add" aria-label="mode-edit">
                </paper-icon-button>
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
            children[0].addEventListener('click', (this.addImage).
                bind(this));
        this.children[0].children[2].
            children[0].addEventListener('click', (this._openConfirm).bind(this));
    }

    settg() {
        //  this.setg = this.gallerie
    }

    _getGalleryName(gall) {
        return gall.gallerie;
    }

    addImage() {
        this.dispatchEvent(new CustomEvent('add-image', {
            bubbles: true, composed: true,
            detail:
                { imageArray: this.gallerie.content, gallerie: this.gallerie.gallerie }
        }))
    }
    deleteGallerie(data) {
        this.DBW.deleteGallerie((done, err) => {
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
                    detail:
                        { name: this.gallerie.gallerie, method: (this.deleteGallerie).bind(this) }
                }))
            }
        )
    }
}
customElements.define(cmsGalleriesItem.is, cmsGalleriesItem);