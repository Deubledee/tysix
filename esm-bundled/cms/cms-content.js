define(["require","../src/cms-login.js"],function(_require,_cmsLogin){"use strict";_require=babelHelpers.interopRequireWildcard(_require);class cmsContent extends _cmsLogin.cmsTopPageTemplate{static get topTitle(){return _cmsLogin.html`
      <a href="[[_getStr(page)]][[_queryContent(index, page)]]">  
          <paper-button  aria-label="Go back page">                   
          [[_getPage(page)]]
          </paper-button>               
      </a>     
  `}static get is(){return"cms-content"}static get properties(){return{user:{type:Object,notify:!0/* ignoreName */ /* skipSlots */},page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},lang:{type:String,notify:!0,observer:"__changeLang"},langs:{type:Object,value:{}},breadcrumbs:{type:Array,notify:!0,value:[]}}}static get observers(){return["_routePageChanged(route, routeData.page , query)"]}ready(){super.ready();this.translator.target("cms-content","setLangObject",this._setLObj.bind(this));this.translator.target("cms-content","changeLang",this._setLang.bind(this),/* ignoreName */!1/* skipSlots */ /* skipSlots */);this.translator.shoot("cms-content","setLangObject")}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this);this.set("breadcrumbs",[]);if(0<this.breadcrumbs.length){this.setBreadcrumbs(this.route,this.routeData)}}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this);this.setBreadcrumbs(this.route,this.routeData)}_routePageChanged(route,page,query){if(!!route)if("/content"===route.prefix){if(0<this.breadcrumbs.length){this.setBreadcrumbs(this.route,this.routeData)}if(!!page){if(-1!==["articles","pages"].indexOf(page)){this.page=page}}if("/"===route.path)if(!!query.reset){this.query={};window.history.pushState({},null,`${this.rootPath}content/`);window.dispatchEvent(new CustomEvent("location-changed"))}}}setBreadcrumbs(route,routeData){this.set("breadcrumbs",[]);if("number"===typeof this.time)clearTimeout(this.time);this.time=setTimeout(()=>{if(!routeData.page){let arr2=[];this.page="home";arr2.push("cmshome");this.set("breadcrumbs",arr2)}if(!!routeData&&!!routeData.page){if(-1!==["articles","pages","search"].indexOf(routeData.page)){let arr2=["cmshome"];this.set("breadcrumbs",arr2)}if(-1!==["/pages/edit-category-pages","/pages/add-category-pages","/pages/subcategory-pages"].indexOf(route.path)){let arr2=["cmshome","/content/pages"];this.set("breadcrumbs",arr2)}if(-1!==["/pages/edit-subcategory-pages","/pages/add-subcategory-pages"].indexOf(route.path)){let arr2=["cmshome","/content/pages","/content/pages/subcategory-pages"];this.set("breadcrumbs",arr2)}if(-1!==["/articles/edit-article","/articles/add-article"].indexOf(route.path)){let arr2=["cmshome","/content/articles"];this.set("breadcrumbs",arr2)}}},120)}_getStr(item){let str="";str="/content"===item?`${item}/`:`${item}`;return str}_queryContent(index){if(1<index)return`?content=${this.query.content}&reset=false&update=${this.query.content}`}_getPage(item){let word,final;if("cmshome"===item){word=item.split("");word[0]=word[0].toUpperCase();word=word.join("");this.translator.changeItemTitleLang.call(this,word.toString(),"word")}else{word=item.split("/");word.shift();word=word.pop();word=word.split("");word[0]=word[0].toUpperCase();word=word.join("");final="Subcategory-pages"===word?"SubcategoryPages":word;this.translator.changeItemTitleLang.call(this,final.toString(),"word");/**/}return this.word}_pageChanged(page){if(page!==void 0){if("pages"===page){new Promise((res,rej)=>_require.default(["./pages/cms-page-viewer.js"],res,rej)).then(bundle=>bundle&&bundle.$cmsPageViewer||{});return}if("articles"===page){new Promise((res,rej)=>_require.default(["./articles/cms-article-view.js"],res,rej)).then(bundle=>bundle&&bundle.$cmsArticleView||{});return}if("view404"===page){new Promise((res,rej)=>_require.default(["./cms-404-warning.js"],res,rej)).then(bundle=>bundle&&bundle.$cms$404Warning||{});return}}}}customElements.define(cmsContent.is,cmsContent)});