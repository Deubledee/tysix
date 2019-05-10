import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import { Setter } from '../tools/cms-element-set';
import '@polymer/iron-icons/editor-icons';
import '../media/cms-image';
import '../styles/cms-comon-style_v3';
export class cmsContentImage extends PolymerElement {
    static get template() {
        return html`<style include="cms-comon-style_v3">
        :host {
            position: relative;
        }
        </style>        
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route> 
        <section class="flexchildbotom3">
            <div left name="image">
                <paper-button>
                    [[imageLabel]]
                </paper-button>
                <paper-icon-button  name="[[itemLabel]]" icon="image:loupe" on-click="addImage" aria-label="mode-edit">
                </paper-icon-button>           
            </div>
                <cms-image class="small" images="[[images]]" _deleteImg="[[deleteImg]]" lang="[[lang]]">
                </cms-image>
        </section>
        `;
    }
    static get is() { return 'cms-content-image'; }
    static get properties() {
        return {
            images: {
                type: Array,
                notify: true,
            },
            deleteImg: {
                type: Object,
                notify: true
            },
            lang: {
                type: String,
                notify: true,
                // observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals.translator
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