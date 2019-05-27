import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/editor-icons';
import '../media/cms-image';
import '../styles/cms-comon-style_v3';
import './cms-subcats'
import './cms-subcats-item'
export class cmsContentSubcats extends PolymerElement {
    static get template() {
        return html`<style include="cms-comon-style_v3">
        :host {
            position: relative;
        }
        div[scroll]{
            overflow-x: auto;
            overflow-y: hidden;
            margin-bottom: 12px;
        }
        div[scroll]::-webkit-scrollbar-track {
            background-color: var(--app-scrollbar-color)
        }

        div[scroll]::-webkit-scrollbar {
            height: 5px
        }

        div[scroll]::-webkit-scrollbar-thumb {
            background-color: var(--app-primary-text-color)
        }
        div[smaller]{
            width: 486px;
        }
        </style>  
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>       
        <section class="flexchildbotom3">
            <div left name="image">
                <paper-button>
                    [[subcatLabel]]
                </paper-button>
                <paper-icon-button  name="[[itemLabel]]" icon="av:library-add"  on-click="_addSubCategory" aria-label="mode-edit">
                </paper-icon-button> 
            </div>
            <cms-subcats id="subcats" sub-sub-cats="{{subSubCats}}" add="{{add}}">                  
                <div scroll slot="item">                
                </div>                 
            </cms-subcats>
        </section>
        `;
    }
    static get is() { return 'cms-content-subcats'; }
    static get properties() {
        return {
            subSubCats: {
                type: Array,
                notify: true,
                value: []
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals.translator
                }
            },
            lang: {
                type: String,
                value: '',
                notify: true
            },
            langs: {
                type: Object,
                value: {}
            },
            itemLabel: {
                type: String,
                value: '',
                notify: true
            },
            add: {
                type: Boolean,
                value: false,
                notify: true
            }
        };
    }
    ready() {
        super.ready();
        this.translator.target('cms-content-image', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-content-image', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-content-image', 'setLangObject')
        window.addEventListener('reset', (this._reset).bind(this))
    }
    _setLObj(res, querySnapshot) {
        if ('data' in querySnapshot) {
            let langs = querySnapshot.data()
            res.call(this, langs);
        }
    }
    _setLang(res, lang) {
        this.lang = lang
        res.call(this);
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeLang.call(this)
    }
    _addSubCategory() {
        this.add = true
    }
    _resetSubCats() {
        this.$.subcats._reset()
    }
    _log(data) {
        console.log('images', data)
    }
    _reset() {
        this.images = []
    }
}
customElements.define(cmsContentSubcats.is, cmsContentSubcats);