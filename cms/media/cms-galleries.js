import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import { cmsMediaLib } from '../tools/cms-save-lib.js';
import { html as litHtml, render } from 'lit-html';
import '../elements/cms-pop-input';

class cmsGalleries extends cmsMediaLib(cmsMiddlePageTemplate) {
    static get _getStyles() {
        return html`
        :host{
            position: relative,
        }
       /* ::slotted(*){
            background-color: red
        }
        ::slotted(cms-gallery-item){
            background-color: blue;            
        }*/
        div[path]{
            height: 30px;
            width: 300px;
        }
        div[path]{
            display: flex;
            flex-direction: row;
            position: relative;
            font-style: italic;    
            padding-left: 57px;
            color: var(--app-content-section-span-color)    
        }
        div[path] h5 {
            margin-block-start: 12px;
            margin-block-end: 7px;
        }
        div[path] h6 {
            margin-block-start: 12px;
            margin-block-end: 7px;
            color: var(--paper-blue-a200); 
        }
        .xbuton{
            cursor: pointer;
            box-sizing: border-box;
            display: flex;
            flex-direction: row;
            padding-top: 2px;
        }  
        paper-button.save-btn, .save-btn {
            color: var(--google-blue-300);
            height: 30px; 
        }
        .warning-color-2{
            color: green
        }
        `
    }
    static get _topLabel() {
        return html`       
            <h2>[[Galleries]]</h2>    
            <div path>
                <!--cms-pop-input tgglelang="{{tgglelang}}" warning="[[warning]]" warning-msg="[[warningMsg]]"> 
                    <paper-button slot="button" class="exex" on-click="_newGall">
                        x
                    </paper-button> 
                    <cms-content-input
                        slot="input" 
                        item="[[itemlang]]"
                        res="{{addLangResponse}}"
                        raised="[[raised]]">
                    </cms-content-input>  
                    <paper-button class="save-btn"  slot="anchor" on-click="_onSave">
                        <h6 id="agasix" class="save-btn" >  save </h6> 
                    </paper-button>                                              
                </cms-pop-input-->           
            </div>`
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
    static get _getTable() {
        return html`
        <dom-repeat items="[[galleries]]" as="gallery">
            <template>
                <slot name="item[[index]]"></slot>
            </template>
        </dom-repeat>
        `}
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
    static get is() { return 'cms-galleries'; }

    static get properties() {
        return {
            route: {
                type: Object,
                notify: true
            },
            translator: {
                type: Object,
                notify: true,
                value: function () {
                    return MyAppGlobals[window.cms]// MyAppGlobals.translator
                }
            },
            user: {
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
            addLangResponse: {
                type: Object,
                notify: true,
                value: {},
                observer: '_setAddLangValue'
            },
            itemlang: {
                type: Object,
                notify: true,
                value: function () {
                    return {
                        'addGall': ''
                    }
                }
            },
            warning: {
                type: Boolean,
                notify: true,
                value: true,
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
            gall: {
                type: String,
                notify: true,
                value: ''
            },
            newGall: {
                type: String,
                notify: true,
                value: ''
            },
            galleries: {
                type: Array,
                notify: true,
                observer: 'putElement'
            },
            tgglelang: {
                type: Boolean,
                value: true,
                notify: true
            },
            spinOut: {
                type: Boolean,
                value: false
            },
            sloted: {
                type: Boolean,
                value: false
            },
            raised: {
                type: Boolean,
                notify: true,
                value: false,
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
        const spinnerTemplate = () => litHtml`<paper-spinner-lite active="false" slot="spinner">`
        render(spinnerTemplate(), this);
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
    _routePageChanged(routeData, query) {
        if (['galleries'].indexOf(routeData.page) !== -1 || query.reset === 'true') {
            this._getGalleries({ q: 'removed', v: false })
        }
    }
    _setAddLangValue(data) {
        if (typeof this.time === 'number') clearTimeout(this.time)
        if (!!data && !('undefined' in data)) {
            this.time = setTimeout(() => {
                this.gall = data.addGall
            }, 500)
        }
    }

    _newGall() {
        this.tgglelang = !this.tgglelang
        if (this.tgglelang) {
            this.warningMsg = ''
        }
    }

    _onSave() {
        let count = this.gall.split('').length
        if (count > 0) {
            let data = new Date(), inform = {}
            this._lastModified(this._setInfo(inform, data), data)
            this._setGallery()
        } else {
            this.warningMsg = 'character count cannot be zero "0"'
            setTimeout(() => {
                this.warningMsg = ''
            }, 1500)
        }
    }

    _lastModified(inform, data) {
        inform.lastModified = []
        inform.lastModified.push({
            uid: this.user.uid,
            author: this.user.name,
            date: data.toLocaleString().replace(',', '')
        });
        this.newGall = inform
    }

    _setInfo(inform, data) {
        inform.author = {}
        inform.id = this.gall
        inform.type = 'gallerie'
        inform.author.id = this.user.uid
        inform.author.name = this.user.name
        inform.removed = false
        inform.dateCreated = data.toLocaleString().replace(',', '')
        return inform
    }

    putElement(data) {
        if (typeof this.time === 'number') clearInterval(this.time)
        this.time = setTimeout(() => {
            const pageTemplate = (galleries) => litHtml`${galleries.map((gallery, idx) => {
                return litHtml`<cms-gallery-item slot="item${idx}" .gallery="${gallery}"> 
                                   </cms-gallery-item>`
            })} `
            render(pageTemplate(data), this);
        }, 60);
    }
    log(data) {
        console.log(data)
    }
}
customElements.define(cmsGalleries.is, cmsGalleries);
