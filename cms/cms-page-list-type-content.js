import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/iron-icons/editor-icons';
import { scroll } from '@polymer/app-layout/helpers/helpers';
import { dataBaseworker } from './dataBaseWorker';
import '@polymer/paper-input/paper-input';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import './cms-image';
import './cms-comon-style_v3';
const __DEV = true;
const _DBW = new dataBaseworker();
const _STYLES = _DBW.getElementAssets('cms-page-list-type-content', true);
class cmsPageListTypeContent extends PolymerElement {
    static get template() {
        return html`<style include="cms-comon-style_v3">
        :host {
            position: relative
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
            <div class="flex">
                <nav class="navbottom" id="bottom">
                    <dom-repeat repeat items="[[content]]" as="cat">
                        <template>
                            <div container>
                                <div bottom>
                                    <section class="flexchildbotom">
                                        <div class="flexleft">
                                            <paper-button on-click="editTo">
                                                [[pagetitle]]
                                            </paper-button>
        
                                            <paper-button  value="title" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                                [[cancel]]
                                            </paper-button>
        
                                        </div>
                                        <div class="flexright">
                                            <div>
                                                <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                    [[cat.title]]
                                                </paper-button>
                                                <paper-input hidden name="title" aria-label="title" value="{{cat.title}}" on-input="inputing"
                                                 placeholder="[[cat.title]]">
                                                </paper-input>
                                            </div>
                                        </div>
                                    </section>
                                    <section class="flexchildbotom">
                                        <div class="flexleft">
                                            <paper-button on-click="editTo">
                                                [[pagelang]]
                                            </paper-button>
                                            <paper-button  value="lang" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                                [[cancel]]
                                            </paper-button>
                                        </div>
                                        <div class="flexright">
                                            <div>
                                                <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                    [[cat.lang]]
                                                </paper-button>
                                                <paper-input hidden name="lang" value="[[cat.lang]]" on-input="inputing" placeholder="[[cat.lang]]">
                                                </paper-input>
                                            </div>
                                        </div>
                                    </section>
                                    <section class="flexchildbotom">
                                        <div class="flexleft">
                                            <paper-button on-click="editTo">
                                                [[pageType]]
                                            </paper-button>
                                            <paper-button  value="type" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                                [[cancel]]
                                            </paper-button>
                                        </div>
                                        <div class="flexright">
                                            <div>
                                                <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                    [[cat.type]]
                                                </paper-button>
                                                <paper-input hidden name="type" value="[[cat.type]]" on-input="inputing" placeholder="[[cat.type]]">
                                                </paper-input>
                                            </div>
                                        </div>
                                    </section>
                                    <section class="flexchildbotom">
                                        <div class="flexleft">
                                            <paper-button on-click="editTo">
                                                [[contentText]]
                                            </paper-button>
                                            <paper-button  value="contentText" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                                [[cancel]]
                                            </paper-button>
                                        </div>
                                        <div class="flexright">
                                            <div>
                                                <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                                    [[cat.contentText]]
                                                </paper-button>
                                                <paper-input hidden name="contentText" value="[[cat.contentText]]" on-input="inputing"
                                                 placeholder="[[cat.contentText]]">
                                                </paper-input>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                                <section class="flexchildbotom3">
                                    <div left>
                                        <paper-button>
                                            images
                                        </paper-button>
                                        <paper-icon-button icon="image:loupe" on-click="addImage" aria-label="mode-edit">
                                        </paper-icon-button> 
                                        <paper-button id="cancel" class="diferent" aria-label="mode-cancel">
                                            cancel
                                        </paper-button>            
                                    </div>
                                        [[slotImageElement(cat)]]
                                    <slot name="image">
                                    </slot>
                                </section>
                            </div>
                        </template>
                    </dom-repeat>
                </nav>
                <nav class="navside">
                    <dom-repeat repeat items="[[content]]" as="cat">
                        <template>
                            <div class="flexsidecenter">
                                <aside>
                                    <span>
                                        [[info]]
                                    </span>
                                </aside>
                            </div>
                            <div class="navsideleft">
                                <aside>
                                    <span>
                                        [[publishedby]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[publiShed]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[datepublished]]
                                    </span>
                                </aside>
                            </div>
                            <div class="navsideright">
                                <aside>
                                    <span>
                                        [[ _getPublishedBy(cat.publishedBy)]]
                                    </span>
                                </aside>
                                <aside published$="[[cat.published]]">
                                    <span>
                                        [[cat.published]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[cat.datePublished]]
                                    </span>
                                </aside>
                            </div>
                            <div class="navsideleft">
                                <aside>
                                    <span>
                                        [[author]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[datecreated]]
                                    </span>
                                </aside>
                            </div>
                            <div class="navsideright">
                                <aside>
                                    <span>
                                        [[cat.author]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[cat.dateCreated]]
                                    </span>
                                </aside>
                            </div>
                            <div class="flexsidecenter">
                                <aside>
                                    <span>
                                        [[lastmodified]]
                                    </span>
                                </aside>
                            </div>
                            <div class="navsideleft">
                                <aside>
                                    <span>
                                        [[author]]
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[date]]
                                    </span>
                                </aside>
                            </div>
                            <div rightSide>
                                <dom-repeat repeat items="[[cat.lastModified]]" as="createdAt">
                                    <template>
                                        <section>
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
                                        </section>
                                    </template>
                                </dom-repeat>
                            </div>
                        </template>
                    </dom-repeat>
                </nav>
            </div>
        </main>
        `;
    }
    static get is() { return 'cms-page-list-type-content'; }
    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker();
                },
                notify: true
            },
            user: {
                type: Object,
                notify: true
            },
            query: Object,
            /* content: {
                 type: Array,
                 value: [{
                     title: '',
                     lang: '',
                     type: '',
                     name: '',
                     image: new Array(),
                     contentText: ''
                 }],
                 notify: true
             },*/
            type: {
                type: String,
                value: '',
                notify: true
            },
            lang: {
                type: String,
                notify: true,
                observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
            },
            published: {
                type: String,
                value: '',
                notify: true,
                reflectToAttribute: true
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
                value: new Array(),
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
                type: Object,
                value: new Object(),
            },
            editing: {
                type: Number,
                value: 0
            },
            slashed: {
                type: Boolean,
                value: false
            }
        };
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, query, active)'
        ];
    }
    ready() {
        super.ready();
        _STYLES.then((querySnapshot) => {
            let langs = querySnapshot.data();
            this._setLangObject(langs);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
    }
    _routePageChanged(routeData, query, active) {
        if (Boolean(active) === true && Boolean(routeData.page) === true) {
            this.set('content', []);
            if ('catlistcreated' in query === false && 'catlistupdated' in query === false) {
                if ('content' in query) {
                    this.set('content', [JSON.parse(window.atob(query.content))]);
                    this.set('add', (query.add === 'true'));
                    this.slashed = false;
                }
            }
        }
        else if (Boolean(active) === false && Boolean(this.slashed) === false) {
            this.set('content', []);
            this.set('add', false);
            window.history.pushState({}, null, `${location.pathname}/`);
            window.dispatchEvent(new CustomEvent('location-changed'));
            this.slashed = true;
        }
    }
    __changeLang() {
        if (this.langs[this.lang]) {
            let obj = this.langs[this.lang];
            for (let par in obj) {
                this.set(par, obj[par]);
            }
        }
    }
    _setLangObject(langs) {
        for (let par in langs) {
            if (par !== 'styles') {
                this.langs[par] = langs[par].pop();
            }
        }
        this.__changeLang();
    }
    log(data) {
        console.log('log from cms-category-content', data);
    }
    error(data) {
        console.error('error from cms-category-content', data);
    }
    clean(setterValue) {
        let setter;
        if (setterValue instanceof MouseEvent === true) {
            setter = 'true';
        }
        else {
            setter = setterValue;
        }
        if (this.pageName === 'N/a' || setterValue === 'newPage') {
            setter = false;
        }
        scroll({ top: 0, behavior: 'smooth' });
        this.setter = setter;
    }
    _getPublishedBy(publishedBy) {
        if (publishedBy !== undefined && publishedBy.length > 0) {
            let pubuser = publishedBy[0].name;
            return pubuser;
        }
    }
    __reset() {
        this.slashed = true;
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            window.dispatchEvent(new CustomEvent('reset-list-type', {
                bubbles: true, composed: true, detail: 'categorypages'
            }));
        });
        console.log('log from cms-category-content');
        this.set('content', []);
        this.set('add', false);
    }
    save() {
        let content = this.content.pop(), data = new Date(), lastModified;
        let author = ('author' in content === true && content.author.split('').length > 0) ?
            content.author : this.user.displayName;
        let date = ('dateCreated' in content === true && content.dateCreated.split('').length > 0) ?
            content.dateCreated : data.toLocaleString().replace(',', '');
        lastModified = ('lastModified' in content === true && content.lastModified.length > 0) ? content.lastModified : [];
        if (this.add === true) {
            content.name = content.title.toLocaleLowerCase();
            content.name = content.name.split(' ').join('_');
            content.id = content.name;
            content.uid = this.user.uid;
            content.author = author;
            content.dateCreated = date;
            content.published = 'NP'
            lastModified.push({
                uid: this.user.uid,
                author: this.user.displayName,
                date: data.toLocaleString().replace(',', '')
            });
            content.lastModified = lastModified;
            let obj2 = {
                id: content.name,
                uid: this.user.uid,
                author: author,
                dateCreated: date,
                lastModified: lastModified,
                parent: content.name,
                content: new Array(),
                type: content.type
            };
            _DBW.setPages((done, err) => {
                if (done !== 'error') {
                    this.DBW.setArticles((done, msg) => {
                        console.log(done, msg);
                    }, obj2, __DEV);
                    window.onbeforeunload = function () { };
                    this.editing = 0;
                    this.temp = '';
                    this.cancelButton.classList.add('diferent');
                    this.$.saveButton.classList.add('diferent');
                    this.clean('newPage');
                    this.__reset();
                }
                else {
                    console.log(err);
                }
            }, content, __DEV);
        }
        else {
            lastModified.push({
                uid: this.user.uid,
                author: this.user.displayName,
                date: data.toLocaleString().replace(',', '')
            });
            content.id = content.name;
            content.uid = this.user.uid;
            content.author = author;
            content.dateCreated = date;
            content.lastModified = lastModified;
            this.DBW.writePagesContent((done, err) => {
                if (done !== 'error') {
                    window.onbeforeunload = function () { };
                    this.editing = 0;
                    this.temp = '';
                    this.cancelButton.classList.add('diferent');
                    this.$.saveButton.classList.add('diferent');
                    this.clean('newPage');
                    this.__reset();
                }
                else {
                    console.log(err);
                    this.clean('true');
                }
            }, content, __DEV);
        }
    }
    editTo(event) {
        let inpt, buttn, par, cancel, mainElem = event.srcElement.parentElement.parentElement.children[1].children[0];
        buttn = mainElem.children[0];
        inpt = mainElem.children[1];
        par = event.srcElement.innerText.split(' ').pop().toLowerCase();
        cancel = event.srcElement.nextElementSibling;
        this.edit(event, inpt, buttn, par, cancel);
    }
    edit(event, inpt, buttn, par, cancel) {
        this.input = Number.isInteger(inpt) === true ? event.srcElement.parentElement.children[1] : inpt;
        let button = buttn || event.srcElement;
        this.cancelButton = cancel || event.srcElement.parentElement.parentElement.previousElementSibling.children[1];
        this.modelCat = event.model.__data.cat;
        if (this.input.hidden === true) {
            this.input.hidden = false;
            button.classList.add('diferent');
            this.input.onkeydown = (this.__keyDownHandler).bind(this);
            window.onbeforeunload = function () {
                return "not without saving first :)";
            };
        }
        else {
            this.input.hidden = true;
            button.classList.remove('diferent');
            if (this.editing === 0) {
                this.input.onkeydown = function () { };
                window.onbeforeunload = function () { };
            }
        }
    }
    __keyDownHandler(event) {
        if (event.code === "Backspace" || event.code === "Delete") {
            this.set('par', event.srcElement.name);
            if (this.temp[event.srcElement.name] === '') {
                this.temp[event.srcElement.name] = this.modelCat[this.par];
                this.inputing(event);
            }

        }
    }
    inputing(event) {
        this.set('par', event.srcElement.name);
        let value = event.srcElement.value;
        let string = "cat." + this.par;
        console.log(this.par, this.input.value, event)
        if (this.par in this.temp === false) {
            this._setTemp()
        } else
            if (this.temp[this.par].canceled === true) {
                this._setTemp()
            }
        event.model.set(string, value);
    }
    _setTemp() {
        this.temp[this.par] = new Object()
        this.temp[this.par].data = this.add !== true ? this.modelCat[this.par] : undefined
        this.temp[this.par].canceled = false
        this._inputState();
    }
    _inputState() {
        console.log('in state')
        if (Boolean(this.input.value) === true) {
            this.cancelButton.classList.remove('diferent');
            this.$.saveButton.classList.remove('diferent');
            this.editing = this.editing + 1;
            this.canceled = false;
        }
    }
    Cancel(event) {
        let input = event.srcElement.parentElement.nextElementSibling.children[0].children[1]
        this.set('par', input.name)
        this.set('input', input)
        let string = "cat." + this.par;
        this.input.value = this.temp[this.par].data === undefined ? '' : this.temp[this.par].data;
        if (this.temp[this.par].canceled === false) {
            this.cancelState(event.srcElement);
            event.model.set(string, this.input.value);
            this.set('par', '');
            this.input.onkeydown = function () { };
        }
    }
    cancelState(srcElemen) {
        this.temp[this.par].data = '';
        this.temp[this.par].canceled = true;
        srcElemen.classList.add('diferent');
        if (this.editing <= 1) {
            this.$.saveButton.classList.add('diferent');
            this.editing = 0;
            window.onbeforeunload = function () { };
        }
        else {
            this.editing = this.editing - 1;
        }
    }
    slotImageElement(cat) {
        if (this.imageElement instanceof HTMLElement === true) {
            this.removeChild(this.children[0])
            this.set('imageElement', undefined)
        }
        if (this.imageElement === undefined && 'image' in cat && cat.image.length > 0) {
            let template = html`<cms-image slot="image">
                                    <cms-image-form slot="imageForm">
                                    </cms-image-form>
                                </cms-image>`,
                clone = document.importNode(template.content, true);
            this.appendChild(clone);
            this.imageElement = this.children[0];
            this.imageElement.set('images', cat);
            this.cancelButton = this.imageElement.$.cancel;
            if ('deleted' in this.query && this.query.deleted === true || this.query.deleted === 'true') {
                this.cancelButton.classList.remove('diferent');
            }
            this.imageElement.deleteImg = (this.deleteImg).bind(this);
        }
    }
    addImage() {
        let string = 'edit-category-pages&content=' + this.query.content
        this.set('slashed', true)
        window.history.pushState({}, null, `/media/images/galleries?addimagetopage=${string}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
        window.onbeforeunload = function (e) {
            return "you might have changes to be saved, are you sure you whant to leave?";
        };
    }
    del(data) {
        if (this.content[0].image instanceof Array === true) {
            console.log(data, this.content[0], index)
            this.set('tempArray', this.content[0].image[index]);
            /*  if (index > 0) {
                  this.content[0].image.splice(index, index);
              }
              else {
                  this.content[0].image.splice(0, 1);
              }*/
        }
        /*  let string = window.btoa(`${JSON.stringify(this.content[index])}`);
          window.history.pushState({}, null, `content/pages/edit-category-pages?content=${string}&deleted=true`);
          window.dispatchEvent(new CustomEvent('location-changed'));
          this.removeChild(this.children[0]);*/
    }
    deleteImg(data) {
        if (data !== undefined) {
            this.del(data, data.model.__data.index);
            /*   this.$.saveButton.classList.remove('diferent');
              this.editing = this.editing + 1;
              this.remove = undefined;*/
        }
    }
}
customElements.define(cmsPageListTypeContent.is, cmsPageListTypeContent);