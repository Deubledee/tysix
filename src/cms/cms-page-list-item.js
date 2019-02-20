import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-input/paper-input.js';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce.js';
import { microTask } from '@polymer/polymer/lib/utils/async.js';
class cmsPageListItem extends PolymerElement {
    static get template() {
        return html`
    <style>    
    :host {
        position: relative;
        display: block;
    } 
   /* styles reside in cms-content*/
    </style>        
        <slot></slot>  
        <slot name="table"></slot> 
        `
    }
    static get is() { return 'cms-page-list-item'; }

    static get properties() {
        return {
            page: {
                type: Object,
                notify: true,
                observer: '_putRow'
            }
        }
    }

    ready() {
        super.ready();
    }

    log(data) {
        console.log('log from cms-article-viewer', data)
    }

    _putRow(data) {
        let template = html`
        <article centerListItem slot="table">
            <div>

            </div>
            <div>
                <paper-icon-button on-click="showPage" icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
                    &
                <paper-icon-button on-click="showPage" icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
            </div>  
            <div>
                <paper-icon-button on-click="openConfirm" icon="av:not-interested" aria-label="mode-delete"></paper-icon-button>
            </div>
        </article>`

        template.content.
            children[0].
            children[0].innerHTML = `
            <h4> 
                ${this._getPagename(data)}
            </h4>`
        let clone = document.importNode(template.content, true);
        this.append(clone)
        this.children[0].children[1].
            children[0].addEventListener('click', (this.showPage).
                bind(this))
        this.children[0].children[1].
            children[1].addEventListener('click', (this.showPage).
                bind(this))
        this.children[0].children[2].
            children[0].addEventListener('click', (this.openConfirm).
                bind(this))
    }

    returnImage(data) {
        let damm = data
        return typeof damm === 'object' ? damm[0] : damm
    }

    _getPagename(cats) {
        return cats.title
    }

    error(data) {
        console.error('error from cms-article-viewer', data)
    }

    deSpin() {
        this.$.spinner.active = !this.$.spinner.active
    }

    _encodeBase64Url(str) {
        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/\=+$/, '');
    }

    showPage(event, theother) {
        let string = window.btoa(`${JSON.stringify(this.page)}`)
        window.history.pushState({}, null, `content/pages/edit-category-pages?content=${string}&add=false`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }

    close() {
        let content = this.parentElement.firstElementChild
        this.parentElement.showContent()
        content.set('tada', true)
        content.set('content', [])
    }

    delete(data) {
        let page = data
        this.DBW.deletePage((msg, done) => {
            if (msg !== 'error') {
                this.openConfirm()
                this.log(msg, done)
            } else {
                this.error(msg, done)
            }
        }, page)
    }

    openConfirm(event) {
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer,
            microTask, () => {
                this.dispatchEvent(new CustomEvent('confirm', {
                    bubbles: true, composed: true,
                    detail:
                        { name: this._getPagename(this.page), method: (this.delete).bind(this) }
                }))
            }
        )
    }

    resetCollor(data) {
        if (data === 'newPage') {
            this.AskPages()
            this.lastChosen.pop()
        }
    }

    setLastChosen(elem, bool) {
        let arr = new Array()
        if (elem.style.color === "var(--google-blue-700)" || elem.style.color === 'rgb(140, 174, 247)') {
            elem.style.color = bool === true ? '#f0f0f0' : "rgb(128, 152, 173)"
            this.lastChosen.pop()
        } else {
            elem.style.color = bool === true ? 'rgb(140, 174, 247)' : "var(--google-blue-700)"
            arr.push(elem)
            this.lastChosen = arr
        }
    }
}

customElements.define(cmsPageListItem.is, cmsPageListItem);
