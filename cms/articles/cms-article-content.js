import { cmsContentTemplate } from '../templates/cms-content-template';
import { html } from '@polymer/polymer/polymer-element.js';
import { dataBaseworker } from '../tools/dataBaseWorker';
const __DEV = true;
const _DBW = new dataBaseworker();
const _STYLES = _DBW.getElementAssets('cms-page-list-type-content', __DEV);

class cmsArticleContent extends cmsContentTemplate {
    static get _getContentItems() {
        return html`
        <dom-repeat repeat items="[[content]]" as="art">
            <template>
                <div container>
                    <div bottom>
                        <section class="flexchildbotom">
                            <div class="flexleft">
                                <paper-button on-click="editTo">
                                    [[articletitle]]
                                </paper-button>

                                <paper-button  value="title" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>

                            </div>
                            <div class="flexright">
                                <div>
                                    <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                        [[art.title]]
                                    </paper-button>
                                    <paper-input hidden name="title" aria-label="title" value="{{art.title}}" on-input="inputing"
                                     placeholder="[[art.title]]">
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
                                        [[art.lang]]
                                    </paper-button>
                                    <paper-input hidden name="lang" value="[[art.lang]]" on-input="inputing" placeholder="[[art.lang]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                        <section class="flexchildbotom">
                            <div class="flexleft">
                                <paper-button on-click="editTo">
                                    [[pageCategory]]
                                </paper-button>
                                <paper-button  value="category" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div>
                                    <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                        [[art.category]]
                                    </paper-button>
                                    <paper-input hidden name="category" value="[[art.category]]" on-input="inputing" placeholder="[[art.category]]">
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
                                        [[art.type]]
                                    </paper-button>
                                    <paper-input hidden name="type" value="[[art.type]]" on-input="inputing" placeholder="[[art.type]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                        <section class="flexchildbotom">
                            <div class="flexleft">
                                <paper-button on-click="editTo">
                                    [[brand]]
                                </paper-button>
                                <paper-button  value="brand" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div>
                                    <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                        [[art.brand]]
                                    </paper-button>
                                    <paper-input hidden name="brand" value="[[art.brand]]" on-input="inputing" placeholder="[[art.brand]]">
                                    </paper-input>
                                </div>
                            </div>
                        </section>
                        <section class="flexchildbotom">
                            <div class="flexleft">
                                <paper-button on-click="editTo">
                                    [[price]]
                                </paper-button>
                                <paper-button  value="price" class="diferent" on-click="Cancel" aria-label="mode-cancel">
                                    [[cancel]]
                                </paper-button>
                            </div>
                            <div class="flexright">
                                <div>
                                    <paper-button on-click="edit" icon="editor:mode-edit" aria-label="mode-edit">
                                        [[art.price]]
                                    </paper-button>
                                    <paper-input hidden name="price" value="[[art.price]]" on-input="inputing" placeholder="[[art.price]]">
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
                                        [[art.contentText]]
                                    </paper-button>
                                    <paper-input hidden name="contentText" value="[[art.contentText]]" on-input="inputing"
                                     placeholder="[[art.contentText]]">
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
                            [[slotImageElement(art)]]
                        <slot name="image">
                        </slot>
                    </section>
                </div>
            </template>
        </dom-repeat>`
    }
    static get _getSideInfo() {
        return html`
        <dom-repeat repeat items="[[article]]" as="art">
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
                            [[ _getPublishedBy(art.publishedBy)]]
                        </span>
                    </aside>
                    <aside published$="[[art.published]]">
                        <span>
                            [[art.published]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[art.datePublished]]
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
                            [[art.author]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                            [[art.dateCreated]]
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
                    <dom-repeat repeat items="[[art.lastModified]]" as="createdAt">
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
    static get is() { return 'cms-article-content'; }

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

    slotImageElement(art) {
        let template = html` <cms-image slot="image">
                               <cms-image-form slot="imageForm">
                               </cms-image-form>
                            </cms-image>`,
            clone = document.importNode(template.content, true);
        this.appendChild(clone)
        this.imageElement = this.children[0]
        this.imageElement.set('images', art)
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