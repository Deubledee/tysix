import { html } from '@polymer/polymer/polymer-element';
import { cmsMiddlePageTemplate } from './cms-middle-page-template.js'
import { dataBaseworker } from './dataBaseWorker';
import './cms-gallerie-item.js';
class cmsGalleries extends cmsMiddlePageTemplate {
    static get _getShoutAnchor() {
        return html` <a href="[[rootPath]]media/images/add-gallery">
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
        <section class="flexchildbotom">
            <div class="flexleft">
                <h3> view </h3>
            </div>
        </section>                        
            
        <section class="flexchildbotom">
            <div class="flexleft">
                <h3> add </h3>
            </div>
        </section>                        
        <section class="flexchildbotom">
            <div class="flexleft">
                <h3> remove </h3>
            </div>
        </section>  
        `
    }
    static get _getTable() {
        return html`
        <dom-repeat items="[[galleries]]" as="page">
            <template strip-whitespace>
                [[putElement(index, page)]]
                <slot name="item[[index]]"></slot>
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

    putElement(index, gallerie) {
        let template = html`
                <cms-gallerie-item> 
                </cms-gallerie-item>`;
        var clone = document.importNode(template.content, true);
        this.appendChild(clone);
        this.children[index].setAttribute('slot', `item${index}`);
        this.children[index].set('gallerie', gallerie);
    }

    eventFunction(event) {
        this.set('galleries', event)
    }

    getImageGalleries(data) {
        if (data === true || data === 'true') {
            this.DBW.getImageGalleries((done) => {
                this.eventFunction(done)
            }, true)
        }
    }
    log(data) {
        console.log(data)
    }
}
customElements.define(cmsGalleries.is, cmsGalleries);