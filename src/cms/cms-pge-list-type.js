import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import './cms-page-list-item.js';
import './cms-page-content.js';
class cmsPgeListType extends PolymerElement {
    static get template() {
        return html
            `<style include="cms-common-styles"> 
            
        </style>
        <paper-spinner id="spinner" active></paper-spinner> 
        <dom-repeat items="[[pages]]" as="page">
          <template>
            [[putElement(index, page)]]
          <slot></slot>
          </template>
        </dom-repeat>`
    }

    static get is() { return 'cms-page-list-type'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
            },
            pages: {
                type: Object,
                notify: true,
                observer: 'deSpin'

            },
            categorie: {
                type: Object,
                notify: true
            },
            image: {
                type: Object,
                notify: true,
                observer: 'sendImage'
            },
            setter: {
                type: String,
                notify: true,
                observer: 'resetCollor'
            },
            closed: {
                type: Boolean,
                notify: true,
            },
            confirm: {
                type: Boolean,
                notify: true,
                value: false,
            },
            setImage: {
                type: Object
            },
        }
    }

    sendImage(data) {
        console.log(data)
        //this.setImage.set(data)
    }

    _cancelImage() {
        this.image = {}
    }

    deSpin(data) {
        if (this.$.spinner.active === true) {
            this.$.spinner.active = false
        }
    }

    putElement(index, page) {
        let template = html`
        <cms-page-list-item>
            <cms-page-content>
            </cms-page-content>
        </cms-page-list-item>`
        this.append(template.content.children[0])
        this.children[index].page = page
    }

    _openImagevVewer(event) {
        if (this.$.viewer.style.display === 'block') {
            this.$.viewer.style.display = 'none'
            this.$.viewer.style.bottom = 'initial'
            this.$.viewer.style.height = '0px'
            this.setImage = {}
        } else {
            this.setImage = event.detail
            this.$.viewer.closeHead = true
            this.$.viewer.open = true
            this.$.viewer.show = false
            this.$.viewer.openMain = true
            this.$.viewer.set('killFormAndSet', true)
            this.$.viewer.style.display = 'block'
            this.$.viewer.style.height = '600px'
            this.$.viewer.style.bottom = '215px'
        }
    }

    delete(data) {
        let page = data
        this.DBW.deletePage((msg, done) => {
            if (msg !== 'error') {
                this.openConfirm()
                this.log(msg, done)
            } else {
                this.error(msg, done)
            }
        }, page)
    }

    openConfirm(event) {
        if (this.confirm === false) {
            this.$.confirm.openConfirm(event.model.__data.category)
            this.$.confirm.method = this.delete
            this.confirm = true
        }
    }

    deSpin(data) {
        if (this.$.spinner.active === true) {
            this.$.spinner.active = false
        }
    }
}

customElements.define(cmsPgeListType.is, cmsPgeListType);
