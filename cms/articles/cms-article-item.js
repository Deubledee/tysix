import { cmsItemTemplate } from '../templates/cms-item-template'
import { html } from '@polymer/polymer/polymer-element';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { html as litHtml, render } from 'lit-html';
import { cmsArticlesLib } from '../tools/cms-save-lib.js';

export class cmsArticleItem extends cmsArticlesLib(cmsItemTemplate) {
    static get _getStyles() {
        return html`
        shop-image{
            top: 1px; 
        }`
    }
    static get is() { return 'cms-article-item'; }
    static get properties() {
        return {
            user: {
                type: Object,
                notify: true,
            },
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
                                   ${objInfo.categories[0]} 
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
                            <paper-button class="button-del" @click="${(this._openConfirm).bind(this)}">
                                <paper-icon-button icon="av:not-interested" aria-label="mode-delete">
                                </paper-icon-button> 
                            </paper-button> 
                       </div>
                   </article>`;
        render(articleTemplate(this.objData, this.objInfo), this);
        localStorage.setItem(`article-${this.objInfo.id}-info`, JSON.stringify(this.objInfo))
        localStorage.setItem(`article-${this.objInfo.id}-data`, JSON.stringify(this.objData))
        localStorage.setItem(`article-${this.objInfo.id}-media`, JSON.stringify(this.objMedia))
    }
    _getPagename(cats) {
        return cats;
    }
    error(data) {
        console.error('error from cms-article-viewer', data);
    }

    showPage() {
        let arr = Object.keys(this.objData)
        window.history.pushState({}, null, `content/articles/edit-articles?content=${this.objInfo.id}&add=false&lang=${arr[0]}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }

    __delete() {
        // console.log(this.objInfo)
        this.objInfo.removed = true
        this.getArticleData(this.objInfo.id, 'info').then((this.removeArticle).bind(this)).catch(err => console.log(err))
    }
    __publish(data) {
        console.log(data)
    }
    _openConfirm() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: {
                    name: this.objInfo.id, method: (this.__delete).bind(this),
                    argument: this.objInfo.id, headderMsgKind: 'remove ?', type: 'article'
                }
            }));
        });
    }
    _confirmPublish() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: {
                    name: this.objInfo.id, method: (this.__publish).bind(this),
                    argument: '!!to be done!!', headderMsgKind: 'publish ?', type: 'article'
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
