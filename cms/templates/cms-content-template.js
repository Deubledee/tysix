import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-input/paper-input';
import '@polymer/paper-input/paper-textarea';
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
                ${this._getAnchor}
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
    static get _getAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a>
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
        </iron-selector>`
    }
    static get _getContentItems() {
        return html`
                <div container>
                    <div bottom>
                        <section class="flexchildbotomFull">
                            <div class="flexleft" name="title">
                                <paper-button on-click="editTo" name="title">
                                    [[title]]
                                </paper-button>
                                <paper-button name="title"  value="title" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div name="title">
                                    <paper-button on-click="edit" name="title" icon="editor:mode-edit" aria-label="mode-edit">
                                        <h4 class="contenth4" title="title">   [[cat.title]]</h4> 
                                    </paper-button>
                                    <paper-input hidden name="contentText" name="title"  value="[[cat.title]]" on-input="inputing"
                                    placeholder="[[cat.title]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                        <section class="flexchildbotomFull">
                            <div class="flexleft" name="contentText">
                                <paper-button on-click="editTo" name="contentText">
                                    [[contentText]]
                                </paper-button>
                                <paper-button name="contentText"  value="contentText" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div name="contentText">
                                    <paper-button on-click="edit" name="contentText" icon="editor:mode-edit" aria-label="mode-edit">
                                        <h4 class="contenth4" title="contentText">   [[cat.contentText]]</h4> 
                                    </paper-button>
                                    <paper-input hidden name="contentText" name="contentText"  value="[[cat.contentText]]" on-input="inputing"
                                    placeholder="[[cat.contentText]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                    </div>
                    <section class="flexchildbotom3">
                        <div left name="image">
                            <paper-button >
                                images
                            </paper-button>
                            <paper-icon-button  name="image" icon="image:loupe" on-click="addImage" aria-label="mode-edit">
                            </paper-icon-button> 
                            <paper-button id="cancel" name="image" class="diferent" aria-label="mode-cancel">
                                cancel
                            </paper-button>            
                        </div>
                            [[slotImageElement(cat)]]
                        <slot name="image">
                        </slot>
                    </section>
                </div>`
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
            cancelElemenObject: {
                type: Object,
                value: {}
            },
            inputObject: {
                type: Object,
                value: {}
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
    slotImageElement(cat) {
        let data = cat instanceof Array === true ? cat.pop() : cat
        if ('image' in data && data.image.length > 0) {
            let template = html`<cms-image slot="image">
                                </cms-image>`,
                clone = document.importNode(template.content, true);
            this.appendChild(clone);
            this.imageElement = this.children[0];
            this.imageElement._deleteImg = (this.deleteImg).bind(this);
            this.imageElement.images = data
        }
    }
    editTo(event) {
        let inpt, buttn, par, cancel,
            mainElem = event.srcElement.parentElement.parentElement
        cancel = mainElem.children[0].children[1];
        buttn = mainElem.children[1].children[0].children[0]
        inpt = mainElem.children[1].children[0].children[1];
        par = event.srcElement.getAttribute('name')
        this.edit(event, inpt, buttn, par, cancel);
        console.log(this.temp[this.par].data)
    }
    edit(event, inpt, buttn, par, cancel) {
        this._setObjects(event, inpt, buttn, par, cancel)
        this._setButtons()
    }
    _setObjects(event, inpt, buttn, par, cancel) {
        if (cancel !== undefined) {
            this.button = buttn
            this.set('par', par)
            this._setSomething(this.cancelElemenObject, par, cancel)
            this._setSomething(this.inputObject, par, inpt)
        } else if (event.srcElement.parentElement.parentElement.previousElementSibling === null
            && event.srcElement.title !== undefined) {
            this.set('par', event.srcElement.parentElement.parentElement.getAttribute('name'))
            this.button = event.srcElement.parentElement;
            this._setSomething(this.cancelElemenObject, this.par, event.srcElement.parentElement.parentElement.parentElement.previousElementSibling.children[1])
            this._setSomething(this.inputObject, this.par, event.srcElement.parentElement.parentElement.children[1])
        } else if (event.srcElement.parentElement.parentElement.previousElementSibling !== null
            && event.srcElement.title !== undefined) {
            this.set('par', event.srcElement.parentElement.getAttribute('name'))
            this.button = event.srcElement;
            this._setSomething(this.cancelElemenObject, this.par, event.srcElement.parentElement.parentElement.previousElementSibling.children[1])
            this._setSomething(this.inputObject, this.par, event.srcElement.parentElement.parentElement.previousElementSibling.children[1])
        }
        console.log(this.par)
    }
    _setTemp() {
        console.log(this.par)
        this.temp[this.par] = { data: '', canceled: '', inputing: false }
        this.temp[this.par].data = this.content[0][this.par] === undefined ? '' : this.content[0][this.par]
        this.temp[this.par].canceled = false
    }
    _setButtons() {
        if (this.button.classList.contains('diferent') === false) {
            this.inputObject[this.par].hidden = false;
            this.inputObject[this.par].onkeydown = (this.__keyDownHandler).bind(this);
            this.button.classList.add('diferent');
            this._setTemp()
            window.onbeforeunload = function () {
                return "not without saving first :)";
            };
        }
        else {
            this.inputObject[this.par].hidden = true;
            this.button.classList.remove('diferent');
            this.temp[this.par].inputing = false
            if (this.editing === 0) {
                this.inputObject[this.par].onkeydown = function () { };
                //  window.onbeforeunload = function () { };
            }
        }
    }
    _setSomething(obj, par, value) {
        if ((par in obj) === false && par !== undefined) {
            obj[par] = value
        }
    }
    __setTrue(elem) {
        elem.hidden = true
    }
    __keyDownHandler(event) {
        if (event.code === "Backspace" || event.code === "Delete") {
            this.set('par', event.srcElement.getAttribute('name'));
            if (this.temp[this.par] === '') {
                this.temp[this.par] = this.content[this.par];
                this.Cancel(event)
            }
            this.inputing(event);
        }
    }
    inputing(event) {
        this.set('par', event.srcElement.getAttribute('name'));
        this.string = "cat." + this.par;
        let value = event.srcElement.value
        event.model.set(this.string, value);
        this._inputState();
    }
    _inputState() {
        if (this.temp[this.par].inputing === false) {
            this.cancelElemenObject[this.par].classList.remove('diferent');
            this.$.saveButton.classList.remove('diferent');
            this.$.anchor.classList.add('diferent');
            this.temp[this.par].inputing = true
            this.temp[this.par].canceled = false;
            this.editing = this.editing + 1;
            this.canceled = false;
        }
    }
    Cancel(event) {
        this.set('par', event.srcElement.getAttribute('name'))
        this.string = "cat." + this.par;
        event.model.set(this.string, this.temp[this.par].data);
        if (this.temp[this.par].canceled === false) {
            this.cancelState(event.srcElement);
        }
    }
    cancelState() {
        this.temp[this.par].data = '';
        this.temp[this.par].canceled = true;
        this.temp[this.par].inputing = false
        this.cancelElemenObject[this.par].classList.add('diferent');
        this.inputObject[this.par].onkeydown = function () { };
        if (this.editing <= 1) {
            this._reset('simple')
        }
        else {
            this.set('par', {});
            this.editing = this.editing - 1;
        }
    }
    _reset(type) {
        this.editing = 0;
        window.onbeforeunload = function () { };
        this.$.saveButton.classList.add('diferent');
        this.$.anchor.classList.remove('diferent');
        if (type === "simple") {
            this.cancelElemenObject[this.par].classList.add('diferent');
        }
        if (type === undefined) {
            this.set('cancelElemenObject', {})
            this.set('inputObject', {})
            this.set('content', []);
        }
        this.set('par', {});
    }
}
customElements.define(cmsContentTemplate.is, cmsContentTemplate);