import{PolymerElement,html$1 as html,dataBaseworker,scroll}from"./cms-login.js";class cmsArticleContent extends PolymerElement{static get template(){return html`
        <style include="cms-common-styles">
        
        :host {
            position: absolute;
            z-index: 120;
        }

        main{
            width: 96%;
            left: -44px;
        }
     
        .open {
            opacity: 1!important;
            height: auto!important;
        }
        
        paper-button.close {
            background-color: #a9e5e5;
            color: black;
            font-weight: bold;
        }

        section[bottom]{
            ￼    max-height: 408px;
            }
    
            section[bottom3] {
                display: block;  
                flex-basis: 92%;    
            }
    
        [adding] {
            display: none!important
        }  

        div[buttons]{
            display: flex
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
            <div conatainer>
                <nav bottom id="bottom">
                    <dom-repeat repeat items="[[content]]" as="cat">
                        <template>
                            <div bottom>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            Article title 
                                        </paper-button>

                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>

                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                [[art.title]]
                                            </paper-button>
                                            <paper-input hidden value="{{cat.title}}" on-input="inputing" placeholder=>"[[art.title]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            Category
                                        </paper-button>

                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                [[art.category]]
                                            </paper-button>
                                            <paper-input hidden value="{{cat.category}}" on-input="inputing" placeholder=>"[[art.category]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            type
                                        </paper-button>

                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                [[art.type]]
                                            </paper-button>
                                            <paper-input hidden value="{{cat.type}}" on-input="inputing" placeholder=>"[[art.type]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            brand
                                        </paper-button>
                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                            [[art.brand]]
                                            </paper-button>
                                            <paper-input hidden value="[[art.brand]]" on-input="inputing" placeholder=>"[[art.brand]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            price 
                                        </paper-button>
                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                            [[art.price]]
                                            </paper-button>
                                            <paper-input hidden value="[[art.price]]" on-input="inputing" placeholder=>"[[art.price]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                        description
                                        </paper-button>
                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                            [[art.description]]
                                            </paper-button>
                                            <paper-input hidden value="[[art.description]]" on-input="inputing" placeholder=>"[[art.description]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom3>
                                    [[slotImageElement(art)]]
                                    <slot name="image">
                                    </slot>
                                </section>
                            </div>                                           
                        </template>
                    </dom-repeat>
                </nav> 
                <nav side>
                    <dom-repeat repeat items="[[article]]" as="cat">
                        <template> 
                            <div left>
                                <aside>
                                    <span>
                                        author
                                    </span>
                                </aside>
                            </div>
                            <div right>
                                <aside>
                                    <span>
                                        [[art.author]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[art.dateCreated]]
                                    </span>
                                </aside>
                            </div> 
                            <div left>
                                <aside>
                                    <span>
                                        author
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        date created
                                    </span>
                                </aside>
                            </div>
                            <div right>
                                <aside>
                                    <span>
                                        [[art.author]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[art.dateCreated]]
                                    </span>
                                </aside>
                            </div>
                            <div center>
                                <aside>
                                    <span>
                                        last modified
                                    </span>
                                </aside>
                            </div>
                            <div left>
                                <aside>
                                    <span>
                                        author
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        date 
                                    </span>
                                </aside>
                            </div>
                            <div right>
                                <dom-repeat repeat items="[[art.lastModified]]" as="createdAt">
                                    <template>
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
                                    </template>
                                </dom-repeat>
                            </div>                    
                        </template>
                    </dom-repeat> 
                </nav> 
            </div>
        </main>



        `}static get is(){return"cms-article-content"}static get properties(){return{DBW:{type:Object,value:function(){return new dataBaseworker},notify:!0},content:{type:Array,value:[],notify:!0},type:{type:String,value:"",notify:!0},article:{type:Object,notify:!0},articleName:{type:String,notify:!0},articleIndex:{type:Number,notify:!0},add:{type:Boolean,value:!1,notify:!0},tada:{type:Boolean,value:!1,notify:!0,observer:"toggleZIndex"},viewerSet:{type:Boolean,value:!1,notify:!0},sett:{type:Boolean,value:!1,notify:!0},remove:{type:Object,observer:"deleteImg"},canceled:{type:Boolean,value:!1},imageElement:{type:Object},cancelButton:{type:Object},setter:{type:String,notify:!0,value:"false"},tempArray:{type:Array,value:[]},temp:{type:String,value:""},editing:{type:Number,value:0},pageTypes:{type:Array,value:[{label:"Page type"},{name:"---"},{name:"list"},{name:"sub category",notAtive:!1},{name:"Social",notAtive:!1},{name:"Video",notAtive:!1}]}}}static get observers(){return["_routePageChanged(routeData, query, active)"]}ready(){super.ready()}log(data){console.log("log from cms-article-content",data)}error(data){console.error("error from cms-article-content",data)}_routePageChanged(routeData,query,active){if(!0===active){this.set("content",[]);if("content"in query){this.set("tada",!1);this.set("content",[JSON.parse(window.atob(query.content))]);this.set("add","true"===query.add);this.slashed=!1}}else if(!1===active&&!1===this.slashed){this.set("content",[]);this.set("add",!1);window.history.pushState({},null,`${location.pathname}/`);window.dispatchEvent(new CustomEvent("location-changed"));this.slashed=!0}}toggleTada(data){this.tada=!1;this.removeChild(this.children[0]);this.set("content",[]);for(let i=1;0<this.childElementCount;i++){this.removeChild(this.children[0])}}toggleZIndex(data){if(!0===data){this.style.display="block";setTimeout(()=>{this.$.bottom.classList.add("open")},100)}else{this.$.bottom.classList.remove("open");setTimeout(()=>{this.style.display="none"},1e3)}}save(event){if(!0===this.add){this.push("article.content",this.content.pop())}let table={name:this.articleName,content:this.article.content};this.DBW.updateArticles(done=>{this.editing=0;this.temp="";this.cancelButton.classList.add("diferent");this.$.saveButton.classList.add("diferent")},table)}editCats(event){let elem=event.srcElement.parentElement.parentElement.children[2],elem1=event.srcElement.parentElement.parentElement.children[1],color=event.srcElement.computedStyleMap().get("color").toString();if("rgb(128, 152, 173)"===color){event.srcElement.style.color="var(--google-blue-700)"}else{event.srcElement.style.color="rgb(128, 152, 173)"}elem.setInputing=function(){this.cancelButton.classList.remove("diferent");this.$.saveButton.classList.remove("diferent");this.editing=this.editing+1}.bind(this);elem.classList.toggle("diferent");elem1.classList.toggle("diferent")}edit(event){let elem=event.srcElement.parentElement.children[2],elem1=event.srcElement.parentElement.children[1],color=event.srcElement.computedStyleMap().get("color").toString();if("rgb(128, 152, 173)"===color){event.srcElement.style.color="var(--google-blue-700)"}else{event.srcElement.style.color="rgb(128, 152, 173)"}elem.hidden=!elem.hidden;elem1.classList.toggle("diferent")}inputing(event){let par=event.srcElement.parentElement.previousElementSibling.children[0].innerText.toLowerCase(),value=event.srcElement.value,string="art."+par;this.inputState(event,par);event.model.set(string,value)}inputState(event,par){console.log(event.model.__data.index);this.set("cancelButton",event.srcElement.parentElement.previousElementSibling.children[1]);let arr=""+event.model.__data.art[par],index=event.model.__data.index;if(0<arr.split("").length){if(this.tempArray[par]===void 0){this.set("tempArray."+par,0===arr.split("").length?null:event.model.__data.art[par]);this.editing=this.editing+1}this.cancelButton.classList.remove("diferent");this.$.saveButton.classList.remove("diferent")}}cancel(event){let par=event.srcElement.previousElementSibling.innerText.toLowerCase(),input=event.srcElement.parentElement.nextElementSibling.children[2],string="art."+par,index=event.model.__data.index;input.value=this.tempArray[par];if(!0!==this.canceled){this.cancelState(event.srcElement.parentElement.nextElementSibling,par);event.model.set(string,input.value)}}cancelState(srcElement,par){delete this.tempArray[par];if(1>=this.editing){this.set("editing",0);this.$.saveButton.classList.add("diferent")}else{this.set("editing",this.editing-1);this.canceled=!0}srcElement.children[2].hidden=!0;srcElement.children[1].classList.remove("diferent")}slotImageElement(cat){let template=html` <cms-image slot="image">
                               <cms-image-form slot="imageForm">
                               </cms-image-form>
                            </cms-image>`,clone=document.importNode(template.content,!0);this.appendChild(clone);this.imageElement=this.children[0];this.imageElement.set("images",cat);this.cancelButton=this.imageElement.$.cancel;if("deleted"in this.query&&!0===this.query.deleted||"true"===this.query.deleted){this.cancelButton.classList.remove("diferent")}this.imageElement.deleteImg=this.deleteImg.bind(this);this.imageElement.$.add.addEventListener("click",this.addImage.bind(this));this.imageElement.$.cancel.addEventListener("click",this.cancelImages.bind(this))}addImage(){let template=html`<cms-gallery-viewer></cms-gallery-viewer>`;console.log(this.children[1].childElementCount);if(2>this.children[1].childElementCount){this.children[1].prepend(template.content.children[0]);this.children[1].children[0].addMethod=this.setImage.bind(this)}else{this.children[1].removeChild(this.children[1].children[0])}}_fromImage(image){let url,obj1,obj2,arr=[];if(1<=image.image.length){for(let i=0;i<image.image.length;i++){url=image.image[i];obj1={url:url,title:image.title,type:"image"};arr.push(obj1)}this.imageElement.set("del",!0)}else{url="";obj2={url:url,title:""};arr.push(obj2);this.imageElement.set("del",!1)}return arr}_fromlargeImage(image){let url2,obj2,arr=[];if(1<=image.largeImage.length){for(let i=0;i<image.largeImage.length;i++){url2=image.largeImage[i];obj2={url:url2,title:image.title,type:"largeImage"};arr.push(obj2)}this.imageElement.set("del",!0)}else{url="";obj2={url:url,title:""};arr.push(obj2);this.imageElement.set("del",!1)}return arr}getImage(image){if(image!==void 0){let url=image.image,url2=image.largeImage,obj1,obj2,arr=[];if(!0===image.image instanceof Array){obj1=this._fromImage(image)}else{obj1=[{url:url,title:image.title,type:"image"}];arr.push(obj1)}if(!0===image.largeImage instanceof Array){obj2=this._fromlargeImage(image)}else{obj2=[{url:url2,title:image.title,type:"largeImage"}];arr.push(obj2)}console.log(arr.concat(obj1,obj2));return arr.concat(obj1,obj2)}else{console.log("fucck");return[{url:"",title:"",type:""}]}}setImage(data){console.log(this.content[0].image,"data");if("url"in data){let img=new Image,arr=[];img.src=data.url;if(600>img.naturalHeight){if(!0===this.content[0].image instanceof Array){arr=this.content[0].image}else{arr.push(this.content[0].image)}}if(600<=img.naturalHeight){if(!0===this.content[0].largeImage instanceof Array){arr=this.content[0].largeImage}else{arr.push(this.content[0].largeImage)}}this.addingcancel=this.adding;this.adding=!this.adding;this.imageElement.set("del",!0);this.imageElement.set("images",this.getImage(this.content[0]));this.cancelButton.classList.remove("diferent");this.$.saveButton.classList.remove("diferent");this.editing=this.editing+1}}del(data,index){if(!0===this.content[0].image instanceof Array){if(0<index){this.content[0][data.type].splice(index,index)}else{this.content[0][data.type].splice(0,1)}}else{this.content[0][data.type]=[]}this.imageElement.set("images",this.getImage(this.content[0]))}deleteImg(data){if(data!==void 0){this.del(data.model.__data.image,data.model.__data.index);this.cancelButton.classList.remove("diferent");this.$.saveButton.classList.remove("diferent");this.editing=this.editing+1;this.remove=void 0}}cancelImages(){this.imageElement.set("images",this.tempArray);this.imageElement.set("del",!0);this.cancelState();if(!1===this.addingcancel){this.adding=!this.adding}}}customElements.define(cmsArticleContent.is,cmsArticleContent);class cmsArticleListViewer extends PolymerElement{static get template(){return html`
    <style> 
    article {
        display: flex;
        flex-flow: wrap;
        box-sizing: border-box;
        text-align: center;
        margin-bottom: 10px;
        padding: 12px;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
      }

    nav div {
        flex-basis: 120px;
        flex-grow: 1;
        display: block;
      }
    
      div[bottom] {
        flex-basis: 30%; 
        word-break: break-word;
        margin-bottom: 75px;
        /*box-shadow: 2px 2px 4px #bab2b2;*/
        border-radius: 5px;
      }

   /* cms-article-content.zIndex {        
        z-index: 123 
    }*/
    shop-image{
        cursor: pointer;
        height: 81px; 
    }
    </style>
    <article>
        <dom-repeat items="[[content]]" as="art">
            <template>
                <div bottom>
                    <paper-button on-click="openArticleContent">
                        [[art.title]] 
                    </paper-button>
                    <shop-image src="[[returnImage(art.image)]]" alt="[[art.image]]" on-click="openArticleContent"></shop-image> 
                </div>
            </template>
        </dom-repeat>
    <slot></slot>
    </article>
        `}static get is(){return"cms-article-list-viewer"}static get properties(){return{content:{type:Array,notify:!0,value:function(){return[]}}}}ready(){super.ready()}log(data){console.log("log from cms-article-viewer",data)}returnImage(data){let damm=data;return"object"===typeof damm?damm[0]:damm}error(data){console.error("error from cms-article-viewer",data)}_getCatParents(cats){let arr=[];for(let i=0,parent;parent=cats[i].parent;i++){arr.push({name:parent});if(i===cats.length-1){return arr}}}openArticleContent(event){let elem=this.children[0];if(!1===elem.tada){elem.set("content",[this.content[event.model.__data.index]]);elem.set("add",!1);elem.set("article",this.content[event.model.__data.index]);elem.set("articleIndex",event.model.__data.index);elem.set("articleName",this.content[event.model.__data.index].categogy)}elem.set("tada",!elem.tada);elem.scrollIntoView()}}customElements.define(cmsArticleListViewer.is,cmsArticleListViewer);class cmsArticleListType extends PolymerElement{static get template(){return html`
    <style> 
    article {
        box-sizing: border-box;
        margin-bottom: 10px;
        padding: 12px;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
      }
      
      .diferent{
        display: none!important
      }

      nav paper-icon-button {
        flex-basis: 120px;
        color: rgb(128, 152, 173)
      }

    nav {
        color: #8098ad;
        display: flex;
        flex-flow: row;
        padding: 10px;
        padding-left: 21px;
      }
      
      nav div { 
        flex-basis: 239px;
      }
  
      nav[bottom] {
        width: auto:
        max-width: 1200px
      }

      nav[bottom] div {
        padding: 20px;
        flex-basis: unset;
        flex-grow: 1;
        height: auto;
        background: #ffffff;
      }
      
      div[left] {
        width: 119px;
      }

    .rightImages {
        display: flex;
        /*box-shadow: 3px 3px 8px #b6b6b6;*/
        padding: 24px;
        box-sizing: border-box;
      }
  
      cms-images.images {
        width: 800px;          
        height: 350px;
        background-color: inherit;
        --images-article-images: {          
            height: 300px!important;
        }
      } 

      cms-article-list-viewer {
        flex-grow: 1;
      }

      div[icons] {
        text-align: center
      }

      cms-article-content {
        max-width: 1200px;
    }

    </style>
  <article> 
    <nav>       
        <div>
            <span> {{article.parent}}
            <h4> {{_getArticleContentLength(article)}} articles </h4>
            </span>
        </div>
        <div icons>
            <paper-icon-button on-click="showPage" icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
            &
            <paper-icon-button on-click="showPage" icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
        </div>
        <div icons>
            <paper-icon-button on-click="addArticleContent" icon="av:playlist-add" aria-label="mode-edit">
            </paper-icon-button>
        </div>
        <div icons>
            <paper-icon-button on-click="delete" icon="av:not-interested" aria-label="mode-delete"></paper-icon-button>
        </div>
    </nav>
    <cms-article-content route="{{route}}" id="content" add="true" delete="false">
    </cms-article-content> 
    <nav bottom>    
        <cms-article-list-viewer id="viewer">
            <cms-article-content id="content" add="" delete="">
            <!-- images element lands here to :)-->
            </cms-article-content>
        </cms-article-list-viewer>
    </nav>
  </article>`}static get is(){return"cms-article-list-type"}static get properties(){return{DBW:{type:Object,value:function(){return new dataBaseworker},notify:!0},article:{type:Array,notify:!0},closed:{type:Boolean,notify:!0},categories:{type:Array,notify:!0,computed:"_getCatParents(article)"},types:{type:Array,notify:!0,value:["list","sub-category"]},image:{type:Object,notify:!0,observer:"sendImage"},sett:{type:Boolean,value:!1},confirm:{type:Boolean,notify:!0,value:!1},lastChosen:{type:Array,value:[]},scrollTo:{type:Number,observer:"scrollIt"}}}ready(){super.ready()}log(data){console.log("log from cms-article-viewer",data)}error(data){console.error("error from cms-article-viewer",data)}deSpin(){this.$.spinner.active=!this.$.spinner.active}openConfirm(event){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{})}_getCatParents(cats){let arr=[];return arr}getTitle(content){return content}addArticleContent(event){let elem=this.$.content;if(!1===elem.tada){elem.set("content",[{title:"",price:"",category:this.article.parent,type:this.article.type,brand:"",image:"",largeImage:"",description:""}]);elem.set("add",!0);elem.set("categories",this.categories);elem.set("article",this.article);elem.set("articleName",this.article.parent)}else{elem.set("content",[]);elem.set("categories","");elem.set("article","");elem.set("articleName","")}elem.set("tada",!elem.tada);this.setLastChosen(event.srcElement,!elem.tada)}scrollIt(data){scroll({top:this.scrollTo,behavior:"silent"});this.scrollTo=0}showPage(event,theother){let elem=this.$.viewer;if(0===elem.content.length){elem.content=this.article.content;this.setLastChosen(event.srcElement)}else{elem.content=[];this.setLastChosen(event.srcElement,!0)}}setLastChosen(elem,turnback){let arr=[];arr.push(elem);this.lastChosen=arr;if(!0!==turnback){elem.style.color="var(--google-blue-700)"}else{elem.style.color="rgb(128, 152, 173)"}}_getArticleContentLength(article){return article.content.length}}customElements.define(cmsArticleListType.is,cmsArticleListType);class cmsArticlesViewer extends PolymerElement{static get template(){return html`

    <style>
   main {
      display: block;
      word-break: break-all;
      padding: 4px;
      position: absolute;
      left: -42px;
      top: 140px;
      width: 100%;
    }
  
    article {
      box-sizing: border-box;
      margin-bottom: 10px;
      padding: 12px;
      max-width: 1200px;
      margin-left: auto;
      margin-right: auto;
    }
  
    nav {
      color: #8098ad;
      display: flex;
      flex-flow: row;
      padding: 10px;
      padding-left: 21px;
    }

    nav[top] {
      flex-flow: wrap;
      flex-direction: column;
      position: relative;
      top: 5px;
      margin-bottom: 60px;
      height: 34px;
      background-color: #dbdbdb;
      max-width: 1300px;
      border-radius: 4px;
    }

     div[top] {
      padding-left: 20px;
    }

    section {
      display: flex;
      flex-flow: row;
      font-weight: bold;
      padding: 4px;
      height: 50px;
      margin-left: auto;
      margin-right: auto;
    }
  
    section[title] {
      flex-basis: 34px;
      cursor: pointer;
      color: #f0f0f0;
      font-size: 35px;
      text-align: center;
      height: 52px;
      width: 120px;
      border-radius: 10px;
      background-color: #e1e2d8;
      text-shadow: 1px 1px 1px var(--primary-text-color);
    }
  
    section[title2] {
      flex-basis: 34px;
      cursor: pointer;
      color: #787676;
      font-size: 55px;
      text-align: center;
      height: 72px;
      width: 257px;
      border-radius: 10px;
      /* background-color: #e1e2d8; */
      text-shadow: 3px 3px 2px #ababab;
    }

    paper-icon-button-light {
      color: #929696;
      margin-left: 10px
    }
  
    paper-spinner {
      left: 47%;
    }

    paper-button {
      min-width: 98px;
    }

    .hidden {
        display: none!important
    }

    paper-tabs {
      font-size: 17px;
      font-weight: bold;
    }

    nav[center] {
      flex-flow: column;
    }

    .diferent {
      display: none;
    }
  </style>      
  <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
  </app-route>
  <main>
    <nav top>
      <app-toolbar typer>
          <paper-tabs no-bar >
            <paper-tab on-click="toggleLists">
                list page articles
            </paper-tab>
            <paper-tab on-click="toggleCats">
                sub category page articles
            </paper-tab>
          </paper-tabs>
      </app-toolbar> 
    </nav>
    <article>  
      <nav center id="typer" class="diferent">   
          <dom-repeat items="[[articles]]" as="article">
            <template>
              <cms-article-list-type route="{{route}}" article=[[article]]>
              </cms-article-list-type>
            </template>
          </dom-repeat>  
      </nav>
    </article>
    <article>
      <nav center id="subCats" class="diferent">  
        <dom-repeat items="[[cats]]" as="article">
          <template>
            <cms-artilce-sub-cat-type article=[[article]]>
            </cms-artilce-sub-cat-type>
          </template>
        </dom-repeat>   
      </nav>
    </article> 
  </main>   
`}static get is(){return"cms-articles-viewer"}static get properties(){return{DBW:{type:Object,value:function(){return new dataBaseworker},notify:!0},articles:{type:Array,notify:!0},setter:{type:String,notify:!0,observer:"resetCollor"},closed:{type:Boolean,notify:!0},image:{type:Object,notify:!0,observer:"sendImage"},sett:{type:Boolean,value:!1},confirm:{type:Boolean,notify:!0,value:!1},lastChosen:{type:Array,value:[]}}}ready(){super.ready();this._getArticles();scroll({top:0,behavior:"silent"})}log(data){console.log("log from cms-article-viewer",data)}error(data){console.error("error from cms-article-viewer",data)}_getArticles(){this.DBW.askAllArticles(data=>{this.articles=data;scroll({top:0,behavior:"silent"})})}resetCollor(data,element){if("newPage"===data){this.AskPages()}}toggleLists(){this.$.typer.classList.toggle("diferent")}toggleCats(){this.$.subCats.classList.toggle("diferent")}}customElements.define(cmsArticlesViewer.is,cmsArticlesViewer);