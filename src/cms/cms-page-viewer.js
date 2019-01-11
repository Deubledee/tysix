import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import './cms-page-form.js';

class cmsPageViewer extends PolymerElement {
  static get template() {
    return html`
    <custom-style>
    <style is="custom-style">

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

      section {
        display: flex;
        flex-flow: row;        
        font-weight: bold;
        padding: 4px;
        height: 50px;
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
      iron-icon {
        color: #929696;
      }

      div[center]{        
        text-align: center;
      }
    </style>
  </custom-style>  
    <main>
        <nav top> 
          <div>
            <section title>
              <paper-icon-button-light>
                <iron-icon icon="av:library-books" aria-label="Go back"></iron-icon>
              </paper-icon-button-light>
                  Pages
            </section>
          </div>
          <div add>
            <section title on-click="add">
              <paper-icon-button-light>
                <iron-icon icon="av:library-add" aria-label="Go back"></iron-icon>
              </paper-icon-button-light>
              Add
            </section>
          </div>
        </nav>     
        <dom-repeat items="[[categories]]" as="category">
          <template>
            <article>
              <nav value="[[index]]">
                  <div>
                    <span>  {{_getPagename(category)}} </span>
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
                <section>
                  <div left> Page type </div>
                  <div right> [[category.page]]  </div>    
                  </section>  
                  <section>
                  <div left> Page name </div>
                  <div right> [[category.name]]  </div>  
                  </section>  
                  <section>
                  <div left> title </div>
                  <div right> [[category.title]]  </div>     
                  </section>  
                  <section>           
                  <div left> image </div>
                  <div right> [[category.image]]  </div> 
                  </section>  
                  <section>
                  <div left> placeholder </div>
                  <div right> [[category.placeholder]]  </div>                               
                </section>  
              </nav>
            </article>
          </template>
        </dom-repeat>
        <cms-page-form id="form" closed="{{closed}}" categorie="{{categorie}}" setter="{{setter}}" >
        </cms-page-form>
      </main>  
`
  }
  static get is() { return 'cms-page-viewer'; }

  static get properties() {
    return {
      DBW: {
        type: Object,
        value: function () {
          return new dataBaseworker()
        },
      },
      lang: {
        type: String,
        notify: true
        // value: lang
      },
      categories: {
        type: Array,
        notify: true,
      },
      categorie: {
        type: Object,
        notify: true
      },
      setter: {
        type: String,
        notify: true,
        observer: 'resetCollor'
      },
      closed: {
        type: Boolean,
        notify: true,
      },
      lastChosen: {
        type: Array,
        value: new Array()
      }
    }
  }

  log(data) {
    console.log(data)
  }

  ready() {
    super.ready();
    this.AskPages()
  }

  AskPages() {
    this.DBW.askAllPages((done) => {
      this.categories = []
      this.categories = done
      scroll({ top: 0, behavior: 'smooth' });
    }, { name: 'pages' })
  }

  _getPagename(cats) {
    return cats.name
  }

  add() {
    this.closed = !this.closed
    this.$.form.edit = false
    this.$.form.reset({})
  }

  resetCollor(data) {
    console.log(data)
    if (data === 'true' || data === 'newPage') {
      this.lastChosen[0].style.color = "rgb(128, 152, 173)"
      this.lastChosen = []
      this.setter = false
    }
    if (data === 'newPage') {
      this.AskPages()
    }
  }

  setLastChosen(elem) {
    let arr = new Array()
    arr.push(elem)
    this.lastChosen = arr
    elem.style.color = "var(--google-blue-700)"
  }

  edit(event) {
    if (this.lastChosen.length < 1) {
      scroll({ top: 200, behavior: 'smooth' });
      scroll({ bottom: 220, behavior: 'smooth' });
      let index = event.srcElement.parentElement.parentElement.value, arr = new Array()
      this.categorie = this.categories[index]
      this.closed = !this.closed
      this.$.form.edit = true
      this.setLastChosen(event.srcElement)
    }
  }

  showName(cats, name) {
    return cats[name]
  }

  showPage(event) {
    if (event.srcElement.parentElement.parentElement.parentElement.children[1].hasAttribute('open') === false) {
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.opacity = "1"
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.height = "435px"
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.display = "0px"
      event.srcElement.parentElement.parentElement.parentElement.children[1].setAttribute("open", true)
      this.setLastChosen(event.srcElement)
    } else {
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.height = "0px"
      event.srcElement.parentElement.parentElement.parentElement.children[1].style.opacity = "0"
      event.srcElement.parentElement.parentElement.parentElement.children[1].removeAttribute("open")
      this.resetCollor('true')
    }
  }
}

customElements.define(cmsPageViewer.is, cmsPageViewer);
