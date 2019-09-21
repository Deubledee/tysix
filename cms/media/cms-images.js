import { html } from '@polymer/polymer/polymer-element.js';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import { cmsMediaLib } from '../tools/cms-save-lib.js';
import '../media/cms-image';
import './cms-image-item'
class cmsImages extends cmsMediaLib(cmsMiddlePageTemplate) {
    static get _topLabel() {
        return html`       
            <h3 class="higherh3">[[query.gallery]]</h3>       
            <h5 class="higherh5"> [[images]] </h5> 
        `
    }
    static get _getSilentAnchor() {
        return html`
            <a href="[[rootPath]]media/images/add-images?&add=true">
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
            <div class="center">  
                <h4> 
                [[delete]]   [[add]]     </h4>     
            </div>  
        </section>`
    }
    static get _getTable() {
        let template = html`
            <div table> 
                <cms-image 
                    add-to="{{add}}" 
                    ad-tosub="[[adTosub]]" 
                    to-content="[[contentto]]" 
                    indexarr="[[indexarr]]"
                    return-path="[[returnPath]]"
                    save-button="[[saveButton]]" 
                    reset-button="[[resetButton]]"
                    lang="[[lang]]" 
                    route="[[route]]"
                    images="[[contents]]">
                </cms-image>
            </div>`
        return template
    }
    static get is() { return 'cms-images'; }

    static get properties() {
        return {
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            hidebottom: {
                type: Boolean,
                value: true,
                reflectToAttribute: true,
            },
            indexarr: Array,
            lang: {
                type: String,
                notify: true
            },
            langs: {
                type: Object,
                value: {}
            },
            add: {
                type: String,
                notify: true,
                computed: '_setLabelAdd(addTo)'
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
            Seach: {
                type: String,
                notify: true,
                value: ''
            },
            route: {
                type: Object,
                notify: true
            },
            add: {
                type: Boolean,
                notify: true
            },
            adTosub: {
                type: Boolean,
                notify: true
            },
            returnPath: {
                type: String,
                notify: true,
            },
            contentto: {
                type: Object,
                notify: true
            },
            resetButton: Object,
            saveButton: Object,
            imageData: {
                type: Array,
                notify: true
            },
            user: {
                type: Object,
                notify: true,
            },
            contents: {
                type: Array,
                notify: true,
                computed: '_setContent(imageData)'
            },
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, active, query)'
        ];
    }
    ready() {
        super.ready()
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
            if (!!query.gallery) {
                this.gallery = query.gallery
                try {
                    this.getGalleryImages(this.gallery, `removed,==,false`)
                }
                catch (err) {
                    console.log(err)
                }
            }
        }

        /*     this.slashed = false;
             this.set('Seach', location.search)
             this.set('add', false)
             if ('addimageto' in query) {
                 this.set('add', true)
                 if ('indexarr' in query) {
                     this.set('indexarr', query.indexarr.split(''))
                     this.adTosub = query.adTosub
                 }
                 this.set('contentto', query.content)
             }*/
    }
    _setContent(cont) {
        console.log(cont)
        this.slashed = false;
        this.removed = false;
        this.set('inform', cont.info)
        return cont/**/
    }
    _setLabelAdd(data) {
        if (data === false) {
            return ''
        } else {
            return 'add'
        }
    }
    _setLabelDelete(data) {
        if (data === true) {
            return ''
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