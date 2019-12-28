
import { html } from '@polymer/polymer/polymer-element.js';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { cmsArticlesLib } from '../tools/cms-save-lib.js';
import { html as litHtml, render } from 'lit-html';
import './cms-article-item'
class cmsArticleView extends cmsArticlesLib(cmsMiddlePageTemplate) {
    static get _getStyles() {
        return html`
        div[arow]{
            color: #5487b6; 
        }
        `
    }
    static get _getSilentAnchor() {
        return html`            
        <a href="[[rootPath]]content/articles/add-articles?&add=true">
            <div class="add-btn-group" title="[[ADD]]">
                <div class="add-btn-group-item group-item-top-left" ></div>

                <div class="add-btn-group-item group-item-top-right"></div>

                <div class="add-btn-group-item group-item-bottom-left"></div>

                <div class="add-btn-group-item group-item-bottom-right"></div>
            </div>
        </a>
        `
    }
    static get _topLabel() {
        return html`       
            <h2>[[articles]]</h2>               
        `
    }
    static get _getTable() {
        return html`
        <div table class="scroll">          
            <dom-repeat repeat items="[[contents]]" as="item">
                <template>
                    <slot name="article-[[index]]">                    
                </template>                            
            </dom-repeat>
        </div>    `
    }

    static get _getBottom() {
        return html`       
        <div class="count">
            <span> [[contents.length]] </span>
        </div>
        <section class="flexchildbotom noFlex">
            <div class="center flex">
                <h4 class="putitcool"> [[title]] </h4>               
                <h4> [[viewedit]] viewedit</h4>
            </div>
        </section>                       
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[type]] type</h4>
            </div>
        </section>                       
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[type]] category</h4>
            </div>
        </section>                       
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[published]] published</h4>
            </div>
        </section>   
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[STOCK]] stock </h4>
            </div>
        </section>                          
        <section class="flexchildbotom noFlex">
            <div aria-delete="delete" class="center">
                <h4> [[delete]] delete</h4>
            </div>
        </section>
        `
    }
    static get is() { return 'cms-article-view'; }
    static get properties() {
        return {
            route: {
                type: Object,
                notify: true
            },
            user: {
                type: Object,
                notify: true,
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]// MyAppGlobals.translator
                }
            },
            lang: {
                type: String,
                notify: true,
                observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
            },
            contents: {
                type: Array,
                notify: true,
                value: new Array(),
                observer: '_setArticleElements'
            },
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData.page, query.reset)'
        ];
    }
    ready() {
        super.ready()
        const articleTemplate = () => litHtml`<paper-spinner-lite active="false" slot="spinner">`
        render(articleTemplate(), this);
        this.translator.target('cms-article-view', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-article-view', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-article-view', 'setLangObject')
    }
    _setLObj(res, querySnapshot) {
        if ('data' in querySnapshot) {
            let langs = querySnapshot.data()
            res.call(this, langs);
        }
    }
    _setLang(res, lang) {
        this.lang = lang
        res.call(this);
    }
    __changeLang() {
        this.lang = this.translator.lang
        this.translator.changeLang.call(this)
    }
    _routePageChanged(page, rst) {
        if (typeof this.time === 'number') clearInterval(this.time)
        let reset = (rst === 'true')
        if (!rst) {
            if (!!page && page === "articles") {
                if (this.contents.length === 0) {
                    this.time = setTimeout(() => {
                        afterNextRender(this, () => {
                            this.getArticles({ q: 'removed', v: false })
                        });
                    }, 120);
                }
            }
        } else if (reset === true) {
            const articleTemplate = () => litHtml`<paper-spinner-lite active="false" slot="spinner">`
            render(articleTemplate(), this);
            this._contentChanged()
        }
    }

    _setContent(data, art) {
        let temp = this.contents, arr = []
        this.contents = []
        arr.push(data)
        arr.push(art)
        temp.push(arr)
        this.contents = temp
    }
    _contentChanged() {
        if (typeof this.time === 'number') clearTimeout(this.time)
        if (this.routeData.page === "articles") {
            this.contents = []
            this.time = setTimeout(() => {
                window.history.pushState({}, null, `${this.rootPath}content/articles`)
                window.dispatchEvent(new CustomEvent('location-changed'));
            }, 500);
        } else {
            this.contents = []
        }
    }
    _setArticleElements(data) {
        if (typeof this.time === 'number') clearTimeout(this.time)
        this.time = setTimeout(() => {
            const articleTemplate = (articles) => litHtml`${articles.map((article, idx) => {
                return litHtml`<cms-article-item slot="article-${idx}" .article="${article}">
                       </cms-article-item>`
            })} `
            render(articleTemplate(data), this);
        }, 60);
    }
}
customElements.define(cmsArticleView.is, cmsArticleView);