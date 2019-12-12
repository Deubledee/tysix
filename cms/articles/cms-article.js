import { html } from '@polymer/polymer/polymer-element.js';
import { cmsItemTemplate } from '../templates/cms-item-template';
import { Setter } from '../tools/cms-element-set';
import './cms-article-item'
const Consts = new Setter()
Consts.assets = Consts.getAssets('cms-articles')
class cmsArticle extends cmsItemTemplate {

    static get _getStyles() {
        return html`        
        div[arow]{
            font-size: var(--app-images-article-font-size);
            height: 41px;
            padding-top: unset;
        }
        div[arow] h4{
            margin-block-start: 8px;
        }
        `
    }

    static get _getElement() {
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
            },
            langs: {
                type: Object,
                value: {}
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]//MyAppGlobals.translator
                }
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
    _log(data) {
        console.log(data)
    }
    ready() {
        super.ready()
        this.translator.target('cms-articles', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-articles', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-articles', 'setLangObject')
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
    __publish(data) {
        console.log(data)
    }
    _getArticle(data) {
        return data
    }
}
customElements.define(cmsArticle.is, cmsArticle);