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
import './cms-image.js';

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
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>
        <main id="main">
            <div>                
                <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
                    <a href="[[rootPath]]content/pages/">
                        <paper-icon-button icon="arrow-back" aria-label="Go back">
                        </paper-icon-button>
                    </a>
                </iron-selector>
                <paper-button id="saveButton" class="diferent" on-click="save" aria-label="mode-save">
                    SAVE 
                </paper-button>
            </div>
            <div conatainer>
                <nav bottom id="bottom">
                    <dom-repeat repeat items="[[content]]" as="cat">
                        <template>
                            <div bottom>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            Article title 
                                        </paper-button>

                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>

                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                [[art.title]]
                                            </paper-button>
                                            <paper-input hidden value="{{cat.title}}" on-input="inputing" placeholder=>"[[art.title]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            Category
                                        </paper-button>

                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                [[art.category]]
                                            </paper-button>
                                            <paper-input hidden value="{{cat.category}}" on-input="inputing" placeholder=>"[[art.category]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            type
                                        </paper-button>

                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                [[art.type]]
                                            </paper-button>
                                            <paper-input hidden value="{{cat.type}}" on-input="inputing" placeholder=>"[[art.type]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            brand
                                        </paper-button>
                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                            [[art.brand]]
                                            </paper-button>
                                            <paper-input hidden value="[[art.brand]]" on-input="inputing" placeholder=>"[[art.brand]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            price 
                                        </paper-button>
                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                            [[art.price]]
                                            </paper-button>
                                            <paper-input hidden value="[[art.price]]" on-input="inputing" placeholder=>"[[art.price]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                        description
                                        </paper-button>
                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                            [[art.description]]
                                            </paper-button>
                                            <paper-input hidden value="[[art.description]]" on-input="inputing" placeholder=>"[[art.description]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom3>
                                    [[slotImageElement(art)]]
                                    <slot name="image">
                                    </slot>
                                </section>
                            </div>                                           
                        </template>
                    </dom-repeat>
                </nav> 
                <nav side>
                    <dom-repeat repeat items="[[article]]" as="cat">
                        <template> 
                            <div left>
                                <aside>
                                    <span>
                                        author
                                    </span>
                                </aside>
                            </div>
                            <div right>
                                <aside>
                                    <span>
                                        [[art.author]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[art.dateCreated]]
                                    </span>
                                </aside>
                            </div> 
                            <div left>
                                <aside>
                                    <span>
                                        author
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        date created
                                    </span>
                                </aside>
                            </div>
                            <div right>
                                <aside>
                                    <span>
                                        [[art.author]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[art.dateCreated]]
                                    </span>
                                </aside>
                            </div>
                            <div center>
                                <aside>
                                    <span>
                                        last modified
                                    </span>
                                </aside>
                            </div>
                            <div left>
                                <aside>
                                    <span>
                                        author
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        date 
                                    </span>
                                </aside>
                            </div>
                            <div right>
                                <dom-repeat repeat items="[[art.lastModified]]" as="createdAt">
                                    <template>
                                        <aside>
                                            <span>
                                                [[createdAt.author]] 
                                            </span>                                                          
                                        </aside>  
                                        <aside>
                                            <span>
                                                [[createdAt.date]]
                                            </span>
                                        </aside>
                                    </template>
                                </dom-repeat>
                            </div>                    
                        </template>
                    </dom-repeat> 
                </nav> 
            </div>
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

    static get observers() {
        return [
            '_routePageChanged(routeData, query, active)'
        ];
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

    _routePageChanged(routeData, query, active) {
        if (active === true) {
            this.set('content', [])
            if ('content' in query) {
                this.set('tada', false)
                this.set('content',
                    [JSON.parse(window.atob(query.content))])
                this.set('add', (query.add === 'true'))
                this.slashed = false
            }
        }
        else if (active === false && this.slashed === false) {
            this.set('content', [])
            this.set('add', false)
            window.history.pushState({}, null, `${location.pathname}/`);
            window.dispatchEvent(new CustomEvent('location-changed'))
            this.slashed = true
        }
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

    slotImageElement(cat) {
        let template = html` <cms-image slot="image">
                               <cms-image-form slot="imageForm">
                               </cms-image-form>
                            </cms-image>`,
            clone = document.importNode(template.content, true);
        this.appendChild(clone)
        this.imageElement = this.children[0]
        this.imageElement.set('images', cat)
        this.cancelButton = this.imageElement.$.cancel

        if ('deleted' in this.query && this.query.deleted === true || this.query.deleted === 'true') {
            this.cancelButton.classList.remove('diferent')
        }
        this.imageElement.deleteImg = (this.deleteImg).bind(this)
        this.imageElement.$.add.addEventListener('click', (this.addImage).bind(this))
        this.imageElement.$.cancel.addEventListener('click', (this.cancelImages).bind(this))
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

    _fromImage(image) {
        let url, obj1, obj2, arr = []
        if (image.image.length >= 1) {
            for (let i = 0; i < image.image.length; i++) {
                url = image.image[i]
                obj1 = { url: url, title: image.title, type: 'image' }
                arr.push(obj1)
            }
            this.imageElement.set('del', true)
        } else {
            url = ''
            obj2 = { url: url, title: '' }
            arr.push(obj2)
            this.imageElement.set('del', false)
        }
        return arr
    }

    _fromlargeImage(image) {
        let url2, obj2, arr = []
        if (image.largeImage.length >= 1) {
            for (let i = 0; i < image.largeImage.length; i++) {
                url2 = image.largeImage[i]
                obj2 = { url: url2, title: image.title, type: 'largeImage' }
                arr.push(obj2)
            }
            this.imageElement.set('del', true)
        } else {
            url = ''
            obj2 = { url: url, title: '' }
            arr.push(obj2)
            this.imageElement.set('del', false)
        }
        return arr
    }

    getImage(image) {
        if (image !== undefined) {
            let url = image.image,
                url2 = image.largeImage,
                obj1, obj2,
                arr = []
            if (image.image instanceof Array === true) {
                obj1 = this._fromImage(image)
            } else {
                obj1 = [{ url: url, title: image.title, type: 'image' }]
                arr.push(obj1)
            }

            if (image.largeImage instanceof Array === true) {
                obj2 = this._fromlargeImage(image)
            } else {
                obj2 = [{ url: url2, title: image.title, type: 'largeImage' }]
                arr.push(obj2)
            }
            console.log(arr.concat(obj1, obj2))
            return arr.concat(obj1, obj2)
        } else {
            console.log('fucck')
            return [{ url: '', title: '', type: '' }]
        }
    }

    setImage(data) {/**/
        console.log(this.content[0].image, 'data')
        if ('url' in data) {
            let img = new Image(), arr = []
            img.src = data.url
            if (img.naturalHeight < 600) {
                if (this.content[0].image instanceof Array === true) {
                    arr = this.content[0].image
                } else {
                    arr.push(this.content[0].image)
                }
                // arr.push(data.url)
            }
            if (img.naturalHeight >= 600) {
                if (this.content[0].largeImage instanceof Array === true) {
                    arr = this.content[0].largeImage
                } else {
                    arr.push(this.content[0].largeImage)
                }
                // arr.push(data.url)
            }
            this.addingcancel = this.adding
            this.adding = !this.adding
            this.imageElement.set('del', true)
            this.imageElement.set('images', this.getImage(this.content[0]))
            this.cancelButton.classList.remove('diferent')
            this.$.saveButton.classList.remove('diferent')
            this.editing = this.editing + 1
        }
    }

    del(data, index) {
        if (this.content[0].image instanceof Array === true) {
            if (index > 0) {
                this.content[0][data.type].splice(index, index)
            } else {
                this.content[0][data.type].splice(0, 1)
            }
        } else {
            this.content[0][data.type] = []
        }
        this.imageElement.set('images', this.getImage(this.content[0]))
    }

    deleteImg(data) {
        if (data !== undefined) {
            this.del(data.model.__data.image, data.model.__data.index)
            this.cancelButton.classList.remove('diferent')
            this.$.saveButton.classList.remove('diferent')
            this.editing = this.editing + 1
            this.remove = undefined
        }
    }

    cancelImages() {
        this.imageElement.set('images', this.tempArray)
        this.imageElement.set('del', true)
        this.cancelState()
        if (this.addingcancel === false) {
            this.adding = !this.adding
        }
    }
}
customElements.define(cmsArticleContent.is, cmsArticleContent);