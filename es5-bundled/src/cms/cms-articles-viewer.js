define(["./cms-login.js"],function(_cmsLogin){"use strict";function _templateObject6_e587609045c111e9bac3d12cb7c88f95(){var data=babelHelpers.taggedTemplateLiteral(["\n\n    <style>\n   main {\n      display: block;\n      word-break: break-all;\n      padding: 4px;\n      position: absolute;\n      left: -42px;\n      top: 140px;\n      width: 100%;\n    }\n  \n    article {\n      box-sizing: border-box;\n      margin-bottom: 10px;\n      padding: 12px;\n      max-width: 1200px;\n      margin-left: auto;\n      margin-right: auto;\n    }\n  \n    nav {\n      color: #8098ad;\n      display: flex;\n      flex-flow: row;\n      padding: 10px;\n      padding-left: 21px;\n    }\n\n    nav[top] {\n      flex-flow: wrap;\n      flex-direction: column;\n      position: relative;\n      top: 5px;\n      margin-bottom: 60px;\n      height: 34px;\n      background-color: #dbdbdb;\n      max-width: 1300px;\n      border-radius: 4px;\n    }\n\n     div[top] {\n      padding-left: 20px;\n    }\n\n    section {\n      display: flex;\n      flex-flow: row;\n      font-weight: bold;\n      padding: 4px;\n      height: 50px;\n      margin-left: auto;\n      margin-right: auto;\n    }\n  \n    section[title] {\n      flex-basis: 34px;\n      cursor: pointer;\n      color: #f0f0f0;\n      font-size: 35px;\n      text-align: center;\n      height: 52px;\n      width: 120px;\n      border-radius: 10px;\n      background-color: #e1e2d8;\n      text-shadow: 1px 1px 1px var(--primary-text-color);\n    }\n  \n    section[title2] {\n      flex-basis: 34px;\n      cursor: pointer;\n      color: #787676;\n      font-size: 55px;\n      text-align: center;\n      height: 72px;\n      width: 257px;\n      border-radius: 10px;\n      /* background-color: #e1e2d8; */\n      text-shadow: 3px 3px 2px #ababab;\n    }\n\n    paper-icon-button-light {\n      color: #929696;\n      margin-left: 10px\n    }\n  \n    paper-spinner {\n      left: 47%;\n    }\n\n    paper-button {\n      min-width: 98px;\n    }\n\n    .hidden {\n        display: none!important\n    }\n\n    paper-tabs {\n      font-size: 17px;\n      font-weight: bold;\n    }\n\n    nav[center] {\n      flex-flow: column;\n    }\n\n    .diferent {\n      display: none;\n    }\n  </style>      \n  <app-route route=\"{{route}}\" pattern=\"/:page\" data=\"{{routeData}}\" tail=\"{{subroute}}\" query-params=\"{{query}}\" active=\"{{active}}\">\n  </app-route>\n  <main>\n    <nav top>\n      <app-toolbar typer>\n          <paper-tabs no-bar >\n            <paper-tab on-click=\"toggleLists\">\n                list page articles\n            </paper-tab>\n            <paper-tab on-click=\"toggleCats\">\n                sub category page articles\n            </paper-tab>\n          </paper-tabs>\n      </app-toolbar> \n    </nav>\n    <article>  \n      <nav center id=\"typer\" class=\"diferent\">   \n          <dom-repeat items=\"[[articles]]\" as=\"article\">\n            <template>\n              <cms-article-list-type route=\"{{route}}\" article=[[article]]>\n              </cms-article-list-type>\n            </template>\n          </dom-repeat>  \n      </nav>\n    </article>\n    <article>\n      <nav center id=\"subCats\" class=\"diferent\">  \n        <dom-repeat items=\"[[cats]]\" as=\"article\">\n          <template>\n            <cms-artilce-sub-cat-type article=[[article]]>\n            </cms-artilce-sub-cat-type>\n          </template>\n        </dom-repeat>   \n      </nav>\n    </article> \n  </main>   \n"]);_templateObject6_e587609045c111e9bac3d12cb7c88f95=function _templateObject6_e587609045c111e9bac3d12cb7c88f95(){return data};return data}function _templateObject5_e587609045c111e9bac3d12cb7c88f95(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style> \n    article {\n        box-sizing: border-box;\n        margin-bottom: 10px;\n        padding: 12px;\n        max-width: 1200px;\n        margin-left: auto;\n        margin-right: auto;\n      }\n      \n      .diferent{\n        display: none!important\n      }\n\n      nav paper-icon-button {\n        flex-basis: 120px;\n        color: rgb(128, 152, 173)\n      }\n\n    nav {\n        color: #8098ad;\n        display: flex;\n        flex-flow: row;\n        padding: 10px;\n        padding-left: 21px;\n      }\n      \n      nav div { \n        flex-basis: 239px;\n      }\n  \n      nav[bottom] {\n        width: auto:\n        max-width: 1200px\n      }\n\n      nav[bottom] div {\n        padding: 20px;\n        flex-basis: unset;\n        flex-grow: 1;\n        height: auto;\n        background: #ffffff;\n      }\n      \n      div[left] {\n        width: 119px;\n      }\n\n    .rightImages {\n        display: flex;\n        /*box-shadow: 3px 3px 8px #b6b6b6;*/\n        padding: 24px;\n        box-sizing: border-box;\n      }\n  \n      cms-images.images {\n        width: 800px;          \n        height: 350px;\n        background-color: inherit;\n        --images-article-images: {          \n            height: 300px!important;\n        }\n      } \n\n      cms-article-list-viewer {\n        flex-grow: 1;\n      }\n\n      div[icons] {\n        text-align: center\n      }\n\n      cms-article-content {\n        max-width: 1200px;\n    }\n\n    </style>\n  <article> \n    <nav>       \n        <div>\n            <span> {{article.parent}}\n            <h4> {{_getArticleContentLength(article)}} articles </h4>\n            </span>\n        </div>\n        <div icons>\n            <paper-icon-button on-click=\"showPage\" icon=\"image:remove-red-eye\" aria-label=\"mode-show\"></paper-icon-button>\n            &\n            <paper-icon-button on-click=\"showPage\" icon=\"editor:mode-edit\" aria-label=\"mode-edit\"></paper-icon-button>\n        </div>\n        <div icons>\n            <paper-icon-button on-click=\"addArticleContent\" icon=\"av:playlist-add\" aria-label=\"mode-edit\">\n            </paper-icon-button>\n        </div>\n        <div icons>\n            <paper-icon-button on-click=\"delete\" icon=\"av:not-interested\" aria-label=\"mode-delete\"></paper-icon-button>\n        </div>\n    </nav>\n    <cms-article-content route=\"{{route}}\" id=\"content\" add=\"true\" delete=\"false\">\n    </cms-article-content> \n    <nav bottom>    \n        <cms-article-list-viewer id=\"viewer\">\n            <cms-article-content id=\"content\" add=\"\" delete=\"\">\n            <!-- images element lands here to :)-->\n            </cms-article-content>\n        </cms-article-list-viewer>\n    </nav>\n  </article>"]);_templateObject5_e587609045c111e9bac3d12cb7c88f95=function _templateObject5_e587609045c111e9bac3d12cb7c88f95(){return data};return data}function _templateObject4_e587609045c111e9bac3d12cb7c88f95(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style> \n    article {\n        display: flex;\n        flex-flow: wrap;\n        box-sizing: border-box;\n        text-align: center;\n        margin-bottom: 10px;\n        padding: 12px;\n        max-width: 1200px;\n        margin-left: auto;\n        margin-right: auto;\n      }\n\n    nav div {\n        flex-basis: 120px;\n        flex-grow: 1;\n        display: block;\n      }\n    \n      div[bottom] {\n        flex-basis: 30%; \n        word-break: break-word;\n        margin-bottom: 75px;\n        /*box-shadow: 2px 2px 4px #bab2b2;*/\n        border-radius: 5px;\n      }\n\n   /* cms-article-content.zIndex {        \n        z-index: 123 \n    }*/\n    shop-image{\n        cursor: pointer;\n        height: 81px; \n    }\n    </style>\n    <article>\n        <dom-repeat items=\"[[content]]\" as=\"art\">\n            <template>\n                <div bottom>\n                    <paper-button on-click=\"openArticleContent\">\n                        [[art.title]] \n                    </paper-button>\n                    <shop-image src=\"[[returnImage(art.image)]]\" alt=\"[[art.image]]\" on-click=\"openArticleContent\"></shop-image> \n                </div>\n            </template>\n        </dom-repeat>\n    <slot></slot>\n    </article>\n        "]);_templateObject4_e587609045c111e9bac3d12cb7c88f95=function _templateObject4_e587609045c111e9bac3d12cb7c88f95(){return data};return data}function _templateObject3_e587609045c111e9bac3d12cb7c88f95(){var data=babelHelpers.taggedTemplateLiteral(["\n        <style include=\"cms-common-styles\">\n        \n        :host {\n            position: absolute;\n            z-index: 120;\n        }\n\n        main{\n            width: 96%;\n            left: -44px;\n        }\n     \n        .open {\n            opacity: 1!important;\n            height: auto!important;\n        }\n        \n        paper-button.close {\n            background-color: #a9e5e5;\n            color: black;\n            font-weight: bold;\n        }\n\n        section[bottom]{\n            \uFFFC    max-height: 408px;\n            }\n    \n            section[bottom3] {\n                display: block;  \n                flex-basis: 92%;    \n            }\n    \n        [adding] {\n            display: none!important\n        }  \n\n        div[buttons]{\n            display: flex\n        }\n\n\n        </style>      \n        <app-route route=\"{{route}}\" pattern=\"/:page\" data=\"{{routeData}}\" tail=\"{{subroute}}\" query-params=\"{{query}}\" active=\"{{active}}\">\n        </app-route>\n        <main id=\"main\">\n            <div>                \n                <iron-selector selected=\"[[page]]\" attr-for-selected=\"name\" class=\"drawer-list\" role=\"navigation\">\n                    <a href=\"[[rootPath]]content/pages/\">\n                        <paper-icon-button icon=\"arrow-back\" aria-label=\"Go back\">\n                        </paper-icon-button>\n                    </a>\n                </iron-selector>\n                <paper-button id=\"saveButton\" class=\"diferent\" on-click=\"save\" aria-label=\"mode-save\">\n                    SAVE \n                </paper-button>\n            </div>\n            <div conatainer>\n                <nav bottom id=\"bottom\">\n                    <dom-repeat repeat items=\"[[content]]\" as=\"cat\">\n                        <template>\n                            <div bottom>\n                                <section bottom>\n                                    <div left>\n                                        <paper-button on-click=\"editTo\">\n                                            Article title \n                                        </paper-button>\n\n                                        <paper-button class=\"diferent\" on-click=\"cancel\" aria-label=\"mode-cancel\">\n                                            cancel\n                                        </paper-button>\n\n                                    </div>\n                                    <div right>\n                                        <div>\n                                            <paper-button on-click=\"edit\" icon=\"editor:mode-edit\" aria-label=\"mode-edit\">\n                                                [[art.title]]\n                                            </paper-button>\n                                            <paper-input hidden value=\"{{cat.title}}\" on-input=\"inputing\" placeholder=>\"[[art.title]]\"></paper-input>\n                                        </div>\n                                    </div>\n                                </section>\n                                <section bottom>\n                                    <div left>\n                                        <paper-button on-click=\"editTo\">\n                                            Category\n                                        </paper-button>\n\n                                        <paper-button class=\"diferent\" on-click=\"cancel\" aria-label=\"mode-cancel\">\n                                            cancel\n                                        </paper-button>\n                                    </div>\n                                    <div right>\n                                        <div>\n                                            <paper-button on-click=\"edit\" icon=\"editor:mode-edit\" aria-label=\"mode-edit\">\n                                                [[art.category]]\n                                            </paper-button>\n                                            <paper-input hidden value=\"{{cat.category}}\" on-input=\"inputing\" placeholder=>\"[[art.category]]\"></paper-input>\n                                        </div>\n                                    </div>\n                                </section>\n                                <section bottom>\n                                    <div left>\n                                        <paper-button on-click=\"editTo\">\n                                            type\n                                        </paper-button>\n\n                                        <paper-button class=\"diferent\" on-click=\"cancel\" aria-label=\"mode-cancel\">\n                                            cancel\n                                        </paper-button>\n                                    </div>\n                                    <div right>\n                                        <div>\n                                            <paper-button on-click=\"edit\" icon=\"editor:mode-edit\" aria-label=\"mode-edit\">\n                                                [[art.type]]\n                                            </paper-button>\n                                            <paper-input hidden value=\"{{cat.type}}\" on-input=\"inputing\" placeholder=>\"[[art.type]]\"></paper-input>\n                                        </div>\n                                    </div>\n                                </section>\n                                <section bottom>\n                                    <div left>\n                                        <paper-button on-click=\"editTo\">\n                                            brand\n                                        </paper-button>\n                                        <paper-button class=\"diferent\" on-click=\"cancel\" aria-label=\"mode-cancel\">\n                                            cancel\n                                        </paper-button>\n                                    </div>\n                                    <div right>\n                                        <div>\n                                            <paper-button on-click=\"edit\" icon=\"editor:mode-edit\" aria-label=\"mode-edit\">\n                                            [[art.brand]]\n                                            </paper-button>\n                                            <paper-input hidden value=\"[[art.brand]]\" on-input=\"inputing\" placeholder=>\"[[art.brand]]\"></paper-input>\n                                        </div>\n                                    </div>\n                                </section>\n                                <section bottom>\n                                    <div left>\n                                        <paper-button on-click=\"editTo\">\n                                            price \n                                        </paper-button>\n                                        <paper-button class=\"diferent\" on-click=\"cancel\" aria-label=\"mode-cancel\">\n                                            cancel\n                                        </paper-button>\n                                    </div>\n                                    <div right>\n                                        <div>\n                                            <paper-button on-click=\"edit\" icon=\"editor:mode-edit\" aria-label=\"mode-edit\">\n                                            [[art.price]]\n                                            </paper-button>\n                                            <paper-input hidden value=\"[[art.price]]\" on-input=\"inputing\" placeholder=>\"[[art.price]]\"></paper-input>\n                                        </div>\n                                    </div>\n                                </section>\n                                <section bottom>\n                                    <div left>\n                                        <paper-button on-click=\"editTo\">\n                                        description\n                                        </paper-button>\n                                        <paper-button class=\"diferent\" on-click=\"cancel\" aria-label=\"mode-cancel\">\n                                            cancel\n                                        </paper-button>\n                                    </div>\n                                    <div right>\n                                        <div>\n                                            <paper-button on-click=\"edit\" icon=\"editor:mode-edit\" aria-label=\"mode-edit\">\n                                            [[art.description]]\n                                            </paper-button>\n                                            <paper-input hidden value=\"[[art.description]]\" on-input=\"inputing\" placeholder=>\"[[art.description]]\"></paper-input>\n                                        </div>\n                                    </div>\n                                </section>\n                                <section bottom3>\n                                    [[slotImageElement(art)]]\n                                    <slot name=\"image\">\n                                    </slot>\n                                </section>\n                            </div>                                           \n                        </template>\n                    </dom-repeat>\n                </nav> \n                <nav side>\n                    <dom-repeat repeat items=\"[[article]]\" as=\"cat\">\n                        <template> \n                            <div left>\n                                <aside>\n                                    <span>\n                                        author\n                                    </span>\n                                </aside>\n                            </div>\n                            <div right>\n                                <aside>\n                                    <span>\n                                        [[art.author]]\n                                    </span>\n                                </aside>\n                                <aside>\n                                    <span>\n                                        [[art.dateCreated]]\n                                    </span>\n                                </aside>\n                            </div> \n                            <div left>\n                                <aside>\n                                    <span>\n                                        author\n                                    </span>\n                                </aside>\n                                <aside>\n                                    <span>\n                                        date created\n                                    </span>\n                                </aside>\n                            </div>\n                            <div right>\n                                <aside>\n                                    <span>\n                                        [[art.author]]\n                                    </span>\n                                </aside>\n                                <aside>\n                                    <span>\n                                        [[art.dateCreated]]\n                                    </span>\n                                </aside>\n                            </div>\n                            <div center>\n                                <aside>\n                                    <span>\n                                        last modified\n                                    </span>\n                                </aside>\n                            </div>\n                            <div left>\n                                <aside>\n                                    <span>\n                                        author\n                                    </span>\n                                </aside>\n                                <aside>\n                                    <span>\n                                        date \n                                    </span>\n                                </aside>\n                            </div>\n                            <div right>\n                                <dom-repeat repeat items=\"[[art.lastModified]]\" as=\"createdAt\">\n                                    <template>\n                                        <aside>\n                                            <span>\n                                                [[createdAt.author]] \n                                            </span>                                                          \n                                        </aside>  \n                                        <aside>\n                                            <span>\n                                                [[createdAt.date]]\n                                            </span>\n                                        </aside>\n                                    </template>\n                                </dom-repeat>\n                            </div>                    \n                        </template>\n                    </dom-repeat> \n                </nav> \n            </div>\n        </main>\n\n\n\n        "]);_templateObject3_e587609045c111e9bac3d12cb7c88f95=function _templateObject3_e587609045c111e9bac3d12cb7c88f95(){return data};return data}function _templateObject2_e587609045c111e9bac3d12cb7c88f95(){var data=babelHelpers.taggedTemplateLiteral(["<cms-gallery-viewer></cms-gallery-viewer>"]);_templateObject2_e587609045c111e9bac3d12cb7c88f95=function _templateObject2_e587609045c111e9bac3d12cb7c88f95(){return data};return data}function _templateObject_e587609045c111e9bac3d12cb7c88f95(){var data=babelHelpers.taggedTemplateLiteral([" <cms-image slot=\"image\">\n                               <cms-image-form slot=\"imageForm\">\n                               </cms-image-form>\n                            </cms-image>"]);_templateObject_e587609045c111e9bac3d12cb7c88f95=function _templateObject_e587609045c111e9bac3d12cb7c88f95(){return data};return data}var cmsArticleContent=function(_PolymerElement){babelHelpers.inherits(cmsArticleContent,_PolymerElement);function cmsArticleContent(){babelHelpers.classCallCheck(this,cmsArticleContent);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsArticleContent).apply(this,arguments))}babelHelpers.createClass(cmsArticleContent,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsArticleContent.prototype),"ready",this).call(this)}},{key:"log",value:function log(data){console.log("log from cms-article-content",data)}},{key:"error",value:function error(data){console.error("error from cms-article-content",data)}},{key:"_routePageChanged",value:function _routePageChanged(routeData,query,active){if(!0===active){this.set("content",[]);if("content"in query){this.set("tada",!1);this.set("content",[JSON.parse(window.atob(query.content))]);this.set("add","true"===query.add);this.slashed=!1}}else if(!1===active&&!1===this.slashed){this.set("content",[]);this.set("add",!1);window.history.pushState({},null,"".concat(location.pathname,"/"));window.dispatchEvent(new CustomEvent("location-changed"));this.slashed=!0}}},{key:"toggleTada",value:function toggleTada(data){this.tada=!1;this.removeChild(this.children[0]);this.set("content",[]);for(var i=1;0<this.childElementCount;i++){this.removeChild(this.children[0])}}},{key:"toggleZIndex",value:function toggleZIndex(data){var _this=this;if(!0===data){this.style.display="block";setTimeout(function(){_this.$.bottom.classList.add("open")},100)}else{this.$.bottom.classList.remove("open");setTimeout(function(){_this.style.display="none"},1e3)}}},{key:"save",value:function save(event){var _this2=this;if(!0===this.add){this.push("article.content",this.content.pop())}var table={name:this.articleName,content:this.article.content};this.DBW.updateArticles(function(done){_this2.editing=0;_this2.temp="";_this2.cancelButton.classList.add("diferent");_this2.$.saveButton.classList.add("diferent")},table)}},{key:"editCats",value:function editCats(event){var elem=event.srcElement.parentElement.parentElement.children[2],elem1=event.srcElement.parentElement.parentElement.children[1],color=event.srcElement.computedStyleMap().get("color").toString();if("rgb(128, 152, 173)"===color){event.srcElement.style.color="var(--google-blue-700)"}else{event.srcElement.style.color="rgb(128, 152, 173)"}elem.setInputing=function(){this.cancelButton.classList.remove("diferent");this.$.saveButton.classList.remove("diferent");this.editing=this.editing+1}.bind(this);elem.classList.toggle("diferent");elem1.classList.toggle("diferent")}},{key:"edit",value:function edit(event){var elem=event.srcElement.parentElement.children[2],elem1=event.srcElement.parentElement.children[1],color=event.srcElement.computedStyleMap().get("color").toString();if("rgb(128, 152, 173)"===color){event.srcElement.style.color="var(--google-blue-700)"}else{event.srcElement.style.color="rgb(128, 152, 173)"}elem.hidden=!elem.hidden;elem1.classList.toggle("diferent")}},{key:"inputing",value:function inputing(event){var par=event.srcElement.parentElement.previousElementSibling.children[0].innerText.toLowerCase(),value=event.srcElement.value,string="art."+par;this.inputState(event,par);event.model.set(string,value)}},{key:"inputState",value:function inputState(event,par){console.log(event.model.__data.index);this.set("cancelButton",event.srcElement.parentElement.previousElementSibling.children[1]);var arr=""+event.model.__data.art[par],index=event.model.__data.index;if(0<arr.split("").length){if(this.tempArray[par]===void 0){this.set("tempArray."+par,0===arr.split("").length?null:event.model.__data.art[par]);this.editing=this.editing+1}this.cancelButton.classList.remove("diferent");this.$.saveButton.classList.remove("diferent")}}},{key:"cancel",value:function cancel(event){var par=event.srcElement.previousElementSibling.innerText.toLowerCase(),input=event.srcElement.parentElement.nextElementSibling.children[2],string="art."+par,index=event.model.__data.index;input.value=this.tempArray[par];if(!0!==this.canceled){this.cancelState(event.srcElement.parentElement.nextElementSibling,par);event.model.set(string,input.value)}}},{key:"cancelState",value:function cancelState(srcElement,par){delete this.tempArray[par];if(1>=this.editing){this.set("editing",0);this.$.saveButton.classList.add("diferent")}else{this.set("editing",this.editing-1);this.canceled=!0}srcElement.children[2].hidden=!0;srcElement.children[1].classList.remove("diferent")}},{key:"slotImageElement",value:function slotImageElement(cat){var template=(0,_cmsLogin.html$1)(_templateObject_e587609045c111e9bac3d12cb7c88f95()),clone=document.importNode(template.content,!0);this.appendChild(clone);this.imageElement=this.children[0];this.imageElement.set("images",cat);this.cancelButton=this.imageElement.$.cancel;if("deleted"in this.query&&!0===this.query.deleted||"true"===this.query.deleted){this.cancelButton.classList.remove("diferent")}this.imageElement.deleteImg=this.deleteImg.bind(this);this.imageElement.$.add.addEventListener("click",this.addImage.bind(this));this.imageElement.$.cancel.addEventListener("click",this.cancelImages.bind(this))}},{key:"addImage",value:function addImage(){var template=(0,_cmsLogin.html$1)(_templateObject2_e587609045c111e9bac3d12cb7c88f95());console.log(this.children[1].childElementCount);if(2>this.children[1].childElementCount){this.children[1].prepend(template.content.children[0]);this.children[1].children[0].addMethod=this.setImage.bind(this)}else{this.children[1].removeChild(this.children[1].children[0])}}},{key:"_fromImage",value:function _fromImage(image){var url,obj1,obj2,arr=[];if(1<=image.image.length){for(var i=0;i<image.image.length;i++){url=image.image[i];obj1={url:url,title:image.title,type:"image"};arr.push(obj1)}this.imageElement.set("del",!0)}else{url="";obj2={url:url,title:""};arr.push(obj2);this.imageElement.set("del",!1)}return arr}},{key:"_fromlargeImage",value:function _fromlargeImage(image){var url2,obj2,arr=[];if(1<=image.largeImage.length){for(var i=0;i<image.largeImage.length;i++){url2=image.largeImage[i];obj2={url:url2,title:image.title,type:"largeImage"};arr.push(obj2)}this.imageElement.set("del",!0)}else{url="";obj2={url:url,title:""};arr.push(obj2);this.imageElement.set("del",!1)}return arr}},{key:"getImage",value:function getImage(image){if(image!==void 0){var _url=image.image,url2=image.largeImage,obj1,obj2,arr=[];if(!0===babelHelpers.instanceof(image.image,Array)){obj1=this._fromImage(image)}else{obj1=[{url:_url,title:image.title,type:"image"}];arr.push(obj1)}if(!0===babelHelpers.instanceof(image.largeImage,Array)){obj2=this._fromlargeImage(image)}else{obj2=[{url:url2,title:image.title,type:"largeImage"}];arr.push(obj2)}console.log(arr.concat(obj1,obj2));return arr.concat(obj1,obj2)}else{console.log("fucck");return[{url:"",title:"",type:""}]}}},{key:"setImage",value:function setImage(data){console.log(this.content[0].image,"data");if("url"in data){var img=new Image,arr=[];img.src=data.url;if(600>img.naturalHeight){if(!0===babelHelpers.instanceof(this.content[0].image,Array)){arr=this.content[0].image}else{arr.push(this.content[0].image)}}if(600<=img.naturalHeight){if(!0===babelHelpers.instanceof(this.content[0].largeImage,Array)){arr=this.content[0].largeImage}else{arr.push(this.content[0].largeImage)}}this.addingcancel=this.adding;this.adding=!this.adding;this.imageElement.set("del",!0);this.imageElement.set("images",this.getImage(this.content[0]));this.cancelButton.classList.remove("diferent");this.$.saveButton.classList.remove("diferent");this.editing=this.editing+1}}},{key:"del",value:function del(data,index){if(!0===babelHelpers.instanceof(this.content[0].image,Array)){if(0<index){this.content[0][data.type].splice(index,index)}else{this.content[0][data.type].splice(0,1)}}else{this.content[0][data.type]=[]}this.imageElement.set("images",this.getImage(this.content[0]))}},{key:"deleteImg",value:function deleteImg(data){if(data!==void 0){this.del(data.model.__data.image,data.model.__data.index);this.cancelButton.classList.remove("diferent");this.$.saveButton.classList.remove("diferent");this.editing=this.editing+1;this.remove=void 0}}},{key:"cancelImages",value:function cancelImages(){this.imageElement.set("images",this.tempArray);this.imageElement.set("del",!0);this.cancelState();if(!1===this.addingcancel){this.adding=!this.adding}}}],[{key:"template",get:function get(){return(0,_cmsLogin.html$1)(_templateObject3_e587609045c111e9bac3d12cb7c88f95())}},{key:"is",get:function get(){return"cms-article-content"}},{key:"properties",get:function get(){return{DBW:{type:Object,value:function value(){return new _cmsLogin.dataBaseworker},notify:!0},content:{type:Array,value:[],notify:!0},type:{type:String,value:"",notify:!0},article:{type:Object,notify:!0},articleName:{type:String,notify:!0},articleIndex:{type:Number,notify:!0},add:{type:Boolean,value:!1,notify:!0},tada:{type:Boolean,value:!1,notify:!0,observer:"toggleZIndex"},viewerSet:{type:Boolean,value:!1,notify:!0},sett:{type:Boolean,value:!1,notify:!0},remove:{type:Object,observer:"deleteImg"},canceled:{type:Boolean,value:!1},imageElement:{type:Object},cancelButton:{type:Object},setter:{type:String,notify:!0,value:"false"},tempArray:{type:Array,value:[]},temp:{type:String,value:""},editing:{type:Number,value:0},pageTypes:{type:Array,value:[{label:"Page type"},{name:"---"},{name:"list"},{name:"sub category",notAtive:!1},{name:"Social",notAtive:!1},{name:"Video",notAtive:!1}]}}}},{key:"observers",get:function get(){return["_routePageChanged(routeData, query, active)"]}}]);return cmsArticleContent}(_cmsLogin.PolymerElement);customElements.define(cmsArticleContent.is,cmsArticleContent);var cmsArticleListViewer=function(_PolymerElement2){babelHelpers.inherits(cmsArticleListViewer,_PolymerElement2);function cmsArticleListViewer(){babelHelpers.classCallCheck(this,cmsArticleListViewer);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsArticleListViewer).apply(this,arguments))}babelHelpers.createClass(cmsArticleListViewer,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsArticleListViewer.prototype),"ready",this).call(this)}},{key:"log",value:function log(data){console.log("log from cms-article-viewer",data)}},{key:"returnImage",value:function returnImage(data){var damm=data;return"object"===babelHelpers.typeof(damm)?damm[0]:damm}},{key:"error",value:function error(data){console.error("error from cms-article-viewer",data)}},{key:"_getCatParents",value:function _getCatParents(cats){for(var arr=[],i=0,parent;parent=cats[i].parent;i++){arr.push({name:parent});if(i===cats.length-1){return arr}}}},{key:"openArticleContent",value:function openArticleContent(event){var elem=this.children[0];if(!1===elem.tada){elem.set("content",[this.content[event.model.__data.index]]);elem.set("add",!1);elem.set("article",this.content[event.model.__data.index]);elem.set("articleIndex",event.model.__data.index);elem.set("articleName",this.content[event.model.__data.index].categogy)}elem.set("tada",!elem.tada);elem.scrollIntoView()}}],[{key:"template",get:function get(){return(0,_cmsLogin.html$1)(_templateObject4_e587609045c111e9bac3d12cb7c88f95())}},{key:"is",get:function get(){return"cms-article-list-viewer"}},{key:"properties",get:function get(){return{content:{type:Array,notify:!0,value:function value(){return[]}}}}}]);return cmsArticleListViewer}(_cmsLogin.PolymerElement);customElements.define(cmsArticleListViewer.is,cmsArticleListViewer);var cmsArticleListType=function(_PolymerElement3){babelHelpers.inherits(cmsArticleListType,_PolymerElement3);function cmsArticleListType(){babelHelpers.classCallCheck(this,cmsArticleListType);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsArticleListType).apply(this,arguments))}babelHelpers.createClass(cmsArticleListType,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsArticleListType.prototype),"ready",this).call(this)}},{key:"log",value:function log(data){console.log("log from cms-article-viewer",data)}},{key:"error",value:function error(data){console.error("error from cms-article-viewer",data)}},{key:"deSpin",value:function deSpin(){this.$.spinner.active=!this.$.spinner.active}},{key:"openConfirm",value:function openConfirm(event){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,function(){})}},{key:"_getCatParents",value:function _getCatParents(cats){var arr=[];return arr}},{key:"getTitle",value:function getTitle(content){return content}},{key:"addArticleContent",value:function addArticleContent(event){var elem=this.$.content;if(!1===elem.tada){elem.set("content",[{title:"",price:"",category:this.article.parent,type:this.article.type,brand:"",image:"",largeImage:"",description:""}]);elem.set("add",!0);elem.set("categories",this.categories);elem.set("article",this.article);elem.set("articleName",this.article.parent)}else{elem.set("content",[]);elem.set("categories","");elem.set("article","");elem.set("articleName","")}elem.set("tada",!elem.tada);this.setLastChosen(event.srcElement,!elem.tada)}},{key:"scrollIt",value:function scrollIt(data){(0,_cmsLogin.scroll)({top:this.scrollTo,behavior:"silent"});this.scrollTo=0}},{key:"showPage",value:function showPage(event,theother){var elem=this.$.viewer;if(0===elem.content.length){elem.content=this.article.content;this.setLastChosen(event.srcElement)}else{elem.content=[];this.setLastChosen(event.srcElement,!0)}}},{key:"setLastChosen",value:function setLastChosen(elem,turnback){var arr=[];arr.push(elem);this.lastChosen=arr;if(!0!==turnback){elem.style.color="var(--google-blue-700)"}else{elem.style.color="rgb(128, 152, 173)"}}},{key:"_getArticleContentLength",value:function _getArticleContentLength(article){return article.content.length}}],[{key:"template",get:function get(){return(0,_cmsLogin.html$1)(_templateObject5_e587609045c111e9bac3d12cb7c88f95())}},{key:"is",get:function get(){return"cms-article-list-type"}},{key:"properties",get:function get(){return{DBW:{type:Object,value:function value(){return new _cmsLogin.dataBaseworker},notify:!0},article:{type:Array,notify:!0},closed:{type:Boolean,notify:!0},categories:{type:Array,notify:!0,computed:"_getCatParents(article)"},types:{type:Array,notify:!0,value:["list","sub-category"]},image:{type:Object,notify:!0,observer:"sendImage"},sett:{type:Boolean,value:!1},confirm:{type:Boolean,notify:!0,value:!1},lastChosen:{type:Array,value:[]},scrollTo:{type:Number,observer:"scrollIt"}}}}]);return cmsArticleListType}(_cmsLogin.PolymerElement);customElements.define(cmsArticleListType.is,cmsArticleListType);var cmsArticlesViewer=function(_PolymerElement4){babelHelpers.inherits(cmsArticlesViewer,_PolymerElement4);function cmsArticlesViewer(){babelHelpers.classCallCheck(this,cmsArticlesViewer);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsArticlesViewer).apply(this,arguments))}babelHelpers.createClass(cmsArticlesViewer,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsArticlesViewer.prototype),"ready",this).call(this);this._getArticles();(0,_cmsLogin.scroll)({top:0,behavior:"silent"})}},{key:"log",value:function log(data){console.log("log from cms-article-viewer",data)}},{key:"error",value:function error(data){console.error("error from cms-article-viewer",data)}},{key:"_getArticles",value:function _getArticles(){var _this3=this;this.DBW.askAllArticles(function(data){_this3.articles=data;(0,_cmsLogin.scroll)({top:0,behavior:"silent"})})}},{key:"resetCollor",value:function resetCollor(data,element){if("newPage"===data){this.AskPages()}}},{key:"toggleLists",value:function toggleLists(){this.$.typer.classList.toggle("diferent")}},{key:"toggleCats",value:function toggleCats(){this.$.subCats.classList.toggle("diferent")}}],[{key:"template",get:function get(){return(0,_cmsLogin.html$1)(_templateObject6_e587609045c111e9bac3d12cb7c88f95())}},{key:"is",get:function get(){return"cms-articles-viewer"}},{key:"properties",get:function get(){return{DBW:{type:Object,value:function value(){return new _cmsLogin.dataBaseworker},notify:!0},articles:{type:Array,notify:!0},setter:{type:String,notify:!0,observer:"resetCollor"},closed:{type:Boolean,notify:!0},image:{type:Object,notify:!0,observer:"sendImage"},sett:{type:Boolean,value:!1},confirm:{type:Boolean,notify:!0,value:!1},lastChosen:{type:Array,value:[]}}}}]);return cmsArticlesViewer}(_cmsLogin.PolymerElement);customElements.define(cmsArticlesViewer.is,cmsArticlesViewer)});