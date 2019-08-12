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
                observer: '_pushModel'
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
        if (!this.content) return data
    }
    _pushModel(data) {
        let modelo = JSON.parse(atob(Modelo))
        if (data === true) {
            let subcat = this.subSubCats || []
            modelo.top = true
            subcat.push(modelo)
            this._reset(() => {
                this.subSubCats = subcat
                this.editIndex = this.subSubCats.length === parseInt(this.subSubCats.length) ? this.subSubCats.length - 1 :
                    this.childElementCount === parseInt(this.childElementCount) ? this.childElementCount - 1 : 0
                this.add = false
            }, 60)
        }
    }
    _slottItem(item, index) {
        if (!this.sloted) {
            let str = `            
                <div scroll slot="item">          
                    <cms-subcats-item>
                    </cms-subcats-item>          
                </div>                
                `
            let content = btoa(JSON.stringify(this.subSubCats))
            this.translator.template.innerHTML = str
            this.translator.clone(this)
            this.children[this.childElementCount - 1].children[0].view = true
            if (this.editIndex === index) this.children[this.childElementCount - 1].children[0].view = false
            this.children[this.childElementCount - 1].children[0].lang = this.lang
            this.children[this.childElementCount - 1].children[0].route = this.route
            this.children[this.childElementCount - 1].children[0].toContent = content
            this.children[this.childElementCount - 1].children[0].user = this.user
            this.children[this.childElementCount - 1].children[0].subcat = item
            this.children[this.childElementCount - 1].children[0].onSave = (this.onSave).bind(this)
            this.children[this.childElementCount - 1].children[0].indexArr = btoa(index)
            this.children[this.childElementCount - 1].children[0]._removeChild = (this._removeChild).bind(this)
            this.set('sloted', true)
        }/* */
    }
    _removeChild(indexArr) {
        let index = indexArr.idx[indexArr.idx.length - 1]
        let topChild = this.children[indexArr.idx[0]].children[0],
            child = topChild.children[index],
            subcat = topChild.subcat
        topChild.subcat = []
        topChild.removeChild(child)
        if (parseInt(index) === 0) {
            subcat.subCategories.splice(0, 1)
            topChild.set('subcat', subcat)
            topChild._setContent(topChild.subcat)

        } else {
            subcat.subCategories.splice(index, index)
            topChild.set('subcat', subcat)
            topChild._setContent(topChild.subcat)
        }
        if (indexArr.add === 'false' || indexArr.add === false) this.onSave(indexArr.add, indexArr.idx[0])
    }
    __reset() {
        this._reset(() => { }, 0)
    }
    _reset(call, mlscs) {
        this.set('sloted', false)
        this.editIndex = NaN
        this.subSubCats = []
        this.add = false
        this.innerHTML = ''
        window.onbeforeunload = function () { }
        setTimeout(() => {
            call()
        }, mlscs)
    }
}
customElements.define(cmsSubcats.is, cmsSubcats);