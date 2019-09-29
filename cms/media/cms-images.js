import { IronCheckedElementBehavior } from '@polymer//iron-checked-element-behavior/iron-checked-element-behavior.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template';
import { cmsMediaLib } from '../tools/cms-save-lib.js';
import './cms-image-item';
class cmsImages extends mixinBehaviors(IronCheckedElementBehavior, cmsMediaLib(cmsMiddlePageTemplate)) {
    static get _topLabel() {
        return html`       
            <h3 class="higherh3">[[query.gallery]]</h3>       
            <h5 class="higherh5"> [[images]] </h5> 
        `
    }
    static get _getSilentAnchor() {
        return html`
            <a href="[[rootPath]]media/view-images/add-images?gallery=[[query.gallery]]&add=true">
                <paper-tab name=" add-category-pages">                        
                    <span class="spanpadding"> 
                    [[ADD]] 
                    </span>
                    <paper-icon-button-light>
                        <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                    </paper-icon-button-light>
                </paper-tab>
            </a>
        `
    }
    static get _getBottom() {
        return html`                         
        <section class="flexchildbotom noFlex">
            <div class="center">   
                <h4>  [[Imag]]   </h4>     
            </div>  
        </section>

        <section class="flexchildbotom noFlex">
            <div class="center">   
                <h4> 
                [[title]]    </h4>     
            </div>  
        </section>
        <section class="flexchildbotom noFlex">
            <div class="center">   
                <h4> 
                [[dateCreated]]    </h4>     
            </div>  
        </section>
        <section class="flexchildbotom noFlex">
            <div class="center">  
                <h4> 
                [[Gallery]]     </h4>     
            </div>  
        </section>
        <section class="flexchildbotom noFlex">
            <div class="center">  
                <h4> 
                [[url]]      </h4>     
            </div>  
        </section>
        <section class="flexchildbotom noFlex">
            <div class="center flex schooch">
                <paper-button class="smaller">
                    <input title="[[image.uploaded]]" type="checkbox" on-click="_selectAll" aria-label="check-all">
                </paper-button>  
                <paper-button class="smaller" on-click="_saveAndBack">
                    [[delete]] 
                </paper-button>     
            </div>  
        </section>`
    }
    static get _getTable() {
        let template = html`
            <div table> 
                <dom-repeat repeat items="[[IMAGES]]" as="image">
                    <template>
                        <cms-image-item  
                            query="[[query]]"
                            image="[[image]]" 
                            checked="[[checked]]"
                            to-add="{{toAdd}}"
                            idx="[[index]]"
                        </cms-image-item>
                    </template>                            
                </dom-repeat>
            </div>`
        return template
    }
    static get is() { return 'cms-images'; }

    static get properties() {
        return {
            route: {
                type: Object,
                notify: true
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            lang: {
                type: String,
                notify: true
            },
            langs: {
                type: Object,
                value: {}
            },
            IMAGES: {
                type: Array,
                notify: true
            },
            toAdd: {
                type: Array,
                notify: true,
                value: []
            },
            checked: {
                type: Boolean,
                value: false,
                notify: true
            },
            delete: {
                type: String,
                notify: true,
                computed: '_setLabelDelete(addTo)'
            },
            addTo: {
                type: Boolean,
                value: false,
                notify: true
            },
            spinOut: {
                type: Boolean,
                value: false
            },
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, query)'
        ];
    }
    ready() {
        super.ready()
        this.translator.template.innerHTML = `<paper-spinner-lite active="false" slot="spinner">
        </paper-spinner-lite>`
        this.spinOut = false
        this.translator.clone(this)
        this.translator.target('cms-image', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-image', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-image', 'setLangObject')
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
    _routePageChanged(routeData, query) {
        if (!!routeData.page && routeData.page === "view-images") {
            if (!!query.add) {
                this.addTo = true
                console.log()
            }
            if (!!query.gallery) {
                this.gallery = query.gallery
                this.getGalleryImages(this.gallery, `removed,==,false`)
            }
        }
    }

    _selectAll() {
        if (this.checked === false) {
            this.checked = true
            this.toAdd = this.IMAGES
        } else
            if (this.checked === true) {
                this.toAdd = []
                this.checked = false
            } else {
                throw 'not the right type!! Expected Boolean got: ' + typeof this.checked
            }
    }

    _saveAndBack() {
        if (this.query.type === 'page') {
            let sendBackArray = JSON.parse(localStorage[`${this.query.type}-${this.query.content}`])
            let topush = sendBackArray.images.content
            topush.concat(this.toAdd)
            sendBackArray.images.content = topush
            localStorage[`${this.query.type}-${this.query.content}`] = JSON.stringify(sendBackArray)
            console.log(content)
        }
        if (this.query.type === 'cats') {
            let content = JSON.parse(localStorage[`${this.query.type}-${this.query.parent}-${this.query.content}`])
            console.log(content)
        }
    }
    _setContent(cont) {
        return cont
    }
    _setLabelAdd(data) {
        if (data === true) {
            return ''
        } else {
            return 'add'
        }
    }
    _setLabelDelete(data) {
        if (data === true) {
            return 'add'
        } else {
            return 'delete'
        }
    }
    reset() {
        this.routeData.page = ''
        this.slashed = true;
        this.imageData = []
    }
}
customElements.define(cmsImages.is, cmsImages);