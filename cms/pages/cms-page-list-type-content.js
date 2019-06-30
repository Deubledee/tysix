define(["../cms-login.js"],function(_cmsLogin){"use strict";const Consts=new _cmsLogin.Setter;Consts.assets=Consts.getAssets("cms-page-list-type-content");class cmsPageListTypeContent extends _cmsLogin.cmsContentTemplate{static get _getAnchor(){return _cmsLogin.html`
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="anchor">
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
        </iron-selector>`}static get _getContentItems(){return _cmsLogin.html`
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
            </div>
        </div>  `}static get is(){return"cms-page-list-type-content"}static get properties(){return{user:{type:Object},inputVal:{type:Array,notify:!0,value:[]},textarea:{type:Boolean,value:!0,notify:!0},textareaVal:{type:String,notify:!0,value:""},imageArr:{type:Array,notify:!0,value:[]},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},lang:{type:String,notify:!0,value:""},langs:{type:Object,value:{}},inputResponse:{type:Object,notify:!0,value:{},observer:"_setItemsValue"},textAreaResponse:{type:Object,notify:!0,value:{},observer:"_setContentTextValue"},hidebottom:{type:Boolean,value:!1,reflectToAttribute:!0},content:{type:Object,notify:!0,value:{}},tocontent:{type:Object,notify:!0,value:{}},Model:{type:Object,value:{}}}}static get observers(){return["_routePageChanged(routeData, query, active)"]}ready(){super.ready();this.translator.target("cms-page-list-type-content","setLangObject",this._setLObj.bind(this));this.translator.target("cms-page-list-type-content","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-page-list-type-content","setLangObject");window.addEventListener("reset",this._reset.bind(this));this.set("saveButton",this.$.saveButton);this.$.saveButton.classList.add("diferent");this.set("anchor",this.$.anchor);this.$.image.addImage=this.addImage.bind(this)}_setValues(data){this.set("temp",data);this.$.saveButton.classList.add("diferent");for(let par in data){this.set("itemText",data[par])}this._setLabels(data)}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(routeData,query,active){this.cancelElemenObject={};this.inputObject={};if(!1===!!this.slashed){this.slashed=!0}if(!0===active&&"edit-category-pages"===routeData.page||"add-category-pages"===routeData.page||"edit-subcategory-pages"===routeData.page||"add-subcategory-pages"===routeData.page){this.set("content",[]);this.add=!0;if("content"in query){if("added"in query){this.add=!1}if("add"in query){this.add=!0}this._setContent(query.content,query)}this.slashed=!1}}_setContent(content,query){this.$.saveButton.classList.add("diferent");this.$.anchor.setAttribute("href",`${this.rootPath}content/pages`);this.set("content",JSON.parse(window.atob(content)));let obj=this.content.image;this.imageLabel="images";this.set("imageArr",obj);this.set("inputVal",this._getObjArr(this.content.items));this.set("textareaVal",this._getObjArr(this.content.contentText));this.set("inform",this.content.info);this.set("add","true"===query.add||"true"===query.added);this.set("slashed",!1)}addImage(){let string="editPages&content="+btoa(JSON.stringify(this.content));this.set("slashed",!0);window.history.pushState({},null,`${this.rootPath}media/images/galleries?addimageto=pages&method=${string}`);window.dispatchEvent(new CustomEvent("location-changed"));window.onbeforeunload=function(e){return"you might have changes to be saved, are you sure you whant to leave?"}}_setItemsValue(data){if(this.content.items){for(let par in data){if("undefined"!==par.toString()){this.content.items[0][par]=data[par]}}}}_setContentTextValue(data){if(this.content.contentText){for(let par in data){if("undefined"!==par.toString()){this.content.contentText[0][par]=data[par]}}}}_getPublishedBy(publishedBy){if(publishedBy!==void 0&&0<publishedBy.length){let pubuser=publishedBy[0].name;return pubuser}}save(){let data=new Date;this.content.info[0].lastModified.push({uid:this.user.uid,author:this.user.displayName,date:data.toLocaleString().replace(",","")});if(!0===this.add){this.saveAdded(data)}if(!1===this.add){this.saveChanged(data)}}saveAdded(data){this.content.info[0].author=this.user.displayName;this.content.info[0].dateAdded=data.toLocaleString().replace(",","");this.content.info[0].uid=this.user.uid;this.content.id=this.content.items[0].categoryName.split(" ").join("_");Consts._DBW.setPages((done,err)=>{if("error"!==done){window.onbeforeunload=function(){};this.editing=0;this.temp="";this.$.saveButton.classList.add("diferent");this.$.anchor.classList.remove("diferent");setTimeout(()=>{this.__reset()},500)}else{console.log(err)}},this.content,Consts.__DEV)}saveChanged(){Consts._DBW.changePages((done,err)=>{if("error"!==done){window.onbeforeunload=function(){};this.editing=0;this.temp="";this.$.saveButton.classList.add("diferent");this.$.anchor.classList.remove("diferent");setTimeout(()=>{this.__reset()},500)}else{console.log(err)}},this.content,Consts.__DEV)}_reset(){this.$.anchor.setAttribute("href",`${this.rootPath}content/pages`);this.query={};this.routeData={};this.imageLabel="";this.set("content",[]);this.set("imageArr",[]);this.set("inform",[]);this.set("add",0);this.set("slashed",!0);this.set("inform",[]);this.set("add",0)}__reset(){this.$.anchor.click();this._debounceEvent=_cmsLogin.Debouncer.debounce(this._debounceEvent,_cmsLogin.microTask,()=>{window.dispatchEvent(new CustomEvent("reset-list-type",{bubbles:!0,composed:!0}))})}}customElements.define(cmsPageListTypeContent.is,cmsPageListTypeContent)});