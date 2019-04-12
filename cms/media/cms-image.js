
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsItemImageTemplate } from '../templates/cms-item-image-template';
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
                    <h4>  image   </h4>     
                </div>  
            </section>

            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4> 
                    title    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4> 
                    date created    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4> 
                    gallery     </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4> 
                    url      </h4>     
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
            addTo: {
                type: Boolean,
                value: false,
                observer: '_setLabel'
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
    }
    _setLabel(data) {
        console.log(data)
        if (data === true) {
            this.delete = ''
        }
        if (data === false) {
            this.add = ''
        }
    }
    _placeEventMethod(data) {
        data.addEventListener('click', (this.showPage).bind(this))
    }
    showPage() {
        let string = window.btoa(JSON.stringify(this.toContent))
        window.history.pushState({}, null, `${this.rootPath}${this.returnPath}?content=${string}&added=true`);
        window.dispatchEvent(new CustomEvent('location-changed'));
        this.saveButton.classList.add('diferent')
        this.resetButton.classList.remove('diferent')
        this.toContent = Object()
        this.image = Array()
    }
    _fromAray(data) {
        let url, arr = [], obj2;
        if (data instanceof Array === true && data.length >= 1) {
            let t = new Date();
            for (let i = 0; i < data.length; i++) {
                obj2 = data[i];
                arr.push(obj2);
            }
        }
        else {
            url = '';
            obj2 = { url: url, title: '' };
            arr.push(obj2);
        }
        return arr;
    }
    getImage(data) {
        console.log('getImage', data)
        let arr
        if ('image' in data) {
            arr = this._fromAray(data.image);
        } else {
            arr = this._fromAray([data])
        }
        return arr || []
    }
    _deleteImg(data) {
        console.log(data)
    }
}
customElements.define(cmsImage.is, cmsImage);