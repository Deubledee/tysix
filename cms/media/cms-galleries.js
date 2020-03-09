import{html,cmsMiddlePageTemplate,cmsMediaLib,html$2 as html$1,render}from"../../src/cms-login.js";class cmsGalleries extends cmsMediaLib(cmsMiddlePageTemplate){static get _getStyles(){return html`
        :host{
            position: relative,
        }
       /* ::slotted(*){
            background-color: red
        }
        ::slotted(cms-gallery-item){
            background-color: blue;            
        }*/
        div[path]{
            height: 30px;
            width: 300px;
        }
        div[path]{
            display: flex;
            flex-direction: row;
            position: relative;
            font-style: italic;    
            padding-left: 57px;
            color: var(--app-content-section-span-color)    
        }
        div[path] h5 {
            margin-block-start: 12px;
            margin-block-end: 7px;
        }
        div[path] h6 {
            margin-block-start: 12px;
            margin-block-end: 7px;
            color: var(--paper-blue-a200); 
        }
        .xbuton{
            cursor: pointer;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            padding-top: 2px;
        }  
        paper-button.save-btn, .save-btn {
            color: var(--google-blue-300);
            height: 30px; 
        }
        .warning-color-2{
            color: green
        }
        `}static get _topLabel(){return html`       
            <h2>[[Galleries]]</h2>    
            <div path>
                <!--cms-pop-input tgglelang="{{tgglelang}}" warning="[[warning]]" warning-msg="[[warningMsg]]"> 
                    <paper-button slot="button" class="exex" on-click="_newGall">
                        x
                    </paper-button> 
                    <cms-content-input
                        slot="input" 
                        item="[[itemlang]]"
                        res="{{addLangResponse}}"
                        raised="[[raised]]">
                    </cms-content-input>  
                    <paper-button class="save-btn"  slot="anchor" on-click="_onSave">
                        <h6 id="agasix" class="save-btn" >  save </h6> 
                    </paper-button>                                              
                </cms-pop-input-->           
            </div>`}static get _getSilentAnchor(){return html`            
        <a on-click="_newGall">
            <div class="add-btn-group" title="[[ADD]]">
                <div class="add-btn-group-item group-item-top-left" ></div>

                <div class="add-btn-group-item group-item-top-right"></div>

                <div class="add-btn-group-item group-item-bottom-left"></div>

                <div class="add-btn-group-item group-item-bottom-right"></div>
            </div> 
        </a>
        `}static get _getTable(){return html`
        <dom-repeat items="[[galleries]]" as="gallery">
            <template>
                <slot name="item[[index]]"></slot>
            </template>
        </dom-repeat>
        `}static get _getBottom(){return html`       
        <div class="count">
            <span> [[galleries.length]] </span>
        </div>
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[Gallery]]  [[viewEdit]]</h4>
            </div>
        </section>     
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[viewEdit]] images </h4>
            </div>
        </section> 
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[viewEdit]] Groups </h4>
            </div>
        </section>                       
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[remove]] </h4>
            </div>
        </section>  
        `}static get is(){return"cms-galleries"}static get properties(){return{route:{type:Object,notify:!0/* ignoreName */ /* skipSlots */},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];// MyAppGlobals.translator
}},user:{type:Object,notify:!0},lang:{type:String,observer:"__changeLang"},langs:{type:Object,value:{}},addLangResponse:{type:Object,notify:!0,value:{},observer:"_setAddLangValue"},itemlang:{type:Object,notify:!0,value:function(){return{addGall:""}}},warning:{type:Boolean,notify:!0,value:!0},returnPath:{type:String,notify:!0},method:{type:String,notify:!0},contentto:{type:Object,notify:!0},add:{type:Boolean,notify:!0},images:{type:Array,notify:!0},gall:{type:String,notify:!0,value:""},newGall:{type:String,notify:!0,value:""},galleries:{type:Array,notify:!0,observer:"putElement"},tgglelang:{type:Boolean,value:!0,notify:!0},spinOut:{type:Boolean,value:/* ignoreName */!1/* skipSlots */ /* skipSlots */},sloted:{type:Boolean,value:!1},raised:{type:Boolean,notify:!0,value:!1}}}static get observers(){return["_routePageChanged(routeData, query, active)"]}ready(){super.ready();const spinnerTemplate=()=>html$1`<paper-spinner-lite active="false" slot="spinner">`;render(spinnerTemplate(),this);this.translator.target("cms-galleries","setLangObject",this._setLObj.bind(this));this.translator.target("cms-galleries","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-galleries","setLangObject")}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(routeData,query){if(-1!==["galleries"].indexOf(routeData.page)||"true"===query.reset){this._getGalleries({q:"removed",v:!1})}}_setAddLangValue(data){if("number"===typeof this.time)clearTimeout(this.time);if(!!data&&!("undefined"in data)){this.time=setTimeout(()=>{this.gall=data.addGall},500)}}_newGall(){this.tgglelang=!this.tgglelang;if(this.tgglelang){this.warningMsg=""}}_onSave(){let count=this.gall.split("").length;if(0<count){let data=new Date,inform={};this._lastModified(this._setInfo(inform,data),data);this._setGallery()}else{this.warningMsg="character count cannot be zero \"0\"";setTimeout(()=>{this.warningMsg=""},1500)}}_lastModified(inform,data){inform.lastModified=[];inform.lastModified.push({uid:this.user.uid,author:this.user.name,date:data.toLocaleString().replace(",","")});this.newGall=inform}_setInfo(inform,data){inform.author={};inform.id=this.gall;inform.type="gallerie";inform.author.id=this.user.uid;inform.author.name=this.user.name;inform.removed=!1;inform.dateCreated=data.toLocaleString().replace(",","");return inform}putElement(data){if("number"===typeof this.time)clearInterval(this.time);this.time=setTimeout(()=>{const pageTemplate=galleries=>html$1`${galleries.map((gallery,idx)=>{return html$1`<cms-gallery-item slot="item${idx}" .gallery="${gallery}"> 
                                   </cms-gallery-item>`})} `;render(pageTemplate(data),this)},60)}log(data){console.log(data)}}customElements.define(cmsGalleries.is,cmsGalleries);