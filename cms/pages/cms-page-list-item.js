
import { cmsItemTemplate } from '../templates/cms-item-template'
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { cmsPagesLib, cmscategoriesLib } from '../tools/cms-save-lib.js';
import { html as litHtml, render } from 'lit-html';
class cmsPageListItem extends cmscategoriesLib(cmsPagesLib(cmsItemTemplate)) {

    static get is() { return 'cms-page-list-item'; }
    static get properties() {
        return {
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
        };
    }
    ready() {
        super.ready();
    }
    _putRow(data) {
        this.objInfo = []
        this.objInfo.push(data)
        const articleTemplate = (objInfo) => litHtml`
            <article centerListItem slot="table">
                <div>   
                    <span> 
                        <paper-button class="button-normal" @click="${(this.showPage).bind(this)}"> 
                            ${objInfo[0].id}
                        </paper-button>   
                    </span>
                </div>                 
                <div class="${objInfo[0].toArticle}">                   
                    <span> 
                        <paper-button @click="${(this._confirmToArticle).bind(this)}"> ${objInfo[0].toArticle} </paper-button>
                    </span>
                </div>  
                <div class="${objInfo[0].Published.state}">                    
                    <span> 
                        <paper-button @click="${(this._confirmPublish).bind(this)}"> ${objInfo[0].Published.state} </paper-button>
                    </span>
                </div> 
                <div>
                    <paper-button class="button-normal">
                        <paper-icon-button @click="${(this.showCats).bind(this)}" icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button> 
                    </paper-button> 
                </div>
                <div>
                    <paper-button class="button-del">
                        <paper-icon-button @click="${(this._openConfirm).bind(this)}" icon="av:not-interested" aria-label="mode-delete"></paper-icon-button> 
                    </paper-button> 
                </div>
            </article>`

        render(articleTemplate(this.objInfo), this);
        localStorage.setItem(`page-${data.id}-info`, JSON.stringify(this.objInfo))
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
        if (!localStorage[`page${this.objInfo[0].id}`]) {
            this.getPageData(this.objInfo[0].id)
        } else {
            let cont = JSON.parse(localStorage[`page-${this.objInfo[0].id}`])
            let arr = this._setLangArr(cont[0])
            window.history.pushState({}, null, `content/pages/edit-category-pages?content=${this.objInfo[0].id}&add=false&lang=${arr[0]}`);
            window.dispatchEvent(new CustomEvent('location-changed'));
        }
    }
    showCats() {
        window.history.pushState({}, null, `content/pages/subcategory-pages?content=${this.objInfo[0].id}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }
    __delete(data) {
        this.page.removed = true
        this.removePage(data, this.page)
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
    _confirmToArticle() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: {
                    name: this.page.id, method: console.log,
                    argument: '!!to be done!!', headderMsgKind: 'send to articles ?', type: 'page/category'
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
