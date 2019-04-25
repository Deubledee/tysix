
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsItemImageTemplate } from '../templates/cms-item-image-template';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import { Setter } from '../tools/cms-element-set';
const Consts = new Setter()
Consts.assets = Consts.getAssets('cms-image')
class cmsImage extends cmsItemImageTemplate {
    static get _getItem() {
        return html` 
        <dom-repeat repeat items="[[content]]" as="item">
            <template>
                <cms-image-item  
                    to-content="[[toContent]]"
                    add="[[addTo]]" 
                    lang="[[lang]]" 
                    image="[[item]]" 
                    save-button="[[saveButton]]"
                    reset-button="[[resetButton]]"
                    delete="[[_deleteImg]]">
                </cms-image-item>
            </template>                            
        </dom-repeat>`
    }
    static get _getMenu() {
        return html`                         
            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4>  [[image]]   </h4>     
                </div>  
            </section>

            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4> 
                    [[title]]    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4> 
                    [[dateCreated]]    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4> 
                    [[Gallery]]     </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4> 
                    [[url]]      </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4> 
                    [[delete]]   [[add]]     </h4>     
                </div>  
            </section>`
    }
    static get is() { return 'cms-image'; }

    static get properties() {
        return {
            lang: {
                type: String,
                notify: true,
                observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
            },
            addTo: {
                type: Boolean,
                value: false
            },
            add: {
                type: String,
                value: 'add'
            },
            delete: {
                type: String,
                value: 'delete'
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
        Consts.assets.then((querySnapshot) => {
            let style = querySnapshot.data();
            Consts.setLangObject.call(this, style);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
    }
    toggle(data) {
        this.size = data
    }
    __changeLang() {
        Consts.changeLang.call(this)
        this._setLabel(this.addTo)
    }
    _setLabel(data) {
        if (data === true) {
            this.set('delete', '')
        }
        if (data === false) {
            this.set('add', '')
        }
    }
    _placeEventMethod(data) {
        data.addEventListener('click', (this.showPage).bind(this))
    }
    showPage() {
        let string = window.btoa(JSON.stringify(this.toContent))
        this.resetButton.click()
        window.history.pushState({}, null, `${this.rootPath}${this.returnPath}?content=${string}&added=true`);
        window.dispatchEvent(new CustomEvent('location-changed'));
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
    _deleteImg(data) {
        console.log(data)
    }
}
customElements.define(cmsImage.is, cmsImage);