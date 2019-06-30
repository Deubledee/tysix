import{html,cmsViewerTemplate}from"../cms-login.js";class cmsGalleryViewer extends cmsViewerTemplate{static get _getSilentAnchor(){return html`  
        <iron-selector selected="[[gallery]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="reset" href="[[rootPath]]media/images/">
            </a>
        </iron-selector>`}static get _getPages(){return html`
        <article name="home">  
            <slot name="galleries"></slot>  
        </article>

        <article name="view-edit-images">  
            <slot name="images"></slot>  
        </article>`}static get is(){return"cms-gallery-viewer"}static get properties(){return{page:{type:String,reflectToAttribute:!0,observer:"_pageChanged"}}}ready(){super.ready()}static get observers(){return["_routePageChanged(route, routeData, query)"]}_routePageChanged(route,page,query){if("/media/images"===route.prefix){if(page!==void 0&&"page"in page){if(""===route.path){this.routeData.page="";page.page=""}if(!page.page){this.page="home"}else if(-1!==["galleries"].indexOf(page.page)){this.page="home"}else if(-1!==["view-images"].indexOf(page.page)){this.page="view-edit-images"}else if(-1!==["view-images","galleries","add-gallery","edit-gallery"].indexOf(page.page)){this.page=page.page}else{this.page="view404"}}else if(!0===page instanceof Object){this.page="home"}}}__reset(event){if(-1!==["categorypages"].indexOf(event.detail)){let template=html`<cms-galleries slot="galleries">
                          </cms-galleries>`,clone=document.importNode(template.content,!0);clone.route=this.route;clone.lang=this.lang;if(5>this.childElementCount){this.appendChild(clone);this.$.reset.click()}}}_pageChanged(page){if(page!==void 0){if("home"===page||"galleries"===page){import("./cms-galleries.js").then(bundle=>bundle&&bundle.$cmsGalleries||{}).then(item=>{});return}if("view-edit-images"===page){import("./cms-images.js").then(bundle=>bundle&&bundle.$cmsImages||{}).then(item=>{});return}if("view404"===page){import("../cms-404-warning.js").then(bundle=>bundle&&bundle.$cms$404Warning||{});return}}}}customElements.define(cmsGalleryViewer.is,cmsGalleryViewer);