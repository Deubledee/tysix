import{afterNextRender,html,html$2 as html$1,render,cmsMiddlePageTemplate,request}from"../cms-login.js";class cmsProjects extends cmsMiddlePageTemplate{static get _getSilentAnchor(){return html`            
        <a href="[[rootPath]]settings/projects/add-project?&add=true">
            <div class="add-btn-group" title="[[ADD]]">
                <div class="add-btn-group-item group-item-top-left" ></div>

                <div class="add-btn-group-item group-item-top-right"></div>

                <div class="add-btn-group-item group-item-bottom-left"></div>

                <div class="add-btn-group-item group-item-bottom-right"></div>
            </div>
        </a>
        `}static get _topLabel(){return html`       
            <h3 class="higherh3">Projects</h3>       
            <h5 class="higherh5"> Active - [[appName]]  </h5> 
        `}static get is(){return"cms-projects"}static get properties(){return{lang:{type:String,observer:"__changeLang"},langs:{type:Object,value:{}},appName:{type:String,value:function(){return firebase.app().name}},translator:{type:Object,notify:!0/* ignoreName */ /* skipSlots */,value:function(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},pages:{type:Array,notify:!0,value:[],observer:"putElement"},spinner:{type:Object,value:function(){return document.querySelector("#spinner")}}}}connectedCallback(){super.connectedCallback()}disconnectedCallback(){super.disconnectedCallback();//this._observer.disconnect();
}static get observers(){return["_routePageChanged(routeData, query)"]}ready(){super.ready();this.spinner.active=!0;this.translator.target("cms-page-list-type","setLangObject",this._setLObj.bind(this));this.translator.target("cms-page-list-type","changeLang",this._setLang.bind(this),/* ignoreName */!1/* skipSlots */ /* skipSlots */);this.translator.shoot("cms-page-list-type","setLangObject")}_setLang(res,lang){this.lang=lang;res.call(this)}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this)}_routePageChanged(routeData,query){if("number"===typeof this.time)clearInterval(this.time);let reset="true"===query.reset;if(!query.reset){if("projects"===routeData.page){this.time=setTimeout(()=>{if(0===this.pages.length){// let projs = getProjects()
afterNextRender(this,()=>{//  projs.then(response => console.log(response))
this.spinner.active=!1})}},120)}}/*else if (reset === true) {
        this.pages = [];
        this._contentChanged()
      }*/}_contentChanged(){if("number"===typeof this.time)clearTimeout(this.time);const spinnerTemplate=()=>html$1`<paper-spinner-lite active="false" slot="spinner">`;render(spinnerTemplate(),this);if("pages"===this.routeData.page&&"/pages"===this.route.path){this.time=setTimeout(()=>{window.history.pushState({},null,`${this.rootPath}content/pages`);window.dispatchEvent(new CustomEvent("location-changed"))},500)}else{this.pages=[]}}_setAll(response){let arr=[];this.pages=[];for(let i=0;i<response.length;i++){if(!!response[i].id){let datarr=response[i].data();arr.push(datarr)}}this.set("pages",arr)}putElement(data){if("number"===typeof this.time)clearInterval(this.time);this.time=setTimeout(()=>{const pageTemplate=pages=>html$1`${pages.map((article,idx)=>{return html$1`<cms-page-list-item slot="item${idx}" .page="${article}">
                        </cms-page-list-item>`})} `;render(pageTemplate(data),this)},60)}}customElements.define(cmsProjects.is,cmsProjects);async function getProjects(){let proj;await request("http://127.0.0.1:8001/data/projects.json","GET").then(res=>res.text()).then(res=>{proj=res});return proj}function changeProject(config,projectID){var newProject=firebase.initializeApp(config,projectID);return newProject.name}