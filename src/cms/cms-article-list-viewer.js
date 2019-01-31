import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/app-layout/app-scroll-effects/app-scroll-effects.js'
import '@polymer/iron-icons/editor-icons.js';
import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { dataBaseworker } from './dataBaseWorker.js';
import '@polymer/paper-spinner/paper-spinner.js';
import '@polymer/paper-input/paper-input.js';
import './cms-article-content.js';
import '../shop-image.js';
class cmsArticleListViewer extends PolymerElement {
    static get template() {
        return html`
    <style> 
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

    nav div {
        flex-basis: 120px;
        flex-grow: 1;
        display: block;
      }
    
      div[bottom] {
        flex-basis: 30%; 
        word-break: break-word;
        margin-bottom: 75px;
        /*box-shadow: 2px 2px 4px #bab2b2;*/
        border-radius: 5px;
      }

    cms-article-content {
        max-width: 1200px;
    }

   /* cms-article-content.zIndex {        
        z-index: 123 
    }*/
    shop-image{
        cursor: pointer;
        height: 81px; 
    }
    </style>

    <cms-article-content id="content" add="" delete="">
    </cms-article-content>
    <article>
        <dom-repeat items="[[content]]" as="art">
            <template>
                <div bottom>
                    <paper-button on-click="openArticleContent">
                        [[art.title]] 
                    </paper-button>
                    <shop-image src="[[returnImage(art.image)]]" alt="[[art.image]]" on-click="openArticleContent"></shop-image> 
                </div>
            </template>
        </dom-repeat>
    </article>
        `
    }
    static get is() { return 'cms-article-list-viewer'; }

    static get properties() {
        return {
            content: {
                type: Array,
                notify: true,
                value: function () {
                    return []
                }
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

    error(data) {
        console.error('error from cms-article-viewer', data)
    }

    deSpin() {
        this.$.spinner.active = !this.$.spinner.active
    }

    _getCatParents(cats) {
        let arr = []
        for (let i = 0, parent; parent = cats[i].parent; i++) {
            arr.push({ name: parent })
            if (i === cats.length - 1) {
                return arr
            }
        }
    }

    openArticleContent(event) {
        let elem = this.$.content
        console.log(event.index)
        if (elem.tada === false) {
            elem.set('content', [this.content[event.model.__data.index]])
            elem.set('add', false)
            elem.set('article', this.content[event.model.__data.index])
            elem.set('articleIndex', event.model.__data.index)
            elem.set('articleName', this.content[event.model.__data.index].categogy)
        }
        elem.set('tada', !elem.tada)
        elem.scrollIntoView()
    }
}

customElements.define(cmsArticleListViewer.is, cmsArticleListViewer);
