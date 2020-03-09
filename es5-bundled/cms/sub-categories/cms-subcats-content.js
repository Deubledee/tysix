define(["../cms-login.js"],function(_cmsLogin){"use strict";var _marked=/*#__PURE__*/regeneratorRuntime.mark(generateData);function _templateObject2_78007f20615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["\n        <dom-repeat repeat items=\"[[inform]]\" as=\"cat\">\n        no items here\n            <template>\n                <div class=\"center-menu\">\n                    <aside class=\"info\">\n                        <span>\n                            [[info]]\n                        </span>\n                    </aside>\n                </div>\n                <div class=\"row-menu\">\n                    <aside>\n                        <span>\n                            [[publishedby]]\n                        </span>\n                    </aside>\n                    <aside>\n                        <span>\n                            [[publiShed]]\n                        </span>\n                    </aside>\n                    <aside>\n                        <span>\n                            [[datepublished]]\n                        </span>\n                    </aside>\n                </div>\n                <div class=\"center-menu\">\n                    <aside class=\"asideBackgrc\">\n                        <span>\n                            [[cat.Published.publishedBy]]\n                        </span>\n                    </aside>\n                    <aside class=\"asideBackgrc\" published$=\"[[cat.Published.state]]\">\n                        <span>\n                            [[cat.Published.state]]\n                        </span>\n                    </aside>\n                    <aside class=\"asideBackgrc\">\n                        <span>\n                            [[cat.Published.date]]\n                        </span>\n                    </aside>\n                </div>\n\n                <div class=\"row-menu\">\n                    <aside>\n                        <span>\n                            [[author]]\n                        </span>\n                    </aside>\n                    <aside>\n                        <span>\n                            [[datecreated]]\n                        </span>\n                    </aside>\n                </div>\n                <div class=\"center-menu\">\n                    <aside class=\"asideBackgrc\">\n                        <span>\n                            [[cat.author.name]]\n                        </span>\n                    </aside>\n                    <aside class=\"asideBackgrc\">\n                        <span>\n                            [[cat.dateCreated]]\n                        </span>\n                    </aside>\n                </div>\n\n                <div class=\"row-menu-especial\">\n                    <aside>\n                        <span>\n                        children Count \n                        </span>\n                    </aside>\n                </div>\n                <div class=\"center-menu-especial\">\n                    <aside class=\"asideBackgrc\">\n                        <span>\n                            [[cat.children.length]]\n                        </span>\n                    </aside>\n                </div>\n\n                <div class=\"center-menu\">\n                    <aside>\n                        <span>\n                            [[lastmodified]]\n                        </span>\n                    </aside>\n                </div>\n                <div class=\"row-menu\">\n                    <aside>\n                        <span>\n                            [[author]]\n                        </span>\n                    </aside>\n                    <aside>\n                        <span>\n                            [[date]]\n                        </span>\n                    </aside>\n                </div>\n                <div rightSide>\n                    <dom-repeat repeat items=\"[[cat.lastModified]]\" as=\"mod\">\n                        <template>\n                            <section>\n                                <aside class=\"asideBackgrc\">\n                                    <span>\n                                        [[mod.author]]\n                                    </span>\n                                </aside>\n                                <aside class=\"asideBackgrc\">\n                                    <span>\n                                        [[mod.date]]\n                                    </span>\n                                </aside>\n                            </section>\n                        </template>\n                    </dom-repeat>\n                </div>\n            </template>\n        </dom-repeat>"]);_templateObject2_78007f20615e11eab834b97a903770ac=function _templateObject2_78007f20615e11eab834b97a903770ac(){return data};return data}function _templateObject_78007f20615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["   \n         <div class=\"path\"> \n            <h5>[[_getpreaty(query.path)]] </h5>\n        </div>"]);_templateObject_78007f20615e11eab834b97a903770ac=function _templateObject_78007f20615e11eab834b97a903770ac(){return data};return data}var Modelo="eyJpbWFnZXMiOnsiY29udGVudCI6W119LCJsYW5nIjp7ImNhdGVnb3J5TmFtZSI6IiIsImxhbmciOiIiLCJkZXNjcmlwdGlvbiI6IiIsInR5cGUiOiIifX0=",ModeloInfo="W3siYXV0aG9yIjp7InVpZCI6IiIsIm5hbWUiOiIifSwiY2hpbGRyZW4iOltdLCJkYXRlQ3JlYXRlZCI6IiIsImlkIjoiIiwibGFzdE1vZGlmaWVkIjpbXSwicGFyZW50IjoiIiwidG9BcnRpY2xlIjoiIiwidG9wIjoiIiwiY2hpbGRyZW5Db3VudCI6MCwicmVtb3ZlZCI6ZmFsc2UsInJlbW92ZWRDaGlsZHJlbiI6W119XQ==",cmsSubcatsContent=/*#__PURE__*/function(_cmsSubcatsLib){babelHelpers.inherits(cmsSubcatsContent,_cmsSubcatsLib);function cmsSubcatsContent(){babelHelpers.classCallCheck(this,cmsSubcatsContent);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsSubcatsContent).apply(this,arguments))}babelHelpers.createClass(cmsSubcatsContent,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsSubcatsContent.prototype),"ready",this).call(this);this.translator.target("cms-page-list-type-content","setLangObject",this._setLObj.bind(this));this.translator.target("cms-page-list-type-content","changeLang",this._setLang.bind(this),/* ignoreName */ /* ignoreName */!1/* skipSlots */ /* skipSlots */);this.translator.shoot("cms-page-list-type-content","setLangObject");// window.addEventListener('reset', (this.__reset).bind(this))
this.set("saveButton",this.$.saveButton);this.$.image.addImage=this.addImage.bind(this)}},{key:"_setValues",value:function _setValues(data){this.set("temp",data);for(var par in data){this.set("itemText",data[par])}this._setLabels(data)}},{key:"_setLObj",value:function _setLObj(res,querySnapshot){if("data"in querySnapshot){var langs=querySnapshot.data();res.call(this,langs)}}},{key:"_setLang",value:function _setLang(res,lang){this.lang=lang;res.call(this)}},{key:"__changeLang",value:function __changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}},{key:"_getpreaty",value:function _getpreaty(str){if(!!str){var STR=str.split("/");return STR.join(" - ")}}},{key:"_checkIfClose",value:function _checkIfClose(data){if(!1===data&&!0/* skipSlots */===this.ctnOpened){this.$.closeanchor.click();this.ctnOpened=!1}}},{key:"_routePageChanged",value:function _routePageChanged(path,query){var _this=this;if(!path){if(!!this.ctnOpened){this.ctnOpened=!1;setTimeout(function(){if(!!_this.$.overlay.opened){_this.$.overlay.close();_this.ctnOpened=!1}},500)}}if(!!path){this.__reset();this.scrollTo(0,0);this.add=this.query.adTosub;var parentName=query.content,parentIndex=query.parent;this.set("parentName",parentName);var indexArr=!1===!!this.query.indexarr?parentIndex:this.query.indexarr;this.set("_indexArr",indexArr);if(!!query.add){this.add="true"===query.add;this.parent=parseInt(this.query.parent)}if(!!query.added){this.added="true"===query.added;this.parent=parseInt(this.query.parent)}this.closestr="new-content"===this.query.content?"content/pages/subcategory-pages?content=".concat(this.query.content):"content/pages/subcategory-pages?content=".concat(this.query.content,"&update=").concat(this.query.name,"&reset=false");if("/add-subcategory-pages"===path||"/edit-subcategory-pages"===path){if(!this.$.overlay.opened){this.$.overlay.open();this.ctnOpened=!0}if("/add-subcategory-pages"===path){this._setAddedContent(query)}if("/edit-subcategory-pages"===path){if(!!query.name){this._setEditContent(query)}}}else{this.ctnOpened=!1;this.$.overlay.close()}}}},{key:"addImage",value:function addImage(){if(!1===this.add){var string="type=cats&content=".concat(this.inform[0].parent,"&name=").concat(this.inform[0].id,"&lang=").concat(this.query.lang,"&path=").concat(this.inform[0].path,"&add=").concat(this.add,"&top=").concat(this.query.top,"&parent=").concat(this.query.parent);localStorage.setItem("cats-".concat(this.inform[0].parent,"-").concat(this.inform[0].id),JSON.stringify(this.content));window.history.pushState({},null,"".concat(this.rootPath,"media/galleries?").concat(string));window.dispatchEvent(new CustomEvent("location-changed"))}else{var parent=parseInt(this.query.name),_string="type=cats&content=".concat(this.query.content,"&name=").concat(this.query.name,"&lang=lang&path=").concat(this.query.path,"&add=").concat(this.add,"&top=").concat(this.query.top,"&parent=").concat(this.query.parent);localStorage.setItem("cats-".concat(this.query.content,"-").concat(parent),JSON.stringify(this.content));window.history.pushState({},null,"".concat(this.rootPath,"media/galleries?").concat(_string));window.dispatchEvent(new CustomEvent("location-changed"))}window.onbeforeunload=function(e){return""}}},{key:"_setAddedContent",value:function _setAddedContent(query){if(!0===this.add){if("number"===typeof this.time)clearTimeout(this.time);this.__reset();var cont=JSON.parse(atob(Modelo)),obj=cont.images.content,parent=parseInt(this.query.name);localStorage.setItem("cats-".concat(this.query.content,"-").concat(parent,"-info"),atob(ModeloInfo));this.imageLabel="images";this.set("imageArr",obj);this.set("str","content/pages/add-subcategory-pages?content=".concat(this.query.content));this._setContent("lang",[cont]);this.set("pageLangs",[]);this._getPageInfo("cats-".concat(query.content,"-").concat(parent,"-"))}}},{key:"_setEditContent",value:function _setEditContent(query){var strg=location.search;strg=strg.split("lang=")[0];this.set("str","content/pages/edit-subcategory-pages".concat(strg,"lang="));this.imageLabel="images";var arr,cont,images;if(!1===this.add||!0===this.added){var _generateData$call=generateData.call(this,query),_generateData$call2=babelHelpers.slicedToArray(_generateData$call,3);arr=_generateData$call2[0];cont=_generateData$call2[1];images=_generateData$call2[2];this.set("imageArr",images);if(!!query.lang){if("lang"!==query.lang)this.set("pageLangs",arr);this.__setLAng(query.lang,cont)}}}},{key:"onSave",value:function onSave(){if(!!this.newlangstate){this.add=!0}var top="true"===this.query.top,data=new Date,inform,parentInfo=!1===top?JSON.parse(localStorage["cats-".concat(this.query.content,"-").concat(this.query.parent,"-info")]):void 0;inform=this.inform.pop();var noLang=this._lastModified(this._setInfo(inform,data,parentInfo),data);if(!!noLang)return;if(!this.removelang){this.saveSubcats()}else{this.removeSubcatsLang()}}},{key:"_lastModified",value:function _lastModified(inform,data){if(!inform)return 1;if(!0===this.add)inform.lastModified.push({uid:this.user.uid,author:this.user.name,date:data.toLocaleString().replace(",","")});this.inform=[inform]}},{key:"_setInfo",value:function _setInfo(inform,data,parentInfo){var top="true"===this.query.top;if(!this.newlangstate){if(!0===this.add){if(!this.content[0].lang.lang){alert("insert lang first");return void 0}this.content[0][this.content[0].lang.lang]=this.content[0].lang;var lang=[this.content[0].lang.lang];lang=lang.pop();delete this.content[0].lang;inform.ref=btoa(this.query.content)+"-"+btoa(Math.ceil(1e4*Math.random(Math.ceil(20*Math.random())))+Math.ceil(1e4*Math.random(Math.ceil(30*Math.random()))));inform.Published={};inform.Published.date="NP";inform.Published.publishedBy="N/A";inform.Published.state="NP";inform.Published.unPublishedBy="N/A";inform.author.uid=this.user.uid;inform.author.name=this.user.name;inform.parent=this.query.content;inform.id=this.query.name;inform.removed=!1;inform.path="".concat(this.query.path,"/").concat(this.content[0][lang].categoryName.toLowerCase());inform.toArticle="B";inform.top=top;inform.dateCreated=data.toLocaleString().replace(",","");if(!!parentInfo){parentInfo[0].children=[];parentInfo[0].children.push(inform.id);parentInfo[0].childrenCount=inform.children.length;this.updateSubcatParentInfo(parentInfo[0],this.query.content,this.query.parent)}}}return inform}},{key:"__reset",value:function __reset(){this.imageLabel="";this.set("content",[]);this.set("imageArr",[]);this.set("inform",[]);this.set("inputVal",[]);this.set("textareaVal",[])}}],[{key:"_getPath",get:function get(){return(0,_cmsLogin.html)(_templateObject_78007f20615e11eab834b97a903770ac())}},{key:"_getSideInfo",get:function get(){return(0,_cmsLogin.html)(_templateObject2_78007f20615e11eab834b97a903770ac())}},{key:"is",get:function get(){return"cms-subcats-content"}},{key:"properties",get:function get(){return{user:{type:Object},inputVal:{type:Array,notify:!0,value:[]},textarea:{type:Boolean,value:!0,notify:!0},textareaVal:{type:String,notify:!0,value:""},imageArr:{type:Array,notify:!0,value:[]},translator:{type:Object,notify:!0,value:function value(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},lang:{type:String,notify:!0,value:""},langs:{type:Object,value:{}},ctnOpened:{type:Boolean,notify:!0},opened:{type:Boolean,notify:!0,observer:"_checkIfClose"},addLangResponse:{type:Object,notify:!0,value:{},observer:"_setAddLangValue"},inputResponse:{type:Object,notify:!0,value:{},observer:"_setItemsValue"},textAreaResponse:{type:Object,notify:!0,value:{},observer:"_setContentTextValue"},content:{type:Object,notify:!0,value:{}},tocontent:{type:Object,notify:!0,value:{}},Model:{type:Object,value:{}},newlangstate:{Boolean:Boolean,value:!1},tgglelang:{type:Boolean,value:!0,notify:!0},time:Number}}},{key:"observers",get:function get(){return["_routePageChanged(route.path, query)"]}}]);return cmsSubcatsContent}((0,_cmsLogin.cmsSubcatsLib)(_cmsLogin.cmsContentTemplate));customElements.define(cmsSubcatsContent.is,cmsSubcatsContent);function generateData(query){var cont;return regeneratorRuntime.wrap(function generateData$(_context){while(1){switch(_context.prev=_context.next){case 0:cont=JSON.parse(localStorage["cats-".concat(query.content,"-").concat(query.name)]);_context.next=3;return this._setLangArr(cont[0]);case 3:_context.next=5;return cont;case 5:this._getPageInfo("cats-".concat(query.content,"-").concat(query.name,"-"));_context.next=8;return cont[0].images.content;case 8:case"end":return _context.stop();}}},_marked,this)}});