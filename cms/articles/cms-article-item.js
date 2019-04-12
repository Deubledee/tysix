import { cmsItemTemplate } from '../templates/cms-item-template'
import { html } from '@polymer/polymer/polymer-element';
import { dataBaseworker } from '../tools/dataBaseWorker';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
const __DEV = true;
export class cmsArticleItem extends cmsItemTemplate {
    static get _getElement() {
        return html`
        <dom-repeat repeat items="[[content]]" as="item">
            <template>                
                <article centerlistitem>
                    <div class="paddingSmall">
                        <shop-image class="bigger" title="[[item.title]]" aria-label="image" src="[[_getImage(item)]]" 
                            alt="[[item.title]]">
                        </shop-image> 
                    </div>
                    <div class="paddingSmall" title="[[item.title]]">
                        <paper-button title="[[item.title]]"> 
                            [[item.title]]   
                        </paper-button> 
                    </div>
                    <div class="paddingSmall">
                        <iron-selector selected="[[papgePath]]" attr-for-selected="id" class="drawer-list" role="navigation">
                            <a id="edit-articles" href="[[rootPath]]content/articles/edit-articles[[hrefe]]">
                                <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>                   
                                <paper-icon-button  icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                            </a>                             
                        </iron-selector> 
                    </div>  
                    <div class="paddingSmall" title="[[item.stock]]">
                        <h3 title="[[item.stock]]"> 
                        [[item.stock]]
                        </h3>
                    </div>
                    <div class="paddingSmall" title="[[item.page]]">
                        <paper-button title="[[item.page]]"> 
                            [[item.type]] 
                        </paper-button>
                    </div>
                    <div class="paddingSmall" published$="[[item.published]]" title="[[item.published]]" on-click="_confirmPublish">
                        <paper-button title="[[item.published]]"> 
                            [[item.published]] 
                        </paper-button>
                    </div>
                    <div class="paddingSmall"> 
                        <paper-icon-button icon="av:not-interested" aria-label="delete"  on-click="_openConfirm">
                        </paper-icon-button>
                    </div>
                </article> 
            </template>                            
        </dom-repeat>
        `;
    }
    static get is() { return 'cms-article-item'; }
    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker();
                },
                notify: true
            },
            published: {
                type: String,
                reflectToAttribute: true
            },
            papgePath: {
                type: String,
                value: 'edit-articles'
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
    _putRow(item) {
        if (item.image[0] !== undefined) {
            this.set('content', [item])
            this.set('hrefe', this._showPage(item))
        }
    }
    _showPage(item) {
        let string = window.btoa(`${JSON.stringify([item])}`);
        return `?content=${string}&add=false`
    }
    _getParameter(item) {
        return item
    }
    _getImage(data) {
        return data.image[0].url
    }
    _openConfirm(event) {
        let index = event.srcElement.parentElement.getAttribute('value')
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: { name: this.content[index].name, method: (this._deleteImg).bind(this), argument: index, headderMsgKind: 'delete', type: 'article' }
            }));
        });
    }
    _confirmPublish(event) {
        let index = event.srcElement.parentElement.getAttribute('value')
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: { name: this.content[index].name, method: (this.__publish).bind(this), argument: index, headderMsgKind: 'publish', type: 'article' }
            }));
        });
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
}
customElements.define(cmsArticleItem.is, cmsArticleItem);