define(["../cms-login.js"],function(_cmsLogin){"use strict";function _templateObject7_b7ad08f083c411e9b65ecdd08bafc34e(){var data=babelHelpers.taggedTemplateLiteral(["\n           <dom-repeat repeat items=\"[[inForm]]\" as=\"detail\">\n               <template>\n                   <div class=\"flexsidecenter title\">\n                       <aside>\n                           <span>\n                               [[Info]] \n                           </span>\n                       </aside>\n                   </div>\n                   <div class=\"navsideleft\">\n                       <aside>\n                           <span>\n                           [[categorycount]]\n                           </span>\n                       </aside>\n                   </div>\n                   <div class=\"navsideright\">\n                       <aside>\n                           <span>\n                           <b> [[detail.categoryCount]] </b>\n                           </span>\n                       </aside>\n                   </div>\n                   <div class=\"navsideleft\">\n                       <aside>\n                           <span>\n                           [[publishedarticle]]\n                           </span>\n                       </aside>\n                       <aside>\n                           <span>\n                           [[datepublished]]\n                           </span>\n                       </aside>\n                   </div>\n                   <div rightSide>                            \n                       <dom-repeat repeat items=\"[[detail.published]]\" as=\"published\">\n                           <template>\n                               <section>\n                                   <aside>\n                                       <div published$=\"[[_getPublished(published.page)]]\">\n                                           [[published.page]]\n                                       </div>\n                                   </aside>\n                                   <aside>\n                                       <span>\n                                           [[published.datePublished]]\n                                       </span>\n                                   </aside>\n                               </section>\n                           </template>\n                       </dom-repeat>\n                   </div>\n               </template>\n           </dom-repeat>\n           "]);_templateObject7_b7ad08f083c411e9b65ecdd08bafc34e=function _templateObject7_b7ad08f083c411e9b65ecdd08bafc34e(){return data};return data}function _templateObject6_b7ad08f083c411e9b65ecdd08bafc34e(){var data=babelHelpers.taggedTemplateLiteral(["\n        <div table class=\"scroll\"> \n             <dom-repeat items=\"[[pages]]\" as=\"page\">\n                 <template strip-whitespace>\n                     [[putElement(index, page)]]\n                     <slot name=\"item[[index]]\"></slot>\n                 </template>\n             </dom-repeat>\n        </div>     \n             "]);_templateObject6_b7ad08f083c411e9b65ecdd08bafc34e=function _templateObject6_b7ad08f083c411e9b65ecdd08bafc34e(){return data};return data}function _templateObject5_b7ad08f083c411e9b65ecdd08bafc34e(){var data=babelHelpers.taggedTemplateLiteral(["\n           <section class=\"flexchildbotom noFlex\">\n               <div class=\"center\">\n                    <h4>   [[title]] </h4>\n               </div>\n           </section>                        \n               \n           <section class=\"flexchildbotom noFlex\">\n               <div class=\"center\">\n                <h4>   [[viewedit]] </h4>\n               </div>\n           </section>                        \n           <section class=\"flexchildbotom noFlex\">\n               <div class=\"center\">\n                <h4>    [[items]] #</h4>\n               </div>\n           </section>                         \n           <section class=\"flexchildbotom noFlex\">\n               <div class=\"center\">\n                <h4>   [[publishedCount]] #</h4>\n               </div>\n           </section>\n           "]);_templateObject5_b7ad08f083c411e9b65ecdd08bafc34e=function _templateObject5_b7ad08f083c411e9b65ecdd08bafc34e(){return data};return data}function _templateObject4_b7ad08f083c411e9b65ecdd08bafc34e(){var data=babelHelpers.taggedTemplateLiteral(["\n         <iron-selector selected=\"[[page]]\" attr-for-selected=\"id\" class=\"drawer-list\" role=\"navigation\">\n             <a id=\"reset\" href=\"[[rootPath]]content/\">\n             </a>\n         </iron-selector>\n         "]);_templateObject4_b7ad08f083c411e9b65ecdd08bafc34e=function _templateObject4_b7ad08f083c411e9b65ecdd08bafc34e(){return data};return data}function _templateObject3_b7ad08f083c411e9b65ecdd08bafc34e(){var data=babelHelpers.taggedTemplateLiteral(["        \n             <paper-tab name=\"add-article\">\n                 [[articles]]\n             </paper-tab>\n         "]);_templateObject3_b7ad08f083c411e9b65ecdd08bafc34e=function _templateObject3_b7ad08f083c411e9b65ecdd08bafc34e(){return data};return data}function _templateObject2_b7ad08f083c411e9b65ecdd08bafc34e(){var data=babelHelpers.taggedTemplateLiteral(["\n            <cms-article-list-item>\n            </cms-article-list-item>"]);_templateObject2_b7ad08f083c411e9b65ecdd08bafc34e=function _templateObject2_b7ad08f083c411e9b65ecdd08bafc34e(){return data};return data}function _templateObject_b7ad08f083c411e9b65ecdd08bafc34e(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>    \n    :host {\n        position: relative;\n        display: block;\n    } \n            /* styles reside in cms-content*/\n    </style>        \n    <slot name=\"table\"></slot>"]);_templateObject_b7ad08f083c411e9b65ecdd08bafc34e=function _templateObject_b7ad08f083c411e9b65ecdd08bafc34e(){return data};return data}var cmsArticleListItem=/*#__PURE__*/function(_cmsItemTemplate){babelHelpers.inherits(cmsArticleListItem,_cmsItemTemplate);function cmsArticleListItem(){babelHelpers.classCallCheck(this,cmsArticleListItem);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsArticleListItem).apply(this,arguments))}babelHelpers.createClass(cmsArticleListItem,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsArticleListItem.prototype),"ready",this).call(this)}},{key:"log",value:function log(data){console.log("log from cms-article-viewer",data)}},{key:"_putRow",value:function _putRow(data){this.translator.template.innerHTML="\n        <article centerListItem slot=\"table\">\n            <div>\n                <span> \n                    ".concat(this._getPagename(data),"\n                </span>\n            </div>\n            <div>\n                <paper-button>\n                    <paper-icon-button icon=\"image:remove-red-eye\" aria-label=\"mode-show\"></paper-icon-button>                   \n                    <paper-icon-button  icon=\"editor:mode-edit\" aria-label=\"mode-edit\"></paper-icon-button>\n                </paper-button> \n            </div>  \n            <div>                \n                <span> \n                    <paper-button> ").concat(this._getPublished(data.info[0].items)," </paper-button>\n                </span>\n            </div>   \n            <div>                \n                <span class=\"").concat(this._getPublished(data),"\"> \n                    <paper-button> ").concat(this._getPublished(data.info[0].publishedCount)," </paper-button>\n                </span>\n            </div> \n        </article>");this.translator.clone(this);this.children[0].children[1].children[0].addEventListener("click",this.showPage.bind(this))}},{key:"_getPagename",value:function _getPagename(cats){return cats.info[0].id.split("_").join(" ")}},{key:"_getPublished",value:function _getPublished(cats){return cats}},{key:"error",value:function error(data){console.error("error from cms-article-viewer",data)}},{key:"deSpin",value:function deSpin(){this.$.spinner.active=!this.$.spinner.active}},{key:"showPage",value:function showPage(){var string=window.btoa("".concat(JSON.stringify(this.page)));window.history.pushState({},null,"".concat(this.rootPath,"content/articles/view-articles?content=").concat(string,"&type=").concat(this.page.info[0].type,"&category=").concat(this.page.info[0].id));window.dispatchEvent(new CustomEvent("location-changed"))}},{key:"__delete",value:function __delete(data){var _this=this,page=data;this.translator._DBW.deletePage(function(msg){if("error"!==msg){_this.log(msg)}else{_this.error(msg)}},page,this.translator.__DEV)}},{key:"__publish",value:function __publish(){console.log("!!to be done!!")}},{key:"_openConfirm",value:function _openConfirm(){var _this2=this;this._changeSectionDebouncer=_cmsLogin.Debouncer.debounce(this._changeSectionDebouncer,_cmsLogin.microTask,function(){_this2.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:_this2._getPagename(_this2.page),method:_this2.__delete.bind(_this2),headderMsg:"delete category page"}}))})}},{key:"_confirmPublish",value:function _confirmPublish(){var _this3=this;this._changeSectionDebouncer=_cmsLogin.Debouncer.debounce(this._changeSectionDebouncer,_cmsLogin.microTask,function(){_this3.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:_this3._getPagename(_this3.page),method:_this3.__publish.bind(_this3),headderMsg:"publish",type:"category page"}}))})}}],[{key:"template",get:function get(){return(0,_cmsLogin.html)(_templateObject_b7ad08f083c411e9b65ecdd08bafc34e())}},{key:"is",get:function get(){return"cms-article-list-item"}},{key:"properties",get:function get(){return{noItem:{type:Array,value:[{image:[]}]},translator:{type:Object,notify:!0,value:function value(){return MyAppGlobals.translator}}}}}]);return cmsArticleListItem}(_cmsLogin.cmsItemTemplate);customElements.define(cmsArticleListItem.is,cmsArticleListItem);var cmsArticleListType=/*#__PURE__*/function(_cmsMiddlePageTemplat){babelHelpers.inherits(cmsArticleListType,_cmsMiddlePageTemplat);function cmsArticleListType(){babelHelpers.classCallCheck(this,cmsArticleListType);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsArticleListType).apply(this,arguments))}babelHelpers.createClass(cmsArticleListType,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsArticleListType.prototype),"ready",this).call(this);this.translator.template.innerHTML="<paper-spinner-lite active=\"false\" slot=\"spinner\">\n            </paper-spinner-lite>";this.translator.clone(this);this.translator.target("cms-page-list-type","setLangObject",this._setLObj.bind(this));this.translator.target("cms-page-list-type","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-page-list-type","setLangObject");this._getArticles();window.addEventListener("reset-artlist-type",this._contentChanged.bind(this))}},{key:"_setLang",value:function _setLang(res,lang){this.lang=lang;res.call(this)}},{key:"_setLObj",value:function _setLObj(res,querySnapshot){if("data"in querySnapshot){var langs=querySnapshot.data();res.call(this,langs)}}},{key:"__changeLang",value:function __changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}},{key:"_contentChanged",value:function _contentChanged(){this.set("pages",[]);this.innerHTML=""}},{key:"_getArticles",value:function _getArticles(){var _this4=this;this.translator._DBW.getAllArticles(function(data){_this4._setAll(data)},this.translator.__DEV)}},{key:"_setAll",value:function _setAll(data){for(var arr=[],arr2=[],i=0;i<data.length;i++){if("categoryCount"in data[i]){arr.push(data[i])}else{arr2.push(data[i])}}this.inForm=[];this.set("inForm",arr);this.pages="";this.set("pages",arr2);this.removeChild(this.children[0])}},{key:"putElement",value:function putElement(index,page){var template=(0,_cmsLogin.html)(_templateObject2_b7ad08f083c411e9b65ecdd08bafc34e()),clone=document.importNode(template.content,!0);this.appendChild(clone);this.children[index].setAttribute("slot","item".concat(index));this.children[index].set("page",page)}},{key:"openConfirm",value:function openConfirm(){var _this5=this;this._changeSectionDebouncer=_cmsLogin.Debouncer.debounce(this._changeSectionDebouncer,_cmsLogin.microTask,function(){_this5.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:_this5.article.parent,method:_this5.deleteGallerie.bind(_this5)}}))})}}],[{key:"_getShoutAnchor",get:function get(){return(0,_cmsLogin.html)(_templateObject3_b7ad08f083c411e9b65ecdd08bafc34e())}},{key:"_getSilentAnchor",get:function get(){return(0,_cmsLogin.html)(_templateObject4_b7ad08f083c411e9b65ecdd08bafc34e())}},{key:"_getBottom",get:function get(){return(0,_cmsLogin.html)(_templateObject5_b7ad08f083c411e9b65ecdd08bafc34e())}},{key:"_getTable",get:function get(){return(0,_cmsLogin.html)(_templateObject6_b7ad08f083c411e9b65ecdd08bafc34e())}},{key:"_getNavside",get:function get(){return(0,_cmsLogin.html)(_templateObject7_b7ad08f083c411e9b65ecdd08bafc34e())}/**/},{key:"is",get:function get(){return"cms-article-list-type"}},{key:"properties",get:function get(){return{lang:{type:String,observer:"__changeLang"},langs:{type:Object,value:{}},translator:{type:Object,notify:!0,value:function value(){return MyAppGlobals.translator}}}}}]);return cmsArticleListType}(_cmsLogin.cmsMiddlePageTemplate);customElements.define(cmsArticleListType.is,cmsArticleListType)});