import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import './cms-gallery-item';
import { cmsMediaLib } from '../tools/cms-save-lib.js';
class cmsGalleries extends cmsMediaLib(cmsMiddlePageTemplate) {
    static get _getSilentAnchor() {
        return html`            
        <a href="[[rootPath]]media/images/add-gallery">
                <paper-icon-button icon="av:library-add" aria-label="categories"></iron-icon>
                </paper-icon-button>
            [[ADD]] [[Galleries]]
        </a>
        `
    }
    static get _getBottom() {
        return html`
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[Gallery]] </h4>
            </div>
        </section>    
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[viewEdit]] </h4>
            </div>
        </section>                       
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[remove]] </h4>
            </div>
        </section>  
        `
    }
    static get _getTable() {
        return html`
        <dom-repeat items="[[galleries]]" as="gallery">
            <template>                
                <cms-gallery-item 
                    route="{{route}}" 
                    gallery="[[gallery]]" 
                    images="{{images}}" 
                    method="[[method]]"
                    query="[[query]]"
                    return-path="{{returnPath}}"> 
                </cms-gallery-item>
            </template>
        </dom-repeat>
        `}
    static get is() { return 'cms-galleries'; }

    static get properties() {
        return {
            lang: {
                type: String,
                observer: '__changeLang'
            },
            langs: {
                type: Object,
                value: {}
            },
            returnPath: {
                type: String,
                notify: true
            },
            method: {
                type: String,
                notify: true
            },
            contentto: {
                type: Object,
                notify: true
            },
            add: {
                type: Boolean,
                notify: true
            },
            images: {
                type: Array,
                notify: true,
            },
            galleries: {
                type: Array,
                notify: true
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]// MyAppGlobals.translator
                }
            },
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, query, active)'
        ];
    }
    ready() {
        super.ready()
        this.translator.template.innerHTML = `<paper-spinner-lite active="false" slot="spinner">
    </paper-spinner-lite>`
        this.translator.clone(this)
        this.translator.target('cms-galleries', 'setLangObject', (this._setLObj).bind(this))
        this.translator.target('cms-galleries', 'changeLang', (this._setLang).bind(this), false)
        this.translator.shoot('cms-galleries', 'setLangObject')
        this._getGalleries(true)
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
    _routePageChanged(routeData, query, active) {
        if (!!this.route) {
            let arr2 = []
            arr2.push('home')
            //  arr2.push(this.route.prefix)
            this.set('breadcrumbs', arr2)
        }
        if (active === true && ['galleries'].indexOf(routeData.page) !== -1 && 'addimageto' in query === true) {
            this.method = query.method
            let string = !!query.parent ? `${query.addimageto}${query.parent}${query.content}` : `${query.addimageto}${query.content}`
            this.contentto = JSON.parse(localStorage[string])
            this.add = true/**/
        }
        if (active === true && ['galleries'].indexOf(routeData.page) !== -1 && 'addimageto' in query === false) {
            this.addImageTo = ''
            this.contentto = {}
            this.add = false
        }
    }

    log(data) {
        console.log(data)
    }
}
customElements.define(cmsGalleries.is, cmsGalleries);