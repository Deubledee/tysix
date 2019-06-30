import{PolymerElement,html$1 as html,dataBaseworker,Debouncer,microTask}from"./cms-login.js";const __DEV=!0;class cmsPageListItem extends PolymerElement{static get template(){return html`
    <style>    
    :host {
        position: relative;
        display: block;
    } 
            /* styles reside in cms-content*/
    </style>        
    <slot name="table"></slot> 
        `}static get is(){return"cms-page-list-item"}static get properties(){return{DBW:{type:Object,value:function(){return new dataBaseworker},notify:!0},page:{type:Object,notify:!0,observer:"_putRow"}}}ready(){super.ready()}log(data){console.log("log from cms-article-viewer",data)}_putRow(data){let template=html`
        <article centerListItem slot="table">
            <div class="padding">

            </div>
            <div>
                <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
                    &
                <paper-icon-button  icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
            </div>  
            <div class="padding">
                
            </div>  
            <div>
                <paper-icon-button icon="av:not-interested" aria-label="mode-delete"></paper-icon-button>        
            </div>
        </article>`;template.content.children[0].children[0].innerHTML=`
            <span> 
                ${this._getPagename(data)}
            </span>`;template.content.children[0].children[2].innerHTML+=`
                <span class="${this._getPublished(data)}"> 
                   <paper-button> ${this._getPublished(data)} </paper-button>
                </span>`;let clone=document.importNode(template.content,!0);this.append(clone);this.children[0].children[1].children[0].addEventListener("click",this.showPage.bind(this));this.children[0].children[1].children[1].addEventListener("click",this.showPage.bind(this));this.children[0].children[2].children[0].addEventListener("click",this._confirmPublish.bind(this));this.children[0].children[3].children[0].addEventListener("click",this._openConfirm.bind(this))}_getPagename(cats){return cats.title}_getPublished(cats){return cats.published}error(data){console.error("error from cms-article-viewer",data)}deSpin(){this.$.spinner.active=!this.$.spinner.active}_encodeBase64Url(str){return str.replace(/\+/g,"-").replace(/\//g,"_").replace(/\=+$/,"")}showPage(){let string=window.btoa(`${JSON.stringify(this.page)}`);window.history.pushState({},null,`content/pages/edit-category-pages?content=${string}&add=false`);window.dispatchEvent(new CustomEvent("location-changed"))}close(){let content=this.parentElement.firstElementChild;this.parentElement.showContent();content.set("tada",!0);content.set("content",[])}delete(data){let page=data;this.DBW.deletePage((msg,done)=>{if("error"!==msg){this.openConfirm();this.log(msg)}else{this.error(msg)}},page,__DEV)}_openConfirm(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this._getPagename(this.page),method:this.delete.bind(this)}}))})}_confirmPublish(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this._getPagename(this.page),method:this.delete.bind(this),type:"publish"}}))})}resetCollor(data){if("newPage"===data){this.AskPages();this.lastChosen.pop()}}setLastChosen(elem,bool){let arr=[];if("var(--google-blue-700)"===elem.style.color||"rgb(140, 174, 247)"===elem.style.color){elem.style.color=!0===bool?"#f0f0f0":"rgb(128, 152, 173)";this.lastChosen.pop()}else{elem.style.color=!0===bool?"rgb(140, 174, 247)":"var(--google-blue-700)";arr.push(elem);this.lastChosen=arr}}}customElements.define(cmsPageListItem.is,cmsPageListItem);const __DEV$1=!0,_DBW=new dataBaseworker,_STYLES=_DBW.getElementAssets("cms-page-list-type",__DEV$1);class cmsPageListType extends PolymerElement{static get template(){return html`<style include="cms-comon-style_v3">
            :host {
                position: var(--app-default-position);
                display: var(--app-block)
            }
        </style>
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}"
            active="{{active}}">
        </app-route>
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="reset" href="[[rootPath]]content/">
            </a>
        </iron-selector>
        <main class="flex">
            <div class="navbottom">
                <nav top>
                    <app-toolbar typer>
                        <paper-tabs no-bar>
                            <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                                <a href="[[rootPath]]content/pages/add-category-pages?content=eyJhdXRob3IiOiIiLCJjYXRlZ29yeUNvdW50IjowLCJkYXRlQ3JlYXRlZCI6IiIsImRhdGVQdWJsaXNoZWQiOiIiLCJpbWFnZSI6W3siYXV0aG9yIjoiIiwiZGF0ZUFkZGVkIjoiIiwiZ2FsbGVyeSI6IiIsInRpdGxlIjoiIiwidXJsIjoiIn1dLCJsYW5nIjoicHQiLCJsYXN0TW9kaWZpZWQiOltdLCJuYW1lIjoiIiwicGxhY2Vob2xkZXIiOiIiLCJwdWJsaXNoZWQiOmZhbHNlLCJzdWJDYXRlZ29yeUNvdW50IjowLCJ0aXRsZSI6IiIsInR5cGUiOiJsaXN0IiwidWlkIjoiIn0=&add=true">
                                <paper-tab name=" add-category-pages">
                                    [[categorypages]]
                                    <paper-icon-button-light>
                                        <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                                    </paper-icon-button-light>
                                    </paper-tab>
                                </a>
                            </iron-selector>
                        </paper-tabs>
                    </app-toolbar>
                </nav>
                <div bottom>
                    <section class="flexchildbotom">
                        <div class="flexleft">
                            <h3> [[title]] </h3>
                        </div>
                    </section>                        
                        
                    <section class="flexchildbotom">
                        <div class="flexleft">
                            <h3> [[viewedit]] </h3>
                        </div>
                    </section>                        
                    <section class="flexchildbotom">
                        <div class="flexleft">
                            <h3> [[published]] </h3>
                        </div>
                    </section>                        
                    <section class="flexchildbotom">
                        <div class="flexleft">
                            <h3> [[delete]] </h3>
                        </div>
                    </section>
                </div>
                <div table>
                    <dom-repeat items="[[pages]]" as="page">
                        <template strip-whitespace>
                            [[putElement(index, page)]]
                            <slot name="item[[index]]"></slot>
                        </template>
                    </dom-repeat>
                </div>
                <div content id="content">
                    <slot name="content"></slot>
                </div>
            </div>
            <nav class="navside">
                <dom-repeat repeat items="[[info]]" as="detail">
                    <template>
                        <div class="flexsidecenter">
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
                                [[Published]]
                                </span>
                            </aside>
                            <aside>
                                <span>
                                [[categorypages]]
                                </span>
                            </aside>
                        </div>
                        <div rightSide>                            
                            <dom-repeat repeat items="[[detail.published]]" as="published">
                                <template>
                                    <section>
                                        <aside>
                                            <span>
                                                [[published.page]]
                                            </span>
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
            </nav>
        </main> 
        `}static get is(){return"cms-page-list-type"}static get properties(){return{DBW:{type:Object,value:function(){return new dataBaseworker},notify:!0},lang:{type:String,observer:"__changeLang"},langs:{type:Object,value:{}},pages:{type:Array,notify:!0},info:{type:Array,notify:!0},categorie:{type:Object,notify:!0},image:{type:Object,notify:!0,observer:"sendImage"},setter:{type:String,notify:!0,observer:"resetCollor"},closed:{type:Boolean,notify:!0},confirm:{type:Boolean,notify:!0,value:!1},setImage:{type:Object}}}_contentChanged(){this._debounceEvent=Debouncer.debounce(this._debounceEvent,microTask,()=>{window.dispatchEvent(new CustomEvent("reset-list-type-content",{bubbles:!0,composed:!0,detail:"categorypages"}))});if(this.parentElement){this.parentElement.removeChild(this)}console.log("data")}ready(){super.ready();_STYLES.then(querySnapshot=>{let style=querySnapshot.data();this._setLangObject(style)}).catch(function(error){console.error("Error reteaving assets: ",error)});this._askPages();window.addEventListener("reset-list-type",this._contentChanged.bind(this))}__changeStyle(style){this.shadowRoot.firstElementChild.innerText+=style}__changeLang(){if(this.langs[this.lang]){let obj=this.langs[this.lang];for(let par in obj){this.set(par,obj[par])}}}_setLangObject(langs){for(let par in langs){if("styles"!==par){this.langs[par]=langs[par].pop()}}this.__changeLang()}sendImage(data){console.log(data)}_cancelImage(){this.image={}}showContent(){if("block"!==this.$.content.style.display){this.$.content.style.display="block"}else{this.$.content.style.display="none"}}_askPages(){this.DBW.askAllPages(done=>{this._setAll(done)},__DEV$1)}_setAll(data){let arr=[],arr2=[];this.set("info",arr);this.pages="";for(let i=0;i<data.length;i++){if("categoryCount"in data[i]){arr.push(data[i])}else{arr2.push(data[i])}}this.set("info",arr);this.set("pages",arr2)}putElement(index,page){let template=html`
        <cms-page-list-item>
        </cms-page-list-item>`;var clone=document.importNode(template.content,!0);this.appendChild(clone);this.children[index].setAttribute("slot",`item${index}`);this.children[index].set("page",page)}deSpin(data){if(!0===this.$.spinner.active){this.$.spinner.active=!1}}}customElements.define(cmsPageListType.is,cmsPageListType);