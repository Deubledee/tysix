import { microTask } from '@polymer/polymer/lib/utils/async';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template';
import './cms-article-list-item';
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
           <section class="flexchildbotom noFlex">
               <div class="flexleft">
                   <h3> [[title]] </h3>
               </div>
           </section>                        
               
           <section class="flexchildbotom noFlex">
               <div class="flexleft">
                   <h3> [[viewedit]] </h3>
               </div>
           </section>                        
           <section class="flexchildbotom noFlex">
               <div class="flexleft">
                   <h3> [[items]] #</h3>
               </div>
           </section>                         
           <section class="flexchildbotom noFlex">
               <div class="flexleft">
                   <h3> [[publishedCount]] #</h3>
               </div>
           </section>
           `
    }
    static get _getTable() {
        return html`
        <div table class="scroll"> 
             <dom-repeat items="[[pages]]" as="page">
                 <template strip-whitespace>
                     [[putElement(index, page)]]
                     <slot name="item[[index]]"></slot>
                 </template>
             </dom-repeat>
        </div>     
             `}

    static get _getNavside() {
        return html`
           <dom-repeat repeat items="[[inForm]]" as="detail">
               <template>
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
                           [[publishedarticle]]
                           </span>
                       </aside>
                       <aside>
                           <span>
                           [[datepublished]]
                           </span>
                       </aside>
                   </div>
                   <div rightSide>                            
                       <dom-repeat repeat items="[[detail.published]]" as="published">
                           <template>
                               <section>
                                   <aside>
                                       <div published$="[[_getPublished(published.page)]]">
                                           [[published.page]]
                                       </div>
                                   </aside>
                                   <aside>
                                       <span>
                                           [[published.datePublished]]
                                       </span>
                                   </aside>
                               </section>
                           </template>
                       </dom-repeat>
                   </div>
               </template>
           </dom-repeat>
           `
    } /**/
    static get is() { return 'cms-article-list-type'; }
    static get properties() {
        return {
            lang: {
                type: String,
                observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals.translator
                }
            },
        }
    }
    ready() {
        super.ready();
        this.translator.template.innerHTML = `<paper-spinner-lite active="false" slot="spinner">
            </paper-spinner-lite>`
        this.translator.clone(this)
        this.translator.target('cms-page-list-type', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-page-list-type', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-page-list-type', 'setLangObject')
        this._getArticles()
        window.addEventListener('reset-artlist-type', (this._contentChanged.bind(this)));
    }
    _setLang(res, lang) {
        this.lang = lang
        res.call(this);
    }
    _setLObj(res, querySnapshot) {
        if ('data' in querySnapshot) {
            let langs = querySnapshot.data()
            res.call(this, langs);
        }
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeLang.call(this)
    }
    _contentChanged() {
        this.set('pages', [])
        this.innerHTML = ''
    }
    _getArticles() {
        this.translator._DBW.askAllArticles((data) => {
            this._setAll(data);
        }, this.translator.__DEV)
    }
    _setAll(data) {
        let arr = [], arr2 = []
        for (let i = 0; i < data.length; i++) {
            if ('categoryCount' in data[i]) {
                arr.push(data[i]);
            }
            else {
                arr2.push(data[i]);
            }
        }
        this.inForm = []
        this.set('inForm', arr);
        this.pages = ''
        this.set('pages', arr2);
        this.removeChild(this.children[0])
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
