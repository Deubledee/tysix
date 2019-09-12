import { cmsItemTemplate } from '../templates/cms-item-template'
import { html } from '@polymer/polymer/polymer-element';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
export class cmsArticleItem extends cmsItemTemplate {
    static get _getStyles() {
        return html`
        <style include="cms-comon-style_v3">    
        :host {
            position: relative;
            display: block;
        } 
        shop-image{
            top: 1px; 
        }
        </style> `
    }
    static get _getElement() {
        return html`
        <dom-repeat repeat items="[[content]]" as="item">
            <template>                
                <article centerlistitem>
                    <div>
                        <shop-image class="bigger" title="[[item.title]]" aria-label="image" src="[[_getImage()]]"
                            alt="[[item.title]]">
                        </shop-image>
                    </div>
                    <div title="[[item.title]]">
                        <paper-button title="[[item.title]]">
                            [[item.title]]
                        </paper-button>
                    </div>
                    <div>
                        <paper-button on-click="_showPage">
                            <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>
                            <paper-icon-button icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                        </paper-button>
                    </div>
                    <div class="paddingSmall" title="[[item.stock]]">
                        <h3 title="[[item.stock]]">
                            [[item.stock]]
                        </h3>
                    </div>
                    <div title="[[item.page]]">
                        <paper-button title="[[item.page]]">
                            [[item.type]]
                        </paper-button>
                    </div>
                    <div published$="[[_getPublished()]]" title="[[_getPublished()]]" on-click="_confirmPublish">
                        <paper-button title="[[_getPublished()]]">
                            [[_getPublished()]]
                        </paper-button>
                    </div>
                    <div>
                        <paper-button on-click="_openConfirm">
                            <paper-icon-button icon="av:not-interested" aria-label="delete">
                            </paper-icon-button>
                        </paper-button>
                    </div>
                
                </article>
            </template>                            
        </dom-repeat>
        `;
    }
    static get is() { return 'cms-article-item'; }
    static get properties() {
        return {
            article: {
                type: Object,
                notify: true,
                observer: '_putRow'
            },
            published: {
                type: String,
                reflectToAttribute: true
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
            },
            papgePath: {
                type: String,
                value: 'edit-articles'
            }
        };
    }
    ready() {
        super.ready();
    }
    _putRow(item) {
        if (item['image']) {
            this.set('content', item.items)
            this.set('images', item.image)
            this.set('info', item.info)
        }
    }
    _showPage() {
        let string = window.btoa(`${JSON.stringify(this.article)}`);
        window.history.pushState({}, null, `${this.rootPath}content/articles/edit-articles?content=${string}&add=false`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }
    _getParameter(item) {
        return item
    }
    _getImage() {
        return this.images[0].url
    }
    _getPublished() {
        return this.info[0].published
    }
    _openConfirm(event) {
        let index = event.srcElement.parentElement.getAttribute('value')
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: { name: this.content[index].name, method: (this._deleteImg).bind(this), argument: index, headderMsgKind: 'delete', type: 'article' }
            }));
        });
    }
    _confirmPublish(event) {
        let index = event.srcElement.parentElement.getAttribute('value')
        this._changeSectionDebouncer = Debouncer.debounce(this._changeSectionDebouncer, microTask, () => {
            this.dispatchEvent(new CustomEvent('confirm', {
                bubbles: true, composed: true,
                detail: { name: this.content[index].name, method: (this.__publish).bind(this), argument: index, headderMsgKind: 'publish', type: 'article' }
            }));
        });
    }
    __delete(data) {
        let page = data;
        this.translator._DBW.deletePage((msg) => {
            if (msg !== 'error') {
                this.log(msg);
            }
            else {
                this.error(msg);
            }
        }, page, this.translator.__DEV);
    }
    __publish() {
        console.log('!!to be done!!')
    }
}
customElements.define(cmsArticleItem.is, cmsArticleItem);