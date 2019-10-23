import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/editor-icons';
import '../media/cms-image-item';
import '../styles/cms-comon-style_v3';
export class cmsContentImage extends PolymerElement {
    static get template() {
        return html`<style include="cms-comon-style_v3">
        :host {
            position: relative;
        }
        cms-image.top {
            top: 0px;
        }
        div[backanover] {
            height: 272px;
            overflow: auto;            
            padding: 8PX
        }

        div[backanover]::-webkit-scrollbar-track {
            background: var(--app-secondary-text-color)
        }

        div[backanover]::-webkit-scrollbar {
            width: 7.5px
        }

        div[backanover]::-webkit-scrollbar-thumb {
            background-color: var(--content-color-default, #8098ad)
        }
        </style>        
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route> 
        <section class="flexchildbotom3">
            <div>
                <paper-button>
                    [[imageLabel]]
                </paper-button>
                <paper-icon-button  name="[[itemLabel]]" icon="image:loupe" on-click="addImage" aria-label="mode-edit">
                </paper-icon-button>           
            </div>
            <div backanover>  
                <dom-repeat repeat items="[[images]]" as="item">
                    <template>
                        <cms-image-item  
                            route="[[route]]"
                            add="[[addTo]]" 
                            image="[[item]]" 
                            save-button="[[saveButton]]"
                            reset-button="[[resetButton]]"
                            delete="[[_deleteImg()]]"
                            idx="[[index]]">
                        </cms-image-item>
                    </template>                            
                </dom-repeat>       
            </div>
        </section>
        `;
    }
    static get is() { return 'cms-content-image'; }
    static get properties() {
        return {
            images: {
                type: Array,
                notify: true,
                value: [],
                observer: '_log'
            },
            deleteImg: {
                type: Object,
                notify: true
            },
            lang: {
                type: String,
                notify: true,
            },
            langs: {
                type: Object,
                value: {}
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            itemLabel: {
                type: String,
                value: '',
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
    _log(data) {
        console.log('images', data)
    }
    _reset() {
        this.images = []
    }
}
customElements.define(cmsContentImage.is, cmsContentImage);