import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/iron-icons/editor-icons.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-input/paper-input.js';
import './cms-article-content.js';
import './cms-image-viewer.js';
class cmsArticlesViewer extends PolymerElement {
  static get template() {
    return html`

    <style>
    main {
      display: block;
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
      box-sizing: border-box;
      display: flow-root;
      padding: 0px;
      height: 0px;
      opacity: 0;
      transition-property: height, opacity;
      transition-duration: 1.5s, 2s;
    }
  
    nav paper-icon-button {
      flex-basis: 120px;
      color: rgb(128, 152, 173)
    }
  
    nav div {
      flex-basis: 120px;
      flex-grow: 1
    }
  
    div[bottom] {
      margin-bottom: 75px;
      box-shadow: 2px 2px 4px #bab2b2;
      border-radius: 5px;
    }

    nav[bottom] div {
      padding: 20px;
      flex-basis: unset;
      flex-grow: 1;
      height: auto;
      background: #ffffff;
    }
  
    section {
      display: flex;
      flex-flow: row;
      font-weight: bold;
      padding: 4px;
      height: 50px;
    }
  
    section[title] {
      flex-basis: 34px;
      cursor: pointer;
      color: #f0f0f0;
      font-size: 35px;
      text-align: center;
      height: 52px;
      width: 120px;
      border-radius: 10px;
      background-color: #e1e2d8;
      text-shadow: 1px 1px 1px var(--primary-text-color);
    }
  
    section[title2] {
      flex-basis: 34px;
      cursor: pointer;
      color: #f0f0f0;
      font-size: 35px;
      text-align: center;
      height: 52px;
      width: 162px;
      border-radius: 10px;
      background-color: #e1e2d8;
      text-shadow: 1px 1px 1px var(--primary-text-color);
    }

    div[center] {
      text-align: center;
    }
  
    paper-icon-button-light {
      color: #929696;
      margin-left: 10px
    }
  
    paper-spinner {
      left: 47%;
    }

    div[hidde] {
      display: none
    }

    paper-button {
      min-width: 98px;
    }

    cms-image-viewer.diferent{
      --main-style:{
           position: absolute;
           width: 99%;
           top: 43%;
      }
  }

  .hidden {
    display: none!important
  }

  </style>
  <main>
    <nav top>
      <div>
        <section title2>
          <paper-icon-button-light>
            <iron-icon icon="av:art-track" aria-label="Go back"></iron-icon>
          </paper-icon-button-light>
          <div> Articles</div>
        </section>
      </div>
      <div add>
        <section title on-click="add">
          <paper-icon-button-light>
            <iron-icon icon="av:playlist-add" aria-label="Go back"></iron-icon>
          </paper-icon-button-light>
          <div> Add </div>
        </section>
      </div>
    </nav>
    <dom-repeat items="[[articles]]" as="article">
      <template>
        <article value="[[index]]">
          <nav>
            <div>
              <span> {{article.parent}}
                <h4> {{_getArticleContentLength(article)}} articles </h4>
              </span>
            </div>
            <div center>
              <paper-icon-button on-click="showPage" icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
              &
              <paper-icon-button on-click="showPage" icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
            </div>
            <div center>
              <paper-icon-button on-click="addArticleContent" icon="av:playlist-add" aria-label="mode-edit">
              </paper-icon-button>
            </div>
            <div center>
              <paper-icon-button on-click="delete" icon="av:not-interested" aria-label="mode-delete"></paper-icon-button>
            </div>
          </nav>
          <nav bottom>
            <dom-repeat items="[[article.content]]" as="art">
              <template>
                <div bottom>
                  <paper-button on-click="openArticleContent">
                    [[art.title]] 
                  </paper-button>
                  <cms-article-content add="" delete="">
                  </cms-article-content>
                </div>
              </template>
            </dom-repeat>
          </nav>
          <nav bottom>
            <div bottom class="hidden">
              <h2> New Article </h2>
              <paper-button on-click="save">
                save
              </paper-button>
              <cms-article-content add="" delete="">
              </cms-article-content>
            </div>  
          </nav>
        </article>
      </template>
    </dom-repeat>
    <paper-spinner id="spinner" active></paper-spinner>
    <cms-image-viewer id="viewer" class="diferent" image="{{image}}" putCancelButton="[[sett]]"></cms-image-viewer>
   
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
        notify: true,
        observer: 'deSpin',
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
      sett: {
        type: Boolean,
        observer: 'setOpen',
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
      addToContent: {
        type: Object,
        value: function () {
          return {
            name: '',
            content: []
          }
        },
        notify: true
      }
    }
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

  ready() {
    super.ready();
    this._getArticles()
    scroll({ top: 0, behavior: 'silent' });
    this.$.viewer.closeHead = true
    this.$.viewer.killSett = true
    this.$.viewer.openMain = false
    // this.$.images.show = false
  }

  save() {
    if ('commonMethod' in this && this.commonMethod instanceof Function) {
      //console.log('with method', this.commonMethod)
      this.commonMethod()
    } else {
      console.log('no method', this.commonMethod)
    }
  }

  getTitle(content) {
    return content
  }

  addArticleContent(event) {
    let elem = event.srcElement.parentElement.parentElement.parentElement.children[2].children[0]
    let index = event.srcElement.parentElement.parentElement.nextElementSibling
    let elem2 = elem.children[2]
    this.showPage(event, true)
    this.openEditContent(event)
    elem.classList.toggle('hidden')
    elem2.value = ''
    this.addArticleContent.content
    /* elem2.oninput = (event) => {
       this.addArticleContent.name = event.srcElement.value
       console.log('alooo :)', this.addArticleContent.name)
     }*/

    this.commonMethod = function () {
      console.log('method2', this)

    }
  }

  openEditContent(event, ) {
    let elem = event.srcElement.parentElement.parentElement.parentElement.children[2].children[0].children[2]
    let index = event.model.__data.index
    if (elem.tada === false) {
      elem.set('content', [{ title: '', price: '', category: '', type: '', brand: '', image: '', largeImage: '', dascription: '' }])
      elem.set('type', this.articles[index].type)
    }
    elem.set('tada', !elem.tada)
  }

  openArticleContent(event) {
    let elem = event.srcElement.nextElementSibling
    let index = event.srcElement.parentElement
      .parentElement
      .parentElement
      .value
    if (elem.tada === false) {
      elem.set('content', [event.model.__data.art])
      elem.set('type', this.articles[index].type)
    }
    elem.set('tada', !elem.tada)
  }

  _getArticles() {
    if (this.$.spinner.active === false) {
      this.deSpin()
    }
    this.DBW.askAllArticles((data) => {
      this.articles = data
      scroll({ top: 0, behavior: 'silent' });
    })
  }

  _getArticlename(article) {
    //  console.log('log from cms-page-viewer', article)
    return article.content[0].category
  }

  _getArticleContentLength(article) {
    return article.content.length
  }

  setthis(event) {
    console.log('setthis', event)
    return false
  }

  resetCollor(data, element) {
    this.log(data)
    let elem = this.lastChosen[0] || element
    if (data === 'true' || data === 'newPage') {
      elem.style.color = "rgb(128, 152, 173)"
      this.lastChosen = []
      this.setter = false
    }
    if (data === 'newPage') {
      this.AskPages()
    }
  }

  add(event) {
    this.closed = !this.closed
  }

  showName(cats, name) {
    return cats[name]
  }

  setLastChosen(elem) {
    let arr = new Array()
    arr.push(elem)
    this.lastChosen = arr
    elem.style.color = "var(--google-blue-700)"
  }

  showPage(event, theother) {
    let elem = event.srcElement.parentElement.parentElement.parentElement
    if (theother !== true) {
      this.toggleElementPlease(elem.children[1], event.srcElement)
    } else {
      this.toggleElementPlease(elem.children[2], event.srcElement)
    }
  }

  toggleElementPlease(elem, srcElement) {
    if (elem.hasAttribute('open') === false) {
      elem.style.opacity = "1"
      elem.style.height = "auto"
      elem.setAttribute("open", true)
      this.setLastChosen(srcElement)
    } else {
      elem.style.height = "0px"
      elem.style.opacity = "0"
      elem.removeAttribute("open")
      this.resetCollor('true', srcElement)
    }
  }
}

customElements.define(cmsArticlesViewer.is, cmsArticlesViewer);
