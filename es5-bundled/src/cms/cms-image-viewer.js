define(["./cms-login.js"],function(_cmsLogin){"use strict";function _templateObject3_e560ecd045c111e9bac3d12cb7c88f95(){var data=babelHelpers.taggedTemplateLiteral(["\n      <article name=\"images\" route=\"[[subroute]]\" lang=\"[[lang]]\">         \n        <cms-galleries id=\"galleries\" closed$=\"[[open]]\" sett=[[sett]] images=\"{{images}}\" reset=\"[[reset]]\">\n          <cms-images id=\"images\" slot=\"images\" class=\"fodasse\" image=\"{{image}}\" cancel=\"{{evet}}\" openMain=\"{{doNotOpenMain}}\">\n          </cms-images> \n        </cms-galleries>\n      </article>\n      <article name=\"videos\" route=\"[[subroute]]\" lang=\"[[lang]]\"> \n            videos\n      </article>\n  "]);_templateObject3_e560ecd045c111e9bac3d12cb7c88f95=function _templateObject3_e560ecd045c111e9bac3d12cb7c88f95(){return data};return data}function _templateObject2_e560ecd045c111e9bac3d12cb7c88f95(){var data=babelHelpers.taggedTemplateLiteral(["\n      <a href=\"[[rootPath]]media/search\">\n        <paper-button class=\"button\" front$=\"[[search]]\" name=\"search\" aria-label=\"search\">\n                    [[Search]]\n                <iron-icon icon=\"icons:search\" aria-label=\"search\">\n                </iron-icon>\n        </paper-button>\n      </a> \n      <a href=\"[[rootPath]]media/images\">\n        <paper-button class=\"button\" front$=\"[[images]]\" name=\"images\" aria-label=\"images\">\n                    [[Images]]\n                <iron-icon icon=\"av:library-books\" aria-label=\"images\">\n                </iron-icon>\n        </paper-button>\n      </a> \n      <a href=\"[[rootPath]]media/videos\">\n        <paper-button  class=\"button\" front$=\"[[videos]]\" name=\"videos\" aria-label=\"videos\">    \n                    [[Videos]]\n                <iron-icon icon=\"av:art-track\" aria-label=\"cms videos\">\n                </iron-icon> \n        </paper-button>      \n      </a>"]);_templateObject2_e560ecd045c111e9bac3d12cb7c88f95=function _templateObject2_e560ecd045c111e9bac3d12cb7c88f95(){return data};return data}function _templateObject_e560ecd045c111e9bac3d12cb7c88f95(){var data=babelHelpers.taggedTemplateLiteral(["\n    <div> [[Media]] </div>\n    <paper-icon-button-light>\n      <iron-icon icon=\"image:photo-library\" aria-label=\"Content\">\n      </iron-icon>\n    </paper-icon-button-light>"]);_templateObject_e560ecd045c111e9bac3d12cb7c88f95=function _templateObject_e560ecd045c111e9bac3d12cb7c88f95(){return data};return data}var __DEV=!0,_DBW=new _cmsLogin.dataBaseworker,_STYLES=_DBW.getElementAssets("cms-image-viewer",!0),cmsImageViewer=function(_cmsTopPageTemplate){babelHelpers.inherits(cmsImageViewer,_cmsTopPageTemplate);function cmsImageViewer(){babelHelpers.classCallCheck(this,cmsImageViewer);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsImageViewer).apply(this,arguments))}babelHelpers.createClass(cmsImageViewer,[{key:"ready",value:function ready(){var _this=this;babelHelpers.get(babelHelpers.getPrototypeOf(cmsImageViewer.prototype),"ready",this).call(this);_STYLES.then(function(querySnapshot){var style=querySnapshot.data();_this._setLangObject(style)}).catch(function(error){console.error("Error reteaving assets: ",error)});this._routePageChanged(this.routeData,0);(0,_cmsLogin.scroll)({top:0,behavior:"silent"})}},{key:"__changeLang",value:function __changeLang(){var _this2=this;try{if(this.langs[this.lang]){(function(){var obj=_this2.langs[_this2.lang],_loop=function _loop(par){setTimeout(function(){_this2.set(par,obj[par])},60)};for(var par in obj){_loop(par)}})()}}catch(err){console.error(err)}}},{key:"_setLangObject",value:function _setLangObject(langs){try{for(var par in langs){if("styles"!==par){this.langs[par]=langs[par].pop()}}this.__changeLang()}catch(err){console.error(err)}}},{key:"_routePageChanged",value:function _routePageChanged(page,query){if("/media"===this.route.prefix){if(page!==void 0&&"page"in page){if(-1!==["search","images","videos"].indexOf(page.page)){this.page=page.page}else{console.log("view404",page,query)}}else{this.page="search"}}}},{key:"_pageChanged",value:function _pageChanged(page){console.log("Media",page);if(page!==void 0){}}}],[{key:"topTitle",get:function get(){return(0,_cmsLogin.html$1)(_templateObject_e560ecd045c111e9bac3d12cb7c88f95())}},{key:"topPages",get:function get(){return(0,_cmsLogin.html$1)(_templateObject2_e560ecd045c111e9bac3d12cb7c88f95())}},{key:"viewPages",get:function get(){return(0,_cmsLogin.html$1)(_templateObject3_e560ecd045c111e9bac3d12cb7c88f95())}},{key:"is",get:function get(){return"cms-image-viewer"}},{key:"properties",get:function get(){return{lang:{type:String,notify:!0,observer:"__changeLang"},langs:{type:Object,value:{}},page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"},search:{type:Boolean,computed:"_checkMyName(page, \"search\")"},images:{type:Boolean,computed:"_checkMyName(page, \"images\")"},videos:{type:Boolean,computed:"_checkMyName(page, \"videos\")"}}}},{key:"observers",get:function get(){return["_routePageChanged(routeData, query, active)"]}}]);return cmsImageViewer}(_cmsLogin.cmsTopPageTemplate);customElements.define(cmsImageViewer.is,cmsImageViewer)});