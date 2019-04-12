import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from '../templates/cms-middle-page-template'
import { dataBaseworker } from '../tools/dataBaseWorker';
import './cms-gallery-item';
class cmsGalleries extends cmsMiddlePageTemplate {
    static get _getShoutAnchor() {
        return html` 
            <a href="[[rootPath]]media/images/add-gallery">
                <paper-tab name=" add-category-pages">
                    [[Galleries]] galleries
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
                <h3> view </h3>
            </div>
        </section>    
        <section class="flexchildbotom noFlex">
            <div class="flexleft">
                <h3> view/edit </h3>
            </div>
        </section>                       
        <section class="flexchildbotom noFlex">
            <div class="flexleft">
                <h3> remove </h3>
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
                    return-path="{{returnPath}}"> 
                </cms-gallery-item>
            </template>
        </dom-repeat>
        `}
    static get _getNavside() {
        return html`
        <!--dom-repeat repeat items="[[info]]" as="detail">
            <template-->
                <div class="flexsidecenter">
                    <aside>
                        <span>
                            Info
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                        categorycount
                        </span>
                    </aside>
                </div>
                <div class="navsideright">
                    <aside>
                        <span>
                        <b> detail.categoryCount </b>
                        </span>
                    </aside>
                </div>
                <div class="navsideleft">
                    <aside>
                        <span>
                        Published
                        </span>
                    </aside>
                    <aside>
                        <span>
                        categorypages
                        </span>
                    </aside>
                </div>
                <div rightSide>                            
                    <!--dom-repeat repeat items="[[detail.published]]" as="published">
                        <template-->
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
                        <!--/template>
                    </dom-repeat-->
                </div>
            <!--/template>
        </dom-repeat-->
        `
    }
    static get is() { return 'cms-galleries'; }

    static get properties() {
        return {
            DBW: {
                type: Object,
                value: function () {
                    return new dataBaseworker()
                },
                notify: true
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

    ready() {
        super.ready()
        this.getImageGalleries(true)
    }
    static get observers() {
        return [
            '_routePageChanged(routeData, query, active)'
        ];
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
    __changeLang() {
        try {
            if (this.langs[this.lang]) {
                let obj = this.langs[this.lang];
                for (let par in obj) {
                    if (Boolean(this[par]) === true) {
                        this.set(par, obj[par])
                    } else {
                        this.set(par, '');
                        this.set(par, obj[par]);
                    }
                }
            }
        }
        catch (err) {
            console.error(err)
        }
    }
    _setLangObject(langs) {
        try {
            for (let par in langs) {
                if (par !== 'styles') {
                    this.langs[par] = langs[par].pop();
                }
            }
            this.__changeLang();
        }
        catch (err) {
            console.error(err)
        }
    }

    eventFunction(event) {
        this.set('galleries', event)
    }

    getImageGalleries(data) {
        if (data === true || data === 'true') {
            this.DBW.getMediaGalleries((done) => {
                this.eventFunction(done)
            }, true)
        }
    }
    log(data) {
        console.log(data)
    }
}
customElements.define(cmsGalleries.is, cmsGalleries);