import { PolymerElement, html } from '@polymer/polymer/polymer-element';
import '@polymer/iron-icons/editor-icons';
import '@polymer/paper-input/paper-input';
import '../styles/cms-comon-style_v3';
const __DEV = true;
export class cmsItemTemplate extends PolymerElement {
    static get template() {
        return html`
    <style include="cms-comon-style_v3">    
    :host {
        position: relative;
        display: block;
    } 
            /* styles reside in cms-content*/
    </style>     
    ${this._getElement}
        `;
    }
    static get is() { return 'cms-item-template'; }
    static get properties() {
        return {
            page: {
                type: Object,
                notify: true,
                observer: '_putRow'
            },
            noItem: {
                type: Array,
                value: [{
                    "image": [],
                }]
            }
        };
    }
    ready() {
        super.ready();
    }
    log(data) {
        console.log('log from cms-article-viewer', data);
    }
    static get _getElement() {
        return html`
        <slot name="table"></slot>
        `
    }
    _getParameter(item) {
        return item
    }

    _putRow(data) {
        let template = document.createElement('template')
        let str = `
        <article centerListItem slot="table">            
            <div>
                <paper-button>
                    <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>                   
                    <paper-icon-button  icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                </paper-button> 
            </div> 
        </article>`;
        /*  template.innerHTML = str
          let clone = document.importNode(template.content, true);
          this.appendChild(clone)
  
          this.children[0].children[1].
              children[0].addEventListener('click', (this.showPage).
                  bind(this));*/
    }
}
customElements.define(cmsItemTemplate.is, cmsItemTemplate);