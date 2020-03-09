import{html,cmsContentTemplate,cmsSubcatsLib}from"../cms-login.js";const Modelo="eyJpbWFnZXMiOnsiY29udGVudCI6W119LCJsYW5nIjp7ImNhdGVnb3J5TmFtZSI6IiIsImxhbmciOiIiLCJkZXNjcmlwdGlvbiI6IiIsInR5cGUiOiIifX0=",ModeloInfo="W3siYXV0aG9yIjp7InVpZCI6IiIsIm5hbWUiOiIifSwiY2hpbGRyZW4iOltdLCJkYXRlQ3JlYXRlZCI6IiIsImlkIjoiIiwibGFzdE1vZGlmaWVkIjpbXSwicGFyZW50IjoiIiwidG9BcnRpY2xlIjoiIiwidG9wIjoiIiwiY2hpbGRyZW5Db3VudCI6MCwicmVtb3ZlZCI6ZmFsc2UsInJlbW92ZWRDaGlsZHJlbiI6W119XQ==";class cmsSubcatsContent extends cmsSubcatsLib(cmsContentTemplate){static get _getPath(){return html`   
         <div class="path"> 
            <h5>[[_getpreaty(query.path)]] </h5>
        </div>`}static get _getSideInfo(){return html`
        <dom-repeat repeat items="[[inform]]" as="cat">
        no items here
            <template>
                <div class="center-menu">
                    <aside class="info">
                        <span>
                            [[info]]
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
                    <aside>
                        <span>
                            [[publishedby]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[publiShed]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datepublished]]
                        </span>
                    </aside>
                </div>
                <div class="center-menu">
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.Published.publishedBy]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc" published$="[[cat.Published.state]]">
                        <span>
                            [[cat.Published.state]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.Published.date]]
                        </span>
                    </aside>
                </div>

                <div class="row-menu">
                    <aside>
                        <span>
                            [[author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datecreated]]
                        </span>
                    </aside>
                </div>
                <div class="center-menu">
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.author.name]]
                        </span>
                    </aside>
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.dateCreated]]
                        </span>
                    </aside>
                </div>

                <div class="row-menu-especial">
                    <aside>
                        <span>
                        children Count 
                        </span>
                    </aside>
                </div>
                <div class="center-menu-especial">
                    <aside class="asideBackgrc">
                        <span>
                            [[cat.children.length]]
                        </span>
                    </aside>
                </div>

                <div class="center-menu">
                    <aside>
                        <span>
                            [[lastmodified]]
                        </span>
                    </aside>
                </div>
                <div class="row-menu">
                    <aside>
                        <span>
                            [[author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[date]]
                        </span>
                    </aside>
                </div>
                <div rightSide>
                    <dom-repeat repeat items="[[cat.lastModified]]" as="mod">
                        <template>
                            <section>
                                <aside class="asideBackgrc">
                                    <span>
                                        [[mod.author]]
                                    </span>
                                </aside>
                                <aside class="asideBackgrc">
                                    <span>
                                        [[mod.date]]
                                    </span>
                                </aside>
                            </section>
                        </template>
                    </dom-repeat>
                </div>
            </template>
        </dom-repeat>`}static get is(){return"cms-subcats-content"}static get properties(){return{user:{type:Object},inputVal:{type:Array,notify:!0/* ignoreName */ /* skipSlots */,value:[]},textarea:{type:Boolean,value:!0,notify:!0},textareaVal:{type:String,notify:!0,value:""},imageArr:{type:Array,notify:!0,value:[]},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},lang:{type:String,notify:!0,value:""},langs:{type:Object,value:{}},ctnOpened:{type:Boolean,notify:!0},opened:{type:Boolean,notify:!0,observer:"_checkIfClose"},addLangResponse:{type:Object,notify:!0,value:{},observer:"_setAddLangValue"},inputResponse:{type:Object,notify:!0,value:{},observer:"_setItemsValue"},textAreaResponse:{type:Object,notify:!0,value:{},observer:"_setContentTextValue"},content:{type:Object,notify:!0,value:{}},tocontent:{type:Object,notify:!0,value:{}},Model:{type:Object,value:{}},newlangstate:{Boolean,value:/* ignoreName */!1/* skipSlots */ /* skipSlots */},tgglelang:{type:Boolean,value:!0,notify:!0},time:Number}}static get observers(){return["_routePageChanged(route.path, query)"]}ready(){super.ready();this.translator.target("cms-page-list-type-content","setLangObject",this._setLObj.bind(this));this.translator.target("cms-page-list-type-content","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-page-list-type-content","setLangObject");// window.addEventListener('reset', (this.__reset).bind(this))
this.set("saveButton",this.$.saveButton);this.$.image.addImage=this.addImage.bind(this)}_setValues(data){this.set("temp",data);for(let par in data){this.set("itemText",data[par])}this._setLabels(data)}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_getpreaty(str){if(!!str){let STR=str.split("/");return STR.join(" - ")}}_checkIfClose(data){if(!1===data&&!0===this.ctnOpened){this.$.closeanchor.click();this.ctnOpened=!1}}_routePageChanged(path,query){if(!path){if(!!this.ctnOpened){this.ctnOpened=!1;setTimeout(()=>{if(!!this.$.overlay.opened){this.$.overlay.close();this.ctnOpened=!1}},500)}}if(!!path){this.__reset();this.scrollTo(0,0);this.add=this.query.adTosub;let parentName=query.content,parentIndex=query.parent;this.set("parentName",parentName);let indexArr=!1===!!this.query.indexarr?parentIndex:this.query.indexarr;this.set("_indexArr",indexArr);if(!!query.add){this.add="true"===query.add;this.parent=parseInt(this.query.parent)}if(!!query.added){this.added="true"===query.added;this.parent=parseInt(this.query.parent)}this.closestr="new-content"===this.query.content?`content/pages/subcategory-pages?content=${this.query.content}`:`content/pages/subcategory-pages?content=${this.query.content}&update=${this.query.name}&reset=false`;if("/add-subcategory-pages"===path||"/edit-subcategory-pages"===path){if(!this.$.overlay.opened){this.$.overlay.open();this.ctnOpened=!0}if("/add-subcategory-pages"===path){this._setAddedContent(query)}if("/edit-subcategory-pages"===path){if(!!query.name){this._setEditContent(query)}}}else{this.ctnOpened=!1;this.$.overlay.close()}}}addImage(){if(!1===this.add){let string=`type=cats&content=${this.inform[0].parent}&name=${this.inform[0].id}&lang=${this.query.lang}&path=${this.inform[0].path}&add=${this.add}&top=${this.query.top}&parent=${this.query.parent}`;localStorage.setItem(`cats-${this.inform[0].parent}-${this.inform[0].id}`,JSON.stringify(this.content));window.history.pushState({},null,`${this.rootPath}media/galleries?${string}`);window.dispatchEvent(new CustomEvent("location-changed"))}else{let parent=parseInt(this.query.name),string=`type=cats&content=${this.query.content}&name=${this.query.name}&lang=lang&path=${this.query.path}&add=${this.add}&top=${this.query.top}&parent=${this.query.parent}`;localStorage.setItem(`cats-${this.query.content}-${parent}`,JSON.stringify(this.content));window.history.pushState({},null,`${this.rootPath}media/galleries?${string}`);window.dispatchEvent(new CustomEvent("location-changed"))}window.onbeforeunload=function(e){return""}}_setAddedContent(query){if(!0===this.add){if("number"===typeof this.time)clearTimeout(this.time);this.__reset();let cont=JSON.parse(atob(Modelo)),obj=cont.images.content,parent=parseInt(this.query.name);localStorage.setItem(`cats-${this.query.content}-${parent}-info`,atob(ModeloInfo));this.imageLabel="images";this.set("imageArr",obj);this.set("str",`content/pages/add-subcategory-pages?content=${this.query.content}`);this._setContent("lang",[cont]);this.set("pageLangs",[]);this._getPageInfo(`cats-${query.content}-${parent}-`)}}_setEditContent(query){let strg=location.search;strg=strg.split("lang=")[0];this.set("str",`content/pages/edit-subcategory-pages${strg}lang=`);this.imageLabel="images";let arr,cont,images;if(!1===this.add||!0===this.added){[arr,cont,images]=generateData.call(this,query);this.set("imageArr",images);if(!!query.lang){if("lang"!==query.lang)this.set("pageLangs",arr);this.__setLAng(query.lang,cont)}}}onSave(){if(!!this.newlangstate){this.add=!0}let top="true"===this.query.top,data=new Date,inform,parentInfo=!1===top?JSON.parse(localStorage[`cats-${this.query.content}-${this.query.parent}-info`]):void 0;inform=this.inform.pop();let noLang=this._lastModified(this._setInfo(inform,data,parentInfo),data);if(!!noLang)return;if(!this.removelang){this.saveSubcats()}else{this.removeSubcatsLang()}}_lastModified(inform,data){if(!inform)return 1;if(!0===this.add)inform.lastModified.push({uid:this.user.uid,author:this.user.name,date:data.toLocaleString().replace(",","")});this.inform=[inform]}_setInfo(inform,data,parentInfo){let top="true"===this.query.top;if(!this.newlangstate){if(!0===this.add){if(!this.content[0].lang.lang){alert("insert lang first");return void 0}this.content[0][this.content[0].lang.lang]=this.content[0].lang;let lang=[this.content[0].lang.lang];lang=lang.pop();delete this.content[0].lang;inform.ref=btoa(this.query.content)+"-"+btoa(Math.ceil(1e4*Math.random(Math.ceil(20*Math.random())))+Math.ceil(1e4*Math.random(Math.ceil(30*Math.random()))));inform.Published={};inform.Published.date="NP";inform.Published.publishedBy="N/A";inform.Published.state="NP";inform.Published.unPublishedBy="N/A";inform.author.uid=this.user.uid;inform.author.name=this.user.name;inform.parent=this.query.content;inform.id=this.query.name;inform.removed=!1;inform.path=`${this.query.path}/${this.content[0][lang].categoryName.toLowerCase()}`;inform.toArticle="B";inform.top=top;inform.dateCreated=data.toLocaleString().replace(",","");if(!!parentInfo){parentInfo[0].children=[];parentInfo[0].children.push(inform.id);parentInfo[0].childrenCount=inform.children.length;this.updateSubcatParentInfo(parentInfo[0],this.query.content,this.query.parent)}}}return inform}__reset(){this.imageLabel="";this.set("content",[]);this.set("imageArr",[]);this.set("inform",[]);this.set("inputVal",[]);this.set("textareaVal",[])}}customElements.define(cmsSubcatsContent.is,cmsSubcatsContent);function*generateData(query){let cont=JSON.parse(localStorage[`cats-${query.content}-${query.name}`]);yield this._setLangArr(cont[0]);yield cont;this._getPageInfo(`cats-${query.content}-${query.name}-`);yield cont[0].images.content}