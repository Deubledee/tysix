import{microTask,Debouncer,cmsItemTemplate,html,cmsViewerTemplate}from"../cms-login.js";class cmsGalleryItem extends cmsItemTemplate{static get _getElement(){return html` 
            <div centerImageItem>
                <article class="padding">
                    <paper-button>
                        [[gallery.id]]
                    </paper-button>
                </article>  
                <article class="padding">
                    <paper-button on-click="_showImages">
                        <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show">
                        </paper-icon-button> 
                    </paper-button>
                </article> 
                <article class="padding">
                    <paper-button>
                        <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button> 
                    </paper-button>
                </article> 
                <article class="padding">
                    <paper-button on-click="_openConfirm">
                        <paper-icon-button icon="av:not-interested" aria-label="mode-delete">
                        </paper-icon-button>   
                    </paper-button> 
                </article>  
            </div> `}static get is(){return"cms-gallery-item"}static get properties(){return{route:{type:Object,notify:!0/* ignoreName */ /* skipSlots */},add:{type:Boolean,notify:!0},translator:{type:Object,notify:!0,value:function(){return MyAppGlobals[window.cms];//MyAppGlobals.translator
}},images:{type:Array,notify:!0},query:String,returnPath:{type:String,notify:!0},method:{type:String,notify:!0,value:{}},gallery:{type:Object,notify:!0,value:{}},galleryArray:{type:Array,notify:!0},noItem:{type:Array,value:[{url:[]}]}}}ready(){super.ready()}_showImages(){this.default()}default(){let string=!!location.search?`/media/view-images${location.search}&gallery=${this.gallery.id}`:`/media/view-images?gallery=${this.gallery.id}`;window.history.pushState({},null,string);window.dispatchEvent(new CustomEvent("location-changed"))}deleteGallerie(data){console.log(data)}_openConfirm(){this._changeSectionDebouncer=Debouncer.debounce(this._changeSectionDebouncer,microTask,()=>{this.dispatchEvent(new CustomEvent("confirm",{bubbles:!0,composed:!0,detail:{name:this.gallery.id,method:this.deleteGallerie.bind(this),argument:this.gallery.id,headderMsgKind:"remove ?",type:"gallery"}}))})}}customElements.define(cmsGalleryItem.is,cmsGalleryItem);class cmsGalleryViewer extends cmsViewerTemplate{static get _getSilentAnchor(){return html`  
        <iron-selector selected="[[gallery]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="reset" href="[[rootPath]]media/images/">
            </a>
        </iron-selector>`}static get _getPages(){return html`
        <article name="galleries">  
            <slot name="galleries"></slot>  
        </article>

        <article name="view-images">  
            <slot name="images"></slot>  
        </article>`}static get is(){return"cms-gallery-viewer"}static get properties(){return{page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"}}}ready(){super.ready()}static get observers(){return["_routePageChanged(routeData.page)"]}_routePageChanged(page){if(-1!==["galleries","view-images"].indexOf(page)){this.page=page}}_pageChanged(page){if(page!==void 0){if("home"===page||"galleries"===page){import("./cms-galleries.js").then(bundle=>bundle&&bundle.$cmsGalleries||{}).then(item=>{});return}if("view-images"===page){import("./cms-images.js").then(bundle=>bundle&&bundle.$cmsImages||{}).then(item=>{});return}if("view404"===page){import("../cms-404-warning.js").then(bundle=>bundle&&bundle.$cms$404Warning||{});return}}}}customElements.define(cmsGalleryViewer.is,cmsGalleryViewer);