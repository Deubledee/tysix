import { cmsContentTemplate } from '../templates/cms-content-template';
import { html } from '@polymer/polymer/polymer-element.js';
import { Setter } from '../tools/cms-element-set';
const Consts = new Setter()
Consts.assets = Consts.getAssets('cms-page-list-type-content')
class cmsPageListTypeContent extends cmsContentTemplate {

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
                                    [[pagetitle]]
                                </paper-button>
                                <paper-button name="title"  value="title" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div name="title">
                                    <paper-button on-click="edit" name="title" icon="editor:mode-edit" aria-label="mode-edit">
                                        <h4 class="contenth4" title="title"> [[cat.title]]</h4> 
                                    </paper-button>
                                    <paper-input hidden name="title" aria-label="title" value="{{cat.title}}" on-input="inputing"
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
                                <paper-button name="lang"  value="lang" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div name="lang">
                                    <paper-button on-click="edit" name="lang" icon="editor:mode-edit" aria-label="mode-edit">
                                        <h4 class="contenth4" title="lang"> [[cat.lang]]</h4> 
                                    </paper-button>
                                    <paper-input hidden name="lang" aria-label="lang" value="{{cat.lang}}" on-input="inputing"
                                     placeholder="[[cat.lang]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                        <section class="flexchildbotom">
                            <div class="flexleft" name="type">
                                <paper-button on-click="editTo" name="type">
                                    [[pageType]]
                                </paper-button>
                                <paper-button  name="type" value="type" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div name="type">
                                    <paper-button on-click="edit" name="type" icon="editor:mode-edit" aria-label="mode-edit">
                                        <h4 class="contenth4" title="type">     [[cat.type]]</h4> 
                                    </paper-button>
                                    <paper-input hidden name="type" value="[[cat.type]]" on-input="inputing" placeholder="[[cat.type]]">
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
                                        <h4 class="contenth4" title="contentText"> [[cat.contentText]] </h4> 
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
                            <cms-image images="[[cat]]" toggle-size="true" _deleteImg="[[deleteImg]]" lang="[[lang]]">
                            </cms-image>
                    </section>
                </div>
            </template>
        </dom-repeat>`
    }
    static get is() { return 'cms-page-list-type-content'; }
    static get properties() {
        return {
            lang: {
                type: String,
                notify: true,
                observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
            },
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, query, active)'
        ];
    }
    ready() {
        super.ready();
        Consts.assets.then((querySnapshot) => {
            let langs = querySnapshot.data();
            Consts.setLangObject.call(this, langs);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
        window.addEventListener('reset', (this._reset).bind(this))
    }
    __changeLang() {
        Consts.changeLang.call(this)
    }
    _getPublishedBy(publishedBy) {
        if (publishedBy !== undefined && publishedBy.length > 0) {
            let pubuser = publishedBy[0].name;
            return pubuser;
        }
    }
    _routePageChanged(routeData, query, active) {
        this.cancelElemenObject = {}
        this.inputObject = {}
        if (Boolean(this.slashed) === false) {
            this.set('content', []);
            this.set('add', false);
            this.slashed = true
            this._removeInnerHTML()
        }
        if (Boolean(active) === true && routeData.page === 'edit-category-pages' || routeData.page === 'add-category-pages') {
            this.set('content', []);
            this.add = true
            if ('added' in query) {
                this.$.saveButton.classList.remove('diferent')
                this.$.anchor.classList.add('diferent');
                this.imageElemen = ''
                this._removeInnerHTML()
            }
            if ('content' in query) {
                if ('added' in query) {
                    this.add = false
                }

                if ('add' in query) {
                    this.add = true
                }
                this._setContent(query.content, query)
            }
            this.slashed = false;
        }
    }

    _setContent(content, query) {
        this.$.anchor.href = `${this.rootPath}content/pages`
        this.set('content', [JSON.parse(window.atob(content))]);
        this.set('add', (query.add === 'true') || (query.added === 'true'));
        this.slashed = false;
    }

    _removeInnerHTML() {
        this.innerHTML = ''
    }
    save() {
        let content = this.content.pop(), data = new Date(), lastModified, author, date
        author = ('author' in content === true && content.author.split('').length > 0) ?
            content.author : this.user.displayName;
        date = ('dateCreated' in content === true && content.dateCreated.split('').length > 0) ?
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
                author: author,
                content: new Array(),
                dateCreated: date,
                id: content.name,
                items: 0,
                lastModified: lastModified,
                publishedCount: 0,
                type: content.type,
                uid: this.user.uid,
            };
            Consts._DBW.setPages((done, err) => {
                if (done !== 'error') {
                    Consts._DBW.setArticles((done, msg) => {
                        console.log(done, msg);
                    }, obj2, __DEV);
                    window.onbeforeunload = function () { };
                    this.editing = 0;
                    this.temp = '';
                    this.cancelButton.classList.add('diferent');
                    this.$.saveButton.classList.add('diferent');
                    this.$.anchor.classList.remove('diferent');
                    this.__reset();
                }
                else {
                    console.log(err);
                }
            }, content, Consts.__DEV);
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
            Consts._DBW.writePagesContent((done, err) => {
                if (done !== 'error') {
                    window.onbeforeunload = function () { };
                    this.editing = 0;
                    this.temp = '';
                    this.cancelButton.classList.add('diferent');
                    this.$.saveButton.classList.add('diferent');
                    this.$.anchor.classList.remove('diferent');
                    this.__reset();
                }
                else {
                    console.log(err);
                }
            }, content, Consts.__DEV);
        }
    }
    addImage() {
        let string = 'editPages&content=' + this.query.content
        this.set('slashed', true)
        window.history.pushState({}, null, `${this.rootPath}media/images/galleries?addimageto=pages&method=${string}`);
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