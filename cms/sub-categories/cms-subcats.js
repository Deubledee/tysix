import { html } from '@polymer/polymer/polymer-element';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer'
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
            ￼    height: auto;
            ￼    max-height: 35px;
            }
            
            div[basis] {
                flex-basis: 30%;
            }
               `
    }
    static get _getElement() {
        return html` 
        <slot name="item"></slot>  
        <slot name="nocontent"></slot> 
        <dom-repeat items="[[content]]" as="item">
            <template>
                [[_slottItem(item, index)]]            
            </template>                            
        </dom-repeat>        
        `}

    static get is() { return 'cms-subcats'; }
    static get properties() {
        return {
            subSubCats: {
                type: Array,
                value: [],
                notify: true,
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
            content: {
                type: Array,
                value: '',
                notify: true,
                computed: '_setContent(subSubCats)'
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
            sloted: {
                type: Boolean,
                value: false,
                notify: true
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
    _setContent(data) {
        if (data === 'no content') {
            this.translator.cloneElement(this, `<h1 slot="nocontent"> no content </h1>`)
            return []
        }
        if (!!data && data != 0) this.Parent = data[0].parent
        if (!this.content) return data
    }
    _addChild(data) {
        if (data === true) {
            let string = `${this.rootPath}content/pages/add-subcategory-pages?content=${this.query.content}&name=${this.childElementCount}&path=${this.query.content}&add=${this.add}&top=true`
            window.history.pushState({}, null, string);
            window.dispatchEvent(new CustomEvent('location-changed'))
            this.add = false
        }
    }
    _slottItem(item, index) {
        if (typeof this.time === 'number') {
            clearTimeout(this.time)
        }
        if (this.sloted === false) {
            let str = `            
                <div scroll slot="item">          
                    <cms-subcats-item>
                    </cms-subcats-item>          
                </div>                
                `
            let content = btoa(JSON.stringify(this.subSubCats))
            this.translator.template.innerHTML = str
            this.translator.clone(this)
            this.children[this.childElementCount - 1].children[0].lang = this.lang
            this.children[this.childElementCount - 1].children[0].route = this.route
            this.children[this.childElementCount - 1].children[0].toContent = content
            this.children[this.childElementCount - 1].children[0].Parent = this.query.content
            this.children[this.childElementCount - 1].children[0].user = this.user
            this.children[this.childElementCount - 1].children[0].subcat = item
            this.children[this.childElementCount - 1].children[0].indexArr = btoa(index)
        }/* */
        this.time = setTimeout(() => {
            this.set('sloted', true)
        }, 60);
    }
    _reset() {
        this.innerHTML = ''
        this.subSubCats = []
        this.set('sloted', false)
        this.add = false
        window.onbeforeunload = function () { }
    }
}
customElements.define(cmsSubcats.is, cmsSubcats);