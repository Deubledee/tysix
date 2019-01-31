import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import './cms-image-viewer.js';
import './cms-confirm.js';
import './cms-page-content.js';
import './cms-common-styles.js';

class cmsPageViewer extends PolymerElement {
  static get template() {
    return html`
    <style include="cms-common-styles">

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
        max-width: 1300px;
        margin-left: auto;
        margin-right: auto;;
      } 

      nav[top] {
        position: relative;
        top: 33px;
        margin-bottom: 60px;
        height: 166px;
        background-color: var(--primary-background-color);
        box-shadow: 4px 4px 7px #989898;
        max-width: 1300px;
        margin-left: auto;
        margin-right: auto;;
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

      paper-spinner{
        left: 47%;
      }
      
      nav[bottom] {
        box-sizing: border-box;
        display: flow-root;
        padding: 0px;
        height: 0px;
        opacity: 0;
        transition-property: height, opacity;
        transition-duration: 1.5s, 2s;
      }

      cms-images.overHidd {
      ￼    position: relative;
      ￼    bottom: 427px;
      ￼    z-index: 122;
          --images-shop-image: {
          ￼    max-height: 186px;
          }

          --images-frame2-div: {
              overflow-y: hidden;
          }

          --images-title2: {
              width: 217px;
          }
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
        <paper-spinner id="spinner" active></paper-spinner> 
        <article>
          <cms-page-content id="content" setter="{{setter}}">
          </cms-page-content>
        </article>
        <dom-repeat items="[[categories]]" as="category">
          <template>
            <article>
              <nav value="[[index]]">
                  <div>
                    <span>  {{_getPagename(category)}} </span>
                  </div>
                  <div center>
                    <paper-icon-button on-click="showPage" icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
                        &
                    <paper-icon-button on-click="showPage" icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                  </div>  
                  <div center>
                    <paper-icon-button on-click="openConfirm" icon="av:not-interested" aria-label="mode-delete"></paper-icon-button>
                  </div>                  
              </nav> 
              <nav bottom> 
                <cms-page-content add="" delete="" setter="{{setter}}">
                </cms-page-content>
              </nav>
            </article>
          </template>
        </dom-repeat>
        <cms-confirm id="confirm" bottom2 open="{{confirm}}" type="page"> 
        </cms-confirm> 
        <cms-image-viewer id="viewer" image="{{image}}" putCancelButton="[[!sett]]"></cms-image-viewer>
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
        observer: 'deSpin'
      },
      page: {
        type: Object,
        notify: true
      },
      categorie: {
        type: Object,
        notify: true
      },
      image: {
        type: Object,
        notify: true,
        observer: 'sendImage'
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
      confirm: {
        type: Boolean,
        notify: true,
        value: false,
      },
      setImage: {
        type: Object
      },
      lastChosen: {
        type: Array,
        value: new Array()
      }
    }
  }

  log(data) {
    console.log('log from cms-page-viewer', data)
  }

  deSpin(data) {
    if (this.$.spinner.active === true) {
      this.$.spinner.active = false
    }
  }

  error(data) {
    console.error('error from cms-page-viewer', data)
  }

  ready() {
    super.ready();
    this.AskPages()
    scroll({ top: 0, behavior: 'silent' });
    this.addEventListener('page-open-image-viewer', this._openImagevVewer)
    this.addEventListener('page-cancel-image', this._cancelImage)
  }

  sendImage(data) {
    console.log(data)
    //this.setImage.set(data)
  }

  _cancelImage() {
    this.image = {}
  }

  _openImagevVewer(event) {
    if (this.$.viewer.style.display === 'block') {
      this.$.viewer.style.display = 'none'
      this.$.viewer.style.bottom = 'initial'
      this.$.viewer.style.height = '0px'
      this.setImage = {}
    } else {
      this.setImage = event.detail
      this.$.viewer.closeHead = true
      this.$.viewer.open = true
      this.$.viewer.show = false
      this.$.viewer.openMain = true
      this.$.viewer.set('killFormAndSet', true)
      this.$.viewer.style.display = 'block'
      this.$.viewer.style.height = '600px'
      this.$.viewer.style.bottom = '215px'
    }
  }

  AskPages() {
    this.DBW.askAllPages((done) => {
      this.categories = []
      this.categories = done
      scroll({ top: 0, behavior: 'silent' });
    })
  }

  _getPagename(cats) {
    return cats.name
  }

  openPageContent(event) {
    let elem = event.srcElement.parentElement.parentElement.nextElementSibling.firstElementChild
    let index = event.model.__data.index
    if (elem.tada === false) {
      elem.set('content', [event.model.__data.category])
      elem.set('add', false)
      elem.set('category', this.categories[index])
      elem.set('categoryIndex', event.model.index)
      elem.set('categoryName', this.categories[index].parent)
    }
    elem.set('tada', !elem.tada)
  }

  add(event) {
    let elem = this.$.content
    this.setLastChosen(event.srcElement, true)
    if (elem.tada === false) {
      elem.set('content', [{ title: '', lang: '', type: '', name: '', image: '', placeholder: '' }])
      elem.set('add', true)
    }
    elem.set('tada', !elem.tada)
    elem.set('adding', !elem.adding)
  }

  resetCollor(data) {
    if (data === 'newPage') {
      this.AskPages()
      this.lastChosen.pop()
    }
  }

  setLastChosen(elem, bool) {
    let arr = new Array()
    if (elem.style.color === "var(--google-blue-700)" || elem.style.color === 'rgb(140, 174, 247)') {
      elem.style.color = bool === true ? '#f0f0f0' : "rgb(128, 152, 173)"
      this.lastChosen.pop()
    } else {
      elem.style.color = bool === true ? 'rgb(140, 174, 247)' : "var(--google-blue-700)"
      arr.push(elem)
      this.lastChosen = arr
    }
  }

  showName(cats, name) {
    return cats[name]
  }

  delete(data) {
    let page = data
    this.DBW.deletePage((msg, done) => {
      if (msg !== 'error') {
        this.openConfirm()
        this.log(msg, done)
      } else {
        this.error(msg, done)
      }
    }, page)
  }

  openConfirm(event) {
    if (this.confirm === false) {
      this.$.confirm.openConfirm(event.model.__data.category)
      this.$.confirm.method = this.delete
      this.confirm = true
    }
  }

  showPage(event, theother) {
    let elem = event.srcElement.parentElement.parentElement.parentElement
    this.toggleElementPlease(elem.children[1], event.srcElement, event)
  }

  toggleElementPlease(elem, srcElement, event) {
    if (elem.hasAttribute('open') === false) {
      elem.style.opacity = "1"
      elem.style.height = "auto"
      elem.setAttribute("open", true)
      this.setLastChosen(srcElement)
      this.openPageContent(event)
    } else {
      elem.style.height = "0px"
      elem.style.opacity = "0"
      elem.removeAttribute("open")
      this.setLastChosen(srcElement)
      this.openPageContent(event)
    }
  }

  openPageContent(event) {
    let elem = event.srcElement.parentElement.parentElement.nextElementSibling.firstElementChild
    let index = event.model.__data.index
    if (elem.tada === false) {
      elem.set('content', [event.model.__data.category])
      elem.set('add', false)
      elem.set('category', this.categories[index])
      elem.set('categoryIndex', event.model.index)
      elem.set('categoryName', this.categories[index].parent)
    }
    elem.set('tada', !elem.tada)
  }

}

customElements.define(cmsPageViewer.is, cmsPageViewer);
