import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-tabs/paper-tabs'
import '@polymer/paper-tabs/paper-tab'
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-selector/iron-selector.js';
import './cms-common-styles.js';
class cmsContent extends PolymerElement {
    static get template() {
        return html`
    <style>
        main {
            background-color: #fff;
            word-break: break-all;
            position: absolute;
            left: 0px;
            top: 61px;
            width: 100%;
            height: 900px;
        }
        
        article {
          box-sizing: border-box;
          margin-bottom: 10px;
          padding: 12px;
          max-width: 1200px;
          margin-left: 5%;
        }
      
        article[centerListItem]  {
            display: flex;
            flex-flow: wrap;
            box-sizing: border-box;
            text-align: center;
            padding: 3px;
            margin-top: 4px;
            margin-bottom: 1px;
            margin-left: auto;
            max-width: 100%;
           /* box-shadow: 0px 0px 1px grey;*/
        }
          
        article[centerListItem] div {
            flex-basis: 30%;
            flex-grow: 1;
            display: block;
            text-align: center;
            box-shadow: 0px 1px 1px grey;            
          } 
          
          article[centerListItem] h4 {
            word-break: break-word;
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
          left: -22px;
          top: -28.19px;
          height: 19px;
          max-width: 483px;
        }

        nav[top] section { 
            font-size: 13px;
        }

        nav[top] iron-icon { 
            height: 13px;
        }
    
        div[top] {
            position: relative;
            top: -3px;
            left: 0px;
            background-color: #d8ebed;
            height: 130px;
            box-sizing: border-box;
            padding-top: 30px;
            border-bottom: 1px solid #8098ad
        }

        section {
          display: flex;
          flex-flow: row;
          font-weight: bold;
          padding: 4px;
          height: 50px;
          margin-left: 20px;
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

        section a {
            text-decoration: none;
            color: inherit;
        }

        paper-button {
            text-decoration: none;
            color: inherit;
            border-left: 1px solid;
            border-bottom: 1px solid;
            height: 31px;
            background-color: #e1e1e1;
            border-top: 1px solid;
            border-right: 1px solid;
            margin-right: -8px
        }

        paper-button[front] {
            height: 31px;
            background-color: #ffffff;
            border-bottom: 1px solid #ffffff;
        }

        cms-page-viewer {
            top: 70px;
            left: -3px;
        }

        nav[pages]{
            display: list-item;
            padding-left: 0px;
        }
                 
    </style>
  </custom-style>  
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}">
    </app-route>
    <main> 
        <div top>
          <section title2>
            <div> Content </div>
            <paper-icon-button-light>
              <iron-icon icon="av:library-books" aria-label="Content"></iron-icon>
            </paper-icon-button-light>
          </section>
        </div>
        <nav top>
            <app-toolbar typer>
                <section>
                    <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                        <a href="[[rootPath]]content/search">
                            <paper-button front$="[[search]]" name="search" aria-label="pages">
                                        search
                                    <iron-icon icon="av:library-books" aria-label="categories">
                                    </iron-icon>
                            </paper-button>
                        </a> 
                        <a href="[[rootPath]]content/pages">
                            <paper-button front$="[[pages]]" name="pages" aria-label="pages">
                                        pages
                                    <iron-icon icon="av:library-books" aria-label="categories">
                                    </iron-icon>
                            </paper-button>
                        </a> 
                        <a href="[[rootPath]]content/articles">
                            <paper-button front$="[[articles]]" name="articles" aria-label="Articles">    
                                        Articles
                                    <iron-icon icon="av:art-track" aria-label="sub categories">
                                    </iron-icon> 
                            </paper-button>
                        </a>
                </iron-selector>
                </section>
            </app-toolbar> 
        </nav>  
        <nav pages>
            <iron-pages selected="[[page]]" attr-for-selected="name">
                <div name="search">
                    <div breadcrumbs>
                    </div>
                    <nav>
                        <div>
                            <article>
                            
                            <article>
                        </div>
                        <div>

                        </div>
                        <div>

                        </div>
                    </nav>
                    Home Page here
                </div>

                <cms-page-viewer name="pages" route="[[subroute]]" lang=[[lang]]> 
                    <paper-spinner id="spinner" active></paper-spinner>
                
                    <cms-page-content slot="add" id="content" route="[[subroute]]" user="[[user]]">
                    </cms-page-content>
                    
                    <cms-page-list-type slot="categories">
                    </cms-page-list-type>  

                    <cms-page-sub-cat-type slot="suCategories">
                    </cms-page-sub-cat-type>  
                </cms-page-viewer>

                <cms-articles-viewer route="[[subroute]]" name="articles" lang=[[lang]]>
                    <paper-spinner id="spinner" active></paper-spinner> 
                </cms-articles-viewer>  
            <iron-pages>            
        </nav>
    </main>  

      `
    }
    static get is() { return 'cms-content'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
            },
            user: {
                type: Object,
                notify: true
            },
            page: {
                type: String,
                reflectToAttribute: true,
                observer: '_pageChanged'
            },
            search: {
                type: Boolean,
                computed: '_checkMyName(page, "search")'
            },
            pages: {
                type: Boolean,
                computed: '_checkMyName(page, "pages")'
            },
            articles: {
                type: Boolean,
                computed: '_checkMyName(page, "articles")'
            },
            front: {
                type: Boolean,
                notify: true,
                reflectToAttribute: true
            },
            lang: {
                type: String,
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

    _checkMyName(event, name) {
        if (event === name) {
            return true
        } else {
            return false
        }
    }

    ready() {
        super.ready()
        //this.AskPages()
        this._routePageChanged(this.routeData)
        scroll({ top: 0, behavior: 'silent' });
    }

    log(data) {
        console.log('log from cms-content', data)
    }

    error(data) {
        console.error('error from cms-page-viewer', data)
    }

    _routePageChanged(page) {
        if (page !== undefined && 'page' in page) {
            if (['articles', 'pages', 'search'].indexOf(page.page) !== -1) {
                this.page = page.page;
            } else {
                this.page = 'view404';
            }
        } else {
            this.page = 'search';
        }
    }

    _pageChanged(page) {
        if (page !== undefined) {
            if (page === 'pages') {
                import('./cms-page-viewer.js');
                return
            }
            if (page === 'articles') {
                import('./cms-articles-viewer.js');
                return
            }
            if (page === 'view404') {
                import('../shop-404-warning.js');
                return
            }
        }
    }
}

customElements.define(cmsContent.is, cmsContent);
