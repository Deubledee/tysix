import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/iron-icons/editor-icons.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-input/paper-input.js';
import './cms-article-list-viewer';
class cmsArticleListType extends PolymerElement {
    static get template() {
        return html`
    <style> 
    article {
        box-sizing: border-box;
        margin-bottom: 10px;
        padding: 12px;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .diferent{
        display: none!important
      }

      nav paper-icon-button {
        flex-basis: 120px;
        color: rgb(128, 152, 173)
      }

    nav {
        color: #8098ad;
        display: flex;
        flex-flow: row;
        padding: 10px;
        padding-left: 21px;
      }
      
      nav div { 
        flex-basis: 239px;
      }
  
      nav[bottom] {
        width: auto:
        max-width: 1200px
      }

      nav[bottom] div {
        padding: 20px;
        flex-basis: unset;
        flex-grow: 1;
        height: auto;
        background: #ffffff;
      }
      
      div[left] {
        width: 119px;
      }

    .rightImages {
        display: flex;
        /*box-shadow: 3px 3px 8px #b6b6b6;*/
        padding: 24px;
        box-sizing: border-box;
      }
  
      cms-images.images {
        width: 800px;          
        height: 350px;
        background-color: inherit;
        --images-article-images: {          
            height: 300px!important;
        }
      } 

      cms-article-list-viewer {
        flex-grow: 1;
      }

      div[icons] {
        text-align: center
      }

      cms-article-content {
        max-width: 1200px;
    }

    </style>
  <article> 
    <nav>       
        <div>
            <span> {{article.parent}}
            <h4> {{_getArticleContentLength(article)}} articles </h4>
            </span>
        </div>
        <div icons>
            <paper-icon-button on-click="showPage" icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
            &
            <paper-icon-button on-click="showPage" icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
        </div>
        <div icons>
            <paper-icon-button on-click="addArticleContent" icon="av:playlist-add" aria-label="mode-edit">
            </paper-icon-button>
        </div>
        <div icons>
            <paper-icon-button on-click="delete" icon="av:not-interested" aria-label="mode-delete"></paper-icon-button>
        </div>
    </nav>
    <cms-article-content route="{{route}}" id="content" add="true" delete="false">
    </cms-article-content> 
    <nav bottom>    
        <cms-article-list-viewer id="viewer">
            <cms-article-content id="content" add="" delete="">
            <!-- images element lands here to :)-->
            </cms-article-content>
        </cms-article-list-viewer>
    </nav>
  </article>`
    }
    static get is() { return 'cms-article-list-type'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
            },
            article: {
                type: Array,
                notify: true,
            },
            closed: {
                type: Boolean,
                notify: true,
            },
            categories: {
                type: Array,
                notify: true,
                computed: '_getCatParents(article)',
            },
            types: {
                type: Array,
                notify: true,
                value: ['list', 'sub-category'],
            },
            image: {
                type: Object,
                notify: true,
                observer: 'sendImage'
            },
            sett: {
                type: Boolean,
                value: false
            },
            confirm: {
                type: Boolean,
                notify: true,
                value: false,
            },
            lastChosen: {
                type: Array,
                value: new Array()
            },
            scrollTo: {
                type: Number,
                observer: 'scrollIt'
            }
        }
    }

    ready() {
        super.ready();
    }

    log(data) {
        console.log('log from cms-article-viewer', data)
    }

    error(data) {
        console.error('error from cms-article-viewer', data)
    }

    deSpin() {
        this.$.spinner.active = !this.$.spinner.active
    }

    openConfirm(event) {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer,
            microTask, () => {
                /*  this.dispatchEvent(new CustomEvent('confirm', {
                      bubbles: true, composed: true,
                      detail:
                          { name: this.article.parent, method: (this.deleteGallerie).bind(this) }
                  }))*/
            }
        )
    }

    _getCatParents(cats) {
        let arr = []
        return arr
    }

    getTitle(content) {
        return content
    }

    addArticleContent(event) {
        let elem = this.$.content
        if (elem.tada === false) {
            elem.set('content', [{
                title: '',
                price: '',
                category: this.article.parent,
                type: this.article.type,
                brand: '',
                image: '',
                largeImage: '',
                description: ''
            }])
            elem.set('add', true)
            elem.set('categories', this.categories)
            elem.set('article', this.article)
            elem.set('articleName', this.article.parent)
        } else {
            elem.set('content', [])
            elem.set('categories', '')
            elem.set('article', '')
            elem.set('articleName', '')
        }
        elem.set('tada', !elem.tada)
        this.setLastChosen(event.srcElement, !elem.tada)
    }


    scrollIt(data) {
        scroll({ top: this.scrollTo, behavior: 'silent' });
        this.scrollTo = 0
    }

    showPage(event, theother) {
        let elem = this.$.viewer
        if (elem.content.length === 0) {
            elem.content = this.article.content
            this.setLastChosen(event.srcElement)
        } else {
            elem.content = []
            this.setLastChosen(event.srcElement, true)
        }
    }

    setLastChosen(elem, turnback) {
        let arr = new Array()
        arr.push(elem)
        this.lastChosen = arr
        if (turnback !== true) {
            elem.style.color = "var(--google-blue-700)"
        } else {
            elem.style.color = "rgb(128, 152, 173)"
        }
    }

    _getArticleContentLength(article) {
        return article.content.length
    }
}
customElements.define(cmsArticleListType.is, cmsArticleListType);
