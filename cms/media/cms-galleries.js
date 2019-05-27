import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import './cms-gallery-item';
class cmsGalleries extends cmsMiddlePageTemplate {
    static get _getShoutAnchor() {
        return html` 
            <a href="[[rootPath]]media/images/add-gallery">
                <paper-tab name=" add-category-pages">
                [[ADD]] [[Galleries]]
                    <paper-icon-button-light>
                        <iron-icon icon="av:library-add" aria-label="categories"></iron-icon>
                    </paper-icon-button-light>
                </paper-tab>
            </a>`
    }
    static get _getSilentAnchor() {
        return html`
        <iron-selector selected="[[page]]" attr-for-selected="id" class="drawer-list" role="navigation">
            <a id="reset" href="[[rootPath]]media/">
            </a>
        </iron-selector>
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
                    add-image-to="[[addImageTo]]"
                    query="[[query]]"
                    return-path="{{returnPath}}"> 
                </cms-gallery-item>
            </template>
        </dom-repeat>
        `}
    static get _getNavside() {
        return html`
        <dom-repeat repeat items="[[inform]]" as="detail">
            <template>
                <div class="flexsidecenter">
                    <aside>
                        <span>
                            [[info]]
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                        [[GalleryCount]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                        [[imageCount]]
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                        <b> [[detail.GalleryCount]] </b>
                        </span>
                    </aside>
                    <aside>
                        <span>
                        <b> [[detail.imageCount]] </b>
                        </span>
                    </aside>
                </div>
            </template>
        </dom-repeat>
        `
    }
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
            addImageTo: {
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
                    return MyAppGlobals.translator
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
        if (active === true && ['galleries'].indexOf(routeData.page) !== -1 && 'addimageto' in query === true) {
            this.addImageTo = query.method
            this.contentto = JSON.parse(atob(query.content))
            this.add = true
        }
        if (active === true && ['galleries'].indexOf(routeData.page) !== -1 && 'addimageto' in query === false) {
            this.addImageTo = ''
            this.contentto = {}
            this.add = false
        }
    }
    _setGalleries(event) {
        for (let par in event) {
            if (par !== 'Info') {
                this.set('galleries', event[par])
            } else {
                this.set('inform', event[par])
            }
        }
    }
    _getGalleries(data) {
        if (data === true || data === 'true') {
            this.translator._DBW.getMediaContent((done) => {
                this._setGalleries(done)
            }, { name: 'galleries' }, true)
        }
        this.removeChild(this.children[0])
    }
    log(data) {
        console.log(data)
    }
}
customElements.define(cmsGalleries.is, cmsGalleries);