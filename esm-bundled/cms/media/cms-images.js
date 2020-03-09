import{IronCheckedElementBehavior,mixinBehaviors,html,cmsMiddlePageTemplate,html$2 as html$1,render,cmsMediaLib}from"../cms-login.js";class cmsImages extends mixinBehaviors(IronCheckedElementBehavior,cmsMediaLib(cmsMiddlePageTemplate)){static get _topLabel(){return html`  
            <h3 class="higherh3 back-a-litle"> [[images]]</h3>       
            <h5 class="higherh5"> gallery - [[query.gallery]] </h5> 
        `}static get _getSilentAnchor(){return html`
        <a href="[[rootPath]]media/view-images/add-images[[addStr]]">
            <div class="add-btn-group" title="[[ADD]]">
                <div class="add-btn-group-item group-item-top-left" ></div>

                <div class="add-btn-group-item group-item-top-right"></div>

                <div class="add-btn-group-item group-item-bottom-left"></div>

                <div class="add-btn-group-item group-item-bottom-right"></div>
            </div> 
        </a>
        `}static get _getBottom(){return html`  
        <div class="count">
            <span> [[IMAGES.length]] </span>
        </div>                       
        <section class="flexchildbotom noFlex">
            <div class="center">   
                <h4>  [[Imag]]   </h4>     
            </div>  
        </section>

        <section class="flexchildbotom noFlex">
            <div class="center">   
                <h4> 
                [[title]]    </h4>     
            </div>  
        </section>
        <section class="flexchildbotom noFlex">
            <div class="center">   
                <h4> 
                [[dateCreated]]    </h4>     
            </div>  
        </section>
        <section class="flexchildbotom noFlex">
            <div class="center">   
                <h4> 
                [[TYPE]]    </h4>     
            </div>  
        </section>
        <section class="flexchildbotom noFlex">
            <div class="center">  
                <h4> 
                [[Gallery]]     </h4>     
            </div>  
        </section>
        <section class="flexchildbotom noFlex">
            <div class="center">  
                <h4> 
                [[AddedTo]]     </h4>     
            </div>  
        </section>
        <section class="flexchildbotom noFlex">
            <div class="center">  
                <h4> 
                [[url]]      </h4>     
            </div>  
        </section>
        <section class="flexchildbotom noFlex">
            <div class="center flex schooch">
                <paper-button class="smaller">
                    <input title="[[image.uploaded]]" type="checkbox" on-click="_selectAll" aria-label="check-all" checked="{{checked::checked}}">
                </paper-button>  
                <paper-button class="smaller" on-click="_saveAndBack">
                    [[delete]] 
                </paper-button>     
            </div>  
        </section>`}static get _getTable(){let template=html`
            <div table> 
                <dom-repeat repeat items="[[IMAGES]]" as="image">
                    <template>
                        <cms-image-item  
                            query="[[query]]"
                            image="[[image]]" 
                            checked="[[checked]]"
                            to-add="{{toAdd}}"
                            idx="[[index]]"
                        </cms-image-item>
                    </template>                            
                </dom-repeat>
            </div>`;return template}static get is(){return"cms-images"}static get properties(){return{route:{type:Object,notify:!0/* ignoreName */ /* skipSlots */},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},lang:{type:String,notify:!0},langs:{type:Object,value:{}},IMAGES:{type:Array,notify:!0,value:[]},addStr:{type:String,notify:!0,computed:"_computeUrl(IMAGES)"},toAdd:{type:Array,notify:!0,value:[]},checked:{type:Boolean,value:/* ignoreName */!1/* skipSlots */ /* skipSlots */,notify:!0},delete:{type:String,notify:!0,computed:"_setLabelDelete(addTo)"},addTo:{type:Boolean,value:!1,notify:!0},spinOut:{type:Boolean,value:!1}}}static get observers(){return["_routePageChanged(routeData.page, query)"]}ready(){super.ready();this.translator.target("cms-image","setLangObject",this._setLObj.bind(this));this.translator.target("cms-image","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-image","setLangObject")}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this)}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(page,query){this.IMAGES=[];this.addTo=!1;this.checked=!1;this.addStr=`?gallery=${this.query.gallery}&add=trueI&count=${this.IMAGES.length}`;const spinnerTemplate=()=>html$1`<paper-spinner-lite active="false" slot="spinner">`;render(spinnerTemplate(),this);if(!!page&&"view-images"===page){if(!!query.type){this.addTo=!0}if(!!query.gallery){this.gallery=query.gallery;this.getGalleryImages(this.gallery,`removed,==,false`)}}}_selectAll(){if(!1===this.checked){this.checked=!0;this.toAdd=this.IMAGES}else if(!0===this.checked){this.toAdd=[];this.checked=!1}else{throw"not the right type!! Expected Boolean got: "+typeof this.checked}}_saveAndBack(){if("page"===this.query.type){let string,storage;[string,storage]=generatePageData.call(this);localStorage[`${this.query.type}-${this.query.content}`]=storage;window.history.pushState({},null,string)}if("cats"===this.query.type){let string,storage;[string,storage]=generateCatsdata.call(this,this.query.name);localStorage[`${this.query.type}-${this.query.content}-${this.query.name}`]=storage;window.history.pushState({},null,string)}if("article"===this.query.type){let string,storage;[string,storage]=generateArticleData.call(this);localStorage[`${this.query.type}-${this.query.content}-media`]=storage;window.history.pushState({},null,string)}this.set("toAdd",void 0);setTimeout(()=>{this.set("toAdd",[]);this.set("IMAGES",[]);window.dispatchEvent(new CustomEvent("location-changed"))},250);return}_setLabelAdd(data){if(!0===data){return""}else{return"add"}}_setLabelDelete(data){if(!0===data){return"add"}else{return"delete"}}_computeUrl(IMAGES){const spinnerTemplate=()=>html$1``;render(spinnerTemplate(),this);return`${location.search.toString()}&count=${IMAGES.length}`}reset(){this.routeData.page="";this.slashed=!0;this.imageData=[]}}customElements.define(cmsImages.is,cmsImages);function*generateCatsdata(name){yield`/content/pages/edit-subcategory-pages?content=${this.query.content}&name=${name}&path=${this.query.path}&lang=${this.query.lang}&added=true&add=${this.query.add}&top=${this.query.top}&parent=${this.query.parent}`;let sendBackArray=JSON.parse(localStorage[`${this.query.type}-${this.query.content}-${name}`]),topush=sendBackArray[0].images.content;sendBackArray[0].images.content=topush.concat(this.toAdd);yield JSON.stringify(sendBackArray)}function*generatePageData(){yield`/content/pages/edit-category-pages?content=${this.query.content}&lang=${this.query.lang}&added=true&add=${this.query.add}`;let sendBackArray=JSON.parse(localStorage[`${this.query.type}-${this.query.content}`]),topush=sendBackArray[0].images.content;sendBackArray[0].images.content=topush.concat(this.toAdd);yield JSON.stringify(sendBackArray)}function*generateArticleData(){yield`/content/articles/edit-articles?content=${this.query.content}&lang=${this.query.lang}&added=true&add=${this.query.add}`;let sendBackArray=JSON.parse(localStorage[`${this.query.type}-${this.query.content}-media`]),topush=sendBackArray.images.content;sendBackArray.images.content=topush.concat(this.toAdd);yield JSON.stringify(sendBackArray)}