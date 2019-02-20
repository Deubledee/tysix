import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/iron-icons/editor-icons.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-input/paper-input.js';
import './cms-images.js';
import './cms-common-styles.js';
import './cms-image.js';

class cmsPageContent extends PolymerElement {
    static get template() {
        return html`
        <style include="cms-common-styles">    
        :host {
            position: relative;
        }
        </style>        
        <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}" active="{{active}}">
        </app-route>
        <main id="main">
            <nav bottom id="bottom">
                <paper-button id="saveButton" class="diferent" on-click="save" aria-label="mode-save">
                        SAVE 
                </paper-button>
                <paper-button  on-click="close" aria-label="mode-save">
                        x 
                </paper-button>
                <dom-repeat repeat items="[[content]]" as="cat">
                    <template>
                        <nav>
                            <div bottom>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            Page title 
                                        </paper-button>

                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>

                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                [[cat.title]]
                                            </paper-button>
                                            <paper-input hidden value="[[cat.title]]" on-input="inputing" placeholder=>"[[cat.title]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            Page lang 
                                        </paper-button>
                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                [[cat.lang]]
                                            </paper-button>
                                            <paper-input hidden value="[[cat.lang]]" on-input="inputing" placeholder=>"[[cat.lang]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            Page type 
                                        </paper-button>
                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                [[cat.type]]
                                            </paper-button>
                                            <paper-input hidden value="[[cat.type]]" on-input="inputing" placeholder=>"[[cat.type]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom>
                                    <div left>
                                        <paper-button on-click="editTo">
                                            placeholder
                                        </paper-button>
                                        <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>
                                    </div>
                                    <div right>
                                        <div>
                                            <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                [[cat.placeholder]]
                                            </paper-button>
                                            <paper-input hidden value="[[cat.placeholder]]" on-input="inputing" placeholder=>"[[cat.placeholder]]"></paper-input>
                                        </div>
                                    </div>
                                </section>
                                <section bottom3>
                                    [[slotImageElement(cat)]]
                                    <slot name="image">
                                    </slot>
                                </section>
                            </div>

                            <div side>
                                <section>
                                    <div left>
                                        <div>
                                            <span>
                                                author
                                            </span>
                                        </div>
                                        <div>
                                            <span>
                                                date created
                                            </span>
                                        </div>
                                        <div>
                                            <span>
                                                last modified
                                            </span>
                                        </div>
                                    </div>
                                    <div right>
                                        <div>
                                            <span>
                                                [[cat.author]]
                                            </span>
                                        </div>
                                        <div>
                                            <span>
                                                [[cat.dateCreated]]
                                            </span>
                                        </div>
                                        <div>
                                            <dom-repeat repeat items="[[cat.lastModified]]" as="createdAt">
                                                <template>
                                                    <div>
                                                        <span>
                                                            [[createdAt.author]]
                                                        </span>
                                                        <span>
                                                            [[createdAt.date]]
                                                        </span>
                                                    </div>
                                                </template>
                                            </dom-repeat>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </nav>                        
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
            user: {
                type: Object,
                notify: true
            },
            query: Object,
            content: {
                type: Array,
                value: [{
                    title: '',
                    lang: '',
                    type: '',
                    name: '',
                    image: [],
                    placeholder: ''
                }],
                observer: 'toggleElementPlease',
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
            },
            slashed: {
                type: Boolean,
                value: false
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
        console.log('log from cms-category-content', data)
    }

    error(data) {
        console.error('error from cms-category-content', data)
    }

    _routePageChanged(routeData, query, active) {
        console.log(active)
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

    save() {
        let content = this.content.pop(), data = new Date(), obj, lastModified
        let author = ('author' in content === true && content.author.split('').length > 0) ?
            content.author : this.user
        let date = ('dateCreated' in content === true && content.dateCreated.split('').length > 0) ?
            content.dateCreated : data.toUTCString()
        if (this.add === true) {
            content.name = content.title.toLocaleLowerCase()
            content.name = content.name.split(' ').join('_')
            lastModified = ('lastModified' in content === true && content.lastModified.length > 0) ? content.lastModified : [];
            content.id = content.name
            content.uid = this.user.uid
            content.author = author
            content.dateCreated = date
            content.lastModified = lastModified
            lastModified.push(
                {
                    uid: this.user.uid,
                    author: this.user.displayName,
                    date: data.toUTCString()
                })
            let obj2 = {
                id: content.name,
                uid: this.user.uid,
                author: author,
                dateCreated: date,
                lastModified: lastModified,
                parent: content.name,
                content: [],
                type: content.type
            }
            console.log(obj2, content)
            this.DBW.setPages((done, err) => {
                if (done !== 'error') {
                    this.DBW.setArticles((done, msg) => {
                        console.log(done, msg)
                    }, obj2)
                    window.onbeforeunload = function () { };
                    this.editing = 0
                    this.temp = ''
                    this.cancelButton.classList.add('diferent')
                    this.$.saveButton.classList.add('diferent')
                    this.clean('newPage')
                    window.history.pushState({}, null, `content/pages?catlistcreated=true`);
                    window.dispatchEvent(new CustomEvent('location-changed'))
                } else {
                    console.log(err)
                }
            }, obj)
        } else {
            lastModified = [];
            lastModified.push(
                {
                    uid: this.user.uid,
                    author: this.user.displayName,
                    date: data.toUTCString()
                })
            content.id = content.name
            content.uid = this.user.uid
            content.author = author
            content.dateCreated = date
            content.lastModified = lastModified
            this.DBW.writePageContent((done, err) => {
                if (done !== 'error') {
                    window.onbeforeunload = function () { };
                    this.editing = 0
                    this.temp = ''
                    this.cancelButton.classList.add('diferent')
                    this.$.saveButton.classList.add('diferent')
                    this.clean('newPage')
                    window.history.pushState({}, null, `content/pages?catlistupdated=true`);
                    window.dispatchEvent(new CustomEvent('location-changed'))
                } else {
                    console.log(err)
                    this.clean('true')
                }
            }, obj)
        }
    }

    editTo(event) {
        let inpt, buttn,
            mainElem = event.srcElement.parentElement.parentElement.children[1].children[0]
        buttn = mainElem.children[0]
        inpt = mainElem.children[1]
        this.edit(event, inpt, buttn)
    }

    edit(event, inpt, buttn) {
        console.log(inpt, Number.isInteger(inpt))
        let input = Number.isInteger(inpt) === true ? event.srcElement.parentElement.children[1] : inpt
        let button = buttn || event.srcElement
        if (input.hidden === true) {
            input.hidden = false
            button.classList.add('diferent')
            window.onbeforeunload = function () {
                return "not without saving first :)";
            }
        } else {
            input.hidden = true
            button.classList.remove('diferent')
            if (this.editing === 0) {
                window.onbeforeunload = function () { };
            };
        }
    }

    inputing(event) {
        let par = event.srcElement.parentElement.parentElement.previousElementSibling.children[0].innerText.split(' ').pop().toLowerCase()
        console.log(event.srcElement.parentElement.parentElement.previousElementSibling, par)
        let value = event.srcElement.value
        let string = "cat." + par
        this.inputState(event, par)
        event.model.set(string, value)
    }

    inputState(event, par) {
        this.cancelButton = event.srcElement.parentElement.parentElement.previousElementSibling.children[1]
        if (this.temp === '') {
            let arr = '' + event.model.__data.cat[par]
            if (arr.split('').length > 0) {
                this.temp = arr.split('').length === 0 ? null : event.model.__data.cat[par]
                this.cancelButton.classList.remove('diferent')
                this.$.saveButton.classList.remove('diferent')
                this.editing = this.editing + 1
            }
        }
    }


    cancel(event) {
        let par = event.srcElement.previousElementSibling.innerText.split(' ').pop().toLowerCase()
        let input = event.srcElement.parentElement.nextElementSibling.children[0].children[1]
        console.log(par, input)
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
            window.onbeforeunload = function () { };
        } else {
            this.editing = this.editing - 1
        }
    }

    toggleElementPlease() {
        if (this.tada === false) {
            this.$.bottom.style.opacity = "1"
            this.$.bottom.style.height = "auto"
            this.setAttribute("open", true)
            this.$.main.style.zIndex = 120
            this.set('tada', !this.tada)
        } else {
            this.$.bottom.style.height = "0px"
            this.$.bottom.style.opacity = 0
            this.setAttribute("open", false)
            this.set('tada', !this.tada)
            this.$.main.style.zIndex = 0
            this.set('content', [])
            for (let i = 0; 0 < this.childElementCount; i++) {
                console.log
                this.removeChild(this.children[0])
            }
        }
    }

    slotImageElement(cat) {
        let template = html` <cms-image slot="image">
                            </cms-image>`,
            clone = document.importNode(template.content, true);
        this.appendChild(clone)
        this.imageElement = this.children[0]
        this.imageElement.set('images', cat)
        this.cancelButton = this.imageElement.$.cancel

        if ('deleted' in this.route.__queryParams && this.route.__queryParams.deleted === true || this.route.__queryParams.deleted === 'true') {
            this.cancelButton.classList.remove('diferent')
        }
        this.imageElement.deleteImg = (this.deleteImg).bind(this)
        this.imageElement.$.add.addEventListener('click', (this.addImage).bind(this))
        this.imageElement.$.cancel.addEventListener('click', (this.cancelImages).bind(this))
    }

    setImage(data) {
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
                this.content[0].image = arr
                this.notifyPath('content[0].image')
            }

            if (img.naturalHeight >= 600) {
                if (this.content[0].largeImage instanceof Array === true) {
                    arr = this.content[0].largeImage
                } else {
                    arr.push(this.content[0].largeImage)
                }
                arr.push(data.url)
                this.content[0].largeImage = arr
                this.notifyPath('content[0].largeImage')
            }
            //  this.imageElement.set('del', true)
            this.imageElement.set('images', this.content[0])
            this.addingcancel = this.adding
            this.adding = !this.adding
            this.$.saveButton.classList.remove('diferent')
            this.editing = this.editing + 1
        }
    }

    addImage() {
        let template = html`<cms-gallery-viewer></cms-gallery-viewer>`
        console.log('add image here')
        window.onbeforeunload = function () {
            return "not without saving first :)";
        };
        /*if (this.children[1].childElementCount < 2) {
            this.children[1].prepend(template.content.children[0])
            this.children[1].children[0].addMethod = (this.setImage).bind(this)
        } else {
            this.children[1].removeChild(this.children[1].children[0])
        }*/
    }

    setImages(data) {
        this.content[0].image = data.url
    }

    del(index) {
        if (this.content[0].image instanceof Array === true) {
            this.set('tempArray', this.content[0].image[index])
            if (index > 0) {
                this.content[0].image.splice(index, index)
            } else {
                this.content[0].image.splice(0, 1)
            }
        } else {
            this.set('tempArray', this.content[0].image)
            this.content[0].image = ''
        }

        let string = window.btoa(`${JSON.stringify(this.content[index])}`)
        window.history.pushState({}, null, `content/pages/edit-category-pages?content=${string}&deleted=true`);
        window.dispatchEvent(new CustomEvent('location-changed'));
        this.removeChild(this.children[0])
        /* this.imageElement.set('images', {})
         this.imageElement.set('images', this.content[0])*/
    }

    deleteImg(data) {
        if (data !== undefined) {
            this.del(data.model.__data.index)
            this.$.saveButton.classList.remove('diferent')
            this.editing = this.editing + 1
            this.remove = undefined
        }
    }

    cancelImages() {
        console.log(this.tempArray)
        this.imageElement.set('content', this.tempArray)
        //this.imageElement.set('del', true)
        this.cancelState()
        if (this.addingcancel === false) {
            this.adding = !this.adding
        }
    }
}
customElements.define(cmsPageContent.is, cmsPageContent);