import{PolymerElement,html$1 as html,scroll}from"./cms-login.js";class cmsPageViewer extends PolymerElement{static get template(){return html`
    <style>
        :host {
          position: relative;
        }

    
        main {
          background-color: #fff;
          word-break: break-all;
          position: relative;
        }
      
        article {
          max-width: 1890px;
          min-width: 730px;
          color: #5487b6;
          padding-left: 21px;
          padding-right: 18px;
        }

        #reset {
          display: none;
        }
    </style>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" autoActivate>
    </app-route>
    <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
        <a id="reset" href="[[rootPath]]content/pages/">
            <paper-icon-button icon="arrow-back" aria-label="Go back">
            </paper-icon-button>
        </a>
    </iron-selector>
    <main id="main">
      <iron-pages selected="[[page]]" attr-for-selected="name"> 
          <article name="add-category-pages">  
            <slot name="add"></slot>  
          </article>

          <article name="home"+>           
            <slot name="categories">
            </slot>

            <slot name="suCategories">
            </slot>
          </article>

      </iron-pages>  
    </main>  

      `}static get is(){return"cms-page-viewer"}static get properties(){return{lang:{type:String,notify:!0},page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"},active:{type:String,value:""},pages:{type:Array,notify:!0},lastChosen:{type:Array,value:[]}}}static get observers(){return["_routePageChanged(routeData, query)"]}ready(){super.ready();this._routePageChanged(this.routeData);scroll({top:0,behavior:"silent"});window.addEventListener("reset-list-type-content",this.__reset.bind(this))}log(event){console.log("log from cms-page-viewer",event)}error(data){console.error("error from cms-page-viewer",data)}__reset(event){if(-1!==["categorypages"].indexOf(event.detail)){let template=html`<cms-page-list-type slot="categories">
                          </cms-page-list-type>`,clone=document.importNode(template.content,!0);clone.route=this.route;clone.lang=this.lang;if(5>this.childElementCount){this.appendChild(clone);this.$.reset.click()}}}_routePageChanged(page){if(page!==void 0&&"page"in page){if(!page.page){this.page="home"}else if(-1!==["add-category-pages","edit-category-pages"].indexOf(page.page)){this.page="add-category-pages"}else{console.log(page.page);this.page="view404"}}else if(!0===page instanceof Object){this.page="home"}}_pageChanged(page){if(page!==void 0){if("home"===page){import("./cms-page-list-type.js").then(bundle=>bundle&&bundle.$cmsPageListType||{}).then(item=>{});return}if("add-category-pages"===page){import("./cms-page-list-type-content.js").then(bundle=>bundle&&bundle.$cmsPageListTypeContent||{}).then(item=>{});return}if("view404"===page){import("../shop-404-warning.js").then(bundle=>bundle&&bundle.$shop$404Warning||{});return}}}setLastChosen(elem,bool){let arr=[];if("var(--google-blue-700)"===elem.style.color||"rgb(140, 174, 247)"===elem.style.color){elem.style.color=!0===bool?"#f0f0f0":"rgb(128, 152, 173)";this.lastChosen.pop()}else{elem.style.color=!0===bool?"rgb(140, 174, 247)":"var(--google-blue-700)";arr.push(elem);this.lastChosen=arr}}showName(cats,name){return cats[name]}}customElements.define(cmsPageViewer.is,cmsPageViewer);