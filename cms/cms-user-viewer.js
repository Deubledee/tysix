import{cmsTopPageTemplate,html as html$1,dataBaseworker,scroll,Polymer,html$1 as html,PaperSpinnerBehavior}from"../src/cms-login.js";const template=html`
  <style include="paper-spinner-styles"></style>

  <div id="spinnerContainer" class-name="[[__computeContainerClasses(active, __coolingDown)]]" on-animationend="__reset" on-webkit-animation-end="__reset">
    <div class="spinner-layer layer-1">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>

    <div class="spinner-layer layer-2">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>

    <div class="spinner-layer layer-3">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>

    <div class="spinner-layer layer-4">
      <div class="circle-clipper left">
        <div class="circle"></div>
      </div>
      <div class="circle-clipper right">
        <div class="circle"></div>
      </div>
    </div>
  </div>
`;template.setAttribute("strip-whitespace","");/**
                                               Material design: [Progress &
                                               activity](https://www.google.com/design/spec/components/progress-activity.html)
                                               
                                               Element providing a multiple color material design circular spinner.
                                               
                                                   <paper-spinner active></paper-spinner>
                                               
                                               The default spinner cycles between four layers of colors; by default they are
                                               blue, red, yellow and green. It can be customized to cycle between four
                                               different colors. Use <paper-spinner-lite> for single color spinners.
                                               
                                               ### Accessibility
                                               
                                               Alt attribute should be set to provide adequate context for accessibility. If
                                               not provided, it defaults to 'loading'. Empty alt can be provided to mark the
                                               element as decorative if alternative content is provided in another form (e.g. a
                                               text block following the spinner).
                                               
                                                   <paper-spinner alt="Loading contacts list" active></paper-spinner>
                                               
                                               ### Styling
                                               
                                               The following custom properties and mixins are available for styling:
                                               
                                               Custom property | Description | Default
                                               ----------------|-------------|----------
                                               `--paper-spinner-layer-1-color` | Color of the first spinner rotation | `--google-blue-500`
                                               `--paper-spinner-layer-2-color` | Color of the second spinner rotation | `--google-red-500`
                                               `--paper-spinner-layer-3-color` | Color of the third spinner rotation | `--google-yellow-500`
                                               `--paper-spinner-layer-4-color` | Color of the fourth spinner rotation | `--google-green-500`
                                               `--paper-spinner-stroke-width` | The width of the spinner stroke | 3px
                                               
                                               @group Paper Elements
                                               @element paper-spinner
                                               @hero hero.svg
                                               @demo demo/index.html
                                               */Polymer({_template:template,is:"paper-spinner",behaviors:[PaperSpinnerBehavior]});const __DEV=!0/* ignoreName */ /* skipSlots */,_DBW=new dataBaseworker,_STYLES=_DBW.getElementAssets("cms-user-viewer",!0);class cmsUserViewer extends cmsTopPageTemplate{static get topTitle(){return html$1`
      <div> [[Content]] </div>
      <paper-icon-button-light>
        <iron-icon icon="social:person-outline" aria-label="Content">
        </iron-icon>
      </paper-icon-button-light>`}static get topPages(){return html$1`
        <a href="[[rootPath]]users/search">
          <paper-button class="button" front$="[[search]]" name="search" aria-label="search">
                      [[Search]]
                  <iron-icon icon="icons:search" aria-label="search">
                  </iron-icon>
          </paper-button>
        </a> 
        <a href="[[rootPath]]users/groups">
          <paper-button class="button" front$="[[groups]]" name="groups" aria-label="groups">
                      [[Groups]]
                  <iron-icon icon="av:library-books" aria-label="groups">
                  </iron-icon>
          </paper-button>
        </a> 
        <a href="[[rootPath]]users/users">
          <paper-button  class="button" front$="[[users]]" name="users" aria-label="users">    
                      [[Users]]
                  <iron-icon icon="av:art-track" aria-label="cms users">
                  </iron-icon> 
          </paper-button>      
        </a> 
        <a href="[[rootPath]]users/storeUsers">
          <paper-button  class="button" front$="[[storeUsers]]" name="storeUsers" aria-label="users">    
                      [[StoreUsers]]
                  <iron-icon icon="av:art-track" aria-label="store users">
                  </iron-icon> 
          </paper-button>      
        </a> 
        <a href="[[rootPath]]users/clientUsers">
          <paper-button  class="button" front$="[[clientUsers]]" name="clientUsers" aria-label="users">    
                      [[ClientUsers]]
                  <iron-icon icon="av:art-track" aria-label="client users">
                  </iron-icon> 
          </paper-button>      
        </a>`}static get viewPages(){return html$1`
      <article name="groups" route="[[subroute]]" lang="[[lang]]"> 
          groups
      </article>
    <article name="users" route="[[subroute]]" lang="[[lang]]"> 
        users
    </article>
    <article name="storeUsers" route="[[subroute]]" lang="[[lang]]"> 
        storeUsers
    </article>
    <article name="clientUsers" route="[[subroute]]" lang="[[lang]]"> 
        clientUsers
    </article>
    `}static get is(){return"cms-user-viewer"}static get properties(){return{user:{type:Object,notify:!0},page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"},lang:{type:String,notify:!0,observer:"__changeLang"},langs:{type:Object,value:{}},search:{type:Boolean,computed:"_checkMyName(page, \"search\")"},groups:{type:Boolean,computed:"_checkMyName(page, \"groups\")"},users:{type:Boolean,computed:"_checkMyName(page, \"users\")"},storeUsers:{type:Boolean,computed:"_checkMyName(page, \"storeUsers\")"},clientUsers:{type:Boolean,computed:"_checkMyName(page, \"clientUsers\")"}}}static get observers(){return["_routePageChanged(routeData, query, active)"]}ready(){super.ready();_STYLES.then(querySnapshot=>{let style=querySnapshot.data();this._setLangObject(style);// console.log(style)
}).catch(function(error){console.error("Error reteaving assets: ",error)});this._routePageChanged(this.routeData,0);scroll({top:0,behavior:"silent"})}__changeLang(){try{if(this.langs[this.lang]){let obj=this.langs[this.lang];for(let par in obj){if(!0===!!this[par]){this.set(par,obj[par])}else{this.set(par,"");this.set(par,obj[par])}}}}catch(err){console.error(err)}}_setLangObject(langs){try{for(let par in langs){if("styles"!==par){this.langs[par]=langs[par].pop()}}this.__changeLang()}catch(err){console.error(err)}}_routePageChanged(page,query){if("/users"===this.route.prefix){if(page!==void 0&&"page"in page){if(-1!==["users","groups","search","clientUsers","storeUsers"].indexOf(page.page)){this.page=page.page}else{console.log("view404",page,query)}}else{this.page="search"}}}_pageChanged(page){console.log("users",page);if(page!==void 0){/*  if (page === 'pages') {
                                 import('./cms-page-viewer').then(module => {
                                   return;
                                 }).catch(error => {
                                   console.log(error);
                                 });
                                 return;
                               }
                               if (page === 'articles') {
                                 import('./cms-articles-viewer');
                                 return;
                               }
                               if (page === 'view404') {
                                 import('../shop-404-warning');
                                 return;
                               }*/}}}customElements.define(cmsUserViewer.is,cmsUserViewer);var cmsUserViewer$1={cmsUserViewer:cmsUserViewer};export{cmsUserViewer$1 as $cmsUserViewer,cmsUserViewer};