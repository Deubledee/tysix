import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-tabs/paper-tabs'
import '@polymer/paper-tabs/paper-tab'
import './cms-confirm.js';
import './cms-page-content.js';
import './cms-common-styles.js';
import './cms-pge-list-type.js';
import './cms-gallery-viewer';

class cmsPageViewer extends PolymerElement {
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
      
        .rightImages {
          display: flex;
        /*  box-shadow: 3px 3px 8px #b6b6b6;*/
          padding: 24px;
          box-sizing: border-box;
        }

        cms-images.images {
          width: 800px;          
          height: 300px;
          --images-article-images: {          
              height: 200px!important;
              overflow: none
            }
        }

        article {
          box-sizing: border-box;
          margin-bottom: 10px;
          padding: 12px;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
        }
      
        nav {
          color: #8098ad;
          display: flex;
          flex-flow: row;
          padding: 10px;
          padding-left: 21px;
        }
      
        nav[top] {
          flex-flow: wrap;
          flex-direction: column;
          position: relative;
          top: 5px;
          height: 34px;
          background-color: #dbdbdb;
          max-width: 1300px;
          margin-left: auto;
          margin-right: auto;
          border-radius: 4px;
        }
    
          div[top] {
          padding-left: 20px;
        }
    
        section {
          display: flex;
          flex-flow: row;
          font-weight: bold;
          padding: 4px;
          height: 50px;
          margin-left: auto;
          margin-right: auto;
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
          color: #787676;
          font-size: 55px;
          text-align: center;
          height: 72px;
          width: 257px;
          border-radius: 10px;
          /* background-color: #e1e2d8; */
          text-shadow: 3px 3px 2px #ababab;
        }
    
        paper-icon-button-light {
          color: #929696;
          margin-left: 10px
        }
      
        paper-spinner {
          left: 47%;
        }
    
        paper-button {
          min-width: 98px;
        }
    
        .hidden {
            display: none!important
        }
    
        paper-tabs {
          font-size: 17px;
          font-weight: bold;
        }
    
        nav[center] {
          flex-flow: column;
        }
    
        .diferent {
          display: none;
        }
        paper-tabs a {
          text-decoration: none;
          color: inherit
        }
    </style>
  </custom-style>  
  <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}"></app-route>
    <main> 
        <div top>
          <section title2>
            <paper-icon-button-light>
              <iron-icon icon="av:library-books" aria-label="pages"></iron-icon>
            </paper-icon-button-light>
            <div> Pages </div>
          </section>
        </div>
      <nav top>
        <app-toolbar typer>
            <paper-tabs no-bar>
              <a href="/admin/pages[[add]]">
                <paper-tab name="add" on-click="_add">
                    Add
                  <paper-icon-button-light>
                      <iron-icon icon="av:library-add" aria-label="add">
                      </iron-icon>
                  </paper-icon-button-light>
                </paper-tab>
              </a> 
              <a href="/admin/pages[[categories]]">
                <paper-tab name="categories" on-click="toggleLists">
                    category pages
                  <paper-icon-button-light>
                      <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                  </paper-icon-button-light>
                </paper-tab>
              </a> 
              <a href="/admin/pages[[suCategories]]">
                <paper-tab name="sub_categories" on-click="toggleCats">
                  sub category pages
                  <paper-icon-button-light>
                      <iron-icon icon="av:library-add" aria-label="sub categories"></iron-icon>
                  </paper-icon-button-light>
                </paper-tab>
              </a> 
            </paper-tabs>
        </app-toolbar> 
      </nav>      
      <article id="editarea" class="diferent">
        <cms-page-content id="content">
        </cms-page-content>
      </article>
      <article>  
        <nav center id="typer" class="diferent"> 
          <cms-page-list-type pages=[[pages]]>
          </cms-page-list-type>  
        </nav>
      </article>
      <article>
        <nav center id="subCats" class="diferent"> 
              <cms-page-sub-cat-type article=[[article]]>
              </cms-page-sub-cat-type> 
        </nav>
      </article>
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
      },
      add: {
        type: String,
        notify: true,
        value: '/add'
      },
      add: {
        type: String,
        notify: true,
        value: '/add'
      },
      categories: {
        type: String,
        notify: true,
        value: '/categories'
      },
      suCategories: {
        type: String,
        notify: true,
        value: '/sub_categories'
      },
      active: {
        type: String,
        value: ''
      },
      pages: {
        type: Array,
        notify: true
      },
      lastChosen: {
        type: Array,
        value: new Array()
      }
    }
  }

  ready() {
    super.ready()
    this.AskPages()
    this._routePageChanged(this.routeData)
    scroll({ top: 0, behavior: 'silent' });
  }

  log(data) {
    console.log('log from cms-page-viewer', data)
  }

  error(data) {
    console.error('error from cms-page-viewer', data)
  }

  _routePageChanged(data, boll) {
    if (data.page === 'add') {
      this._add()
    }

    if (data.page === 'categories') {
      this.toggleLists(data)
    }

    if (data.page === 'sub_categories') {
      this.toggleCats(data)

    }
  }

  toggleLists(data) {
    this.$.typer.classList.toggle('diferent')
    setTimeout(() => {
      if (this.routeData.page === 'categories') {
        this.active = this.categories
        this.categories = '/'
      } else if (this.categories === '/') {
        this.categories = '/categories'
        this.active = ''
      }
    }, 60)
  }

  toggleCats(data) {
    this.$.subCats.classList.toggle('diferent')
    setTimeout(() => {
      if (this.routeData.page === 'sub_categories') {
        this.active = this.suCategories
        this.suCategories = '/'
      } else if (this.suCategories === '/') {
        this.suCategories = '/sub_categories'
        this.active = ''
      }
    }, 60)
  }

  _add(event) {
    let elem = this.$.content
    setTimeout(() => {
      if (this.routeData.page === 'add') {
        this.add = '/'
      } else if (this.add === '/') {
        this.add = '/add'
        if (this.active !== '') {
          window.history.pushState({}, null, '/admin/pages' + this.active);
          window.dispatchEvent(new CustomEvent('location-changed'));
        }
      } else {
        console.log(this.routeData)
      }
    }, 60)
    if (elem.tada === false) {
      elem.set('content', [{ title: '', lang: '', type: '', name: '', image: '', placeholder: '' }])
      elem.set('add', true)
    }
    elem.parentElement.classList.toggle('diferent')
    elem.toggleElementPlease()
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

  AskPages() {
    this.DBW.askAllPages((done) => {
      this.set('pages', done)
      scroll({ top: 0, behavior: 'silent' });
    })
  }

  showName(cats, name) {
    return cats[name]
  }

}

customElements.define(cmsPageViewer.is, cmsPageViewer);
