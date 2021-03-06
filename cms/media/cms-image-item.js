import { IronCheckedElementBehavior } from '@polymer//iron-checked-element-behavior/iron-checked-element-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { html } from '@polymer/polymer/polymer-element';
import '../../src/shop-image';
import { cmsItemTemplate } from '../templates/cms-item-template';
import { cmsMediaLib } from '../tools/cms-save-lib.js';
export class cmsImageItem extends mixinBehaviors(IronCheckedElementBehavior, cmsMediaLib(cmsItemTemplate)) {
    static get _getStyles() {
        return html`         
            .thirty{
                height: 30px;
                text-transform: lowercase; 
            }
               `
    }
    static get _getElement() {
        return html`
            <dom-repeat repeat items="[[content]]" as="item">
                <template>                
                    <div centerImageItem>
                        <article class="padding">
                            <shop-image
                                class="bigger"
                                aria-label="image"
                                title="[[item.title]]" 
                                src="[[item.url]]" 
                                alt="[[item.title]]">
                            </shop-image> 
                        </article>
                        <article class="padding" title="[[item.title]]">
                            <paper-button  class="thirty" title="[[this.title]]">
                                [[item.title]]
                            </paper-button>
                        </article>
                        <article class="padding" title="[[item.dateCreated]]">
                            <paper-button  class="thirty" title="[[this.dateCreated]]">
                                [[item.dateCreated]]
                            </paper-button>
                        </article>
                        <article class="padding" title="[[item.type]]">
                            <paper-button class="thirty" title="[[this.type]]">
                                [[item.type]]
                            </paper-button>
                        </article>
                        <article class="padding" title="[[item.gallery]]"> 
                            <paper-button class="thirty" title="[[this.add]]" >
                                    [[item.gallery]]
                            </paper-button>
                        </article>
                        <article class="padding" title="[[item.addedTo]]">
                            <paper-button class="thirty" title="[[this.add]]">
                                [[item.addedTo]] 
                            </paper-button>
                        </article>
                        <article class="padding" title="[[item.url]]">
                            <paper-button class="thirty" title="[[this.add]]">
                                [[item.url]] 
                            </paper-button>
                        </article>
                        <article class="padding">
                            [[this.add]]
                            <dom-if if="[[add]]">
                                <template>
                                    <paper-button title="[[this.add]]" on-click="_checkUncheckAdd">
                                        <input title="[[image.uploaded]]" type="checkbox" aria-label="add" checked="{{checked::checked}}">
                                    </paper-button>
                                </template>
                            </dom-if>                            
                            <dom-if if="[[!add]]">
                                <template>
                                    <paper-button title="[[this.add]]" on-click="_checkDelete">
                                        <input title="[[image.uploaded]]" type="checkbox" aria-label="remove" checked="{{checked::checked}}">
                                    </paper-button>
                                </template>
                            </dom-if>
                        </article>  
                    </div> 
                </template>                            
            </dom-repeat>`
    }
    static get is() { return 'cms-image-item'; }
    static get properties() {
        return {
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            toAdd: {
                type: Array,
                notify: true,
                value: []
            },
            image: {
                type: Object,
                notify: true,
            },
            checked: {
                type: Boolean
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
        if (!!this.query) {
            this.set('add', !!this.query.type ? true : false)
        }
        if (!!item) {
            return [item]
        }
    }
    _checkUncheckAdd() {
        if (this.checked === true) {
            this.toAdd = this.toAdd.filter((item, idx) => { if (this.idx !== idx) { return item } })
        } else {
            this.toAdd.splice(this.idx, 0, this.image);
        }
        this.checked = !this.checked
    }
    _checkDelete(event) {
        console.log(event)
    }
    _removeImage(image) {

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