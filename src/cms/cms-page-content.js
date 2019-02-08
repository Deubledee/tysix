import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/iron-icons/editor-icons.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-input/paper-input.js';
import './cms-images.js';
import './cms-common-styles.js';

class cmsPageContent extends PolymerElement {
    static get template() {
        return html`
        <style include="cms-common-styles">    
    
        </style>
        <main id="main">
            <nav bottom id="bottom" open$>
                <paper-button id="saveButton" class="diferent" on-click="save" aria-label="mode-save">
                        SAVE [[editing]]
                </paper-button>
                <dom-repeat items="[[content]]" as="cat">
                    <template>
                        <div bottom>
                            <section bottom>
                                <div left>
                                    <paper-button>
                                        Page title 
                                    </paper-button>
                                    <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                    cancel
                                    </paper-button>
                                </div>
                                <div right>
                                    <div>
                                        <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                        </paper-icon-button>
                                    </div>
                                    <div>
                                        [[cat.title]]
                                    </div>
                                    <paper-input hidden value="[[cat.title]]" on-input="inputing" placeholder=>"[[cat.title]]"></paper-input>
                                </div>
                            </section>
                            <section bottom>
                                <div left>
                                    <paper-button>
                                        Page lang 
                                    </paper-button>
                                    <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                    cancel
                                    </paper-button>
                                </div>
                                <div right>
                                    <div>
                                        <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                        </paper-icon-button>
                                    </div>
                                    <div>
                                        [[cat.lang]]
                                    </div>
                                    <paper-input hidden value="[[cat.lang]]" on-input="inputing" placeholder=>"[[cat.lang]]"></paper-input>
                                </div>
                            </section>
                            <section bottom>
                                <div left>
                                    <paper-button>
                                        Page type 
                                    </paper-button>
                                    <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                    cancel
                                    </paper-button>
                                </div>
                                <div right>
                                    <div>
                                        <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                        </paper-icon-button>
                                    </div>
                                    <div>
                                        [[cat.type]]
                                    </div>
                                    <paper-input hidden value="[[cat.type]]" on-input="inputing" placeholder=>"[[cat.type]]"></paper-input>
                                </div>
                            </section>
                            <section bottom2>
                                <div left>
                                    <paper-button>
                                    placeholder
                                    </paper-button>
                                    <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                        cancel
                                    </paper-button>
                                </div>
                                <div right>
                                    <div>
                                        <paper-icon-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                        </paper-icon-button>
                                    </div>
                                    <div>
                                        [[cat.placeholder]]
                                    </div>
                                    <paper-input hidden value="[[cat.placeholder]]" on-input="inputing" placeholder=>"[[cat.placeholder]]"></paper-input>
                                </div>
                            </section>
                            <section bottom3>
                                    [[setImageElement(cat)]]
                                <slot></slot>
                            </section>
                        </div>
                    </template>
                </dom-repeat>
            </nav>
        </main>
        `
    }
    static get is() { return 'cms-page-content'; }

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
            open: {
                type: Boolean,
                notify: true,
                value: false,
                reflectToAttribute: true
            },
            adding: {
                type: Boolean,
                notify: true,
                value: true,
                reflectToAttribute: true
            },
            category: {
                type: Object,
                notify: true
            },
            /*image: {
                type: Object,
                notify: true,
                observer: ''
            },*/
            categoryName: {
                type: String,
                notify: true
            },
            categoryIndex: {
                type: Number,
                notify: true
            },
            add: {
                type: Boolean,
                value: false,
                notify: true,
            },
            imageElement: {
                type: Object,
            },
            remove: {
                type: Object,
                observer: 'deleteImg'
            },
            tada: {
                type: Boolean,
                value: false,
                notify: true,
            },
            sett: {
                type: Boolean,
                value: false,
                notify: true
            },
            tempArray: {
                type: Array,
                value: [],
            },
            canceled: {
                type: Boolean,
                value: false
            },
            sabveButton: {
                type: Object,
            },
            cancelButton: {
                type: Object,
            },
            temp: {
                type: String,
                value: '',
            },
            editing: {
                type: Number,
                value: 0
            }
        }
    }

    ready() {
        super.ready();
    }

    log(data) {
        console.log('log from cms-category-content', data)
    }

    error(data) {
        console.error('error from cms-category-content', data)
    }

    clean(setterValue) {
        let setter
        if (setterValue instanceof MouseEvent === true) {
            setter = 'true'
        } else {
            setter = setterValue
        }
        if (this.pageName === 'N/a' || setterValue === 'newPage') {
            setter = false
        }
        scroll({ top: 0, behavior: 'smooth' });
        this.setter = setter
    }

    save(event) {
        let content = this.content.pop()
        if (this.add === true) {
            content.name = content.title.toLocaleLowerCase()
            content.name = content.name.split(' ').join('_')
            let obj = {
                parent: content.name,
                content: [],
                type: content.type
            }
            this.DBW.setPages((done, err) => {
                if (done !== 'error') {
                    this.DBW.setArticles((done, msg) => {
                        console.log(done, msg)
                    }, obj)
                    this.editing = 0
                    this.temp = ''
                    this.cancelButton.classList.add('diferent')
                    this.$.saveButton.classList.add('diferent')
                    this.clean('newPage')
                } else {
                    console.log(err)
                }
            }, content)
        } else {
            this.DBW.writePageContent((done, err) => {
                if (done !== 'error') {
                    this.editing = 0
                    this.temp = ''
                    this.cancelButton.classList.add('diferent')
                    this.$.saveButton.classList.add('diferent')
                    this.clean('newPage')
                } else {
                    console.log(err)
                    this.clean('true')
                }
            }, content)
        }
    }

    edit(event) {
        let elem = event.srcElement.parentElement.parentElement.children[2]
        let elem1 = event.srcElement.parentElement.parentElement.children[1]
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
        let par = event.srcElement.parentElement.previousElementSibling.children[0].innerText.split(' ').pop().toLowerCase()
        let value = event.srcElement.value
        let string = "cat." + par
        this.inputState(event, par)
        event.model.set(string, value)
    }

    inputState(event, par) {
        this.cancelButton = event.srcElement.parentElement.previousElementSibling.children[1]
        if (this.temp === '') {
            let arr = '' + event.model.__data.cat[par]
            if (arr.split('').length > 0) {
                console.log('came here instead')
                this.temp = arr.split('').length === 0 ? null : event.model.__data.cat[par]
                this.cancelButton.classList.remove('diferent')
                this.$.saveButton.classList.remove('diferent')
                this.editing = this.editing + 1
                console.log(this.editing, 'editing')
            }
        }
    }

    toggleElementPlease(noDel) {
        if (this.tada === false) {
            this.$.bottom.style.opacity = "1"
            this.$.bottom.style.height = "auto"
            this.setAttribute("open", true)
            this.$.main.style.zIndex = 120
            this.set('tada', !this.tada)
            if (noDel !== undefined) {
                setTimeout(() => {
                    this.imageElement.set('del', false)
                }, 200)
            }
            //this.openPageContent(event)
        } else {
            this.$.bottom.style.height = "0px"
            this.$.bottom.style.opacity = 0
            this.setAttribute("open", false)
            this.set('tada', !this.tada)
            this.$.main.style.zIndex = 0
            this.set('content', [])
            for (let i = 0; 0 < this.childElementCount; i++) {
                this.removeChild(this.children[0])
            }
        }
    }

    setImageElement(cat) {
        let template = html`
        <div left>
            <paper-button>
                images
            </paper-button>
            <paper-icon-button icon="image:loupe" aria-label="mode-edit">
            </paper-icon-button> 
            <paper-button class="diferent" aria-label="mode-cancel">
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
        if (this.children[1].childElementCount < 2) {
            this.children[1].prepend(template.content.children[0])
            this.children[1].children[0].addMethod = (this.setImage).bind(this)
        } else {
            this.children[1].removeChild(this.children[1].children[0])
        }
    }

    /**
     * 
     * @param {*} image 
     */

    getImage(image) {
        let url = image.image instanceof Array === true ? image.image.pop() : image.image
        let obj1 = { url: url, title: image.title }
        let arr = []
        arr.push(obj1)
        return arr
    }
    /**
     * 
     * @param {*} data 
     */
    setImage(data) {/**/
        console.log(data, this.imageElement)
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
    /**
     * @param {data} setImages - sets the image url in content array [0] the only index
     */
    setImages(data) {
        this.content[0].image = data.url
    }
    /**
     * @param {content[0].image} del - removes the image before cancel or save
     */
    del() {
        console.log(this.content[0])
        this.content[0].image = ''
    }
    /**
     * @param {*} data - to tempArray
     * @param {cancelButton} deleteImg - shows cancel button
     * @param {saveButton} deleteImg - shows svae button
     * @param {editing} deleteImg - increments + 1
     * @param {remove} deleteImg - changes remove state to undefined
     */
    deleteImg(data) {
        if (data !== undefined) {
            console.log(data.model.__data.image)
            this.push('tempArray', data.model.__data.image)
            this.del()
            this.cancelButton.classList.remove('diferent')
            this.$.saveButton.classList.remove('diferent')
            this.editing = this.editing + 1
            this.remove = undefined
        }
    }

    cancelImages() {
        this.cancelButton.classList.add('diferent')
        this.$.saveButton.classList.add('diferent')
        this.cancelState()
        if (this.addingcancel === false) {
            /*this._itemChangeDebouncer = Debouncer.debounce(this._itemChangeDebouncer,
                microTask, () => {
                    this.dispatchEvent(new CustomEvent('page-cancel-image', {
                        bubbles: true, composed: true
                    }))
                })*/
            this.adding = !this.adding
        }
        this.setImages(this.tempArray[0])
        //this.children.contents = []
        this.children.set('images', this.tempArray)
        this.tempArray = []
    }

    cancel(event) {
        let par = event.srcElement.previousElementSibling.innerText.split(' ').pop().toLowerCase()
        let input = event.srcElement.parentElement.nextElementSibling.children[2]
        let string = "cat." + par
        input.value = this.temp
        if (this.canceled !== true) {
            this.cancelState()
            event.model.set(string, input.value)
            this.canceled = !this.canceled
        }
    }

    cancelState() {
        this.temp = ''
        this.canceled = true
        if (this.editing <= 1) {
            this.cancelButton.classList.add('diferent')
            this.$.saveButton.classList.add('diferent')
            this.editing = 0
        } else {
            this.editing = this.editing - 1
        }
    }

    openSide(event) {
        let elem = event.srcElement//.parentElement//.nextElementSibling
        this.cancelButton = event.srcElement.children
        console.log(elem, event.srcElement, this.cancelButton)
    }
}
customElements.define(cmsPageContent.is, cmsPageContent);