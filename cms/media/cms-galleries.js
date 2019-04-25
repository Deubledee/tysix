import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import { Setter } from '../tools/cms-element-set';
import './cms-gallery-item';
const Consts = new Setter()
Consts.assets = Consts.getAssets('cms-galleries')
Consts.template.innerHTML = `<paper-spinner-lite active="false" slot="spinner">
    </paper-spinner-lite>`
class cmsGalleries extends cmsMiddlePageTemplate {
    static get _getShoutAnchor() {
        return html` 
            <a href="[[rootPath]]media/images/add-gallery">
                <paper-tab name=" add-category-pages">
                    [[Galleries]]
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
            <div class="flexleft">
                <h3> [[Gallery]] </h3>
            </div>
        </section>    
        <section class="flexchildbotom noFlex">
            <div class="flexleft">
                <h3> [[viewEdit]] </h3>
            </div>
        </section>                       
        <section class="flexchildbotom noFlex">
            <div class="flexleft">
                <h3> [[remove]] </h3>
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
        <dom-repeat repeat items="[[galleries]]" as="detail">
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
                        [[datecreated]]
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                        <b> detail.datecreated </b>
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                        [[Published]]
                        </span>
                    </aside>
                    <aside>
                        <span>
                        [[categorypages]]
                        </span>
                    </aside>
                </div>
                <div rightSide>                            
                    <dom-repeat repeat items="[[detail.published]]" as="published">
                        <template>
                            <section>
                                <aside>
                                    <span>
                                        published.page
                                    </span>
                                </aside>
                                <aside>
                                    <span>
                                        published.datePublished
                                    </span>
                                </aside>
                            </section>
                        </template>
                    </dom-repeat>
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
        Consts.clone(this)
        Consts.assets.then((querySnapshot) => {
            let style = querySnapshot.data();
            Consts.setLangObject.call(this, style);
        }).catch(function (error) {
            console.error("Error reteaving assets: ", error);
        });
        this.getImageGalleries(true)
    }
    __changeLang() {
        Consts.changeLang.call(this)
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
    eventFunction(event) {
        this.set('galleries', event)
    }
    getImageGalleries(data) {
        if (data === true || data === 'true') {
            Consts._DBW.getMediaGalleries((done) => {
                this.eventFunction(done)
            }, true)
        }
        this.removeChild(this.children[0])
    }
    log(data) {
        console.log(data)
    }
}
customElements.define(cmsGalleries.is, cmsGalleries);