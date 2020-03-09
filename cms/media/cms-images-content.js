import{IronCheckedElementBehavior,mixinBehaviors,html,cmsContentTemplate,cmsMediaLib}from"../../src/cms-login.js";const ModeloInfo="W3siYWRkZWRUbyI6IiIsImF1dGhvciI6e30sImRhdGVDcmVhdGVkIjoiIiwiZnJvbURyb3BTaGlwIjoiIiwiZ2FsbGVyeSI6IiIsImdyb3VwIjoiICIsImlkIjoiIiwicmVtb3ZlZCI6IiIsInRpdGxlIjoiIiwidHlwZSI6IiIsInVybCI6IiJ9XQ==";class cmsImagesContent extends mixinBehaviors(IronCheckedElementBehavior,cmsMediaLib(cmsContentTemplate)){static get _getStyles(){return html`
            .langdivsectionnpaddingtop {
                display: block;
                padding-top: 6px;
                flex-basis: 15%;
                text-align: center;
                color: var(--app-content-section-span-color);
            }
            paper-button[langbtn] {
                background-color: var(--app-item-backgound-color);
                height: 30px;
                border-radius: 6px;
                width: 125px;
                padding-inline-start: 5px;
                padding-inline-end: 5px
            }
            div[langdiv]{
                height: 41px 
            }
            div[bottom] {
                flex-direction: column;
                padding-left: unset;
                padding: 6%;
                padding-top: 39px;
                height: 750px;;
            }
            .flexchildbotomFull{
                box-sizing: border-box;
                background-color: var(--app-item-backgound-color);
                border-radius: 10px;
                padding: 26px;
                cursor: pointer;
                flex: unset;
                width: auto;
                height: 345px;
                -webkit-transition: padding 0.5s ease-out;
                -moz-transition: padding 0.5s ease-out;
                transition: padding 0.5s ease-out;
            } 
            .flexchildbotomFull[hovered]{
                background-color: var(--app-item-backgound-color);
                padding: 35px; 
                transition: padding 0 ease 0.5;
            }
            .recorte{
                border-style: dashed;
                border-radius: 8px;
                border-color: var(--divider-color);
                height: 292px;
                padding: 69px;
                -webkit-transition: background-color 0.5s ease-in, height 0.5s ease-out;
                -moz-transition: background-color 0.5s ease-in, height 0.5s ease-out;
                transition: background-color 0.5s ease-in, height 0.5s ease-out;

            }
            .recorte[hovered]{
                background-color: #7d7d7d;
                height: 278px;
            }
            .recorte section{
                display: flex;
                flex-direction: column;
            }
            .recorte section aside{
                margin-left: auto;
                margin-right: auto;
            }
            iron-icon[icon="editor:space-bar"],
            iron-icon[icon="arrow-downward"],p {
                 color: var(--paper-grey-400);
                -webkit-transition: color 0.5s ease-in;
                -moz-transition: color 0.5s ease-in;
                transition: color 0.5s ease-in;
            }
            iron-icon[hovered][icon="editor:space-bar"],
            iron-icon[hovered][icon="arrow-downward"],p[hovered]{
                color: white
            } 
            iron-icon[icon="editor:space-bar"]{
                width: 95px;
                height: 84px;
                padding: unset;              
            }
            iron-icon[icon="arrow-downward"]{
                max-height: unset;
                height: 107px;
                width: 93px;
            }
            .upper{
                position: relative;
                top: -58px; 
            }
            div[imagearea]{
                flex-basis: auto;
                display: flex;
                flex-direction: row;
                flex-flow: wrap;
                padding: 10px;
                margin-bottom: 10px;
                background-color: #eaeaea;
                border-radius: 8px;
                overflow-y: auto;
                max-height: 200px;
                box-sizing: border-box;
                border: 1px solid var(--divider-color);
            }
            div[imagearea] div{
                box-sizing: border-box;
                flex-basis: auto;
                max-height: 60px;
                padding: 7px;
                margin-right: 8px;
                margin-bottom: 8px;
                border-radius: 4px;
            }
            div[imagearea] nav{
                display: flex;
            }

            div[imagearea] img{
                height: 48px;
            }   
            div[imagearea]::-webkit-scrollbar-track {
                background-color: #fff/*var(--app-scrollbar-color)*/
            }

            div[imagearea]::-webkit-scrollbar {
                width: 5px
            }

            div[imagearea]::-webkit-scrollbar-thumb {
                background-color: var(--divider-color)
            }         
            div[btngroup]{
                margin-bottom: 0px;
            }
            div[btngroup] nav{
                position: relative;
                top: 1px;
                display: flex;
                padding-left: 10px;
                color: var(--secondary-text-color);

            }
            div[btngroup] article{
                border-top-left-radius: 8px;
                border-top-right-radius: 8px;
                border-left: 1px solid var(--divider-color);
                border-right: 1px solid var(--divider-color);
                border-top-left-radius: 8px;
                text-align: center;
                border-width: thin;
                padding: 3px;
                flex-basis: 112px;
                background-color: var(--app-item-backgound-color);
                margin-right: 4px
            }
            .popout{
                display: none;
                flex-direction: row;
                position: absolute;
                left: 35%;
                border-width: unset!important;
                border-style: unset!important;
                box-shadow: unset!important;
                padding: 18px!important;
                letter-spacing: 2px;
                height: 50px;
                width: 15%;
                border-radius: 15px!important;
                background-color: rgba(198, 218, 252, 0.7686274509803922)!important;
                color: var(--app-backgound-color)!important;
            }
            h3{
                margin-block-start: -10px;  
            }
            h4{
                margin-block-start: -17.67px;  
            }
            h3, h4{
                color: var(--app-content-section-span-color);   
            }
            div[pop]{
                display: flex;
            }
            paper-button.nopadding{
                padding: unset; 
            } 
            .loaded{
                box-shadow: 1px 2px 3px var(--google-grey-700);
                background-color: var(--divider-color);
            }
            div[imagearea] div[title="uploaded"]{
                box-shadow: unset;
                background-color: var(--app-scrollbar-color);
            } 
            div[imagearea] input[title="uploaded"]{
                display: none
            }
            div[imagearea]  div[title="inBD"]{                
                box-shadow: 1px 1px 1px;
                background-color: var(--paper-green-200);  
            }
            div[imagearea] input[title="inBD"]{
                display: block;              
            }

            div[pop][title="uploading..."]{
                font-variant: all-petite-caps;
            }
            div[pop] h3[title="loading..."]{
                margin-block-start: -4px;
                display: block
            }
            div[pop] h4[title="loading..."]{
                display: none
            }
            div[pop] h3[title="uploading..."]{
                font-variant: all-petite-caps;
                margin-block-start: 4px;
                box-sizing: border-box;
                display: block;
                position: relative;
                top: -16px;
                background-color: transparent;
                border-radius: 7px;
                padding-left: 4px;
                padding-right: 4px;
                color: green;
            }
            div[pop] h4[title="uploading..."]{
                color: var(--paper-orange-a400);
                text-shadow: 1px 1px 1px var(--app-primary-color);
                margin-block-start: -17px;
                margin-inline-start: 4px;
                display: block;
            }
            .spanleft, .spanright  {
                display: none;
                font-size: 1.2em;
                font-variant: proportional-nums;
                flex-basis: 50%;
                font-weight: 700;
            }
            .spanright{
                color: var(--google-blue-500);
            }
            .spanleft{
                olor: var(--app-backgound-color);
                text-shadow: 2px 2px 2px var(--app-primary-color);
            }            
            div[pop] span[title="uploading..."]{
                display: block!important;
            }
            .counter{
                flex-basis: 60%;
                display: flex;
                flex-direction: row;
                padding-left: 20px;
            }
            .collorindex{
                position: relative;
                top: -22px;
                width: 100%;
                height: 20px;
            }
            .collorindex ul {
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                margin-block-start: 1px;
                width: 280px;
                float: right;
            }
            .collorindex ul li {
                flex-basis: 85px;
                font-size: 30px;
                margin-left: 10px;
            }
            .collorindex ul li span {
                position: relative;
                top: -6px;
                font-size: 11px!important;
                color: var(--paper-grey-600);
            }
            .inDB{
                color: var(--paper-green-200);
            }
            .uploaded{
                color: var(--google-blue-100);
            }
            .toupload{
                color: var(--divider-color);
            }
            cms-pop-input.abs2 {
                position: absolute;
                top: 173px;
                left: 39%;   
                --warningh5:{
                    color: var(--disabled-text-color);
                }
            }
            .color {
                color: var(--app-content-section-span-color); 
            }
            `}static get _getLangButton(){return html`
                  <cms-pop-input class="abs2" tgglelang="{{toggleStorage}}" warning="[[warn]]" warning-msg="[[warnMsg]]">
                        <paper-button slot="button" class="exex" on-click="_openStoragePath">
                            x
                        </paper-button> 
                        <cms-content-input
                            slot="input" 
                            item="[[storagePath]]"
                            res="{{addLangResponse}}">
                        </cms-content-input>  
                        <div slot="anchor">                            
                            <paper-button classs="color" on-click="getFilesFromStorage">
                                submit
                            </paper-button>
                        </div>
                  </cms-pop-input>`}static get _getXbutton(){return html` 
        <paper-button slot="button" class="exex" on-click="_addTitle">
            x
        </paper-button> 
         `}static get _getLangAnchor(){return html`   
                <section class="langdivsectionnpaddingtop">  
                    <paper-button langbtn aria-label="langbutton" on-click="_openFiles" title="browse pc">
                        browse pc
                    </paper-button>
                    <input hidden="true" type="file" id="imagefiles">
                </section>   
                <section class="langdivsectionnpaddingtop"> 
                        <paper-button langbtn aria-label="langbutton" on-click="_openStoragePath" title="firesotre storage/google cloud storage">
                           from storage
                        </paper-button>
                </section>   
                <section class="langdivsectionnpaddingtop">   
                        <paper-button langbtn aria-label="langbutton" title="faceboock, twitter, instagram etc..">
                           from social
                        </paper-button>
                </section>   
                <section class="langdivsectionnpaddingtop">  
                        <paper-button langbtn aria-label="langbutton" title="dropShiping">
                           from dropShiping
                        </paper-button>
                </section>`}static get _getContentItems(){return html`
        <div container>
            <div bottom>
                <div class="collorindex">
                    <ul>
                        <li class="inDB">
                            <span>
                                in storage 
                            </span>
                         </li>
                        <li class="uploaded">
                            <span>
                                uploaded
                            </span>
                        </li>
                        <li class="toupload"> 
                            <span>
                                to upload 
                            </span>
                        </li>
                    </ul>
                </div> 
                <nav>                
                    <div btngroup>
                        <nav>
                            <article>
                                <span>
                                    <paper-button on-click class="nopadding">
                                        remove
                                    </paper-button>        
                                </span>   
                            </article>
                            <article>
                                <span>
                                    <paper-button on-click="_upload" class="nopadding">
                                        upload
                                    </paper-button>                                    
                                </span>   
                            </article>
                            <article>
                                <span>
                                    <paper-button on-click="_cancel" class="nopadding">
                                        cancel
                                    </paper-button>                                    
                                </span>   
                            </article>
                        </nav>
                    </div> 

                    <div class="popout" title="[[popMsg]]" pop$="[[pop]]">
                        <div> 
                            <h3 title="[[popMsg]]"> 
                                    [[popMsg]]
                            </h3> 
                            <h4 title="[[popMsg]]"> 
                                    wait please
                            </h4>
                        </div> 
                        <div class="counter"> 
                            <span title="[[popMsg]]" class="spanleft">[[num]]</span>
                            <span title="[[popMsg]]" class="spanright"> [[totalCount]] </span>
                        </div> 
                    </div> 

                    <div imagearea>
                        <dom-repeat id="model"  repeat items="[[IMAGES]]" as="image">
                            <template>
                                <nav>
                                    <input title="[[image.uploaded]]" type="checkbox" on-click="_checkValidity">
                                    <div title="[[image.uploaded]]" class="loaded">
                                        <img src=[[image.localSource]] on-click="_addTitle"></img>
                                    </div>
                                </nav>
                            </template>
                        </dom-repeat>
                    </div>

                </nav>
                <div class="flexchildbotomFull" hovered$="[[hovered]]" on-mouseover="_hovered" on-mouseout="_unhovered" on-dragenter="_hovered"><!---->
                    <article class="recorte"  hovered$="[[hovered]]" on-dragover="_dropover" on-drop="_droped">
                        <section>
                            <aside>
                                <iron-icon icon="arrow-downward" hovered$="[[hovered]]">
                                </iron-icon>
                            </aside>
                            <aside class="upper">
                                <iron-icon icon="editor:space-bar" hovered$="[[hovered]]">
                                </iron-icon>
                            </aside>
                            <aside class="upper">
                                <p hovered$="[[hovered]]">arraste para aqui</p>
                            <aside>
                        </section>
                    </article>
                </div>
            </div>
        </div>
        `}static get is(){return"cms-images-content"}static get properties(){return{user:{type:Object},inputVal:{type:Array,notify:!0/* ignoreName */ /* skipSlots */,value:[]},textarea:{type:Boolean,value:!0,notify:!0},textareaVal:{type:String,notify:!0,value:""},imageArr:{type:Array,notify:!0,value:[]},itemsIn:{type:Boolean,value:/* ignoreName */!1/* skipSlots */ /* skipSlots */},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},lang:{type:String,notify:!0,value:""},langs:{type:Object,value:{}},ctnOpened:{type:Boolean,notify:!0},opened:{type:Boolean,notify:!0,observer:"_checkIfClose"},addLangResponse:{type:Object,notify:!0,value:{},observer:"_setAddLangValue"},addLangResponse:{type:Object,notify:!0,value:{},observer:"_setGetStorage"},itemlang:{type:Object,notify:!0,value:function(){return{addTitle:""}}},storagePath:{type:Object,notify:!0,value:function(){return{addPath:""}}},toggleStorage:{type:Boolean,notify:!0,value:!0},warnMsg:{type:String,notify:!0,value:`ex: 'gallery name' 'pages',\n 'gallery name/folder' 'pages/guitars'`},warn:{type:Boolean,notify:!0,value:!0},raised:{type:Boolean,notify:!0,value:!1},content:{type:Array,notify:!0,value:[]},Model:{type:Object,value:{}},IMAGES:{type:Array,notify:!0,value:[]},hovered:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},pop:{type:Boolean,value:!1,notify:!0,reflectToAttribute:!0},popMsg:{type:String,notify:!0,value:"loading..."},toUpload:{type:Array,value:[]},uploadedItems:{type:Array,value:[]},totalCount:{type:String,notify:!0,value:"0"},uploaded:{type:Boolean,value:!1,reflectToAttribute:!0},fromCheckBox:Boolean,num:{type:Number,value:0},imgSrc:String,langStr:String,time:Number}}static get observers(){return["_routePageChanged(route.path, query)"]}ready(){super.ready();this.translator.target("cms-page-list-type-content","setLangObject",this._setLObj.bind(this));this.translator.target("cms-page-list-type-content","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-page-list-type-content","setLangObject");window.addEventListener("reset",this._reset.bind(this));//  this.$.overlay.close()
}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_checkIfClose(data){if(!1===data&&!0===this.ctnOpened){this.$.closeanchor.click();this.ctnOpened=!1}}_routePageChanged(path,query){if(!path){if(!!this.ctnOpened){this.ctnOpened=!1;setTimeout(()=>{if(!!this.$.overlay.opened){this.$.overlay.close();this.ctnOpened=!1}},500)}}if(!!path){let arr=[];if(!!query.add){this.add="true"===query.add}this.closestr=`media/view-images?gallery=${this.query.gallery}&update=${this.query.gallery}&reset=false`;if("/add-images"===path){if(!this.$.overlay.opened){this.$.overlay.open();this.ctnOpened=!0}if(!0===this.add){localStorage[`images-${this.query.gallery}-new-content-info`]=atob(ModeloInfo);this._getPageInfo(`images-${this.query.gallery}-new-content-`);this.closestr=`media/view-images${location.search}`}}else{this.$.overlay.close()}if("/edit-images"===path){if(!!this.added){this.inform=[];this._getPageInfo(`images-new-content-`)}if(!!query.content){if(!!localStorage[`images-${query.content}-info`]){this._getPageInfo(`images-${query.content}-`);if(!1===this.add){this.set("inputVal",[]);this.set("str",`media/view-images/add-images${location.search}`)}}}}}/**/}/***** */_openStoragePath(){this.toggleStorage=!this.toggleStorage}_openFiles(){this.$.imagefiles.click();this.$.imagefiles.onchange=evt=>{this.handleFiles(evt.srcElement.files)}}handleFiles(files){let arr=this.IMAGES,time;this.pop=!0;this.itemsIn=!0;let count=parseInt(this.query.count);for(let i=0;i<files.length;i++){let file=files[i],imageType=/image.*/;if(!file.type.match(imageType)){continue}let reader=new FileReader,obj=JSON.parse(atob(ModeloInfo));obj[0].gallery=this.query.gallery;obj[0].title=file.name;obj[0].lastModifiedDate=file.lastModifiedDate;obj[0].type=file.type;obj[0].id=`image${count++}`;obj[0].file=file;obj[0].addedTo="N/Ad";reader.onload=evt=>{if("number"===typeof time)clearTimeout(time);obj[0].localSource=evt.target.result;arr.push(obj[0]);this.IMAGES=[];time=setTimeout(()=>{this.set("IMAGES",arr);this.pop=!1;clearTimeout(time)},500)};reader.readAsDataURL(file)}}_addTitle(evt){this.tgglelang=!this.tgglelang;if(!!evt.model){this.set("index",evt.model.__data.index);if(!!this.itemlang,evt.model.__data.image.title){this.itemlang={};this.itemlang={addTitle:evt.model.__data.image.title}}}}_setAddLangValue(data){if("number"===typeof this.time)clearTimeout(this.time);if(!!this.IMAGES&&!!this.IMAGES[this.index]&&!!data&&!1==="undefined"in data){if(data.addTitle!==void 0){this.time=setTimeout(()=>{this.IMAGES[this.index].title=data.addTitle},500)}}}_setGetStorage(data){if("number"===typeof this.time)clearTimeout(this.time);if(!!data&&!1==="undefined"in data){if(data.addPath!==void 0){this.time=setTimeout(()=>{this.Path=data.addPath},500)}}}_hovered(evt){evt.preventDefault();this.hovered=!0}_unhovered(evt){evt.preventDefault();this.hovered=!1}_dropover(evt){evt.preventDefault()}_droped(evt){evt.preventDefault();this.handleFiles(evt.dataTransfer.files)}_cancel(){this.IMAGES=[];this.uploadedItems=[]}onSave(){let data=new Date;if(0<this.uploadedItems.length){this.IMAGES=this._setInfo(this.removeInStorage(this.IMAGES),data);this.setGalleryImages()}}_setInfo(IMAGs,data){let objrr=IMAGs,IMAGES=objrr.map(image=>{let obj=image;obj.author.id=this.user.uid;obj.author.name=this.user.name;obj.removed=!1;obj.dateCreated=data.toLocaleString().replace(",","");let length=obj.addedTo.split(" ").length;if(0===length){obj.addedTo="N/A"}return obj});// if(IMAGs)
return IMAGES}removeInStorage(){let temparr=this.IMAGES;temparr=temparr.filter(item=>{if("inBD"!==item.uploaded)return item});temparr=temparr.map(image=>{delete image.localSource;delete image.file;return image});return temparr}_reset(){this._cancel()}}customElements.define(cmsImagesContent.is,cmsImagesContent);