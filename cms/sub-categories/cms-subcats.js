import { html } from '@polymer/polymer/polymer-element';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer'
import { cmsItemImageTemplate } from '../templates/cms-item-image-template';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-input/paper-input';
import './cms-subcats-item'
import '../styles/cms-comon-style_v3';
const Modelo = "eyJhdXRob3IiOiIiLCJjaGlsZHJlbiI6W10sImRhdGVDcmVhdGVkIjoiIiwiaWQiOiIiLCJsYXN0TW9kaWZpZWQiOltdLCJwYXJlbnQiOiIiLCJ0b0FydGljbGUiOiIiLCJ0b3AiOiIiLCJjaGlsZHJlbkNvdW50IjowfQ=="

export class cmsSubcats extends cmsItemImageTemplate {
    static get _getMenu() {
        return html`                          
            <section class="flexchildbotomShort noFlex">
                <div class="center">   
                    <h4 title="[[item]]"> [[item]] </h4>     
                </div>  
            </section>
            <section class="flexchildbotomShort noFlex">
                <div class="center">   
                    <h4 title="[[title]]"> [[title]] </h4>     
                </div>  
            </section>
            <section class="flexchildbotomShort noFlex">
                <div class="center">
                    <h4 title="[[viewedit]]"> [[viewedit]] </h4>
                </div>  
            </section>
            <section class="flexchildbotomShort noFlex">
                <div class="center">  
                    <h4 title="[[type]]"> 
                    [[type]]     </h4>     
                </div>  
            </section>
            <section class="flexchildbotomShort noFlex">
                <div class="center">  
                    <h4 title="[[delete]]"> 
                    [[delete]]   </h4>     
                </div>  
            </section>`
    }
    static get _getItem() {
        return html` 
        <slot name="item"></slot>  
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
        this.translator.target('cms-subcats', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-subcats', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-subcats', 'setLangObject')
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
        if (!!data && data != 0) this.Parent = data[0].parent
        if (!this.content) return data
    }
    _addChild(data) {
        if (data === true) {
            this.Parent = this.query.content || this.query.parent
            let string = `${this.rootPath}content/pages/add-subcategory-pages?parent=${this.Parent}&name=${this.childElementCount}&topparentname=${this.Parent}&add=${this.add}&top=true`
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
            this.time = setTimeout(() => {
                this.set('sloted', true)
            }, 60);
        }/* */
    }
    __reset() {
        this._reset(() => { }, 0)
    }
    _reset(call, mlscs) {
        this.innerHTML = ''
        this.subSubCats = undefined
        this.set('sloted', false)
        this.add = false
        window.onbeforeunload = function () { }
        setTimeout(() => {
            call()
        }, mlscs)
    }
}
customElements.define(cmsSubcats.is, cmsSubcats);