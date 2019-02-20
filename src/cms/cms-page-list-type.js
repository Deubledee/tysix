import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import './cms-page-list-item.js';
import './cms-common-styles.js';
class cmsPageListType extends PolymerElement {
    static get template() {
        return html
            `<style include="cms-common-styles"> 
            :host{
                position: relative;
                display: block
            }

            main {
                max-height: 900px;
            }

            nav {
                padding: 0px;
                padding-left: 0px;
                padding-right: 4px;
                background-color: #d8e6ed;
            }

            nav div{
                text-align: center;
                box-shadow: 0px 1px 1px grey;
            }
            

            div[table] {
                max-height: 300px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
            }

            div[table]::-webkit-scrollbar-track {
                background: #dddddd;
              }
          
            div[table]::-webkit-scrollbar {
                width: 5px;                
            }
        
            div[table]::-webkit-scrollbar-thumb {
                background-color: #8098ad;
                background-color: grey;
            }

            div[content]{
                display: none
            }

        </style>
        <paper-spinner id="spinner" active></paper-spinner> 
        <main>
            <nav>
                <div> 
                <h3> title </h3>
                </div>
                <div>           
                    <h3> view/edit </h3>
                </div>
                <div> 
                    <h5> delete </h5>
                </div>
            </nav>
            <div id="content" content>
                <slot name="content"></slot>
            </div>
            <div table>
                <dom-repeat items="[[pages]]" as="page">
                    <template>
                        [[putElement(index, page)]]
                        <slot name="item[[index]]"></slot>
                    </template>
                </dom-repeat>
             </div>
        </main>
        `
    }

    static get is() { return 'cms-page-list-type'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
            },
            pages: {
                type: Array,
                notify: true,
                observer: 'deSpin'
            },
            categorie: {
                type: Object,
                notify: true
            },
            image: {
                type: Object,
                notify: true,
                observer: 'sendImage'
            },
            setter: {
                type: String,
                notify: true,
                observer: 'resetCollor'
            },
            closed: {
                type: Boolean,
                notify: true,
            },
            confirm: {
                type: Boolean,
                notify: true,
                value: false,
            },
            setImage: {
                type: Object
            },
        }
    }

    ready() {
        super.ready();
        this._askPages()
    }

    sendImage(data) {
        console.log(data)
    }

    _cancelImage() {
        this.image = {}
    }

    showContent() {
        if (this.$.content.style.display !== "block") {
            this.$.content.style.display = "block"
        } else {
            this.$.content.style.display = "none"
        }
    }

    _askPages() {
        this.DBW.askAllPages((done) => {
            this.set('pages', done)
        })
    }

    deSpin(data) {
        if (this.$.spinner.active === true && data.length > 0) {
            this.$.spinner.active = false
        }
    }

    putElement(index, page) {
        let template = html`
        <cms-page-list-item>
        </cms-page-list-item>`
        var clone = document.importNode(template.content, true);
        this.appendChild(clone)
        this.children[index].setAttribute('slot', `item${index}`)
        this.children[index].set('page', page)
    }

    deSpin(data) {
        if (this.$.spinner.active === true) {
            this.$.spinner.active = false
        }
    }
}

customElements.define(cmsPageListType.is, cmsPageListType);
