import { html } from '@polymer/polymer/polymer-element';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer'
import { html as litHtml, render } from 'lit-html';
import { cmsItemTemplate } from '../templates/cms-item-template';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-input/paper-input';
import './cms-subcats-item'
import '../styles/cms-comon-style_v3';
const Modelo = "eyJhdXRob3IiOiIiLCJjaGlsZHJlbiI6W10sImRhdGVDcmVhdGVkIjoiIiwiaWQiOiIiLCJsYXN0TW9kaWZpZWQiOltdLCJwYXJlbnQiOiIiLCJ0b0FydGljbGUiOiIiLCJ0b3AiOiIiLCJjaGlsZHJlbkNvdW50IjowfQ=="

export class cmsSubcats extends cmsItemTemplate {
    static get _getStyles() {
        return html` 
            article[centerlistitem] paper-button{
                height: auto;
                max-height: 35px;
            }
            
            div[basis] {
                flex-basis: 30%;
            }
               `
    }
    static get _getElement() {
        return html` 
        
        <slot name="nocontent"></slot> 
        <dom-repeat items="[[subSubCats]]" as="item">
            <template>
                <slot name="item[[index]]">
                </slot>           
            </template>                            
        </dom-repeat>        
        `}

    static get is() { return 'cms-subcats'; }
    static get properties() {
        return {
            subSubCats: {
                type: Array,
                observer: '_slottItem',
                notify: true
            },
            user: {
                type: Object,
                value: {}
            },
            deleteImg: {
                type: Object,
                notify: true
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//.translator
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
            editIndex: {
                type: Number
            },
            add: {
                type: Boolean,
                value: false,
                notify: true,
                observer: '_addChild'
            },
            info: {
                type: Object,
                value: {},
            },
            onSave: {
                type: Object,
                notify: true,
                value: {}
            },
        };
    }
    connectedCallback() {
        super.connectedCallback();
        this._observer = new FlattenedNodesObserver(this, (info) => {
            this.info = info;
        });
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this._observer.disconnect();
    }
    ready() {
        super.ready();
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

    _addChild(data) {
        if (!!this.children[0] && this.children[0].tagName === "H1") {
            this.removeChild(this.children[0])
        }
        if (data === true) {
            let string = `${this.rootPath}content/pages/add-subcategory-pages?content=${this.query.content}&name=${this.children.length}&path=${this.query.content}&add=${this.add}&top=true`
            window.history.pushState({}, null, string);
            window.dispatchEvent(new CustomEvent('location-changed'))
            this.add = false
        }
    }
    _slottItem(data) {
        if (typeof this.time === 'number') clearInterval(this.time)
        this.time = setTimeout(() => {
            if (!!data) {
                const pageTemplate = (pages) => litHtml`${pages.map((article, idx) => {
                    return litHtml`<div scroll slot="item${idx}">          
                                 <cms-subcats-item 
                                    .lang="${this.lang}" 
                                    .user="${this.user}"
                                    .subcat="${article}"
                                    .indexArr="${btoa(idx)}"
                                    .route="${this.route}" >
                                 </cms-subcats-item>          
                             </div> `
                })} `
                render(pageTemplate(data), this);
            } else {
                const nocont = () => litHtml`<h1 slot="nocontent"> no content </h1>`
                render(nocont(), this);
            }
        }, 60);
    }
    _reset() {
        this.subSubCats = []
        this.add = false
        window.onbeforeunload = function () { }
    }
}
customElements.define(cmsSubcats.is, cmsSubcats);
