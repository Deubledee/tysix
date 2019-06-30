import{cmsItemTemplate,html,Debouncer,microTask,cmsMiddlePageTemplate}from"../cms-login.js";class cmsPageListItem extends cmsItemTemplate{static get template(){return html`
    <style>    
    :host {
        position: relative;
        display: block;
    } 
            /* styles reside in cms-content*/
    </style>        
    <slot name="table"></slot> 
        `}static get is(){return"cms-page-list-item"}static get properties(){return{translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}}}}ready(){super.ready()}_putRow(data){this.translator.template.innerHTML=`
           <article centerListItem slot="table">
               <div>   
                <span> 
                   <paper-button> ${data.items[0].categoryName}</paper-button>
                </span>
               </div>
               <div>
                   <paper-button>
                       <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>                   
                       <paper-icon-button  icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                   </paper-button> 
               </div>  
               <div>                   
                <span> 
                    <paper-button> ${data.items[0].type} </paper-button>
                </span>
               </div>   
               <div class="${data.info[0].published}">
                   
                <span> 
                    <paper-button> ${data.info[0].published} </paper-button>
                </span>
               </div>   
               <div>
                   <paper-icon-button icon="av:not-interested" aria-label="mode-delete"></paper-icon-button> 
                </div>
           </article>`;this.translator.clone(this);this.children[0].children[1].children[0].addEventListener("click",this.showPage.bind(this));this.children[0].children[3].children[0].addEventListener("click",this._confirmPublish.bind(this));this.children[0].children[4].children[0].addEventListener("click",this._openConfirm.bind(this))}_getPagename(cats){return cats}error(data){console.error("error from cms-article-viewer",data)}deSpin(){this.$.spinner.active=!this.$.spinner.active}showPage(){let string=window.btoa(`${JSON.stringify(this.page)}`);window.history.pushState({},null,`content/pages/edit-category-pages?content=${string}&add=false`);window.dispatchEvent(new CustomEvent("location-changed"))}__delete(data){this.translator._DBW.deletePage(msg=>{if("error"!==msg){console.log(msg);this.__reset()}else{console.error(msg)}},data,this.translator.__DEV)}__publish(data){console.log(data)}_openConfirm(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.page.items[0].categoryName,method:this.__delete.bind(this),argument:this.page.id,headderMsgKind:"delete",type:"categoryPage"}}))})}_confirmPublish(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.page.name,method:this.__publish.bind(this),argument:"!!to be done!!",headderMsgKind:"publish",type:"categoryPage"}}))})}__reset(){this._debounceEvent=Debouncer.debounce(this._debounceEvent,microTask,()=>{window.dispatchEvent(new CustomEvent("reset-list-type",{bubbles:!0,composed:!0}))})}}customElements.define(cmsPageListItem.is,cmsPageListItem);class cmsPageListType extends cmsMiddlePageTemplate{static get _getShoutAnchor(){return html`
        <a href="[[rootPath]]content/pages/add-category-pages?content=eyJjb250ZW50VGV4dCI6W3siZGVzY3JpcHRpb24iOiIifV0sImltYWdlIjpbXSwiaW5mbyI6W3siYXV0aG9yIjoiIiwiZGF0ZUFkZGVkIjoiIiwicHVibGlzaGVkQnkiOlt7ImF1dGhvciI6IiIsImRhdGUiOiIiLCJ1aWQiOiIifV0sInVuUHVibGlzaGVkQnkiOlt7ImF1dGhvciI6IiIsImRhdGUiOiIiLCJ1aWQiOiIifV0sImxhc3RNb2RpZmllZCI6W10sImRhdGVQdWJsaXNoZWQiOiJOUCIsInB1Ymxpc2hlZCI6Ik5QIn1dLCJpdGVtcyI6W3siY2F0ZWdvcnlOYW1lIjoiIiwidHlwZSI6IiIsImxhbmciOiIifV0sInN1YkNhdGVnb3JpZXMiOltdfQ==&add=true">
            <paper-tab name=" add-category-pages">
            [[ADD]] [[categorypages]]
                <paper-icon-button-light>
                    <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                </paper-icon-button-light>
            </paper-tab>
        </a>
        `}static get is(){return"cms-page-list-type"}static get properties(){return{lang:{type:String,observer:"__changeLang"},langs:{type:Object,value:{}},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals.translator}},spinOut:{type:Boolean,value:!1}}}ready(){super.ready();this.translator.template.innerHTML=`<paper-spinner-lite active="false" slot="spinner">
        </paper-spinner-lite>`;this.translator.clone(this);this.translator.target("cms-page-list-type","setLangObject",this._setLObj.bind(this));this.translator.target("cms-page-list-type","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-page-list-type","setLangObject");this._askPages();window.addEventListener("reset-list-type",this._contentChanged.bind(this))}_setLang(res,lang){this.lang=lang;res.call(this)}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_contentChanged(){this.innerHTML="";this._askPages()}_askPages(){this.translator._DBW.getAllPages(done=>{this._setAll(done)},this.translator.__DEV)}_setAll(data){let arr=[],arr2=[];this.set("inForm",arr);this.pages="";for(let i=0;i<data.length;i++){if("categoryCount"in data[i]){arr.push(data[i])}else{arr2.push(data[i])}}this.set("inForm",arr);this.set("pages",arr2);if(!1===this.spinOut){this.removeChild(this.children[0]);this.spinOut=!0}}putElement(index,page){let template=html`
        <cms-page-list-item>
        </cms-page-list-item>`;var clone=document.importNode(template.content,!0);this.appendChild(clone);this.children[index].setAttribute("slot",`item${index}`);this.children[index].set("page",page)}deSpin(data){if(!0===this.$.spinner.active){this.$.spinner.active=!1}}}customElements.define(cmsPageListType.is,cmsPageListType);