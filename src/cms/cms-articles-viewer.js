import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/iron-icons/editor-icons.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '../shop-image.js';

class cmsArticlesViewer extends PolymerElement {
  static get template() {
    return html`
    <style>
           main {
            word-break: break-all;
            padding: 4px;
            position: absolute;
            left: -42px;
            top: 52px;
            width: 100%;
      }

      article {
        box-sizing: border-box;
        /*box-shadow: 4px 4px 4px #909090;*/
        margin-bottom: 10px;
        padding: 12px;
      } 

      nav {
        color: #8098ad;
        display: flex;
        flex-flow: row;
        padding: 10px;
        padding-left: 21px;
      } 

      nav[top] {
        position: relative;
        top: 33px;
        margin-bottom: 60px;
        height: 166px;
        background-color: var(--primary-background-color);
        box-shadow: 4px 4px 7px #989898;
      }

      nav[bottom] {
        display: flow-root;
        height: 0px;
        opacity: 0;
        transition-property: height, opacity;
        transition-duration: 1.5s, 2s;
      }  
      nav paper-icon-button {
        flex-basis: 120px;      
      }

      nav div {
        flex-basis: 120px;
        flex-grow: 1      
      }

       div[bottom] {
        margin-bottom: 18px;   
      }

      nav[bottom] div {
        flex-basis: unset;
        flex-grow: 1;
        height: auto;    
      }

      section {
        display: flex;
        flex-flow: row;        
        font-weight: bold;
        padding: 4px;
        height: 50px;
      }

      section[bottom] {
        display: flex;
        font-weight: bold;
        padding: 4px;
        height: auto!important;
        margin-bottom: 100px;
      }

      section[bottom2] {
        flex-flow: column;
        height: auto!important;
      }

      section div[left] {
        flex-basis: 164px;
        color: #448cff;
      }

      section div[right] {
        flex-basis: 60%;
        color: #616161;
      }

      section paper-button{
        color: #7a8c94;
        margin-left: 50px;
      }
      
      section[title] {
        cursor: pointer;
        color: #f0f0f0;
        font-size: 35px;
        text-align: center;
        display: block;
        padding: 1px;
        height: 58px;
        width: 140px;
        border-radius: 10px;
        background-color: #e1e2d8;
        text-shadow: 1px 1px 1px var(--primary-text-color);
      }
      section[title2] {
        cursor: pointer;
        color: #f0f0f0;
        font-size: 35px;
        text-align: center;
        display: block;
        padding: 1px;
        height: 58px;
        width: 180px;
        border-radius: 10px;
        background-color: #e1e2d8;
        text-shadow: 1px 1px 1px var(--primary-text-color);
      }

      iron-icon {
        height: 150px;
      }

      shop-image {
        color: #929696;
      }

      div[center]{        
        text-align: center;
      }
    </style> 
    <main>
        <nav top> 
          <div>
            <section title2>
              <paper-icon-button-light>
                <iron-icon icon="av:art-track" aria-label="Go back"></iron-icon>
              </paper-icon-button-light>
                  Articles
            </section>
          </div>
          <div add>
            <section title on-click="add">
              <paper-icon-button-light>
                <iron-icon icon="av:playlist-add" aria-label="Go back"></iron-icon>
              </paper-icon-button-light>
              Add
            </section>
          </div>
        </nav>     
        <dom-repeat items="[[articles]]" as="article">
          <template>
            <article>
              <nav>
                  <div>
                    <span>  {{_getArticlename(article)}} </span>
                  </div>
                  <div center>
                    <paper-icon-button on-click="showPage" icon="editor:drag-handle" aria-label="mode-show"></paper-icon-button>
                  </div>  
                  <div center>
                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                  </div>   
                  <div center>
                    <paper-icon-button on-click="delete" icon="av:not-interested" aria-label="mode-delete"></paper-icon-button>
                  </div>                  
              </nav> 
              <nav bottom>  
                <dom-repeat items="[[article.content]]" as="art">
                  <template> 
                    <div bottom>
                      <section bottom>
                        <div left> brand </div>
                        <div right> [[art.brand]]  </div>    
                      </section>  
                      <section bottom>
                        <div left> category </div>
                        <div right> [[art.category]]  </div>  
                      </section>  
                      <section bottom>
                        <div left> description </div>
                        <div right> [[art.description]]  </div>     
                      </section>  
                      <section bottom2>           
                        <div left> images </div>  
                          <cms-images id="images" images="[[getImage(art)]]" image="{{image}}" cancel="{{evet}}" sett={{sett}} clear="{{clear}}"></cms-images>  
                      </section> 
                      <section bottom>
                        <div left> price </div>
                        <div right> [[art.price]]  </div>                               
                      </section>  
                      <section bottom>
                        <div left> title </div>
                        <div right> [[art.title]]  </div>                               
                      </section> 
                    </div>
                  </template>
                </dom-repeat>
              </nav>
            </article>
          </template>
        </dom-repeat>
        <cms-page-form id="form" closed="{{closed}}" categorie="{{categorie}}" setter="{{setter}}" >
        </cms-page-form>
   
`
  }
  static get is() { return 'cms-articles-viewer'; }

  static get properties() {
    return {
      DBW: {
        type: Object,
        value: function () {
          return new dataBaseworker()
        },
        notify: true
      },
      articles: {
        type: Array,
        notify: true
      },
      closed: {
        type: Boolean,
        notify: true,
      },
    }
  }

  log(data) {
    console.log('log from cms-page-viewer', data)
  }

  error(data) {
    console.error('error from cms-page-viewer', data)
  }

  ready() {
    super.ready();
    this._getArticles()
    scroll({ top: 0, behavior: 'silent' });
  }

  getImage(image) {
    console.log(image)
    return [image]
  }

  _getArticles() {
    this.DBW.askAllArticles((data) => {
      this.articles = data
    })
  }

  _getArticlename(article) {
    console.log('log from cms-page-viewer', article)
    return article.content[0].category
  }

  add(event) {
    this.closed = !this.closed
  }

  edit(event) {
    // console.log(event, event.model.children[1].children[1], event.model.__data)
  }

  showName(cats, name) {
    return cats[name]
  }

  showPage(event) {
    console.log(event.srcElement.parentElement.parentElement.parentElement.children[1])
    if (event.srcElement.parentElement.parentElement.parentElement.children[1].hasAttribute('open') === false) {
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.opacity = "1"
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.height = "auto"
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.display = "0px"
      event.srcElement.parentElement.parentElement.parentElement.children[1].setAttribute("open", true)
    } else {
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.height = "0px"
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.opacity = "0"
      event.srcElement.parentElement.parentElement.parentElement.children[1].removeAttribute("open")
    }

  }

  handleResponse(res) {

    //  console.log(res)
  }

}

customElements.define(cmsArticlesViewer.is, cmsArticlesViewer);
