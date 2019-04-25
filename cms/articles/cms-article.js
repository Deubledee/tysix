import { html } from '@polymer/polymer/polymer-element.js';
import { cmsItemImageTemplate } from '../templates/cms-item-image-template';
import { Setter } from '../tools/cms-element-set';
import './cms-article-item'
const Consts = new Setter()
Consts.assets = Consts.getAssets('cms-articles')
class cmsArticle extends cmsItemImageTemplate {

    static get _getStyles() {
        return html`        
        div[bottom]{
            height: 35px;
            font-size: var(--app-images-article-font-size);
            background-color: var(--app-tabs-color);
            box-shadow: 1px 1px 4px var(--disabled-text-color);
        }
        div[bottom] h4{
            margin-block-start: 8px;
        }
        `
    }
    static get _getMenu() {
        return html`                           
            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4 title="[[item]]">  [[item]]   </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4 title="[[title]]"> 
                    [[title]]    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">
                    <h4 title="[[viewedit]]"> [[viewedit]] </h4>
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">   
                    <h4 title="[[stock]]"> 
                    [[stock]]    </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4 title="[[type]]"> 
                    [[type]]     </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4 title="[[published]]"> 
                    [[published]] </h4>     
                </div>  
            </section>
            <section class="flexchildbotom noFlex">
                <div class="flexleft">  
                    <h4 title="[[delete]]"> 
                    [[delete]]      </h4>     
                </div>  
            </section>`
    }
    static get _getItem() {
        return html` 
        <dom-repeat repeat items="[[content]]" as="item">
            <template>
                <cms-article-item article="[[item]]">
                </cms-article-item>
            </template>                            
        </dom-repeat>`
    }

    static get is() { return 'cms-article'; }
    static get properties() {
        return {
            lang: {
                type: String,
                notify: true,
                observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
            },
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
        Consts.assets.then((querySnapshot) => {
            let langs = querySnapshot.data();
            Consts.setLangObject.call(this, langs);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
    }
    __changeLang() {
        Consts.changeLang.call(this)
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