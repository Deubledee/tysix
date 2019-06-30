import{cmsTopPageTemplate,html$1 as html,dataBaseworker,scroll}from"./cms-login.js";const __DEV=!0,_DBW=new dataBaseworker,_STYLES=_DBW.getElementAssets("cms-image-viewer",!0);class cmsImageViewer extends cmsTopPageTemplate{static get topTitle(){return html`
    <div> [[Media]] </div>
    <paper-icon-button-light>
      <iron-icon icon="image:photo-library" aria-label="Content">
      </iron-icon>
    </paper-icon-button-light>`}static get topPages(){return html`
      <a href="[[rootPath]]media/search">
        <paper-button class="button" front$="[[search]]" name="search" aria-label="search">
                    [[Search]]
                <iron-icon icon="icons:search" aria-label="search">
                </iron-icon>
        </paper-button>
      </a> 
      <a href="[[rootPath]]media/images">
        <paper-button class="button" front$="[[images]]" name="images" aria-label="images">
                    [[Images]]
                <iron-icon icon="av:library-books" aria-label="images">
                </iron-icon>
        </paper-button>
      </a> 
      <a href="[[rootPath]]media/videos">
        <paper-button  class="button" front$="[[videos]]" name="videos" aria-label="videos">    
                    [[Videos]]
                <iron-icon icon="av:art-track" aria-label="cms videos">
                </iron-icon> 
        </paper-button>      
      </a>`}static get viewPages(){return html`
      <article name="images" route="[[subroute]]" lang="[[lang]]">         
        <cms-galleries id="galleries" closed$="[[open]]" sett=[[sett]] images="{{images}}" reset="[[reset]]">
          <cms-images id="images" slot="images" class="fodasse" image="{{image}}" cancel="{{evet}}" openMain="{{doNotOpenMain}}">
          </cms-images> 
        </cms-galleries>
      </article>
      <article name="videos" route="[[subroute]]" lang="[[lang]]"> 
            videos
      </article>
  `}static get is(){return"cms-image-viewer"}static get properties(){return{lang:{type:String,notify:!0,observer:"__changeLang"},langs:{type:Object,value:{}},page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"},search:{type:Boolean,computed:"_checkMyName(page, \"search\")"},images:{type:Boolean,computed:"_checkMyName(page, \"images\")"},videos:{type:Boolean,computed:"_checkMyName(page, \"videos\")"}}}static get observers(){return["_routePageChanged(routeData, query, active)"]}ready(){super.ready();_STYLES.then(querySnapshot=>{let style=querySnapshot.data();this._setLangObject(style)}).catch(function(error){console.error("Error reteaving assets: ",error)});this._routePageChanged(this.routeData,0);scroll({top:0,behavior:"silent"})}__changeLang(){try{if(this.langs[this.lang]){let obj=this.langs[this.lang];for(let par in obj){setTimeout(()=>{this.set(par,obj[par])},60)}}}catch(err){console.error(err)}}_setLangObject(langs){try{for(let par in langs){if("styles"!==par){this.langs[par]=langs[par].pop()}}this.__changeLang()}catch(err){console.error(err)}}_routePageChanged(page,query){if("/media"===this.route.prefix){if(page!==void 0&&"page"in page){if(-1!==["search","images","videos"].indexOf(page.page)){this.page=page.page}else{console.log("view404",page,query)}}else{this.page="search"}}}_pageChanged(page){console.log("Media",page);if(page!==void 0){}}}customElements.define(cmsImageViewer.is,cmsImageViewer);