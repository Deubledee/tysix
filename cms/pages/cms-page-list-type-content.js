import { cmsContentTemplate } from '../templates/cms-content-template';
import { html } from '@polymer/polymer/polymer-element.js';
import { Setter } from '../tools/cms-element-set';
const Consts = new Setter()
Consts.assets = Consts.getAssets('cms-page-list-type-content')
class cmsPageListTypeContent extends cmsContentTemplate {

    static get _getAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="anchor" on-click="reset">
                <paper-icon-button icon="arrow-back" aria-label="Go back">
                </paper-icon-button>
            </a>
        </iron-selector>`
    }
    static get _getContentItems() {
        return html`
        <div container>
        <div bottom>                   
            <dom-repeat repeat items="[[inputVal]]" as="item">
                <template>
                    <section class="flexchildbotom">
                        <cms-content-item item-input="true"
                            item="[[item]]" 
                            anchor="[[anchor]]" 
                            save-button="[[saveButton]]" 
                            lang="[[lang]]"  
                            editing="{{editing}}" 
                            res="{{inputResponse}}">
                        </cms-content-item>                                    
                    </section>   
                </template>
            </dom-repeat>         
            <dom-repeat repeat items="[[textareaVal]]" as="item">
                <template>
                    <section class="flexchildbotomFull">
                        <cms-content-item item-text-area="true"
                            item="[[item]]" 
                            anchor="[[anchor]]" 
                            save-button="[[saveButton]]"  
                            lang="[[lang]]"  
                            editing="{{editing}}" 
                            res="{{textAreaResponse}}">
                        </cms-content-item>            
                    </section>
                </template>
            </dom-repeat>                          
            <section class="childbotom">      
                <cms-content-image  id="image"
                    item-label="[[imageLabel]]"
                    images="[[imageArr]]" 
                    editing="{{editing}}" 
                    anchor="[[anchor]]" 
                    save-button="[[saveButton]]" 
                    _deleteImg="[[deleteImg]]"  
                    lang="[[lang]]" res="">
                </cms-content-image>
            </section>
            </div>
        </div>`
    }
    static get is() { return 'cms-page-list-type-content'; }
    static get properties() {
        return {
            inputVal: {
                type: Array,
                notify: true,
                value: []
            },
            textareaVal: {
                type: String,
                notify: true,
                value: ''
            },
            editing: {
                type: Number,
                notify: true,
            },
            imageArr: {
                type: Array,
                notify: true,
                value: []
            },
            lang: {
                type: String,
                notify: true,
                observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
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
        Consts.assets.then((querySnapshot) => {
            let langs = querySnapshot.data();
            Consts.setLangObject.call(this, langs);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
        window.addEventListener('reset', (this._reset).bind(this))
        this.set('saveButton', this.$.saveButton)
        this.set('anchor', this.$.anchor)
        this.$.image.addImage = (this.addImage).bind(this)
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
            this.slashed = true
            this.set('content', []);
            this.set('imageArr', [])
            this.set('inform', [])
        }
        if (active === true && routeData.page === 'edit-category-pages' || routeData.page === 'add-category-pages') {
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
        this.$.anchor.setAttribute('href', `${this.rootPath}content/pages`)
        this.set('content', JSON.parse(window.atob(content)));
        let obj = this.content.image.pop()
        this.set('imageArr', obj)
        this.imageLabel = 'images'
        this.set('inputVal', this._getObjArr(this.content.items))
        this.set('textareaVal', this.content.contentText)
        this.set('inform', this.content.info)
        this.set('add', (query.add === 'true') || (query.added === 'true'));
        this.set('slashed', false)
    }
    addImage() {
        let string = 'editPages&content=' + btoa(JSON.stringify(this.content))
        this.set('slashed', true)
        window.history.pushState({}, null, `${this.rootPath}media/images/galleries?addimageto=pages&method=${string}`);
        window.dispatchEvent(new CustomEvent('location-changed'));
        window.onbeforeunload = function (e) {
            return "you might have changes to be saved, are you sure you whant to leave?";
        };
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
    _reset() {
        this.$.anchor.setAttribute('href', `${this.rootPath}content/pages`)
        this.$.saveButton.classList.add('diferent')
        this.$.anchor.classList.remove('diferent')
        this.query = {}
        this.routeData = {}
        this.imageLabel = ''
        this.set('content', '');
        this.set('imageArr', '')
        this.set('inputVal', '')
        this.set('textareaVal', '')
        this.set('inform', [0])
        this.set('add', 0);
        this.set('slashed', true);
    }

}
customElements.define(cmsPageListTypeContent.is, cmsPageListTypeContent);