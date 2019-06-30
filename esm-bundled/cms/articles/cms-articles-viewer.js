import{html,cmsViewerTemplate}from"../cms-login.js";class cmsArticlesViewer extends cmsViewerTemplate{static get _getSilentAnchor(){return html`  
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="reset" href="[[rootPath]]content/articles/">
            </a>
        </iron-selector>`}static get _getPages(){return html`
        <article name="add-edit-articles">  
            <slot name="addart"></slot>  
        </article>
        <article name="home">           
            <slot name="categories"></slot>
        </article>
        <article name="view-articles"> 
            <slot name="view"></slot>
        </article>`}static get is(){return"cms-articles-viewer"}static get observers(){return["_routePageChanged(route, routeData, query)"]}ready(){super.ready();this._routePageChanged(this.routeData)}_routePageChanged(route,page){if("/content/articles"===route.prefix){if(page!==void 0&&"page"in page){if(""===route.path){this.routeData.page="";page.page=""}if(!page.page){this.page="home"}else if(-1!==["add-articles","edit-articles"].indexOf(page.page)){this.page="add-edit-articles"}else if(-1!==["view-articles"].indexOf(page.page)){this.page=page.page}else{this.page="view404"}}else if(!0===page instanceof Object){this.page="home"}}}_pageChanged(page){if(page!==void 0){if("home"===page){import("./cms-article-list-type.js").then(bundle=>bundle&&bundle.$cmsArticleListType||{});return}if("view-articles"===page){import("./cms-article-view.js").then(bundle=>bundle&&bundle.$cmsArticleView||{});return}if("add-edit-articles"===page){import("./cms-article-content.js").then(bundle=>bundle&&bundle.$cmsArticleContent||{});return}if("view404"===page){import("../cms-404-warning.js").then(bundle=>bundle&&bundle.$cms$404Warning||{});return}}}}customElements.define(cmsArticlesViewer.is,cmsArticlesViewer);