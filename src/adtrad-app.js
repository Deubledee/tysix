import { scroll } from '@polymer/app-layout/helpers/helpers.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
import { setPassiveTouchGestures, setRootPath } from '@polymer/polymer/lib/utils/settings';
import { html, PolymerElement } from '@polymer/polymer/polymer-element';
import { html as litHtml, render } from 'lit-html';
import { request } from '../cms/tools/http-handler';
import './lazy-imports.js';

setPassiveTouchGestures(true);
setRootPath('/');

class adtradApp extends PolymerElement {
    static get template() {
        return html` 
        <style>
        host:{
            --app-
        }

        /*    app-box {
                position: fixed;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                --app-box-background-front-layer: {
                    background: linear-gradient(to bottom, rgba(33, 45, 64, 0.8) 0%, rgba(33, 45, 64, -0.2) 54%, #212D40 100%), url(img/ADTLogo_ficheirosfinais/Logosstandard/ADT_logostandard.jpg);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-attachment: scroll;
                    background-size: contain;
                };
            }*/
            app-header {
                color: #fff;
                background: linear-gradient(to top right, rgba(33, 45, 64, 0.58) 56%, rgba(33, 45, 64, 0.55) 54%, #212D40 100%);
                height: 100vh;
                overflow: hidden;
            }

            app-toolbar {
                height: 120px;
            }

            [condensed-title] {
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
                background-image: url('img/ADTLogo_ficheirosfinais/ADT_FBProfile_transparent_small.png');
                background-repeat: no-repeat;
                background-position: 30px;
                background-size: 90px;
                font-size: 16px;
            }

            app-toolbar[main-title] {
                display: flex;
                flex-direction: column;
                background: url(img/ADTLogo_ficheirosfinais/Logosstandard/ADT_logostandard_semfundo.png);
                background-position: center;
                background-repeat: no-repeat;
                background-attachment: scroll;
                background-size: 85vw;
            }

            div[main-title] {
                margin-top: 59px;
                font-size: 32px;
                /* border: 1px solid; */
                width: 65%;
                ox-sizing: border-box;
                padding: 41px;
                text-align: center;
                color: #374156;
            }

            .content {
                display: block;
                position: relative;
                max-width: 1000px;
                margin: 5px auto;
            }

            .card-container {
                display: inline-block;
                width: 33.33%;
                color: black;
                text-decoration: none;
            }

            paper-card {
                display: block;
                margin: 5px;

                --paper-card-header-image: {
                    height: 200px;
                }
            }

            paper-card h2 {
                margin: 4px;
                font-weight: normal;
            }

            paper-card p {
                margin: 4px;
                color: #999;
            }

            paper-fab {
                position: fixed;
                right: 24px;
                bottom: 24px;

                --paper-fab-background: #EF5458;
                --paper-fab-keyboard-focus-background: #DF4448;
            }

            @media (max-width: 960px) {
                .content {
                    max-width: 800px;
            }

            .card-container {
                    width: 50%;
                }
            }

            @media (max-width: 719px) {
                app-toolbar {
                    height: 60px;
                }

                [condensed-title] {
                    background-image: url('img/ADTLogo_ficheirosfinais/ADT_FBProfile_transparent_small.png');
                    background-size: 60px;
                }

                [main-title] {
                    top: -60px;
                    background-image: url('img/ADTLogo_ficheirosfinais/Logosstandard/ADT_logostandard.jpg');
                    background-size: 90px;
                }

                .content {
                    max-width: 400px;
                }

                .card-container {
                    width: 100%;
                }
            }

            /* tySix new styles*/

            .header-container {
                position: relative;
                height: auto;
                z-index: 12;
            }
            app-header-layout {
                height: 100vh;
            }
            paper-icon-button + [main-title] {
                    margin-left: 24px;
                }

           app-header[toolbar-extended]{
               position: fixed;
               z-index: 1;
               width: 100%;
               height: 121px;
               background: unset;
               box-sizing: border-box;
               padding: 25px;
            }
            app-toolbar[toolbar-extended]{
                display: block;
                width: 100%;
                height: 65px;
                z-index: 1;
                color: #d66852;
            }

            paper-icon-button[icon=home]{
                float: left;
            }
            paper-tabs {
                float: right;
            }
            </style>
            <app-location route="{{route}}"> </app-location>
            <app-route route="{{route}}" pattern="/:page" data="{{routeData}}" tail="{{subroute}}" active="{{active}}" query-params="{{query}}">
            </app-route>  
            <!--app-box
                effects="parallax-background"
                effects-config='{"parallax-background": {"scalar": -0.5}}'></app-box-->
               <!-- main panel -->
            <nav class="header-container">   

                <app-header toolbar-extended effects="resize-title" fixed shadow>
                    <app-toolbar toolbar-extended > 

                        <paper-icon-button icon="home">
                        </paper-icon-button>           

                        <paper-tabs selected="0">
                            <paper-tab>home</paper-tab>
                            <paper-tab>blog</paper-tab>
                        </paper-tabs>

                    </app-toolbar>
                </app-header>
                <app-header-layout>
                    <app-header effects="resize-title" condenses fixed shadow slot="header">
                    
                        <app-toolbar class="top-toolbar">
                            <div condensed-title></div>
                        </app-toolbar>

                        <app-toolbar main-title class="bottom-toolbar">
                            <div main-title> 
                                <h2>Tradutora Júridica</h2>
                                <p>                                   
                                    <h4>
                                        Aqui trabalha-se! 
                                    </h4>
                                    Tudo sempre a horas, mas com a guita primeiro..!
                                </p>
                            </div>

                        </app-toolbar>
                    </app-header>
                </app-header-layout>
            </nav>
            <div class="content">

                <a href="#/detail/{{item.id}}" class="card-container">
                    <paper-card image="img/ADTLogo_ficheirosfinais/Logosstandard/ADT_logostandard.jpg">
                    <div class="card-content">
                        <h2>daerrrt</h2>
                        <p>By <span>fdddddddddddddddddddddddddddddddddddddddddddddddddddd</span></p>
                    </div>
                    </paper-card>
                </a>
                <a href="#/detail/{{item.id}}" class="card-container">
                    <paper-card image="img/ADTLogo_ficheirosfinais/Logosstandard/ADT_logostandard.jpg">
                    <div class="card-content">
                        <h2>daerrrt</h2>
                        <p>By <span>fdddddddddddddddddddddddddddddddddddddddddddddddddddd</span></p>
                    </div>
                    </paper-card>
                </a>
                <a href="#/detail/{{item.id}}" class="card-container">
                    <paper-card image="img/ADTLogo_ficheirosfinais/Logosstandard/ADT_logostandard.jpg">
                    <div class="card-content">
                        <h2>daerrrt</h2>
                        <p>By <span>fdddddddddddddddddddddddddddddddddddddddddddddddddddd</span></p>
                    </div>
                    </paper-card>
                </a>
                <a href="#/detail/{{item.id}}" class="card-container">
                    <paper-card image="img/ADTLogo_ficheirosfinais/Logosstandard/ADT_logostandard.jpg">
                    <div class="card-content">
                        <h2>daerrrt</h2>
                        <p>By <span>fdddddddddddddddddddddddddddddddddddddddddddddddddddd</span></p>
                    </div>
                    </paper-card>
                </a>

                <a href="#/detail/{{item.id}}" class="card-container">
                    <paper-card image="img/ADTLogo_ficheirosfinais/Logosstandard/ADT_logostandard.jpg">
                    <div class="card-content">
                        <h2>daerrrt</h2>
                        <p>By <span>fdddddddddddddddddddddddddddddddddddddddddddddddddddd</span></p>
                    </div>
                    </paper-card>
                </a>
                <a href="#/detail/{{item.id}}" class="card-container">
                    <paper-card image="img/ADTLogo_ficheirosfinais/Logosstandard/ADT_logostandard.jpg">
                    <div class="card-content">
                        <h2>daerrrt</h2>
                        <p>By <span>fdddddddddddddddddddddddddddddddddddddddddddddddddddd</span></p>
                    </div>
                    </paper-card>
                </a>
                <a href="#/detail/{{item.id}}" class="card-container">
                    <paper-card image="img/ADTLogo_ficheirosfinais/Logosstandard/ADT_logostandard.jpg">
                    <div class="card-content">
                        <h2>daerrrt</h2>
                        <p>By <span>fdddddddddddddddddddddddddddddddddddddddddddddddddddd</span></p>
                    </div>
                    </paper-card>
                </a>
                <a href="#/detail/{{item.id}}" class="card-container">
                    <paper-card image="img/ADTLogo_ficheirosfinais/Logosstandard/ADT_logostandard.jpg">
                    <div class="card-content">
                        <h2>daerrrt</h2>
                        <p>By <span>fdddddddddddddddddddddddddddddddddddddddddddddddddddd</span></p>
                    </div>
                    </paper-card>
                </a>

                    <iron-pages selected="[[page]]" attr-for-selected="name">
                            <!--section >
                                <slot name="home">
                                </slot>                    
                            </section-->

                        <div name="blog">
                            <slot name="blog">
                            </slot>
                        </div>        

                        <div name="about">     
                            <slot name="about">
                            </slot>
                        </div>

                        <div name="contact">     
                            <slot name="contact">
                            </slot>
                        </div>

                        <div name="portfolio">     
                            <slot name="portfolio">
                            </slot>
                        </div>

                        <div name="services">     
                            <slot name="services">
                            </slot>
                        <div>
                    </iron-pages>  
                </div>              
            <!--/app-header-layout-->
        `
    }

    static get is() { return 'adtrad-app'; }
    static get properties() {
        return {
            route: {
                type: Object,
                notify: true,
                // observer: '_log'
            },
            user: {
                type: Object,
                notify: true
            },
            views: {
                type: Object,
                notify: true
            },
            spinnerActive: {
                type: Boolean,
                value: true
            },
            routeData: {
                type: Object,
                observer: '_pageDataChanged'
            },
            page: {
                type: String,
                observer: '_pageChanged'
            },
            pages: {
                type: Array,
                observer: '_setPageToolbar'
            },
            lang: {
                type: String,
                value: "pt"
            },
            spinner: {
                type: Object,
                value: function () {
                    return document.querySelector('paper-spinner')
                }
            },
            _scrollPositionMap: {
                type: Object,
                value: function () {
                    return {};
                }
            }
        }
    }
    static get observers() {
        return [
            '_routePageChanged(routeData.page, views)',
            '_pageChanged(page)'
        ];
    }
    connectedCallback() {
        super.connectedCallback();
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    ready() {
        super.ready();

        var appHeader = this.shadowRoot.querySelector('app-header');
        var appBox = this.shadowRoot.querySelector('app-box');
        var fadeBackgroundEffect = appHeader.createEffect('fade-background');

        window.addEventListener('scroll', function () {
            // var progress = appBox.getScrollState().progress;
            var isCondensed = window.scrollY > 250;

            fadeBackgroundEffect.run(isCondensed ? 1 : 0);
            appHeader.shadow = isCondensed;
        });
        //  this._putHeader()
        // this._getContent()
        /*  window.addEventListener("scroll", () => {
              if (window.scrollY > 150) {
                  document.querySelector('#header').classList.add("header-scrolled")
              } else if (window.scrollY <= 150) {
                  document.querySelector('#header').classList.remove("header-scrolled")
              }
          })*/
    }
    /**
     * Preserves the document scroll position, so
     * it can be restored when returning to a page.
     */
    _pageDataChanged(pageData, oldPageData) {
        var map = this._scrollPositionMap;

        if (oldPageData != null && oldPageData.page != null) {
            map[oldPageData.page] = window.pageYOffset;
        }
        this._selectedPage = pageData.page;
        if (map[pageData.page] != null) {
            scroll({ top: map[pageData.page], behavior: 'silent' });
        } else if (this.isAttached) {
            scroll({ top: 0, behavior: 'silent' });
        }
    }
    _routePageChanged(page, views) {
        if (!!page) {
            if (page === 'home') {
                this.page = page
                return
            }
        }
        if (!!views) {
            if (!!this.views[page]) {
                this.page = this.section[page]
            }
        }
        if (!page) {
            window.history.pushState({}, null, `/home?type=home&lang=${this.lang}`);
            window.dispatchEvent(new CustomEvent('location-changed'));
        }
    }

    _setPageToolbar(data) {
        var mainTemplate = (pages) => litHtml`    
             ${pages.map((page, idx) => {
            return idx === 0 ? litHtml`
                    <li class="active">
                        <a href="${this.rootPath}${page.id}?type=${page.id}&lang=${this.lang}">
                            ${page.categoryName}
                        </a>
                    </li>` :
                litHtml`
                    <li> 
                        <a href="${this.rootPath}${page.id}?type=${page.id}&lang=${this.lang}">
                            ${page.categoryName}
                        </a>
                    </li>`
        })}`
        render(mainTemplate(data), document.querySelector('#toolbar-pages'))
    }

    _putHeader() {
        const mainTemplate = () => litHtml`
            <h1 class="text-light"><a href="${this.rootPath}home"><span>ty6</span></a></h1>
            <!-- Uncomment below if you prefer to use an image logo -->
            <!-- <a href="${this.rootPath}index"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>-->
         `
        render(mainTemplate(), document.querySelector('#header-links'))
    }

    _putFooter() {
        const mainTemplate = (pages) => litHtml` 
                            <li><i class="bx bx-chevron-right"></i> <a href="#">Web Design</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="#">Web Development</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="#">Product Management</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="#">Marketing</a></li>
                            <li><i class="bx bx-chevron-right"></i> <a href="#">Graphic Design</a></li>



                            <a href="#" class="twitter"><i class="bx bxl-twitter"></i></a>
                            <a href="#" class="facebook"><i class="bx bxl-facebook"></i></a>
                            <a href="#" class="instagram"><i class="bx bxl-instagram"></i></a>
                            <a href="#" class="linkedin"><i class="bx bxl-linkedin"></i></a>`

        render(mainTemplate(), document.querySelector('#footer'))
    }
    getLangs(data) {
        var mainTemplate = (pages) => litHtml` <a href="${this.rootPath}"> Drop Down</a>
                       <ul>
                            <li><a href="${this.rootPath}">Drop Down 1</a></li>
                            <li class="drop-down">
                                <a href="${this.rootPath}">Drop Down 2</a>
                                <ul>
                                    <li><a href="${this.rootPath}">Deep Drop Down 1</a></li>
                                    <li><a href="${this.rootPath}">Deep Drop Down 2</a></li>
                                    <li><a href="${this.rootPath}">Deep Drop Down 3</a></li>
                                    <li><a href="${this.rootPath}">Deep Drop Down 4</a></li>
                                    <li><a href="${this.rootPath}">Deep Drop Down 5</a></li>
                                </ul>
                            </li>
                            <li><a href="${this.rootPath}">Drop Down 3</a></li>
                            <li><a href="${this.rootPath}">Drop Down 4</a></li>
                            <li><a href="${this.rootPath}">Drop Down 5</a></li>
                        </ul>`
        render(mainTemplate(data), document.querySelector('#langs'))
    }
    _getContent() {
        let query = `pageviewes(removed: false, Published: "NP", lang: "${this.lang}") { categoryName type id}`
        //  console.log(query)
        request(`http://127.0.0.1:3000/api/app`, 'POST', query)
            .then(res => res.json())
            .then(res => {
                let obj = {}
                this.pages = res.data.pageviewes
                this.pages.forEach(item => obj[item.id] = item.type)
                this.views = obj
                setTimeout(() => {
                    afterNextRender(this, this._putFooter)
                }, 500);
            });
    }
    _pageChanged(page) {
        if (page === 'home') {
            import('./elements/home-page');
            return;
        }
    }
}
customElements.define(adtradApp.is, adtradApp);
