import{cmsItemTemplate,html,Debouncer,microTask,cmsMiddlePageTemplate}from"../cms-login.js";class cmsArticleListItem extends cmsItemTemplate{static get template(){return html`
    <style>    
    :host {
        position: relative;
        display: block;
    } 
            /* styles reside in cms-content*/
    </style>        
    <slot name="table"></slot>`}static get is(){return"cms-article-list-item"}static get properties(){return{noItem:{type:Array,value:[{image:[]}]},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}}}}ready(){super.ready()}log(data){console.log("log from cms-article-viewer",data)}_putRow(data){this.translator.template.innerHTML=`
        <article centerListItem slot="table">
            <div>
                <span> 
                    ${this._getPagename(data)}
                </span>
            </div>
            <div>
                <paper-button>
                    <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>                   
                    <paper-icon-button  icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                </paper-button> 
            </div>  
            <div>                
                <span> 
                    <paper-button> ${this._getPublished(data.info[0].items)} </paper-button>
                </span>
            </div>   
            <div>                
                <span class="${this._getPublished(data)}"> 
                    <paper-button> ${this._getPublished(data.info[0].publishedCount)} </paper-button>
                </span>
            </div> 
        </article>`;this.translator.clone(this);this.children[0].children[1].children[0].addEventListener("click",this.showPage.bind(this))}_getPagename(cats){return cats.info[0].id.split("_").join(" ")}_getPublished(cats){return cats}error(data){console.error("error from cms-article-viewer",data)}deSpin(){this.$.spinner.active=!this.$.spinner.active}showPage(){let string=window.btoa(`${JSON.stringify(this.page)}`);window.history.pushState({},null,`${this.rootPath}content/articles/view-articles?content=${string}&type=${this.page.info[0].type}&category=${this.page.info[0].id}`);window.dispatchEvent(new CustomEvent("location-changed"))}__delete(data){let page=data;this.translator._DBW.deletePage(msg=>{if("error"!==msg){this.log(msg)}else{this.error(msg)}},page,this.translator.__DEV)}__publish(){console.log("!!to be done!!")}_openConfirm(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this._getPagename(this.page),method:this.__delete.bind(this),headderMsg:"delete category page"}}))})}_confirmPublish(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this._getPagename(this.page),method:this.__publish.bind(this),headderMsg:"publish",type:"category page"}}))})}}customElements.define(cmsArticleListItem.is,cmsArticleListItem);class cmsArticleListType extends cmsMiddlePageTemplate{static get _getShoutAnchor(){return html`        
             <paper-tab name="add-article">
                 [[articles]]
             </paper-tab>
         `}static get _getSilentAnchor(){return html`
         <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
             <a id="reset" href="[[rootPath]]content/">
             </a>
         </iron-selector>
         `}static get _getBottom(){return html`
           <section class="flexchildbotom noFlex">
               <div class="center">
                    <h4>   [[title]] </h4>
               </div>
           </section>                        
               
           <section class="flexchildbotom noFlex">
               <div class="center">
                <h4>   [[viewedit]] </h4>
               </div>
           </section>                        
           <section class="flexchildbotom noFlex">
               <div class="center">
                <h4>    [[items]] #</h4>
               </div>
           </section>                         
           <section class="flexchildbotom noFlex">
               <div class="center">
                <h4>   [[publishedCount]] #</h4>
               </div>
           </section>
           `}static get _getTable(){return html`
        <div table class="scroll"> 
             <dom-repeat items="[[pages]]" as="page">
                 <template strip-whitespace>
                     [[putElement(index, page)]]
                     <slot name="item[[index]]"></slot>
                 </template>
             </dom-repeat>
        </div>     
             `}static get _getNavside(){return html`
           <dom-repeat repeat items="[[inForm]]" as="detail">
               <template>
                   <div class="flexsidecenter title">
                       <aside>
                           <span>
                               [[Info]] 
                           </span>
                       </aside>
                   </div>
                   <div class="navsideleft">
                       <aside>
                           <span>
                           [[categorycount]]
                           </span>
                       </aside>
                   </div>
                   <div class="navsideright">
                       <aside>
                           <span>
                           <b> [[detail.categoryCount]] </b>
                           </span>
                       </aside>
                   </div>
                   <div class="navsideleft">
                       <aside>
                           <span>
                           [[publishedarticle]]
                           </span>
                       </aside>
                       <aside>
                           <span>
                           [[datepublished]]
                           </span>
                       </aside>
                   </div>
                   <div rightSide>                            
                       <dom-repeat repeat items="[[detail.published]]" as="published">
                           <template>
                               <section>
                                   <aside>
                                       <div published$="[[_getPublished(published.page)]]">
                                           [[published.page]]
                                       </div>
                                   </aside>
                                   <aside>
                                       <span>
                                           [[published.datePublished]]
                                       </span>
                                   </aside>
                               </section>
                           </template>
                       </dom-repeat>
                   </div>
               </template>
           </dom-repeat>
           `}/**/static get is(){return"cms-article-list-type"}static get properties(){return{lang:{type:String,observer:"__changeLang"},langs:{type:Object,value:{}},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}}}}ready(){super.ready();this.translator.template.innerHTML=`<paper-spinner-lite active="false" slot="spinner">
            </paper-spinner-lite>`;this.translator.clone(this);this.translator.target("cms-page-list-type","setLangObject",this._setLObj.bind(this));this.translator.target("cms-page-list-type","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-page-list-type","setLangObject");this._getArticles();window.addEventListener("reset-artlist-type",this._contentChanged.bind(this))}_setLang(res,lang){this.lang=lang;res.call(this)}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_contentChanged(){this.set("pages",[]);this.innerHTML=""}_getArticles(){this.translator._DBW.getAllArticles(data=>{this._setAll(data)},this.translator.__DEV)}_setAll(data){let arr=[],arr2=[];for(let i=0;i<data.length;i++){if("categoryCount"in data[i]){arr.push(data[i])}else{arr2.push(data[i])}}this.inForm=[];this.set("inForm",arr);this.pages="";this.set("pages",arr2);this.removeChild(this.children[0])}putElement(index,page){let template=html`
            <cms-article-list-item>
            </cms-article-list-item>`;var clone=document.importNode(template.content,!0);this.appendChild(clone);this.children[index].setAttribute("slot",`item${index}`);this.children[index].set("page",page)}openConfirm(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.article.parent,method:this.deleteGallerie.bind(this)}}))})}}customElements.define(cmsArticleListType.is,cmsArticleListType);