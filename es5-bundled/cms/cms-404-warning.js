define(["./cms-login.js"],function(_cmsLogin){"use strict";function _templateObject_77e0c220615e11eab834b97a903770ac(){var data=babelHelpers.taggedTemplateLiteral(["\n    <style>\n\n      :host {\n        display: block;\n        text-align: center;\n        color: var(--app-secondary-color);\n      }\n\n      iron-icon {\n        display: inline-block;\n        width: 60px;\n        height: 60px;\n      }\n\n      h1 {\n        margin: 50px 0 50px 0;\n        font-weight: 300;\n      }\n\n    </style>\n\n    <div>\n      <iron-icon icon=\"error\"></iron-icon>\n      <h1>Sorry, we couldn't find that page</h1>\n    </div>\n    <oaper-button>\n      <a href=\"/\">Go to the home page</a>\n    </oaper-button>\n"]);_templateObject_77e0c220615e11eab834b97a903770ac=function _templateObject_77e0c220615e11eab834b97a903770ac(){return data};return data}var cms404Warning=/*#__PURE__*/function(_PolymerElement){babelHelpers.inherits(cms404Warning,_PolymerElement);function cms404Warning(){babelHelpers.classCallCheck(this,cms404Warning);return babelHelpers.possibleConstructorReturn(this,babelHelpers.getPrototypeOf(cms404Warning).apply(this,arguments))}babelHelpers.createClass(cms404Warning,null,[{key:"template",get:function get(){return(0,_cmsLogin.html)(_templateObject_77e0c220615e11eab834b97a903770ac())}},{key:"is",get:function get(){return"cms-404-warning"}}]);return cms404Warning}(_cmsLogin.PolymerElement);customElements.define(cms404Warning.is,cms404Warning)});