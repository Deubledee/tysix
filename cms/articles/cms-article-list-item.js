import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-input/paper-input';
import { dataBaseworker } from '../tools/dataBaseWorker';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
const __DEV = true;
class cmsArticleListItem extends PolymerElement {
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
    static get is() { return 'cms-article-list-item'; }
    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker();
                },
                notify: true
            },
            page: {
                type: Object,
                notify: true,
                observer: '_putRow'
            },
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
    log(data) {
        console.log('log from cms-article-viewer', data);
    }

    _putRow(data) {
        let template = document.createElement('template')
        let str = `
        <article centerListItem slot="table">
            <div class="">
                <span> 
                    ${this._getPagename(data)}
                </span>
            </div>
            <div>
                <paper-button>
                    <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>                   
                    <paper-icon-button  icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                </paper-button> 
            </div>  
            <div class="padding">                
                <span class="${this._getPublished(data)}"> 
                    <paper-button> ${this._getPublished(data.items)} </paper-button>
                </span>
            </div>   
            <div class="padding">                
                <span class="${this._getPublished(data)}"> 
                    <paper-button> ${this._getPublished(data.publishedCount)} </paper-button>
                </span>
            </div> 
        </article>`;
        template.innerHTML = str
        let clone = document.importNode(template.content, true);
        this.appendChild(clone)

        this.children[0].children[1].
            children[0].addEventListener('click', (this.showPage).
                bind(this));
    }

    _getPagename(cats) {
        return cats.parent.split('_').join(' ')
    }
    _getPublished(cats) {
        return cats;
    }
    error(data) {
        console.error('error from cms-article-viewer', data);
    }
    deSpin() {
        this.$.spinner.active = !this.$.spinner.active;
    }
    showPage() {
        let string = this.page.items > 0 ? window.btoa(`${JSON.stringify(this.page.content)}`) : window.btoa(`${JSON.stringify(this.noItem)}`)
        window.history.pushState({}, null, `content/articles/view-articles?content=${string}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }
    __delete(data) {
        let page = data;
        this.DBW.deletePage((msg) => {
            if (msg !== 'error') {
                this.log(msg);
            }
            else {
                this.error(msg);
            }
        }, page, __DEV);
    }
    __publish() {
        console.log('!!to be done!!')
    }
    _openConfirm() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: { name: this._getPagename(this.page), method: (this.__delete).bind(this), headderMsg: 'delete category page' }
            }));
        });
    }
    _confirmPublish() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: { name: this._getPagename(this.page), method: (this.__publish).bind(this), headderMsg: 'publish', type: 'category page' }
            }));
        });
    }
}
customElements.define(cmsArticleListItem.is, cmsArticleListItem);