import { html } from '@polymer/polymer/polymer-element';
import { FlattenedNodesObserver } from '@polymer/polymer/lib/utils/flattened-nodes-observer'
import { cmsItemImageTemplate } from '../templates/cms-item-image-template';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-input/paper-input';
import './cms-subcats-item'
import '../styles/cms-comon-style_v3';
export class cmsSubcats extends cmsItemImageTemplate {
    static get _getStyles() {
        return html`        
        div[bottom]{
            height: 35px;
            font-size: var(--app-images-article-font-size);
            background-color: var(--app-tabs-color);
            box-shadow: 1px 1px 4px var(--disabled-text-color);
        }
        div[bottom] h4{
            margin-block-start: 8px;
        }
        div[small]{
            height: 23px;
            font-size: 9px; 
        }
        div[table]{
            width: 773px;
            overflow-x: hidden;
        }`
    }
    static get _getMenu() {
        return html`                          
            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4 title="[[item]]"> [[item]]item </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4 title="[[title]]"> [[title]]title </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">
                    <h4 title="[[viewedit]]"> [[viewedit]]viewedit </h4>
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4 title="[[type]]"> 
                    [[type]]  type   </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4 title="[[delete]]"> 
                    [[delete]]  delete  </h4>     
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
                notify: true,
                observer: '__changeLang'
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
                computed: '_setContent(subSubCats)'
            },
            add: {
                type: Boolean,
                value: false,
                notify: true,
                observer: '_pushModel'
            },
            Modelo: {
                type: Object,
                value: {
                    contentText: [{
                        description: ""
                    }],
                    image: [],
                    info: [{
                        author: "",
                        dateAdde: "",
                        publishedBy: [{
                            author: "",
                            date: "", uid: ""
                        }],
                        unPublishedBy: [{
                            author: "",
                            date: "",
                            uid: ""
                        }],
                        lastModified: [{
                            author: "",
                            date: "",
                            uid: ""
                        }],
                        datePublished: "NP",
                        published: "NP"
                    }],
                    items: [{
                        categoryName: "",
                        type: "",
                        lang: ""
                    }],
                    subCategories: []
                },
                notify: true,
            },
            info: {
                type: Object,
                value: {},
            }
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
        window.addEventListener('reset', (this._reset).bind(this))
        this.translator.target('cms-elements', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-elements', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-elements', 'setLangObject')
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
    _pushModel(data) {
        if (data === true) {
            let subcat = this.subSubCats
            this._reset()
            setTimeout(() => {
                subcat.push(this.Modelo)
                this.editIndex = subcat.length - 1
                this.subSubCats = subcat
                this.add = false
            }, 100)
        }
    }
    _slottItem(item, index, edit) {
        let template = document.createElement('template')
        let str = `            
                <div scroll slot="item">          
                    <cms-subcats-item article="[[item]]">
                    </cms-subcats-item>          
                </div>                
                `
        template.innerHTML = str
        var clone = document.importNode(template.content, true);
        this.appendChild(clone)
        this.children[this.childElementCount - 1].children[0].model = this.Modelo
        this.children[this.childElementCount - 1].children[0].view = true
        if (this.editIndex === index) this.children[this.childElementCount - 1].children[0].view = false
        this.children[this.childElementCount - 1].children[0].lang = this.lang
        this.children[this.childElementCount - 1].children[0].toContent = this.content
        this.children[this.childElementCount - 1].children[0].indexArr = [index]
        this.children[this.childElementCount - 1].children[0].subcat = item
    }
    _setContent(data) {
        return data
    }
    _reset() {
        this.subSubCats = []
        this.innerHTML = ''
    }
}
customElements.define(cmsSubcats.is, cmsSubcats);