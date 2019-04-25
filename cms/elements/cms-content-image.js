import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
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
                    [[itemLabel]]
                </paper-button>
                <paper-icon-button  name="[[itemLabel]]" icon="image:loupe" on-click="addImage" aria-label="mode-edit">
                </paper-icon-button> 
                <paper-button id="cancel" name="[[itemLabel]]" class="diferent" aria-label="mode-cancel">
                    cancel
                </paper-button>            
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
                value: '',
                notify: true
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
        window.addEventListener('reset', (this._reset).bind(this))
    }
    _log(data) {
        console.log('images', data)
    }
    _reset() {
        this.images = []
    }
}
customElements.define(cmsContentImage.is, cmsContentImage);