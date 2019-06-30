define(["exports","../cms-login.js"],function(_exports,_cmsLogin){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0});_exports.cmsArticleItem=_exports.$cmsArticleItem=void 0;class cmsArticleItem extends _cmsLogin.cmsItemTemplate{static get _getStyles(){return _cmsLogin.html`
        <style include="cms-comon-style_v3">    
        :host {
            position: relative;
            display: block;
        } 
        shop-image{
            top: 1px; 
        }
        </style> `}static get _getElement(){return _cmsLogin.html`
        <dom-repeat repeat items="[[content]]" as="item">
            <template>                
                <article centerlistitem>
                    <div>
                        <shop-image class="bigger" title="[[item.title]]" aria-label="image" src="[[_getImage()]]"
                            alt="[[item.title]]">
                        </shop-image>
                    </div>
                    <div title="[[item.title]]">
                        <paper-button title="[[item.title]]">
                            [[item.title]]
                        </paper-button>
                    </div>
                    <div>
                        <paper-button on-click="_showPage">
                            <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
                            <paper-icon-button icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                        </paper-button>
                    </div>
                    <div class="paddingSmall" title="[[item.stock]]">
                        <h3 title="[[item.stock]]">
                            [[item.stock]]
                        </h3>
                    </div>
                    <div title="[[item.page]]">
                        <paper-button title="[[item.page]]">
                            [[item.type]]
                        </paper-button>
                    </div>
                    <div published$="[[_getPublished()]]" title="[[_getPublished()]]" on-click="_confirmPublish">
                        <paper-button title="[[_getPublished()]]">
                            [[_getPublished()]]
                        </paper-button>
                    </div>
                    <div>
                        <paper-button on-click="_openConfirm">
                            <paper-icon-button icon="av:not-interested" aria-label="delete">
                            </paper-icon-button>
                        </paper-button>
                    </div>
                
                </article>
            </template>                            
        </dom-repeat>
        `}static get is(){return"cms-article-item"}static get properties(){return{article:{type:Object,notify:!0,observer:"_putRow"},published:{type:String,reflectToAttribute:!0},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},papgePath:{type:String,value:"edit-articles"}}}ready(){super.ready()}_putRow(item){if(item.image){this.set("content",item.items);this.set("images",item.image);this.set("info",item.info)}}_showPage(){let string=window.btoa(`${JSON.stringify(this.article)}`);window.history.pushState({},null,`${this.rootPath}content/articles/edit-articles?content=${string}&add=false`);window.dispatchEvent(new CustomEvent("location-changed"))}_getParameter(item){return item}_getImage(){return this.images[0].url}_getPublished(){return this.info[0].published}_openConfirm(event){let index=event.srcElement.parentElement.getAttribute("value");this._changeSectionDebouncer=_cmsLogin.Debouncer.debounce(this._changeSectionDebouncer,_cmsLogin.microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.content[index].name,method:this._deleteImg.bind(this),argument:index,headderMsgKind:"delete",type:"article"}}))})}_confirmPublish(event){let index=event.srcElement.parentElement.getAttribute("value");this._changeSectionDebouncer=_cmsLogin.Debouncer.debounce(this._changeSectionDebouncer,_cmsLogin.microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.content[index].name,method:this.__publish.bind(this),argument:index,headderMsgKind:"publish",type:"article"}}))})}__delete(data){let page=data;this.translator._DBW.deletePage(msg=>{if("error"!==msg){this.log(msg)}else{this.error(msg)}},page,this.translator.__DEV)}__publish(){console.log("!!to be done!!")}}_exports.cmsArticleItem=cmsArticleItem;customElements.define(cmsArticleItem.is,cmsArticleItem);var cmsArticleItem$1={cmsArticleItem:cmsArticleItem};_exports.$cmsArticleItem=cmsArticleItem$1;const Consts=new _cmsLogin.Setter;Consts.assets=Consts.getAssets("cms-articles");class cmsArticle extends _cmsLogin.cmsItemImageTemplate{static get _getStyles(){return _cmsLogin.html`        
        div[arow]{
            font-size: var(--app-images-article-font-size);
            height: 41px;
            padding-top: unset;
        }
        div[arow] h4{
            margin-block-start: 8px;
        }
        `}static get _getMenu(){return _cmsLogin.html`                           
            <section class="flexchildbotom noFlex">
                <div class="center">   
                    <h4 title="[[item]]">  [[item]]   </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="center">   
                    <h4 title="[[title]]"> 
                    [[title]]    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="center">
                    <h4 title="[[viewedit]]"> [[viewedit]] </h4>
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="center">   
                    <h4 title="[[stock]]"> 
                    [[stock]]    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="center">  
                    <h4 title="[[type]]"> 
                    [[type]]     </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="center">  
                    <h4 title="[[published]]"> 
                    [[published]] </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="center">  
                    <h4 title="[[delete]]"> 
                    [[delete]]      </h4>     
                </div>  
            </section>`}static get _getItem(){return _cmsLogin.html` 
        <dom-repeat repeat items="[[content]]" as="item">
            <template>
                <cms-article-item article="[[item]]">
                </cms-article-item>
            </template>                            
        </dom-repeat>`}static get is(){return"cms-article"}static get properties(){return{lang:{type:String,notify:!0//observer: '__changeLang'
},langs:{type:Object,value:{}},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},article:{type:Array,notify:!0},content:{type:Array,notify:!0,computed:"_getArticle(article)"}}}ready(){super.ready();this.translator.target("cms-articles","setLangObject",this._setLObj.bind(this));this.translator.target("cms-articles","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-articles","setLangObject")}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}__publish(data){console.log(data)}_deleteImg(data){console.log(data)}_getArticle(data){return[data]}}customElements.define(cmsArticle.is,cmsArticle);class cmsArticleView extends _cmsLogin.cmsMiddlePageTemplate{static get _getShoutAnchor(){return _cmsLogin.html`        
            <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
                <a id="reset" href="[[rootPath]]content/articles">
                    <paper-icon-button  icon="arrow-back" aria-label="Go back">
                    </paper-icon-button>
                </a>
            </iron-selector>`}static get _getSilentAnchor(){return _cmsLogin.html`
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a href="[[rootPath]][[url]]">
                <paper-tab name=" add-category-pages">
                    <span class="spanpadding"> 
                    [[ADD]] [[articles]] 
                    </span>
                    <paper-icon-button-light>
                        <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                    </paper-icon-button-light>
                </paper-tab>
            </a>
        </iron-selector>
        `}static get _getTable(){return _cmsLogin.html`
        <div table> 
            <dom-repeat items="[[contents]]" as="item">
                <template>
                    <cms-article article="[[item]]" route="[[routeData]]" lang="[[lang]]">
                    </cms-article>
                </template>
            </dom-repeat>
        </div>    `}static get _getNavside(){return _cmsLogin.html`
        <dom-repeat repeat items="[[info]]" as="detail">
            <template>
                <div class="center-menu">
                    <aside>
                        <span>
                            [[Info]]
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
                    <aside>
                        <span>
                        [[Category]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                        [[articlecount]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                        [[Type]]
                        </span>
                    </aside>
                </div>
                <div class="center-menu">
                    <aside class="asideBackgrc">
                        <span>
                        <b> [[detail.id]]</b>
                        </span>
                    </aside>
                    <aside class="asideBackgrc">
                        <span>
                        <b> [[detail.items]]</b>
                        </span>
                    </aside>
                    <aside class="asideBackgrc">
                        <span>
                        <b> [[detail.type]]</b>
                        </span>
                    </aside>
                </div>
                <div class="collumn-left-menu">
                    <aside>
                        <span>
                        [[Published]]
                        </span>
                    </aside>
                </div>
                <div class="collumn-left-menu">
                    <aside class="asideBackgrc">
                        <span>
                        <b> [[detail.publishedCount]] </b>
                        </span>
                    </aside>
                </div>
                <div rightSide>                            
                    <dom-repeat repeat items="[[detail.published]]" as="published">
                        <template>
                            <section>
                                <aside>
                                    <span>
                                        [[published.article]]
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
        `}static get is(){return"cms-article-view"}static get properties(){return{lang:{type:String,notify:!0,observer:"__changeLang"},langs:{type:Object,value:{}},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},route:{type:Object,notify:!0},user:{type:Object,notify:!0},contents:{type:Array,notify:!0,value:[],observer:"_killSpinner"},hidebottom:{type:Boolean,value:!0,reflectToAttribute:!0},url:{type:String,notify:!0},obj:{type:Object,notify:!0,value:{contentText:[{description:""}],image:[],info:[{author:"",dateAdded:"",publishedBy:[{author:"",date:"",uid:""}],unPublishedBy:[{author:"",date:"",uid:""}]}],items:[{brand:"",category:"",lang:"",price:"",stock:"",title:"",type:""}]}}}}static get observers(){return["_routePageChanged(routeData, query, active)"]}ready(){super.ready();this.translator.target("cms-article-view","setLangObject",this._setLObj.bind(this));this.translator.target("cms-article-view","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-article-view","setLangObject");this.$.reset.addEventListener("click",this._removeInnerHTML.bind(this));window.addEventListener("reset",this._removeInnerHTML.bind(this))}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(routeData,query,active){if(!0===!!active&&!0===!!routeData.page&&"view-articles"===routeData.page){if("content"in query){this._setContent(query.content,query);console.log}}}_setContent(cont,query){let content=JSON.parse(atob(cont)),info;info=content.info;content=content.content;if(!0===content instanceof Array){this.obj.items[0].type=query.type;this.obj.items[0].category=query.category;this.obj.info[0].author=this.user.displayName;let obj=btoa(JSON.stringify(this.obj));this.url=`content/articles/add-articles?content=${obj}&add=true`;this.set("contents",[]);this.set("contents",content);this.set("info",[]);this.set("info",info)}this.set("add","true"===query.add);this.slashed=!1}_killSpinner(data){if(0<data.length&&0<this.childElementCount&&"spinner"===this.children[0].getAttribute("slot")){this.removeChild(this.children[0])}}_removeInnerHTML(){this.set("contents",[]);this.set("info",[]);this.set("add",!1);this.slashed=!0;window.onbeforeunload=function(){}}}customElements.define(cmsArticleView.is,cmsArticleView)});