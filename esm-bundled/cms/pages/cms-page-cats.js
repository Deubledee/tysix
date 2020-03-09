import{html as html$1,cmsMiddlePageTemplate,afterNextRender,html$2 as html,render,cmsItemTemplate,Debouncer,microTask,cmscategoriesLib,cmsPagesLib}from"../cms-login.js";class cmsPageListItem extends cmscategoriesLib(cmsPagesLib(cmsItemTemplate)){static get is(){return"cms-page-list-item"}static get properties(){return{translator:{type:Object,notify:!0/* ignoreName */ /* skipSlots */,value:function(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}}}}ready(){super.ready()}_putRow(data){this.objInfo=[];this.objInfo.push(data);const articleTemplate=objInfo=>html`
            <article centerListItem slot="table">
                <div>   
                    <span> 
                        <paper-button class="button-normal" @click="${this.showPage.bind(this)}"> 
                            ${objInfo[0].id}
                        </paper-button>   
                    </span>
                </div>                 
                <div class="${objInfo[0].toArticle}">                   
                    <span> 
                        <paper-button @click="${this._confirmToArticle.bind(this)}"> ${objInfo[0].toArticle} </paper-button>
                    </span>
                </div>  
                <div class="${objInfo[0].Published.state}">                    
                    <span> 
                        <paper-button @click="${this._confirmPublish.bind(this)}"> ${objInfo[0].Published.state} </paper-button>
                    </span>
                </div> 
                <div>
                    <paper-button class="button-normal">
                        <paper-icon-button @click="${this.showCats.bind(this)}" icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button> 
                    </paper-button> 
                </div>
                <div>
                    <paper-button class="button-del">
                        <paper-icon-button @click="${this._openConfirm.bind(this)}" icon="av:not-interested" aria-label="mode-delete"></paper-icon-button> 
                    </paper-button> 
                </div>
            </article>`;render(articleTemplate(this.objInfo),this);localStorage.setItem(`page-${data.id}-info`,JSON.stringify(this.objInfo))}_getPagename(cats){return cats}error(data){console.error("error from cms-article-viewer",data)}deSpin(){this.$.spinner.active=!this.$.spinner.active}showPage(){if(!localStorage[`page${this.objInfo[0].id}`]){this.getPageData(this.objInfo[0].id)}else{let cont=JSON.parse(localStorage[`page-${this.objInfo[0].id}`]),arr=this._setLangArr(cont[0]);window.history.pushState({},null,`content/pages/edit-category-pages?content=${this.objInfo[0].id}&add=false&lang=${arr[0]}`);window.dispatchEvent(new CustomEvent("location-changed"))}}showCats(){window.history.pushState({},null,`content/pages/subcategory-pages?content=${this.objInfo[0].id}`);window.dispatchEvent(new CustomEvent("location-changed"))}__delete(data){this.page.removed=!0;this.removePage(data,this.page)}__publish(data){console.log(data)}_openConfirm(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.page.id,method:this.__delete.bind(this),argument:this.page.id,headderMsgKind:"remove ?",type:"page/category"}}))})}_confirmPublish(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.page.id,method:console.log,// (this.__publish).bind(this),
argument:"!!to be done!!",headderMsgKind:"publish ?",type:"page/category"}}))})}_confirmToArticle(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.page.id,method:console.log,argument:"!!to be done!!",headderMsgKind:"send to articles ?",type:"page/category"}}))})}__reset(){this._debounceEvent=Debouncer.debounce(this._debounceEvent,microTask,()=>{window.dispatchEvent(new CustomEvent("reset-list-type",{bubbles:!0,composed:!0}))})}}customElements.define(cmsPageListItem.is,cmsPageListItem);class cmsPageCats extends cmsPagesLib(cmsMiddlePageTemplate){static get _getSilentAnchor(){return html$1`            
        <a href="[[rootPath]]content/pages/add-category-pages?&add=true">
            <div class="add-btn-group" title="[[ADD]]">
                <div class="add-btn-group-item group-item-top-left" ></div>

                <div class="add-btn-group-item group-item-top-right"></div>

                <div class="add-btn-group-item group-item-bottom-left"></div>

                <div class="add-btn-group-item group-item-bottom-right"></div>
            </div>
        </a>
        `}static get is(){return"cms-page-cats"}static get properties(){return{lang:{type:String,observer:"__changeLang"},langs:{type:Object,value:{}},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},pages:{type:Array,notify:!0,value:[],observer:"putElement"}}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback();//this._observer.disconnect();
}static get observers(){return["_routePageChanged(routeData, query)"]}ready(){super.ready();const spinnerTemplate=()=>html`<paper-spinner-lite active="false" slot="spinner">`;render(spinnerTemplate(),this);this.translator.target("cms-page-list-type","setLangObject",this._setLObj.bind(this));this.translator.target("cms-page-list-type","changeLang",this._setLang.bind(this),/* ignoreName */!1/* skipSlots */ /* skipSlots */);this.translator.shoot("cms-page-list-type","setLangObject")}_setLang(res,lang){this.lang=lang;res.call(this)}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(routeData,query){if("number"===typeof this.time)clearInterval(this.time);let reset="true"===query.reset;if(!query.reset){if("pages"===routeData.page){this.time=setTimeout(()=>{if(0===this.pages.length){afterNextRender(this,()=>{this._askPages({q:"removed",v:!1})})}},120)}}else if(!0===reset){this.pages=[];this._contentChanged()}}_contentChanged(){if("number"===typeof this.time)clearTimeout(this.time);const spinnerTemplate=()=>html`<paper-spinner-lite active="false" slot="spinner">`;render(spinnerTemplate(),this);if("pages"===this.routeData.page&&"/pages"===this.route.path){this.time=setTimeout(()=>{window.history.pushState({},null,`${this.rootPath}content/pages`);window.dispatchEvent(new CustomEvent("location-changed"))},500)}else{this.pages=[]}}_setAll(response){let arr=[];this.pages=[];for(let i=0;i<response.length;i++){if(!!response[i].id){let datarr=response[i].data();arr.push(datarr)}}this.set("pages",arr)}putElement(data){if("number"===typeof this.time)clearInterval(this.time);this.time=setTimeout(()=>{const pageTemplate=pages=>html`${pages.map((article,idx)=>{return html`<cms-page-list-item slot="item${idx}" .page="${article}">
                        </cms-page-list-item>`})} `;render(pageTemplate(data),this)},60)}_reset(call,mlscs){console.log("reseted pages");this.innerHTML="";this.pages=void 0;this.inForm=void 0;this.set("sloted",!1);window.onbeforeunload=function(){};setTimeout(()=>{call()},mlscs)}}customElements.define(cmsPageCats.is,cmsPageCats);