import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import '@polymer/paper-spinner/paper-spinner-lite';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-selector/iron-selector';
import '../styles/cms-common-top-styles';

export class cmsTopPageTemplate extends PolymerElement {
  static get template() {
    return html`
    <style include="cms-common-top-styles">
    </style>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
    </app-route>
    <main> 
        <div class="divtop">
          <!--section class="title2"-->
            ${this.topTitle}
          <!--/section-->
        </div> 
        <nav class="navpages">
            <iron-pages selected="[[page]]" attr-for-selected="name">               
              <iron-selector name="home" toppage selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                <nav  class="navtop"> 
                            ${this.topPages}  
                </nav> 
              </iron-selector>
              <div name="search">
                  ${this.homePage} 

              </div>
                    ${this.viewPages}  
            <iron-pages>            
        </nav>
    </main>  

      `;
  }
  static get topTitle() {
    return html`
    <div class="topLabel">     
      <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation"> 
          <a>   
              < 
          </a>            
          <dom-repeat repeat items="[[breadcrumbs]]" as="page">
              <template>  
                  <a href="[[_getStr(page)]][[queryContent]]">  
                      <paper-button  aria-label="Go back page">                   
                      [[_getPage(page)]]
                      </paper-button>               
                  </a>               
              </template>
          </dom-repeat> 
      </iron-selector>         
    </div>
`
  }
  static get topPages() {
    return html`
      <section>
        <a  on-click="_resetEvent" href="[[rootPath]]content/search">
          <paper-button class="button" name="search" aria-label="pages">
                  [[Search]]
              <iron-icon icon="icons:search" aria-label="categories">
              </iron-icon>
          </paper-button>
        </a> 
      </section>
      <section>
        <a  on-click="_resetEvent" href="[[rootPath]]content/pages" id="pages">
          <paper-button class="button" name="pages" aria-label="pages">
                  [[Pages]]
              <iron-icon icon="av:library-books" aria-label="categories">
              </iron-icon>
          </paper-button>
        </a> 
      </section>
      <section>
        <a on-click="_resetEvent" href="[[rootPath]]content/articles">
          <paper-button  class="button"  name="articles" aria-label="Articles"> 
                  [[Articles]]
              <iron-icon icon="av:art-track" aria-label="sub categories">
              </iron-icon> 
          </paper-button>      
        </a>
      </section>`
  }
  static get homePage() {
    return html` 
      <nav class="">
          <div>
            <h3> [[Search]] </h3>
              <article>    
                <iron-icon icon="icons:search" aria-label="search"> 
                </iron-icon>          
                <paper-input></paper-input>
              <article>
          </div>
      </nav>`
  }
  static get viewPages() {
    return html`
    <cms-page-viewer name="pages" route="[[subroute]]">
    
        <cms-page-cats slot="categories"user="[[user]]" route="[[subroute]]">
        </cms-page-cats>

        <cms-page-subcats slot="sub-categories" user="[[user]]" route="{{subroute}}">
        </cms-page-subcats>

        <cms-page-cats-content slot="add-cats" user="[[user]]" route="[[subroute]]">
        </cms-page-cats-content>

        <cms-subcats-content slot="add-subcats" user="[[user]]" route="[[subroute]]">
        </cms-subcats-content>

    </cms-page-viewer>

    <cms-articles-viewer name="articles" user="[[user]]" route="[[subroute]]">

        <cms-article-content slot="addart" user="[[user]]" route="[[subroute]]">
        </cms-article-content>

        <cms-article-list-type slot="categories" user="[[user]]" route="[[subroute]]">
        </cms-article-list-type>

        <cms-article-view slot="view" user="[[user]]" route="[[subroute]]">
        </cms-article-view>

    </cms-articles-viewer>
    `
  }
  static get is() { return 'cms-top-page-template'; }
  static get properties() {
    return {
      front: {
        type: Boolean,
        notify: true,
        reflectToAttribute: true
      },
      queryContent: String
    };
  }

  ready() {
    super.ready();
  }
  _resetEvent() {
    this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer,
      microTask, () => {
        window.dispatchEvent(new CustomEvent('reset'))
      }
    )
  }
  _getStr(item) {
    let str = ''
    str = (item === '/content' || item === '/media' || item === '/users') ? `${item}/` : `${item}`
    let count = item.split('/').length
    this.queryContent = (count > 2) ? `?content=${this.query.content}&reset=false&update=${this.query.parent}` : ''
    return str
  }
  _getPage(item) {
    let word, final
    if (item === 'cmshome') {
      word = item.split('')
      word[0] = word[0].toUpperCase()
      word = word.join('')
      this.translator.changeItemTitleLang.call(this, word.toString(), 'word')
    } else {
      word = item.split('/')
      word.shift()
      word = word.pop()
      word = word.split('')
      word[0] = word[0].toUpperCase()
      word = word.join('')
      final = (word === 'Subcategory-pages') ? 'SubcategoryPages' : word
      this.translator.changeItemTitleLang.call(this, final.toString(), 'word')/**/
    }
    return this.word
  }
}
customElements.define(cmsTopPageTemplate.is, cmsTopPageTemplate);