import{cmsItemTemplate,html,Debouncer,microTask,html$2 as html$1,render,cmsArticlesLib,cmsMiddlePageTemplate,afterNextRender}from"../cms-login.js";class cmsArticleItem extends cmsArticlesLib(cmsItemTemplate){static get _getStyles(){return html`
        shop-image{
            top: 1px; 
        }`}static get is(){return"cms-article-item"}static get properties(){return{user:{type:Object,notify:!0/* ignoreName */ /* skipSlots */},article:{type:Array,notify:!0,observer:"_putRow"},published:{type:String,reflectToAttribute:!0},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},papgePath:{type:String,value:"edit-articles"},objMedia:{type:Object,value:{}},objInfo:{type:Object,value:{}},objData:{type:Object,value:{}}}}ready(){super.ready()}_putRow(data){let artInfo,artContent;[artInfo,artContent]=data.map(item=>{return item});this.objInfo=artInfo;for(let item in artContent){if("images"===item||"videos"===item){this.objMedia[item]=artContent[item]}else{this.objData[item]=artContent[item]}}const articleTemplate=(objData,objInfo)=>html$1`
                   <article centerListItem slot="table">
                       <div>   
                           <span> 
                               <paper-button class="button-normal" @click="${this.showPage.bind(this)}"> 
                                   ${objData.pt.articleName}
                               </paper-button>                        
                           </span>
                       </div>    
                       <div>   
                           <span> 
                               <paper-button class="button-normal"> 
                                   ${objData.pt.type}
                               </paper-button>                        
                           </span>
                       </div> 
                       <div >                    
                           <span> 
                               <paper-button class="button-normal">
                                   ${objInfo.categories[0]} 
                               </paper-button>
                           </span>
                       </div>  
                       <div>                    
                           <span> 
                               <paper-button  class="${objInfo.Published}" @click="${this._confirmPublish.bind(this)}">
                                   ${objInfo.Published} 
                               </paper-button>
                           </span>
                       </div>   
                       <div>                    
                           <span> 
                               <paper-button class="button-normal">
                                   ${objInfo.stock} 
                               </paper-button>
                           </span>
                       </div> 
                       <div>
                            <paper-button class="button-del" @click="${this._openConfirm.bind(this)}">
                                <paper-icon-button icon="av:not-interested" aria-label="mode-delete">
                                </paper-icon-button> 
                            </paper-button> 
                       </div>
                   </article>`;render(articleTemplate(this.objData,this.objInfo),this);localStorage.setItem(`article-${this.objInfo.id}-info`,JSON.stringify(this.objInfo));localStorage.setItem(`article-${this.objInfo.id}-data`,JSON.stringify(this.objData));localStorage.setItem(`article-${this.objInfo.id}-media`,JSON.stringify(this.objMedia))}_getPagename(cats){return cats}error(data){console.error("error from cms-article-viewer",data)}showPage(){let arr=Object.keys(this.objData);window.history.pushState({},null,`content/articles/edit-articles?content=${this.objInfo.id}&add=false&lang=${arr[0]}`);window.dispatchEvent(new CustomEvent("location-changed"))}__delete(){// console.log(this.objInfo)
this.objInfo.removed=!0;this.getArticleData(this.objInfo.id,"info").then(this.removeArticle.bind(this)).catch(err=>console.log(err))}__publish(data){console.log(data)}_openConfirm(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.objInfo.id,method:this.__delete.bind(this),argument:this.objInfo.id,headderMsgKind:"remove ?",type:"article"}}))})}_confirmPublish(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.objInfo.id,method:this.__publish.bind(this),argument:"!!to be done!!",headderMsgKind:"publish ?",type:"article"}}))})}__reset(){this._debounceEvent=Debouncer.debounce(this._debounceEvent,microTask,()=>{window.dispatchEvent(new CustomEvent("reset-list-type",{bubbles:!0,composed:!0}))})}}customElements.define(cmsArticleItem.is,cmsArticleItem);var cmsArticleItem$1={cmsArticleItem:cmsArticleItem};class cmsArticleView extends cmsArticlesLib(cmsMiddlePageTemplate){static get _getStyles(){return html`
        div[arow]{
            color: #5487b6; 
        }
        `}static get _getSilentAnchor(){return html`            
        <a href="[[rootPath]]content/articles/add-articles?&add=true">
            <div class="add-btn-group" title="[[ADD]]">
                <div class="add-btn-group-item group-item-top-left" ></div>

                <div class="add-btn-group-item group-item-top-right"></div>

                <div class="add-btn-group-item group-item-bottom-left"></div>

                <div class="add-btn-group-item group-item-bottom-right"></div>
            </div>
        </a>
        `}static get _topLabel(){return html`       
            <h2>[[articles]]</h2>               
        `}static get _getTable(){return html`
        <div table class="scroll">          
            <dom-repeat repeat items="[[contents]]" as="item">
                <template>
                    <slot name="article-[[index]]">                    
                </template>                            
            </dom-repeat>
        </div>    `}static get _getBottom(){return html`       
        <div class="count">
            <span> [[contents.length]] </span>
        </div>
        <section class="flexchildbotom noFlex">
            <div class="center">            
                <h4> [[viewedit]] </h4>
            </div>
        </section>                       
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[Type]] </h4>
            </div>
        </section>                       
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[Category]] </h4>
            </div>
        </section>                       
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[Published]] </h4>
            </div>
        </section>   
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[STOCK]]  </h4>
            </div>
        </section>                          
        <section class="flexchildbotom noFlex">
            <div aria-delete="delete" class="center">
                <h4> [[delete]] </h4>
            </div>
        </section>
        `}static get is(){return"cms-article-view"}static get properties(){return{route:{type:Object,notify:!0},user:{type:Object,notify:!0},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];// MyAppGlobals.translator
}},lang:{type:String,notify:!0,observer:"__changeLang"},langs:{type:Object,value:{}},contents:{type:Array,notify:!0,value:[],observer:"_setArticleElements"}}}static get observers(){return["_routePageChanged(routeData.page, query.reset)"]}ready(){super.ready();const articleTemplate=()=>html$1`<paper-spinner-lite active="false" slot="spinner">`;render(articleTemplate(),this);this.translator.target("cms-article-view","setLangObject",this._setLObj.bind(this));this.translator.target("cms-article-view","changeLang",this._setLang.bind(this),/* ignoreName */!1/* skipSlots */ /* skipSlots */);this.translator.shoot("cms-article-view","setLangObject")}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(page,rst){if("number"===typeof this.time)clearInterval(this.time);let reset="true"===rst;this.scrollTo(0,0);if(!rst){if(!!page&&"articles"===page){if(0===this.contents.length){this.time=setTimeout(()=>{afterNextRender(this,()=>{this.getArticles({q:"removed",v:!1})})},120)}}}else if(!0===reset){const articleTemplate=()=>html$1`<paper-spinner-lite active="false" slot="spinner">`;render(articleTemplate(),this);this.time=setTimeout(()=>{afterNextRender(this,()=>{this._contentChanged()})},500)}else if(!1===reset){this.time=setTimeout(()=>{afterNextRender(this,()=>{window.history.pushState({},null,`${this.rootPath}content/articles`);window.dispatchEvent(new CustomEvent("location-changed"))})},60)}}_setContent(data,art){let temp=this.contents,arr=[];this.contents=[];arr.push(data);arr.push(art);temp.push(arr);this.contents=temp}_contentChanged(){if("number"===typeof this.time)clearTimeout(this.time);if("articles"===this.routeData.page){this.contents=[];afterNextRender(this,()=>{window.history.pushState({},null,`${this.rootPath}content/articles`);window.dispatchEvent(new CustomEvent("location-changed"))})}else{this.contents=[]}}_setArticleElements(data){if("number"===typeof this.time)clearTimeout(this.time);this.time=setTimeout(()=>{const articleTemplate=articles=>html$1`${articles.map((article,idx)=>{return html$1`<cms-article-item slot="article-${idx}" .article="${article}" .user="${this.user}">
                       </cms-article-item>`})} `;render(articleTemplate(data),this)},60)}}customElements.define(cmsArticleView.is,cmsArticleView);export{cmsArticleItem$1 as $cmsArticleItem,cmsArticleItem};