import{cmsContentTemplate,html,cmscategoriesLib,cmsArticlesLib,cmsDropdownMenuTemplate}from"../../src/cms-login.js";class cmsDropdownMenu extends cmsDropdownMenuTemplate{static get is(){return"cms-dropdown-menu"}static get properties(){return{lang:{type:String,notify:!0/* ignoreName */ /* skipSlots */},langs:{type:Object,value:{}},items:{type:Array,notify:!0,observer:"__setValues"},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms]}}}}_log(data){console.log(data)}ready(){super.ready();this.translator.target("cms-content-item","setLangObject",this._setLObj.bind(this));this.translator.target("cms-content-item","changeLang",this._setLang.bind(this),!0);this.translator.shoot("cms-content-item","setLangObject")}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this,this.itemLabel,"title");res.call(this,"cancel","cancel")}__changeLang(){this.lang=this.translator.lang;this.translator.changeItemTitleLang.call(this,this.itemLabel,"title");this.translator.changeItemTitleLang.call(this,"cancel","cancel")}setValues(data){console.log(data);if(!!data){let obj=data;this.list=data.items;Reflect.deleteProperty(obj,"items");this._setValues(obj);this.__changeLang()}}_setValues(data){this.temp=this.item;for(let par in data){this.set("itemText",data[par])}this._setLabels(data)}}customElements.define(cmsDropdownMenu.is,cmsDropdownMenu);var cmsDropdownMenu$1={cmsDropdownMenu:cmsDropdownMenu};const Modelo="eyJpbWFnZXMiOnsiY29udGVudCI6W119LCJsYW5nIjp7ImFydGljbGVOYW1lIjoiIiwibGFuZyI6IiIsImRlc2NyaXB0aW9uIjoiIiwidHlwZSI6IiJ9fQ==",ModeloInfo="eyJQdWJsaXNoZWQiOiIiLCJSRUYiOiIiLCJTS0EiOiIiLCJhZGRlZEJ5IjoiIiwiYWRkZWREYXRlIjoiIiwiYnJhbmRNYW51ZmFjcnVyZXIiOiIiLCJjYXRlZ29yaWVzIjpbXSwiZGltZW50aW9ucyI6IiIsImtleXdvcmRzIjpbXSwibGFzdE1vZGlmZWlkIjpbXSwicHJpY2UiOiIiLCJwcm9tb3Rpb25Db2RlIjoiIiwicmVtb3ZlZCI6ZmFsc2UsInJldGFpbGVyIjoiIiwic2hpcHBpbmciOiIiLCJzaGlwcGluZ1RheCI6IiIsInN0b2NrIjoiIiwic3RvcmVXYXJyYW50eSI6IiIsInRheCI6IiIsIndlaWdodCI6IiJ9";class cmsArticleContent extends cmscategoriesLib(cmsArticlesLib(cmsContentTemplate)){static get _getStyles(){return html`
        div[placerbottom] {
            overflow: auto;
        }
        .row-layout{
            flex-direction: row!important;
            flex-flow: wrap;
            flex-basis: 99%!important;
        }
        .flexchild-article {
            flex-basis: 24%;
            margin-block-end: 40px;
            margin-inline-end: 120px;
        }
        `}static get _getAnchor(){return html`
        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a id="anchora" on-click="reset">
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
        </iron-selector>
        `}static get _getContentItems(){return html`
        <div bottom on-click="_seeFlat">
            <article>
                <dom-repeat repeat items="[[inputVal]]" as="item">
                    <template>
                        <section class="flexchildbotomFull">
                            <cms-content-input info="*" editing="[[editing]]" item="[[item]]"
                                res="{{inputResponse}}">
                            </cms-content-input>
                        </section>
                    </template>
                </dom-repeat>
            </article>
            <article>
                <dom-repeat repeat items="[[textareaVal]]" as="item">
                    <template>
                        <section class="flexchildbotomFullExtra">
                            <cms-content-textarea info="*" editing="[[editing]]" item="[[item]]"
                                res="{{textAreaResponse}}">
                            </cms-content-textarea>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>

        <div bottom on-click="_seeFlat">
            <article class="row-layout" on-click="_seeFlat">
                <dom-repeat repeat items="[[dtDetails]]" as="item">
                    <template>
                        <section on-click="_seeFlat" class="flexchildbotomFull flexchild-article">
                            <cms-content-input editing="[[editing]]" item="[[item]]"
                                res="{{ifResponse}}">
                            </cms-content-input>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>
        
        <div bottom imageplacer>
            <section class="flexchildbotom">
                <cms-content-image id="image" editing="[[editing]]" item-label="[[imageLabel]]" images="[[imageArr]]" _deleteImg="[[deleteImg]]">
                </cms-content-image>
            </section>
        </div>

        <div bottom>     
            <cms-dropdown-menu 
                items="[[categories]]"  
                horizontal-align="left" 
                vertical-align="top" 
                scroll-action="refit"
                res="{{catResponse}}">            
            </cms-dropdown-menu>       
        </div>

        <div bottom on-click="_seeFlat">
            <article class="row-layout" on-click="_seeFlat">
                <dom-repeat repeat items="[[phDetails]]" as="item">
                    <template>
                        <section on-click="_seeFlat" class="flexchildbotomFull flexchild-article">
                            <cms-content-input editing="[[editing]]" item="[[item]]"
                                res="{{ifResponse}}">
                            </cms-content-input>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>

        <div bottom on-click="_seeFlat">
            <article class="row-layout" on-click="_seeFlat">
                <dom-repeat repeat items="[[infoVals]]" as="item">
                    <template>
                        <section on-click="_seeFlat" class="flexchildbotomFull flexchild-article">
                            <cms-content-input editing="[[editing]]" item="[[item]]"
                                res="{{ifResponse}}">
                            </cms-content-input>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>

        <div bottom on-click="_seeFlat">
            <article class="row-layout" on-click="_seeFlat">
                <dom-repeat repeat items="[[shDetails]]" as="item">
                    <template>
                        <section on-click="_seeFlat" class="flexchildbotomFull flexchild-article">
                            <cms-content-input editing="[[editing]]" item="[[item]]"
                                res="{{ifResponse}}">
                            </cms-content-input>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>

        <div bottom on-click="_seeFlat">
            <article on-click="_seeFlat">
                <dom-repeat repeat items="[[keywords]]" as="item">
                    <template>
                        <section on-click="_seeFlat" class="flexchildbotomFull">
                            <cms-content-textarea info="* separete with commas" editing="[[editing]]" item="[[item]]"
                                res="{{kwResponse}}">
                            </cms-content-textarea>
                        </section>
                    </template>
                </dom-repeat>
            </article>
        </div>`}static get is(){return"cms-article-content"}static get properties(){return{user:{type:Object},inputVal:{type:Array,notify:!0,value:[]},textareaVal:{type:Array,notify:!0,value:""},infoVals:{type:Array,notify:!0,value:[]},dtDetails:{type:Array,notify:!0,value:[]},phDetails:{type:Array,notify:!0,value:[]},shDetails:{type:Array,notify:!0,value:""},keywords:{type:Array,notify:!0,value:[]},category:{type:Array,notify:!0,value:""},imageArr:{type:Array,notify:!0,value:[]},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},lang:{type:String,notify:!0,value:""},langs:{type:Object,value:{}},ctnOpened:{type:Boolean,notify:!0},opened:{type:Boolean,notify:!0,observer:"_checkIfClose"},getdown:{type:Boolean,reflectToAttribute:!0,notify:!0,value:/* ignoreName */!1/* skipSlots */ /* skipSlots */},addLangResponse:{type:Object,notify:!0,value:{},observer:"_setAddLangValue"},inputResponse:{type:Object,notify:!0,value:{},observer:"_setItemsValue"},textAreaResponse:{type:Object,notify:!0,value:{},observer:"_setContentTextValue"},ifResponse:{type:Object,notify:!0,value:{},observer:"_setInfomr"},catResponse:{type:Object,notify:!0,value:{},observer:"_setInfomrCat"},kwResponse:{type:Object,notify:!0,value:{},observer:"_setInfomrKw"},content:{type:Object,notify:!0,value:{}},tempCategory:{type:String},langStr:String,time:Number}}static get observers(){return["_routePageChanged(route.path, query)"]}ready(){super.ready();this.translator.target("cms-page-list-type-content","setLangObject",this._setLObj.bind(this));this.translator.target("cms-page-list-type-content","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-page-list-type-content","setLangObject");this.$.image.addImage=this.addImage.bind(this)}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_checkLabel(){if(!0===this.add){this.translator.changeItemTitleLang.call(this,"addPage","navLabel")}else{this.translator.changeItemTitleLang.call(this,"editPage","navLabel")}}_checkIfClose(data){if(!1===data&&!0===this.ctnOpened){this.$.closeanchor.click();this.ctnOpened=!1}}_routePageChanged(path,query){if(!path){if(!!this.ctnOpened){this.ctnOpened=!1;setTimeout(()=>{if(!!this.$.overlay.opened){this.$.overlay.close();this.ctnOpened=!1}},500)}}if(!!path){this._reset();this.scrollTo(0,0);if(!!query.add){this.add="true"===query.add}if(!!query.added){this.added="true"===query.added}if("/add-articles"===path||"/edit-articles"===path){if(!this.$.overlay.opened){this.$.overlay.open();this.ctnOpened=!0}if(!!this.langs[this.lang])this._checkLabel();this.closestr="content/articles?reset=false";if("/add-articles"===path){this._setAddedContent();return 0}if("/edit-articles"===path){if(!!query.content){this._setEditContent(query);return 0}}}else{this.$.overlay.close()}}}_setAllInfo(urlstring,media,infoVals,phDetails,shDetails,dtDetails,categories,keywords,images){this.set("str",`content/articles/edit-articles${urlstring}lang=`);this.set("media",media);this.set("imageArr","images"in this.media?this.media.images.content:[]);this.set("infoVals",this._getObjArr(infoVals,!0));this.set("phDetails",this._getObjArr(phDetails,!0));this.set("shDetails",this._getObjArr(shDetails,!0));this.set("dtDetails",this._getObjArr(dtDetails,!0));this._getCatArr(categories);this.set("keywords",[{keywords:keywords.keywords.join(", ")}]);this.imageLabel=images}_getCatArr(categories){this.getCategories({q:"removed",v:!1}).then(data=>{categories.items=[];data.forEach(item=>{categories.items.push(item.data().id)});this.set("categories",categories)}).catch(error=>{console.log(error)})}_setAddedContent(){let infoVals,media,images,urlstring,phDetails,shDetails,dtDetails,keywords,category;[media,infoVals,images,urlstring,phDetails,shDetails,dtDetails,keywords,category]=generateAddData.call(this);this._setAllInfo(urlstring,media,infoVals,phDetails,shDetails,dtDetails,category,keywords,images)}_setEditContent(query){let arr=[],infoVals,cont,media,images,urlstring,phDetails,shDetails,dtDetails,keywords,category;[cont,media,infoVals,images,urlstring,phDetails,shDetails,dtDetails,keywords,category]=generateEditData.call(this,query);this._setAllInfo(urlstring,media,infoVals,phDetails,shDetails,dtDetails,category,keywords,images);if(!!query.lang){if("lang"!==query.lang){arr=this._setLangArr(cont);this.set("pageLangs",arr)}this.__setLAng(query.lang,[cont])}}__setStorage(){localStorage[`article-${this.query.content}-data`]=JSON.stringify(this.content[0])}addImage(){if(!1===this.add){localStorage[`article-${this.query.content}-media`]=JSON.stringify(this.media);let string=`type=article&content=${this.query.content}&lang=${this.query.lang}&add=${this.add}`;window.history.pushState({},null,`${this.rootPath}media/galleries?${string}`);window.dispatchEvent(new CustomEvent("location-changed"))}else{localStorage[`article-new-content-media`]=JSON.stringify(this.media);let string=`type=article&content=new-content&lang=lang&add=${this.add}`;window.history.pushState({},null,`${this.rootPath}media/galleries?${string}`);window.dispatchEvent(new CustomEvent("location-changed"))}window.onbeforeunload=function(e){return"you might have changes to be saved, are you sure you whant to leave?"}}onSave(){if(!1===this.add){this.getArticleData(this.inform.id,"info").then(this._save.bind(this)).catch(err=>console.log(err))}else{this._save(void 0)}}_save(item){let obj={addedBy:"",addedDate:"",lastModifeid:[]},Cont=!!item&&!!item.data?item.data:obj;this.INFO=this._lastModified(Cont);if(!!this.removelang){this._removeLang();return}if(!this._setAndCheckDataBeforeSave(this.inform))this.add=!0;this.newlangstate=!this.newlangstate;this.saveArticles();return}_lastModified(ifo){let INFO=ifo,data=new Date;if(!0===this.add){INFO.addedBy=this.user.name;INFO.addedDate=data}INFO.lastModifeid.push({author:this.user.name,date:data.toLocaleString().replace(",",""),uid:this.user.uid});return INFO}_setAndCheckDataBeforeSave(){if(!this.newlangstate){if(!!this.tempCategory){this.inform.categories.push(this.tempCategory);this.tempCategory=void 0}for(let par in this.media){this.content[0][par]=this.media[par]}if(!0===this.add){if(!this.content[0].lang.lang&&!this.content[0].lang.articleName){return!1}this.content[0][this.content[0].lang.lang]=this.content[0].lang;this.inform.id=this.content[0][this.content[0].lang.lang].articleName.split(" ").join("_").toLowerCase();delete this.content[0].lang;this.inform.removed=!1;this.inform.Published="NP";return!0}return!0}return!1}_reset(){this.set("content",[]);this.set("imageArr",[]);this.set("inputVal","");this.set("infoVals",[]);this.set("media",[]);this.set("dtDetails",[]);this.set("category",[]);this.set("phDetails",[]);this.set("shDetails",[]);this.set("keywords",[]);this.set("textareaVal",[]);this.set("inform",[]);this.newlangstate=!1}}customElements.define(cmsArticleContent.is,cmsArticleContent);function*generateAddData(){let cont=JSON.parse(atob(Modelo));localStorage[`article-new-content-info`]=atob(ModeloInfo);let obj=cont.images.content;this._setContent("lang",[cont]);let strg=location.search;strg=strg.split("lang=")[0];this.set("pageLangs",[]);//  yield cont
yield obj;this._getPageInfo(`article-new-content-`);yield _getInforDetails(this.inform);yield"images";yield strg;yield _getPhysicalDetails(this.inform);yield _getShippingDEtails(this.inform);yield _getDetails(this.inform);yield _getKeywords(this.inform);yield _getCatDetails(this.inform)}function*generateEditData(query){yield JSON.parse(localStorage[`article-${query.content}-data`]);yield JSON.parse(localStorage[`article-${query.content}-media`]);this._getPageInfo(`article-${query.content}-`);yield _getInforDetails(this.inform);yield"images";let strg=location.search;strg=strg.split("lang=")[0];yield strg;yield _getPhysicalDetails(this.inform);yield _getShippingDEtails(this.inform);yield _getDetails(this.inform);yield _getKeywords(this.inform);yield _getCatDetails(this.inform)}function _getInforDetails(details){let infoVals={};for(let par in details){if("REF"===par||"SKA"===par||"brandManufacturer"===par||"promotionCode"===par||"retailer"===par||"storeWarranty"===par){infoVals[par]=details[par]}}return infoVals}function _getPhysicalDetails(details){let phDetails={};for(let par in details){if("dimentions"===par||"weight"===par){phDetails[par]=details[par]}}return phDetails}function _getShippingDEtails(details){let shDEtails={};for(let par in details){if("shipping"===par||"shippingTax"===par){shDEtails[par]=details[par]}}return shDEtails}function _getDetails(details){let dtDetails={};for(let par in details){if("price"===par||"stock"===par||"tax"===par){dtDetails[par]=details[par]}}return dtDetails}function _getCatDetails(details){let catDetails={categories:details.categories};return catDetails}function _getKeywords(details){let keywords={};for(let par in details){if("keywords"===par){keywords[par]=details[par]}}return keywords}export{cmsDropdownMenu$1 as $cmsDropdownMenu,cmsDropdownMenu};