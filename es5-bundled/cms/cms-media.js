define(["require","./cms-login.js"],function(_require,_cmsLogin){"use strict";_require=babelHelpers.interopRequireWildcard(_require);function _templateObject3_b749da5083c411e9b65ecdd08bafc34e(){var data=babelHelpers.taggedTemplateLiteral(["\n      <article name=\"images\">         \n        <cms-gallery-viewer route=\"{{subroute}}\" lang=\"[[lang]]\">\n        \n          <cms-galleries slot=\"galleries\" id=\"galleries\" \n            route=\"{{subroute}}\" \n            images=\"{{Imags}}\" \n            add=\"{{add}}\" \n            contentto=\"{{contentto}}\" \n            return-path=\"{{returnPath}}\">\n          </cms-galleries>\n\n          <cms-images slot=\"images\" id=\"images\" \n            route=\"{{subroute}}\" \n            image-data=\"{{Imags}}\" \n            add=\"[[add]]\" \n            contentto=\"[[contentto]]\" \n            return-path=\"[[returnPath]]\">\n          </cms-images>\n\n        </cms-gallery-viewer>\n      </article>\n      <article name=\"videos\" route=\"{{subroute}}\"> \n            videos\n      </article>\n  "]);_templateObject3_b749da5083c411e9b65ecdd08bafc34e=function _templateObject3_b749da5083c411e9b65ecdd08bafc34e(){return data};return data}function _templateObject2_b749da5083c411e9b65ecdd08bafc34e(){var data=babelHelpers.taggedTemplateLiteral(["\n      <a href=\"[[rootPath]]media/search\">\n        <paper-button class=\"button\" front$=\"[[search]]\" name=\"search\" aria-label=\"search\">\n                    [[Search]]\n                <iron-icon icon=\"icons:search\" aria-label=\"search\">\n                </iron-icon>\n        </paper-button>\n      </a> \n      <a href=\"[[rootPath]]media/images\">\n        <paper-button class=\"button\" front$=\"[[images]]\" name=\"images\" aria-label=\"images\">\n                    [[Images]]\n                <iron-icon icon=\"av:library-books\" aria-label=\"images\">\n                </iron-icon>\n        </paper-button>\n      </a> \n      <a href=\"[[rootPath]]media/videos\">\n        <paper-button  class=\"button\" front$=\"[[videos]]\" name=\"videos\" aria-label=\"videos\">    \n                    [[Videos]]\n                <iron-icon icon=\"av:art-track\" aria-label=\"cms videos\">\n                </iron-icon> \n        </paper-button>      \n      </a>"]);_templateObject2_b749da5083c411e9b65ecdd08bafc34e=function _templateObject2_b749da5083c411e9b65ecdd08bafc34e(){return data};return data}function _templateObject_b749da5083c411e9b65ecdd08bafc34e(){var data=babelHelpers.taggedTemplateLiteral(["\n    <div> [[Media]] </div>\n    <paper-icon-button-light>\n      <iron-icon icon=\"image:photo-library\" aria-label=\"Content\">\n      </iron-icon>\n    </paper-icon-button-light>"]);_templateObject_b749da5083c411e9b65ecdd08bafc34e=function _templateObject_b749da5083c411e9b65ecdd08bafc34e(){return data};return data}var cmsMedia=/*#__PURE__*/function(_cmsTopPageTemplate){babelHelpers.inherits(cmsMedia,_cmsTopPageTemplate);function cmsMedia(){babelHelpers.classCallCheck(this,cmsMedia);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsMedia).apply(this,arguments))}babelHelpers.createClass(cmsMedia,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsMedia.prototype),"ready",this).call(this);this.translator.target("cms-image-viewer","setLangObject",this._setLObj.bind(this));this.translator.target("cms-image-viewer","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-image-viewer","setLangObject")}},{key:"_setLObj",value:function _setLObj(res,querySnapshot){if("data"in querySnapshot){var langs=querySnapshot.data();res.call(this,langs)}}},{key:"_setLang",value:function _setLang(res,lang){this.lang=lang;res.call(this)}},{key:"__changeLang",value:function __changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}},{key:"_routePageChanged",value:function _routePageChanged(page,query){if("/media"===this.route.prefix){if(page!==void 0&&"page"in page){if(-1!==["search","images","videos"].indexOf(page.page)){this.page=page.page}else{console.log("view404",page,query)}}else{this.page="search"}}}},{key:"_pageChanged",value:function _pageChanged(page){if(page!==void 0){if("images"===page){new Promise(function(res,rej){return _require.default(["./media/cms-gallery-viewer.js"],res,rej)}).then(function(bundle){return bundle&&bundle.$cmsGalleryViewer||{}}).then(function(module){return}).catch(function(error){console.log(error)});return}/*    if (page === 'articles') {
              import('./cms-articles-viewer');
              return;
            }
            if (page === 'view404') {
              import('./cms-404-warning');
              return;
            }*/}}}],[{key:"topTitle",get:function get(){return(0,_cmsLogin.html)(_templateObject_b749da5083c411e9b65ecdd08bafc34e())}},{key:"topPages",get:function get(){return(0,_cmsLogin.html)(_templateObject2_b749da5083c411e9b65ecdd08bafc34e())}},{key:"viewPages",get:function get(){return(0,_cmsLogin.html)(_templateObject3_b749da5083c411e9b65ecdd08bafc34e())}},{key:"is",get:function get(){return"cms-media"}},{key:"properties",get:function get(){var _ref;return _ref={lang:{type:String,notify:!0},langs:{type:Object,value:{}},translator:{type:Object,notify:!0,value:function value(){return MyAppGlobals.translator}},returnPath:{type:String,notify:!0},contentto:{type:Object,notify:!0,value:{}},page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"},add:{type:Boolean,notify:!0},Imags:{type:Array,notify:!0}},babelHelpers.defineProperty(_ref,"add",{type:Boolean,value:!1}),babelHelpers.defineProperty(_ref,"search",{type:Boolean,computed:"_checkMyName(page, \"search\")"}),babelHelpers.defineProperty(_ref,"images",{type:Boolean,computed:"_checkMyName(page, \"images\")"}),babelHelpers.defineProperty(_ref,"videos",{type:Boolean,computed:"_checkMyName(page, \"videos\")"}),_ref}},{key:"observers",get:function get(){return["_routePageChanged(routeData, query, active)"]}}]);return cmsMedia}(_cmsLogin.cmsTopPageTemplate);customElements.define(cmsMedia.is,cmsMedia)});