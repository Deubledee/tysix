import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/paper-spinner/paper-spinner-lite';
import '@polymer/iron-pages/iron-pages';
import '@polymer/iron-selector/iron-selector';
import '../styles/cms-common-top-styles';

export class cmsTopPageTemplate extends PolymerElement {
  static get template() {
    return html`
    <style include="cms-common-top-styles">
    :host {
      position: relative;      
  }
    </style>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
    </app-route>
    <main> 
        <div class="divtop">
          <div class="topLabel">     
            <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation"> 
                <a>  <  </a>            
                <dom-repeat repeat items="[[breadcrumbs]]" as="page">
                  <template>  
                    ${this.topTitle}                        
                  </template>
                </dom-repeat> 
            </iron-selector>         
          </div>
        </div> 
        <nav class="navpages">
          <iron-pages selected="[[page]]" attr-for-selected="name"> 
                  ${this.viewPages}  
          <iron-pages>            
        </nav>
    </main>  
      `;
  }

  static get topTitle() {
    return html`
      <a>  
        <paper-button  aria-label="Go back page">     
        </paper-button>               
      </a>     
  `}

  static get viewPages() {
    return html`
    <cms-page-viewer name="pages" route="[[subroute]]">
    
        <cms-page-cats slot="categories"user="[[user]]" route="[[route]]">
        </cms-page-cats>

        <cms-page-subcats slot="sub-categories" user="[[user]]" route="{{subroute}}">
        </cms-page-subcats>

    </cms-page-viewer>

    <cms-article-viewer name="articles" user="[[user]]" route="[[subroute]]">

        <cms-article-content slot="addart" user="[[user]]" route="[[subroute]]">
        </cms-article-content>

        <cms-article-list-type slot="categories" user="[[user]]" route="[[subroute]]">
        </cms-article-list-type>

        <cms-article-view slot="view" user="[[user]]" route="[[subroute]]">
        </cms-article-view>

    </cms-article-viewer>
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
}
customElements.define(cmsTopPageTemplate.is, cmsTopPageTemplate);