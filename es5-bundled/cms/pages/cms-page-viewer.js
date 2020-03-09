define(["require","../cms-login.js"],function(_require,_cmsLogin){"use strict";_require=babelHelpers.interopRequireWildcard(_require);var cmsPageViewer=/*#__PURE__*/function(_cmsViewerTemplate){babelHelpers.inherits(cmsPageViewer,_cmsViewerTemplate);function cmsPageViewer(){babelHelpers.classCallCheck(this,cmsPageViewer);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cmsPageViewer).apply(this,arguments))}babelHelpers.createClass(cmsPageViewer,[{key:"ready",value:function ready(){babelHelpers.get(babelHelpers.getPrototypeOf(cmsPageViewer.prototype),"ready",this).call(this);this._routePageChanged(this.routeData);this.addEventListener("scrollpageholder",this._pageholderScroller,/* ignoreName */ /* ignoreName */!1/* skipSlots */ /* skipSlots */)}},{key:"_pageholderScroller",value:function _pageholderScroller(event){this.$.pageholder.scrollTo(event.detail,0)}},{key:"_routePageChanged",value:function _routePageChanged(route,page){if("/content/pages"===route.prefix){if("/"===route.path||""===route.path||"/edit-category-pages"===route.path||"/add-category-pages"===route.path){this.page="home"}else if(-1!==["subcategory-pages","edit-subcategory-pages","add-subcategory-pages"].indexOf(page)){this.page="subcategory-pages";//'home'
}else{this.page="view404";this.subcats="view404"}}}},{key:"_pageChanged",value:function _pageChanged(page){if(page!==void 0){if("home"===page){new Promise(function(res,rej){return _require.default(["./cms-page-cats.js"],res,rej)}).then(function(bundle){return bundle&&bundle.$cmsPageCats||{}}).then(function(item){});return}if("subcategory-pages"===page){new Promise(function(res,rej){return _require.default(["./cms-page-subcats.js"],res,rej)}).then(function(bundle){return bundle&&bundle.$cmsPageSubcats||{}}).then(function(item){});return}if("view404"===page){new Promise(function(res,rej){return _require.default(["../cms-404-warning.js"],res,rej)}).then(function(bundle){return bundle&&bundle.$cms$404Warning||{}});return}}}}],[{key:"is",get:function get(){return"cms-page-viewer"}},{key:"observers",get:function get(){return["_routePageChanged(route, routeData.page)"]}}]);return cmsPageViewer}(_cmsLogin.cmsViewerTemplate);customElements.define(cmsPageViewer.is,cmsPageViewer)});