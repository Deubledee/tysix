import{cmsContentTemplate,html,PolymerElement,Setter,microTask,Debouncer,FlattenedNodesObserver,cmsItemImageTemplate,cmsItemTemplate}from"../cms-login.js";class cmsSubcatsItem extends cmsItemTemplate{static get _getStyles(){return html`
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
          
        </style>`}static get _getElement(){return html`
        <dom-if if="[[view]]">
            <template>
                <!--dom-repeat repeat items="[[subcatContent]]" as="item">
                    <template-->                
                        <article centerlistitem>
                            <div>
                                <shop-image class="bigger" title="[[item.title]]" aria-label="image" src="[[_getImage()]]"
                                    alt="[[item.title]]">
                                </shop-image>
                            </div>
                            <div title="[[item.title]]">
                                <paper-button title="[[item.title]]">
                                    [[item.title]]title
                                </paper-button>
                            </div>
                            <div>
                                <paper-button on-click="_viewEdit">
                                    <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
                                    <paper-icon-button icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                                </paper-button>
                            </div>
                            <div title="[[item.lang]]">
                                <paper-button title="[[item.lang]]">
                                    [[item.lang]]lang
                                </paper-button>
                            </div>
                            <div>
                                <paper-icon-button icon="av:not-interested" aria-label="delete" on-click="_openConfirm">
                                </paper-icon-button>
                            </div>                
                        </article>
                    <!--/template>                            
                </dom-repeat-->
            </template>
        </dom-if>
        <dom-if if="[[!view]]">
            <template>
                <nav>
                    <paper-button id="saveButton" on-click="_viewEdit"> 
                        [[save]]save
                    </paper-button>
                </nav>             
                <div bottom noborder$="[[noborder]]">
                    <dom-repeat repeat items="[[inputVal]]" as="item">
                        <template>                              
                            <section class="flexchildbotomShort">
                                <cms-content-item item-input="true"
                                    item="[[item]]" 
                                    anchor="[[anchor]]" 
                                    save-button="[[saveButton]]"  
                                    editing="{{editing}}" 
                                    res="{{inputResponse}}"> 
                                </cms-content-item>    
                            </section> 
                        </template>                            
                    </dom-repeat>
                    <dom-repeat repeat items="[[textareaVal]]" as="item">
                        <template>    
                            <section class="flexchildbotomFull">                                
                                <cms-content-item  item-text-area="true"
                                    item="[[item]]" 
                                    anchor="[[anchor]]" 
                                    save-button="[[saveButton]]"  
                                    editing="{{editing}}" 
                                    res="{{textAreaResponse}}">
                                </cms-content-item> 
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
            </template>
        </dom-if>
        <dom-if if="[[view]]">
            <template>
                <div bottom > 
                    <div class="plus">
                        <div class="plussubcat noFlex">
                            <paper-icon-button icon="av:library-add" aria-label="mode-show"></paper-icon-button>
                        </div>  
                        <div class="subcat noFlex">
                            <div class="flexleft">
                                <paper-icon-button on-click="_toggleChildren" icon="editor:drag-handle" aria-label="mode-show"></paper-icon-button>
                            </div>

                            <div class="diferent">
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
            </template>
        </dom-if>
        `}static get is(){return"cms-subcats-item"}static get properties(){return{translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},inputVal:{type:Array,notify:!0,value:[]},textareaVal:{type:String,notify:!0,value:""},noborder:{type:Boolean,value:!0,reflectToAttribute:!0},inputResponse:{type:Object,notify:!0,value:{},observer:"_setItemsValue"},textAreaResponse:{type:Object,notify:!0,value:{},observer:"_setContentTextValue"},subcat:{type:Object,notify:!0,value:{},observer:"_setContent"},imageArr:{type:Array,notify:!0},subcatContent:{type:Array,notify:!0// coputed: '_setContent(subcat)'
},subcatSubats:{type:Array,notify:!0},saveButton:{type:Object,notify:!0,coputed:"_setSaveButton(subcat)"},toContent:{type:Object,notify:!0},view:{type:Boolean,notify:!0,value:!0},published:{type:String,reflectToAttribute:!0},papgePath:{type:String,value:"edit-articles"},indexArr:{type:Array,value:[]}}}ready(){super.ready()}_log(data){console.log(data)}_toggleChildren(evt){let elem=evt.srcElement.parentElement.nextElementSibling;elem.classList.toggle("diferent")}_setContent(content){if(content.info){this.set("content",content);let obj=this.content.image;this.imageLabel="images";this.set("imageArr",obj);this.set("inputVal",this._getObjArr(this.content.items));this.set("textareaVal",this.content.contentText);this.set("subcatSubats",this.content.subCategories);if(this.$.Imag)this.$.Imag.addImage=this.addImage.bind(this)}}_setItemsValue(data){if(this.content!==void 0&&this.content.items){for(let par in data){this.content.items[0][par]=data[par];//  console.log(this.content, par)
}}}_setContentTextValue(data){if(this.content!==void 0&&this.content.contentText){for(let par in data){this.content.contentText[0][par]=data[par];//console.log(this.content.contentText[0][par], par, data)
}}}_pushModel(data){if(!0===data){let subcat=this.subcat;this._reset();setTimeout(()=>{subcat.subCategories.push(this.Modelo);this.subcat=subcat;this.add=!1},100)}}_slottItem(data,index){let str=`
            <div slot="table"> 
                <cms-subcats-item>
                </cms-subcats-item>
            </div>             
            `;this.translator.template.innerHTML=str;this.translator.clone(this);this.children[this.childElementCount-1].subcat=data;this.children[this.childElementCount-1].toContent=this.toContent;this.indexArr.push(index);this.children[this.childElementCount-1].indexArr=this.indexArr}_viewEdit(){this.view=!this.view}_getObjArr(content){let obj,arr=[];for(let par in content[0]){obj={};obj[par]=content[0][par];arr.push(obj)}return arr}_setSaveButton(){return this.$.saveButton}_setChildrenLang(data){if(0<this.childElementCount){for(let i=0;i<this.childElementCount;i++){this.children[i].children[0].lang=data}}}addImage(){let string=`editSubCats&content=${btoa(JSON.stringify(this.content))}&tocontent=${btoa(JSON.stringify(this.tocontent))}&indexarr=${this.indexArr}`;this.set("slashed",!0);window.history.pushState({},null,`${this.rootPath}media/images/galleries?addimageto=cats&method=${string}`);window.dispatchEvent(new CustomEvent("location-changed"));window.onbeforeunload=function(e){return"you might have changes to be saved, are you sure you whant to leave?"}}_openConfirm(event){let index=event.srcElement.parentElement.getAttribute("value");this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.content[index].name,method:this._deleteImg.bind(this),argument:index,headderMsgKind:"delete",type:"article"}}))})}__delete(data){let page=data;this.translator._DBW.deletePage(msg=>{if("error"!==msg){this.log(msg)}else{this.error(msg)}},page,Consts.__DEV)}}customElements.define(cmsSubcatsItem.is,cmsSubcatsItem);var cmsSubcatsItem$1={cmsSubcatsItem:cmsSubcatsItem};class cmsSubcats extends cmsItemImageTemplate{static get _getStyles(){return html`        
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
        }`}static get _getMenu(){return html`                          
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
            </section>`}static get _getItem(){return html` 
        <slot name="item"></slot>  
        <dom-repeat items="[[content]]" as="item">
            <template>
                [[_slottItem(item, index)]]
            </template>                            
        </dom-repeat>        
        `}static get is(){return"cms-subcats"}static get properties(){return{subSubCats:{type:Array,value:[],notify:!0},deleteImg:{type:Object,notify:!0},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},lang:{type:String,value:"",notify:!0,observer:"__changeLang"},langs:{type:Object,value:{}},itemLabel:{type:String,value:"",notify:!0},editIndex:{type:Number},content:{type:Array,value:"",computed:"_setContent(subSubCats)"},add:{type:Boolean,value:!1,notify:!0,observer:"_pushModel"},Modelo:{type:Object,value:{contentText:[{description:""}],image:[],info:[{author:"",dateAdde:"",publishedBy:[{author:"",date:"",uid:""}],unPublishedBy:[{author:"",date:"",uid:""}],lastModified:[{author:"",date:"",uid:""}],datePublished:"NP",published:"NP"}],items:[{categoryName:"",type:"",lang:""}],subCategories:[]},notify:!0},info:{type:Object,value:{}}}}connectedCallback(){super.connectedCallback();this._observer=new FlattenedNodesObserver(this,info=>{this.info=info})}disconnectedCallback(){super.disconnectedCallback();this._observer.disconnect()}ready(){super.ready();window.addEventListener("reset-subcats",this._reset.bind(this));window.addEventListener("reset",this._reset.bind(this));this.translator.target("cms-subcats","setLangObject",this._setLObj.bind(this));this.translator.target("cms-subcats","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-subcats","setLangObject")}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_pushModel(data){if(!0===data){let subcat=this.subSubCats||[];this._reset();setTimeout(()=>{subcat.push(this.Modelo);this.editIndex=subcat.length-1;this.subSubCats=subcat;this.add=!1},100)}}_slottItem(item,index){let str=`            
                <div scroll slot="item">          
                    <cms-subcats-item article="[[item]]">
                    </cms-subcats-item>          
                </div>                
                `;this.translator.template.innerHTML=str;this.translator.clone(this);this.children[this.childElementCount-1].children[0].model=this.Modelo;this.children[this.childElementCount-1].children[0].view=!0;if(this.editIndex===index)this.children[this.childElementCount-1].children[0].view=!1;this.children[this.childElementCount-1].children[0].lang=this.lang;this.children[this.childElementCount-1].children[0].toContent=this.content;this.children[this.childElementCount-1].children[0].indexArr=[index];this.children[this.childElementCount-1].children[0].subcat=item}_setContent(data){return data}_reset(){this.editIndex=NaN;this.subSubCats=[];this.add=!1;this.innerHTML="";console.log(this.innerHTML)}}customElements.define(cmsSubcats.is,cmsSubcats);var cmsSubcats$1={cmsSubcats:cmsSubcats};class cmsContentSubcats extends PolymerElement{static get template(){return html`<style include="cms-comon-style_v3">
        :host {
            position: relative;
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
        div[smaller]{
            width: 486px;
        }
        </style>  
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>       
        <section class="flexchildbotom3">
            <div left name="image">
                <paper-button>
                    [[subcatLabel]]
                </paper-button>
                <paper-icon-button  name="[[itemLabel]]" icon="av:library-add"  on-click="_addSubCategory" aria-label="mode-edit">
                </paper-icon-button> 
            </div>
            <cms-subcats id="subcats" sub-sub-cats="{{subSubCats}}" add="{{add}}">                  
                <div scroll slot="item">                
                </div>                 
            </cms-subcats>
        </section>
        `}static get is(){return"cms-content-subcats"}static get properties(){return{subSubCats:{type:Array,notify:!0,value:[]},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},lang:{type:String,value:"",notify:!0},langs:{type:Object,value:{}},itemLabel:{type:String,value:"",notify:!0},add:{type:Boolean,value:!1,notify:!0}}}ready(){super.ready();this.translator.target("cms-content-image","setLangObject",this._setLObj.bind(this));this.translator.target("cms-content-image","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-content-image","setLangObject");window.addEventListener("reset",this._reset.bind(this))}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_addSubCategory(){this.add=!0}_resetSubCats(){this.$.subcats._reset()}_log(data){console.log("images",data)}_reset(){this.images=[]}}customElements.define(cmsContentSubcats.is,cmsContentSubcats);var cmsContentSubcats$1={cmsContentSubcats:cmsContentSubcats};const Consts$1=new Setter;Consts$1.assets=Consts$1.getAssets("cms-page-list-type-content");class cmsPageListTypeContent extends cmsContentTemplate{static get _getAnchor(){return html`
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="anchor" on-click="resetSubcats">
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
        </iron-selector>`}static get _getContentItems(){return html`
        <div container>
            <div bottom hidebottom$="[[hidebottom]]">                   
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
                    <cms-content-image  id="image"
                        item-label="[[imageLabel]]"
                        images="[[imageArr]]"  
                        _deleteImg="[[deleteImg]]"  
                    </cms-content-image>
                </section>
                <section class="flexchildbotomFull">
                    <cms-content-subcats id="subcats"
                        route="{{route}}" 
                        sub-sub-cats="[[subSubCats]]" 
                        res="{{subcatsResponse}}">
                    </cms-content-subcats>
                </section>  
            </div>
        </div>  `}static get is(){return"cms-page-list-type-content"}static get properties(){return{user:{type:Object},CaTeGoRy:{type:Boolean,value:!0,notify:!0},inputVal:{type:Array,notify:!0,value:[]},textarea:{type:Boolean,value:!0,notify:!0},textareaVal:{type:String,notify:!0,value:""},imageArr:{type:Array,notify:!0,value:[]},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},lang:{type:String,notify:!0,value:""},langs:{type:Object,value:{}},subSubCats:{type:Array,notify:!0,value:[]},inputResponse:{type:Object,notify:!0,value:{},observer:"_setItemsValue"},textAreaResponse:{type:Object,notify:!0,value:{},observer:"_setContentTextValue"},subcatsResponse:{type:Object,notify:!0,value:{},observer:"_setsubcatsValue"},hidebottom:{type:Boolean,value:!1,reflectToAttribute:!0},content:{type:Object,notify:!0,value:{}},tocontent:{type:Object,notify:!0,value:{}},Model:{type:Object,value:{}}}}static get observers(){return["_routePageChanged(routeData, query, active)"]}ready(){super.ready();this.translator.target("cms-page-list-type-content","setLangObject",this._setLObj.bind(this));this.translator.target("cms-page-list-type-content","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-page-list-type-content","setLangObject");window.addEventListener("reset",this._reset.bind(this));this.set("saveButton",this.$.saveButton);// this.$.saveButton.classList.remove('diferent')
this.set("anchor",this.$.anchor);this.$.image.addImage=this.addImage.bind(this)}_setValues(data){console.log(data);this.set("temp",data);for(let par in data){this.set("itemText",data[par])}this._setLabels(data)}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(routeData,query,active){this.cancelElemenObject={};this.inputObject={};if(!1===!!this.slashed){this.slashed=!0}if(!0===active&&"edit-category-pages"===routeData.page||"add-category-pages"===routeData.page||"edit-subcategory-pages"===routeData.page||"add-subcategory-pages"===routeData.page){this.set("content",[]);this.add=!0;if("content"in query){if("added"in query){this.add=!1}if("add"in query){this.add=!0}if("indexarray"in query){//  this.CaTeGoRy = false
}this._setContent(query.content,query)}this.slashed=!1}}_setContent(content,query){this.$.saveButton.classList.add("diferent");this.$.anchor.setAttribute("href",`${this.rootPath}content/pages`);this.set("content",JSON.parse(window.atob(content)));let obj=this.content.image;this.imageLabel="images";this.set("imageArr",obj);this.set("inputVal",this._getObjArr(this.content.items));this.set("textareaVal",this._getObjArr(this.content.contentText));this.set("inform",this.content.info);this.set("subSubCats",this.content.subCategories);this.set("add","true"===query.add||"true"===query.added);this.set("slashed",!1)}addImage(){let string="editPages&content="+btoa(JSON.stringify(this.content));this.set("slashed",!0);window.history.pushState({},null,`${this.rootPath}media/images/galleries?addimageto=pages&method=${string}`);window.dispatchEvent(new CustomEvent("location-changed"));this.$.subcats._resetSubCats();window.onbeforeunload=function(e){return"you might have changes to be saved, are you sure you whant to leave?"}}_setItemsValue(data){if(this.content.items){for(let par in data){if("undefined"!==par.toString()){this.content.items[0][par]=data[par]}}}}_setContentTextValue(data){if(this.content.contentText){for(let par in data){if("undefined"!==par.toString()){this.content.contentText[0][par]=data[par]}}}}_setsubcatsValue(data){if(this.content.subCategories){for(let par in data){if("undefined"!==par.toString()){this.content.subCategories[0][par]=data[par]}}}}_getPublishedBy(publishedBy){if(publishedBy!==void 0&&0<publishedBy.length){let pubuser=publishedBy[0].name;return pubuser}}save(){let data=new Date;this.content.info[0].lastModified.push({uid:this.user.uid,author:this.user.displayName,date:data.toLocaleString().replace(",","")});if(!0===this.add){this.saveAdded(data)}if(!1===this.add){this.saveChanged(data)}}saveAdded(data){this.content.info[0].author=this.user.displayName;this.content.info[0].dateAdded=data.toLocaleString().replace(",","");this.content.info[0].uid=this.user.uid;this.content.id=this.content.items[0].categoryName.split(" ").join("_");Consts$1._DBW.setPages((done,err)=>{if("error"!==done){window.onbeforeunload=function(){};this.editing=0;this.temp="";this.$.saveButton.classList.add("diferent");this.$.anchor.classList.remove("diferent");//console.log(this.content, this.add)
setTimeout(()=>{this.__reset()},500)}else{console.log(err)}},this.content,Consts$1.__DEV)}saveChanged(){Consts$1._DBW.changePages((done,err)=>{if("error"!==done){window.onbeforeunload=function(){};this.editing=0;this.temp="";this.$.saveButton.classList.add("diferent");this.$.anchor.classList.remove("diferent");// console.log(this.content, this.add)
setTimeout(()=>{this.__reset()},500)}else{console.log(err)}},this.content,Consts$1.__DEV)}_reset(){this.$.anchor.setAttribute("href",`${this.rootPath}content/pages`);this.$.saveButton.classList.add("diferent");this.query={};this.routeData={};this.imageLabel="";this.set("content",[]);this.set("imageArr",[]);this.set("inform",[]);this.set("subCats",[]);this.set("add",0);this.set("slashed",!0);this.set("imageArr",[]);this.set("inputVal",[{reset:!0}]);this.set("textareaVal",[{reset:!0}]);this.set("inform",[]);this.set("subSubCats",[]);this.set("add",0)}resetSubcats(){window.onbeforeunload=function(){};this._debounceEvent=Debouncer.debounce(this._debounceEvent,microTask,()=>{window.dispatchEvent(new CustomEvent("reset-subcats",{bubbles:!0,composed:!0}))});this._reset()}__reset(){this.$.anchor.click();this._debounceEvent=Debouncer.debounce(this._debounceEvent,microTask,()=>{window.dispatchEvent(new CustomEvent("reset-list-type",{bubbles:!0,composed:!0}))})}}customElements.define(cmsPageListTypeContent.is,cmsPageListTypeContent);export{cmsContentSubcats$1 as $cmsContentSubcats,cmsSubcats$1 as $cmsSubcats,cmsSubcatsItem$1 as $cmsSubcatsItem,cmsContentSubcats,cmsSubcats,cmsSubcatsItem};