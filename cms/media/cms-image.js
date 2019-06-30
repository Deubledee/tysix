
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsItemImageTemplate } from '../templates/cms-item-image-template';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
class cmsImage extends cmsItemImageTemplate {
    static get _getItem() {
        return html` 
        <dom-repeat repeat items="[[content]]" as="item">
            <template>
                <cms-image-item  
                    to-content="{{toContent}}"
                    add="[[addTo]]" 
                    add-to-subcats="{{addToSubcats}}"
                    image="[[item]]" 
                    save-button="[[saveButton]]"
                    reset-button="[[resetButton]]"
                    delete="[[_deleteImg()]]"
                    idx="[[index]]">
                </cms-image-item>
            </template>                            
        </dom-repeat>`
    }
    static get _getMenu() {
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
    static get is() { return 'cms-image'; }

    static get properties() {
        return {
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals.translator
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
            addTo: {
                type: Boolean,
                value: false,
                notify: true
            },
            adTosub: {
                type: Boolean,
                notify: true
            },
            addToSubcats: {
                type: Object,
                notify: true,
                value: {},
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
            images: {
                type: Array,
                notify: true
            },
            toggleSize: {
                type: Boolean,
                notify: true,
                value: false,
                observer: 'toggle',
            },
            returnPath: {
                type: String,
                notify: true
            },
            resetButton: Object,
            saveButton: {
                type: Object,
                observer: '_placeEventMethod'
            },
            content: {
                type: Array,
                notify: true,
                computed: 'getImage(images)'
            }
        };
    }
    _log(data) {
        console.log(data)
    }
    ready() {
        super.ready()
        this.translator.target('cms-image', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-image', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-image', 'setLangObject')
    }
    toggle(data) {
        this.size = data
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
    _placeEventMethod(data) {
        data.onclick = (this.showPage).bind(this)
    }
    showPage() {
        let string = window.btoa(JSON.stringify(this.toContent))
        /*  if (this.addToSubcats.items === undefined) {
              window.history.pushState({}, null, `${this.rootPath}${this.returnPath}?content=${string}&added=true`);
              window.dispatchEvent(new CustomEvent('location-changed'));
              console.log(this.toContent, string)
          } else {
              let string2 = window.btoa(JSON.stringify([this.addToSubcats]))*/
        console.log(this.toContent)
        window.history.pushState({}, null, `${this.rootPath}${this.returnPath}?content=${string}&indexarr=${this.indexarr}&adTosub=${this.adTosub}`);
        window.dispatchEvent(new CustomEvent('location-changed'));

        //   }
        //this.resetButton.click()
        this.saveButton.classList.add('diferent')
        this.resetButton.classList.remove('diferent')
        this.toContent = Object()
        this.image = Array()
    }
    _fromAray(data) {
        let arr = [], obj2;
        if (data instanceof Array === true && data.length >= 1) {
            let t = new Date();
            for (let i = 0; i < data.length; i++) {
                obj2 = data[i];
                arr.push(obj2);
            }
        }
        return arr;
    }
    getImage(data) {
        let arr
        if (data !== undefined) {
            if (data['image']) {
                arr = this._fromAray(data.image);
            } else if (data instanceof Array) {
                arr = this._fromAray(data)
            } else {
                arr = this._fromAray([data])
            }
            return arr
        }
    }
    deleteImage(data) {
        let arr = []
        for (let i = 0; i < this.content.length; i++) {
            if (i !== parseInt(data)) {
                arr.push(this.content[i])
            }
        }
        this.set('images', arr)
    }
    _openConfirm(event) {
        let index = event.srcElement.parentElement.getAttribute('value').split('-').pop()
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: {
                    name: this.content[index].title,
                    method: (this.deleteImage).bind(this),
                    argument: index,
                    headderMsgKind: 'delete',
                    type: 'image'
                }
            }));
        });
    }
    _deleteImg() {
        return (this._openConfirm).bind(this)
    }
}
customElements.define(cmsImage.is, cmsImage);