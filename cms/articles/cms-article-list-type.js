import { html } from '@polymer/polymer/polymer-element.js';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import { dataBaseworker } from '../tools/dataBaseWorker';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import './cms-article-list-item';

const __DEV = true;
const _DBW = new dataBaseworker();
const _STYLES = _DBW.getElementAssets('cms-page-list-type', __DEV);
class cmsArticleListType extends cmsMiddlePageTemplate {
    static get _getShoutAnchor() {
        return html`        
             <paper-tab name="add-article">
                 [[articles]]
             </paper-tab>
         `
    }
    static get _getSilentAnchor() {
        return html`
         <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
             <a id="reset" href="[[rootPath]]content/">
             </a>
         </iron-selector>
         `
    }
    static get _getBottom() {
        return html`
           <section class="flexchildbotom">
               <div class="flexleft">
                   <h3> [[title]] </h3>
               </div>
           </section>                        
               
           <section class="flexchildbotom">
               <div class="flexleft">
                   <h3> [[viewedit]] </h3>
               </div>
           </section>                        
           <section class="flexchildbotom">
               <div class="flexleft">
                   <h3> [[publishedCount]] #</h3>
               </div>
           </section>                        
           <section class="flexchildbotom">
               <div class="flexleft">
                   <h3> [[delete]] </h3>
               </div>
           </section>
           `
    }
    static get _getTable() {
        return html`
             <dom-repeat items="[[pages]]" as="page">
                 <template strip-whitespace>
                     [[putElement(index, page)]]
                     <slot name="item[[index]]"></slot>
                 </template>
             </dom-repeat>
             `}

    static get _getNavside() {
        return html`
           <!--dom-repeat repeat items="[[info]]" as="detail">
               <template-->
                   <div class="flexsidecenter">
                       <aside>
                           <span>
                               [[Info]] 
                           </span>
                       </aside>
                   </div>
                   <div class="navsideleft">
                       <aside>
                           <span>
                           [[categorycount]]
                           </span>
                       </aside>
                   </div>
                   <div class="navsideright">
                       <aside>
                           <span>
                           <b> [[detail.categoryCount]] </b>
                           </span>
                       </aside>
                   </div>
                   <div class="navsideleft">
                       <aside>
                           <span>
                           [[Published]]
                           </span>
                       </aside>
                       <aside>
                           <span>
                           [[categorypages]]
                           </span>
                       </aside>
                   </div>
                   <div rightSide>                            
                       <!--dom-repeat repeat items="[[detail.published]]" as="published">
                           <template-->
                               <section>
                                   <aside>
                                       <span>
                                           [[published.page]]
                                       </span>
                                   </aside>
                                   <aside>
                                       <span>
                                           [[published.datePublished]]
                                       </span>
                                   </aside>
                               </section>
                           <!--/template>
                       </dom-repeat-->
                   </div>
               <!--/template>
           </dom-repeat-->
           `
    } /**/
    static get is() { return 'cms-article-list-type'; }
    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker();
                },
                notify: true
            }
        }
    }
    ready() {
        super.ready();
        _STYLES.then((querySnapshot) => {
            let style = querySnapshot.data();
            this._setLangObject(style);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
        this._getArticles()
        // window.addEventListener('reset-artlist-type', (this._contentChanged.bind(this)));
    }

    __changeLang() {
        if (this.langs[this.lang]) {
            let obj = this.langs[this.lang];
            for (let par in obj) {
                this.set(par, obj[par]);
            }
        }
    }
    _setLangObject(langs) {
        for (let par in langs) {
            if (par !== 'styles') {
                this.langs[par] = langs[par].pop();
            }
        }
        this.__changeLang();
    }
    _getArticles() {
        this.DBW.askAllArticles((data) => {
            this._setAll(data);
        })
    }
    _setAll(data) {
        let arr = [], arr2 = [];
        this.set('info', arr);
        this.pages = '';
        for (let i = 0; i < data.length; i++) {
            if ('categoryCount' in data[i]) {
                arr.push(data[i]);
            }
            else {
                arr2.push(data[i]);
            }
        }
        this.set('info', arr);
        this.set('pages', arr2);
    }
    putElement(index, page) {
        let template = html`
            <cms-article-list-item>
            </cms-article-list-item>`;
        var clone = document.importNode(template.content, true);
        this.appendChild(clone);
        this.children[index].setAttribute('slot', `item${index}`);
        this.children[index].set('page', page);
    }
    openConfirm() {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer,
            microTask, () => {
                this.dispatchEvent(new CustomEvent('confirm', {
                    bubbles: true, composed: true,
                    detail:
                        { name: this.article.parent, method: (this.deleteGallerie).bind(this) }
                }))
            }
        )
    }
}
customElements.define(cmsArticleListType.is, cmsArticleListType);
