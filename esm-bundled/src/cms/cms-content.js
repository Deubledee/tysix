import{cmsTopPageTemplate,dataBaseworker,scroll}from"./cms-login.js";const __DEV=!0,_DBW=new dataBaseworker,_STYLES=_DBW.getElementAssets("cms-content",!0);class cmsContent extends cmsTopPageTemplate{static get is(){return"cms-content"}static get properties(){return{user:{type:Object,notify:!0},page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"},lang:{type:String,notify:!0,observer:"__changeLang"},langs:{type:Object,value:{}},search:{type:Boolean,computed:"_checkMyName(page, \"search\")"},pages:{type:Boolean,computed:"_checkMyName(page, \"pages\")"},articles:{type:Boolean,computed:"_checkMyName(page, \"articles\")"}}}static get observers(){return["_routePageChanged(routeData, query)"]}ready(){super.ready();_STYLES.then(querySnapshot=>{let style=querySnapshot.data();this._setLangObject(style)}).catch(function(error){console.error("Error reteaving assets: ",error)});this._routePageChanged(this.routeData,0);scroll({top:0,behavior:"silent"})}__changeLang(){try{if(this.langs[this.lang]){let obj=this.langs[this.lang];for(let par in obj){if(!0===!!this[par]){console.log(this[par],this.langs[this.lang][par],this[par]===this.langs[this.lang][par]);setTimeout(()=>{this.set(par,obj[par])},60)}else{setTimeout(()=>{this.set(par,"");this.set(par,obj[par])},60)}}}}catch(err){console.error(err)}}_setLangObject(langs){try{for(let par in langs){if("styles"!==par){this.langs[par]=langs[par].pop()}}this.__changeLang()}catch(err){console.error(err)}}_routePageChanged(page,query){if("/content"===this.route.prefix){if(page!==void 0&&"page"in page){if(-1!==["articles","pages","search"].indexOf(page.page)){this.page=page.page}else{console.log("view404",page,query)}}else{this.page="search"}}}_pageChanged(page){if(page!==void 0){if("pages"===page){import("./cms-page-viewer.js").then(bundle=>bundle&&bundle.$cmsPageViewer||{}).then(module=>{return}).catch(error=>{console.log(error)});return}if("articles"===page){import("./cms-articles-viewer.js").then(bundle=>bundle&&bundle.$cmsArticlesViewer||{});return}if("view404"===page){import("../shop-404-warning.js").then(bundle=>bundle&&bundle.$shop$404Warning||{});return}}}}customElements.define(cmsContent.is,cmsContent);