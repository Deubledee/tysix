import { cmsContentTemplate } from '../templates/cms-content-template';
import { dataBaseworker } from '../tools/dataBaseWorker';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
const __DEV = true;
const _DBW = new dataBaseworker();
const _STYLES = _DBW.getElementAssets('cms-page-list-type-content', true);
class cmsPageListTypeContent extends cmsContentTemplate {
    static get is() { return 'cms-page-list-type-content'; }
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

    /* clean(setterValue) {
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
     }*/
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
                    // this.clean('newPage');
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
                    //   this.clean('newPage');
                    this.__reset();
                }
                else {
                    console.log(err);
                    // this.clean('true');
                }
            }, content, __DEV);
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