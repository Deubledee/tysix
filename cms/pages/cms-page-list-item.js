
import { cmsItemTemplate } from '../templates/cms-item-template'
import { html } from '@polymer/polymer/polymer-element';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
class cmsPageListItem extends cmsItemTemplate {
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
    static get is() { return 'cms-page-list-item'; }
    static get properties() {
        return {
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals.translator
                }
            },
        };
    }
    ready() {
        super.ready();
    }
    _putRow(data) {
        this.translator.template.innerHTML = `
           <article centerListItem slot="table">
               <div>   
                <span> 
                   <paper-button> ${data.items[0].categoryName}</paper-button>
                </span>
               </div>
               <div>
                   <paper-button>
                       <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>                   
                       <paper-icon-button  icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                   </paper-button> 
               </div>  
               <div>
                   <paper-button>
                       <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>                   
                       <paper-icon-button  icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                   </paper-button> 
               </div> 
               <div>                   
                <span> 
                    <paper-button> ${data.items[0].type} </paper-button>
                </span>
               </div>   
               <div class="${data.info[0].published}">
                   
                <span> 
                    <paper-button> ${data.info[0].published} </paper-button>
                </span>
               </div>   
               <div>
                    <paper-button>
                        <paper-icon-button icon="av:not-interested" aria-label="mode-delete"></paper-icon-button> 
                    </paper-button> 
                </div>
           </article>`;
        this.translator.clone(this)
        this.children[0].children[1].
            children[0].addEventListener('click', (this.showPage).
                bind(this));
        this.children[0].children[2].
            children[0].addEventListener('click', (this.showCats).
                bind(this));
        this.children[0].children[4].
            children[0].addEventListener('click', (this._confirmPublish).
                bind(this));
        this.children[0].children[5].
            children[0].addEventListener('click', (this._openConfirm).
                bind(this));
    }
    _getPagename(cats) {
        return cats;
    }
    error(data) {
        console.error('error from cms-article-viewer', data);
    }
    deSpin() {
        this.$.spinner.active = !this.$.spinner.active;
    }
    showPage() {
        let string = window.btoa(`${JSON.stringify(this.page)}`);
        window.history.pushState({}, null, `content/pages/edit-category-pages?content=${string}&add=false`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }
    showCats() {
        let string = window.btoa(`${JSON.stringify(this.page)}`);
        window.history.pushState({}, null, `content/pages/edit-subcategory-pages?content=${string}&add=false`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }
    __delete(data) {
        this.translator._DBW.deletePage((msg) => {
            if (msg !== 'error') {
                console.log(msg);
                this.__reset()
            }
            else {
                console.error(msg);
            }
        }, data, this.translator.__DEV);
    }
    __publish(data) {
        console.log(data)
    }
    _openConfirm() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: {
                    name: this.page.items[0].categoryName, method: (this.__delete).bind(this),
                    argument: this.page.id, headderMsgKind: 'delete', type: 'categoryPage'
                }
            }));
        });
    }
    _confirmPublish() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: {
                    name: this.page.name, method: (this.__publish).bind(this),
                    argument: '!!to be done!!', headderMsgKind: 'publish', type: 'categoryPage'
                }
            }));
        });
    }
    __reset() {
        this._debounceEvent = Debouncer.debounce(this._debounceEvent, microTask, () => {
            window.dispatchEvent(new CustomEvent('reset-list-type', {
                bubbles: true, composed: true
            }));
        });
    }
}
customElements.define(cmsPageListItem.is, cmsPageListItem);