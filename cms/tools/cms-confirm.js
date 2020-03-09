import{IronOverlayBehavior,mixinBehaviors,PolymerElement,html,microTask,Debouncer,dataBaseworker}from"../../src/cms-login.js";class cmsOverlay extends mixinBehaviors(IronOverlayBehavior,PolymerElement){static get template(){return html`
    <style>
      :host {
        background: inherit;
        color: black;
        box-shadow: rgba(0, 0, 0, 0.24) -2px 5px 12px 0px, rgba(0, 0, 0, 0.12) 0px 0px 12px 0px;
      }
    </style>
    <slot></slot>
`}static get is(){return"cms-overlay"}ready(){super.ready()}}customElements.define(cmsOverlay.is,cmsOverlay);var cmsOverlay$1={cmsOverlay:cmsOverlay};const _DBW=new dataBaseworker,__DEV=!0/* ignoreName */ /* skipSlots */,_STYLES=_DBW.getElementAssets("cms-confirm",__DEV);class cmsConfirm extends PolymerElement{static get template(){return html`
    <style  include="cms-comon-style_v3">
        cms-overlay[bottom2] div[one],  cms-overlay[bottom2] div[tow]{
            box-sizing: border-box;
            text-align: center;
            word-break: break-word;
            letter-spacing: 2px;
            color: #356ea1;
        }
        cms-overlay[bottom2] div[one] {
            flex-basis: 78px;
            height: auto;
            font-size: 26px;
        }
       cms-overlay[bottom2] div[tow] {
            padding: 11px;
        }
        h2 {
            padding-left: 14px;
            border: 1px solid var(--divider-color);
            border-radius: 7px;
            background-color: var(--app-item-backgound-color);  
        }
        .typeKind{
            margin-left: auto;
            margin-right: auto;
            width: 379px;
            height: 275px;
            box-sizing: border-box;
            color: var(--app-backgound-color);
            font-variant: all-petite-caps;
            font-style: italic;
            letter-spacing: 5px;
            background-color: aliceblue;
            padding: 14px;
            border-radius: 17px;
        }

        .typeheader {
            color: var(--paper-deep-orange-600);
            font-size: 23px;
        }
        h4{
            color: var(--google-blue-500);
            text-align: center;
        }
       h2[pub="send to articles ?"],  h2[pub="publish ?"]{
           color: var(--paper-green-600);
         } 

        div[btns]{
            display: flex;
            flex-direction: column;
            height: 120px;
        }    
    </style>

    <cms-overlay bottom2 id="overlay" tabindex="-1" with-backdrop scroll-action="lock" opened="{{opened}}">
        <div class="typeKind" >
            <h2 class="typeheader" pub$="[[headderMsgKind]]"> [[headderMsg]] </h2>    
            <h4>[[type]]: </h4>
            <div btns>
                <div one>
                    <span kind>[[title]]</span>
                </div>
                <div tow>
                    <paper-button left on-click="openConfirm">
                        cancel 
                    </paper-button>
                    <paper-button right on-click="execute">
                        confirm 
                    </paper-button>
                </div>   
            </div> 
        </div>  
    </cms-overlay>
    `}static get is(){return"cms-confirm"}static get properties(){return{user:{type:Object,notify:!0},lang:{type:String,observer:"__changeLang"},langs:{type:Object,value:{}},opened:{type:Boolean,notify:!0,observer:"_checkIfClose"},confirm:{type:Boolean,notify:!0,value:/* ignoreName */!1/* skipSlots */ /* skipSlots */,reflectToAttribute:!0},pub:{type:String,notify:!0,value:!1,reflectToAttribute:!0},open:{type:Boolean,notify:!0,value:!1},title:{type:Object,notify:!0},headderMsg:{type:Object,notify:!0},type:{type:Object,notify:!0},method:Object}}ready(){super.ready();_STYLES.then(querySnapshot=>{let langs=querySnapshot.data();this._setLangObject(langs)}).catch(function(error){console.error("Error reteaving assets: ",error)})}__changeLang(){if(this.langs[this.lang]){let obj=this.langs[this.lang];for(let par in obj){this.set(par,obj[par])}}}_setLangObject(langs){for(let par in langs){if("styles"!==par){this.langs[par]=langs[par].pop()}}this.__changeLang()}_checkIfClose(data){if(!1===data&&!0===this.confirm){this.closeOut()}}execute(){this.method(this.argument);this.closeOut()}openConfirm(event){if(!1===this.confirm){if(!("function"===typeof this[event.detail.name])||!("object"===typeof this[event.detail.name])){this.title=event.detail.name;if(!("function"===typeof this[event.detail.method])||!("object"===typeof this[event.detail.method])){this.method=event.detail.method;if(!("function"===typeof this[event.detail.argument])||!("object"===typeof this[event.detail.argument])){this.argument=event.detail.argument||event;if(!("function"===typeof this[event.detail.type])||!("object"===typeof this[event.detail.type])){this.type=this[event.detail.type]||event.detail.type;if(!("function"===typeof this[event.detail.headderMsgKind])||!("object"===typeof this[event.detail.headderMsgKind])){this.headderMsg=this[event.detail.headderMsgKind]||event.detail.headderMsgKind;this.headderMsgKind=event.detail.headderMsgKind}this.confirm=!0;this.$.overlay.open()}else{this.headderMsg="entry is typeof: "+typeof this[event.detail.headderMsgKind]+" put space & \"!\" or spcae & \"?\" or undescore  & msg\"_MSG\"";this.headderMsgKind="entry is typeof: "+typeof this[event.detail.headderMsgKind]+" put space \"!\" or spcae \"?\" or undescore & msg \"_MSG\""}}else{this.type="entry is typeof: "+typeof this[event.detail.type]+" put space & \"!\" or spcae & \"?\" or undescore & msg \"_MSG\""}}else{this.method="entry is typeof: "+typeof this[event.detail.method]+" put space & \"!\" or spcae & \"?\" or undescore & msg \"_MSG\""}}else{this.title="entry is typeof: "+typeof this[event.detail.name]+" put space & \"!\" or spcae & \"?\" or undescore & msg \"_MSG\""}}else{this.closeOut()}}closeOut(){this.$.overlay.close();this.confirm=!1;this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("closepopout",{bubbles:!0,composed:!0}))})}}customElements.define(cmsConfirm.is,cmsConfirm);export{cmsOverlay$1 as $cmsOverlay,cmsOverlay};