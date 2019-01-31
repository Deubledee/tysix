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
            width: 99%
        }

        section[bottom] {
            max-height: 359px;
            flex-basis: 30%
        }

        section[bottom2] {
            max-height: 359px;
            flex-basis: 100%
        }
        cms-image-viewer {
            display: block;
            top: -403px;
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
        </style>
        <main id="main">
            <nav bottom id="bottom">
                <paper-button id="saveButton" class="diferent" on-click="save" aria-label="mode-save">
                        SAVE [[editing]]
                </paper-button>
                <dom-if if="[[!add]]">
                    <template>
                        <paper-button on-click="toggleTada" class="close" aria-label="mode-save">
                                close
                        </paper-button>
                    </template>
                </dom-if>
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
                            <section bottom>
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
                                    <!--cms-input-sellector  class="diferent" options="[[categories]]" value="{{art.category}}">          
                                    </cms-input-sellector--> 
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
                            </section>
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
                                    <paper-button >
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
                                    <paper-input hidden value="[[art.description]]" on-input="inputing" placeholder=>"[[art.description]]"></paper-input>
                                </div>
                            </section>
                            <section bottom2>
                                <div left>
                                    <div>
                                        <paper-button on-click="openSideImages">
                                            images
                                        </paper-button>
                                        <paper-icon-button on-click="addImage" icon="image:loupe" aria-label="mode-edit">
                                        </paper-icon-button> 
                                    </div>
                                    <paper-button class="diferent" on-click="cancelImages" aria-label="mode-cancel">
                                        cancel
                                    </paper-button> 
                                </div>                                     
                                <div rightImages>                           
                                    <cms-images 
                                    adding$="[[!adding]]" 
                                    contents="[[getImage(art)]]" 
                                    sett="[[sett]]" 
                                    del 
                                    remove="{{remove}}">
                                    </cms-images>
                                    <slot></slot>
                                </div>
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
            image: {
                type: Object,
                notify: true,
                observer: 'setImage'
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
        this.tada = !this.tada
    }

    toggleZIndex(data) {
        if (data === true) {
            //  console.log(this.style.zIndex, this.$.bottom)
            this.style.display = 'block'
            setTimeout(() => {
                this.$.bottom.classList.add('open')
            }, 100)
        } else {
            //   console.log(data, this.$.bottom)
            this.$.bottom.classList.remove('open')
            //   this.$.bottom.style.transitionProperty = 'height, opacity';
            //  this.$.bottom.style.transitionDuration = '.5s, 1s'
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
            console.log(done);
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
        console.log(elem1)
        //this.indexed = event.model.__data.index
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
        console.log(elem1, elem)
        //this.indexed = event.model.__data.index
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
        this.cancelButton = event.srcElement.parentElement.previousElementSibling.children[1]
        if (this.temp === '') {
            let arr = '' + event.model.__data.art[par]
            if (arr.split('').length > 0) {
                this.temp = arr.split('').length === 0 ? null : event.model.__data.art[par]
                this.cancelButton.classList.remove('diferent')
                this.$.saveButton.classList.remove('diferent')
                this.editing = this.editing + 1
                console.log(this.editing, 'editing')
            }
        }
    }

    addImage() {
        if (this.viewerSet !== true) {
            console.log('came here instead')
            this.viewerSet = true
            this.viewer = document.createElement('cms-gallery-viewer')
            this.viewer.killSett = true
            /*this.viewer.closeHead = true
            this.viewer.openMain = true*/
            this.viewer.addMethod = (this.setImage).bind(this)
            this.appendChild(this.viewer)
        } else {
            this.viewerSet = false
            this.removeChild(this.viewer)
        }
    }

    getImage(image) {
        if (image !== undefined) {
            let url = image.image instanceof Array === true ? image.image[0] : image.image
            let url2 = image.largeImage instanceof Array === true ? image.largeImage[0] : image.largeImage
            let obj1 = { url: url, title: image.title, type: 'image' }
            let obj2 = { url: url2, title: image.title, type: 'largeImage' }
            let arr = []
            arr.push(obj1)
            arr.push(obj2)
            console.log(arr)
            return arr
        } else {
            return [{ url: '', title: '', type: '' }]
        }
    }

    setImage(data) {/**/
        console.log(data, this.imageElement)
        if ('url' in data) {
            this.set('tempArray', [{ url: this.content[0].image, title: data.title }])
            this.setImages(data)
            this.addingcancel = this.adding
            this.adding = !this.adding
            this.imageElement.contents = []
            this.imageElement.contents = [data]
            this.cancelButton.classList.remove('diferent')
            this.$.saveButton.classList.remove('diferent')
            this.editing = this.editing + 1
        }
    }

    setImages() {
        for (let i = 0, temp = this.tempArray; i < temp.length; i++) {
            this.content[0][temp[i].type] = temp[i].url
        }
        console.log(this.content)
    }

    del() {
        for (let i = 0, temp = this.tempArray; i < temp.length; i++) {
            this.content[0][temp[i].type] = ''
        }
    }

    deleteImg(data) {
        let arr = Object.keys(data)
        if (arr.length > 0) {
            this.push('tempArray', data)
            this.del()
            this.cancelButton.classList.remove('diferent')
            this.$.saveButton.classList.remove('diferent')
            this.editing = this.editing + 1
            this.remove = {}
        }
    }

    cancelImages() {
        //  this.cancelButton.classList.add('diferent')
        //this.$.saveButton.classList.add('diferent')
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

    cancel(event) {
        let par = event.srcElement.previousElementSibling.innerText.toLowerCase()
        let input = event.srcElement.parentElement.nextElementSibling.children[2]
        let string = "art." + par
        input.value = this.temp
        event.srcElement.classList.add('diferent')
        if (this.canceled !== true) {
            this.cancelState(event.srcElement.parentElement.nextElementSibling)
            event.model.set(string, input.value)
            // this.canceled = !this.canceled
        }
    }

    cancelState(srcElement) {
        this.temp = ''
        if (this.editing <= 1) {
            this.editing = 0
            this.$.saveButton.classList.add('diferent')
            srcElement.children[2].hidden = true
            srcElement.children[1].classList.remove('diferent')
        } else {
            this.editing = this.editing - 1
            this.canceled = true
            srcElement.classList.add('diferent')
            srcElement.children[2].hidden = true
            srcElement.children[1].classList.remove('diferent')
        }
    }

    /**
     * @param {number} a - this is a value.
     * @param {number} b - this is a value.
     * @return {number} result of the sum value.
     */

    openSideImages(event) {
        this.openSide(event)
        let elem = event.srcElement.parentElement.nextElementSibling.children[0]
        let elemAdd = event.srcElement.parentElement.children[2]
        elemAdd.classList.toggle('diferent')
        this.imageElement = elem
        this.imageElement.killSett = true
        console.log('openSideImages', elem)
    }

    openSide(event) {
        let elem = event.srcElement.parentElement.nextElementSibling
        this.cancelButton = event.srcElement.parentElement.children[1]
        if (this.temp !== '' || this.canceled === true) {
            this.temp = ''
            this.canceled = false
        }
        elem.style.transitionProperty = 'opacity';
        elem.style.transitionDuration = '2s'
        elem.parentElement.style.transitionProperty = 'witdh, height';
        elem.parentElement.style.transitionDuration = '2s';
        if (elem.style.display === 'none' || elem.style.display === '') {
            if (elem.hasAttribute('rightImages') === true) {
                elem.style.display = 'flex'
                elem.style.flexFlow = 'column';
            } else {
                elem.style.display = 'block'
            }
            setTimeout(() => {
                elem.parentElement.style.width = '495px'
                elem.style.opacity = 1
            }, 60)
        } else {
            elem.style.display = 'none'
            elem.style.flexFlow = 'unset';
            elem.style.opacity = 0
            elem.parentElement.style.width = 'auto'
        }
    }

}
customElements.define(cmsArticleContent.is, cmsArticleContent);