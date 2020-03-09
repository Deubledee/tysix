import{cmsTopPageTemplate,html}from"../src/cms-login.js";class cmsSettings extends cmsTopPageTemplate{static get topTitle(){return html`
      <a href="[[_getStr2(page)]][[_queryContent2(index, page)]]">  
          <paper-button  aria-label="Go back page">                   
          [[_getPage2(page)]]
          </paper-button>               
      </a> 
        `}static get viewPages(){return html`
      <article name="projects">       
          <cms-projects id="projects" route="{{route}}" user="[[user]]">
          </cms-projects>
      </article>
      <article name="templates">       
          <cms-templates id="templates" route="{{route}}" user="[[user]]">
          </cms-templates>            
      </article>
      <article name="tools">       
          <cms-tools id="tools" route="{{route}}" user="[[user]]">
          </cms-tools>            
      </article>`}static get is(){return"cms-settings"}static get properties(){return{route:{type:Object,notify:!0/* ignoreName */ /* skipSlots */},user:{type:Object,notify:!0},lang:{type:String,notify:!0},langs:{type:Object,value:{}},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];// MyAppGlobals.translator
}},queryContent:{type:String,notify:!0},returnPath:{type:String,notify:!0},contentto:{type:Object,notify:!0,value:{}},page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"},add:{type:Boolean,notify:!0},add:{type:Boolean,value:/* ignoreName */!1/* skipSlots */ /* skipSlots */},breadcrumbs:{type:Array,notify:!0,value:[]}}}static get observers(){return["_routePageChanged(route, routeData, query)"]}ready(){super.ready();this.translator.target("cms-image-viewer","setLangObject",this._setLObj.bind(this));this.translator.target("cms-image-viewer","changeLang",this._setLang.bind(this),!1);this.translator.shoot("cms-image-viewer","setLangObject")}_setLObj(res,querySnapshot){if("data"in querySnapshot){let langs=querySnapshot.data();res.call(this,langs)}}_setLang(res,lang){this.lang=lang;res.call(this);this.set("breadcrumbs",[]);if(0<this.breadcrumbs.length){this.setBreadcrumbs(this.route,this.routeData)}}__changeLang(){this.lang=this.translator.lang;this.translator.changeLang.call(this);this.setBreadcrumbs(this.route,this.routeData)}_routePageChanged(route,routeData){if("/settings"===route.prefix){if(0<this.breadcrumbs.length){this.setBreadcrumbs(this.route,this.routeData)}if(!!routeData&&!!routeData.page){if(-1!==["projects","templates","tools"].indexOf(routeData.page)){this.page=routeData.page}else{// console.log('view404', routeData.page, query);
}}}}setBreadcrumbs(route,routeData){if("number"===typeof this.time)clearTimeout(this.time);this.time=setTimeout(()=>{if("/"===route.path){let arr2=["cmshome"];this.set("breadcrumbs",arr2)}if(!!routeData.page){if(-1!==["projects","templates","tools"].indexOf(routeData.page)){let arr2=["cmshome"];this.set("breadcrumbs",arr2)}}},120)}_getStr2(item){let str="";str="/settings"===item?`${item}/`:`${item}`;return str}_queryContent2(index){let str;if(1<index){if(!!this.query&&!!this.query.type){str=`${location.search}`}else{str=`?reset=false&update=${this.query.gallery}`}}return str}_getPage2(item){let word;if("cmshome"===item){word=item.split("");word[0]=word[0].toUpperCase();word=word.join("");this.translator.changeItemTitleLang.call(this,word.toString(),"word")}else{word=item.split("/");word.shift();word=word.pop();word=word.split("");word[0]=word[0].toUpperCase();word=word.join("");this.translator.changeItemTitleLang.call(this,word.toString(),"word");/**/}return this.word}_pageChanged(page){if(page!==void 0){if("projects"===page){import("./settings/cms-projects.js").then(bundle=>bundle&&bundle.$cmsProjects||{});return}if("templates"===page){import("./settings/cms-templates.js").then(bundle=>bundle&&bundle.$cmsTemplates||{});return}if("tools"===page){import("./settings/cms-tools.js").then(bundle=>bundle&&bundle.$cmsTools||{});return}}}}customElements.define(cmsSettings.is,cmsSettings);