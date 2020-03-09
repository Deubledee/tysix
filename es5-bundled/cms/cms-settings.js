define(["require","./cms-login.js"],function(_require,_cmsLogin){"use strict";_require=babelHelpers.interopRequireWildcard(_require);function _templateObject2_77c4fcc0615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["\n      <article name=\"projects\">       \n          <cms-projects id=\"projects\" route=\"{{route}}\" user=\"[[user]]\">\n          </cms-projects>\n      </article>\n      <article name=\"templates\">       \n          <cms-templates id=\"templates\" route=\"{{route}}\" user=\"[[user]]\">\n          </cms-templates>            \n      </article>\n      <article name=\"tools\">       \n          <cms-tools id=\"tools\" route=\"{{route}}\" user=\"[[user]]\">\n          </cms-tools>            \n      </article>"]);_templateObject2_77c4fcc0615e11eab834b97a903770ac=function _templateObject2_77c4fcc0615e11eab834b97a903770ac(){return data};return data}function _templateObject_77c4fcc0615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["\n      <a href=\"[[_getStr2(page)]][[_queryContent2(index, page)]]\">  \n          <paper-button  aria-label=\"Go back page\">                   \n          [[_getPage2(page)]]\n          </paper-button>               \n      </a> \n        "]);_templateObject_77c4fcc0615e11eab834b97a903770ac=function _templateObject_77c4fcc0615e11eab834b97a903770ac(){return data};return data}var cmsSettings=/*#__PURE__*/function(_cmsTopPageTemplate){babelHelpers.inherits(cmsSettings,_cmsTopPageTemplate);function cmsSettings(){babelHelpers.classCallCheck(this,cmsSettings);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsSettings).apply(this,arguments))}babelHelpers.createClass(cmsSettings,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsSettings.prototype),"ready",this).call(this);this.translator.target("cms-image-viewer","setLangObject",this._setLObj.bind(this));this.translator.target("cms-image-viewer","changeLang",this._setLang.bind(this),/* ignoreName */ /* ignoreName */!1/* skipSlots */ /* skipSlots */);this.translator.shoot("cms-image-viewer","setLangObject")}},{key:"_setLObj",value:function _setLObj(res,querySnapshot){if("data"in querySnapshot){var langs=querySnapshot.data();res.call(this,langs)}}},{key:"_setLang",value:function _setLang(res,lang){this.lang=lang;res.call(this);this.set("breadcrumbs",[]);if(0<this.breadcrumbs.length){this.setBreadcrumbs(this.route,this.routeData)}}},{key:"__changeLang",value:function __changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this);this.setBreadcrumbs(this.route,this.routeData)}},{key:"_routePageChanged",value:function _routePageChanged(route,routeData){if("/settings"===route.prefix){if(0<this.breadcrumbs.length){this.setBreadcrumbs(this.route,this.routeData)}if(!!routeData&&!!routeData.page){if(-1!==["projects","templates","tools"].indexOf(routeData.page)){this.page=routeData.page}else{// console.log('view404', routeData.page, query);
}}}}},{key:"setBreadcrumbs",value:function setBreadcrumbs(route,routeData){var _this=this;if("number"===typeof this.time)clearTimeout(this.time);this.time=setTimeout(function(){if("/"===route.path){var arr2=["cmshome"];_this.set("breadcrumbs",arr2)}if(!!routeData.page){if(-1!==["projects","templates","tools"].indexOf(routeData.page)){var _arr=["cmshome"];_this.set("breadcrumbs",_arr)}}},120)}},{key:"_getStr2",value:function _getStr2(item){var str="";str="/settings"===item?"".concat(item,"/"):"".concat(item);return str}},{key:"_queryContent2",value:function _queryContent2(index){var str;if(1<index){if(!!this.query&&!!this.query.type){str="".concat(location.search)}else{str="?reset=false&update=".concat(this.query.gallery)}}return str}},{key:"_getPage2",value:function _getPage2(item){var word;if("cmshome"===item){word=item.split("");word[0]=word[0].toUpperCase();word=word.join("");this.translator.changeItemTitleLang.call(this,word.toString(),"word")}else{word=item.split("/");word.shift();word=word.pop();word=word.split("");word[0]=word[0].toUpperCase();word=word.join("");this.translator.changeItemTitleLang.call(this,word.toString(),"word");/**/}return this.word}},{key:"_pageChanged",value:function _pageChanged(page){if(page!==void 0){if("projects"===page){new Promise(function(res,rej){return _require.default(["./settings/cms-projects.js"],res,rej)}).then(function(bundle){return bundle&&bundle.$cmsProjects||{}});return}if("templates"===page){new Promise(function(res,rej){return _require.default(["./settings/cms-templates.js"],res,rej)}).then(function(bundle){return bundle&&bundle.$cmsTemplates||{}});return}if("tools"===page){new Promise(function(res,rej){return _require.default(["./settings/cms-tools.js"],res,rej)}).then(function(bundle){return bundle&&bundle.$cmsTools||{}});return}}}}],[{key:"topTitle",get:function get(){return(0,_cmsLogin.html)(_templateObject_77c4fcc0615e11eab834b97a903770ac())}},{key:"viewPages",get:function get(){return(0,_cmsLogin.html)(_templateObject2_77c4fcc0615e11eab834b97a903770ac())}},{key:"is",get:function get(){return"cms-settings"}},{key:"properties",get:function get(){var _ref;return _ref={route:{type:Object,notify:!0/* skipSlots */},user:{type:Object,notify:!0},lang:{type:String,notify:!0},langs:{type:Object,value:{}},translator:{type:Object,notify:!0,value:function value(){return MyAppGlobals[window.cms];// MyAppGlobals.translator
}},queryContent:{type:String,notify:!0},returnPath:{type:String,notify:!0},contentto:{type:Object,notify:!0,value:{}},page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"},add:{type:Boolean,notify:!0}},babelHelpers.defineProperty(_ref,"add",{type:Boolean,value:!1}),babelHelpers.defineProperty(_ref,"breadcrumbs",{type:Array,notify:!0,value:[]}),_ref}},{key:"observers",get:function get(){return["_routePageChanged(route, routeData, query)"]}}]);return cmsSettings}(_cmsLogin.cmsTopPageTemplate);customElements.define(cmsSettings.is,cmsSettings)});