define(["exports","../cms-login.js"],function(_exports,_cmsLogin){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.cmsSubcatsItem=_exports.cmsSubcats=_exports.cmsContentSubcats=_exports.$cmsSubcatsItem=_exports.$cmsSubcats=_exports.$cmsContentSubcats=void 0;const Model={value:{contentText:[{description:""}],image:[],info:[{author:"",dateAdde:"",publishedBy:[{author:"",date:"",uid:""}],unPublishedBy:[{author:"",date:"",uid:""}],lastModified:[{author:"",date:"",uid:""}],datePublished:"NP",published:"NP"}],items:[{categoryName:"",type:"",lang:""}],subCategories:[]}};class cmsSubcatsItem extends _cmsLogin.cmsItemTemplate{static get _getStyles(){return _cmsLogin.html`
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
                display: flex
            }
            div[bottom][hide]{
                display: none
            }
        </style>`}static get _getElement(){return _cmsLogin.html`
        <dom-if if="[[view]]">
            <template>
                <dom-repeat repeat items="[[subcatContent]]" as="item">
                    <template>                
                        <article centerlistitem>
                            <div>
                                <shop-image class="bigger" title="[[item.categoryName]]" aria-label="image" src="[[item.image]]"
                                    alt="[[item.categoryName]]">
                                </shop-image>
                            </div>
                            <div title="[[item.categoryName]]">
                                <paper-button title="[[item.categoryName]]">
                                    [[item.categoryName]]
                                </paper-button>
                            </div>
                            <div>
                                <paper-button on-click="_viewEdit">
                                    <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
                                    <paper-icon-button icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                                </paper-button>
                            </div>
                            <div title="[[item.type]]">
                                <paper-button title="[[item.lang]]">
                                    [[item.type]]
                                </paper-button>
                            </div>
                            <div>
                                <paper-icon-button icon="av:not-interested" aria-label="delete" on-click="_openConfirm">
                                </paper-icon-button>
                            </div>                
                        </article>
                    </template>                            
                </dom-repeat>
            </template>
        </dom-if> 
        <nav>
            <paper-button id="backButton" on-click="_showBack">                         
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </paper-button>
            <paper-button id="saveButton" on-click="_save"> 
                [[save]]
            </paper-button>
        </nav>         
        <div bottom hide$="[[view]]" noborder$="[[noborder]]">
            <dom-repeat repeat items="[[inputVal]]" as="item">
                <template>                              
                    <section class="flexchildbotomShort">  
                        <cms-content-item
                            item="[[item]]" 
                            save-button="[[saveButton]]" 
                            res="{{inputResponse}}">
                        </cms-content-item> 
                    </section> 
                </template>                            
            </dom-repeat>
            <dom-repeat repeat items="[[textareaVal]]" as="item">
                <template>    
                    <section class="flexchildbotomFull">  
                        <cms-content-text 
                            item="[[item]]" 
                            save-button="[[saveButton]]"
                            res="{{textAreaResponse}}"> 
                        </cms-content-text>   
                    </section> 
                </template>                            
            </dom-repeat>  
            <section class="flexchildbotom">   
                <cms-content-image  id="Imag"
                    item-label="[[imageLabel]]"
                    images="[[imageArr]]" 
                    editing="{{editing}}" 
                    anchor="[[anchor]]" 
                    save-button="[[saveButton]]" 
                    _deleteImg="[[deleteImg]]" >
                </cms-content-image>
            </section>             
        </div>
        <div bottom hide$="[[!view]]"> 
            <div class="plus">
                <div class="plussubcat noFlex">
                    <paper-icon-button on-click="_addChildren" icon="av:library-add" aria-label="mode-show"></paper-icon-button>
                </div>  
                <div class="subcat noFlex">
                    <div class="flexleft">
                        <paper-icon-button on-click="_toggleChildren" icon="editor:drag-handle" aria-label="mode-show"></paper-icon-button>
                    </div>
                    <div id="subcats" class="diferent">
                        <slot name="table"></slot> 
                    </div>
                    <dom-repeat repeat items="[[subcatSubats]]" as="item">
                        <template> 
                            [[_slottItem(item, index)]]
                        </template>                            
                    </dom-repeat>               
                </div>  
            </div> 
        </div>
        `}static get is(){return"cms-subcats-item"}static get properties(){return{translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},lang:{type:String,value:"",notify:!0},langs:{type:Object,value:{}},inputVal:{type:Array,notify:!0,value:[]},textareaVal:{type:String,notify:!0,value:""},noborder:{type:Boolean,value:!0,reflectToAttribute:!0},inputResponse:{type:Object,notify:!0,value:{},observer:"_setItemsValue"},textAreaResponse:{type:Object,notify:!0,value:{},observer:"_setContentTextValue"},subcat:{type:Object,notify:!0,value:{}},imageArr:{type:Array,notify:!0},subcatContent:{type:Array,notify:!0},subcatSubats:{type:Array,notify:!0},saveButton:{type:Object,notify:!0},toContent:{type:Object,notify:!0,value:{}},view:{type:Boolean,notify:!0,value:!0,observer:"_setButtons"},published:{type:String,reflectToAttribute:!0},hide:{type:Boolean,notify:!0,reflectToAttribute:!0},indexArr:{type:Array,notify:!0,value:function(){return[]},observer:"_routePageChanged"}}}_log(data){console.log(data)}connectedCallback(){super.connectedCallback();this._observer=new _cmsLogin.FlattenedNodesObserver(this,info=>{this.info=info})}disconnectedCallback(){super.disconnectedCallback();this._observer.disconnect()}ready(){super.ready();this.set("saveButton",this.$.saveButton);this.$.saveButton.classList.add("diferent");this.translator.target("cms-subcats-item","setLangObject",this._setLObj.bind(this));this.translator.target("cms-subcats-item","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-subcats-item","setLangObject")}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(data){if(0<data.length){if("indexarr"in this.query){if("edit-subcategory-pages"===this.routeData.page||"add-subcategory-pages"===this.routeData.page){let index=this.query.indexarr.split(",").length,index2=this.indexArr.length;this.view=!1;if(index===index2){if(this.indexArr.join(",")===this.query.indexarr){this.subcat=JSON.parse(atob(this.query.content));this._setContent(this.subcat);this.view=!1;console.log("indexarr1",index,index2)}}else if(this.indexArr[index-1]===this.query.indexarr.split(",")[index-1]){this._setContent(this.subcat);this.view=!1;console.log("indexarr2",index,index2)}else{this._setContent(this.subcat);console.log("indexarr3",index,index2)}}}else{console.log("indexarr4");this._setContent(this.subcat)}}}addImage(){let string=`editSubCats&content=${btoa(JSON.stringify(this.content))}&tocontent=${this.toContent}&indexarr=${this.indexArr}`;this.set("slashed",!0);window.history.pushState({},null,`${this.rootPath}media/images/galleries?addimageto=cats&method=${string}`);window.dispatchEvent(new CustomEvent("location-changed"));window.onbeforeunload=function(e){return"you might have changes to be saved, are you sure you whant to leave?"}}_setContent(content){if(content.info){this.set("temp",content.items[0].categoryName);this.set("content",content);let obj=this.content.image;this.imageLabel="images";this.set("imageArr",obj);this.set("inputVal",this._getObjArr(this.content.items));this.set("textareaVal",this.content.contentText);this.set("subcatSubats",this.content.subCategories);this._setsubcatContent();if(this.$.Imag)this.$.Imag.addImage=this.addImage.bind(this)}}_setsubcatContent(){if(0<this.content.items[0].categoryName.split("").length){this.set("subcatContent",this.content.items);this.subcatContent[0].image=this.content.image[0]===void 0?"":this.content.image[0].url}}_setButtons(data){if(!1===data){this.$.backButton.classList.remove("diferent")}else{this.$.backButton.classList.add("diferent")}}_toggleChildren(evt){this.$.subcats.classList.toggle("diferent")}_addChildren(){console.log(!0);this._pushModel(!0)}_pushModel(data){if(!0===data){let subcat=this.subcat;subcat.subCategories.push(this.Modelo);this._reset(()=>{this.subcat=subcat;this.view=!1},100)}}_showBack(data){this.$.backButton.classList.add("diferent");if(this.temp!==void 0&&0===this.temp.split("").length){this._setContent(Model.value);this._removeChild(this.indexArr[0])}this._viewEdit()}_viewEdit(){this.view=!this.view}_save(){this._viewEdit();this._setsubcatContent();this.saveButton.classList.add("diferent")}_setItemsValue(data){if(this.content!==void 0&&this.content.items){for(let par in data){if("undefined"!==par.toString()){this.content.items[0][par]=data[par]}}}}_setContentTextValue(data){if(this.content!==void 0&&this.content.contentText){for(let par in data){if("undefined"!==par.toString()){this.content.contentText[0][par]=data[par]}}}}_slottItem(data,index){let str=`
            <div slot="table"> 
                <cms-subcats-item>
                </cms-subcats-item>
            </div>             
            `,arr=this.indexArr;arr.push(index);this.translator.template.innerHTML=str;this.translator.clone(this);this.children[this.childElementCount-1].subcat=data;this.children[this.childElementCount-1].toContent=this.toContent;this.children[this.childElementCount-1].indexArr=arr}_getObjArr(content){let obj,arr=[];for(let par in content[0]){obj={};obj[par]=content[0][par];arr.push(obj)}return arr}_setSaveButton(){return this.$.saveButton}_setChildrenLang(data){if(0<this.childElementCount){for(let i=0;i<this.childElementCount;i++){this.children[i].children[0].lang=data}}}_openConfirm(event){let index=event.srcElement.parentElement.getAttribute("value");this._changeSectionDebouncer=_cmsLogin.Debouncer.debounce(this._changeSectionDebouncer,_cmsLogin.microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.subcatContent[0].categoryName,method:this._removeChild.bind(this),argument:this.indexArr[0],headderMsgKind:"delete",type:"sub-category"}}))})}__delete(data){let page=data;this.translator._DBW.deletePage(msg=>{if("error"!==msg){this.log(msg)}else{this.error(msg)}},page,Consts.__DEV)}_reset(call,mlscs){this.innerHTML="";setTimeout(()=>{call()},mlscs)}}_exports.cmsSubcatsItem=cmsSubcatsItem;customElements.define(cmsSubcatsItem.is,cmsSubcatsItem);var cmsSubcatsItem$1={cmsSubcatsItem:cmsSubcatsItem};_exports.$cmsSubcatsItem=cmsSubcatsItem$1;const Modelo="eyJ2YWx1ZSI6eyJjb250ZW50VGV4dCI6W3siZGVzY3JpcHRpb24iOiIifV0sImltYWdlIjpbXSwiaW5mbyI6W3siYXV0aG9yIjoiIiwiZGF0ZUFkZGUiOiIiLCJwdWJsaXNoZWRCeSI6W3siYXV0aG9yIjoiIiwiZGF0ZSI6IiIsInVpZCI6IiJ9XSwidW5QdWJsaXNoZWRCeSI6W3siYXV0aG9yIjoiIiwiZGF0ZSI6IiIsInVpZCI6IiJ9XSwibGFzdE1vZGlmaWVkIjpbeyJhdXRob3IiOiIiLCJkYXRlIjoiIiwidWlkIjoiIn1dLCJkYXRlUHVibGlzaGVkIjoiTlAiLCJwdWJsaXNoZWQiOiJOUCJ9XSwiaXRlbXMiOlt7ImNhdGVnb3J5TmFtZSI6IiIsInR5cGUiOiIiLCJsYW5nIjoiIn1dLCJzdWJDYXRlZ29yaWVzIjpbXX19";class cmsSubcats extends _cmsLogin.cmsItemImageTemplate{static get _getStyles(){return _cmsLogin.html`        
        div[bottom]{
            height: 35px;
            font-size: var(--app-images-article-font-size);
            background-color: #e2e2e2;
           
        }
        div[bottom] h4{
            margin-block-start: 8px;
        }
        div[small]{
            height: 23px;
            font-size: 9px; 
        }
        div[table]{
            overflow-x: hidden;
        }`}static get _getMenu(){return _cmsLogin.html`                          
            <section class="flexchildbotomShort noFlex">
                <div class="center">   
                    <h4 title="[[item]]"> [[item]] </h4>     
                </div>  
            </section>
            <section class="flexchildbotomShort noFlex">
                <div class="center">   
                    <h4 title="[[title]]"> [[title]] </h4>     
                </div>  
            </section>
            <section class="flexchildbotomShort noFlex">
                <div class="center">
                    <h4 title="[[viewedit]]"> [[viewedit]] </h4>
                </div>  
            </section>
            <section class="flexchildbotomShort noFlex">
                <div class="center">  
                    <h4 title="[[type]]"> 
                    [[type]]     </h4>     
                </div>  
            </section>
            <section class="flexchildbotomShort noFlex">
                <div class="center">  
                    <h4 title="[[delete]]"> 
                    [[delete]]   </h4>     
                </div>  
            </section>`}static get _getItem(){return _cmsLogin.html` 
        <slot name="item"></slot>  
        <dom-repeat items="[[content]]" as="item">
            <template>
                [[_slottItem(item, index)]]
            </template>                            
        </dom-repeat>        
        `}static get is(){return"cms-subcats"}static get properties(){return{subSubCats:{type:Array,value:[],notify:!0},deleteImg:{type:Object,notify:!0},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},lang:{type:String,value:"",notify:!0},langs:{type:Object,value:{}},itemLabel:{type:String,value:"",notify:!0},editIndex:{type:Number},content:{type:Array,value:"",notify:!0,computed:"_setContent(subSubCats)"},add:{type:Boolean,value:!1,notify:!0,observer:"_pushModel"},info:{type:Object,value:{}}}}connectedCallback(){super.connectedCallback();this._observer=new _cmsLogin.FlattenedNodesObserver(this,info=>{this.info=info})}disconnectedCallback(){super.disconnectedCallback();this._observer.disconnect()}ready(){super.ready();window.addEventListener("reset-subcats",this._reset.bind(this));window.addEventListener("reset",this._reset.bind(this));this.translator.target("cms-subcats","setLangObject",this._setLObj.bind(this));this.translator.target("cms-subcats","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-subcats","setLangObject")}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_pushModel(data){let modelo=JSON.parse(atob(Modelo));if(!0===data){let subcat=this.subSubCats||[];this._reset();setTimeout(()=>{subcat.push(modelo.value);this.editIndex=subcat.length-1;this.subSubCats=subcat;this.add=!1},100)}}_slottItem(item,index){let str=`            
                <div scroll slot="item">          
                    <cms-subcats-item article="[[item]]">
                    </cms-subcats-item>          
                </div>                
                `,content=btoa(JSON.stringify(this.subSubCats));this.translator.template.innerHTML=str;this.translator.clone(this);this.children[this.childElementCount-1].children[0].view=!0;if(this.editIndex===index)this.children[this.childElementCount-1].children[0].view=!1;this.children[this.childElementCount-1].children[0].lang=this.lang;this.children[this.childElementCount-1].children[0].route=this.route;this.children[this.childElementCount-1].children[0].toContent=content;this.children[this.childElementCount-1].children[0].subcat=item;this.children[this.childElementCount-1].children[0].indexArr=[index];this.children[this.childElementCount-1].children[0]._removeChild=this._removeChild.bind(this)}_removeChild(data){let subcat=this.subSubCats,index=!0===data instanceof CustomEvent?data.detail.argument:data;if(0===index){subcat.splice(0,1)}else{subcat.splice(index,index)}this._reset();setTimeout(()=>{this.set("subSubCats",subcat)},120)}_setContent(data){return data}_reset(){this.editIndex=NaN;this.subSubCats=[];this.add=!1;this.innerHTML=""}}_exports.cmsSubcats=cmsSubcats;customElements.define(cmsSubcats.is,cmsSubcats);var cmsSubcats$1={cmsSubcats:cmsSubcats};_exports.$cmsSubcats=cmsSubcats$1;class cmsContentSubcats extends _cmsLogin.cmsContentTemplate{static get _getStyles(){return _cmsLogin.html` 
        <style include="cms-comon-style_v3">
            :host {
                position: relative;
            }
            .navbottom{
                margin-top: 48px;  
            }
            div[scroll]{
                overflow-x: auto;
                overflow-y: hidden;
                margin-bottom: 12px;
            }
            div[scroll]::-webkit-scrollbar-track {
                background-color: var(--app-scrollbar-color)
            }

            div[scroll]::-webkit-scrollbar {
                height: 5px
            }

            div[scroll]::-webkit-scrollbar-thumb {
                background-color: var(--app-primary-text-color)
            }
        </style>`}static get _getAnchor(){return _cmsLogin.html`
        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a id="anchor">
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
            <a>
                <paper-button>
                    [[subcatLabel]]
                </paper-button>
                <paper-icon-button  name="[[itemLabel]]" icon="av:library-add"  on-click="_addSubCategory" aria-label="mode-edit">
                </paper-icon-button> 
            </a>
        </iron-selector>`}static get _getContentItems(){return _cmsLogin.html`
        <div container>
            <div bottom hidebottom$="[[hidebottom]]"> 
                <section class="flexchildbotomFull">  
                    <cms-subcats id="subcats" 
                        sub-sub-cats="{{subSubCats}}"
                        add="{{add}}"
                        route="{{route}}">  
                                        
                        <div scroll slot="item">                
                        </div>                 
                    </cms-subcats>  
                </section>
            </div>
        </div>`}static get _getSideInfo(){return _cmsLogin.html`
        <!--dom-repeat repeat items="[[inform]]" as="cat">
            <template-->
                <div class="center-menu">
                    <aside>
                        <span>
                            [[info]]
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
                    <aside>
                        <span>
                            [[publishedby]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[publiShed]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datepublished]]
                        </span>
                    </aside>
                </div>
                <div class="center-menu">
                    <aside class="asideBackgrc">
                        <span>
                            [[ _getPublishedBy(cat.publishedBy)]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc" published$="[[cat.published]]">
                        <span>
                            [[cat.published]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.datePublished]]
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
                    <aside>
                        <span>
                            [[author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datecreated]]
                        </span>
                    </aside>
                </div>
                <div class="center-menu">
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.author]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.dateAdded]]
                        </span>
                    </aside>
                </div>
                <div class="center-menu">
                    <aside>
                        <span>
                            [[lastmodified]]
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
                    <aside>
                        <span>
                            [[author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[date]]
                        </span>
                    </aside>
                </div>
                <div rightSide>
                    <!--dom-repeat repeat items="[[cat.lastModified]]" as="createdAt">
                        <template-->
                            <section>
                                <aside class="asideBackgrc">
                                    <span>
                                        [[createdAt.author]]
                                    </span>
                                </aside>
                                <aside class="asideBackgrc">
                                    <span>
                                        [[createdAt.date]]
                                    </span>
                                </aside>
                            </section>
                        <!--/template>
                    </dom-repeat-->
                </div>
            <!--/template>
        </dom-repeat-->`}static get is(){return"cms-content-subcats"}static get properties(){return{content:{type:Array,notify:!0,value:[]},subSubCats:{type:Array,notify:!0,value:[]},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},lang:{type:String,value:"",notify:!0},langs:{type:Object,value:{}},itemLabel:{type:String,value:"",notify:!0},add:{type:Boolean,value:!1,notify:!0}}}static get observers(){return["_routePageChanged(routeData, query)"]}_log(data){console.log(data)}ready(){super.ready();this.translator.target("cms-content-image","setLangObject",this._setLObj.bind(this));this.translator.target("cms-content-image","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-content-image","setLangObject");this.set("anchor",this.$.anchor);this.$.anchor.setAttribute("href",`${this.rootPath}content/pages`);window.addEventListener("reset",this._reset.bind(this))}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(routeData,query){if("edit-subcategory-pages"===routeData.page||"add-subcategory-pages"===routeData.page){if("indexarr"in query){this._resetSubCats();this.set("subSubCats",JSON.parse(atob(query.content)))}else if("content"in query,query.content){this.set("content",query.content);this.set("subSubCats",JSON.parse(atob(query.content)).subCategories)}}}_addSubCategory(){this.add=!0}_resetSubCats(){this.$.subcats._reset()}_reset(){this.images=[]}}_exports.cmsContentSubcats=cmsContentSubcats;customElements.define(cmsContentSubcats.is,cmsContentSubcats);var cmsContentSubcats$1={cmsContentSubcats:cmsContentSubcats};_exports.$cmsContentSubcats=cmsContentSubcats$1});