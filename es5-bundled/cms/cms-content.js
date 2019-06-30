define(["require","./cms-login.js"],function(_require,_cmsLogin){"use strict";_require=babelHelpers.interopRequireWildcard(_require);var cmsContent=/*#__PURE__*/function(_cmsTopPageTemplate){babelHelpers.inherits(cmsContent,_cmsTopPageTemplate);function cmsContent(){babelHelpers.classCallCheck(this,cmsContent);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsContent).apply(this,arguments))}babelHelpers.createClass(cmsContent,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsContent.prototype),"ready",this).call(this);this.translator.target("cms-content","setLangObject",this._setLObj.bind(this));this.translator.target("cms-content","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-content","setLangObject")}},{key:"_setLObj",value:function _setLObj(res,querySnapshot){if("data"in querySnapshot){var langs=querySnapshot.data();res.call(this,langs)}}},{key:"_setLang",value:function _setLang(res,lang){this.lang=lang;res.call(this)}},{key:"__changeLang",value:function __changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}},{key:"_routePageChanged",value:function _routePageChanged(page,query,route){if("/content"===this.route.prefix){if(page!==void 0&&"page"in page){if(-1!==["articles","pages","search"].indexOf(page.page)){this.page=page.page}else{console.log("view404",page,query)}}else{this.page="search"}}}},{key:"_pageChanged",value:function _pageChanged(page){if(page!==void 0){if("pages"===page){new Promise(function(res,rej){return _require.default(["./pages/cms-page-viewer.js"],res,rej)}).then(function(bundle){return bundle&&bundle.$cmsPageViewer||{}}).then(function(module){return}).catch(function(error){console.log(error)});return}if("articles"===page){new Promise(function(res,rej){return _require.default(["./articles/cms-articles-viewer.js"],res,rej)}).then(function(bundle){return bundle&&bundle.$cmsArticlesViewer||{}});return}if("view404"===page){new Promise(function(res,rej){return _require.default(["./cms-404-warning.js"],res,rej)}).then(function(bundle){return bundle&&bundle.$cms$404Warning||{}});return}}}}],[{key:"is",get:function get(){return"cms-content"}},{key:"properties",get:function get(){return{user:{type:Object,notify:!0},page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"},translator:{type:Object,notify:!0,value:function value(){return MyAppGlobals.translator}},lang:{type:String,notify:!0,observer:"__changeLang"},langs:{type:Object,value:{}},search:{type:Boolean,computed:"_checkMyName(page, \"search\")"},pages:{type:Boolean,computed:"_checkMyName(page, \"pages\")"},articles:{type:Boolean,computed:"_checkMyName(page, \"articles\")"}}}},{key:"observers",get:function get(){return["_routePageChanged(routeData, query, route)"]}}]);return cmsContent}(_cmsLogin.cmsTopPageTemplate);customElements.define(cmsContent.is,cmsContent)});