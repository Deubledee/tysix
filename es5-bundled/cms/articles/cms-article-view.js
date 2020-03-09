define(["exports","../cms-login.js"],function(_exports,_cmsLogin){"use strict";Object.defineProperty(_exports,"__esModule",{value:!0/* ignoreName */ /* skipSlots */});_exports.cmsArticleItem=_exports.$cmsArticleItem=void 0;function _templateObject11_78586320615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["       \n        <div class=\"count\">\n            <span> [[contents.length]] </span>\n        </div>\n        <section class=\"flexchildbotom noFlex\">\n            <div class=\"center\">            \n                <h4> [[viewedit]] </h4>\n            </div>\n        </section>                       \n        <section class=\"flexchildbotom noFlex\">\n            <div class=\"center\">\n                <h4> [[Type]] </h4>\n            </div>\n        </section>                       \n        <section class=\"flexchildbotom noFlex\">\n            <div class=\"center\">\n                <h4> [[Category]] </h4>\n            </div>\n        </section>                       \n        <section class=\"flexchildbotom noFlex\">\n            <div class=\"center\">\n                <h4> [[Published]] </h4>\n            </div>\n        </section>   \n        <section class=\"flexchildbotom noFlex\">\n            <div class=\"center\">\n                <h4> [[STOCK]]  </h4>\n            </div>\n        </section>                          \n        <section class=\"flexchildbotom noFlex\">\n            <div aria-delete=\"delete\" class=\"center\">\n                <h4> [[delete]] </h4>\n            </div>\n        </section>\n        "]);_templateObject11_78586320615e11eab834b97a903770ac=function _templateObject11_78586320615e11eab834b97a903770ac(){return data};return data}function _templateObject10_78586320615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["\n        <div table class=\"scroll\">          \n            <dom-repeat repeat items=\"[[contents]]\" as=\"item\">\n                <template>\n                    <slot name=\"article-[[index]]\">                    \n                </template>                            \n            </dom-repeat>\n        </div>    "]);_templateObject10_78586320615e11eab834b97a903770ac=function _templateObject10_78586320615e11eab834b97a903770ac(){return data};return data}function _templateObject9_78586320615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["       \n            <h2>[[articles]]</h2>               \n        "]);_templateObject9_78586320615e11eab834b97a903770ac=function _templateObject9_78586320615e11eab834b97a903770ac(){return data};return data}function _templateObject8_78586320615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["            \n        <a href=\"[[rootPath]]content/articles/add-articles?&add=true\">\n            <div class=\"add-btn-group\" title=\"[[ADD]]\">\n                <div class=\"add-btn-group-item group-item-top-left\" ></div>\n\n                <div class=\"add-btn-group-item group-item-top-right\"></div>\n\n                <div class=\"add-btn-group-item group-item-bottom-left\"></div>\n\n                <div class=\"add-btn-group-item group-item-bottom-right\"></div>\n            </div>\n        </a>\n        "]);_templateObject8_78586320615e11eab834b97a903770ac=function _templateObject8_78586320615e11eab834b97a903770ac(){return data};return data}function _templateObject7_78586320615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["\n        div[arow]{\n            color: #5487b6; \n        }\n        "]);_templateObject7_78586320615e11eab834b97a903770ac=function _templateObject7_78586320615e11eab834b97a903770ac(){return data};return data}function _templateObject6_78586320615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["<cms-article-item slot=\"article-","\" .article=\"","\" .user=\"","\">\n                       </cms-article-item>"]);_templateObject6_78586320615e11eab834b97a903770ac=function _templateObject6_78586320615e11eab834b97a903770ac(){return data};return data}function _templateObject5_78586320615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral([""," "]);_templateObject5_78586320615e11eab834b97a903770ac=function _templateObject5_78586320615e11eab834b97a903770ac(){return data};return data}function _templateObject4_78586320615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["<paper-spinner-lite active=\"false\" slot=\"spinner\">"]);_templateObject4_78586320615e11eab834b97a903770ac=function _templateObject4_78586320615e11eab834b97a903770ac(){return data};return data}function _templateObject3_78586320615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["<paper-spinner-lite active=\"false\" slot=\"spinner\">"]);_templateObject3_78586320615e11eab834b97a903770ac=function _templateObject3_78586320615e11eab834b97a903770ac(){return data};return data}function _templateObject2_78586320615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["\n        shop-image{\n            top: 1px; \n        }"]);_templateObject2_78586320615e11eab834b97a903770ac=function _templateObject2_78586320615e11eab834b97a903770ac(){return data};return data}function _templateObject_78586320615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["\n                   <article centerListItem slot=\"table\">\n                       <div>   \n                           <span> \n                               <paper-button class=\"button-normal\" @click=\"","\"> \n                                   ","\n                               </paper-button>                        \n                           </span>\n                       </div>    \n                       <div>   \n                           <span> \n                               <paper-button class=\"button-normal\"> \n                                   ","\n                               </paper-button>                        \n                           </span>\n                       </div> \n                       <div >                    \n                           <span> \n                               <paper-button class=\"button-normal\">\n                                   "," \n                               </paper-button>\n                           </span>\n                       </div>  \n                       <div>                    \n                           <span> \n                               <paper-button  class=\"","\" @click=\"","\">\n                                   "," \n                               </paper-button>\n                           </span>\n                       </div>   \n                       <div>                    \n                           <span> \n                               <paper-button class=\"button-normal\">\n                                   "," \n                               </paper-button>\n                           </span>\n                       </div> \n                       <div>\n                            <paper-button class=\"button-del\" @click=\"","\">\n                                <paper-icon-button icon=\"av:not-interested\" aria-label=\"mode-delete\">\n                                </paper-icon-button> \n                            </paper-button> \n                       </div>\n                   </article>"]);_templateObject_78586320615e11eab834b97a903770ac=function _templateObject_78586320615e11eab834b97a903770ac(){return data};return data}var cmsArticleItem=/*#__PURE__*/function(_cmsArticlesLib){babelHelpers.inherits(cmsArticleItem,_cmsArticlesLib);function cmsArticleItem(){babelHelpers.classCallCheck(this,cmsArticleItem);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsArticleItem).apply(this,arguments))}babelHelpers.createClass(cmsArticleItem,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsArticleItem.prototype),"ready",this).call(this)}},{key:"_putRow",value:function _putRow(data){var _this=this,artInfo,artContent,_data$map=data.map(function(item){return item}),_data$map2=babelHelpers.slicedToArray(_data$map,2);artInfo=_data$map2[0];artContent=_data$map2[1];this.objInfo=artInfo;for(var item in artContent){if("images"===item||"videos"===item){this.objMedia[item]=artContent[item]}else{this.objData[item]=artContent[item]}}var articleTemplate=function articleTemplate(objData,objInfo){return(0,_cmsLogin.html$2)(_templateObject_78586320615e11eab834b97a903770ac(),_this.showPage.bind(_this),objData.pt.articleName,objData.pt.type,objInfo.categories[0],objInfo.Published,_this._confirmPublish.bind(_this),objInfo.Published,objInfo.stock,_this._openConfirm.bind(_this))};(0,_cmsLogin.render)(articleTemplate(this.objData,this.objInfo),this);localStorage.setItem("article-".concat(this.objInfo.id,"-info"),JSON.stringify(this.objInfo));localStorage.setItem("article-".concat(this.objInfo.id,"-data"),JSON.stringify(this.objData));localStorage.setItem("article-".concat(this.objInfo.id,"-media"),JSON.stringify(this.objMedia))}},{key:"_getPagename",value:function _getPagename(cats){return cats}},{key:"error",value:function error(data){console.error("error from cms-article-viewer",data)}},{key:"showPage",value:function showPage(){var arr=Object.keys(this.objData);window.history.pushState({},null,"content/articles/edit-articles?content=".concat(this.objInfo.id,"&add=false&lang=").concat(arr[0]));window.dispatchEvent(new CustomEvent("location-changed"))}},{key:"__delete",value:function __delete(){// console.log(this.objInfo)
this.objInfo.removed=!0;this.getArticleData(this.objInfo.id,"info").then(this.removeArticle.bind(this)).catch(function(err){return console.log(err)})}},{key:"__publish",value:function __publish(data){console.log(data)}},{key:"_openConfirm",value:function _openConfirm(){var _this2=this;this._changeSectionDebouncer=_cmsLogin.Debouncer.debounce(this._changeSectionDebouncer,_cmsLogin.microTask,function(){_this2.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:_this2.objInfo.id,method:_this2.__delete.bind(_this2),argument:_this2.objInfo.id,headderMsgKind:"remove ?",type:"article"}}))})}},{key:"_confirmPublish",value:function _confirmPublish(){var _this3=this;this._changeSectionDebouncer=_cmsLogin.Debouncer.debounce(this._changeSectionDebouncer,_cmsLogin.microTask,function(){_this3.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:_this3.objInfo.id,method:_this3.__publish.bind(_this3),argument:"!!to be done!!",headderMsgKind:"publish ?",type:"article"}}))})}},{key:"__reset",value:function __reset(){this._debounceEvent=_cmsLogin.Debouncer.debounce(this._debounceEvent,_cmsLogin.microTask,function(){window.dispatchEvent(new CustomEvent("reset-list-type",{bubbles:!0,composed:!0}))})}}],[{key:"_getStyles",get:function get(){return(0,_cmsLogin.html)(_templateObject2_78586320615e11eab834b97a903770ac())}},{key:"is",get:function get(){return"cms-article-item"}},{key:"properties",get:function get(){return{user:{type:Object,notify:!0},article:{type:Array,notify:!0,observer:"_putRow"},published:{type:String,reflectToAttribute:!0},translator:{type:Object,notify:!0,value:function value(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},papgePath:{type:String,value:"edit-articles"},objMedia:{type:Object,value:{}},objInfo:{type:Object,value:{}},objData:{type:Object,value:{}}}}}]);return cmsArticleItem}((0,_cmsLogin.cmsArticlesLib)(_cmsLogin.cmsItemTemplate));_exports.cmsArticleItem=cmsArticleItem;customElements.define(cmsArticleItem.is,cmsArticleItem);var cmsArticleItem$1={cmsArticleItem:cmsArticleItem};_exports.$cmsArticleItem=cmsArticleItem$1;var cmsArticleView=/*#__PURE__*/function(_cmsArticlesLib2){babelHelpers.inherits(cmsArticleView,_cmsArticlesLib2);function cmsArticleView(){babelHelpers.classCallCheck(this,cmsArticleView);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsArticleView).apply(this,arguments))}babelHelpers.createClass(cmsArticleView,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsArticleView.prototype),"ready",this).call(this);var articleTemplate=function articleTemplate(){return(0,_cmsLogin.html$2)(_templateObject3_78586320615e11eab834b97a903770ac())};(0,_cmsLogin.render)(articleTemplate(),this);this.translator.target("cms-article-view","setLangObject",this._setLObj.bind(this));this.translator.target("cms-article-view","changeLang",this._setLang.bind(this),/* ignoreName */!1/* skipSlots */ /* skipSlots */);this.translator.shoot("cms-article-view","setLangObject")}},{key:"_setLObj",value:function _setLObj(res,querySnapshot){if("data"in querySnapshot){var langs=querySnapshot.data();res.call(this,langs)}}},{key:"_setLang",value:function _setLang(res,lang){this.lang=lang;res.call(this)}},{key:"__changeLang",value:function __changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}},{key:"_routePageChanged",value:function _routePageChanged(page,rst){var _this4=this;if("number"===typeof this.time)clearInterval(this.time);var reset="true"===rst;this.scrollTo(0,0);if(!rst){if(!!page&&"articles"===page){if(0===this.contents.length){this.time=setTimeout(function(){(0,_cmsLogin.afterNextRender)(_this4,function(){_this4.getArticles({q:"removed",v:!1})})},120)}}}else if(!0===reset){var articleTemplate=function articleTemplate(){return(0,_cmsLogin.html$2)(_templateObject4_78586320615e11eab834b97a903770ac())};(0,_cmsLogin.render)(articleTemplate(),this);this.time=setTimeout(function(){(0,_cmsLogin.afterNextRender)(_this4,function(){_this4._contentChanged()})},500)}else if(!1===reset){this.time=setTimeout(function(){(0,_cmsLogin.afterNextRender)(_this4,function(){window.history.pushState({},null,"".concat(_this4.rootPath,"content/articles"));window.dispatchEvent(new CustomEvent("location-changed"))})},60)}}},{key:"_setContent",value:function _setContent(data,art){var temp=this.contents,arr=[];this.contents=[];arr.push(data);arr.push(art);temp.push(arr);this.contents=temp}},{key:"_contentChanged",value:function _contentChanged(){var _this5=this;if("number"===typeof this.time)clearTimeout(this.time);if("articles"===this.routeData.page){this.contents=[];(0,_cmsLogin.afterNextRender)(this,function(){window.history.pushState({},null,"".concat(_this5.rootPath,"content/articles"));window.dispatchEvent(new CustomEvent("location-changed"))})}else{this.contents=[]}}},{key:"_setArticleElements",value:function _setArticleElements(data){var _this6=this;if("number"===typeof this.time)clearTimeout(this.time);this.time=setTimeout(function(){var articleTemplate=function articleTemplate(articles){return(0,_cmsLogin.html$2)(_templateObject5_78586320615e11eab834b97a903770ac(),articles.map(function(article,idx){return(0,_cmsLogin.html$2)(_templateObject6_78586320615e11eab834b97a903770ac(),idx,article,_this6.user)}))};(0,_cmsLogin.render)(articleTemplate(data),_this6)},60)}}],[{key:"_getStyles",get:function get(){return(0,_cmsLogin.html)(_templateObject7_78586320615e11eab834b97a903770ac())}},{key:"_getSilentAnchor",get:function get(){return(0,_cmsLogin.html)(_templateObject8_78586320615e11eab834b97a903770ac())}},{key:"_topLabel",get:function get(){return(0,_cmsLogin.html)(_templateObject9_78586320615e11eab834b97a903770ac())}},{key:"_getTable",get:function get(){return(0,_cmsLogin.html)(_templateObject10_78586320615e11eab834b97a903770ac())}},{key:"_getBottom",get:function get(){return(0,_cmsLogin.html)(_templateObject11_78586320615e11eab834b97a903770ac())}},{key:"is",get:function get(){return"cms-article-view"}},{key:"properties",get:function get(){return{route:{type:Object,notify:!0},user:{type:Object,notify:!0},translator:{type:Object,notify:!0,value:function value(){return MyAppGlobals[window.cms];// MyAppGlobals.translator
}},lang:{type:String,notify:!0,observer:"__changeLang"},langs:{type:Object,value:{}},contents:{type:Array,notify:!0,value:[],observer:"_setArticleElements"}}}},{key:"observers",get:function get(){return["_routePageChanged(routeData.page, query.reset)"]}}]);return cmsArticleView}((0,_cmsLogin.cmsArticlesLib)(_cmsLogin.cmsMiddlePageTemplate));customElements.define(cmsArticleView.is,cmsArticleView)});