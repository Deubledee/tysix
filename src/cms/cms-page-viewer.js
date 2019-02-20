import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-tabs/paper-tabs'
import '@polymer/paper-tabs/paper-tab'
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import './cms-gallery-viewer';
import './cms-common-styles.js';
class cmsPageViewer extends PolymerElement {
  static get template() {
    return html`
    <style include="cms-common-styles">
        :host {
          position: relative;
        }

        main {
          background-color: #fff;
          word-break: break-all;
          position: relative;
        }
      
        article {
          max-width: 1890px;
          min-width: 730px;
          color: #5487b6;
          padding-left: 21px;
          padding-right: 18px;
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
          left: 0px;
          top: -38px;
          height: 19px;
          max-width: 483px;
        }
    
          div[top] {
            background-color: #fff;
            width: 100.4%;
            height: 130px;
            box-sizing: border-box;
            padding-top: 30px;
            border-bottom: 1px solid #8098ad;
        }
    
        section {
          display: flex;
          flex-flow: row;
          font-weight: bold;
          padding: 4px;
          height: 50px;
          margin-left: 20px;
         /* margin-right: auto;*/
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
          color: #000;
          font-size: 25px;
          text-align: center;
          height: 72px;
          width: 257px;
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
          padding-top: 7px;
        }
    
        nav[center] {
          flex-flow: column;
          font-weight: bold;
          letter-spacing: 0.02em;
        }
    
        .diferent {
          display: none;
        }

        paper-tabs a {
          text-decoration: none;
          color: inherit;
          border-left: 1px solid;
          height: 38px;
          border-top: 1px solid;
          border-right: 1px solid;
          border-top-right-radius: 17px;
          background-color: #ffffff;
          margin-right: 2px;
        }
        
    </style>
  </custom-style>  
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" autoActivate>
    </app-route>
    <main id="main">
      <nav top>
        <app-toolbar typer>
            <paper-tabs no-bar>
              <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                <a href="[[rootPath]]content/pages/add-category-pages">
                  <paper-tab name="add-category-pages">
                      category pages
                    <paper-icon-button-light>
                        <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                    </paper-icon-button-light>
                  </paper-tab>
                </a>
                <a href="[[rootPath]]content/pages/"
                  <paper-tab name="add-sub-categoriy-pages">
                    sub category pages
                    <paper-icon-button-light>
                        <iron-icon icon="av:library-add" aria-label="sub categories"></iron-icon>
                    </paper-icon-button-light>
                  </paper-tab>
                </a>
              </iron-selector>

            </paper-tabs>
        </app-toolbar> 
      </nav>  
       
      <iron-pages selected="[[page]]" attr-for-selected="name"> 
          <article name="add-category-pages">  
            <slot name="add"></slot>  
          </article>

          <article name="home"+>           
            <slot name="categories">
            </slot>

            <slot name="suCategories">
            </slot>
          </article>

      </iron-pages>  
    </main>  

      `
  }
  static get is() { return 'cms-page-viewer'; }

  static get properties() {
    return {
      lang: {
        type: String,
        notify: true
      },
      page: {
        type: String,
        reflectToAttribute: true,
        observer: '_pageChanged'
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

  static get observers() {
    return [
      '_routePageChanged(routeData)'
    ];
  }

  ready() {
    super.ready()
    //this.AskPages()
    this._routePageChanged(this.routeData)
    scroll({ top: 0, behavior: 'silent' });
  }

  log(event) {
    console.log('log from cms-page-viewer', event)
  }

  _adaptToScreen(event) {
    console.log('log from cms-page-viewer', event,
      window.screen.availWidth,
      window.screen.width)
    this.$.main
  }

  error(data) {
    console.error('error from cms-page-viewer', data)
  }

  _routePageChanged(page) {
    if (page !== undefined && 'page' in page) {
      if (!page.page) {
        this.page = 'home';
      } else if (['add-category-pages', 'edit-category-pages'].indexOf(page.page) !== -1) {
        this.page = 'add-category-pages';
      } else {
        this.page = 'view404';
      }
    } else if (page instanceof Object === true) {
      this.page = 'home';
    }
  }

  _pageChanged(page) {
    if (page !== undefined) {
      if (page === 'home') {
        import('./cms-page-list-type.js').then(item => {
        });
        /* import('./cms-page-sub-cat-type.js').then(item => {
         });*/
        return
      }
      if (page === 'add-category-pages') {
        import('./cms-page-content.js').then(item => {
          console.log(page)
        });
        return
      }
      if (page === 'view404') {
        import('../shop-404-warning.js');
        return
      }
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

}

customElements.define(cmsPageViewer.is, cmsPageViewer);
