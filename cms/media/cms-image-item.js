import { cmsItemTemplate } from '../templates/cms-item-template'
import { html } from '@polymer/polymer/polymer-element';
export class cmsImageItem extends cmsItemTemplate {
    static get _getElement() {
        return html`
        <dom-repeat repeat items="[[content]]" as="item">
            <template>                
                <article centerImageItem>
                    <div class="padding">
                        <shop-image
                            class="bigger"
                            aria-label="image"
                            title="[[item.title]]" 
                            src="[[item.url]]" 
                            alt="[[item.title]]">
                        </shop-image> 
                    </div>
                    <div class="padding" title="[[item.title]]">
                        [[item.title]]
                    </div>
                    <div class="padding" title="[[item.dateAdded]]">
                        [[item.dateAdded]]
                    </div>
                    <div class="padding" title="[[item.gallery]]"> 
                            [[item.gallery]]
                    </div>
                    <div class="padding" title="[[item.url]]">
                        [[item.url]] 
                    </div>
                    <div class="padding">
                        <paper-button title="[[this.add]]" on-click="_add" value$="item-[[idx]]">
                            [[this.add]]
                            <dom-if if="[[add]]">
                                <template>
                                    <paper-icon-button icon="av:library-add" aria-label="add">
                                    </paper-icon-button>
                                </template>
                            </dom-if>                            
                            <dom-if if="[[!add]]">
                                <template>
                                    <paper-icon-button icon="av:not-interested" aria-label="delete">
                                    </paper-icon-button>
                                </template>
                            </dom-if>
                        </paper-button>
                    </div>
                </article> 
            </template>                            
        </dom-repeat>`
    }
    static get is() { return 'cms-image-item'; }
    static get properties() {
        return {
            image: {
                type: Object,
                notify: true,
            },
            value: {
                type: String,
                reflectToAttribute: true
            },
            res: {
                type: Object,
                notify: true,
                value: {}
            },
            content: {
                type: Array,
                notify: true,
                computed: '_putRow(image)'
            },
            idx: Number,
            delete: Object,
            resetButton: Object,
            toContent: Object,
            saveButton: Object
        };
    }
    ready() {
        super.ready();
    }
    _putRow(item) {
        if (this.resetButton !== undefined) {
            /* let reset = this.resetButton.onclick
             this.resetButton.onclick = {}*/
            this.resetButton.addEventListener('click', () => {
                if (this.addButton !== undefined) this.addButton.classList.remove('added')
                reset()
            }, false)
        }
        return [item]
    }
    _getIcon(add) {
        if (add === true) {
            return `
                <paper-icon-button icon="av:library-add" aria-label="add">
                </paper-icon-button>`
        }
        if (add === false) {
            return `
                <paper-icon-button icon="av:not-interested" aria-label="delete">
                </paper-icon-button>`
        }
    }
    _addImage(image) {
        this.res = JSON.parse(localStorage[`${this.query.addimageto}${this.query.parent}${this.query.content}`])
        let images = this.res[0].images.content
        images.push(image)
        localStorage[`${this.query.addimageto}${this.query.parent}${this.query.content}`] = JSON.stringify(this.res)
        if (this.saveButton.classList.contains('diferent') === true) {
            this.saveButton.classList.remove('diferent')
            this.resetButton.classList.add('diferent')
        }
    }

    _removeImage(image) {
        if (this.toContent instanceof Array) {
            this.toContent.image.s
        } else {
            this.toContent.image.push(image)
        }
        if (this.saveButton.classList.contains('diferent') === true) {
            this.saveButton.classList.remove('diferent')
        }
    }
    __add(event) {
        this.set('addButton', event.srcElement)
        if (this.addButton.classList.contains('added') === false) {
            let save = this.saveButton.onclick
            this.saveButton.onclick = {}
            this.saveButton.onclick = () => {
                this.addButton.classList.remove('added')
                save()
            }
            this.addButton.classList.add('added')
            this._addImage(this.image)
        } else {
            this.addButton.classList.remove('added')
            this._removeImage(this.idx)
        }
    }
    _add(event) {
        if (this.add === false) {
            this.delete(event)
        }
        if (this.add === true) {
            this.__add(event)
        }
    }
    _getTitle(add) {
        if (add === true) {
            return `add`
        }
        if (add === false) {
            return `delete`
        }
    }
}
customElements.define(cmsImageItem.is, cmsImageItem);