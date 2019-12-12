import { cmsItemTemplate } from '../templates/cms-item-template'
import { html } from '@polymer/polymer/polymer-element';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { html as litHtml, render } from 'lit-html';

export class cmsArticleItem extends cmsItemTemplate {
    static get _getStyles() {
        return html`
        shop-image{
            top: 1px; 
        }`
    }
    static get is() { return 'cms-article-item'; }
    static get properties() {
        return {
            article: {
                type: Array,
                notify: true,
                observer: '_putRow'
            },
            published: {
                type: String,
                reflectToAttribute: true
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            papgePath: {
                type: String,
                value: 'edit-articles'
            },
            objMedia: {
                type: Object,
                value: {}
            },
            objInfo: {
                type: Object,
                value: {}
            },
            objData: {
                type: Object,
                value: {}
            }
        };
    }
    ready() {
        super.ready();
    }
    _putRow(data) {
        let artInfo, artContent
        [artInfo, artContent] = data.map(item => {
            return item
        })
        this.objInfo = artInfo
        for (let item in artContent) {
            if (item === 'images' || item === 'videos') {
                this.objMedia[item] = artContent[item]
            } else {
                this.objData[item] = artContent[item]
            }
        }

        const articleTemplate = (objData, objInfo) => litHtml`
                   <article centerListItem slot="table">
                       <div>   
                           <span> 
                               <paper-button class="button-normal" @click="${(this.showPage).bind(this)}"> 
                                   ${objData.pt.articleName}
                               </paper-button>                        
                           </span>
                       </div>    
                       <div>   
                           <span> 
                               <paper-button class="button-normal"> 
                                   ${objData.pt.type}
                               </paper-button>                        
                           </span>
                       </div> 
                       <div >                    
                           <span> 
                               <paper-button class="button-normal">
                                   ${objInfo.category} 
                               </paper-button>
                           </span>
                       </div>  
                       <div>                    
                           <span> 
                               <paper-button  class="${objInfo.Published}" @click="${(this._confirmPublish).bind(this)}">
                                   ${objInfo.Published} 
                               </paper-button>
                           </span>
                       </div>   
                       <div>                    
                           <span> 
                               <paper-button class="button-normal">
                                   ${objInfo.stock} 
                               </paper-button>
                           </span>
                       </div> 
                       <div>
                            <paper-button class="button-del" @click="${this._openConfirm}">
                                <paper-icon-button icon="av:not-interested" aria-label="mode-delete">
                                </paper-icon-button> 
                            </paper-button> 
                       </div>
                   </article>`;
        render(articleTemplate(this.objData, this.objInfo), this);
        localStorage.setItem(`article-${this.objInfo.REF}-info`, JSON.stringify(this.objInfo))
        localStorage.setItem(`article-${this.objInfo.REF}-data`, JSON.stringify(this.objData))
        localStorage.setItem(`article-${this.objInfo.REF}-media`, JSON.stringify(this.objMedia))
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
        let arr = Object.keys(this.objData)
        window.history.pushState({}, null, `content/articles/edit-articles?content=${this.objInfo.REF}&add=false&lang=${arr[0]}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }

    showCats() {
        window.history.pushState({}, null, `content/pages/subcategory-pages?content=${this.objInfo[0].id}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }
    __delete(data) {
        this.page.removed = true
        // this.removePage(data, this.page)
    }
    __publish(data) {
        console.log(data)
    }
    _openConfirm() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: {
                    name: this.page.id, method: (this.__delete).bind(this),
                    argument: this.page.id, headderMsgKind: 'remove ?', type: 'page/category'
                }
            }));
        });
    }
    _confirmPublish() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: {
                    name: this.page.id, method: console.log,// (this.__publish).bind(this),
                    argument: '!!to be done!!', headderMsgKind: 'publish ?', type: 'page/category'
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
customElements.define(cmsArticleItem.is, cmsArticleItem);