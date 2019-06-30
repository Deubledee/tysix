import{PolymerElement,html$1 as html,scroll,dataBaseworker,Debouncer,microTask}from"./cms-login.js";const __DEV=!0,_DBW=new dataBaseworker,_STYLES=_DBW.getElementAssets("cms-page-list-type-content",!0);class cmsPageListTypeContent extends PolymerElement{static get template(){return html`<style include="cms-comon-style_v3">
        :host {
            position: relative
        }
        </style>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>
        <main id="main">
            <div>
                <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                    <a href="[[rootPath]]content/pages/">
                        <paper-icon-button icon="arrow-back" aria-label="Go back">
                        </paper-icon-button>
                    </a>
                </iron-selector>
                <paper-button id="saveButton" class="diferent" on-click="save" aria-label="mode-save">
                    SAVE
                </paper-button>
            </div>
            <div class="flex">
                <nav class="navbottom" id="bottom">
                    <dom-repeat repeat items="[[content]]" as="cat">
                        <template>
                            <div container>
                                <div bottom>
                                    <section class="flexchildbotom">
                                        <div class="flexleft">
                                            <paper-button on-click="editTo">
                                                [[pagetitle]]
                                            </paper-button>
        
                                            <paper-button  value="title" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                                [[cancel]]
                                            </paper-button>
        
                                        </div>
                                        <div class="flexright">
                                            <div>
                                                <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                    [[cat.title]]
                                                </paper-button>
                                                <paper-input hidden name="title" aria-label="title" value="{{cat.title}}" on-input="inputing" placeholder="[[cat.title]]">
                                                </paper-input>
                                            </div>
                                        </div>
                                    </section>
                                    <section class="flexchildbotom">
                                        <div class="flexleft">
                                            <paper-button on-click="editTo">
                                                [[pagelang]]
                                            </paper-button>
                                            <paper-button  value="lang" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                                [[cancel]]
                                            </paper-button>
                                        </div>
                                        <div class="flexright">
                                            <div>
                                                <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                    [[cat.lang]]
                                                </paper-button>
                                                <paper-input hidden name="lang" value="[[cat.lang]]" on-input="inputing" placeholder="[[cat.lang]]">
                                                </paper-input>
                                            </div>
                                        </div>
                                    </section>
                                    <section class="flexchildbotom">
                                        <div class="flexleft">
                                            <paper-button on-click="editTo">
                                                [[pageType]]
                                            </paper-button>
                                            <paper-button  value="type" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                                [[cancel]]
                                            </paper-button>
                                        </div>
                                        <div class="flexright">
                                            <div>
                                                <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                    [[cat.type]]
                                                </paper-button>
                                                <paper-input hidden name="type" value="[[cat.type]]" on-input="inputing" placeholder="[[cat.type]]">
                                                </paper-input>
                                            </div>
                                        </div>
                                    </section>
                                    <section class="flexchildbotom">
                                        <div class="flexleft">
                                            <paper-button on-click="editTo">
                                                [[placeholder]]
                                            </paper-button>
                                            <paper-button  value="placeholder" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                                [[cancel]]
                                            </paper-button>
                                        </div>
                                        <div class="flexright">
                                            <div>
                                                <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                    [[cat.placeholder]]
                                                </paper-button>
                                                <paper-input hidden name="placeholder" value="[[cat.placeholder]]" on-input="inputing" placeholder="[[cat.placeholder]]">
                                                </paper-input>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <section class="flexchildbotom3">
                                    [[slotImageElement(cat)]]
                                    <slot name="image">
                                    </slot>
                                </section>
                            </div>
                        </template>
                    </dom-repeat>
                </nav>
                <nav class="navside">
                    <dom-repeat repeat items="[[content]]" as="cat">
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
                            <div class="navsideright">
                                <aside>
                                    <span>
                                        [[ _getPublishedBy(cat.publishedBy)]]
                                    </span>
                                </aside>
                                <aside published$="[[cat.published]]">
                                    <span>
                                        [[cat.published]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[cat.datePublished]]
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
                                        [[cat.dateCreated]]
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
                                <dom-repeat repeat items="[[cat.lastModified]]" as="createdAt">
                                    <template>
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
                        </template>
                    </dom-repeat>
                </nav>
            </div>
        </main>
        `}static get is(){return"cms-page-list-type-content"}static get properties(){return{DBW:{type:Object,value:function(){return new dataBaseworker},notify:!0},user:{type:Object,notify:!0},query:Object,type:{type:String,value:"",notify:!0},lang:{type:String,notify:!0,observer:"__changeLang"},langs:{type:Object,value:{}},published:{type:String,value:"",notify:!0,reflectToAttribute:!0},open:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0},adding:{type:Boolean,notify:!0,value:!0,reflectToAttribute:!0},category:{type:Object,notify:!0},categoryName:{type:String,notify:!0},categoryIndex:{type:Number,notify:!0},add:{type:Boolean,value:!1,notify:!0},tada:{type:Boolean,value:!1,notify:!0},sett:{type:Boolean,value:!1,notify:!0},tempArray:{type:Array,value:[]},canceled:{type:Boolean,value:!1},sabveButton:{type:Object},cancelButton:{type:Object},temp:{type:Object,value:{}},editing:{type:Number,value:0},slashed:{type:Boolean,value:!1}}}static get observers(){return["_routePageChanged(routeData, query, active)"]}ready(){super.ready();_STYLES.then(querySnapshot=>{let langs=querySnapshot.data();this._setLangObject(langs)}).catch(function(error){console.error("Error reteaving assets: ",error)})}__changeLang(){if(this.langs[this.lang]){let obj=this.langs[this.lang];for(let par in obj){this.set(par,obj[par])}}}_setLangObject(langs){for(let par in langs){if("styles"!==par){this.langs[par]=langs[par].pop()}}this.__changeLang()}log(data){console.log("log from cms-category-content",data)}error(data){console.error("error from cms-category-content",data)}_routePageChanged(routeData,query,active){if(!0===active){this.set("content",[]);if(!1==="catlistcreated"in query&&!1==="catlistupdated"in query){if("content"in query){this.set("tada",!1);this.set("content",[JSON.parse(window.atob(query.content))]);this.set("add","true"===query.add);this.slashed=!1}}}else if(!1===active&&!1===this.slashed){this.set("content",[]);this.set("add",!1);window.history.pushState({},null,`${location.pathname}/`);window.dispatchEvent(new CustomEvent("location-changed"));this.slashed=!0}}clean(setterValue){let setter;if(!0===setterValue instanceof MouseEvent){setter="true"}else{setter=setterValue}if("N/a"===this.pageName||"newPage"===setterValue){setter=!1}scroll({top:0,behavior:"smooth"});this.setter=setter}_getPublishedBy(publishedBy){if(publishedBy!==void 0&&0<publishedBy.length){let pubuser=publishedBy[0].name;return pubuser}}__reset(){this.slashed=!0;this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{window.dispatchEvent(new CustomEvent("reset-list-type",{bubbles:!0,composed:!0,detail:"categorypages"}))});console.log("log from cms-category-content");this.set("content",[]);this.set("add",!1)}save(){let content=this.content.pop(),data=new Date,lastModified,author=!0==="author"in content&&0<content.author.split("").length?content.author:this.user,date=!0==="dateCreated"in content&&0<content.dateCreated.split("").length?content.dateCreated:data.toLocaleString().replace(",","");lastModified=!0==="lastModified"in content&&0<content.lastModified.length?content.lastModified:[];if(!0===this.add){content.name=content.title.toLocaleLowerCase();content.name=content.name.split(" ").join("_");content.id=content.name;content.uid=this.user.uid;content.author=author;content.dateCreated=date;lastModified.push({uid:this.user.uid,author:this.user.displayName,date:data.toLocaleString().replace(",","")});content.lastModified=lastModified;let obj2={id:content.name,uid:this.user.uid,author:author,dateCreated:date,lastModified:lastModified,parent:content.name,content:[],type:content.type};_DBW.setPages((done,err)=>{if("error"!==done){this.DBW.setArticles((done,msg)=>{console.log(done,msg)},obj2,__DEV);window.onbeforeunload=function(){};this.editing=0;this.temp="";this.cancelButton.classList.add("diferent");this.$.saveButton.classList.add("diferent");this.clean("newPage");this.__reset()}else{console.log(err)}},content,__DEV)}else{lastModified.push({uid:this.user.uid,author:this.user.displayName,date:data.toLocaleString().replace(",","")});content.id=content.name;content.uid=this.user.uid;content.author=author;content.dateCreated=date;content.lastModified=lastModified;this.DBW.writePagesContent((done,err)=>{if("error"!==done){window.onbeforeunload=function(){};this.editing=0;this.temp="";this.cancelButton.classList.add("diferent");this.$.saveButton.classList.add("diferent");this.clean("newPage");this.__reset()}else{console.log(err);this.clean("true")}},content,__DEV)}}editTo(event){let inpt,buttn,par,cancel,mainElem=event.srcElement.parentElement.parentElement.children[1].children[0];buttn=mainElem.children[0];inpt=mainElem.children[1];par=event.srcElement.innerText.split(" ").pop().toLowerCase();cancel=event.srcElement.nextElementSibling;this.edit(event,inpt,buttn,par,cancel)}edit(event,inpt,buttn,par,cancel){this.input=!0===Number.isInteger(inpt)?event.srcElement.parentElement.children[1]:inpt;let button=buttn||event.srcElement;this.cancelButton=cancel||event.srcElement.parentElement.parentElement.previousElementSibling.children[1];this.modelCat=event.model.__data.cat;if(!0===this.input.hidden){this.input.hidden=!1;button.classList.add("diferent");this.input.onkeydown=this.__keyDownHandler.bind(this);window.onbeforeunload=function(){return"not without saving first :)"}}else{this.input.hidden=!0;button.classList.remove("diferent");if(0===this.editing){this.input.onkeydown=function(){};window.onbeforeunload=function(){}}}}__keyDownHandler(event){if("Backspace"===event.code||"Delete"===event.code){this.set("par",event.srcElement.name);if(""===this.temp[event.srcElement.name]){this.temp[event.srcElement.name]=this.modelCat[this.par];this._inputState()}}}inputing(event){this.set("par",event.srcElement.name);if(!1===this.par in this.temp){this._setTemp()}else if(!0===this.temp[this.par].canceled){this._setTemp()}}_setTemp(){this.temp[this.par]={};this.temp[this.par].data=!0!==this.add?this.modelCat[this.par]:void 0;this.temp[this.par].canceled=!1;this._inputState()}_inputState(){if(!0===!!this.input.value){this.cancelButton.classList.remove("diferent");this.$.saveButton.classList.remove("diferent");this.editing=this.editing+1;this.canceled=!1}}Cancel(event){let input=event.srcElement.parentElement.nextElementSibling.children[0].children[1];this.set("par",input.name);this.set("input",input);this.input.value=this.temp[this.par].data===void 0?"":this.temp[this.par].data;if(!1===this.temp[this.par].canceled){this.cancelState(event.srcElement);this.set("par","");this.input.onkeydown=function(){}}}cancelState(srcElemen){this.temp[this.par].data="";this.temp[this.par].canceled=!0;srcElemen.classList.add("diferent");if(1>=this.editing){this.$.saveButton.classList.add("diferent");this.editing=0;window.onbeforeunload=function(){}}else{this.editing=this.editing-1}}slotImageElement(cat){if(this.imageElement===void 0){let template=html` <cms-image slot="image">
                               <cms-image-form slot="imageForm">
                               </cms-image-form>
                            </cms-image>`,clone=document.importNode(template.content,!0);this.appendChild(clone);this.imageElement=this.children[0];this.imageElement.set("images",cat);this.cancelButton=this.imageElement.$.cancel;if("deleted"in this.query&&!0===this.query.deleted||"true"===this.query.deleted){this.cancelButton.classList.remove("diferent")}this.imageElement.deleteImg=this.deleteImg.bind(this);this.imageElement.$.add.addEventListener("click",this.addImage.bind(this));this.imageElement.$.cancel.addEventListener("click",this.cancelImages.bind(this))}}setImage(data){if("url"in data){let img=new Image,arr=[];img.src=data.url;if(600>img.naturalHeight){if(!0===this.content[0].image instanceof Array){arr=this.content[0].image}else{arr.push(this.content[0].image)}arr.push(data.url);this.content[0].image=arr;this.notifyPath("content[0].image")}if(600<=img.naturalHeight){if(!0===this.content[0].largeImage instanceof Array){arr=this.content[0].largeImage}else{arr.push(this.content[0].largeImage)}arr.push(data.url);this.content[0].largeImage=arr;this.notifyPath("content[0].largeImage")}this.imageElement.set("images",this.content[0]);this.addingcancel=this.adding;this.adding=!this.adding;this.$.saveButton.classList.remove("diferent");this.editing=this.editing+1}}addImage(){let template=html`<cms-gallery-viewer></cms-gallery-viewer>`;console.log("add image here");window.onbeforeunload=function(){return"not without saving first :)"}}setImages(data){this.content[0].image=data.url}del(index){if(!0===this.content[0].image instanceof Array){this.set("tempArray",this.content[0].image[index]);if(0<index){this.content[0].image.splice(index,index)}else{this.content[0].image.splice(0,1)}}else{this.set("tempArray",this.content[0].image);this.content[0].image=""}let string=window.btoa(`${JSON.stringify(this.content[index])}`);window.history.pushState({},null,`content/pages/edit-category-pages?content=${string}&deleted=true`);window.dispatchEvent(new CustomEvent("location-changed"));this.removeChild(this.children[0])}deleteImg(data){if(data!==void 0){this.del(data.model.__data.index);this.$.saveButton.classList.remove("diferent");this.editing=this.editing+1;this.remove=void 0}}cancelImages(){console.log(this.tempArray);this.imageElement.set("content",this.tempArray);this.cancelState();if(!1===this.addingcancel){this.adding=!this.adding}}}customElements.define(cmsPageListTypeContent.is,cmsPageListTypeContent);