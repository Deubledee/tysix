import{cmsViewerTemplate}from"../cms-login.js";class cmsPageViewer extends cmsViewerTemplate{static get is(){return"cms-page-viewer"}static get observers(){return["_routePageChanged(route, routeData, query)"]}ready(){super.ready();this._routePageChanged(this.routeData)}_routePageChanged(route,page){if("/content/pages"===route.prefix){if(page!==void 0&&"page"in page){if(""===route.path){this.routeData.page="";page.page=""}if(!page.page){this.page="home"}else if(-1!==["add-category-pages","edit-category-pages","edit-subcategory-pages","add-subcategory-pages"].indexOf(page.page)){this.page="add-category-pages"}else{this.page="view404"}}else if(!0===page instanceof Object){this.page="home"}}}_pageChanged(page){if(page!==void 0){if("home"===page){import("./cms-page-list-type.js").then(bundle=>bundle&&bundle.$cmsPageListType||{}).then(item=>{});return}if("add-category-pages"===page){import("./cms-page-list-type-content.js").then(bundle=>bundle&&bundle.$cmsPageListTypeContent||{}).then(item=>{});return}if("view404"===page){import("../cms-404-warning.js").then(bundle=>bundle&&bundle.$cms$404Warning||{});return}}}}customElements.define(cmsPageViewer.is,cmsPageViewer);