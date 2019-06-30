import{PolymerElement,html$1 as html,scroll,dataBaseworker}from"./cms-login.js";import"./cms-image-viewer.js";class cmsPageForm extends PolymerElement{static get template(){return html`
    <style>
          main[closed] {
               height: 584px;
               visibility: visible;
               transition-property: height, visibility;
               /*transition-delay: .5s, 0s;*/
               transition-duration: 2s, .5s;
          }
          main {
               box-sizing: border-box;
               display: flex;
               flex-flow: column;
               background-color: #dfdfdf;
               position: absolute;
               top: 196px;
               border-radius: 4px;
               width: 99%;
               height: 0px;
               padding: 75px;
               visibility: collapse;
               transition-property: height, visibility;
               transition-duration: 2s, 1s;
          }

          img {
               width: 190px
          }

          nav {
               display: flex;
               flex-flow: row
          }
          shop-image::before {
               content: "";
               display: block;
               padding-top: 100%;
          }
          div[images] {
               box-sizing: border-box;
               padding: 13px;
               margin-top: 34px;
               background-color: #ececec;
               margin-bottom: 2px;
               width: 100px;
               height: 60px;
               margin-right: 5px;
          }
          paper-button {
               background-color: var(--google-blue-100)
          }
          div [button]{
               background-color: var(--google-grey-300)
          }
          cms-image-viewer.diferent{
               --main-style:{
                    position: absolute;
                    width: 99%;
                    top: 43%;
               }
          }
             </style>
     <main closed$="[[closed]]">
          <cms-input-sellector id="sellector1"  options="[[pageTypes]]" value="{{type}}">          
          </cms-input-sellector>          
          <paper-input always-float-label label="Page Name" value="{{pageName}}"></paper-input>
          <paper-input always-float-label label="title" value="{{title}}"></paper-input>
          <paper-input always-float-label label="Language" placeholder="Ex: pt, en, es, fr" value="{{lang}}"></paper-input>
          <div button>
               <paper-button id="art" class="diferent" on-click="file">          
                    choose image
               </paper-button>
          </div>   
          <shop-image src="[[image.url]]" alt="[[image.title]]"></shop-image>  
          <!--paper-input always-float-label label="image" value="{{image}}"></paper-input-->          
          <div>
               <cms-input-sellector options="[[layouts]]" value="{{layout}}">          
               </cms-input-sellector>
          <div>
          <nav>
               <div images>
                    <paper-button on-click="clean">
                         cancel
                    </paper-button>
               </div>
               <div images>
                    <paper-button on-click="setValues">
                         Save
                    </paper-button>
               </div>
          <nav>     
     </main>       
     <cms-image-viewer id="viewer" class="diferent" image="{{image}}" putCancelButton="[[sett]]"></cms-image-viewer>
`}static get is(){return"cms-page-form"}static get properties(){return{DBW:{type:Object,value:function(){return new dataBaseworker}},closed:{type:Boolean,notify:!0,value:!1,reflectToAttribute:!0},close:{type:Boolean,notify:!0,value:!1,observer:"file"},request:{type:Array,notify:!0},categorie:{type:Object,notify:!0,observer:"reset"},closeHead:{type:Boolean,notify:!0,value:!0},sett:{type:Boolean,notify:!0,value:!0},setter:{type:String,notify:!0,value:"false"},pageName:{type:String},edit:{type:Boolean,value:!1},title:{type:String},image:{type:Object},iD:{type:String},layout:{type:String},layouts:{type:Array,value:[{label:"Layouts"},{id:"agents",name:"Standart"},{id:"compressor",name:"Blog",notAtive:!1},{id:"delay",name:"Social",notAtive:!1},{id:"wave-shaper",name:"Video",notAtive:!1}]},type:{type:String,notify:!0},pageTypes:{type:Array,value:[{label:"Page type"},{name:"---"},{name:"list"},{name:"sub-categoty",notAtive:!1},{name:"Social",notAtive:!1},{name:"Video",notAtive:!1}]}}}ready(){super.ready();this.$.viewer.open=!1;this.$.viewer.closeHead=!0;this.$.viewer.killSett=!0;this.$.viewer.openMain=!1}createURL(items){let arr=[],parsed=JSON.parse(items);for(let i=0;i<parsed.length;i++){arr.push({url:"http://localhost:3000/data/images/"+parsed[i],title:parsed[i]})}this.images=arr}file(){this.$.viewer.closeHead=!0;this.$.viewer.open=!0;this.$.viewer.show=!0;this.$.viewer.openMain=!0;this.$.viewer.killSett=!0;scroll({top:500,behavior:"smooth"});scroll({bottom:520,behavior:"smooth"})}reset(data){this.pageName=data.name||"N/a";this.lang=data.lang||"N/a";this.type=data.page||"---";this.title=data.title||"N/a";this.image={url:data.image,title:data.title}||"N/a";this.placeholder=data.placeholder||"N/a"}setValues(){let thiso=this,parsed={lang:this.lang,name:this.pageName.toLocaleLowerCase().split(" ").join("_"),page:this.type,title:this.title,image:this.image.url,placeholder:this.pageName};if(!1===this.edit){this.DBW.setPages((done,err)=>{if("error"!==done){thiso.clean("newPage")}else{console.log(err)}},parsed)}if(!0===this.edit){this.DBW.writePageContent((done,err)=>{if("error"!==done){thiso.clean("newPage")}else{console.log(err);thiso.clean("true")}},parsed)}}clean(setterValue){let setter;if(!0===setterValue instanceof MouseEvent){setter="true"}else{setter=setterValue}if("N/a"===this.pageName||"newPage"===setterValue){this.reset({});setter=!1}scroll({top:0,behavior:"smooth"});this.closed=!1;this.setter=setter;this.$.viewer.openmain=!1}}customElements.define(cmsPageForm.is,cmsPageForm);class cmsHomeViewer extends PolymerElement{static get template(){return html`
    <custom-style>
    <style is="custom-style">

      html {
        --app-drawer-width: 350px;
      }

      body {
        margin: 0;
        font-family: 'Roboto', 'Noto', sans-serif;
        background-color: #eee;
      }

      article {
        box-sizing: border-box;
        /*box-shadow: 4px 4px 4px #909090;*/
        margin-bottom: 10px;
        padding: 12px;
      } 

      section {
        display: flex;
        flex-flow: row;        
        font-weight: bold;
        padding: 4px;
        height: 50px;
      }

      nav[bottom] {
        display: flow-root;
        height: 0px;
        opacity: 0;
        transition-property: height, opacity;
        transition-duration: 1.5s, 2s;
      }
      
      section div[left] {
        flex-basis: 164px;
        color: #448cff;
      }
      section div[right] {
        flex-basis: 60%;
        color: #616161;
      }
      main {
        word-break: break-all;
        padding: 4px;
        position: absolute;
        left: -65px;
        width: 100%;
      }
      section paper-button{
        color: #7a8c94;
        margin-left: 50px;
      }
      nav {
        color: #8098ad;
        display: flex;
        flex-flow: row;
        padding: 10px;
        padding-left: 21px;
      }    
      nav div {
        flex-basis: 120px;
        flex-grow: 1      
      }
      nav paper-icon-button {
        flex-basis: 120px;      
      }

    </style>
  </custom-style>
</head>
<body>   
    <main >
        <nav> 
            <div>
              <h1>
                  home
              </h1>
            </div>
            <div add on-click="add">
              <paper-icon-button-light>
                <paper-button title="add">
                <h2>Add</h2>
                </paper-button>
              </paper-icon-button-light>
            </div>
        </nav>     
        <dom-repeat items="[[categories]]" as="category" initial-count="4">
          <template>
            <article>
              <nav>
                  <div>
                    <span>  {{_getPagename(category)}} </span>
                  </div>
                  <div on-click="showPage">
                  <paper-icon-button icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                  </div>  
                  <paper-button on-click="edit">
                    change
                  </paper-button>                  
              </nav> 
              <nav bottom>       
                <section>
                  <div left> Page type </div>
                  <div right> [[category.page]]  </div>    
                  </section>  
                  <section>
                  <div left> Page name </div>
                  <div right> [[category.name]]  </div>  
                  </section>  
                  <section>
                  <div left> title </div>
                  <div right> [[category.title]]  </div>     
                  </section>  
                  <section>           
                  <div left> image </div>
                  <div right> [[category.image]]  </div> 
                  </section>  
                  <section>
                  <div left> placeholder </div>
                  <div right> [[category.placeholder]]  </div>                               
                </section>  
              </nav>
            </article>
          </template>
        </dom-repeat>
        <cms-page-form closed="[[closed]]" categories="{{categories}}">
        </cms-page-form>
      </main>  
</body>
`}static get is(){return"cms-home-viewer"}static get properties(){return{categories:{type:Array,notify:!0},closed:{type:Boolean,notify:!0}}}_getPagename(cats){return cats.name}add(event){this.closed=!this.closed}edit(event){}showName(cats,name){return cats[name]}showPage(event){console.log(event.srcElement.parentElement.parentElement.parentElement.children[1]);if(!1===event.srcElement.parentElement.parentElement.parentElement.children[1].hasAttribute("open")){event.srcElement.parentElement.parentElement.parentElement.children[1].style.opacity="1";event.srcElement.parentElement.parentElement.parentElement.children[1].style.height="435px";event.srcElement.parentElement.parentElement.parentElement.children[1].style.display="0px";event.srcElement.parentElement.parentElement.parentElement.children[1].setAttribute("open",!0)}else{event.srcElement.parentElement.parentElement.parentElement.children[1].style.height="0px";event.srcElement.parentElement.parentElement.parentElement.children[1].style.opacity="0";event.srcElement.parentElement.parentElement.parentElement.children[1].removeAttribute("open")}}handleResponse(res){}}customElements.define(cmsHomeViewer.is,cmsHomeViewer);