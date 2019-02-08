import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/iron-icons/editor-icons.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-input/paper-input.js';
import './cms-images.js';
import './cms-common-styles.js';
import './cms-input-sellector.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { microTask } from '@polymer/polymer/lib/utils/async.js';
import './cms-gallery-viewer';

class cmsArticleContent extends PolymerElement {
    static get template() {
        return html`
        <style include="cms-common-styles">
        
        :host {
            position: absolute;
            z-index: 120;
        }

        main{
            width: 96%;
            left: -44px;
        }
     
        .open {
            opacity: 1!important;
            height: auto!important;
        }
        
        paper-button.close {
            background-color: #a9e5e5;
            color: black;
            font-weight: bold;
        }

        section[bottom]{
            ￼    max-height: 408px;
            }
    
            section[bottom3] {
                display: block;  
                flex-basis: 92%;    
            }
    
        [adding] {
            display: none!important
        }  

        div[buttons]{
            display: flex
        }


        </style>
        <main id="main">
            <nav bottom id="bottom">
                <div buttons>
                    <dom-if if="[[!add]]">
                        <template>
                            <paper-button chis on-click="toggleTada" aria-label="mode-save">
                                    X
                            </paper-button>
                        </template>
                    </dom-if>
                    <paper-button id="saveButton" class="diferent" on-click="save" aria-label="mode-save">
                            SAVE [[editing]]
                    </paper-button>
                </div>
                <dom-repeat items="[[content]]" as="art">
                    <template>
                        <div bottom>
                            <section bottom>
                                <div left>
                                    <paper-button>
                                        title
                                    </paper-button>
                                    <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                        cancel
                                    </paper-button>
                                </div>
                                <div right>
                                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button>
                                    <div>                                       
                                        [[art.title]]
                                    </div>
                                    <paper-input hidden value="[[art.title]]" on-input="inputing" placeholder=>"[[art.title]]"></paper-input>
                                </div>
                            </section>
                            <!--section bottom>
                                <div left>
                                    <paper-button >
                                        category
                                    </paper-button>
                                    <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                        cancel
                                    </paper-button>
                                </div>
                                <div right>
                                    <paper-icon-button on-click="editCats" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button>  
                                    <div>
                                        [[art.category]]
                                    </div>                                 
                                    <cms-input-sellector  class="diferent" options="[[categories]]" value="{{art.category}}">          
                                    </cms-input-sellector> 
                                </div>
                            </section>
                            <section bottom>
                                <div left>
                                    <paper-button >
                                        type
                                    </paper-button>
                                    <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                        cancel
                                    </paper-button>
                                </div>
                                <div right>
                                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button> 
                                    <div>
                                        [[art.type]] [[art.page]]
                                    </div>                                   
                                    <cms-input-sellector class="diferent" options="[[pageTypes]]" value="{{art.type}}">          
                                    </cms-input-sellector> 
                                </div> 
                            </section-->
                            <section bottom>
                                <div left>
                                    <paper-button >
                                        brand
                                    </paper-button>
                                    <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                        cancel
                                    </paper-button>
                                </div>
                                <div right>
                                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button>
                                    <div>
                                        [[art.brand]]
                                    </div>
                                    <paper-input hidden value="[[art.brand]]" on-input="inputing" placeholder=>"[[art.brand]]"></paper-input>
                                </div>
                            </section>
                            <section bottom>
                                <div left>
                                    <paper-button >
                                        price
                                    </paper-button>
                                    <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                        cancel
                                    </paper-button>
                                </div>
                                <div right>
                                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button>
                                    <div>
                                        [[art.price]]
                                    </div>
                                    <paper-input hidden value="[[art.price]]" on-input="inputing" placeholder=>"[[art.price]]"></paper-input>
                                </div>
                            </section>
                            <section bottom2>
                                <div left>
                                    <paper-button>
                                        description
                                    </paper-button>
                                    <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                        cancel
                                    </paper-button>
                                </div>
                                <div right>
                                    <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                    </paper-icon-button>
                                    <div>
                                        [[art.description]]
                                    </div>
                                    <paper-textarea hidden value="[[art.description]]" on-input="inputing" placeholder=>"[[art.description]]">
                                    </paper-textarea>
                                </div>
                            </section>
                            <section bottom3>
                                    [[setImageElement(art)]]
                                <slot></slot>
                            </section>
                        </div>
                    </template>
                </dom-repeat>
            </nav>
        </main>
        `
    }
    static get is() { return 'cms-article-content'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
            },
            content: {
                type: Array,
                value: [],
                notify: true
            },
            type: {
                type: String,
                value: '',
                notify: true
            },
            article: {
                type: Object,
                notify: true
            },
            articleName: {
                type: String,
                notify: true
            },
            articleIndex: {
                type: Number,
                notify: true
            },
            add: {
                type: Boolean,
                value: false,
                notify: true,
            },
            tada: {
                type: Boolean,
                value: false,
                notify: true,
                observer: 'toggleZIndex'
            },
            viewerSet: {
                type: Boolean,
                value: false,
                notify: true,
            },
            sett: {
                type: Boolean,
                value: false,
                notify: true
            },
            remove: {
                type: Object,
                observer: 'deleteImg'
            },
            canceled: {
                type: Boolean,
                value: false
            },
            imageElement: {
                type: Object,
            },
            cancelButton: {
                type: Object,
            },
            setter: {
                type: String,
                notify: true,
                value: 'false'
            },
            tempArray: {
                type: Array,
                value: [],
            },
            temp: {
                type: String,
                value: '',
            },
            editing: {
                type: Number,
                value: 0
            },
            pageTypes: {
                type: Array,
                value: [
                    { label: 'Page type' },
                    { name: '---' },
                    { name: 'list' },
                    { name: 'sub category', notAtive: false },
                    { name: 'Social', notAtive: false },
                    { name: 'Video', notAtive: false }]
            }
        }
    }

    ready() {
        super.ready();
    }

    log(data) {
        console.log('log from cms-article-content', data)
    }

    error(data) {
        console.error('error from cms-article-content', data)
    }

    toggleTada(data) {
        this.tada = false
        this.removeChild(this.children[0])
        this.set('content', [])
        for (let i = 1; 0 < this.childElementCount; i++) {
            this.removeChild(this.children[0])
        }

    }

    toggleZIndex(data) {
        if (data === true) {
            this.style.display = 'block'
            setTimeout(() => {
                this.$.bottom.classList.add('open')
            }, 100)
        } else {
            this.$.bottom.classList.remove('open')
            setTimeout(() => {
                this.style.display = 'none'
            }, 1000)
        }
    }

    save(event) {
        if (this.add === true) {
            this.push('article.content', this.content.pop())
        }
        let table = {
            name: this.articleName,
            content: this.article.content
        }
        this.DBW.updateArticles((done) => {
            this.editing = 0
            this.temp = ''
            this.cancelButton.classList.add('diferent')
            this.$.saveButton.classList.add('diferent')
        }, table)
    }

    editCats(event) {
        let elem = event.srcElement.parentElement.parentElement.children[2]
        let elem1 = event.srcElement.parentElement.parentElement.children[1]
        let color = event.srcElement.computedStyleMap().get('color').toString()
        if (color === "rgb(128, 152, 173)") {
            event.srcElement.style.color = "var(--google-blue-700)"
        } else {
            event.srcElement.style.color = "rgb(128, 152, 173)"
        }
        elem.setInputing = (function () {
            this.cancelButton.classList.remove('diferent')
            this.$.saveButton.classList.remove('diferent')
            this.editing = this.editing + 1
        }).bind(this)
        elem.classList.toggle('diferent')
        elem1.classList.toggle('diferent')
    }

    edit(event) {
        let elem = event.srcElement.parentElement.children[2]
        let elem1 = event.srcElement.parentElement.children[1]
        let color = event.srcElement.computedStyleMap().get('color').toString()
        if (color === "rgb(128, 152, 173)") {
            event.srcElement.style.color = "var(--google-blue-700)"
        } else {
            event.srcElement.style.color = "rgb(128, 152, 173)"
        }
        elem.hidden = !elem.hidden
        elem1.classList.toggle('diferent')
    }

    inputing(event) {
        let par = event.srcElement.parentElement.previousElementSibling.children[0].innerText.toLowerCase()
        let value = event.srcElement.value
        let string = "art." + par
        this.inputState(event, par)
        event.model.set(string, value)
    }

    inputState(event, par) {
        console.log(event.model.__data.index)
        this.set('cancelButton', event.srcElement.parentElement.previousElementSibling.children[1])
        let arr = '' + event.model.__data.art[par], index = event.model.__data.index
        if (arr.split('').length > 0) {
            if (this.tempArray[par] === undefined) {
                this.set('tempArray.' + par, arr.split('').length === 0 ? null : event.model.__data.art[par])
                this.editing = this.editing + 1
            }
            this.cancelButton.classList.remove('diferent')
            this.$.saveButton.classList.remove('diferent')
        }
    }

    cancel(event) {
        let par = event.srcElement.previousElementSibling.innerText.toLowerCase()
        let input = event.srcElement.parentElement.nextElementSibling.children[2]
        let string = "art." + par, index = event.model.__data.index
        input.value = this.tempArray[par]
        // event.srcElement.classList.add('diferent')
        if (this.canceled !== true) {
            this.cancelState(event.srcElement.parentElement.nextElementSibling, par)
            event.model.set(string, input.value)
        }
    }

    cancelState(srcElement, par) {
        delete this.tempArray[par]
        if (this.editing <= 1) {
            this.set('editing', 0)
            this.$.saveButton.classList.add('diferent')
        } else {
            this.set('editing', this.editing - 1)
            this.canceled = true
        }
        //srcElement.classList.add('diferent')
        srcElement.children[2].hidden = true
        srcElement.children[1].classList.remove('diferent')
    }
    setImageElement(cat) {
        let template = html`
        <div left>
            <paper-button>
                images
            </paper-button>
            <paper-icon-button on-click="addImage" icon="image:loupe" aria-label="mode-edit">
            </paper-icon-button> 
            <paper-button class="diferent" on-click="cancelImages" aria-label="mode-cancel">
                cancel
            </paper-button>            
        </div>                                
        <div class="rightImages">
            <cms-images class="images">
            </cms-images>
        </div>        
        `
        this.appendChild(template.content.children[0])
        this.appendChild(template.content.children[0])
        this.imageElement = this.children[1].children[0]
        this.imageElement.deleteImg = (this.deleteImg).bind(this)
        this.imageElement.set('sett', true)
        this.imageElement.set('form', false)
        this.imageElement.set('del', true)
        this.imageElement.set('images', this.getImage(cat))
        this.imageElement.set('adding', !this.imageElement.adding)
        this.cancelButton = this.children[0].children[2]
        this.children[0].children[1].addEventListener('click', (this.addImage).bind(this))
        this.cancelButton.addEventListener('click', (this.cancelImages).bind(this))
    }


    addImage() {
        let template = html`<cms-gallery-viewer></cms-gallery-viewer>`
        console.log(this.children[1].childElementCount)
        if (this.children[1].childElementCount < 2) {
            this.children[1].prepend(template.content.children[0])
            this.children[1].children[0].addMethod = (this.setImage).bind(this)
        } else {
            this.children[1].removeChild(this.children[1].children[0])
        }
    }

    getImage(image) {
        if (image !== undefined) {
            let url = image.image,
                url2 = image.largeImage,
                obj1, obj2, arr = []
            if (image.image instanceof Array === true) {
                for (let i = 0; i < image.image.length; i++) {
                    url = image.image[i]
                    obj1 = { url: url, title: image.title, type: 'image' }
                    arr.push(obj1)
                }
            } else {
                obj1 = { url: url, title: image.title, type: 'image' }
                arr.push(obj1)
            }

            if (image.largeImage instanceof Array === true) {
                for (let i = 0; i < image.largeImage.length; i++) {
                    url2 = image.largeImage[i]
                    obj2 = { url: url2, title: image.title, type: 'largeImage' }
                    arr.push(obj2)
                }
            } else {
                obj2 = { url: url2, title: image.title, type: 'largeImage' }
                arr.push(obj2)
            }
            console.log(arr)
            return arr
        } else {
            return [{ url: '', title: '', type: '' }]
        }
    }

    setImage(data) {/**/
        //console.log(this.content[0].image, 'data')
        if ('url' in data) {
            let img = new Image(), arr = []
            img.src = data.url
            if (img.naturalHeight < 600) {
                if (this.content[0].image instanceof Array === true) {
                    arr = this.content[0].image
                } else {
                    arr.push(this.content[0].image)
                }
                arr.push(data.url)
                console.log(this.content[0].image, 'darr2')
            }
            if (img.naturalHeight >= 600) {
                if (this.content[0].largeImage instanceof Array === true) {
                    arr = this.content[0].largeImage
                } else {
                    arr.push(this.content[0].largeImage)
                }
                arr.push(data.url)
                console.log(this.content[0].largeImage, 'arr2')
            }
            this.addingcancel = this.adding
            this.adding = !this.adding
            //this.cancelButton.classList.remove('diferent')
            this.$.saveButton.classList.remove('diferent')
            this.editing = this.editing + 1
        }
    }

    setImages() {

    }

    del() {
        for (let i = 0, temp = this.tempArray; i < temp.length; i++) {
            this.content[0][temp[i].type] = ''
        }
    }

    deleteImg(data) {
        let arr = Object.keys(data)
        console.log(data)
        if (arr.length > 0) {
            /*   this.push('tempArray', data)
               this.del()
               this.cancelButton.classList.remove('diferent')
               this.$.saveButton.classList.remove('diferent')
               this.editing = this.editing + 1
               this.remove = {}*/
        }
    }

    cancelImages() {
        let arr = []
        arr = this.imageElement.images
        for (let i = 0; i < this.tempArray.length; i++) {
            if ('url' in this.tempArray[i]) {
                arr.push(this.tempArray[i])
            }
        }
        if (this.addingcancel === false) {
            this._itemChangeDebouncer = Debouncer.debounce(this._itemChangeDebouncer,
                microTask, () => {
                    this.dispatchEvent(new CustomEvent('article-cancel-image', {
                        bubbles: true, composed: true
                    }))
                })
            this.adding = !this.adding
        }
        this.cancelState()
        this.setImages()
        this.imageElement.contents = []
        this.imageElement.contents = arr
        this.tempArray = []
    }
}
customElements.define(cmsArticleContent.is, cmsArticleContent);