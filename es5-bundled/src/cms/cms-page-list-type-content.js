define(["./cms-login.js"],function(_cmsLogin){"use strict";function _templateObject3_e5a4376045c111e9bac3d12cb7c88f95(){var data=babelHelpers.taggedTemplateLiteral(["<style include=\"cms-comon-style_v3\">\n        :host {\n            position: relative\n        }\n        </style>\n        <app-route route=\"{{route}}\" pattern=\"/:page\" data=\"{{routeData}}\" tail=\"{{subroute}}\" query-params=\"{{query}}\" active=\"{{active}}\">\n        </app-route>\n        <main id=\"main\">\n            <div>\n                <iron-selector selected=\"[[page]]\" attr-for-selected=\"name\" class=\"drawer-list\" role=\"navigation\">\n                    <a href=\"[[rootPath]]content/pages/\">\n                        <paper-icon-button icon=\"arrow-back\" aria-label=\"Go back\">\n                        </paper-icon-button>\n                    </a>\n                </iron-selector>\n                <paper-button id=\"saveButton\" class=\"diferent\" on-click=\"save\" aria-label=\"mode-save\">\n                    SAVE\n                </paper-button>\n            </div>\n            <div class=\"flex\">\n                <nav class=\"navbottom\" id=\"bottom\">\n                    <dom-repeat repeat items=\"[[content]]\" as=\"cat\">\n                        <template>\n                            <div container>\n                                <div bottom>\n                                    <section class=\"flexchildbotom\">\n                                        <div class=\"flexleft\">\n                                            <paper-button on-click=\"editTo\">\n                                                [[pagetitle]]\n                                            </paper-button>\n        \n                                            <paper-button  value=\"title\" class=\"diferent\" on-click=\"Cancel\" aria-label=\"mode-cancel\">\n                                                [[cancel]]\n                                            </paper-button>\n        \n                                        </div>\n                                        <div class=\"flexright\">\n                                            <div>\n                                                <paper-button on-click=\"edit\" icon=\"editor:mode-edit\" aria-label=\"mode-edit\">\n                                                    [[cat.title]]\n                                                </paper-button>\n                                                <paper-input hidden name=\"title\" aria-label=\"title\" value=\"{{cat.title}}\" on-input=\"inputing\" placeholder=\"[[cat.title]]\">\n                                                </paper-input>\n                                            </div>\n                                        </div>\n                                    </section>\n                                    <section class=\"flexchildbotom\">\n                                        <div class=\"flexleft\">\n                                            <paper-button on-click=\"editTo\">\n                                                [[pagelang]]\n                                            </paper-button>\n                                            <paper-button  value=\"lang\" class=\"diferent\" on-click=\"Cancel\" aria-label=\"mode-cancel\">\n                                                [[cancel]]\n                                            </paper-button>\n                                        </div>\n                                        <div class=\"flexright\">\n                                            <div>\n                                                <paper-button on-click=\"edit\" icon=\"editor:mode-edit\" aria-label=\"mode-edit\">\n                                                    [[cat.lang]]\n                                                </paper-button>\n                                                <paper-input hidden name=\"lang\" value=\"[[cat.lang]]\" on-input=\"inputing\" placeholder=\"[[cat.lang]]\">\n                                                </paper-input>\n                                            </div>\n                                        </div>\n                                    </section>\n                                    <section class=\"flexchildbotom\">\n                                        <div class=\"flexleft\">\n                                            <paper-button on-click=\"editTo\">\n                                                [[pageType]]\n                                            </paper-button>\n                                            <paper-button  value=\"type\" class=\"diferent\" on-click=\"Cancel\" aria-label=\"mode-cancel\">\n                                                [[cancel]]\n                                            </paper-button>\n                                        </div>\n                                        <div class=\"flexright\">\n                                            <div>\n                                                <paper-button on-click=\"edit\" icon=\"editor:mode-edit\" aria-label=\"mode-edit\">\n                                                    [[cat.type]]\n                                                </paper-button>\n                                                <paper-input hidden name=\"type\" value=\"[[cat.type]]\" on-input=\"inputing\" placeholder=\"[[cat.type]]\">\n                                                </paper-input>\n                                            </div>\n                                        </div>\n                                    </section>\n                                    <section class=\"flexchildbotom\">\n                                        <div class=\"flexleft\">\n                                            <paper-button on-click=\"editTo\">\n                                                [[placeholder]]\n                                            </paper-button>\n                                            <paper-button  value=\"placeholder\" class=\"diferent\" on-click=\"Cancel\" aria-label=\"mode-cancel\">\n                                                [[cancel]]\n                                            </paper-button>\n                                        </div>\n                                        <div class=\"flexright\">\n                                            <div>\n                                                <paper-button on-click=\"edit\" icon=\"editor:mode-edit\" aria-label=\"mode-edit\">\n                                                    [[cat.placeholder]]\n                                                </paper-button>\n                                                <paper-input hidden name=\"placeholder\" value=\"[[cat.placeholder]]\" on-input=\"inputing\" placeholder=\"[[cat.placeholder]]\">\n                                                </paper-input>\n                                            </div>\n                                        </div>\n                                    </section>\n                                </div>\n                                <section class=\"flexchildbotom3\">\n                                    [[slotImageElement(cat)]]\n                                    <slot name=\"image\">\n                                    </slot>\n                                </section>\n                            </div>\n                        </template>\n                    </dom-repeat>\n                </nav>\n                <nav class=\"navside\">\n                    <dom-repeat repeat items=\"[[content]]\" as=\"cat\">\n                        <template>\n                            <div class=\"flexsidecenter\">\n                                <aside>\n                                    <span>\n                                        [[info]]\n                                    </span>\n                                </aside>\n                            </div>\n                            <div class=\"navsideleft\">\n                                <aside>\n                                    <span>\n                                        [[publishedby]]\n                                    </span>\n                                </aside>\n                                <aside>\n                                    <span>\n                                        [[publiShed]]\n                                    </span>\n                                </aside>\n                                <aside>\n                                    <span>\n                                        [[datepublished]]\n                                    </span>\n                                </aside>\n                            </div>\n                            <div class=\"navsideright\">\n                                <aside>\n                                    <span>\n                                        [[ _getPublishedBy(cat.publishedBy)]]\n                                    </span>\n                                </aside>\n                                <aside published$=\"[[cat.published]]\">\n                                    <span>\n                                        [[cat.published]]\n                                    </span>\n                                </aside>\n                                <aside>\n                                    <span>\n                                        [[cat.datePublished]]\n                                    </span>\n                                </aside>\n                            </div>\n                            <div class=\"navsideleft\">\n                                <aside>\n                                    <span>\n                                        [[author]]\n                                    </span>\n                                </aside>\n                                <aside>\n                                    <span>\n                                        [[datecreated]]\n                                    </span>\n                                </aside>\n                            </div>\n                            <div class=\"navsideright\">\n                                <aside>\n                                    <span>\n                                        [[cat.author]]\n                                    </span>\n                                </aside>\n                                <aside>\n                                    <span>\n                                        [[cat.dateCreated]]\n                                    </span>\n                                </aside>\n                            </div>\n                            <div class=\"flexsidecenter\">\n                                <aside>\n                                    <span>\n                                        [[lastmodified]]\n                                    </span>\n                                </aside>\n                            </div>\n                            <div class=\"navsideleft\">\n                                <aside>\n                                    <span>\n                                        [[author]]\n                                    </span>\n                                </aside>\n                                <aside>\n                                    <span>\n                                        [[date]]\n                                    </span>\n                                </aside>\n                            </div>\n                            <div rightSide>\n                                <dom-repeat repeat items=\"[[cat.lastModified]]\" as=\"createdAt\">\n                                    <template>\n                                        <section>\n                                            <aside>\n                                                <span>\n                                                    [[createdAt.author]]\n                                                </span>\n                                            </aside>\n                                            <aside>\n                                                <span>\n                                                    [[createdAt.date]]\n                                                </span>\n                                            </aside>\n                                        </section>\n                                    </template>\n                                </dom-repeat>\n                            </div>\n                        </template>\n                    </dom-repeat>\n                </nav>\n            </div>\n        </main>\n        "]);_templateObject3_e5a4376045c111e9bac3d12cb7c88f95=function _templateObject3_e5a4376045c111e9bac3d12cb7c88f95(){return data};return data}function _templateObject2_e5a4376045c111e9bac3d12cb7c88f95(){var data=babelHelpers.taggedTemplateLiteral(["<cms-gallery-viewer></cms-gallery-viewer>"]);_templateObject2_e5a4376045c111e9bac3d12cb7c88f95=function _templateObject2_e5a4376045c111e9bac3d12cb7c88f95(){return data};return data}function _templateObject_e5a4376045c111e9bac3d12cb7c88f95(){var data=babelHelpers.taggedTemplateLiteral([" <cms-image slot=\"image\">\n                               <cms-image-form slot=\"imageForm\">\n                               </cms-image-form>\n                            </cms-image>"]);_templateObject_e5a4376045c111e9bac3d12cb7c88f95=function _templateObject_e5a4376045c111e9bac3d12cb7c88f95(){return data};return data}var __DEV=!0,_DBW=new _cmsLogin.dataBaseworker,_STYLES=_DBW.getElementAssets("cms-page-list-type-content",!0),cmsPageListTypeContent=function(_PolymerElement){babelHelpers.inherits(cmsPageListTypeContent,_PolymerElement);function cmsPageListTypeContent(){babelHelpers.classCallCheck(this,cmsPageListTypeContent);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsPageListTypeContent).apply(this,arguments))}babelHelpers.createClass(cmsPageListTypeContent,[{key:"ready",value:function ready(){var _this=this;babelHelpers.get(babelHelpers.getPrototypeOf(cmsPageListTypeContent.prototype),"ready",this).call(this);_STYLES.then(function(querySnapshot){var langs=querySnapshot.data();_this._setLangObject(langs)}).catch(function(error){console.error("Error reteaving assets: ",error)})}},{key:"__changeLang",value:function __changeLang(){if(this.langs[this.lang]){var obj=this.langs[this.lang];for(var par in obj){this.set(par,obj[par])}}}},{key:"_setLangObject",value:function _setLangObject(langs){for(var par in langs){if("styles"!==par){this.langs[par]=langs[par].pop()}}this.__changeLang()}},{key:"log",value:function log(data){console.log("log from cms-category-content",data)}},{key:"error",value:function error(data){console.error("error from cms-category-content",data)}},{key:"_routePageChanged",value:function _routePageChanged(routeData,query,active){if(!0===active){this.set("content",[]);if(!1==="catlistcreated"in query&&!1==="catlistupdated"in query){if("content"in query){this.set("tada",!1);this.set("content",[JSON.parse(window.atob(query.content))]);this.set("add","true"===query.add);this.slashed=!1}}}else if(!1===active&&!1===this.slashed){this.set("content",[]);this.set("add",!1);window.history.pushState({},null,"".concat(location.pathname,"/"));window.dispatchEvent(new CustomEvent("location-changed"));this.slashed=!0}}},{key:"clean",value:function clean(setterValue){var setter;if(!0===babelHelpers.instanceof(setterValue,MouseEvent)){setter="true"}else{setter=setterValue}if("N/a"===this.pageName||"newPage"===setterValue){setter=!1}(0,_cmsLogin.scroll)({top:0,behavior:"smooth"});this.setter=setter}},{key:"_getPublishedBy",value:function _getPublishedBy(publishedBy){if(publishedBy!==void 0&&0<publishedBy.length){var pubuser=publishedBy[0].name;return pubuser}}},{key:"__reset",value:function __reset(){this.slashed=!0;this._changeSectionDebouncer=_cmsLogin.Debouncer.debounce(this._changeSectionDebouncer,_cmsLogin.microTask,function(){window.dispatchEvent(new CustomEvent("reset-list-type",{bubbles:!0,composed:!0,detail:"categorypages"}))});console.log("log from cms-category-content");this.set("content",[]);this.set("add",!1)}},{key:"save",value:function save(){var _this2=this,content=this.content.pop(),data=new Date,lastModified,author=!0==="author"in content&&0<content.author.split("").length?content.author:this.user,date=!0==="dateCreated"in content&&0<content.dateCreated.split("").length?content.dateCreated:data.toLocaleString().replace(",","");lastModified=!0==="lastModified"in content&&0<content.lastModified.length?content.lastModified:[];if(!0===this.add){content.name=content.title.toLocaleLowerCase();content.name=content.name.split(" ").join("_");content.id=content.name;content.uid=this.user.uid;content.author=author;content.dateCreated=date;lastModified.push({uid:this.user.uid,author:this.user.displayName,date:data.toLocaleString().replace(",","")});content.lastModified=lastModified;var obj2={id:content.name,uid:this.user.uid,author:author,dateCreated:date,lastModified:lastModified,parent:content.name,content:[],type:content.type};_DBW.setPages(function(done,err){if("error"!==done){_this2.DBW.setArticles(function(done,msg){console.log(done,msg)},obj2,__DEV);window.onbeforeunload=function(){};_this2.editing=0;_this2.temp="";_this2.cancelButton.classList.add("diferent");_this2.$.saveButton.classList.add("diferent");_this2.clean("newPage");_this2.__reset()}else{console.log(err)}},content,__DEV)}else{lastModified.push({uid:this.user.uid,author:this.user.displayName,date:data.toLocaleString().replace(",","")});content.id=content.name;content.uid=this.user.uid;content.author=author;content.dateCreated=date;content.lastModified=lastModified;this.DBW.writePagesContent(function(done,err){if("error"!==done){window.onbeforeunload=function(){};_this2.editing=0;_this2.temp="";_this2.cancelButton.classList.add("diferent");_this2.$.saveButton.classList.add("diferent");_this2.clean("newPage");_this2.__reset()}else{console.log(err);_this2.clean("true")}},content,__DEV)}}},{key:"editTo",value:function editTo(event){var inpt,buttn,par,cancel,mainElem=event.srcElement.parentElement.parentElement.children[1].children[0];buttn=mainElem.children[0];inpt=mainElem.children[1];par=event.srcElement.innerText.split(" ").pop().toLowerCase();cancel=event.srcElement.nextElementSibling;this.edit(event,inpt,buttn,par,cancel)}},{key:"edit",value:function edit(event,inpt,buttn,par,cancel){this.input=!0===Number.isInteger(inpt)?event.srcElement.parentElement.children[1]:inpt;var button=buttn||event.srcElement;this.cancelButton=cancel||event.srcElement.parentElement.parentElement.previousElementSibling.children[1];this.modelCat=event.model.__data.cat;if(!0===this.input.hidden){this.input.hidden=!1;button.classList.add("diferent");this.input.onkeydown=this.__keyDownHandler.bind(this);window.onbeforeunload=function(){return"not without saving first :)"}}else{this.input.hidden=!0;button.classList.remove("diferent");if(0===this.editing){this.input.onkeydown=function(){};window.onbeforeunload=function(){}}}}},{key:"__keyDownHandler",value:function __keyDownHandler(event){if("Backspace"===event.code||"Delete"===event.code){this.set("par",event.srcElement.name);if(""===this.temp[event.srcElement.name]){this.temp[event.srcElement.name]=this.modelCat[this.par];this._inputState()}}}},{key:"inputing",value:function inputing(event){this.set("par",event.srcElement.name);if(!1===this.par in this.temp){this._setTemp()}else if(!0===this.temp[this.par].canceled){this._setTemp()}}},{key:"_setTemp",value:function _setTemp(){this.temp[this.par]={};this.temp[this.par].data=!0!==this.add?this.modelCat[this.par]:void 0;this.temp[this.par].canceled=!1;this._inputState()}},{key:"_inputState",value:function _inputState(){if(!0===!!this.input.value){this.cancelButton.classList.remove("diferent");this.$.saveButton.classList.remove("diferent");this.editing=this.editing+1;this.canceled=!1}}},{key:"Cancel",value:function Cancel(event){var input=event.srcElement.parentElement.nextElementSibling.children[0].children[1];this.set("par",input.name);this.set("input",input);this.input.value=this.temp[this.par].data===void 0?"":this.temp[this.par].data;if(!1===this.temp[this.par].canceled){this.cancelState(event.srcElement);this.set("par","");this.input.onkeydown=function(){}}}},{key:"cancelState",value:function cancelState(srcElemen){this.temp[this.par].data="";this.temp[this.par].canceled=!0;srcElemen.classList.add("diferent");if(1>=this.editing){this.$.saveButton.classList.add("diferent");this.editing=0;window.onbeforeunload=function(){}}else{this.editing=this.editing-1}}},{key:"slotImageElement",value:function slotImageElement(cat){if(this.imageElement===void 0){var template=(0,_cmsLogin.html$1)(_templateObject_e5a4376045c111e9bac3d12cb7c88f95()),clone=document.importNode(template.content,!0);this.appendChild(clone);this.imageElement=this.children[0];this.imageElement.set("images",cat);this.cancelButton=this.imageElement.$.cancel;if("deleted"in this.query&&!0===this.query.deleted||"true"===this.query.deleted){this.cancelButton.classList.remove("diferent")}this.imageElement.deleteImg=this.deleteImg.bind(this);this.imageElement.$.add.addEventListener("click",this.addImage.bind(this));this.imageElement.$.cancel.addEventListener("click",this.cancelImages.bind(this))}}},{key:"setImage",value:function setImage(data){if("url"in data){var img=new Image,arr=[];img.src=data.url;if(600>img.naturalHeight){if(!0===babelHelpers.instanceof(this.content[0].image,Array)){arr=this.content[0].image}else{arr.push(this.content[0].image)}arr.push(data.url);this.content[0].image=arr;this.notifyPath("content[0].image")}if(600<=img.naturalHeight){if(!0===babelHelpers.instanceof(this.content[0].largeImage,Array)){arr=this.content[0].largeImage}else{arr.push(this.content[0].largeImage)}arr.push(data.url);this.content[0].largeImage=arr;this.notifyPath("content[0].largeImage")}this.imageElement.set("images",this.content[0]);this.addingcancel=this.adding;this.adding=!this.adding;this.$.saveButton.classList.remove("diferent");this.editing=this.editing+1}}},{key:"addImage",value:function addImage(){var template=(0,_cmsLogin.html$1)(_templateObject2_e5a4376045c111e9bac3d12cb7c88f95());console.log("add image here");window.onbeforeunload=function(){return"not without saving first :)"}}},{key:"setImages",value:function setImages(data){this.content[0].image=data.url}},{key:"del",value:function del(index){if(!0===babelHelpers.instanceof(this.content[0].image,Array)){this.set("tempArray",this.content[0].image[index]);if(0<index){this.content[0].image.splice(index,index)}else{this.content[0].image.splice(0,1)}}else{this.set("tempArray",this.content[0].image);this.content[0].image=""}var string=window.btoa("".concat(JSON.stringify(this.content[index])));window.history.pushState({},null,"content/pages/edit-category-pages?content=".concat(string,"&deleted=true"));window.dispatchEvent(new CustomEvent("location-changed"));this.removeChild(this.children[0])}},{key:"deleteImg",value:function deleteImg(data){if(data!==void 0){this.del(data.model.__data.index);this.$.saveButton.classList.remove("diferent");this.editing=this.editing+1;this.remove=void 0}}},{key:"cancelImages",value:function cancelImages(){console.log(this.tempArray);this.imageElement.set("content",this.tempArray);this.cancelState();if(!1===this.addingcancel){this.adding=!this.adding}}}],[{key:"template",get:function get(){return(0,_cmsLogin.html$1)(_templateObject3_e5a4376045c111e9bac3d12cb7c88f95())}},{key:"is",get:function get(){return"cms-page-list-type-content"}},{key:"properties",get:function get(){return{DBW:{type:Object,value:function value(){return new _cmsLogin.dataBaseworker},notify:!0},user:{type:Object,notify:!0},query:Object,type:{type:String,value:"",notify:!0},lang:{type:String,notify:!0,observer:"__changeLang"},langs:{type:Object,value:{}},published:{type:String,value:"",notify:!0,reflectToAttribute:!0},open:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0},adding:{type:Boolean,notify:!0,value:!0,reflectToAttribute:!0},category:{type:Object,notify:!0},categoryName:{type:String,notify:!0},categoryIndex:{type:Number,notify:!0},add:{type:Boolean,value:!1,notify:!0},tada:{type:Boolean,value:!1,notify:!0},sett:{type:Boolean,value:!1,notify:!0},tempArray:{type:Array,value:[]},canceled:{type:Boolean,value:!1},sabveButton:{type:Object},cancelButton:{type:Object},temp:{type:Object,value:{}},editing:{type:Number,value:0},slashed:{type:Boolean,value:!1}}}},{key:"observers",get:function get(){return["_routePageChanged(routeData, query, active)"]}}]);return cmsPageListTypeContent}(_cmsLogin.PolymerElement);customElements.define(cmsPageListTypeContent.is,cmsPageListTypeContent)});