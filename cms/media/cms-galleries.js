import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import { cmsMediaLib } from '../tools/cms-save-lib.js';
class cmsGalleries extends cmsMediaLib(cmsMiddlePageTemplate) {
    static get _topLabel() {
        return html`       
            <h2>[[Galleries]]</h2>               
        `
    }
    static get _getSilentAnchor() {
        return html`            
        <a on-click="_newGall">
            <div class="add-btn-group" title="[[ADD]]">
                <div class="add-btn-group-item group-item-top-left" ></div>

                <div class="add-btn-group-item group-item-top-right"></div>

                <div class="add-btn-group-item group-item-bottom-left"></div>

                <div class="add-btn-group-item group-item-bottom-right"></div>
            </div> 
        </a>
        `
    }
    static get _getBottom() {
        return html`       
        <div class="count">
            <span> [[galleries.length]] </span>
        </div>
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[Gallery]]  [[viewEdit]]</h4>
            </div>
        </section>     
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[viewEdit]] images </h4>
            </div>
        </section> 
        <section class="flexchildbotom noFlex">
            <div class="center">
                <h4> [[viewEdit]] Groups </h4>
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
                [[putElement(index, gallery)]]
                <slot name="item[[index]]"></slot>
            </template>
        </dom-repeat>
        `}
    static get is() { return 'cms-galleries'; }

    static get properties() {
        return {
            route: {
                type: Object,
                notify: true
            },
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
            spinOut: {
                type: Boolean,
                value: false
            },
            sloted: {
                type: Boolean,
                value: false
            }
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
        if (['galleries'].indexOf(routeData.page) !== -1) {
            this._getGalleries({ q: 'removed', v: false })
        }
    }
    _newGall() {

    }
    putElement(index, gallery) {
        if (typeof this.time === 'number') {
            clearTimeout(this.time)
        }
        if (this.sloted === false) {
            let template = html`   
                         <cms-gallery-item> 
                        </cms-gallery-item>`;
            var clone = document.importNode(template.content, true);
            this.appendChild(clone);
            let count = (this.childElementCount - 1)
            this.children[count].setAttribute('slot', `item${count}`);
            this.children[count].set('gallery', gallery);
            this.time = setTimeout(() => {
                this.set('sloted', true)
            }, 60);
        }
    }
    log(data) {
        console.log(data)
    }
}
customElements.define(cmsGalleries.is, cmsGalleries);