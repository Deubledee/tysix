import { cmsItemTemplate } from '../templates/cms-item-template'
import { html } from '@polymer/polymer/polymer-element';
import { dataBaseworker } from '../tools/dataBaseWorker';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
const __DEV = true;
export class cmsImageItem extends cmsItemTemplate {
    static get _getElement() {
        return html`
        <slot name="table"></slot>
        `
    }
    static get is() { return 'cms-image-item'; }
    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker();
                },
                notify: true
            },
            image: {
                type: Object,
                notify: true,
                observer: '_putRow'
            },
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
        window.addEventListener('reset', (this.reset).bind(this))
        window.addEventListener('reset-html', (this.reset).bind(this))
    }
    _putRow(item) {
        if (item.hasOwnProperty('title')) {
            let template = document.createElement('template')
            let str = `
         <article centerImageItem>
             <div>
                 <shop-image
                     class="bigger"
                     aria-label="image"
                     title="${this._getParameter(item.title)}" 
                     src="${this._getParameter(item.url)}" 
                     alt="${this._getParameter(item.title)}">
                 </shop-image> 
             </div>
             <div>
                 <paper-button title="${this._getParameter(item.title)}"> 
                 ${this._getParameter(item.title)}
                 </paper-button>
             </div>
             <div>
                 <paper-button title="${this._getParameter(item.dateAdded)}">
                 ${this._getParameter(item.dateAdded)}  
                 </paper-button>
             </div>
             <div class="paddingSmall">
                 <h3 title="${this._getParameter(item.gallery)}"> 
                     ${this._getParameter(item.gallery)} 
                 </h3>
             </div>
             <div>
                 <paper-button title="${this._getParameter(item.url)}"> 
                 ${this._getParameter(item.url)} 
                 </paper-button>  
             </div>
             <div>
                 <paper-button title="${this._getTitle(this.add)}">
                 ${this._getIcon(this.add)}
                 </paper-button>
             </div>
         </article> `
            template.innerHTML = str
            template.content.children[0].setAttribute('slot', 'table')
            var clone = document.importNode(template.content, true);
            this.appendChild(clone)
            if (this.add === false) {
                this.children[this.childElementCount - 1].children[5].setAttribute('value', this.childElementCount - 1)
                this.children[this.childElementCount - 1].children[5].children[0].addEventListener('click', (this._openConfirm).bind(this))
            }
            if (this.add === true) {
                this.children[this.childElementCount - 1].children[5].setAttribute('value', this.childElementCount - 1)
                this.children[this.childElementCount - 1].children[5].children[0].addEventListener('click', (this._add).bind(this))
            }
        }
    }
    reset() {
        this.innerHTML = ''
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
        console.log(this.toContent)
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
    _add(event) {
        if (event.srcElement.classList.contains('added') === false) {
            event.srcElement.classList.add('added')
            this._addImage(this.image)
        } else {
            event.srcElement.classList.remove('added')
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
    __delete(data) {
        let image = data;
        this.DBW.deletePage((msg) => {
            if (msg !== 'error') {
                this.log(msg);
            }
            else {
                this.error(msg);
            }
        }, image, __DEV);
    }
    _openConfirm() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: { name: this.image.title, method: (this.__delete).bind(this), argument: { index: this.childElementCount - 1 }, headderMsgKind: 'delete', type: 'image' }
            }));
        });
    }
}
customElements.define(cmsImageItem.is, cmsImageItem);