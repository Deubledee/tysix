define(["../cms-login.js"],function(_cmsLogin){"use strict";class cmsArticleContent extends _cmsLogin.cmsContentTemplate{static get _getAnchor(){return _cmsLogin.html`
        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a id="anchora" on-click="reset">
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
        </iron-selector>
        `}static get _getContentItems(){return _cmsLogin.html`
        <div container>
            <div bottom>                   
                <dom-repeat repeat items="[[inputVal]]" as="item">
                    <template>
                        <section class="flexchildbotomShort">
                            <cms-content-item item-input="true"
                                item="[[item]]" 
                                anchor="[[anchor]]" 
                                save-button="[[saveButton]]" 
                                lang="[[lang]]"  
                                editing="{{editing}}" 
                                res="{{inputResponse}}">
                            </cms-content-item>                                    
                        </section>   
                    </template>
                </dom-repeat>         
                <dom-repeat repeat items="[[textareaVal]]" as="item">
                    <template>
                        <section class="flexchildbotomFull">
                            <cms-content-text item-text-area="true"
                                item="[[item]]" 
                                anchor="[[anchor]]" 
                                save-button="[[saveButton]]"  
                                lang="[[lang]]"  
                                editing="{{editing}}" 
                                res="{{textAreaResponse}}">
                            </cms-content-text>            
                        </section>
                    </template>
                </dom-repeat>                          
                <section class="childbotom">      
                    <cms-content-image  id="imagea"
                        item-label="[[imageLabel]]"
                        images="[[imageArr]]" 
                        editing="{{editing}}" 
                        anchor="[[anchor]]" 
                        save-button="[[saveButton]]" 
                        _deleteImg="[[deleteImg]]"  
                        lang="[[lang]]" res="">
                    </cms-content-image>
                </section>
            </div>
        </div>`}static get _getSideInfo(){return _cmsLogin.html`
        <dom-repeat repeat items="[[inform]]" as="cat">
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
                            [[author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datecreated]]
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                            [[cat.author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[cat.dateAdded]]
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                            [[publiShed]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[publishedby]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datepublished]]
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside published$="[[cat.published]]">
                        <span>
                            [[cat.published]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[ _getPublishedBy(cat.publishedBy)]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[cat.datePublished]]
                        </span>
                    </aside>
                </div>
                <div class="flexsidecenter">
                    <aside>
                        <span>
                            [[lastmodified]]
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
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
                                <aside>
                                    <span>
                                        [[createdAt.author]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[createdAt.date]]
                                    </span>
                                </aside>
                            </section>
                        </template>
                    </dom-repeat>
                </div>
            <!--/template>
        </dom-repeat-->`}static get is(){return"cms-article-content"}static get properties(){return{type:{type:String,value:"article",notify:!0},inputVal:{type:Array,notify:!0,value:[]},textareaVal:{type:String,notify:!0,value:""},editing:{type:Number,notify:!0},imageArr:{type:Array,notify:!0,value:[]},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},lang:{type:String,notify:!0},langs:{type:Object,value:{}}}}static get observers(){return["_routePageChanged(routeData, query, active)"]}ready(){super.ready();this.translator.target("cms-page-list-type-content","setLangObject",this._setLObj.bind(this));this.translator.target("cms-page-list-type-content","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-page-list-type-content","setLangObject");window.addEventListener("reset",this.reset.bind(this));this.$.imagea.addImage=this.addImage.bind(this)}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_getPublishedBy(data){if(data!==void 0)return data.author}_routePageChanged(routeData,query,active){this.cancelElemenObject={};this.inputObject={};if(!0===!!active&&"edit-articles"===routeData.page||"add-articles"===routeData.page){if("added"in query){this.$.saveButton.classList.remove("diferent");this.$.anchora.classList.add("diferent");this.editing=this.editing+1}if("content"in query){this._setContent(query.content,query.add||query.added,query.added)}}}_setContent(content,add,added){this.$.anchora.href=`${this.rootPath}content/articles/view-articles`;//?content=${content}
let parsed=JSON.parse(window.atob(content));if(add!==void 0){this.set("content",parsed);this.imageLabel="images";this.set("imageArr",this.content.image);this.set("inputVal",this._getObjArr(this.content.items));this.set("textareaVal",this.content.contentText);this.set("inform",this.content.info);this.set("add","true"===add);this.set("added","true"===added)}this.slashed=!1}addImage(){let string="editArticles&content="+btoa(JSON.stringify(this.content));this.set("slashed",!0);window.history.pushState({},null,`${this.rootPath}media/images/galleries?addimageto=articles&method=${string}`);window.dispatchEvent(new CustomEvent("location-changed"));window.onbeforeunload=function(e){return"you might have changes to be saved, are you sure you whant to leave?"};// this.reset()
}_reset(){this.$.saveButton.classList.add("diferent");this.$.anchora.classList.remove("diferent");this.set("content",[]);this.set("imageArr",[]);this.set("inputVal","");this.set("textareaVal","");this.set("inform",[0]);this.set("add",0)}save(){let content=this.content.pop(),data=new Date,lastModified,author,date;author=!0==="author"in content&&0<content.author.split("").length?content.author:this.user.displayName;date=!0==="dateCreated"in content&&0<content.dateCreated.split("").length?content.dateCreated:data.toLocaleString().replace(",","");lastModified=!0==="lastModified"in content&&0<content.lastModified.length?content.lastModified:[];if(!0===this.add){content.name=content.title.toLocaleLowerCase();content.name=content.name.split(" ").join("_");content.id=content.name;content.uid=this.user.uid;content.author=author;content.dateCreated=date;content.published="NP";lastModified.push({uid:this.user.uid,author:this.user.displayName,date:data.toLocaleString().replace(",","")});content.lastModified=lastModified;let obj2={author:author,content:[],dateCreated:date,id:content.name,items:0,lastModified:lastModified,publishedCount:0,type:content.type,uid:this.user.uid};this.DBW.setArticles((done,msg)=>{console.log(done,msg)},obj2,__DEV);window.onbeforeunload=function(){};this.editing=0;this.temp="";this.cancelButton.classList.add("diferent");this.$.saveButton.classList.add("diferent");this.$.anchor.classList.remove("diferent");this.__reset()}else{lastModified.push({uid:this.user.uid,author:this.user.displayName,date:data.toLocaleString().replace(",","")});content.id=content.name;content.uid=this.user.uid;content.author=author;content.dateCreated=date;content.lastModified=lastModified;this.DBW.writePagesContent((done,err)=>{if("error"!==done){window.onbeforeunload=function(){};this.editing=0;this.temp="";this.cancelButton.classList.add("diferent");this.$.saveButton.classList.add("diferent");this.$.anchor.classList.remove("diferent");this.__reset()}else{console.log(err)}},content,__DEV)}}del(index){this.temp.image.data=this.content[0].image;if(!0===this.content[0].image instanceof Array){if(0<index){this.content[0].image.splice(index,index)}else{this.content[0].image=[]}}else{this.content[0].image=[]}this._setContent(btoa(JSON.stringify(this.content)),"true");if(1>=this.editing){this._reset("image")}else{this.set("par",{});this.editing=this.editing-1}}deleteImg(data){console.log(data);if(data!==void 0){this.temp.image={inputing:!1,data:""};this.par="image";this.del(data.index)}}cancelImages(){this.imageElement.set("images",this.tempArray);this.imageElement.set("del",!0);this.cancelState();if(!1===this.addingcancel){this.adding=!this.adding}}}customElements.define(cmsArticleContent.is,cmsArticleContent)});