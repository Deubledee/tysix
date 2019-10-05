import { PolymerElement, html } from '@polymer/polymer/polymer-element';
class cmsSidebarItemLink extends PolymerElement {
    static get template() {
        return html`
    <style>
        a {
            text-decoration: none;
            color: var(--app-item-backgound-color);
        }    
        
        .inline-top-div-flex-less {
            flex-basis: 15%;
            padding-left: unset !important;
            margin-inline-start: -6px;
            margin-block-end: 6px;
        }

        .inline-top-div-flex-less iron-icon {
            height: 16px;
        }
     
        .colorlink {
            display: flex;
            padding-inline-start: 22px;
            color: var(--light-primary-color);
            font-size: 12px;
            text-transform: capitalize;
        }

        a[lit] {
            color: #7dfff2!important;  
            transition: color 1s ease-out;
        }  

        [hovered] {
            background-color: #364e5a !important;
            transition: background-color 0.5s ease;
        }
    </style>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" active="{{active}}">
    </app-route>    
    <main>                        
        <a hovered$="[[hovered]]"  lit$="[[lit]]" class="inline-bottom colorlink" href="[[rootPath]][[url]]" on-mouseover="_mouseOver" on-mouseout="_mouseOut">
            <div class="inline-top-div-flex-less">
                <iron-icon icon="[[iconString]]" aria-label="[[_translate(title)]]">
                </iron-icon>
            </div>

            <span>
              [[title]]  [[_translate(title)]]
            </span>
        </a> 
    </main>
    `}
    static get is() { return 'cms-sidebar-item-link'; }
    static get properties() {
        return {
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            lang: {
                type: String,
                notify: true,
            },
            langs: {
                type: Object,
                notify: true,
                value: {},
            },
            litAnchor: {
                type: Object
            },
            hovered: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true
            },
            lit: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true
            },
            url: String,
            view: String,
            views: {
                type: Array,
                value: []
            },
            iconString: String,
            title: String,
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData)'
        ];
    }
    ready() {
        super.ready();
        this.translator.target('cms-content', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-content', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-content', 'setLangObject')
    }
    _setLang(res, lang) {
        this.lang = lang
        res.call(this);
    }
    _setLObj(res, querySnapshot) {
        if ('data' in querySnapshot) {
            let langs = querySnapshot.data()
            res.call(this, langs);
        }
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeLang.call(this)
    }
    _routePageChanged(routeData) {
        if (this.views.length > 0) {
            let view = this.views.filter(item => { if (routeData.page === item) return item }).pop()
            if (!!view) {
                this.lit = true
            } else {
                this.lit = false
            }
        }
    }
    _translate(word) {
        // console.log(word)
    }
    _mouseOver() {
        this.hovered = true
    }
    _mouseOut() {
        this.hovered = false
    }
}
customElements.define(cmsSidebarItemLink.is, cmsSidebarItemLink);