import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/paper-tabs/paper-tabs.js';
import '@polymer/paper-tabs/paper-tab.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-input/paper-input.js';
import './cms-article-content.js';
import './cms-article-list-type.js';
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
      margin-bottom: 60px;
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
  </style>
  <main>
      <div top>
        <section title2>
          <paper-icon-button-light>
            <iron-icon icon="av:art-track" aria-label="Go back"></iron-icon>
          </paper-icon-button-light>
          <div> Articles</div>
        </section>
      </div>
    <nav top>
      <app-toolbar typer>
          <paper-tabs no-bar >
            <paper-tab on-click="toggleLists">
                list page articles
            </paper-tab>
            <paper-tab on-click="toggleCats">
                sub category page articles
            </paper-tab>
          </paper-tabs>
      </app-toolbar> 
    </nav>
    <article>  
      <nav center id="typer" class="diferent">   
          <dom-repeat items="[[articles]]" as="article">
            <template>
              <cms-article-list-type article=[[article]]>
              </cms-article-list-type>
            </template>
          </dom-repeat>  
      </nav>
    </article>
    <article>
      <nav center id="subCats" class="diferent">  
        <dom-repeat items="[[cats]]" as="article">
          <template>
            <cms-artilce-sub-cat-type article=[[article]]>
            </cms-artilce-sub-cat-type>
          </template>
        </dom-repeat>   
      </nav>
    </article> 
  </main>   
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
      setter: {
        type: String,
        notify: true,
        observer: 'resetCollor'
      },
      closed: {
        type: Boolean,
        notify: true,
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
      }
    }
  }

  ready() {
    super.ready();
    this._getArticles()
    scroll({ top: 0, behavior: 'silent' });
  }

  log(data) {
    console.log('log from cms-article-viewer', data)
  }

  error(data) {
    console.error('error from cms-article-viewer', data)
  }

  /*deSpin() {
    this.$.spinner1.active = !this.$.spinner1.active
    //this.$.spinner2.active = !//this.$.spinner2.active
  }*/

  _getArticles() {
    /* if (this.$.spinner1.active === false) {
       this.deSpin()
     }*/
    this.DBW.askAllArticles((data) => {
      this.articles = data
      scroll({ top: 0, behavior: 'silent' });
    })
  }

  resetCollor(data, element) {
    if (data === 'newPage') {
      this.AskPages()
    }
  }

  toggleLists() {
    this.$.typer.classList.toggle('diferent')
  }

  toggleCats() {
    this.$.subCats.classList.toggle('diferent')
  }

}

customElements.define(cmsArticlesViewer.is, cmsArticlesViewer);
