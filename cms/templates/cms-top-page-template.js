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
        <nav class="navtop">
            <app-toolbar>
                <section>
                  <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                    ${this.topPages}  
                  </iron-selector>
                </section>
            </app-toolbar> 
        </nav> 
        </div> 
        <nav class="navpages">
            <iron-pages selected="[[page]]" attr-for-selected="name">
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
      [[Content]] 
      <paper-icon-button-light>
        <iron-icon icon="social:pages" aria-label="Content"></iron-icon>
      </paper-icon-button-light>
    </div>
`
  }
  static get topPages() {
    return html`
        <a  on-click="_resetEvent" href="[[rootPath]]content/search">
          <paper-button class="button" front$="[[search]]" name="search" aria-label="pages">
                  [[Search]]
              <iron-icon icon="icons:search" aria-label="categories">
              </iron-icon>
          </paper-button>
        </a> 
        <a  on-click="_resetEvent" href="[[rootPath]]content/pages" id="pages">
          <paper-button class="button" front$="[[pages]]" name="pages" aria-label="pages">
                  [[Pages]]
              <iron-icon icon="av:library-books" aria-label="categories">
              </iron-icon>
          </paper-button>
        </a> 
        <a on-click="_resetEvent" href="[[rootPath]]content/articles">
          <paper-button  class="button" front$="[[articles]]" name="articles" aria-label="Articles">    
                  [[Articles]]
              <iron-icon icon="av:art-track" aria-label="sub categories">
              </iron-icon> 
          </paper-button>      
        </a>`
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

        <cms-content-subcats slot="sub-categories" user="[[user]]" route="{{subroute}}">
        </cms-content-subcats>

        <cms-page-list-type-content slot="add" user="[[user]]" route="[[subroute]]">
        </cms-page-list-type-content>

        <cms-page-list-type slot="categories"user="[[user]]"  route="[[subroute]]">
        </cms-page-list-type>

        <cms-page-sub-cat-type slot="suCategories" user="[[user]]" route="[[subroute]]">
        </cms-page-sub-cat-type>

    </cms-page-viewer>

    <cms-articles-viewer name="articles" user="[[user]]" route="[[subroute]]">

        <cms-article-content slot="addart" user="[[user]]" route="[[subroute]]">
        </cms-article-content>

        <cms-article-list-type slot="categories" user="[[user]]" route="[[subroute]]">
        </cms-article-list-type>

        <cms-article-view slot="view" user="[[user]]"  route="[[subroute]]">
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
      }
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
  _checkMyName(event, name) {
    if (event === name) {
      return true;
    }
    else {
      return false;
    }
  }
}
customElements.define(cmsTopPageTemplate.is, cmsTopPageTemplate);