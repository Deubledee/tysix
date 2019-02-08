import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icons/editor-icons.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-input/paper-input.js';
import './cms-article-content.js';
class cmsPageListItem extends PolymerElement {
    static get template() {
        return html`
    <style include="cms-common-styles"> 
    article {
        display: flex;
        flex-flow: wrap;
        box-sizing: border-box;
        text-align: center;
        margin-bottom: 10px;
        padding: 12px;
        max-width: 1200px;
        margin-left: auto;
        margin-right: auto;
      }

    div {
        flex-basis: 120px;
        flex-grow: 1;
        display: block;
        text-align: left
      }  

    div[center] {
        text-align: center
      }
      
      cms-images.images {
        width: 800px;          
        height: 350px;
        background-color: inherit;
        --images-article-images: {          
            height: 300px!important;
        }
      } 
   
    </style>  
    <article>
            <div>
                <span>{{_getPagename(page)}} </span>
            </div>
            <div center>
                <paper-icon-button on-click="showPage" icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
                    &
                <paper-icon-button on-click="showPage" icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
            </div>  
            <div center>
                <paper-icon-button on-click="openConfirm" icon="av:not-interested" aria-label="mode-delete"></paper-icon-button>
            </div>
    </article>     
    <slot></slot>  
        `
    }
    static get is() { return 'cms-page-list-item'; }

    static get properties() {
        return {
            content: {
                type: Array,
                notify: true,
                value: function () {
                    return []
                }
            },
            page: {
                type: Object,
                notify: true
            }
        }
    }

    ready() {
        super.ready();
    }

    log(data) {
        console.log('log from cms-article-viewer', data)
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

    showPage(event, theother) {
        let elem = this.children[0]
        this.setLastChosen(event.srcElement)
        elem.set('content', [this.page])
        elem.toggleElementPlease(event)
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
