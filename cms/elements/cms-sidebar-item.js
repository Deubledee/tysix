import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import './cms-sidebar-item-link';
class cmsSidebarItem extends PolymerElement {
    static get template() {
        return html`
    <style>
        .incolumn {
            display: flex;
            flex-direction: column;
            border-top: 1px solid var(--paper-blue-grey-700);
            width: 100%;
            height: auto;
        }
    
        [hovered] {
            background-color: #364e5a !important;
            transition: background-color 0.5s ease;
        }
  
        .closed{
            visibility: hidden; 
            height: 0px;
        }
        
        [openlabel]{
            visibility: visible;
            transition: visibility 0.2s ease-out 0.2s;
        }

        [open] {
            visibility: visible;
            box-sizing: border-box;
            height: auto!important;
            padding-block-start: 4px;
            padding-block-end: 8px;
            transition: visibility 0.2s ease-out 0.2s;
        }
    
        [opendrop] {
            padding-block-start: 6px;
            transition: padding-block-start 0.5s ease;
        }
    
        .holder {
            display: flex;
            flex-direction: column;
            height: 50px;
            background-color: #1d3746;
            transition: background-color 0.5s ease;
        }
    
        .inline-top {
            display: flex;
            flex-direction: row;
        }
    
        .inline-top-div-flex {
            flex-basis: 75%;
        }
        
        .inline-top div paper-icon-button {
            bottom: -18px;
        }
    
        .inline-bottom {
            display: flex;
            margin-inline-start: 20px;
            padding-block-end: 2px;
        }
    
        .colorsmooth {
            color: var(--paper-blue-grey-400);
            font-size: 10px;
            transition: visibility 0.2s ease-in 0.1s;
        }
       
        .push-her-down {
            box-sizing: border-box;
            padding-block-start: 12px;
            font-size: larger;
            letter-spacing: 0px;
            height: 30px;
            transition: padding-block-start 0.5s ease;
        }
    
        paper-icon-button.opener {
            height: 0px;
            width: 0px;
            padding: 0;
            transition: height 0.5s ease-out, width 0.5s ease-out, padding 0.5s ease-out;
        }
    
        paper-icon-button[hovered] {
            height: 32px;
            width: 32px;
            padding: 8px;
            color: var(--disabled-text-color);
            transition: height 0.5s ease-out, width 0.5s ease-out, padding 0.5s ease-out;
        }

        .back{
            background-color: #1d3746;
            border-bottom: 1px solid var(--paper-blue-grey-700);
        }

    </style>
    <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" active="{{active}}">
    </app-route>    
    <main>
        <nav class="incolumn">            
            <nav class="holder" hovered$="[[hovered]]" on-mouseover="_mouseOver" on-mouseout="_mouseOut">
                <div class="push-her-down inline-bottom">
                    <div opendrop$="[[open]]" class="inline-top-div-flex" on-click="_toggleOpen">
                        <span>
                            [[content.title]]
                        </span>
                    </div>
                    <div>
                        <dom-if if="[[!open]]"> 
                            <template>        
                                <paper-icon-button hovered$="[[hovered]]" class="opener" title="open" icon="icons:unfold-more" on-click="_open">
                                </paper-icon-button>                       
                            </template>
                        </dom-if>

                        <dom-if if="[[open]]"> 
                            <template>
                                <paper-icon-button hovered$="[[hovered]]" class="opener" title="close" icon="icons:unfold-less" on-click="_close">
                                </paper-icon-button>                   
                            </template>
                        </dom-if>    
                    </div>
                </div>
                <div openlabel$="[[!open]]" class="closed inline-bottom colorsmooth"> 
                    <span>
                        [[content.description]]
                    </span>  
                </div>
            </nav>                          
            <div open$="[[open]]" class="closed back" on-mouseover="_mouseOverDiv" on-mouseout="_mouseOutDiv">
                <iron-selector attr-for-selected="name" class="drawer-list" role="navigation"> 
                    <dom-repeat repeat items="[[pages]]" as="page">
                        <template> 
                            <cms-sidebar-item-link
                                route="[[route]]" 
                                views="[[page.views]]"
                                url="[[page.url]]" 
                                icon-string="[[page.iconString]]" 
                                title="[[page.title]]">
                            </cms-sidebar-item-link>
                        </template>                            
                    </dom-repeat> 
                </iron-selector>
            </div>
        </nav>
    </main>
    `}
    static get is() { return 'cms-sidebar-item'; }
    static get properties() {
        return {
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            content: {
                type: Object,
                notify: true,
                observer: '_settPagesArray'
            },
            pages: {
                type: Array,
                value: [0],
                notify: true
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
            hovered: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true
            },
            hovereddiv: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true
            },
            open: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true
            },
            opendrop: {
                type: Boolean,
                value: false,
                notify: true,
                reflectToAttribute: true
            }
        }
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
    _settPagesArray(data) {
        this.pages = []
        setTimeout(() => {
            this.pages = data.pages
        }, 250);
    }
    _toggleOpen() {
        this.open = !this.open
    }
    _open() {
        this.open = true
    }
    _close() {
        this.open = false
    }
    _mouseOver() {
        this.hovered = true
    }
    _mouseOut() {
        this.hovered = false
    }
    _mouseOverDiv() {
        this.hovereddiv = true
    }
    _mouseOutDiv() {
        this.hovereddiv = false
    }
    _translate(word) {
        // console.log(word)
    }
}
customElements.define(cmsSidebarItem.is, cmsSidebarItem);