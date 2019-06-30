import{cmsTopPageTemplate,html}from"./cms-login.js";class cmsMedia extends cmsTopPageTemplate{static get topTitle(){return html`
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
      <article name="images">         
        <cms-gallery-viewer route="{{subroute}}" lang="[[lang]]">
        
          <cms-galleries slot="galleries" id="galleries" 
            route="{{subroute}}" 
            images="{{Imags}}" 
            add="{{add}}" 
            contentto="{{contentto}}" 
            return-path="{{returnPath}}">
          </cms-galleries>

          <cms-images slot="images" id="images" 
            route="{{subroute}}" 
            image-data="{{Imags}}" 
            add="[[add]]" 
            contentto="[[contentto]]" 
            return-path="[[returnPath]]">
          </cms-images>

        </cms-gallery-viewer>
      </article>
      <article name="videos" route="{{subroute}}"> 
            videos
      </article>
  `}static get is(){return"cms-media"}static get properties(){return{lang:{type:String,notify:!0},langs:{type:Object,value:{}},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},returnPath:{type:String,notify:!0},contentto:{type:Object,notify:!0,value:{}},page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"},add:{type:Boolean,notify:!0},Imags:{type:Array,notify:!0},add:{type:Boolean,value:!1},search:{type:Boolean,computed:"_checkMyName(page, \"search\")"},images:{type:Boolean,computed:"_checkMyName(page, \"images\")"},videos:{type:Boolean,computed:"_checkMyName(page, \"videos\")"}}}static get observers(){return["_routePageChanged(routeData, query, active)"]}ready(){super.ready();this.translator.target("cms-image-viewer","setLangObject",this._setLObj.bind(this));this.translator.target("cms-image-viewer","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-image-viewer","setLangObject")}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(page,query){if("/media"===this.route.prefix){if(page!==void 0&&"page"in page){if(-1!==["search","images","videos"].indexOf(page.page)){this.page=page.page}else{console.log("view404",page,query)}}else{this.page="search"}}}_pageChanged(page){if(page!==void 0){if("images"===page){import("./media/cms-gallery-viewer.js").then(bundle=>bundle&&bundle.$cmsGalleryViewer||{}).then(module=>{return}).catch(error=>{console.log(error)});return}/*    if (page === 'articles') {
              import('./cms-articles-viewer');
              return;
            }
            if (page === 'view404') {
              import('./cms-404-warning');
              return;
            }*/}}}customElements.define(cmsMedia.is,cmsMedia);