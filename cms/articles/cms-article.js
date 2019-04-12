import { html } from '@polymer/polymer/polymer-element.js';
import { cmsItemImageTemplate } from '../templates/cms-item-image-template';

class cmsArticle extends cmsItemImageTemplate {

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
            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4>  item   </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4> 
                    title    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">
                    <h4> [[viewedit]]viewedit </h4>
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4> 
                    stock    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4> 
                    type     </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4> 
                    published </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4> 
                    delete      </h4>     
                </div>  
            </section>`
    }
    static get _getItem() {
        return html` 
        <dom-repeat repeat items="[[content]]" as="item">
            <template>
                <slot name="article[[index]]"></slot>  
                [[_slottItem(item, index)]]
            </template>                            
        </dom-repeat>`
    }

    static get is() { return 'cms-article'; }
    static get properties() {
        return {
            article: {
                type: Array,
                notify: true
            },
            content: {
                type: Array,
                notify: true,
                computed: '_getArticle(article)'
            }
        };
    }

    ready() {
        super.ready()
    }

    _slottItem(item, index) {
        let template = document.createElement('template')
        let str = `
            <cms-article-item article="" slot="article${index}">
            </cms-article-item>
            `
        template.innerHTML = str
        var clone = document.importNode(template.content, true);
        this.appendChild(clone)
        this.children[index].page = item
    }

    __publish(data) {
        console.log(data)
    }
    _deleteImg(data) {
        console.log(data)
    }
    _getArticle(data) {
        return [data]
    }

}
customElements.define(cmsArticle.is, cmsArticle);