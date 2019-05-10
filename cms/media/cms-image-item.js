import { cmsItemTemplate } from '../templates/cms-item-template'
import { html } from '@polymer/polymer/polymer-element';
export class cmsImageItem extends cmsItemTemplate {
    static get _getElement() {
        return html`
        <dom-repeat repeat items="[[content]]" as="item">
            <template>                
                <article centerImageItem>
                    <div>
                        <shop-image
                            class="bigger"
                            aria-label="image"
                            title="[[item.title]]" 
                            src="[[item.url]]" 
                            alt="[[item.title]]">
                        </shop-image> 
                    </div>
                    <div>
                        [[item.title]]
                    </div>
                    <div>
                        [[item.dateAdded]]
                    </div>
                    <div class="paddingSmall">
                            <h3 title="[[item.gallery]]"> 
                                [[item.gallery]]
                            </h3>
                    </div>
                    <div>
                        [[item.url]] 
                    </div>
                    <div>
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
            saveButton: Object,
            noItem: {
                type: Array,
                value: [{
                    "image": [],
                }]
            }
        };
    }
    ready() {
        super.ready();
    }
    _putRow(item) {
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
        if (this.toContent instanceof Array) {
            this.toContent.image.push(image)
        } else {
            this.toContent.image.push(image)
        }
        if (this.saveButton.classList.contains('diferent') === true) {
            this.saveButton.classList.remove('diferent')
            this.resetButton.classList.add('diferent')
        }
    }
    __add(event) {
        if (event.srcElement.classList.contains('added') === false) {
            event.srcElement.classList.add('added')
            this._addImage(this.image)
        } else {
            event.srcElement.classList.remove('added')
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