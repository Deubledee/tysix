import { html } from '@polymer/polymer/polymer-element.js';
import { cmsItemImageTemplate } from '../templates/cms-item-image-template';
import { Debouncer } from '@polymer/polymer/lib/utils/debounce';
import { microTask } from '@polymer/polymer/lib/utils/async';
class cmsArticle extends cmsItemImageTemplate {
    static get is() { return 'cms-article'; }
    static get properties() {
        return {
            content: {
                type: Array,
                notify: true,
                computed: '_log(images)'
            }
        };
    }

    static get _getStyles() {
        return html`
         div[bottom]{
            max-width: 75%;
        } 
        div[table] {
            max-width: 75.5%;
        } 
        div[bottom]{
            height: 35px;
            font-size: var(--app-images-article-font-size);
        }
        div[bottom] h4{
            margin-block-start: 8px;
        }
        div[table] {
            font-size: 9px;
            font-weight: bold; box-sizing: var(--app-default-box-sizing);
            padding: 0px;
            overflow: var(--app-images-div-overflow);
            text-overflow: var(--app-images-div-text-overflow);
            overflow-y: var(--app-images-divnav-overflow-y;
        }
        `
    }
    static get _getMenu() {
        return html`                           
            <section class="flexchildbotom">
                <div class="flexleft">   
                    <h4>  item   </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">   
                    <h4> 
                    title    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">
                    <h4> [[viewedit]]viewedit </h4>
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">   
                    <h4> 
                    stock    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">  
                    <h4> 
                    type     </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">  
                    <h4> 
                    published </h4>     
                </div>  
            </section>
            <section class="flexchildbotom">
                <div class="flexleft">  
                    <h4> 
                    delete      </h4>     
                </div>  
            </section>`
    }

    _slottItem(item, index) {
        if (Boolean(item.title) === true) {
            let template = document.createElement('template')
            let str = `
        <article centerlistitem>
            <div class="paddingSmall">
                <shop-image class="bigger" title=${this._getParameter(item.title)}" aria-label="image" src=${this._getImage(item)}" 
                    alt=${this._getParameter(item.title)}">
                </shop-image> 
            </div>
            <div class="paddingSmall" title=${this._getParameter(item.title)}">
                <paper-button title="${this._getParameter(item.title)}"> 
                    ${this._getParameter(item.title)}   
                </paper-button> 
            </div>
            <div class="paddingSmall">
                <paper-button>
                    <paper-icon-button icon="image:remove-red-eye" aria-label="mode-show"></paper-icon-button>                   
                    <paper-icon-button  icon="editor:mode-edit" aria-label="mode-edit"></paper-icon-button>
                </paper-button> 
            </div>  
            <div class="paddingSmall" title=${this._getParameter(item.stock)}">
                <h3 title="${this._getParameter(item.stock)}"> 
                  ${this._getParameter(item.stock)}
                </h3>
            </div>
            <div class="paddingSmall" title=${this._getParameter(item.page)}">
                <paper-button title="${this._getParameter(item.page)}"> 
                    ${this._getParameter(item.page)} 
                </paper-button>
            </div>
            <div class="paddingSmall ${this._getParameter(item.published)}" title=${this._getParameter(item.published)}">
                <paper-button title="${this._getParameter(item.published)}"> 
                    ${this._getParameter(item.published)} 
                </paper-button>
            </div>
            <div class="paddingSmall"> 
                <paper-icon-button icon="av:not-interested" aria-label="delete">
                </paper-icon-button>
            </div>
        </article> `
            template.innerHTML = str
            template.content.children[0].setAttribute('slot', 'item' + index)
            var clone = document.importNode(template.content, true);
            this.appendChild(clone)
            this.children[index].children[2].setAttribute('value', index)
            this.children[index].children[2].children[0].addEventListener('click', (this._showPage).bind(this));

            this.children[index].children[5].setAttribute('value', index)
            this.children[index].children[5].children[0].addEventListener('click', (this._confirmPublish).bind(this), false);

            this.children[index].children[6].setAttribute('value', index)
            this.children[index].children[6].children[0].addEventListener('click', (this._openConfirm).bind(this), true);
        }
    }

    ready() {
        super.ready()
        this._routePageChanged(this.route)
    }
    _routePageChanged(route) {
        if (route.__queryParams !== undefined) {
            this.set('images', [JSON.parse(atob(route.__queryParams.content))])
        }
    }
    _showPage(event) {
        let index = event.srcElement.parentElement.parentElement.getAttribute('value')
        let string = window.btoa(`${JSON.stringify(this.content)}`);
        window.history.pushState({}, null, `content/articles/edit-articles?content=${string}&index=${index}&add=false`);
        window.dispatchEvent(new CustomEvent('location-changed'));
    }
    _getImage(data) {
        return data.image[0].url
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
    __publish(data) {
        console.log(data)
    }
    _deleteImg(data) {
        console.log(data)
    }
    _log(data) {
        return data[0]
    }

}
customElements.define(cmsArticle.is, cmsArticle);