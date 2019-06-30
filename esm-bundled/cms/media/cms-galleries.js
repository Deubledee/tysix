import{html,cmsMiddlePageTemplate,microTask,Debouncer,cmsItemTemplate,Setter}from"../cms-login.js";const Consts=new Setter;class cmsGalleryItem extends cmsItemTemplate{static get template(){return html`
        <style>    
        :host {
            position: relative;
            display: block;
        } 
                /* styles reside in cms-content*/
        </style>        

        <slot name="table"></slot> 
            `}static get is(){return"cms-gallery-item"}static get properties(){return{add:{type:Boolean,notify:!0},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},images:{type:Array,notify:!0},query:String,returnPath:{type:String,notify:!0},addImageTo:{type:String,notify:!0,value:{}},gallery:{type:Array,notify:!0,observer:"_putRow"},noItem:{type:Array,value:[{url:[]}]}}}ready(){super.ready()}_putRow(data){let template=`
            <article centerListItem slot="table">
                <div>
                    <span> 
                        <paper-button>
                            ${this._getGalleryName(data.content[0])}
                        </paper-button>
                    </span>
                </div>
                <div>
                    <paper-button>
                        <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>                   
                        <paper-icon-button  icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                    </paper-button>
                </div> 
                <div>
                    <paper-icon-button icon="av:not-interested" aria-label="mode-delete">
                    </paper-icon-button>      
                </div>
            </article>`;this.translator.template.innerHTML=template;this.translator.clone(this);this.children[this.childElementCount-1].children[1].children[0].addEventListener("click",this._showImages.bind(this));this.children[this.childElementCount-1].children[2].children[0].addEventListener("click",this._openConfirm.bind(this));this.children[this.childElementCount-1].children[2].children[0].setAttribute("id","item-"+(this.childElementCount-1))}_getGalleryName(gall){return gall.gallery}_showImages(){this.set("images",[]);this.set("images",this.gallery);this.default();if(this[this.addImageTo]!==void 0){this[this.addImageTo]()}}default(){window.history.pushState({},null,`/media/images/view-images${location.search}`);window.dispatchEvent(new CustomEvent("location-changed"))}editArticles(){this.set("returnPath","content/articles/edit-articles")}editPages(){this.set("returnPath","content/pages/add-category-pages")}deleteGallerie(data){console.log(this.gallery.content[data]);/* Consts._DBW.deleteMediaGallery((done, err) => {
                                                  if (done !== 'error') {
                                                      this.setter = true
                                                  } else {
                                                      console.error(err)
                                                  }
                                              }, data)*/}_openConfirm(event){let index=event.srcElement.id.split("-").pop();this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this._getGalleryName(this.gallery.content[0]),method:this.deleteGallerie.bind(this),argument:index,headderMsgKind:"delete",type:"gallery"}}))})}}customElements.define(cmsGalleryItem.is,cmsGalleryItem);class cmsGalleries extends cmsMiddlePageTemplate{static get _getShoutAnchor(){return html` 
            <a href="[[rootPath]]media/images/add-gallery">
                <paper-tab name=" add-category-pages">
                [[ADD]] [[Galleries]]
                    <paper-icon-button-light>
                        <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                    </paper-icon-button-light>
                </paper-tab>
            </a>`}static get _getSilentAnchor(){return html`
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="reset" href="[[rootPath]]media/">
            </a>
        </iron-selector>
        `}static get _getBottom(){return html`
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[Gallery]] </h4>
            </div>
        </section>    
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[viewEdit]] </h4>
            </div>
        </section>                       
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[remove]] </h4>
            </div>
        </section>  
        `}static get _getTable(){return html`
        <dom-repeat items="[[galleries]]" as="gallery">
            <template>                
                <cms-gallery-item 
                    route="{{route}}" 
                    gallery="[[gallery]]" 
                    images="{{images}}" 
                    add-image-to="[[addImageTo]]"
                    query="[[query]]"
                    return-path="{{returnPath}}"> 
                </cms-gallery-item>
            </template>
        </dom-repeat>
        `}static get _getNavside(){return html`
        <dom-repeat repeat items="[[inform]]" as="detail">
            <template>
                <div class="flexsidecenter">
                    <aside>
                        <span>
                            [[info]]
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                        [[GalleryCount]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                        [[imageCount]]
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                        <b> [[detail.GalleryCount]] </b>
                        </span>
                    </aside>
                    <aside>
                        <span>
                        <b> [[detail.imageCount]] </b>
                        </span>
                    </aside>
                </div>
            </template>
        </dom-repeat>
        `}static get is(){return"cms-galleries"}static get properties(){return{lang:{type:String,observer:"__changeLang"},langs:{type:Object,value:{}},returnPath:{type:String,notify:!0},addImageTo:{type:String,notify:!0},contentto:{type:Object,notify:!0},add:{type:Boolean,notify:!0},images:{type:Array,notify:!0},galleries:{type:Array,notify:!0},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}}}}static get observers(){return["_routePageChanged(routeData, query, active)"]}ready(){super.ready();this.translator.template.innerHTML=`<paper-spinner-lite active="false" slot="spinner">
    </paper-spinner-lite>`;this.translator.clone(this);this.translator.target("cms-galleries","setLangObject",this._setLObj.bind(this));this.translator.target("cms-galleries","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-galleries","setLangObject");this._getGalleries(!0)}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(routeData,query,active){if(!0===active&&-1!==["galleries"].indexOf(routeData.page)&&!0==="addimageto"in query){this.addImageTo=query.method;this.contentto=JSON.parse(atob(query.content));this.add=!0}if(!0===active&&-1!==["galleries"].indexOf(routeData.page)&&!1==="addimageto"in query){this.addImageTo="";this.contentto={};this.add=!1}}_setGalleries(event){for(let par in event){if("Info"!==par){this.set("galleries",event[par])}else{this.set("inform",event[par])}}}_getGalleries(data){if(!0===data||"true"===data){this.translator._DBW.getMediaContent(done=>{this._setGalleries(done)},{name:"galleries"},!0)}this.removeChild(this.children[0])}log(data){console.log(data)}}customElements.define(cmsGalleries.is,cmsGalleries);