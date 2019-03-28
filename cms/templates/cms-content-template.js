import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-input/paper-input';
import '../media/cms-image';
import '../styles/cms-comon-style_v3';
export class cmsContentTemplate extends PolymerElement {
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
                    ${this._getContentItems}
                </nav>
                <nav class="navside">
                    ${this._getSideInfo}
                </nav>
            </div>
        </main>
        `;
    }
    static get _getContentItems() {
        return html`
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
        </dom-repeat>`
    }
    static get _getSideInfo() {
        return html`
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
        </dom-repeat>`
    }


    static get is() { return 'cms-content-template'; }
    static get properties() {
        return {
            user: {
                type: Object,
                notify: true
            },
            query: Object,
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
            category: {
                type: Object,
                notify: true
            },
            add: {
                type: Boolean,
                value: false,
                notify: true,
            },
            tempArray: {
                type: Array,
                value: new Array(),
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
    ready() {
        super.ready();
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
}
customElements.define(cmsContentTemplate.is, cmsContentTemplate);