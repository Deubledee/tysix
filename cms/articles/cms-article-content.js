import { cmsContentTemplate } from '../templates/cms-content-template';
import { html } from '@polymer/polymer/polymer-element.js';
import { dataBaseworker } from '../tools/dataBaseWorker';
const __DEV = true;
const _DBW = new dataBaseworker();
const _STYLES = _DBW.getElementAssets('cms-page-list-type-content', __DEV);

class cmsArticleContent extends cmsContentTemplate {
    static get _getAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="name" class="drawer-list" role="navigation">
            <a id="anchor" on-click="_reset">
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
        </iron-selector>`
    }
    static get _getContentItems() {
        return html`
        <dom-repeat repeat items="[[content]]" as="cat">
            <template>
                <div container>
                    <div bottom>
                        <section class="flexchildbotom">
                            <div class="flexleft" name="title">
                                <paper-button on-click="editTo" name="title">
                                    [[articletitle]]articletitle
                                </paper-button>
                                <paper-button name="title" value="title" title="title" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div name="title">
                                    <paper-button on-click="edit" name="title" icon="editor:mode-edit" aria-label="mode-edit">
                                        <h4 class="contenth4" title="title">   [[cat.title]]</h4> 
                                    </paper-button>
                                    <paper-input hidden name="title" value="[[cat.title]]" 
                                    on-input="inputing"
                                    placeholder="[[cat.title]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                        <section class="flexchildbotom">
                            <div class="flexleft" name="lang">
                                <paper-button on-click="editTo" name="lang">
                                    [[pagelang]]
                                </paper-button>
                                <paper-button title="lang"  value="lang" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div name="lang">
                                    <paper-button on-click="edit" name="lang" icon="editor:mode-edit" aria-label="mode-edit">
                                        <h4 class="contenth4" title="lang">   [[cat.lang]]</h4> 
                                    </paper-button>
                                    <paper-input hidden name="lang" value="[[cat.lang]]" 
                                    on-input="inputing"
                                    placeholder="[[cat.lang]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                        <section class="flexchildbotom">
                            <div class="flexleft" name="category">
                                <paper-button name="category">
                                    [[pageCategory]]pageCategory
                                </paper-button>
                                <paper-button title="category"  value="category" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div name="category">
                                    <paper-button name="category" icon="editor:mode-edit" aria-label="mode-edit">
                                        <h4 class="contenth4" title="category">   [[cat.category]]</h4> 
                                    </paper-button>
                                    <paper-input hidden name="category"  value="[[cat.category]]" placeholder="[[cat.category]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                        <section class="flexchildbotom">
                            <div class="flexleft" name="type">
                                <paper-button  name="type">
                                    [[pageType]]
                                </paper-button>
                                <paper-button title="type"  value="type" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div name="type">
                                    <paper-button name="type" icon="editor:mode-edit" aria-label="mode-edit">
                                        <h4 class="contenth4" title="type">   [[cat.type]]</h4> 
                                    </paper-button>
                                    <paper-input hidden name="type" value="[[cat.type]]" placeholder="[[cat.type]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                        <section class="flexchildbotom">
                            <div class="flexleft" name="brand">
                                <paper-button on-click="editTo" name="brand">
                                    [[brand]]brand
                                </paper-button>
                                <paper-button title="brand"  value="brand" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div name="brand">
                                    <paper-button on-click="edit" name="brand" icon="editor:mode-edit" aria-label="mode-edit">
                                        <h4 class="contenth4" title="brand">   [[cat.brand]]</h4> 
                                    </paper-button>
                                    <paper-input hidden name="brand"  value="[[cat.brand]]" 
                                    on-input="inputing"
                                    placeholder="[[cat.brand]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                        <section class="flexchildbotom">
                            <div class="flexleft" name="price">
                                <paper-button on-click="editTo" name="price">
                                    [[price]]price
                                </paper-button>
                                <paper-button title="price"  value="price" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div name="price">
                                    <paper-button on-click="edit" name="price" icon="editor:mode-edit" aria-label="mode-edit">
                                        <h4 class="contenth4" title="price">   [[cat.price]]</h4> 
                                    </paper-button>
                                    <paper-input hidden name="price" value="[[cat.price]]" 
                                    on-input="inputing"
                                    placeholder="[[cat.price]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                        <section class="flexchildbotomFull">
                            <div class="flexleft" name="contentText">
                                <paper-button on-click="editTo" name="contentText">
                                    [[contentText]]
                                </paper-button>
                                <paper-button title="contentText"  value="contentText" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div name="contentText">
                                    <paper-button on-click="edit" name="contentText" icon="editor:mode-edit" aria-label="mode-edit">
                                        <h4 class="contenth4" title="contentText">   [[cat.contentText]]</h4> 
                                    </paper-button>
                                    <paper-input hidden name="contentText" value="[[cat.contentText]]" 
                                    on-input="inputing"
                                    placeholder="[[cat.contentText]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                    </div>
                    <section class="flexchildbotom3">
                        <div left name="image">
                            <paper-button>
                                images
                            </paper-button>
                            <paper-icon-button icon="image:loupe" title ="image" on-click="addImage" aria-label="mode-edit">
                            </paper-icon-button> 
                            <paper-button id="cancel" title="image" class="diferent" aria-label="mode-cancel">
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
        <!--dom-repeat repeat items="[[article]]" as="cat">
            <template-->
                <div class="flexsidecenter">
                    <aside>
                        <span>
                            [[info]]info
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                            [[publishedby]]publishedby
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[publiShed]]publiShed
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datepublished]]datepublished
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                            [[ _getPublishedBy(cat.publishedBy)]]publishedBy
                        </span>
                    </aside>
                    <aside published$="[[cat.published]]">
                        <span>
                            [[cat.published]]
                        </span>published
                    </aside>
                    <aside>
                        <span>
                            [[cat.datePublished]]datePublished
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                            [[author]]author
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[datecreated]]datecreated
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                            [[cat.author]]author
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[cat.dateCreated]]dateCreated
                        </span>
                    </aside>
                </div>
                <div class="flexsidecenter">
                    <aside>
                        <span>
                            [[lastmodified]]lastmodified
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                            [[author]]author
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[date]]date
                        </span>
                    </aside>
                </div>
                <div rightSide>
                    <!--dom-repeat repeat items="[[cat.lastModified]]" as="createdAt">
                        <template-->
                            <section>
                                <aside>
                                    <span>
                                        [[createdAt.author]]author
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        [[createdAt.date]]date
                                    </span>
                                </aside>
                            </section>
                        <!--/template>
                    </dom-repeat-->
                </div>
            <!--/template>
        </dom-repeat-->`
    }
    static get is() { return 'cms-article-content'; }
    static get properties() {
        return {
            type: {
                type: String,
                value: 'article',
                notify: true
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
        _STYLES.then((querySnapshot) => {
            let langs = querySnapshot.data();
            this._setLangObject(langs);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
        window.addEventListener('reset', (this._reset).bind(this))
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
    _routePageChanged(routeData, query, active) {
        this.cancelElemenObject = {}
        this.inputObject = {}
        this._removeInnerHTML()
        if (Boolean(active) === true && routeData.page === 'edit-articles' || routeData.page === 'add-articles') {
            this.set('content', []);
            if ('added' in query) {
                this.$.saveButton.classList.remove('diferent')
                this.$.anchor.classList.add('diferent');
                this.imageElemen = ''
                this.editing = this.editing + 1;
            }
            if ('content' in query) {
                this._setContent(query.content, query.add)
            }
        }
    }
    _setContent(content, add) {
        this._removeInnerHTML()
        this.content = []
        this.$.anchor.href = `${this.rootPath}content/articles/view-articles`//?content=${content}
        this.set('content', JSON.parse(window.atob(content)));
        this.set('add', (add === 'true'));
        this.slashed = false;
    }
    _removeInnerHTML() {
        if (this.childElementCount > 0) {
            this.set('content', []);
            this.set('add', false);
            this.innerHTML = ''
        }
    }
    addImage() {
        let string = 'editArticles&content=' + btoa(JSON.stringify(this.content))
        this.set('slashed', true)
        window.history.pushState({}, null, `${this.rootPath}media/images/galleries?addimageto=articles&method=${string}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
        window.onbeforeunload = function (e) {
            return "you might have changes to be saved, are you sure you whant to leave?";
        };
        this._reset()
    }
    del(index) {
        this.temp.image.data = this.content[0].image
        if (this.content[0].image instanceof Array === true) {
            if (index > 0) {
                this.content[0].image.splice(index, index)
            } else {
                this.content[0].image = []
            }
        } else {
            this.content[0].image = []
        }
        this._setContent(btoa(JSON.stringify(this.content)), 'true')
        if (this.editing <= 1) {
            this._reset('image')
        }
        else {
            this.set('par', {});
            this.editing = this.editing - 1;
        }
    }
    deleteImg(data) {
        console.log(data)
        if (data !== undefined) {
            this.temp.image = { inputing: false, data: '' }
            this.par = 'image'
            this.del(data.index)
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