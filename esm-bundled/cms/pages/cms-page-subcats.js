define(["exports","../../src/cms-login.js"],function(_exports,_cmsLogin){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0/* ignoreName */ /* skipSlots */});_exports.cmsSubcatsItem=_exports.cmsSubcats=_exports.cmsPageSubcats=_exports.$cmsSubcatsItem=_exports.$cmsSubcats=_exports.$cmsPageSubcats=void 0;class cmsSubcatsItem extends(0,_cmsLogin.cmscategoriesLib)((0,_cmsLogin.cmsSubcatsLib)(_cmsLogin.PolymerElement)){static get template(){return _cmsLogin.html` 
        <style include="cms-comon-style_v3">    
            :host {
                position: relative;
                display: block;
            } 
            div[bottom] {
                padding: 4px;
                height: auto;
            }     
            paper-icon-button {
                width: 31px;
                height: 31px;
            }
            div[bottom]{
                display: flex;
            }
            div[chilssubcat]{
                border-bottom: 1px dashed #10b6be;;
            }
            article[updated]{
                background-color: var(--app-scrollbar-color);
            }
        </style>
            <slot name="spinner"></slot>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>  
        
        <dom-repeat repeat items="[[subcatContent]]" as="item">
            <template>                
                <article  on-click="__changeColorTimeout" centerlistitem updated$="[[updated]]">  
                    <div title="[[item.categoryName]]">
                        <paper-button on-click="_viewEdit" title="[[item.categoryName]]">
                            [[item.categoryName]]
                        </paper-button>
                    </div>
                    <div title="[[item.toArticle]]" toarticle$="[[item.toArticle]]">
                        <paper-button title="[[item.toArticle]]"on-click="_confirmToArticle" >
                            [[item.toArticle]]
                        </paper-button>
                    </div>
                    <div title="[[item.Published.state]]" published$="[[item.Published.state]]">
                        <paper-button title="[[item.Published.state]]"on-click="_confirmPublished" >
                            [[item.Published.state]]
                        </paper-button>
                    </div>
                    <div>
                        <paper-icon-button icon="av:not-interested" aria-label="delete" on-click="_openConfirm">
                        </paper-icon-button>
                    </div>                
                </article>
            </template>                            
        </dom-repeat>         
        <div  bottom>        
            <div  class="plus">
                    <div class="plussubcat noFlex">
                        <paper-icon-button on-click="_addChildren" icon="av:library-add" aria-label="mode-show"></paper-icon-button>
                    </div>  
                <div class="subcat noFlex">
                    <div on-click="__changeColorTimeout" class="flexleft">
                        <paper-icon-button on-click="_toggleChildren" icon="editor:drag-handle" aria-label="mode-show"></paper-icon-button>
                    </div>
                    <div  id="subcats" class="diferent">                            
                        <dom-repeat repeat items="[[subcatSubats]]" as="item">
                            <template> 
                                <slot name="item[[index]]"></slot> 
                            </template>                            
                        </dom-repeat>        
                    </div>       
                </div>  
            </div> 
        </div>
        `}static get is(){return"cms-subcats-item"}static get properties(){return{translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},lang:{type:String,value:"",notify:!0},langs:{type:Object,value:{}},subcat:{type:Object,notify:!0,value:{}},imageArr:{type:Array,notify:!0},subcatContent:{type:Array,notify:!0},subcatSubats:{type:Array,notify:!0,observer:"_slottItem"},published:{type:String,reflectToAttribute:!0},updated:{type:Boolean,reflectToAttribute:!0,notify:!0,value:/* ignoreName */!1/* skipSlots */ /* skipSlots */},published:{type:String,reflectToAttribute:!0,notify:!0,value:""},toarticle:{type:String,reflectToAttribute:!0,notify:!0,value:""},onSave:{type:Object,notify:!0,value:{}},indexArr:{type:Array,notify:!0},_indexArr:{type:Object,notify:!0,computed:"_onIndexArr(indexArr)",observer:"_subcatAdded"},dataObj:{type:Array,observer:"_setChildren"},add:{type:Boolean,value:!0,notify:!0},spinOut:{type:Boolean,value:!1},time:Number}}_log(data){console.log(data)}connectedCallback(){super.connectedCallback();this._observer=new _cmsLogin.FlattenedNodesObserver(this,info=>{this.info=info})}disconnectedCallback(){super.disconnectedCallback();this._observer.disconnect()}ready(){super.ready();this.translator.target("cms-subcats-item","setLangObject",this._setLObj.bind(this));this.translator.target("cms-subcats-item","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-subcats-item","setLangObject");window.addEventListener("changecolor",event=>{this.updated=this.subcat.id===event.detail.update?!0:!1;setTimeout(()=>{this.routeData.page="subcategory-pages";if(0<this.childElementCount){this._subcatAdded(this._indexArr)}},125)},!1)}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}__publish(){this.subcat.Published.date=date.toLocaleDateString();this.subcat.Published.publishedBy=this.user.name;this.subcat.Published.state="P";this._publishToArticle()}__toArticle(){this.subcat.toArticle="A";let id,category={};this._publishToArticle();id=this.subcat.path.join("-");category.id=this.subcat.path.join("/");category.removed=!1;this.setCategories(id,category)}_confirmPublished(){this._changeSectionDebouncer=_cmsLogin.Debouncer.debounce(this._changeSectionDebouncer,_cmsLogin.microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.subcat.id,method:this.__publish.bind(this),// (this.__publish).bind(this),
argument:"!!to be done!!",headderMsgKind:"publish ?",type:"page/sub-category"}}))})}_confirmToArticle(){this._changeSectionDebouncer=_cmsLogin.Debouncer.debounce(this._changeSectionDebouncer,_cmsLogin.microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.subcat.id,method:this.__toArticle.bind(this),argument:"!!to be done!!",headderMsgKind:"send to articles ?",type:"page/sub-category"}}))})}_subcatAdded(data){if(!!data){if("subcategory-pages"===this.routeData.page){let reset="true"===this.query.reset,parent=this.query.content;this.set("parent",parent);this.set("subCatChildren",this.subcat.children);this.updated=this.subcat.id===this.query.update?!0:!1;if(!!this.query.reset&&!reset)this._setNewUpdated(data);if(!this.query.reset||!!reset)/**/this.getSubcat(this.parent,this.subcat.id)}}}_viewEdit(boll){let pid=this.subcat.id.split("");pid.pop();pid=pid.join("");let arr=[];for(let par in this.content){if("images"!==par){arr.push(par)}}this.subcatLang=arr[0];let string=`parent=${this.subcat.id}&content=${this.subcat.parent}&topparent=${pid}&path=${this.subcat.path}&name=${this.subcat.id}&top=${this.subcat.top}&add=false&lang=${this.subcatLang}`;this.add=!0===boll instanceof MouseEvent?!1:boll;this._changeColor();window.history.pushState({},null,`${this.rootPath}content/pages/edit-subcategory-pages?${string}`);window.dispatchEvent(new CustomEvent("location-changed"))}_changeColor(){if(!0===this.updated)this.updated=!1}__changeColorTimeout(){this.updated=!0;setTimeout(()=>{this._changeColor()},500)}_toggleChildren(){let parent=this.query.content;if(!0===this.$.subcats.classList.contains("diferent")){this.$.subcats.classList.remove("diferent");if(!this.subcatSubats&&!!this.subCatChildren&&0<this.subCatChildren.length){if(!!this.parent){this.getChildrenSubcats(parent,this.subcat.children)}}}else{this.$.subcats.classList.add("diferent")}}_addChild(data){if(!0===data){let name;if(0<this.subcat.removedChildren.length){name=`${this._indexArr}${this.subcat.children.length+this.subcat.removedChildren.length+1}`}else{name=`${this._indexArr}${this.subcat.children.length}`}this.add=!0;let string=`${this.rootPath}content/pages/add-subcategory-pages?content=${this.subcat.parent}&name=${name}&parent=${this.subcat.id}&path=${this.subcat.path}}&&topparenttype=${this.content[this.catlang].type}&top=false&add=${this.add}`;window.history.pushState({},null,string);window.dispatchEvent(new CustomEvent("location-changed"))}}__store(){localStorage.setItem(`cats-${this.subcat.parent}-${this.subcat.id}`,JSON.stringify([this.content]));localStorage.setItem(`cats-${this.subcat.parent}-${this.subcat.id}-info`,JSON.stringify([this.subcat]))}_setContent(content){this.set("content",content);this._setsubcatContent();if(this.$.Imag)this.$.Imag.addImage=this.addImage.bind(this);/**/}_setsubcatContent(){let arr=[this.subcat];if(!!this.content){if(!!this.content[this.lang]){this.set("catlang",this.lang);arr[0].categoryName=this.content[this.catlang].categoryName;this.set("subcatContent",arr)}else{let keys=Object.keys(this.content),arr2=keys.find(item=>{if("images"!==item)return item});this.set("catlang",arr2);arr[0].categoryName=this.content[this.catlang].categoryName;this.set("subcatContent",arr)}}this.__store()}_setNewUpdated(data){let temp,index2=data.length,index;if(!!this.query.update){temp=this.query.update.split("");index=temp.length}/* if (!!this.query.new) {
           temp = this.query.new.split('')
           index = (temp.length)
       }*/if(index>index2){this.__checkBigger(data,temp,index2)}if(index===index2){this.__checkEqual()}}_getObjArr(content){let obj,arr=[];for(let par in content[0]){if("undefined"!==par.toString()&&"image"!==par.toString()){obj={};obj[par]=content[0][par];arr.push(obj)}}return arr}_setButtons(data){if(!1===data){this.$.backButton.classList.remove("diferent")}else{this.$.backButton.classList.add("diferent")}}_onIndexArr(data){return atob(data)}_setChildren(data){if("number"===typeof this.time){clearTimeout(this.time)}this.time=setTimeout(()=>{this.set("subcatSubats",data)},120)}_addChildren(){this._addChild(!0)}_slottItem(data){if("number"===typeof this.time)clearInterval(this.time);this.time=setTimeout(()=>{if(!!data){let arr=[atob(this.indexArr),index];const pageTemplate=subcats=>litHtml`${subcats.map((subcat,idx)=>{return litHtml`
                                <div slot="item${idx}"> 
                                    <cms-subcats-item 
                                        .lang="${this.lang}" 
                                        .subcat="${subcat}"  
                                        .route="${this.route}">
                                        .indexArr="${btoa(arr.join(""))}"
                                    </cms-subcats-item>
                                </div> `})} `;render(pageTemplate(data),this)}},60)}_openConfirm(){this._changeSectionDebouncer=_cmsLogin.Debouncer.debounce(this._changeSectionDebouncer,_cmsLogin.microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.subcatContent[0].categoryName,method:this._remove.bind(this),argument:{idx:this._indexArr,add:this.add},headderMsgKind:"delete",type:"sub-category"}}))})}_remove(){let cont,parent=this.query.content,id;if(!1===this.subcat.top){id=this.subcat.id.split("");id.pop();id=id.join("");cont=!1===this.subcat.top?JSON.parse(localStorage[`cats-${this.subcat.parent}-${id}-info`]):void 0}else{cont=void 0;id=this.subcat.id}this.subcat.removed=!0;this.removeSubcats(cont,parent,id)}}_exports.cmsSubcatsItem=cmsSubcatsItem;customElements.define(cmsSubcatsItem.is,cmsSubcatsItem);var cmsSubcatsItem$1={cmsSubcatsItem:cmsSubcatsItem};_exports.$cmsSubcatsItem=cmsSubcatsItem$1;const Modelo="eyJhdXRob3IiOiIiLCJjaGlsZHJlbiI6W10sImRhdGVDcmVhdGVkIjoiIiwiaWQiOiIiLCJsYXN0TW9kaWZpZWQiOltdLCJwYXJlbnQiOiIiLCJ0b0FydGljbGUiOiIiLCJ0b3AiOiIiLCJjaGlsZHJlbkNvdW50IjowfQ==";class cmsSubcats extends _cmsLogin.cmsItemTemplate{static get _getStyles(){return _cmsLogin.html` 
            article[centerlistitem] paper-button{
                height: auto;
                max-height: 35px;
            }
            
            div[basis] {
                flex-basis: 30%;
            }
               `}static get _getElement(){return _cmsLogin.html` 
        
        <slot name="nocontent"></slot> 
        <dom-repeat items="[[subSubCats]]" as="item">
            <template>
                <slot name="item[[index]]">
                </slot>           
            </template>                            
        </dom-repeat>        
        `}static get is(){return"cms-subcats"}static get properties(){return{subSubCats:{type:Array,observer:"_slottItem",notify:!0},user:{type:Object,value:{}},deleteImg:{type:Object,notify:!0},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];//.translator
}},lang:{type:String,value:"",notify:!0},langs:{type:Object,value:{}},itemLabel:{type:String,value:"",notify:!0},editIndex:{type:Number},add:{type:Boolean,value:!1,notify:!0,observer:"_addChild"},info:{type:Object,value:{}},onSave:{type:Object,notify:!0,value:{}}}}connectedCallback(){super.connectedCallback();this._observer=new _cmsLogin.FlattenedNodesObserver(this,info=>{this.info=info})}disconnectedCallback(){super.disconnectedCallback();this._observer.disconnect()}ready(){super.ready()}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_addChild(data){if(!!this.children[0]&&"H1"===this.children[0].tagName){this.removeChild(this.children[0])}if(!0===data){let string=`${this.rootPath}content/pages/add-subcategory-pages?content=${this.query.content}&name=${this.children.length}&path=${this.query.content}&add=${this.add}&top=true`;window.history.pushState({},null,string);window.dispatchEvent(new CustomEvent("location-changed"));this.add=!1}}_slottItem(data){if("number"===typeof this.time)clearInterval(this.time);this.time=setTimeout(()=>{if(!!data){const pageTemplate=pages=>_cmsLogin.html$2`${pages.map((article,idx)=>{return _cmsLogin.html$2`<div scroll slot="item${idx}">          
                                 <cms-subcats-item 
                                    .lang="${this.lang}" 
                                    .user="${this.user}"
                                    .subcat="${article}"
                                    .indexArr="${btoa(idx)}"
                                    .route="${this.route}" >
                                 </cms-subcats-item>          
                             </div> `})} `;(0,_cmsLogin.render)(pageTemplate(data),this)}else{const nocont=()=>_cmsLogin.html$2`<h1 slot="nocontent"> no content </h1>`;(0,_cmsLogin.render)(nocont(),this)}},60)}_reset(){this.subSubCats=[];this.add=!1;window.onbeforeunload=function(){}}}_exports.cmsSubcats=cmsSubcats;customElements.define(cmsSubcats.is,cmsSubcats);var cmsSubcats$1={cmsSubcats:cmsSubcats};//import { cmsListTemplate } from '../templates/cms-list-template';
_exports.$cmsSubcats=cmsSubcats$1;class cmsPageSubcats extends(0,_cmsLogin.cmsSubcatsLib)(_cmsLogin.cmsMiddlePageTemplate){static get _getSilentAnchor(){return _cmsLogin.html`    
                <a href="" on-click="_addSubCategory">
                    <div class="add-btn-group" title="[[ADD]]">
                        <div class="add-btn-group-item group-item-top-left" ></div>

                        <div class="add-btn-group-item group-item-top-right"></div>

                        <div class="add-btn-group-item group-item-bottom-left"></div>

                        <div class="add-btn-group-item group-item-bottom-right"></div>
                    </div> 
                </a>            
        `}static get _topLabel(){return _cmsLogin.html`       
            <h3 class="higherh3">[[subcatLabel]]</h3>       
            <h5 class="higherh5"> category - [[query.content]]  </h5> 
        `}static get _getBottom(){return _cmsLogin.html`              
        <div class="count">
            <span> [[subSubCats.length]] </span>
        </div>               
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4 title="[[viewedit]]"> [[viewedit]] </h4>
            </div>
        </section>                           
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4 title="[[item]]"> [[item]] </h4>   
            </div>
        </section>     
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4 title="[[type]]"> 
            [[type]]     </h4>     
        </section>                            
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4 title="[[delete]]"> 
            [[delete]]   </h4>   
            </div>
        </section>`}static get _getTable(){return _cmsLogin.html`
            <div table class="scroll"> 
                <cms-subcats id="subcats"
                    sub-sub-cats="{{subSubCats}}"
                    user="{{user}}"
                    add="{{addSubCategory}}"
                    route="{{route}}">      
                </cms-subcats> 
            </div>
        `}static get is(){return"cms-page-subcats"}static get properties(){return{content:{type:Array,notify:!0,value:[]},subSubCats:{type:Array,notify:!0},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},lang:{type:String,value:"",notify:!0},langs:{type:Object,value:{}},itemLabel:{type:String,value:"",notify:!0},lastpagesubs:{type:String,value:"",notify:!0},addSubCategory:{type:Boolean,value:!1,notify:!0},add:Boolean,time:Number}}static get observers(){return["_routePageChanged(routeData.page, query)"]}_log(data){console.log(data)}ready(){super.ready();this.translator.target("cms-subcats","setLangObject",this._setLObj.bind(this));this.translator.target("cms-subcats","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-subcats","setLangObject")}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(page,query){if("number"===typeof this.time)clearInterval(this.time);let reset="true"===query.reset;if("subcategory-pages"===page&&!!query.content){if(!query.reset||!!reset){let parent=query.content;if(this.lastpagesubs===parent&&!query.reset){this.lastpagesubs=atob(localStorage.getItem("lastpagesubs"));return}else if(this.lastpagesubs!==parent||!!reset){const spinnerTemplate=()=>_cmsLogin.html$2`<paper-spinner-lite active="false" slot="spinner">`;(0,_cmsLogin.render)(spinnerTemplate(),this);localStorage.setItem("lastpagesubs",btoa(parent));this.lastpagesubs=parent;this.subSubCats=[];this.time=setTimeout(()=>{(0,_cmsLogin.afterNextRender)(this,()=>{const spinnerOutTemplate=()=>_cmsLogin.html$2``;this.getTopSubcats(this.lastpagesubs,_cmsLogin.render,spinnerOutTemplate);(0,_cmsLogin.afterNextRender)(this,()=>{if(!!reset){this.time=setTimeout(()=>{window.history.pushState({},null,`${this.rootPath}content/pages/subcategory-pages?content=${this.query.content}`);window.dispatchEvent(new CustomEvent("location-changed"))},500)}})})},60)}}else if(!reset){window.dispatchEvent(new CustomEvent("changecolor",{detail:query}));window.history.pushState({},null,`${this.rootPath}content/pages/subcategory-pages?content=${this.query.content}`);window.dispatchEvent(new CustomEvent("location-changed"))}}}_addSubCategory(evt){evt.preventDefault();this.addSubCategory=!0}}_exports.cmsPageSubcats=cmsPageSubcats;customElements.define(cmsPageSubcats.is,cmsPageSubcats);var cmsPageSubcats$1={cmsPageSubcats:cmsPageSubcats};_exports.$cmsPageSubcats=cmsPageSubcats$1});