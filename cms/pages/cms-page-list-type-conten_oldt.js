import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/iron-icons/editor-icons';
import { scroll } from '@polymer/app-layout/helpers/helpers';
import { dataBaseworker } from '../dataBaseWorker';
import '@polymer/paper-input/paper-input';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
import '../galleries/cms-image';
import '../styles/cms-common-styles';
const __DEV = true;
const _DBW = new dataBaseworker();
const _STYLES = _DBW.getElementAssets('cms-page-list-type-content', true);
class cmsPageListTypeContent extends PolymerElement {
    static get template() {
        return html`
<style include="cms-common-styles">
:host {
    position: relative
}
</style>
<app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" query-params="{{query}}"
    active="{{active}}">
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
                                    [[pagetitle]]
                                </paper-button>

                                <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>

                            </div>
                            <div right>
                                <div>
                                    <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                        [[cat.title]]
                                    </paper-button>
                                    <paper-input hidden value="{{cat.title}}" on-input="inputing" placeholder=>
                                        "[[cat.title]]"></paper-input>
                                </div>
                            </div>
                        </section>
                        <section bottom>
                            <div left>
                                <paper-button on-click="editTo">
                                    [[pagelang]]
                                </paper-button>
                                <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div right>
                                <div>
                                    <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                        [[cat.lang]]
                                    </paper-button>
                                    <paper-input hidden value="[[cat.lang]]" on-input="inputing" placeholder=>
                                        "[[cat.lang]]"></paper-input>
                                </div>
                            </div>
                        </section>
                        <section bottom>
                            <div left>
                                <paper-button on-click="editTo">
                                    [[pageType]]
                                </paper-button>
                                <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div right>
                                <div>
                                    <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                        [[cat.type]]
                                    </paper-button>
                                    <paper-input hidden value="[[cat.type]]" on-input="inputing" placeholder=>
                                        "[[cat.type]]"></paper-input>
                                </div>
                            </div>
                        </section>
                        <section bottom>
                            <div left>
                                <paper-button on-click="editTo">
                                    [[placeholder]]
                                </paper-button>
                                <paper-button class="diferent" on-click="cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div right>
                                <div>
                                    <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                        [[cat.placeholder]]
                                    </paper-button>
                                    <paper-input hidden value="[[cat.placeholder]]" on-input="inputing" placeholder=>
                                        "[[cat.placeholder]]"></paper-input>
                                </div>
                            </div>
                        </section>
                        <section bottom3>
                            [[slotImageElement(cat)]]
                            <slot name="image">
                            </slot>
                        </section>
                    </div>
                </template>
            </dom-repeat>
        </nav>
        <nav side>
            <dom-repeat repeat items="[[content]]" as="cat">
                <template>
                    <div center>
                        <aside>
                            <span>
                                [[info]]
                            </span>
                        </aside>
                    </div>
                    <div left>
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
                    <div right>
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
                    <div left>
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
                    <div center>
                        <aside>
                            <span>
                                [[lastmodified]]
                            </span>
                        </aside>
                    </div>
                    <div left>
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
            content: {
                type: Array,
                value: [{
                    title: '',
                    lang: '',
                    type: '',
                    name: '',
                    image: new Array(),
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
            let style = querySnapshot.data();
            this._setLangObject(style);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
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
    _routePageChanged(routeData, query, active) {
        if (active === true) {
            this.set('content', []);
            if ('catlistcreated' in query === false && 'catlistupdated' in query === false) {
                if ('content' in query) {
                    this.set('tada', false);
                    this.set('content', [JSON.parse(window.atob(query.content))]);
                    this.set('add', (query.add === 'true'));
                    this.slashed = false;
                }
            }
        }
        else if (active === false && this.slashed === false) {
            this.set('content', []);
            this.set('add', false);
            window.history.pushState({}, null, `${location.pathname}/`);
            window.dispatchEvent(new CustomEvent('location-changed'));
            this.slashed = true;
        }
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
            content.author : this.user;
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
            this.DBW.setPages((done, err) => {
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
            this.DBW.writePageContent((done, err) => {
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
        this.par = par || event.srcElement.parentElement.parentElement.previousElementSibling.children[0].innerText.split(' ').pop().toLowerCase();
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
            ;
        }
    }
    __keyDownHandler(event) {
        if (event.code === "Backspace" || event.code === "Delete") {
            if (this.temp === '') {
                this.temp = this.modelCat[this.par];
                this._inputState();
            }
        }
    }
    inputing(event) {
        let value = event.srcElement.value;
        let string = "cat." + this.par;
        if (this.temp === '') {
            this.temp = this.modelCat[this.par];
            this._inputState();
        }
        event.model.set(string, value);
    }
    _inputState() {
        let arr = '' + this.modelCat[this.par];
        if (arr.split('').length > 0) {
            if (this.add === true) {
                this.set('temp', undefined);
            }
            this.cancelButton.classList.remove('diferent');
            this.$.saveButton.classList.remove('diferent');
            this.editing = this.editing + 1;
            this.canceled = false;
        }
    }
    cancel(event) {
        let string = "cat." + this.par;
        this.input.value = this.temp === undefined ? '' : this.temp;
        if (this.canceled === false) {
            this.cancelState();
            event.model.set(string, this.input.value);
            this.set('par', '');
            this.input.onkeydown = function () { };
        }
    }
    cancelState() {
        this.temp = '';
        this.canceled = true;
        if (this.editing <= 1) {
            this.cancelButton.classList.add('diferent');
            this.$.saveButton.classList.add('diferent');
            this.editing = 0;
            window.onbeforeunload = function () { };
        }
        else {
            this.editing = this.editing - 1;
        }
    }
    toggleElementPlease() {
        if (this.tada === false) {
            this.$.bottom.style.opacity = "1";
            this.$.bottom.style.height = "auto";
            this.setAttribute("open", true);
            this.$.main.style.zIndex = 120;
            this.set('tada', !this.tada);
        }
        else {
            this.$.bottom.style.height = "0px";
            this.$.bottom.style.opacity = 0;
            this.setAttribute("open", false);
            this.set('tada', !this.tada);
            this.$.main.style.zIndex = 0;
            this.set('content', []);
            for (let i = 0; 0 < this.childElementCount; i++) {
                this.removeChild(this.children[0]);
            }
        }
    }
    slotImageElement(cat) {
        let template = html` <cms-image slot="image">
                               <cms-image-form slot="imageForm">
                               </cms-image-form>
                            </cms-image>`, clone = document.importNode(template.content, true);
        this.appendChild(clone);
        this.imageElement = this.children[0];
        this.imageElement.set('images', cat);
        this.cancelButton = this.imageElement.$.cancel;
        if ('deleted' in this.query && this.query.deleted === true || this.query.deleted === 'true') {
            this.cancelButton.classList.remove('diferent');
        }
        this.imageElement.deleteImg = (this.deleteImg).bind(this);
        this.imageElement.$.add.addEventListener('click', (this.addImage).bind(this));
        this.imageElement.$.cancel.addEventListener('click', (this.cancelImages).bind(this));
    }
    setImage(data) {
        if ('url' in data) {
            let img = new Image(), arr = [];
            img.src = data.url;
            if (img.naturalHeight < 600) {
                if (this.content[0].image instanceof Array === true) {
                    arr = this.content[0].image;
                }
                else {
                    arr.push(this.content[0].image);
                }
                arr.push(data.url);
                this.content[0].image = arr;
                this.notifyPath('content[0].image');
            }
            if (img.naturalHeight >= 600) {
                if (this.content[0].largeImage instanceof Array === true) {
                    arr = this.content[0].largeImage;
                }
                else {
                    arr.push(this.content[0].largeImage);
                }
                arr.push(data.url);
                this.content[0].largeImage = arr;
                this.notifyPath('content[0].largeImage');
            }
            this.imageElement.set('images', this.content[0]);
            this.addingcancel = this.adding;
            this.adding = !this.adding;
            this.$.saveButton.classList.remove('diferent');
            this.editing = this.editing + 1;
        }
    }
    addImage() {
        let template = html`<cms-gallery-viewer></cms-gallery-viewer>`;
        console.log('add image here');
        window.onbeforeunload = function () {
            return "not without saving first :)";
        };
    }
    setImages(data) {
        this.content[0].image = data.url;
    }
    del(index) {
        if (this.content[0].image instanceof Array === true) {
            this.set('tempArray', this.content[0].image[index]);
            if (index > 0) {
                this.content[0].image.splice(index, index);
            }
            else {
                this.content[0].image.splice(0, 1);
            }
        }
        else {
            this.set('tempArray', this.content[0].image);
            this.content[0].image = '';
        }
        let string = window.btoa(`${JSON.stringify(this.content[index])}`);
        window.history.pushState({}, null, `content/pages/edit-category-pages?content=${string}&deleted=true`);
        window.dispatchEvent(new CustomEvent('location-changed'));
        this.removeChild(this.children[0]);
    }
    deleteImg(data) {
        if (data !== undefined) {
            this.del(data.model.__data.index);
            this.$.saveButton.classList.remove('diferent');
            this.editing = this.editing + 1;
            this.remove = undefined;
        }
    }
    cancelImages() {
        console.log(this.tempArray);
        this.imageElement.set('content', this.tempArray);
        this.cancelState();
        if (this.addingcancel === false) {
            this.adding = !this.adding;
        }
    }
}
customElements.define(cmsPageListTypeContent.is, cmsPageListTypeContent);